#!/usr/bin/env node
/**
 * UI/UX Vibe Studio 자동 회귀 테스트 & 단계 잠금(Stage-Gate) 검증 스크립트
 *
 * 사용법:
 *   node scripts/test-regression.mjs            # scripts/test-stage.json의 enforcedStage 기준 검증
 *   node scripts/test-regression.mjs --stage=1  # 지정 단계까지 강제 검증 (PR 작업 중 사전 점검용)
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const skillDir = path.join(rootDir, '.agents', 'skills', 'uiux-vibe-composer');

// 1. 단계 설정 로드
const stageConfig = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'scripts', 'test-stage.json'), 'utf8')
);
const cliStageArg = process.argv.find((arg) => arg.startsWith('--stage='));
const enforcedStage = cliStageArg
  ? Number(cliStageArg.split('=')[1])
  : Number(stageConfig.enforcedStage ?? 0);

if (Number.isNaN(enforcedStage) || enforcedStage < 0 || enforcedStage > 4) {
  console.error(`잘못된 --stage 값입니다 (0~4 허용): ${cliStageArg}`);
  process.exit(1);
}

// 2. DB & 컴파일러 샌드박스 로드
const dbSource = fs.readFileSync(path.join(rootDir, 'data', 'ux-taxonomy-db.js'), 'utf8');
const compilerSource = fs.readFileSync(path.join(rootDir, 'data', 'prototype-compiler.js'), 'utf8');
const sandbox = { window: {}, console };
vm.createContext(sandbox);
vm.runInContext(dbSource, sandbox, { filename: 'data/ux-taxonomy-db.js' });
vm.runInContext(compilerSource, sandbox, { filename: 'data/prototype-compiler.js' });

const db = sandbox.window.UX_TAXONOMY_DB;
const compiler = sandbox.window.UX_PROTOTYPE_COMPILER;
const {
  SHOWCASE_BOOKS,
  PATTERN_DB,
  ALL_PATTERNS,
  ACTIVE_PATTERNS,
  getVisualWireframeHTML,
  getImplementationRecipe
} = db;

const stageResults = {
  0: { name: 'Stage 0 · 베이스라인 회귀 방지', failures: [], passes: [] },
  1: { name: 'Stage 1 · 즉시 정비 & 일관성', failures: [], passes: [] },
  2: { name: 'Stage 2 · 구현 레시피 품질 균질화', failures: [], passes: [] },
  3: { name: 'Stage 3 · 사전 고도화 & 중복 제거', failures: [], passes: [] },
  4: { name: 'Stage 4 · 진입 경험 & 온보딩 콘텐츠', failures: [], passes: [] }
};

function check(stage, label, condition, failDetail = '') {
  if (condition) {
    stageResults[stage].passes.push(label);
  } else {
    stageResults[stage].failures.push(failDetail ? `${label} — ${failDetail}` : label);
  }
}

// ============================================================================
// STAGE 0: 베이스라인 회귀 방지 (항상 강제)
// ============================================================================
{
  // 0-1. 기존 validate-harness.mjs 통과 여부
  let harnessOk = true;
  let harnessErr = '';
  try {
    execFileSync(process.execPath, [path.join(rootDir, 'scripts', 'validate-harness.mjs')], {
      cwd: rootDir,
      stdio: 'pipe'
    });
  } catch (err) {
    harnessOk = false;
    harnessErr = (err.stderr || err.stdout || err.message).toString().trim().split('\n').slice(-3).join(' | ');
  }
  check(0, 'validate-harness.mjs 0 errors', harnessOk, harnessErr);

  // 0-2. 카테고리 및 활성 패턴 하한선 (하드 삭제 방지)
  const minCategories = stageConfig.baselineCategoryCount ?? 20;
  const minActive = stageConfig.baselineMinActivePatterns ?? 217;
  check(
    0,
    `카테고리 수 유지 (>= ${minCategories})`,
    SHOWCASE_BOOKS.length >= minCategories,
    `현재 ${SHOWCASE_BOOKS.length}개`
  );
  check(
    0,
    `활성 패턴 하한선 유지 (>= ${minActive})`,
    ACTIVE_PATTERNS.length >= minActive,
    `현재 ${ACTIVE_PATTERNS.length}종`
  );

  // 0-3. 8대 도메인 프리셋 존재 & 활성 ID 참조 무결성
  const expectedPresets = [
    'apply',
    'ai_chat',
    'search_shop',
    'booking',
    'onboarding',
    'saas_dash',
    'rbac_security',
    'social_feed'
  ];
  const studioHtml = fs.readFileSync(path.join(rootDir, 'ai_ui_ux.html'), 'utf8');
  const missingPresets = expectedPresets.filter((p) => !studioHtml.includes(`value="${p}"`));
  check(
    0,
    'ai_ui_ux.html 8대 도메인 프리셋 옵션 완비',
    missingPresets.length === 0,
    `누락: ${missingPresets.join(', ')}`
  );

  const activeIdSet = new Set(ACTIVE_PATTERNS.map((p) => p.id));
  const presetsDoc = fs.readFileSync(
    path.join(skillDir, 'references', 'domain-presets.md'),
    'utf8'
  );
  const presetIds = [...presetsDoc.matchAll(/`([a-z]+_\d{2})`/g)].map((m) => m[1]);
  const inactivePresetRefs = [...new Set(presetIds.filter((id) => !activeIdSet.has(id)))];
  check(
    0,
    'domain-presets.md 참조 ID 모두 활성(active) 상태',
    inactivePresetRefs.length === 0,
    `비활성/미존재 ID: ${inactivePresetRefs.join(', ')}`
  );

  // 0-4. JS 구문 파싱 검증 (DB, 컴파일러, index.html, ai_ui_ux.html 인라인 스크립트)
  const jsSyntaxErrors = [];
  for (const htmlRel of ['index.html', 'ai_ui_ux.html']) {
    const html = fs.readFileSync(path.join(rootDir, htmlRel), 'utf8');
    const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];
    inlineScripts.forEach((m, idx) => {
      try {
        new vm.Script(m[1], { filename: `${htmlRel}#script-${idx + 1}` });
      } catch (e) {
        jsSyntaxErrors.push(`${htmlRel}#script-${idx + 1}: ${e.message}`);
      }
    });
  }
  check(
    0,
    '핵심 JS 및 HTML 인라인 스크립트 구문 오류 0건',
    jsSyntaxErrors.length === 0,
    jsSyntaxErrors.join(' | ')
  );

  // 0-5. 프로토타입 컴파일러 스모크 테스트 (뷰포트 × 대표 조합)
  const sampleIds = ['nav_05', 'src_01', 'cnt_08', 'cht_01', 'form_01', 'dt_03', 'com_03', 'ai_10', 'aut_03', 'med_04', 'ld_09', 'fb_02'];
  const sampleComponents = sampleIds
    .map((id) => ACTIVE_PATTERNS.find((p) => p.id === id))
    .filter(Boolean);
  const compilerErrors = [];
  for (const viewport of ['mobile', 'tablet', 'desktop']) {
    for (const visualTheme of ['Clean SaaS', 'Claymorphism', 'Glassmorphism', 'Neubrutalism']) {
      try {
        const html = compiler.compileDynamicPrototypeHTML({
          screenTitle: `회귀 스모크 (${viewport}/${visualTheme})`,
          viewport,
          gridArch: viewport === 'mobile' ? 'stack' : 'sidebar',
          visualTheme,
          presetKey: 'saas_dash',
          activeComponents: sampleComponents
        });
        if (!html || !html.includes('<!DOCTYPE html>') || !html.includes('</html>')) {
          compilerErrors.push(`${viewport}/${visualTheme}: 유효한 HTML 문서 미반환`);
        }
        if (/\bundefined\b|\[object Object\]/.test(html)) {
          compilerErrors.push(`${viewport}/${visualTheme}: undefined 또는 [object Object] 누출`);
        }
      } catch (e) {
        compilerErrors.push(`${viewport}/${visualTheme}: ${e.message}`);
      }
    }
  }
  check(
    0,
    'prototype-compiler.js 스모크 테스트 (3 뷰포트 × 4 테마)',
    compilerErrors.length === 0,
    compilerErrors.slice(0, 3).join(' | ')
  );

  // 0-6. 쇼케이스 파일 존재 & 스튜디오 복귀 링크 & 로컬 href/src 무결성
  const showcaseFiles = fs
    .readdirSync(path.join(rootDir, 'showcases'))
    .filter((f) => f.endsWith('.html'));
  const isolatedShowcases = [];
  for (const f of showcaseFiles) {
    const txt = fs.readFileSync(path.join(rootDir, 'showcases', f), 'utf8');
    if (!txt.includes('../index.html') || !txt.includes('../ai_ui_ux.html')) {
      isolatedShowcases.push(f);
    }
  }
  check(
    0,
    `쇼케이스 ${showcaseFiles.length}개 모두 포털·스튜디오 복귀 링크 포함`,
    isolatedShowcases.length === 0,
    `누락: ${isolatedShowcases.join(', ')}`
  );

  const brokenLinks = [];
  for (const htmlRel of ['index.html', 'ai_ui_ux.html']) {
    const html = fs.readFileSync(path.join(rootDir, htmlRel), 'utf8');
    const refs = [...html.matchAll(/(?:href|src)=["']([^"'#?]+)["']/g)].map((m) => m[1]);
    for (const ref of refs) {
      if (/^(https?:|mailto:|tel:|data:|javascript:|about:|\$\{)/i.test(ref)) continue;
      const decoded = decodeURIComponent(ref);
      const target = path.join(rootDir, decoded);
      if (!fs.existsSync(target)) {
        brokenLinks.push(`${htmlRel} -> ${ref}`);
      }
    }
  }
  check(
    0,
    'index.html · ai_ui_ux.html 로컬 링크/자산 깨짐 0건',
    brokenLinks.length === 0,
    brokenLinks.join(', ')
  );
}

// ============================================================================
// STAGE 1: 즉시 정비 & 일관성
// ============================================================================
{
  // 1-1. [추가] 내부 태그 0건
  const addedTagItems = ACTIVE_PATTERNS.filter((p) => p.code.includes('[추가]'));
  check(
    1,
    '활성 패턴명(code)에 [추가] 내부 태그 0건',
    addedTagItems.length === 0,
    `잔여 ${addedTagItems.length}건 (예: ${addedTagItems.slice(0, 3).map((p) => p.id).join(', ')})`
  );

  // 1-2. plugin.json 패턴 수 동기화
  const pluginMeta = JSON.parse(fs.readFileSync(path.join(rootDir, 'plugin.json'), 'utf8'));
  const expectedCountStr = `${ACTIVE_PATTERNS.length}종`;
  check(
    1,
    `plugin.json 패턴 수(${expectedCountStr}) 동기화`,
    (pluginMeta.description || '').includes(expectedCountStr),
    `현재 설명: "${pluginMeta.description}"`
  );

  // 1-3. SKILL.md 수치 및 17~20번 ID 범위 동기화
  const skillMd = fs.readFileSync(path.join(skillDir, 'SKILL.md'), 'utf8');
  const staleSkillPatterns = [];
  if (skillMd.includes('15개 인터랙티브 쇼케이스')) staleSkillPatterns.push('15개 인터랙티브 쇼케이스');
  for (const staleRange of ['cht_01~06', 'com_01~06', 'aut_01~05', 'med_01~05']) {
    if (skillMd.includes(staleRange)) staleSkillPatterns.push(staleRange);
  }
  check(
    1,
    'SKILL.md 쇼케이스 수 및 패턴 ID 범위 최신화',
    staleSkillPatterns.length === 0,
    `구버전 표기 잔존: ${staleSkillPatterns.join(', ')}`
  );

  // 1-4. 브랜드명 중립화 (code, meta, desc, recipe 본문)
  const brandRegex =
    /토스|인스타|카카오|노션|슬랙|애플|구글|유튜브|넷플릭스|쿠팡|배민|네이버|당근|에어비앤비|피그마|깃허브|트위터|페이스북|틱톡|스포티파이|\b(Linear|Notion|Slack|Toss|Apple|Google|Airbnb|Figma|Stripe|ChatGPT|Claude|Instagram|YouTube|Netflix)\b/i;
  const brandHits = [];
  for (const p of ACTIVE_PATTERNS) {
    const txt = `${p.code} ${p.meta} ${p.desc} ${getImplementationRecipe(p)}`;
    const m = txt.match(brandRegex);
    if (m) brandHits.push(`${p.id}(${m[0]})`);
  }
  check(
    1,
    '활성 패턴 본문 내 특정 브랜드/서비스명 0건',
    brandHits.length === 0,
    `잔여 ${brandHits.length}건: ${brandHits.slice(0, 6).join(', ')}`
  );

  // 1-5. 포털에서 QA용 샘플 파일명 제거
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  check(
    1,
    'index.html 샘플 링크에서 QA용 파일명(검증테스트_결과화면.html) 제거',
    !indexHtml.includes('검증테스트_결과화면.html'),
    'index.html에 검증테스트_결과화면.html 링크가 남아 있습니다'
  );
}

// ============================================================================
// STAGE 2: 구현 레시피 품질 균질화
// ============================================================================
{
  // 2-1. 설명 반복 폴백 0건
  const descFallbacks = ACTIVE_PATTERNS.filter((p) => {
    const r = getImplementationRecipe(p);
    return r.includes('특성 준수)') || r === p.desc || r.startsWith(p.desc);
  });
  check(
    2,
    '단순 설명 반복 폴백 레시피 0건',
    descFallbacks.length === 0,
    `잔여 ${descFallbacks.length}건`
  );

  // 2-2. 카테고리 일괄 템플릿 폴백 0건 (100% 고유 개별 레시피)
  const recStart = dbSource.indexOf('const recipes = {');
  const recEnd = dbSource.indexOf('if (recipes[item.id])', recStart);
  const recBlock = recStart !== -1 && recEnd !== -1 ? dbSource.slice(recStart, recEnd) : '';
  const explicitRecipeIds = new Set(
    [...recBlock.matchAll(/^\s*([a-z]+_\d{2})\s*:/gm)].map((m) => m[1])
  );
  const missingExplicit = ACTIVE_PATTERNS.filter((p) => !explicitRecipeIds.has(p.id));
  check(
    2,
    `활성 패턴 ${ACTIVE_PATTERNS.length}종 100% 고유 개별 레시피 보유`,
    missingExplicit.length === 0,
    `미보유 ${missingExplicit.length}건 (예: ${missingExplicit.slice(0, 5).map((p) => p.id).join(', ')})`
  );

  // 2-3. visual_style(sty_01~21) 레시피에 구체적 CSS/시각 토큰 포함
  const styItems = (PATTERN_DB.visual_style || []).filter((p) => (p.status || 'active') === 'active');
  const cssTokenRegex = /border|shadow|blur|gradient|bg-|backdrop|keyframes|transform|filter|clip-path|cubic-bezier|opacity|rounded|hsl|rgb|rgba|outline/i;
  const weakSty = styItems.filter((p) => !cssTokenRegex.test(getImplementationRecipe(p)));
  check(
    2,
    'visual_style(sty_01~21) 레시피에 구체적 CSS/시각 토큰 명시',
    weakSty.length === 0,
    `미충족 ${weakSty.length}/${styItems.length}건`
  );
}

// ============================================================================
// STAGE 3: 사전 고도화 & 중복 제거
// ============================================================================
{
  // 3-1. 중복 와이어프레임 0쌍
  const wfMap = new Map();
  for (const p of ACTIVE_PATTERNS) {
    const normalized = getVisualWireframeHTML(p).replace(/\s+/g, ' ').trim();
    if (!wfMap.has(normalized)) wfMap.set(normalized, []);
    wfMap.get(normalized).push(p.id);
  }
  const dupGroups = [...wfMap.values()].filter((ids) => ids.length > 1);
  check(
    3,
    '활성 패턴 간 중복 와이어프레임 0쌍',
    dupGroups.length === 0,
    `${dupGroups.length}쌍 중복: ${dupGroups.map((g) => g.join('=')).join(', ')}`
  );

  // 3-2. 의사결정 메타데이터(bestFor, avoidWhen) 필수 보유
  const missingDecision = ACTIVE_PATTERNS.filter(
    (p) => !p.bestFor || String(p.bestFor).trim().length < 5 || !p.avoidWhen || String(p.avoidWhen).trim().length < 5
  );
  check(
    3,
    '모든 활성 패턴에 bestFor · avoidWhen 의사결정 필드 완비',
    missingDecision.length === 0,
    `미보유 ${missingDecision.length}/${ACTIVE_PATTERNS.length}건`
  );

  // 3-3. taxonomy-catalog.md에 의사결정 정보 반영
  const catalogMd = fs.readFileSync(
    path.join(skillDir, 'references', 'taxonomy-catalog.md'),
    'utf8'
  );
  check(
    3,
    'taxonomy-catalog.md에 적합한 상황/주의사항 가이드 반영',
    catalogMd.includes('**적합**') && catalogMd.includes('**주의**'),
    'taxonomy-catalog.md에 의사결정 가이드(**적합**/**주의**) 미반영'
  );
}

// ============================================================================
// STAGE 4: 진입 경험 & 온보딩 콘텐츠
// ============================================================================
{
  const indexHtml = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
  const readmeMd = fs.readFileSync(path.join(rootDir, 'README.md'), 'utf8');

  // 4-1. index.html에 3단계 활용 가이드 & 역할별 진입 안내
  const hasWorkflowGuide =
    /id=["']how-to-use["']|id=["']workflow-guide["']/.test(indexHtml) &&
    indexHtml.includes('역할별');
  check(
    4,
    'index.html에 3단계 활용 가이드 및 역할별 진입 안내 섹션 존재',
    hasWorkflowGuide,
    'how-to-use/workflow-guide 섹션 또는 역할별 안내 미존재'
  );

  // 4-2. index.html에 8대 프리셋 전체 진입점 & 프리뷰 vs AI 생성 구분 안내
  const allPresetsInIndex = [
    'apply',
    'ai_chat',
    'search_shop',
    'booking',
    'onboarding',
    'saas_dash',
    'rbac_security',
    'social_feed'
  ].filter((p) => !indexHtml.includes(`preset=${p}`));
  check(
    4,
    'index.html에 8대 도메인 프리셋 전체 바로가기 제공',
    allPresetsInIndex.length === 0,
    `미노출 프리셋: ${allPresetsInIndex.join(', ')}`
  );

  const hasPreviewVsAiNote =
    indexHtml.includes('로컬') && indexHtml.includes('AI') && /프리뷰|미리보기/.test(indexHtml);
  check(
    4,
    'index.html에 로컬 프리뷰 vs AI 프롬프트 컴파일 역할 구분 안내',
    hasPreviewVsAiNote,
    '역할 구분 안내 문구 미존재'
  );

  // 4-3. README.md에 회귀 테스트 실행 명령 문서화
  check(
    4,
    'README.md에 자동 회귀 테스트 명령(test-regression.mjs) 문서화',
    readmeMd.includes('node scripts/test-regression.mjs'),
    'README.md에 test-regression.mjs 안내 누락'
  );
}

// ============================================================================
// 리포트 출력 및 종료 코드 결정
// ============================================================================
console.log(`\n=== UI/UX Vibe Studio 자동 회귀 테스트 리포트 (강제 단계: Stage 0 ~ ${enforcedStage}) ===\n`);

let totalEnforcedFailures = 0;

for (let s = 0; s <= 4; s++) {
  const r = stageResults[s];
  const isEnforced = s <= enforcedStage;
  const tag = isEnforced
    ? r.failures.length === 0
      ? 'PASS'
      : 'FAIL'
    : r.failures.length === 0
      ? 'READY'
      : 'PENDING';

  console.log(`[${tag}] ${r.name} (통과 ${r.passes.length}/${r.passes.length + r.failures.length})`);
  for (const f of r.failures) {
    console.log(`   ${isEnforced ? '✗' : '·'} ${f}`);
  }
  if (isEnforced) {
    totalEnforcedFailures += r.failures.length;
  }
}

console.log('');
if (totalEnforcedFailures > 0) {
  console.error(`❌ 강제 단계(Stage 0~${enforcedStage})에서 ${totalEnforcedFailures}건의 회귀/기준 위반이 발생했습니다.`);
  process.exit(1);
}
console.log(`✅ Stage 0~${enforcedStage} 회귀 테스트를 모두 통과했습니다.`);
