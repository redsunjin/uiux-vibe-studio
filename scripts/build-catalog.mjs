#!/usr/bin/env node
/**
 * data/ux-taxonomy-db.js 를 읽어
 * .agents/skills/uiux-vibe-composer/references/taxonomy-catalog.md 를 자동 생성합니다.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const dbPath = path.join(rootDir, 'data', 'ux-taxonomy-db.js');
const outPath = path.join(
  rootDir,
  '.agents',
  'skills',
  'uiux-vibe-composer',
  'references',
  'taxonomy-catalog.md'
);

const dbSource = fs.readFileSync(dbPath, 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(dbSource, sandbox);

const { SHOWCASE_BOOKS, PATTERN_DB, ALL_PATTERNS, ACTIVE_PATTERNS, getImplementationRecipe } =
  sandbox.window.UX_TAXONOMY_DB;

const escapeCell = (str) =>
  String(str ?? '')
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, ' ');

const lines = [
  `# UI/UX 도감 백과사전 & 바이브 코딩 마스터 카탈로그 (${SHOWCASE_BOOKS.length}대 영역 · 활성 ${ACTIVE_PATTERNS.length}종 / 전체 ${ALL_PATTERNS.length}종)`,
  '',
  '이 문서는 `data/ux-taxonomy-db.js`에서 `scripts/build-catalog.mjs`로 자동 생성된 AI 에이전트용 UI/UX 컴포넌트 및 인터랙션 구현 레시피 참조표입니다. (`status: hidden/deprecated` 항목은 자동 제외됩니다)',
  ''
];

for (const book of SHOWCASE_BOOKS) {
  const items = (PATTERN_DB[book.key] || []).filter(
    (item) => (item.status || 'active') === 'active'
  );
  lines.push(`## ${book.title} (참조 쇼케이스: \`${book.file}\`)`);
  lines.push('');
  lines.push('| ID | 패턴명 | 영문명 | 슬롯 | 격자폭 | 핵심 특성 | 설명 및 쇼케이스 구현 레시피 |');
  lines.push('| :--- | :--- | :--- | :---: | :---: | :--- | :--- |');
  for (const item of items) {
    const recipe = getImplementationRecipe(item);
    const decisionLines = [
      item.bestFor ? `<br>✅ **적합**: ${escapeCell(item.bestFor)}` : '',
      item.avoidWhen ? `<br>⚠️ **주의**: ${escapeCell(item.avoidWhen)}` : '',
      item.compareWith ? `<br>🔁 **비교**: ${escapeCell(item.compareWith)}` : ''
    ].join('');
    lines.push(
      `| \`${item.id}\` | **${escapeCell(item.code)}** | ${escapeCell(item.eng)} | \`${item.slot}\` | \`${item.span}\` | ${escapeCell(item.meta)} | ${escapeCell(item.desc)} <br>🛠️ **레시피**: ${escapeCell(recipe)}${decisionLines} |`
    );
  }
  lines.push('');
}

fs.writeFileSync(outPath, lines.join('\n'), 'utf8');
console.log(
  `Generated ${path.relative(rootDir, outPath)} (${SHOWCASE_BOOKS.length} categories, ${ACTIVE_PATTERNS.length}/${ALL_PATTERNS.length} active patterns)`
);
