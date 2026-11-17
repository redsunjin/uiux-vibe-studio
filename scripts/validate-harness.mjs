#!/usr/bin/env node
/**
 * UI/UX 사전 콘텐츠 검증 하네스 (Content Validation Harness)
 * - data/ux-taxonomy-db.js 스키마, ID 유일성, 레시피/와이어프레임 안전성
 * - domain-presets.md, SKILL.md, taxonomy-catalog.md 참조 무결성
 * - 외부 캡처 출처/금지 패턴 여부 점검
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const skillDir = path.join(rootDir, '.agents', 'skills', 'uiux-vibe-composer');

const dbSource = fs.readFileSync(path.join(rootDir, 'data', 'ux-taxonomy-db.js'), 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(dbSource, sandbox);

const {
  SHOWCASE_BOOKS,
  PATTERN_DB,
  ALL_PATTERNS,
  ACTIVE_PATTERNS,
  getVisualWireframeHTML,
  getImplementationRecipe
} = sandbox.window.UX_TAXONOMY_DB;

const errors = [];
const warnings = [];

const VALID_SLOTS = new Set(['header', 'main', 'bottom', 'behavior']);
const VALID_SPANS = new Set(['full', 'half']);
const VALID_STATUS = new Set(['active', 'hidden', 'deprecated']);
const ID_REGEX = /^[a-z]+_\d{2}$/;

// 1. 스키마 및 ID 유일성 검증
const seenIds = new Set();
for (const book of SHOWCASE_BOOKS) {
  const items = PATTERN_DB[book.key];
  if (!Array.isArray(items) || items.length === 0) {
    errors.push(`[Category] '${book.key}' 카테고리에 패턴이 없습니다.`);
    continue;
  }
  for (const item of items) {
    if (!ID_REGEX.test(item.id || '')) {
      errors.push(`[Schema] 잘못된 ID 형식: '${item.id}'`);
    }
    if (seenIds.has(item.id)) {
      errors.push(`[Schema] 중복 ID 발견: '${item.id}'`);
    }
    seenIds.add(item.id);

    for (const field of ['code', 'eng', 'slot', 'span', 'meta', 'desc']) {
      if (!item[field] || String(item[field]).trim() === '') {
        errors.push(`[Schema] '${item.id}' 필수 필드 누락: ${field}`);
      }
    }
    if (!VALID_SLOTS.has(item.slot)) {
      errors.push(`[Schema] '${item.id}' 잘못된 slot: '${item.slot}'`);
    }
    if (!VALID_SPANS.has(item.span)) {
      errors.push(`[Schema] '${item.id}' 잘못된 span: '${item.span}'`);
    }
    if (item.status && !VALID_STATUS.has(item.status)) {
      errors.push(`[Schema] '${item.id}' 잘못된 status: '${item.status}'`);
    }
    if (item.status === 'deprecated' && !item.replacedBy) {
      warnings.push(`[Lifecycle] '${item.id}'가 deprecated이지만 replacedBy가 지정되지 않았습니다.`);
    }

    // 2. 와이어프레임 안전성 검증
    const wf = getVisualWireframeHTML(item);
    if (!wf || typeof wf !== 'string' || wf.trim().length < 10) {
      errors.push(`[Wireframe] '${item.id}' 와이어프레임 출력이 비어 있거나 너무 짧습니다.`);
    } else if (/<script|on\w+\s*=|\sid\s*=/i.test(wf)) {
      errors.push(`[Wireframe] '${item.id}' 와이어프레임에 금지된 태그/속성(<script>, on*=, id=)이 포함되었습니다.`);
    }

    // 3. 레시피 존재 여부 검증
    const recipe = getImplementationRecipe(item);
    if (!recipe || typeof recipe !== 'string' || recipe.trim().length < 5) {
      errors.push(`[Recipe] '${item.id}' 구현 레시피가 비어 있습니다.`);
    }

    // 4. 외부 캡처 출처 문구 점검
    const combinedText = `${item.code} ${item.meta} ${item.desc} ${recipe}`;
    if (/캡처|캡쳐|스크린샷 출처|원본 출처|Copyright|©/i.test(combinedText)) {
      errors.push(`[Clean] '${item.id}'에 외부 캡처/출처 관련 금지 문구가 포함되었습니다.`);
    }
  }
}

// 5. domain-presets.md / SKILL.md 참조 ID 무결성 검증
for (const relPath of ['SKILL.md', 'references/domain-presets.md']) {
  const fullPath = path.join(skillDir, relPath);
  const content = fs.readFileSync(fullPath, 'utf8');
  const ids = [...content.matchAll(/`([a-z]+_\d{2})`/g)].map((m) => m[1]);
  for (const id of ids) {
    if (!seenIds.has(id)) {
      errors.push(`[Ref] ${relPath}에서 존재하지 않는 패턴 ID '${id}'를 참조합니다.`);
    }
  }
}

// 6. taxonomy-catalog.md 동기화 검증 (활성 패턴 기준)
const catalogPath = path.join(skillDir, 'references', 'taxonomy-catalog.md');
const catalogContent = fs.readFileSync(catalogPath, 'utf8');
const catalogRows = catalogContent
  .split('\n')
  .filter((line) => /^\|\s*`[a-z]+_\d{2}`/.test(line));
if (catalogRows.length !== ACTIVE_PATTERNS.length) {
  errors.push(
    `[Sync] taxonomy-catalog.md(${catalogRows.length}행)와 활성 DB(${ACTIVE_PATTERNS.length}종)가 일치하지 않습니다. 'node scripts/build-catalog.mjs'를 실행하세요.`
  );
}

const hiddenCount = ALL_PATTERNS.length - ACTIVE_PATTERNS.length;
console.log(
  `Checked ${SHOWCASE_BOOKS.length} categories, ${ALL_PATTERNS.length} total patterns (Active: ${ACTIVE_PATTERNS.length}, Hidden/Deprecated: ${hiddenCount}).`
);
if (warnings.length > 0) {
  console.log(`Warnings (${warnings.length}):`);
  warnings.forEach((w) => console.log(`  - ${w}`));
}
if (errors.length > 0) {
  console.error(`Errors (${errors.length}):`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
console.log('Harness validation PASSED (0 errors).');
