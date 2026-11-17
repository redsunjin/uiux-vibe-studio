# 기여 가이드 (Contributing Guide)

`uiux-vibe-studio`에 새로운 UI/UX 패턴, 구현 레시피, 도메인 프리셋을 기여해 주셔서 감사합니다!  
모든 기여는 [CC BY-NC-SA 4.0](./LICENSE) 라이선스 조건으로 배포됩니다.

## 1. 콘텐츠 제작 계약 준수
신규 패턴을 추가하거나 기존 패턴을 수정·숨김(`hidden`/`deprecated`) 처리할 때는 반드시 아래 제작 계약을 따라주세요:
- **[content-contract.md](./.agents/skills/uiux-vibe-composer/references/content-contract.md)**
  - 필수 스키마(`id`, `code`, `eng`, `slot`, `span`, `meta`, `desc`) 준수
  - `getImplementationRecipe()` 및 `getVisualWireframeHTML()` 고유 실루엣 구현 (인라인 `<svg>` 권장, `<script>`/`on*=`/`id=` 금지)
  - 외부 캡처 출처/워터마크/저작권 문구 포함 금지

## 2. 카탈로그 재생성 및 하네스 검증 (PR 전 필수)
`data/ux-taxonomy-db.js` 또는 `.agents/skills/uiux-vibe-composer/` 문서를 수정한 후, 반드시 아래 명령을 실행해 **0 errors**를 확인하세요:

```bash
node scripts/build-catalog.mjs
node scripts/validate-harness.mjs
```

## 3. Pull Request 절차
1. `main` 브랜치에서 작업 브랜치를 생성합니다. (`feat/...`, `fix/...`, `chore/...`)
2. 변경 사항과 `taxonomy-catalog.md` 동기화 결과를 함께 커밋합니다.
3. GitHub Pull Request를 생성하면 CI(`Harness Validation`)가 자동으로 검증을 수행합니다.
