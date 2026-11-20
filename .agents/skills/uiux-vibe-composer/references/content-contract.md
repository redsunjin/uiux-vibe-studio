# UI/UX 사전 콘텐츠 제작 계약 & 하네스 지침 (Content Contract)

이 문서는 `uiux-vibe-composer` 및 `data/ux-taxonomy-db.js`에 **신규 UI/UX 패턴·레시피·프리셋을 추가하거나 기존 항목을 수정·숨김(제외) 처리할 때** 반드시 준수해야 하는 제작 계약(Contract)과 검증 규칙입니다.

---

## 1. 스키마 제작 계약 (Pattern Entry Contract)

`data/ux-taxonomy-db.js`의 `PATTERN_DB`에 등록되는 모든 패턴 객체는 아래 필드를 필수로 충족해야 합니다.

| 필드 | 타입 | 규칙 / 허용 값 |
| :--- | :--- | :--- |
| `id` | `string` | `^[a-z]+_\d{2}$` (예: `nav_10`, `aut_04`). 전체 DB 내 유일(Unique)해야 함 |
| `code` | `string` | 한글 패턴명 (예: `탐색 10 커맨드 팔레트 (Cmd+K)`). 영문명과 불일치 금지 |
| `eng` | `string` | 표준 영문 패턴명 (예: `Command palette (Cmd+K)`) |
| `slot` | `enum` | `'header' \| 'main' \| 'bottom' \| 'behavior'` 중 하나 |
| `span` | `enum` | `'full' \| 'half'` 중 하나 (`behavior`는 기본 `'half'`) |
| `meta` | `string` | 핵심 특성 1줄 요약 (25자 내외 권장, 구분자 `·` 사용) |
| `desc` | `string` | 패턴의 목적과 사용자 가치 설명 (1~2문장) |
| `status` | `enum` (선택) | `'active'`(기본값) \| `'hidden'`(사전 노출 제외) \| `'deprecated'`(대체됨) |
| `replacedBy` | `string` (선택) | `status: 'deprecated'`일 때 권장 대체 패턴 `id` (예: `'ld_02'`) |

---

## 2. 구현 레시피 & 비주얼 와이어프레임 계약

새 패턴을 추가할 때는 **제목만 등록하고 끝내지 말고** 다음 두 함수까지 반드시 함께 작성해야 합니다.

1. **`getImplementationRecipe(item)`**:
   - 정적 설명 반복(`${item.desc} (${item.meta} 특성 준수)`)에 머물지 않고, 실제 DOM 구조·이벤트·상태 변화·접근성(`aria-*`, 키보드 조작)이 드러나는 구현 지침을 등록합니다.
2. **`getVisualWireframeHTML(item)`**:
   - 카테고리 공용 폴백에 묻혀 다른 패턴과 똑같이 보이지 않도록 고유 실루엣(인라인 `<svg>` 또는 HTML/Tailwind 미니 프리뷰)을 제공합니다.
   - **보안/안정성 규칙**: 반환 HTML 내부에 `<script>`, 인라인 `onclick`/`on*`, 중복 `id` 속성을 절대 포함하지 않습니다. 외부 아이콘 라이브러리(`<i data-lucide>`) 대신 자체 인라인 `<svg>`를 사용합니다.

---

## 3. 콘텐츠 청결 & 출처 관리 원칙

- **외부 캡처 출처 표기 금지**: 외부 화면 캡처나 레퍼런스 사이트에서 가져온 출처 문구, 워터마크, 저작권 표기, 하드코딩된 외부 레퍼런스 링크를 패턴 설명이나 주석에 포함하지 않습니다.
- **표현 중립화**: 특정 브랜드/서비스명(예: `토스`, `인스타`, `카카오` 등)은 설명 이해를 돕는 일반 용어(`모바일 핀테크 스타일`, `스토리 분할 바`, `간편 OAuth 로그인` 등)로 순화하는 것을 권장합니다.

---

## 4. 콘텐츠 생애주기 & 제외(가리기) 규칙

1. **하드 삭제 금지(Hard Delete 금지)**: 이미 `domain-presets.md`나 외부 프로젝트 프롬프트에서 참조될 수 있으므로, 불필요하거나 중복된 패턴은 배열에서 즉시 삭제하지 않고 `status: 'hidden'` 또는 `status: 'deprecated'`(with `replacedBy`)로 마킹해 **소프트 제외(가리기)** 처리합니다.
2. **가리기 기준**:
   - **타 카테고리 완전 중복**: 역할과 시각 형태가 동일한 패턴 (예: `lay_01` vs `cnt_01`, `onb_08` vs `ld_02`).
   - **저효율/구식 패턴**: 실무 사용 빈도가 현저히 낮거나 모던 UX 기준에 부합하지 않는 패턴.

---

## 5. 변경 후 필수 하네스 실행 (Verification Gate)

패턴·레시피·프리셋을 수정한 뒤에는 커밋/배포 전 반드시 아래 두 명령을 실행하여 **0 errors**를 확인합니다:

```bash
node scripts/validate-harness.mjs   # 스키마·레시피·와이어프레임·참조 무결성·출처 규칙 검증
node scripts/build-catalog.mjs      # taxonomy-catalog.md 자동 재동기화
```
