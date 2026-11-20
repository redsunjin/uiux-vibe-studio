---
name: uiux-vibe-composer
description: >-
  20대 도감 카테고리 · 217종 활성 UI/UX 패턴 사전과 19개 인터랙티브 쇼케이스 구현 레시피를 기반으로 화면을 설계·바이브 코딩(Vibe Coding)·검수하는 스킬.
  사용자가 웹/앱 화면 구성을 요청하거나, UI 사전 기준으로 프로토타입 생성, 반응형(모바일/태블릿/PC) 레이아웃 설계, 또는 기존 화면의 UX 휴리스틱 검수를 요청할 때 반드시 활성화하세요.
---

# UI/UX Dictionary & Vibe Coding Composer Skill (`uiux-vibe-composer`)

이 스킬은 프로젝트의 **마스터 UI/UX 도감 데이터베이스([ux-taxonomy-db.js](../../../data/ux-taxonomy-db.js))** 및 **카탈로그 레퍼런스([taxonomy-catalog.md](./references/taxonomy-catalog.md))**에 정의된 **20대 카테고리 · 217종 활성 패턴**을 활용하여, 한 번의 프롬프트로 쇼케이스 수준의 인터랙티브 프로토타입을 구현하거나 기존 UI를 검수합니다.

---

## 1. 핵심 워크플로우 (4-Layer Vibe Coding Protocol)

사용자가 특정 화면(예: *"숙박 예약 화면 만들어줘"*, *"커머스 검색 화면 구성해줘"*, *"B2B 대시보드 짜줘"*)을 요청하면 다음 4단계를 순서대로 수행하세요:

### Step 1. 타깃 뷰포트 및 반응형 골격(Shell Architecture) 결정
화면의 목적에 맞는 기본 뷰포트와 반응형 전환 문법, 출력 포맷을 먼저 확정합니다:
- **모바일 (`Mobile 9:19 · 375×812`)**: 상단 고정 앱바 + 단일 세로 스크롤(`grid-cols-1`) + 하단 고정 탭바(`nav_01`) / 바텀시트(`fb_05`) + 하단 Safe Area 홈 인디케이터(`ind_09`, `pb-[env(safe-area-inset-bottom)]`).
- **태블릿 (`Tablet 4:3 · 1024×768`)**: 모바일 하단 탭바를 숨기고 **좌측 아이콘 레일(`md:flex lg:hidden w-16`)**을 노출하며, 본문은 **좌우 2단 분할(`Master-Detail Split` 또는 `grid-cols-2`)**로 배치.
- **PC 웹 (`Desktop 16:10 · 1440×900`)**: 상단 글로벌 내비게이션 바(`GNB`) 또는 **좌측 고정 사이드바(`hidden lg:flex w-60`)** + **중앙 3열 벤토 그리드(`lg:grid-cols-3`)** + 필요 시 **우측 보조 인스펙터/목차(`hidden xl:flex w-72`)**의 3단 홀리 그레일 구조.
- **출력 포맷 분기**: 독립 프로토타입 요청 시 **단일 HTML + Tailwind + Vanilla JS**로 생성하고, 기존 React/Next.js/Vue 프로젝트 내 요청 시 해당 프레임워크의 컴포넌트와 상태 훅(`useState`/`ref`) 구조로 변환합니다.

### Step 2. 20대 도감 카탈로그에서 최적 패턴 조합(Composition) 선택
먼저 자주 쓰이는 도메인 조합이 정의된 **[domain-presets.md](./references/domain-presets.md)**를 확인해 기본 세트를 빠르게 고른 뒤, 세부 패턴과 레시피는 **[taxonomy-catalog.md](./references/taxonomy-catalog.md)**에서 조회하여 4개 슬롯에 배정합니다:
1. **`header` 슬롯**: 고정 헤더(`nav_05`), 메뉴 트리거 아이콘(`ico_01~11`), 커맨드 팔레트(`nav_10`), 검색창(`src_01`), 자동완성(`src_02`), 필터/정렬(`src_05~06`), 스텝/스크롤 인디케이터(`ind_02~05`), 상단 배너(`fb_03`).
2. **`main` 슬롯**: 화면 레이아웃(`lay_01~12`), 콘텐츠 구조(`cnt_02~12`), 입력 폼(`form_01~12`), 날짜·시간 선택(`dt_01~11`), 차트 시각화(`cht_01~09`), 커머스/가격표(`com_01~09`), AI 인터페이스(`ai_01~12`), 계정·보안(`aut_01~08`), 미디어·협업(`med_01~08`).
3. **`bottom` 슬롯**: 하단 탭바(`nav_01`), 로딩 버튼(`ld_09`), 토스트/스낵바(`fb_01~02`), 모달(`fb_04`), 바텀시트(`fb_05`), 장바구니 드로어(`com_03`).
4. **`behavior` 데코레이터**: 모바일 제스처(`gs_01~10`), 물리 트랜지션(`mo_01~10`), 타이포그래피 등장 효과(`txt_01~10`), 비주얼 아트 테마(`sty_01~21`).

### Step 3. 쇼케이스 구현 레시피 · 반응형 상태 · 모던 웹 & 접근성 주입
단순히 정적인 모양만 그리지 말고, 각 패턴에 정의된 **`🛠️ 레시피`**와 **컴포넌트 간 상태 바인딩**을 반드시 실제 코드로 연결하세요:
- **검색·필터·정렬 연동**: 검색창(`src_01`)에 1글자 이상 입력 시 우측 `X` 클리어 버튼이 나타나야 하며, 타이핑/필터/정렬 변경 시 본문 리스트/테이블이 실시간 필터링되고 매칭 키워드에 하이라이트(`src_07`)가 적용되어야 합니다. 결과가 0건이면 빈 화면 폴백(`src_08`/`cnt_06`)을 노출합니다.
- **폼 검증 & 비동기 피드백 체인**: 입력 필드(`form_01`) 오류 시 직하단 붉은색 인라인 오류(`fb_06`)를 띄우고, 제출 시 로딩 버튼(`ld_09`, `disabled` + 스피너) ➔ 프로그레스 바(`ld_03`) ➔ 완료 스낵바(`fb_02`, `[실행 취소]` 포함)가 연쇄 작동해야 합니다.
- **모던 웹 표준 & 반응형 위젯**:
  - 모달 다이얼로그(`fb_04`)는 반드시 네이티브 `<dialog closedby="any">`와 `.showModal()`을 사용하고, `dialog:modal` 및 `dialog::backdrop`에 `overscroll-behavior: contain`을 적용하세요.
  - 툴팁(`fb_07`)·더보기 팝오버(`ico_02~03`)에는 네이티브 `popover="auto"` 속성을 우선 활용하세요.
  - 검색 영역은 `<search>` 시맨틱 태그로 감싸고, 인라인 `onclick` 대신 `addEventListener()`와 이벤트 위임을 사용하세요.
  - 카드/위젯(`cnt_02`, `cnt_08`) 내부 밀도는 `@container` 컨테이너 쿼리로 자율 대응하도록 설계하세요.
  - 한국어 UI의 `body` 기본 스타일에는 반드시 `word-break: keep-all; overflow-wrap: break-word;`를 적용해 어절 중간 끊김(`탐색하/고`)을 방지하세요.
- **다크 모드 & 접근성(A11y) 기본 내장**:
  - 색상은 `bg-white dark:bg-slate-900`, `text-slate-900 dark:text-slate-100`, `border-slate-200 dark:border-slate-800` 등 라이트/다크 시맨틱 토큰 쌍을 유지하세요.
  - 토스트/스낵바 및 동적 결과 건수 영역에는 `role="status" aria-live="polite"`를 부여하고, 모든 인터랙티브 요소는 `Tab` / `Esc` 키보드 조작과 명확한 `focus-visible` 링을 지원해야 합니다.
  - `mo_*`, `txt_*`, `sty_*` 애니메이션에는 `@media (prefers-reduced-motion: reduce)` 폴백을 포함하세요.

### Step 4. UX 휴리스틱 자가 검수 (Audit Checklist)
코드를 완성하기 전 다음 7가지 휴리스틱 규칙을 점검하세요:
1. 입력 폼(`form_*`)이 있을 때 실시간 검증용 **인라인 오류(`fb_06`)**가 포함되었는가?
2. 검색창(`src_01`)이나 리스트/테이블(`cnt_03`, `cnt_07`)이 있을 때 데이터 0건 대비용 **빈 화면(`cnt_06` / `src_08`)**과 로딩용 **스켈레톤(`ld_02`)**이 준비되었는가?
3. 모달(`fb_04`)과 바텀시트(`fb_05`)가 동시에 남용되지 않았는가?
4. 주요 제출/결제 액션에 중복 클릭을 차단하는 **로딩 버튼(`ld_09`)**이나 **낙관적 UI(`ld_07`)**가 적용되었는가?
5. 모바일(1단 + Safe Area) ↔ 태블릿(좌측 레일 + 2단) ↔ PC(상단 GNB/좌측 사이드바 + 다단 벤토) 반응형 클래스가 정상 작동하는가?
6. 키보드(`Tab`, `Esc`, `Cmd+K` 등)만으로 핵심 플로우를 탐색할 수 있고, `aria-live` · `aria-expanded` 등 필수 ARIA 속성이 누락되지 않았는가?
7. 다크 모드 대비(`dark:*` 또는 CSS 변수)와 `prefers-reduced-motion` 모션 완화 규칙이 적용되었는가?

---

## 2. 참조 파일 경로 & 콘텐츠 관리 하네스
- **콘텐츠 제작 계약 & 규칙 지침**: [references/content-contract.md](./references/content-contract.md) (신규 패턴/레시피 추가 및 숨김·폐기 처리 시 필수 준수)
- **도메인별 세트 프리셋**: [references/domain-presets.md](./references/domain-presets.md)
- **전체 217종 활성 패턴 & 레시피 표**: [references/taxonomy-catalog.md](./references/taxonomy-catalog.md)
- **마스터 JS 데이터베이스**: [data/ux-taxonomy-db.js](../../../data/ux-taxonomy-db.js)
- **콘텐츠 검증 하네스**: [scripts/validate-harness.mjs](../../../scripts/validate-harness.mjs) (`node scripts/validate-harness.mjs`)
- **카탈로그 자동 동기화 스크립트**: [scripts/build-catalog.mjs](../../../scripts/build-catalog.mjs) (`node scripts/build-catalog.mjs`)
- **비주얼 스튜디오 웹앱**: [ai_ui_ux.html](../../../ai_ui_ux.html)
- **바이브 코딩 생성 결과 샘플**: [sample-prototype.html](../../../sample-prototype.html)
