# 자동 회귀 테스트 기준서 (Regression & Stage Gate Testing)

이 문서는 `uiux-vibe-studio`의 1~4단계 콘텐츠 고도화를 **각 단계별 PR**로 진행하면서, 기존 기능이 깨지거나(회귀) 이전 단계의 정비 사항이 되돌아가는 현상을 원천 차단하기 위한 **자동 테스트 기준 및 실행 규칙**입니다.

---

## 1. 단계 잠금(Stage-Gate) 운영 원칙

- 모든 테스트는 **`scripts/test-regression.mjs`**로 자동 실행되며, GitHub Actions CI([`.github/workflows/harness.yml`](./.github/workflows/harness.yml))에서 PR 생성 및 `main` 병합 시 자동 검증됩니다.
- 현재 강제(FAIL)되는 단계는 **[`scripts/test-stage.json`](./scripts/test-stage.json)**의 `enforcedStage` 값으로 관리합니다.
  - **`0` ~ `enforcedStage`**: 하나라도 위반 시 **즉시 실패(exit code 1)** → PR 병합 차단.
  - **`enforcedStage + 1` ~ `4`**: 예정 단계 리포트(`[PENDING]`)로 잔여 건수를 출력.
- 각 단계 PR을 완료할 때 해당 PR 안에서 `enforcedStage`를 1씩 올려 커밋하므로, **한 번 통과한 단계는 이후 어떤 PR에서도 되돌아갈 수 없습니다.**

---

## 2. 단계별 자동 테스트 합격 기준

### Stage 0 · 베이스라인 회귀 방지 (항상 강제)
| 항목 | 검증 기준 | 실패 조건 |
| :--- | :--- | :--- |
| **하네스 무결성** | `node scripts/validate-harness.mjs` 0 errors | 스키마 누락, ID 중복, 와이어프레임 금지 태그(`<script>`, `on*=`, `id=`), `taxonomy-catalog.md` 미동기화, 자산 유실 |
| **패턴 하드 삭제 방지** | 20개 카테고리 유지, 활성 패턴 수 `>= 217` | 카테고리 감소 또는 활성 패턴 무단 삭제 (`deprecated`로 소프트 제외해야 함) |
| **8대 프리셋 참조 무결성** | `domain-presets.md` 및 `ai_ui_ux.html`의 8개 프리셋 존재 및 모든 참조 ID가 활성 DB에 존재 | 프리셋 누락 또는 `deprecated`/미존재 ID 참조 |
| **컴파일러 스모크 테스트** | `prototype-compiler.js`로 대표 조합 + `mobile`/`tablet`/`desktop` 뷰포트 + 주요 테마 컴파일 | 예외 발생, HTML 구조 누락, 출력 내 `undefined`/`NaN`/`[object Object]` 누출 |
| **JS 구문 파싱 검증** | `ux-taxonomy-db.js`, `prototype-compiler.js`, `index.html`, `ai_ui_ux.html` 인라인 `<script>` 구문 파싱 | SyntaxError 발생 |
| **쇼케이스·포털 링크 무결성** | 20개 카테고리의 쇼케이스 파일 존재, `index.html`·`ai_ui_ux.html` 로컬 링크 유효, 19개 쇼케이스 모두 스튜디오 복귀 링크 포함 | 깨진 내부 링크 또는 고립된 쇼케이스 페이지 |

### Stage 1 · 즉시 정비 & 일관성 (PR #1 완료 시 잠금)
| 항목 | 검증 기준 |
| :--- | :--- |
| **내부 작업 태그 제거** | 활성 패턴 `code` 필드에 `[추가]` 문자열 **0건** |
| **문서 수치·범위 동기화** | `plugin.json`의 패턴 수(`217종`), `SKILL.md`의 패턴 수·쇼케이스 수(`19개 쇼케이스` 또는 `20개 카테고리`) 및 17~20번 ID 범위(`cht_01~09`, `com_01~09`, `aut_01~08`, `med_01~08`) 일치 |
| **브랜드명 중립화** | 패턴 `code`/`meta`/`desc`/`recipe` 본문에 특정 서비스/브랜드명(`토스`, `인스타`, `카카오`, `틱톡`, `피그마`, `Apple` 등) **0건** |
| **정식 샘플 네이밍** | `index.html`에서 QA용 파일명(`검증테스트_결과화면.html`) 대신 정식 샘플 파일/타이틀 사용 |

### Stage 2 · 구현 레시피 품질 균질화 (PR #2 완료 시 잠금)
| 항목 | 검증 기준 |
| :--- | :--- |
| **설명 반복 폴백 0건** | 활성 217종 모두 `${desc} (${meta} 특성 준수)` 형태의 폴백 레시피 **0건** |
| **일괄 템플릿 폴백 0건** | `gesture`, `text_anim`, `chart`, `commerce` 포함 활성 217종 **100% 고유 개별 레시피** 보유 |
| **비주얼 테마 레시피 통합** | `sty_01~21` 개별 레시피에 구체적 CSS/시각 토큰(색상, 보더, 블러, 그림자, 모션 등) 명시 |

### Stage 3 · 사전 고도화 & 중복 제거 (PR #3 완료 시 잠금)
| 항목 | 검증 기준 |
| :--- | :--- |
| **중복 와이어프레임 0쌍** | 활성 패턴 간 완전히 동일한 와이어프레임 HTML 출력 **0쌍** |
| **의사결정 메타데이터 완비** | 모든 활성 패턴에 `bestFor`(적합한 상황), `avoidWhen`(피해야 할 상황/주의점) 필드 필수 보유 |
| **카탈로그 동기화** | `build-catalog.mjs`로 재생성된 `taxonomy-catalog.md`가 최신 DB 및 의사결정 필드를 반영 |

### Stage 4 · 진입 경험 & 온보딩 콘텐츠 (PR #4 완료 시 잠금)
| 항목 | 검증 기준 |
| :--- | :--- |
| **포털 활용 가이드** | `index.html`에 3단계 활용 흐름(워크플로우) 및 역할별 진입 안내 섹션 존재 |
| **프리셋·역할 구분 안내** | `index.html`에 8대 도메인 프리셋 진입점과 "로컬 즉시 프리뷰 vs AI 프롬프트 컴파일" 역할 구분 안내 존재 |
| **README 최신화** | `README.md`에 최신 수치 및 회귀 테스트 실행 명령(`node scripts/test-regression.mjs`) 문서화 |

---

## 3. 실행 방법

```bash
# 1. 현재 잠긴 단계(scripts/test-stage.json) 기준 전체 회귀 테스트 실행 (CI와 동일)
node scripts/test-regression.mjs

# 2. 다음 단계 목표를 미리 시뮬레이션 검증 (예: Stage 1 작업 중 확인)
node scripts/test-regression.mjs --stage=1

# 3. 전체 1~4단계 기준을 한 번에 점검
node scripts/test-regression.mjs --stage=4
```

---

## 4. 단계별 PR 관리 계획

| PR | 브랜치명 | 작업 범위 | 잠금 상향 |
| :--- | :--- | :--- | :---: |
| **PR #0** | `chore/regression-test-suite` | `TESTING.md`, `scripts/test-regression.mjs`, `scripts/test-stage.json`, CI 연동 | `enforcedStage: 0` |
| **PR #1** | `chore/stage1-content-cleanup` | `[추가]` 43건 제거, 수치/ID 동기화, 브랜드명 중립화, 샘플 파일 정비 | `enforcedStage: 1` |
| **PR #2** | `feat/stage2-unique-recipes` | 폴백 99종 + 일괄 템플릿 32종 고유 레시피 작성, `sty_*` CSS 토큰 통합 | `enforcedStage: 2` |
| **PR #3** | `feat/stage3-decision-guide` | 중복 와이어프레임 8쌍 분리/정리, `bestFor`/`avoidWhen`/`compareWith` 추가 | `enforcedStage: 3` |
| **PR #4** | `feat/stage4-portal-onboarding` | 포털 3단계 가이드·역할별 진입·8대 프리셋·Before/After 예시·README 정비 | `enforcedStage: 4` |
