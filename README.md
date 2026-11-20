# UI/UX 백과사전 & 바이브 코딩 스튜디오 (`uiux-vibe-studio`)

20대 도감 카테고리 · 217종 활성 UI/UX 패턴 사전과 쇼케이스 레시피를 기반으로 반응형 화면을 설계·바이브 코딩·검수하는 프로젝트입니다.

---

## 라이선스 및 이용 정책 (`CC BY-NC-SA 4.0`)

이 프로젝트는 **[Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)](./LICENSE)** 라이선스를 따릅니다.

- **누구나 무료 사용 가능**: 개인 학습, 연구, 비영리 프로젝트 목적으로 누구나 무료로 사용·수정·공유할 수 있습니다.
- **상업적 이용 및 유료 판매 금지 (`NC`)**: 본 저장소의 UI/UX 사전 데이터, 스튜디오 웹앱, 스킬 파일 자체를 **타인에게 유료로 판매(재판매)하거나 상업적 상품/유료 SaaS/유료 강의로 재포장해 수익화하는 행위는 금지**됩니다.
- **동일 조건 변경 허락 (`SA`)**: 본 자료를 수정·개선하여 재배포할 경우에도 반드시 동일한 `CC BY-NC-SA 4.0` 라이선스로 무료·비영리 공개해야 합니다.

---

## 빠른 시작

### 0. 웹에서 바로 사용하기 (GitHub Pages)
- **포털 & 쇼케이스 런처**: [`https://redsunjin.github.io/uiux-vibe-studio/`](https://redsunjin.github.io/uiux-vibe-studio/) (`index.html`)
- **바이브 코딩 스튜디오 직행**: [`ai_ui_ux.html`](https://redsunjin.github.io/uiux-vibe-studio/ai_ui_ux.html)
- **도감 사전 모드 직행**: [`ai_ui_ux.html?mode=dictionary`](https://redsunjin.github.io/uiux-vibe-studio/ai_ui_ux.html?mode=dictionary)

### 1. 로컬에서 비주얼 스튜디오 웹앱 실행
저장소를 클론한 뒤 `ai_ui_ux.html`을 브라우저(또는 로컬 정적 서버)로 열면 217종 활성 패턴 도감, 조립기 캔버스, 숨김/가리기 관리, 실시간 프로토타입 컴파일러를 바로 사용할 수 있습니다.
- `ai_ui_ux.html` 및 쇼케이스 HTML들은 스타일/아이콘/폰트 렌더링을 위해 외부 CDN(Tailwind CSS, Lucide Icons, Pretendard)을 사용합니다.
- AI 코드 생성 기능에 입력하는 API Key는 브라우저의 `sessionStorage`에만 임시 보관되며 외부 서버로 수집·저장되지 않습니다. **절대 저장소에 API Key를 커밋하지 마세요.**

### 2. AI 에이전트 스킬(`uiux-vibe-composer`) 활용
- 스킬 경로: [`.agents/skills/uiux-vibe-composer/SKILL.md`](./.agents/skills/uiux-vibe-composer/SKILL.md)
- 도메인별 세트 프리셋: [`domain-presets.md`](./.agents/skills/uiux-vibe-composer/references/domain-presets.md)
- 마스터 카탈로그: [`taxonomy-catalog.md`](./.agents/skills/uiux-vibe-composer/references/taxonomy-catalog.md)

---

## 협업 · 콘텐츠 검증 · 버전 관리 규칙

- 기본 브랜치: `main`
- 모든 수정사항은 작업 브랜치 생성 후 **Pull Request(PR)** 를 통해 `main`으로 병합합니다.
- 콘텐츠 추가/수정 시 [CONTRIBUTING.md](./CONTRIBUTING.md), [content-contract.md](./.agents/skills/uiux-vibe-composer/references/content-contract.md), [TESTING.md](./TESTING.md)를 준수하고, 아래 검증 및 자동 회귀 테스트를 통과해야 합니다:
  ```bash
  node scripts/build-catalog.mjs
  node scripts/validate-harness.mjs
  node scripts/test-regression.mjs
  ```
- 릴리즈 버전은 `vX.Y.Z` 태그 및 GitHub Release로 관리합니다.
