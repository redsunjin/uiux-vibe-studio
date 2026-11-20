# 시스템 자산 및 아이콘 관리 안내 (`assets/`)

이 디렉토리는 `uiux-vibe-studio`의 공식 로고 및 정적 미디어 자산을 보관합니다.

## 현재 등록된 핵심 자산
- `logo.svg`: 프로젝트 공식 심볼/파비콘 (`plugin.json`, `index.html`, `ai_ui_ux.html`에서 참조)

## 관리 규칙
1. **임의 삭제·이름 변경 금지**: 모든 자산 참조는 `scripts/validate-harness.mjs` 및 GitHub Actions CI에서 자동 검증됩니다. 자산이 삭제되거나 경로가 깨지면 PR 머지가 차단됩니다.
2. **SVG 보안 규칙**: `.svg` 파일 내부에는 `<script>` 태그나 인라인 이벤트 핸들러(`onload=`, `onclick=`)를 포함할 수 없습니다.
3. **인라인 패턴 아이콘 원칙**: 208종 패턴 카드 내부의 미니 아이콘(`getVisualWireframeHTML`)은 외부 CDN 의존 없이 100% 인라인 `<svg>`로 관리합니다.
4. **배포 포함**: `.github/workflows/deploy-pages.yml`에 의해 `assets/` 전체가 GitHub Pages 정적 사이트로 함께 배포됩니다.
