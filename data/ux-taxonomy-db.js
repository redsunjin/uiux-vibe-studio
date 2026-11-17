/**
 * UI/UX Interactive Dictionary & Vibe Coding Studio — Master Taxonomy DB
 * 총 20대 도감 카테고리 · 208종 실전 UI/UX 패턴 및 쇼케이스 구현 레시피
 * (Single Source of Truth: 웹앱과 AI 에이전트 스킬이 공통으로 참조합니다)
 */

// =========================================================================
    // 1. 20대 도감 카테고리 메타데이터 & 208종 전체 패턴 데이터베이스
    // =========================================================================
    const SHOWCASE_BOOKS = [
      { key: 'layout', title: '01. 화면 레이아웃 & 그리드', short: '화면 레이아웃', file: '화면 레이아웃9.html', icon: 'layout-template', badge: '페이지 골격' },
      { key: 'content', title: '02. 콘텐츠 & 단 구조', short: '콘텐츠 구조', file: '콘텐츠와 화면 구조 9가지.html', icon: 'layout-grid', badge: '본문 블록' },
      { key: 'onboarding', title: '03. 앱 첫 화면 & 온보딩', short: '앱 첫화면', file: '앱 첫화면9.html', icon: 'rocket', badge: '진입/가입' },
      { key: 'nav', title: '04. 앱 탐색 & 내비게이션', short: '내비게이션', file: '앱 탐색 패턴 9가지.html', icon: 'compass', badge: '이동/탐색' },
      { key: 'menu_icon', title: '05. 메뉴 버튼 & 트리거 아이콘', short: '메뉴 아이콘', file: '메뉴버튼 9.html', icon: 'menu', badge: '트리거 버튼' },
      { key: 'search', title: '06. 검색 & 필터링 패턴', short: '검색 패턴', file: '검색패턴9.html', icon: 'search', badge: '검색/필터' },
      { key: 'form', title: '07. 데이터 입력 폼 컨트롤', short: '입력 폼', file: '입력 폼 패턴 9가지.html', icon: 'text-cursor-input', badge: '데이터 입력' },
      { key: 'datetime', title: '08. 날짜·시간 & 일정 선택', short: '날짜/시간', file: '날짜시간9.html', icon: 'calendar-clock', badge: '일정/예약' },
      { key: 'feedback', title: '09. 알림 & 피드백 레이어', short: '알림/피드백', file: '알림과 피드백 9가지.html', icon: 'bell-ring', badge: '상태/모달' },
      { key: 'loading', title: '10. 로딩 & 대기 경험', short: '로딩 패턴', file: '로딩 패턴 9가지.html', icon: 'loader-2', badge: '체감 대기' },
      { key: 'indicator', title: '11. 진행률 & 상태 인디케이터', short: '인디케이터', file: '로딩막대9.html', icon: 'sliders-horizontal', badge: '진행/위치' },
      { key: 'ai', title: '12. 생성형 AI 인터페이스', short: 'AI 화면', file: 'AI 화면 9가지.html', icon: 'bot', badge: '생성형 AI' },
      { key: 'gesture', title: '13. 모바일 터치 제스처', short: '손짓 제스처', file: '움직임 이름 9가지.html', icon: 'hand', badge: '터치 액션' },
      { key: 'motion', title: '14. UI 트랜지션 & 물리 모션', short: 'UI 움직임', file: '움직임 이름 9가지.html', icon: 'sparkles', badge: '물리 모션' },
      { key: 'text_anim', title: '15. 타이포그래피 텍스트 모션', short: '글자 효과', file: '텍스트 입력9.html', icon: 'type', badge: '타이포 모션' },
      { key: 'visual_style', title: '16. 모션 그래픽 & 비주얼 테마', short: '비주얼 테마', file: '모션 그래픽 20선 인터랙티브 인포그래픽.html', icon: 'palette', badge: '아트 테마' },
      { key: 'chart', title: '17. 데이터 시각화 & 차트 [확장]', short: '차트/시각화', file: '콘텐츠와 화면 구조 9가지.html', icon: 'bar-chart-3', badge: '신규 확장' },
      { key: 'commerce', title: '18. 커머스·결제 & 가격표 [확장]', short: '커머스/결제', file: '검색패턴9.html', icon: 'shopping-bag', badge: '신규 확장' },
      { key: 'auth', title: '19. 계정·보안 & 권한 설정 [확장]', short: '계정/보안', file: '앱 첫화면9.html', icon: 'shield-check', badge: '신규 확장' },
      { key: 'media_collab', title: '20. 미디어·소셜 & 실시간 협업 [확장]', short: '미디어/협업', file: 'AI 화면 9가지.html', icon: 'users', badge: '신규 확장' }
    ];

    const PATTERN_DB = {
      layout: [
        { id: 'lay_01', code: '레이아웃 01 히어로', eng: 'Hero section', slot: 'main', span: 'full', meta: '상단 대형 카피+CTA · 첫인상', desc: '화면 최상단을 크게 할애해 핵심 헤드라인 카피와 대표 행동 유도 버튼(CTA) 배치' },
        { id: 'lay_02', code: '레이아웃 02 벤토 그리드', eng: 'Bento grid', slot: 'main', span: 'full', meta: '비대칭 크기 모듈(2×2, 1×2) 조립', desc: '중요도에 따라 크기가 다른 사각형 모듈들을 도시락 칸처럼 비대칭 격자로 배치' },
        { id: 'lay_03', code: '레이아웃 03 스플릿', eng: 'Split screen', slot: 'main', span: 'full', meta: '좌우 5:5 양분 · 비주얼+폼', desc: '화면을 좌우 반반으로 나누어 좌측엔 브랜드 비주얼, 우측엔 로그인 폼/설명 배치' },
        { id: 'lay_04', code: '레이아웃 04 카드 그리드', eng: 'Card grid', slot: 'main', span: 'full', meta: '동일 규격 바둑판 반복 배열', desc: '가로·세로 비율이 100% 동일한 카드를 바둑판 격자로 정렬해 상품/콘텐츠 반복 탐색' },
        { id: 'lay_05', code: '레이아웃 05 사이드바', eng: 'Sidebar layout', slot: 'main', span: 'full', meta: '좌측 고정 메뉴 단 + 우측 본문', desc: '좌측에 접이식 고정 메뉴 단(Sidebar)을 두고 우측 넓은 영역을 작업 공간으로 활용' },
        { id: 'lay_06', code: '레이아웃 06 매거진', eng: 'Magazine layout', slot: 'main', span: 'full', meta: '대표 커버 기사 + 다단 보조 목록', desc: '대형 커버 스토리 1개와 다단 보조 아티클 목록을 비대칭 결합한 에디토리얼 배치' },
        { id: 'lay_07', code: '레이아웃 07 대시보드', eng: 'Dashboard', slot: 'main', span: 'full', meta: '상단 KPI 지표 + 하단 차트 결합', desc: '상단 핵심 성과 지표(KPI) 카드와 하단 시각화 차트를 스크롤 없이 한 화면에 밀집' },
        { id: 'lay_08', code: '레이아웃 08 Z 패턴', eng: 'Z-pattern', slot: 'main', span: 'full', meta: '좌상단→우상단→중앙→우하단CTA', desc: '로고(①)→메뉴(②)→핵심가치(③)→최종 CTA(④)로 이어지는 안구 이동 동선 최적화 배치' },
        { id: 'lay_09', code: '레이아웃 09 풀블리드', eng: 'Full bleed', slot: 'main', span: 'full', meta: '여백 0px · 화면 끝까지 꽉 찬 미디어', desc: '상하좌우 바깥 여백(Padding)을 없애고 배경 이미지·영상이 베젤 끝까지 차오르는 배치' },
        { id: 'lay_10', code: '레이아웃 10 메이슨리 그리드 [추가]', eng: 'Masonry waterfall grid', slot: 'main', span: 'full', meta: '핀터레스트형 가변 높이 벽돌 배치', desc: '세로 높이가 서로 다른 이미지·카드를 빈틈없이 벽돌처럼 맞물려 쌓는 폭포수형 레이아웃' },
        { id: 'lay_11', code: '레이아웃 11 스티키 스크롤텔링 [추가]', eng: 'Sticky Scrollytelling', slot: 'main', span: 'full', meta: '좌측 비주얼 고정 + 우측 텍스트 스크롤', desc: '스크롤하는 동안 한쪽 화면(제품 목업/차트)은 고정되고 반대쪽 설명 단계가 넘어가며 전환' },
        { id: 'lay_12', code: '레이아웃 12 홀리 그레일 3단 [추가]', eng: 'Holy Grail 3-Column', slot: 'main', span: 'full', meta: '좌측 트리메뉴 + 중앙 본문 + 우측 목차', desc: '기술 문서(Docs)나 커뮤니티 표준인 좌측 탐색·중앙 아티클·우측 온페이지 목차(TOC) 3단 구조' }
      ],
      content: [
        { id: 'cnt_01', code: '콘텐츠 01 히어로 배너', eng: 'Hero section', slot: 'main', span: 'full', status: 'deprecated', replacedBy: 'lay_01', meta: '시선 집중도: 최상 · 전체폭', desc: '최상단 핵심 헤드라인 메시지 + 대표 행동 유도(CTA) 배너 블록' },
        { id: 'cnt_02', code: '콘텐츠 02 카드 그리드', eng: 'Bento / Card grid', slot: 'main', span: 'full', meta: '태블릿/PC 다단 격자 핵심', desc: '독립된 카드들을 2~3단 바둑판 격자(Bento)로 반응형 배치' },
        { id: 'cnt_03', code: '콘텐츠 03 리스트 뷰', eng: 'Feed / List view', slot: 'main', span: 'half', meta: '스캔 속도: 가장 빠름', desc: '썸네일+타이틀+메타데이터를 수직 행(Row)으로 나열해 빠른 텍스트 스캔 지원' },
        { id: 'cnt_04', code: '콘텐츠 04 마스터-디테일 분할', eng: 'Master-Detail Split', slot: 'main', span: 'full', meta: '태블릿/PC 좌우 2단 전용', desc: '좌측에 목록(Master), 우측에 선택 항목의 상세 본문(Detail)을 동시 배치' },
        { id: 'cnt_05', code: '콘텐츠 05 아코디언', eng: 'Accordion', slot: 'main', span: 'half', meta: '스크롤 절약 · 점진적 공개', desc: '질문/제목 클릭 시 숨겨진 상세 본문이 아래로 펼쳐지는 접이식 블록' },
        { id: 'cnt_06', code: '콘텐츠 06 빈 화면', eng: 'Empty state', slot: 'main', span: 'half', meta: '이탈 방지 · 첫 행동 유도', desc: '데이터 0건일 때 안내 일러스트와 [+ 첫 항목 만들기] CTA 버튼 제공' },
        { id: 'cnt_07', code: '콘텐츠 07 데이터 테이블', eng: 'Data table', slot: 'main', span: 'full', meta: 'PC 다열 속성 비교·정렬', desc: '행과 열 교차 구조로 대량 데이터를 헤더 클릭 정렬·필터링하는 표' },
        { id: 'cnt_08', code: '콘텐츠 08 KPI 요약 카드', eng: 'Metric / Stat card', slot: 'main', span: 'half', meta: '핵심 수치 1초 브리핑', desc: '핵심 성과 숫자(전환율, 매출)와 전주 대비 증감 배지(▲+12%) 위젯' },
        { id: 'cnt_09', code: '콘텐츠 09 타임라인', eng: 'Timeline feed', slot: 'main', span: 'half', meta: '시간순 히스토리 추적', desc: '수직 연결선과 노드를 따라 시간순 진행 이력 및 배송/심사 단계 시각화' },
        { id: 'cnt_10', code: '콘텐츠 10 칸반 보드 [추가]', eng: 'Kanban board', slot: 'main', span: 'full', meta: '상태 열(To-do/Doing/Done) 카드 이동', desc: '진행 상태별 세로 기둥(Column)에 카드를 배치하고 드래그하여 워크플로우 상태를 관리' },
        { id: 'cnt_11', code: '콘텐츠 11 계층 트리 뷰 [추가]', eng: 'Collapsible Tree view', slot: 'main', span: 'half', meta: '폴더/하위 노드 접기·펼치기', desc: '파일 탐색기나 조직도처럼 상위-하위 깊이(Depth)를 들여쓰기와 화살표로 개폐하는 구조' },
        { id: 'cnt_12', code: '콘텐츠 12 우측 인스펙터 패널 [추가]', eng: 'Inspector side panel', slot: 'main', span: 'half', meta: '화면 이탈 없는 우측 슬라이드 상세창', desc: '목록이나 캔버스 항목 클릭 시 페이지 이동 없이 우측에서 열리는 속성 편집/상세 드로어' }
      ],
      onboarding: [
        { id: 'onb_01', code: '첫화면 01 스플래시', eng: 'Splash screen', slot: 'main', span: 'full', meta: '앱 구동 직후 1~2초 브랜드 로고', desc: '앱 실행 직후 1~2초간 브랜드 로고를 노출하며 백그라운드 초기 데이터 로드' },
        { id: 'onb_02', code: '첫화면 02 온보딩 슬라이드', eng: 'Onboarding walkthrough', slot: 'main', span: 'full', meta: '핵심 가치 3장 카드 요약', desc: '신규 사용자에게 앱의 핵심 효능을 3장의 슬라이드와 하단 도트로 브리핑' },
        { id: 'onb_03', code: '첫화면 03 권한 요청', eng: 'Permission request', slot: 'bottom', span: 'full', meta: 'OS 시스템 권한 사전 안내', desc: '위치·카메라·알림 등 OS 권한이 필요한 이유를 사전 설명해 승인율 향상' },
        { id: 'onb_04', code: '첫화면 04 코치마크', eng: 'Coach mark overlay', slot: 'bottom', span: 'full', meta: '첫 진입 핵심 버튼 스포트라이트', desc: '배경을 반투명 Dim 처리하고 주요 기능 버튼 위에 말풍선 가이드를 표시' },
        { id: 'onb_05', code: '첫화면 05 간편 로그인', eng: 'Social login', slot: 'main', span: 'half', meta: '카카오·Apple 3초 원클릭 인증', desc: '복잡한 이메일·비밀번호 입력 없이 OAuth 소셜 계정으로 원클릭 가입/로그인' },
        { id: 'onb_06', code: '첫화면 06 약관 동의', eng: 'Terms agreement', slot: 'main', span: 'half', meta: '전체 동의 마스터 체크박스 + 필수/선택', desc: '상단 [전체 동의] 일괄 체크박스와 필수/선택 약관 구분으로 가입 피로도 단축' },
        { id: 'onb_07', code: '첫화면 07 프로필 설정', eng: 'Profile setup', slot: 'main', span: 'half', meta: '아바타 이미지 + 닉네임 초기 세팅', desc: '가입 직후 활동할 프로필 아바타 사진과 닉네임을 입력받아 개인화 준비' },
        { id: 'onb_08', code: '첫화면 08 초기 피드 스켈레톤', eng: 'Initial feed skeleton', slot: 'main', span: 'half', status: 'deprecated', replacedBy: 'ld_02', meta: '스플래시 직후 홈 윤곽선 선노출', desc: '첫 홈 화면 진입 시 맞춤형 피드 로딩 동안 카드 윤곽선 쉬머를 먼저 노출' },
        { id: 'onb_09', code: '첫화면 09 웰컴 화면', eng: 'Welcome screen', slot: 'main', span: 'full', meta: '가입 완료 폭죽(Confetti) & 첫 CTA', desc: '가입 완료 직후 축하 폭죽 애니메이션과 함께 본 화면 진입을 유도하는 피날레 뷰' },
        { id: 'onb_10', code: '첫화면 10 취향/관심사 칩 선택 [추가]', eng: 'Interest tag picker', slot: 'main', span: 'full', meta: '관심 토픽 3개 이상 선택 · 추천 콜드스타트 해결', desc: '신규 가입 시 관심 분야 태그를 3개 이상 고르게 하여 첫 홈 피드 추천 알고리즘을 초기화' },
        { id: 'onb_11', code: '첫화면 11 온보딩 미션 체크리스트 [추가]', eng: 'Onboarding checklist widget', slot: 'main', span: 'half', meta: '초기 정착 4단계 퀘스트 + 달성률 바', desc: '가입 후 핵심 기능(프로필 등록→첫 글 작성→알림 켜기)을 하나씩 달성하게 유도하는 가이드 위젯' }
      ],
      nav: [
        { id: 'nav_01', code: '탐색 01 하단 탭바', eng: 'Bottom Tab bar', slot: 'bottom', span: 'full', meta: '위계: 최상위(Root) · 엄지 영역', desc: '화면 최하단 3~5개 핵심 메뉴 고정 (모바일 엄지 영역 최적화)' },
        { id: 'nav_02', code: '탐색 02 상단 탭', eng: 'Top tabs', slot: 'header', span: 'full', meta: '위계: 하위 분류 · 스와이프 연동', desc: '상단 헤더 아래 동일 위계 카테고리를 수평 분할하는 탭 필터' },
        { id: 'nav_03', code: '탐색 03 내비게이션 드로어', eng: 'Navigation drawer', slot: 'header', span: 'full', meta: '위계: 보조 메뉴 6개+ 서랍 수납', desc: '좌측 햄버거 메뉴 클릭 시 슬라이드되는 숨김 내비게이션 서랍' },
        { id: 'nav_04', code: '탐색 04 브레드크럼', eng: 'Breadcrumb', slot: 'header', span: 'full', meta: '위계: 3단계+ 트리 경로 표시', desc: '홈 > 카테고리 > 상세 형태의 현재 계층 위치 경로 표시' },
        { id: 'nav_05', code: '탐색 05 고정 헤더', eng: 'Sticky header', slot: 'header', span: 'full', meta: '스크롤 독립 상단 상시 고정', desc: '스크롤 시에도 상단 타이틀과 주요 액션 버튼을 상시 고정' },
        { id: 'nav_06', code: '탐색 06 플로팅 액션 버튼', eng: 'Floating Action Button (FAB)', slot: 'bottom', span: 'full', meta: '최우선 단일 핵심 액션(CTA)', desc: '우측 하단 부유형 최우선 핵심 액션(+ 글쓰기/생성) 버튼' },
        { id: 'nav_07', code: '탐색 07 페이지네이션', eng: 'Pagination', slot: 'bottom', span: 'full', meta: '정형 번호 이동 · 푸터 접근 보장', desc: '1, 2, 3, 4 페이지 번호를 지정해 이동하는 하단 컨트롤' },
        { id: 'nav_08', code: '탐색 08 무한 스크롤', eng: 'Infinite scroll', slot: 'main', span: 'half', meta: '연속 탐색 · 체류시간 극대화', desc: '스크롤 하단 도달 시 다음 피드 데이터를 비동기로 연속 로드' },
        { id: 'nav_09', code: '탐색 09 뒤로 가기', eng: 'Back navigation', slot: 'header', span: 'full', meta: '직전 계층 안전 복귀', desc: '상단 좌측 < 버튼으로 직전 계층 화면으로 안전하게 복귀' },
        { id: 'nav_10', code: '탐색 10 커맨드 팔레트 (Cmd+K) [추가]', eng: 'Command palette (Cmd+K)', slot: 'header', span: 'full', meta: '키보드 단축키 기반 만능 점프/실행창', desc: 'Cmd+K(Ctrl+K)를 누르면 화면 중앙에 떠서 페이지 이동과 액션을 즉시 검색·실행하는 파워유저 바' },
        { id: 'nav_11', code: '탐색 11 메가 메뉴 [추가]', eng: 'Mega menu dropdown', slot: 'header', span: 'full', meta: '대분류·중분류·추천배너 다단 펼침 메뉴', desc: '상단 GNB 호버 시 넓은 다단 패널이 펼쳐지며 하위 카테고리 전체를 한눈에 보여주는 메뉴' },
        { id: 'nav_12', code: '탐색 12 우측 앵커 목차 (TOC) [추가]', eng: 'Scrollspy Table of Contents', slot: 'main', span: 'half', meta: '현재 읽는 문단 제목 자동 하이라이트', desc: '긴 문서 우측에 고정되어 현재 스크롤된 섹션 제목을 실시간으로 추적·강조하는 목차' }
      ],
      menu_icon: [
        { id: 'ico_01', code: '메뉴버튼 01 햄버거', eng: 'Hamburger menu (≡)', slot: 'header', span: 'half', meta: '가로 3선(≡) · 전체 드로어 호출', desc: '상단 구석 가로줄 3개 아이콘으로 전체 내비게이션 서랍(Drawer) 호출' },
        { id: 'ico_02', code: '메뉴버튼 02 케밥', eng: 'Kebab menu (⋮)', slot: 'main', span: 'half', meta: '세로 점 3개(⋮) · 더보기 옵션', desc: '세로 점 3개 아이콘으로 우측 상단이나 카드 내 공유/신고/보관 더보기 팝오버 호출' },
        { id: 'ico_03', code: '메뉴버튼 03 미트볼', eng: 'Meatballs menu (⋯)', slot: 'main', span: 'half', meta: '가로 점 3개(⋯) · 행/블록 액션', desc: '가로 점 3개 아이콘으로 테이블 행(Row)이나 블록의 세부 편집 메뉴 호출' },
        { id: 'ico_04', code: '메뉴버튼 04 와플', eng: 'Waffle launcher', slot: 'header', span: 'half', meta: '3×3 원형 점 격자 · 앱 런처', desc: '3×3 동그란 점 격자 아이콘으로 생태계 내 다른 서비스/앱 스위처 팝오버 호출' },
        { id: 'ico_05', code: '메뉴버튼 05 벤토 아이콘', eng: 'Bento grid icon', slot: 'header', span: 'half', meta: '3×3 사각 박스 격자 · 타일 뷰 전환', desc: '3×3 사각 격자 아이콘으로 바둑판 타일(Grid) 보기 전환 또는 모듈 호출' },
        { id: 'ico_06', code: '메뉴버튼 06 도너', eng: 'Döner filter icon', slot: 'header', span: 'half', meta: '역삼각형 3선 · 데이터 필터(Filter)', desc: '아래로 폭이 좁아지는 깔때기 모양 3선 아이콘으로 조건 필터링 시트 호출' },
        { id: 'ico_07', code: '메뉴버튼 07 베지 버거', eng: 'Veggie burger (=)', slot: 'header', span: 'half', meta: '가로 2선(= ↔ ✕) · 미니멀 메뉴', desc: '패티를 뺀 가로줄 2개 아이콘으로 클릭 시 X로 회전하며 미니멀 전체화면 메뉴 오픈' },
        { id: 'ico_08', code: '메뉴버튼 08 계단', eng: 'Stairs sort icon', slot: 'header', span: 'half', meta: '계단식 3선 · 정렬(Sort)/목차', desc: '계단식으로 어긋난 3선 아이콘으로 리스트 정렬 기준 변경 또는 문서 목차 호출' },
        { id: 'ico_09', code: '메뉴버튼 09 슬라이더 아이콘', eng: 'Sliders preferences', slot: 'header', span: 'half', meta: '노브 막대 · 상세 수치/환경설정', desc: '조절 노브가 달린 가로 막대 아이콘으로 상세 가격/연봉 범위 및 환경설정 모달 호출' },
        { id: 'ico_10', code: '메뉴버튼 10 스피드 다이얼 FAB [추가]', eng: 'Speed dial FAB', slot: 'bottom', span: 'half', meta: '+ 버튼 탭 시 3~4개 서브 아이콘 전개', desc: '하단 플로팅(+) 버튼을 누르면 위로 사진·음성·문서 등 하위 빠른 실행 버튼들이 펼쳐짐' },
        { id: 'ico_11', code: '메뉴버튼 11 분할 버튼 [추가]', eng: 'Split button', slot: 'main', span: 'half', meta: '기본 실행 버튼 + 우측(▾) 보조 옵션', desc: '좌측 영역은 주 액션(예: 바로 보내기)을 수행하고 우측 화살표(▾)는 예약 발송 등 부가 메뉴를 오픈' }
      ],
      search: [
        { id: 'src_01', code: '검색 01 검색창', eng: 'Search bar', slot: 'header', span: 'full', meta: '돋보기 + 플레이스홀더 + 지우기(X)', desc: '포커스 강조 테두리와 1글자 이상 입력 시 즉시 노출되는 지우기(X) 버튼을 갖춘 인풋' },
        { id: 'src_02', code: '검색 02 자동완성', eng: 'Autocomplete', slot: 'header', span: 'full', meta: '실시간 추천어 + 일치 키워드 하이라이트', desc: '타이핑 도중 연관 추천 검색어를 띄우고 입력 글자와 일치하는 앞부분을 파란색 강조' },
        { id: 'src_03', code: '검색 03 최근 검색어', eng: 'Recent searches', slot: 'main', span: 'half', meta: '재검색 알약 칩 + 개별/전체 삭제', desc: '이전 검색어를 알약 칩(Chip)으로 보관하며 개별 삭제(X)와 프라이버시용 [전체 삭제] 제공' },
        { id: 'src_04', code: '검색 04 인기 검색어', eng: 'Trending searches', slot: 'main', span: 'half', meta: '실시간 급상승 랭킹 + 순위 등락(▲/NEW)', desc: '무엇을 검색할지 망설이는 사용자에게 실시간 급상승 키워드 순위를 노출해 탐색 유도' },
        { id: 'src_05', code: '검색 05 필터', eng: 'Search Filter', slot: 'header', span: 'full', meta: '다중 조건(가격·브랜드·무료배송) 좁히기', desc: '검색 결과 중 가격 범위 슬라이더, 브랜드, 무료배송 조건에 맞는 항목만 남기고 걸러냄' },
        { id: 'src_06', code: '검색 06 정렬', eng: 'Search Sort', slot: 'header', span: 'half', meta: '결과 개수 유지 · 나열 순서만 변경', desc: '전체 결과 수는 줄이지 않고 추천순·낮은가격순·리뷰많은순으로 노출 순서만 재배열' },
        { id: 'src_07', code: '검색 07 검색어 강조', eng: 'Keyword Highlight', slot: 'main', span: 'half', meta: '결과 타이틀 내 매칭 단어 마커 표시', desc: '검색 결과 리스트에서 사용자가 입력한 키워드와 일치하는 텍스트에 배경 하이라이트 표시' },
        { id: 'src_08', code: '검색 08 검색 결과 없음', eng: 'No search results', slot: 'main', span: 'full', meta: '0건 이탈 방지 + 오타 교정/대체어 제안', desc: '결과가 0건일 때 막막함 방지용 안내 문구와 추천 대체 키워드 칩을 함께 제시' },
        { id: 'src_09', code: '검색 09 검색 범위 탭', eng: 'Scope tabs', slot: 'header', span: 'full', meta: '통합 · 상품 · 브랜드 · 후기 도메인 분할', desc: '동일 검색어에 대해 [전체 | 상품 | 브랜드 | 후기] 등 결과 도메인 범위를 즉시 전환' },
        { id: 'src_10', code: '검색 10 적용된 필터 칩 & 초기화 [추가]', eng: 'Active filter bar & Reset', slot: 'header', span: 'full', meta: '선택된 조건 태그 나열 + [필터 초기화]', desc: '현재 적용 중인 필터 조건들을 상단에 알약 태그로 모아 보여주고 한 번에 해제하는 컨트롤 바' },
        { id: 'src_11', code: '검색 11 패싯 카운트 필터 [추가]', eng: 'Faceted search sidebar', slot: 'main', span: 'half', meta: '항목별 예상 결과 수(예: 나이키 (42)) 표시', desc: '체크하기 전에 각 필터 조건 옆에 해당하는 결과 건수를 괄호로 미리 표시해 빈 결과(0건)를 방지' }
      ],
      form: [
        { id: 'form_01', code: '입력폼 01 텍스트 필드 상태', eng: 'Text field states', slot: 'main', span: 'half', meta: '자유 입력 · 5대 상태 피드백', desc: 'Default / Focus / Filled / Error / Disabled 5대 상태를 명확히 구분하는 인풋' },
        { id: 'form_02', code: '입력폼 02 셀렉트 드롭다운', eng: 'Select dropdown', slot: 'main', span: 'half', meta: '단일 선택 · 옵션 5개 이상 수납', desc: '5개 이상의 다수 옵션 목록을 평소에 접어두었다가 클릭 시 펼쳐 단일 선택' },
        { id: 'form_03', code: '입력폼 03 세그먼트 컨트롤', eng: 'Segmented control', slot: 'main', span: 'half', meta: '단일 선택 · 옵션 2~4개 즉시 전환', desc: '2~4개의 상호 배타적 옵션을 한 줄에 펼쳐 보여주고 1번의 탭으로 즉시 전환' },
        { id: 'form_04', code: '입력폼 04 스위치 토글', eng: 'Switch toggle', slot: 'main', span: 'half', meta: '이진(On/Off) 즉시 시스템 반영', desc: '별도 저장 버튼 없이 켜짐/꺼짐(On/Off) 상태를 시스템에 즉시 반영' },
        { id: 'form_05', code: '입력폼 05 체크박스', eng: 'Checkbox', slot: 'main', span: 'half', meta: '다중 선택 (0~N개 복수 선택)', desc: '다중 항목 복수 선택(0~N개) 및 개별 약관 동의 체크 컨트롤' },
        { id: 'form_06', code: '입력폼 06 라디오 버튼', eng: 'Radio button', slot: 'main', span: 'half', meta: '필수 단일 선택 (Only 1)', desc: '노출된 보기들을 모두 비교하며 오직 1개만 배타적으로 선택' },
        { id: 'form_07', code: '입력폼 07 슬라이더', eng: 'Range Slider', slot: 'main', span: 'half', meta: '연속적 범위/강도 드래그 조절', desc: '연속적인 수치 범위(예산, 볼륨, 거리)를 핸들 드래그로 직관적 조절' },
        { id: 'form_08', code: '입력폼 08 수량 스테퍼', eng: 'Stepper', slot: 'main', span: 'half', meta: '정수 1단위 오타 방지 증감(-/+)', desc: '키보드 타이핑 없이 - / + 버튼만으로 인원수·수량을 1단위씩 정밀 증감' },
        { id: 'form_09', code: '입력폼 09 미니 날짜 선택', eng: 'Inline Date picker', slot: 'main', span: 'half', meta: '폼 내부 미니 달력 그리드', desc: '입력 폼 안에서 팝오버 달력 그리드를 통해 예약일/마감일을 선택' },
        { id: 'form_10', code: '입력폼 10 파일 드래그 앤 드롭 존 [추가]', eng: 'File upload dropzone', slot: 'main', span: 'full', meta: '점선 박스 드롭 + 확장자/용량 안내', desc: '파일을 마우스로 끌어다 놓거나 클릭해 첨부하며 허용 포맷(PDF/PNG, 최대 10MB)을 명시' },
        { id: 'form_11', code: '입력폼 11 OTP 6자리 인증번호 칸 [추가]', eng: 'OTP / PIN code input', slot: 'main', span: 'half', meta: '1글자 입력 시 다음 칸 자동 포커스 이동', desc: 'SMS/이메일 6자리 인증번호 입력 시 숫자 하나를 치면 자동으로 옆 칸으로 커서가 넘어가는 인풋' },
        { id: 'form_12', code: '입력폼 12 해시태그/키워드 칩 입력기 [추가]', eng: 'Tag / Token input', slot: 'main', span: 'half', meta: '엔터·쉼표 입력 시 알약 태그로 즉시 변환', desc: '기술 스택이나 해시태그를 타이핑 후 엔터를 치면 삭제 가능한 알약(Chip) 블록으로 변환' }
      ],
      datetime: [
        { id: 'dt_01', code: '날짜 01 단일 캘린더', eng: 'Calendar grid', slot: 'main', span: 'half', meta: '월간 격자 · 요일/공휴일 시각 확인', desc: '한 달 또는 한 주의 격자 달력을 펼쳐 무슨 요일인지 눈으로 확인하며 단일 날짜 선택' },
        { id: 'dt_02', code: '날짜 02 휠 피커', eng: 'Wheel picker', slot: 'main', span: 'half', meta: 'iOS 드럼롤 스크롤 · 년/월/일/시간 조합', desc: '다이얼 자물쇠처럼 위아래로 굴려 연·월·일이나 알람 시간을 맞추는 모바일 드럼 피커' },
        { id: 'dt_03', code: '날짜 03 기간 선택', eng: 'Date range picker', slot: 'main', span: 'full', meta: '시작일~종료일 구간 밴드 하이라이트', desc: '시작일과 종료일 두 지점을 찍으면 그 사이의 날짜들을 연한 하이라이트 띠로 연결 표시' },
        { id: 'dt_04', code: '날짜 04 빠른 선택 칩', eng: 'Quick date chips', slot: 'main', span: 'half', meta: '달력 없이 [오늘/내일/이번주말] 1초 컷', desc: '복잡한 달력 없이 [오늘], [내일], [이번 주말] 등 상대 날짜 알약 칩으로 원클릭 선택' },
        { id: 'dt_05', code: '날짜 05 시간 슬롯', eng: 'Time slots', slot: 'main', span: 'half', meta: '예약 가능 시간대 격자 + 마감 Disabled', desc: '30분/1시간 단위 예약 버튼을 격자로 나열하고 마감된 시간대는 취소선 비활성화 처리' },
        { id: 'dt_06', code: '날짜 06 월 선택기', eng: 'Month picker', slot: 'main', span: 'half', meta: '1~12월 격자 전용 (이력서/명세서)', desc: '구체적인 일(Day)이 불필요한 입·퇴사월, 졸업월, 월별 명세서 조회용 1~12월 격자' },
        { id: 'dt_07', code: '날짜 07 날짜 직접 타이핑', eng: 'Masked Date input', slot: 'main', span: 'half', meta: '생년월일(YYYY.MM.DD) 숫자 직타', desc: '달력을 수백 번 넘겨야 하는 먼 과거(생년월일)를 숫자 키패드와 자동 마스킹으로 직타 입력' },
        { id: 'dt_08', code: '날짜 08 체크인·체크아웃 분할', eng: 'Check-in / Check-out split', slot: 'main', span: 'full', meta: '좌우 분할 박스 + 총 박수(N박) 자동 계산', desc: '체크인과 체크아웃을 좌우 박스로 분할하고 하단 CTA에 [3박 4일] 숙박일수를 자동 계산' },
        { id: 'dt_09', code: '날짜 09 반복 주기 설정', eng: 'Recurrence rule', slot: 'main', span: 'half', meta: '[매일/매주/매월] 정기 구독·루틴 주기', desc: '특정 하루가 아닌 매일·매주·매월 25일 등 정기 배송이나 루틴 반복 주기를 설정' },
        { id: 'dt_10', code: '날짜 10 마감 디데이 카운트다운 [추가]', eng: 'Countdown timer', slot: 'header', span: 'half', meta: '실시간 초 단위 차감 (D-2 04:12:59)', desc: '타임세일이나 서류 접수 마감까지 남은 시간을 시:분:초 단위로 실시간 차감하여 행동 유도' },
        { id: 'dt_11', code: '날짜 11 글로벌 타임존 선택기 [추가]', eng: 'Timezone selector', slot: 'main', span: 'half', meta: 'UTC/KST 기준 시간대 자동 변환', desc: '글로벌 화상회의나 예약 시 사용자의 로컬 시간대(Asia/Seoul GMT+9)를 감지·전환' }
      ],
      feedback: [
        { id: 'fb_01', code: '피드백 01 토스트', eng: 'Toast', slot: 'bottom', span: 'full', meta: '방해도: 낮음 · 2.5초 후 자동 소멸', desc: '화면 하단에 일시 노출된 후 2.5초 뒤 자동으로 사라지는 가벼운 확인 알림' },
        { id: 'fb_02', code: '피드백 02 스낵바', eng: 'Snackbar', slot: 'bottom', span: 'full', meta: '방해도: 중간 · [실행 취소(Undo)] 포함', desc: '작업 결과 안내와 함께 우측에 [실행 취소(Undo)] 복구 액션 버튼을 제공하는 하단 바' },
        { id: 'fb_03', code: '피드백 03 상단 배너', eng: 'Top Banner', slot: 'header', span: 'full', meta: '방해도: 중간 · 상단 고정 지속 알림', desc: '상단에 고정되어 중요 공지나 마감 D-Day, 네트워크 상태를 지속적으로 알리는 배너' },
        { id: 'fb_04', code: '피드백 04 모달 다이얼로그', eng: 'Modal dialog', slot: 'bottom', span: 'full', meta: '방해도: 높음 · 화면 Dim 차단 및 의사결정', desc: '화면 전체를 어둡게(Dim) 차단하고 삭제/제출 등 최종 의사결정을 강제하는 대화상자' },
        { id: 'fb_05', code: '피드백 05 바텀시트', eng: 'Bottom sheet', slot: 'bottom', span: 'full', meta: '방해도: 중간 · 모바일 하단 슬라이드업', desc: '모바일 화면 하단에서 위로 부드럽게 올라오는 상세 옵션/필터 시트' },
        { id: 'fb_06', code: '피드백 06 인라인 오류', eng: 'Inline error', slot: 'main', span: 'half', meta: '방해도: 낮음 · 입력칸 직하단 즉시 검증', desc: '문제가 발생한 입력 칸 바로 아래에 붉은색으로 노출되는 실시간 유효성 검증 문구' },
        { id: 'fb_07', code: '피드백 07 툴팁', eng: 'Tooltip', slot: 'main', span: 'half', meta: '방해도: 매우 낮음 · 호버/탭 보조 말풍선', desc: '? 아이콘 호버나 탭 시 나타나는 산정 기준·용어 설명 보조 말풍선' },
        { id: 'fb_08', code: '피드백 08 코치마크 피드백', eng: 'Coach mark spotlight', slot: 'bottom', span: 'full', status: 'deprecated', replacedBy: 'onb_04', meta: '방해도: 높음 · 신규 기능 하이라이트', desc: '타깃 UI 요소를 스포트라이트로 비추어 신규 기능을 학습시키는 가이드 레이어' },
        { id: 'fb_09', code: '피드백 09 알림 뱃지', eng: 'Notification Badge', slot: 'header', span: 'half', meta: '방해도: 매우 낮음 · 읽지 않음 카운트/점', desc: '종 모양 아이콘 모퉁이에 읽지 않은 알림 개수나 빨간 점을 표시하는 인디케이터' },
        { id: 'fb_10', code: '피드백 10 팝오버 재확인창 (Popconfirm) [추가]', eng: 'Popconfirm balloon', slot: 'main', span: 'half', meta: '무거운 모달 대신 버튼 직상단 초경량 확인', desc: '[삭제] 버튼 클릭 시 화면 전체를 덮지 않고 버튼 바로 위에 작은 말풍선으로 "정말 삭제할까요?" 확인' },
        { id: 'fb_11', code: '피드백 11 알림 센터 인박스 [추가]', eng: 'Notification inbox drawer', slot: 'header', span: 'half', meta: '전체 알림 내역 보관 + [모두 읽음] 처리', desc: '종 아이콘 클릭 시 열리는 알림 보관함으로, 읽지 않은 알림 필터와 일괄 읽음 처리를 제공' }
      ],
      loading: [
        { id: 'ld_01', code: '로딩 01 스피너', eng: 'Spinner', slot: 'main', span: 'half', meta: '대기 시간: 불확정 (3초 미만 단기)', desc: '3초 미만의 짧은 비동기 처리 중임을 알리는 원형 회전 로더' },
        { id: 'ld_02', code: '로딩 02 스켈레톤 스크린', eng: 'Skeleton screen', slot: 'main', span: 'half', meta: '체감 속도: 최속 · 레이아웃 뼈대 쉬머', desc: '콘텐츠 레이아웃 뼈대에 쉬머(Shimmer) 애니메이션을 선노출해 체감 대기 시간 단축' },
        { id: 'ld_03', code: '로딩 03 진행 바', eng: 'Progress bar', slot: 'main', span: 'half', meta: '대기 시간: 확정형(%) 가로 게이지', desc: '파일 업로드나 변환 작업의 진행률(0~100%)을 명확히 보여주는 가로 바' },
        { id: 'ld_04', code: '로딩 04 진행 링', eng: 'Progress ring', slot: 'main', span: 'half', meta: '대기 시간: 확정형(%) 원형 도넛', desc: '좁은 위젯이나 아이콘 내부 공간에 적합한 원형 도넛 진행률(%) 게이지' },
        { id: 'ld_05', code: '로딩 05 단계 표시기', eng: 'Process Stepper', slot: 'header', span: 'full', meta: '다단계 프로세스(1-2-3) 투명화', desc: '1-2-3 다단계 처리 과정에서 현재 어느 구간을 통과 중인지 마일스톤 표시' },
        { id: 'ld_06', code: '로딩 06 블러 업 이미지', eng: 'Blur-up image', slot: 'main', span: 'half', meta: '고화질 미디어 화이트아웃 방지', desc: '초저용량 블러 프리뷰를 즉시 띄운 뒤 고화질 원본 이미지로 부드럽게 디졸브' },
        { id: 'ld_07', code: '로딩 07 낙관적 UI', eng: 'Optimistic UI', slot: 'behavior', span: 'half', meta: '체감 대기: 0초 (서버 응답 전 선반영)', desc: '서버 응답을 기다리지 않고 좋아요·북마크 토글 결과를 0초 만에 화면에 선반영' },
        { id: 'ld_08', code: '로딩 08 스트리밍 텍스트', eng: 'Streaming text', slot: 'main', span: 'full', meta: '첫 글자 도달 시간(TTFT) 체감 단축', desc: '긴 응답 전체가 완성되기 전 생성된 문장 조각부터 실시간으로 화면에 출력' },
        { id: 'ld_09', code: '로딩 09 로딩 버튼', eng: 'Loading button', slot: 'bottom', span: 'full', meta: '중복 클릭/결제 원천 차단 (Disable)', desc: '클릭 즉시 버튼 내부에 스피너를 돌리고 버튼을 비활성화해 중복 제출 방지' },
        { id: 'ld_10', code: '로딩 10 백그라운드 작업 트레이 [추가]', eng: 'Background upload tray', slot: 'bottom', span: 'half', meta: '우측 하단 최소화 창 · 화면 이동 중에도 유지', desc: '대용량 파일 다중 업로드 시 우측 하단 작은 트레이로 최소화하여 다른 작업을 방해하지 않음' }
      ],
      indicator: [
        { id: 'ind_01', code: '인디케이터 01 프로그레스 바', eng: 'Linear Progress bar', slot: 'main', span: 'half', meta: '0~100% 직선 막대 게이지', desc: '전체 작업량 대비 완료 비율(0~100%)을 직선 막대로 채워 보여주는 기본 표시기' },
        { id: 'ind_02', code: '인디케이터 02 스텝 인디케이터', eng: 'Step indicator', slot: 'header', span: 'full', meta: '번호 노드(1-2-3-4) 연결선', desc: '다단계 폼에서 전체 몇 단계 중 몇 번째 단계에 와 있는지 번호 노드로 안내' },
        { id: 'ind_03', code: '인디케이터 03 페이지 도트', eng: 'Page indicator (Dots)', slot: 'main', span: 'half', meta: '캐러셀 하단 점(Dot) + 활성 알약(Pill)', desc: '배너 슬라이드 하단에 점들을 나열하고 현재 페이지만 길쭉한 알약 모양으로 강조' },
        { id: 'ind_04', code: '인디케이터 04 스토리 바', eng: 'Story progress bar', slot: 'header', span: 'full', meta: '인스타 스토리풍 상단 분할 타이머', desc: '상단에 얇은 분할 막대를 배치해 전체 장수와 현재 장의 남은 재생 시간을 동시 전달' },
        { id: 'ind_05', code: '인디케이터 05 스크롤 진행 바', eng: 'Scroll progress bar', slot: 'header', span: 'full', meta: '상단 최외곽 테두리 아티클 완독률', desc: '긴 아티클이나 약관을 내려 읽을 때 최상단 테두리에 파란 선이 차오르며 완독률 표시' },
        { id: 'ind_06', code: '인디케이터 06 원형 진행률', eng: 'Circular Progress ring', slot: 'main', span: 'half', meta: '도넛 링 + 중앙 퍼센트(%) 숫자', desc: '도넛 모양 링 안에 퍼센트 숫자를 함께 넣어 프로필 완성도나 미션 달성률 표시' },
        { id: 'ind_07', code: '인디케이터 07 비밀번호 강도 표시기', eng: 'Password Strength meter', slot: 'main', span: 'half', meta: '4칸 분할 막대 (위험→보통→안전)', desc: '비밀번호 입력창 아래 4칸 분할 막대의 색상(빨강/노랑/초록)으로 보안 등급 실시간 코칭' },
        { id: 'ind_08', code: '인디케이터 08 탭 밑줄 인디케이터', eng: 'Tab bar active line', slot: 'header', span: 'full', meta: '선택된 상단 탭 아래 슬라이딩 밑줄', desc: '상단 탭 전환 시 활성 탭 글자 아래로 파란 밑줄(Active Line)이 미끄러지듯 이동' },
        { id: 'ind_09', code: '인디케이터 09 홈 인디케이터', eng: 'Home indicator (Safe Area)', slot: 'bottom', span: 'full', meta: '모바일 최하단 시스템 바 (34px 여백)', desc: '스마트폰 최하단 제스처 가로 막대 영역과 하단 버튼이 겹치지 않도록 Safe Area 보장' },
        { id: 'ind_10', code: '인디케이터 10 실시간 상태 펄스 점 [추가]', eng: 'Live status pulse dot', slot: 'header', span: 'half', meta: '온라인/실시간 스트리밍 중 초록색 파동 점', desc: '서버 정상 작동, 상담원 접속 중, 라이브 방송 중임을 반짝이는 파동(Ping) 도트로 표시' }
      ],
      ai: [
        { id: 'ai_01', code: 'AI 01 생각 중 표시', eng: 'Thinking indicator', slot: 'main', span: 'half', meta: '3구 바운스 도트 · 추론 대기 안내', desc: '모델이 프롬프트를 분석·추론할 때 멈춤 오해를 막는 3개의 바운스 점과 상태 문구' },
        { id: 'ai_02', code: 'AI 02 스트리밍 답변', eng: 'Streaming response', slot: 'main', span: 'full', meta: '실시간 토큰 타자기 + 깜빡이는 커서', desc: '전체 답변 완료 전 생성되는 토큰 단위로 커서와 함께 실시간 타자기 출력' },
        { id: 'ai_03', code: 'AI 03 추천 질문 칩', eng: 'Suggested prompts', slot: 'main', span: 'half', meta: '빈 화면 증후군 해소 · 원클릭 프롬프트', desc: '무엇을 질문할지 막막한 사용자에게 맥락에 맞는 질문 후보 칩을 제안해 대화 장벽 완화' },
        { id: 'ai_04', code: 'AI 04 다시 생성 & 버전 비교', eng: 'Regenerate & Versioning', slot: 'main', span: 'half', meta: '답변 재생성 및 버전(< 1/2 >) 탐색', desc: '답변을 다른 관점으로 다시 생성하고 이전 생성 버전과 최신 버전을 좌우로 비교' },
        { id: 'ai_05', code: 'AI 05 출처 각주 표시', eng: 'Citations / Grounding', slot: 'main', span: 'half', meta: '할루시네이션 방지 · RAG 근거 팝오버', desc: '문장 끝에 각주 번호([1], [2])를 달고 클릭 시 참고한 RAG 문서/웹 출처 팝오버 노출' },
        { id: 'ai_06', code: 'AI 06 답변 평가 피드백', eng: 'RLHF Feedback buttons', slot: 'main', span: 'half', meta: '좋아요(👍)/싫어요(👎) 및 복사 바', desc: '응답 하단에 좋아요/싫어요 평가 버튼과 클립보드 원클릭 복사 액션 바 배치' },
        { id: 'ai_07', code: 'AI 07 고쳐 묻기', eng: 'Edit and resend prompt', slot: 'main', span: 'half', meta: '보낸 질문 인라인 수정 및 대화 재분기', desc: '사용자가 이미 보낸 질문 말풍선 옆 연필 아이콘을 눌러 프롬프트를 수정 후 재전송' },
        { id: 'ai_08', code: 'AI 08 멀티모달 파일 첨부', eng: 'Multimodal File attachment', slot: 'bottom', span: 'full', meta: '채팅 입력창 내 이미지·PDF 썸네일 칩', desc: '프롬프트 입력창 상단에 업로드된 PDF·이미지 썸네일 프리뷰 칩과 개별 제거(X) 제공' },
        { id: 'ai_09', code: 'AI 09 에이전트 실행 단계', eng: 'Agent tool steps', slot: 'main', span: 'full', meta: '다단계 도구 호출 파이프라인 시각화', desc: '에이전트가 수행 중인 하위 작업(읽기→비교→정리) 진행 상태를 체크리스트로 투명 공개' },
        { id: 'ai_10', code: 'AI 10 아티팩트/캔버스 분할 뷰 [추가]', eng: 'Side-by-side Artifact canvas', slot: 'main', span: 'full', meta: '좌측 대화창 + 우측 실시간 코드/문서 프리뷰', desc: '채팅창 안에서 긴 코드나 문서를 말풍선에 가두지 않고 우측 전용 캔버스 창에 렌더링·편집' },
        { id: 'ai_11', code: 'AI 11 슬래시(/) & 멘션(@) 프롬프트 메뉴 [추가]', eng: 'Slash & Mention command menu', slot: 'bottom', span: 'half', meta: '입력창에서 /요약, @문서명 즉시 호출', desc: '프롬프트 입력 중 / 또는 @를 치면 사용할 스킬이나 참조할 파일 목록 팝오버가 즉시 노출' },
        { id: 'ai_12', code: 'AI 12 생성 즉시 중단 버튼 [추가]', eng: 'Stop generating button', slot: 'bottom', span: 'half', meta: '스트리밍 도중 ■ 중지 버튼으로 즉시 제어권 반환', desc: 'AI가 답변을 생성하는 도중 전송 화살표가 정지(■) 버튼으로 바뀌어 원치 않는 출력을 즉시 멈춤' }
      ],
      gesture: [
        { id: 'gs_01', code: '제스처 01 탭', eng: 'Tap', slot: 'behavior', span: 'half', meta: '기본 1회 터치 · 44×44px 안전 타깃', desc: '최소 44×44px 이상의 터치 안전 영역을 확보한 가벼운 1회 탭 인터랙션' },
        { id: 'gs_02', code: '제스처 02 길게 누르기', eng: 'Long press', slot: 'behavior', span: 'half', meta: '0.8초 꾹 누름 · 컨텍스트 퀵 메뉴', desc: '항목을 0.8초간 길게 눌러 숨겨진 컨텍스트 메뉴(복사/보관/삭제)나 미리보기 호출' },
        { id: 'gs_03', code: '제스처 03 스와이프', eng: 'Horizontal Swipe', slot: 'behavior', span: 'half', meta: '좌우 쓸어넘김 · 캐러셀/탭 전환', desc: '손가락으로 가로 축을 쓸어넘겨 캐러셀 카드나 탭 화면을 부드럽게 전환' },
        { id: 'gs_04', code: '제스처 04 밀어서 삭제', eng: 'Swipe to delete', slot: 'behavior', span: 'half', meta: '리스트 행 좌측 스와이프 · 삭제 버튼 노출', desc: '목록 아이템을 왼쪽으로 밀어 숨겨진 빨간색 [삭제] 액션 버튼을 노출' },
        { id: 'gs_05', code: '제스처 05 드래그 앤 드롭', eng: 'Drag and drop', slot: 'behavior', span: 'half', meta: '그립 핸들 이동 · 우선순위 순서 재정렬', desc: '그립 핸들(⋮⋮)을 잡고 끌어 리스트나 칸반 카드의 순서를 실시간 재정렬' },
        { id: 'gs_06', code: '제스처 06 핀치 줌', eng: 'Pinch to zoom', slot: 'behavior', span: 'half', meta: '두 손가락 벌리기 · 이미지/지도 확대', desc: '두 손가락을 벌리고 오므려 상세 이미지나 차트·지도의 배율을 자유롭게 확대/축소' },
        { id: 'gs_07', code: '제스처 07 두 번 탭', eng: 'Double tap', slot: 'behavior', span: 'half', meta: '연속 2회 터치 · 즉시 하트 좋아요', desc: '콘텐츠 영역을 연속 2번 빠르게 탭하여 즉시 하트 좋아요 애니메이션 트리거' },
        { id: 'gs_08', code: '제스처 08 당겨서 새로고침', eng: 'Pull to refresh', slot: 'behavior', span: 'half', meta: '최상단 아래로 당김 · 최신 피드 리로드', desc: '스크롤 최상단에서 화면을 아래로 끌어당겨 최신 피드 데이터를 새로고침' },
        { id: 'gs_09', code: '제스처 09 가장자리 스와이프', eng: 'Edge swipe', slot: 'behavior', span: 'half', meta: '좌측 베젤 끝 스와이프 · 이전 화면 복귀', desc: '화면 왼쪽 끝 테두리에서 안쪽으로 쓸어넘겨 뒤로 가기(Back) 제스처 수행' },
        { id: 'gs_10', code: '제스처 10 바텀시트 스냅 드래그 [추가]', eng: 'Bottom sheet snap drag', slot: 'behavior', span: 'half', meta: '상단 핸들 바를 끌어 50% ↔ 95% 높이 조절', desc: '바텀시트 상단의 가로 손잡이(Grabber)를 위아래로 끌어 반만 열거나 전체 화면으로 확장' }
      ],
      motion: [
        { id: 'mo_01', code: '움직임 01 이즈 인', eng: 'Ease-in', slot: 'behavior', span: 'half', meta: '천천히 출발 후 가속 (퇴장 모션 표준)', desc: '천천히 움직이기 시작해 점점 빨라지며 화면 밖으로 퇴장할 때 쓰는 가속 곡선' },
        { id: 'mo_02', code: '움직임 02 이즈 아웃', eng: 'Ease-out', slot: 'behavior', span: 'half', meta: '빠른 진입 후 끝 감속 (등장 모션 표준)', desc: '빠르게 진입한 뒤 목표 지점 끝에서 부드럽게 감속하며 안착하는 표준 등장 모션' },
        { id: 'mo_03', code: '움직임 03 스프링', eng: 'Spring overshoot', slot: 'behavior', span: 'half', meta: '오버슈트 탄성 반동 (iOS 물리 감각)', desc: '목표 지점을 살짝 넘쳤다가 탄성 있게 제자리로 안착하는 쫀득한 물리 스프링 모션' },
        { id: 'mo_04', code: '움직임 04 바운스', eng: 'Bounce', slot: 'behavior', span: 'half', meta: '통통 튀는 착지 반동 · 알림/성공 강조', desc: '바닥에 공이 통통 튀듯 착지하는 모션으로 에러 흔들림이나 완료 배지 강조에 활용' },
        { id: 'mo_05', code: '움직임 05 순차 등장', eng: 'Stagger', slot: 'behavior', span: 'half', meta: '0.06초 시차(Delay) 계단식 리스트 등장', desc: '여러 개의 카드나 리스트 행이 0.06초 시차를 두고 차례대로 물 흐르듯 등장' },
        { id: 'mo_06', code: '움직임 06 페이드', eng: 'Fade transition', slot: 'behavior', span: 'half', meta: '투명도(Opacity) 교차 디졸브', desc: '위치 이동 없이 투명도(0→1)만 부드럽게 조절하여 시각적 피로 없이 요소 전환' },
        { id: 'mo_07', code: '움직임 07 슬라이드', eng: 'Slide transition', slot: 'behavior', span: 'half', meta: '수평/수직 축 이동 · 계층 방향성 암시', desc: '다음 단계는 우→좌, 이전 단계는 좌→우로 밀려 들어오며 공간적 방향성 전달' },
        { id: 'mo_08', code: '움직임 08 확대 전환', eng: 'Zoom transition', slot: 'behavior', span: 'half', meta: '스케일(0.9→1.0) 줌인 · 모달/팝업 등장', desc: '작은 크기에서 중심부로부터 확대되며 나타나 시선을 집중시키는 모달/상세 전환' },
        { id: 'mo_09', code: '움직임 09 공유 요소 전환', eng: 'Shared element transition', slot: 'behavior', span: 'half', meta: '리스트 썸네일 → 상세 헤더 심리스 확장', desc: '목록의 작은 카드 이미지가 끊김 없이 다음 화면의 상단 히어로 배너로 커지며 이어짐' },
        { id: 'mo_10', code: '움직임 10 패럴랙스 깊이 스크롤 [추가]', eng: 'Parallax depth scroll', slot: 'behavior', span: 'half', meta: '배경과 전경 레이어의 스크롤 속도 차 입체감', desc: '스크롤 시 배경 이미지는 천천히 움직이고 전경 카드는 빠르게 올라가며 공간적 깊이감을 연출' }
      ],
      text_anim: [
        { id: 'txt_01', code: '글자효과 01 타이핑', eng: 'Typewriter', slot: 'behavior', span: 'half', meta: '깜빡이는 커서 + 한 글자씩 타자기 출력', desc: '깜빡이는 커서와 함께 키보드로 한 글자씩 직접 치는 듯한 친근한 인트로 타이포 효과' },
        { id: 'txt_02', code: '글자효과 02 페이드 업', eng: 'Fade up text', slot: 'behavior', span: 'half', meta: '투명 상태에서 아래→위로 16px 떠오름', desc: '투명한 상태에서 아래에서 위로 부드럽게 떠오르며 나타나는 섹션 헤드라인 표준' },
        { id: 'txt_03', code: '글자효과 03 글자 순차 등장', eng: 'Letter stagger', slot: 'behavior', span: 'half', meta: '음절별 0.05초 시차 파도타기 리듬', desc: '문장 내 글자(음절)마다 미세한 시차를 주어 파도타기처럼 리드미컬하게 솟아오름' },
        { id: 'txt_04', code: '글자효과 04 숫자 카운트 업', eng: 'Number Count up', slot: 'behavior', span: 'half', meta: '0 → 목표 수치(1,280명) 고속 롤링', desc: '0에서 목표 실적·통계 숫자까지 바쁘게 올라가며 멈추어 성과 지표를 드라마틱하게 강조' },
        { id: 'txt_05', code: '글자효과 05 스크램블 디코딩', eng: 'Text Scramble', slot: 'behavior', span: 'half', meta: '무작위 암호 문자(XQ#9) → 본문 해독', desc: '랜덤 기호와 문자가 고속으로 뒤섞이다가 암호가 풀리듯 원래 단어로 맞춰지는 테크 모션' },
        { id: 'txt_06', code: '글자효과 06 마스크 리빌', eng: 'Mask reveal', slot: 'behavior', span: 'half', meta: '보이지 않는 절단선(overflow-hidden) 위 솟음', desc: '투명 가림막(overflow: hidden) 바닥 틈새에서 글자가 쑥 솟아오르듯 고급스럽게 등장' },
        { id: 'txt_07', code: '글자효과 07 형광펜 하이라이트', eng: 'Marker Highlight sweep', slot: 'behavior', span: 'half', meta: '텍스트 뒷배경 좌→우 형광펜 마커 드로잉', desc: '핵심 문구 뒷배경에 파란/노란 형광펜을 왼쪽에서 오른쪽으로 쓱 긋는 강조 효과' },
        { id: 'txt_08', code: '글자효과 08 단어 슬롯 교체', eng: 'Word rotate', slot: 'behavior', span: 'half', meta: '앞뒤 문장 고정 + 핵심 키워드만 상하 롤링', desc: '문장 골격은 유지하고 핵심 단어만 [기획→디자인→배포]처럼 슬롯머신처럼 순환 교체' },
        { id: 'txt_09', code: '글자효과 09 블러 인 포커스', eng: 'Blur in focus', slot: 'behavior', span: 'half', meta: '뿌연 흐림(blur 12px) → 선명한 초점 맺힘', desc: '카메라 렌즈 초점이 맞춰지듯 흐릿한 상태에서 선명한 글자로 맺히는 시네마틱 효과' },
        { id: 'txt_10', code: '글자효과 10 그라데이션 광택 쉬머 [추가]', eng: 'Gradient text shimmer', slot: 'behavior', span: 'half', meta: '글자 결을 따라 은은한 빛이 좌→우로 흐름', desc: 'AI 추론 상태 문구나 프리미엄 헤드라인 글자 내부에 메탈릭/컬러 빛줄기가 스쳐 지나가는 효과' }
      ],
      visual_style: [
        { id: 'sty_01', code: '비주얼 01 리퀴드 모션', eng: 'Liquid Motion', slot: 'behavior', span: 'half', meta: '유기적 액체 표면장력 합체/분리', desc: '물방울이나 젤리가 자석처럼 달라붙고 늘어나는 쫀득한 SVG Gooey 유기적 모션 스타일' },
        { id: 'sty_02', code: '비주얼 02 홀로그래픽', eng: 'Holographic', slot: 'behavior', span: 'half', meta: '무지갯빛 오팔 프리즘 스펙트럼 광택', desc: '보는 각도에 따라 무지갯빛 스펙트럼이 흐르는 사이버네틱·Web3 프리즘 그라데이션' },
        { id: 'sty_03', code: '비주얼 03 클레이모피즘', eng: 'Claymorphism', slot: 'behavior', span: 'half', meta: '말랑한 점토 3D 입체 + 이중 내부 그림자', desc: '토스·피그마 스타일처럼 둥근 형태에 내부 하이라이트와 외부 그림자를 준 푹신한 3D 스타일' },
        { id: 'sty_04', code: '비주얼 04 하프톤 팝아트', eng: 'Halftone Dots', slot: 'behavior', span: 'half', meta: '코믹북 망점(Dot) 격자 인쇄 질감', desc: '빈티지 만화책 인쇄처럼 연속 톤을 망점(Dot) 크기와 밀도로 표현하는 팝아트 무드' },
        { id: 'sty_05', code: '비주얼 05 아이소메트릭', eng: 'Isometric 3D', slot: 'behavior', span: 'half', meta: '30도 등각 투영 · 왜곡 없는 입체 조망', desc: '원근 왜곡 없이 30도 각도로 3차원 블록 구조를 정밀하게 조망하는 B2B 인포그래픽 스타일' },
        { id: 'sty_06', code: '비주얼 06 키네틱 타이포', eng: 'Kinetic Typography', slot: 'behavior', span: 'half', meta: '박진감 넘치는 무한 마키 & 비트 텍스트', desc: '텍스트 자체를 주인공으로 삼아 무한 루프 마키(Marquee)와 강한 대비로 에너지를 전달' },
        { id: 'sty_07', code: '비주얼 07 Y2K 크롬', eng: 'Y2K Metallic Chrome', slot: 'behavior', span: 'half', meta: '액체 은색 금속 광택 + 세기말 사이버', desc: '2000년대 테크노 감성의 고광택 액체 크롬 타이포와 네온 글로우 스타일' },
        { id: 'sty_08', code: '비주얼 08 페이퍼 컷아웃', eng: 'Paper Cutout', slot: 'behavior', span: 'half', meta: '다층 색지 오리기 + 따뜻한 단면 그림자', desc: '색지를 가위로 오려 여러 겹 겹쳐 놓은 듯한 다층 레이어 그림자와 아날로그 공예 감성' },
        { id: 'sty_09', code: '비주얼 09 인피니트 줌', eng: 'Infinite Zoom', slot: 'behavior', span: 'half', meta: '프레임 속의 프레임 무한 확대 트랜지션', desc: '객체 내부로 끝없이 빨려 들어가듯 연속 스케일 줌인되는 몰입형 연출' },
        { id: 'sty_10', code: '비주얼 10 베이퍼웨이브', eng: 'Vaporwave', slot: 'behavior', span: 'half', meta: '80년대 네온 핑크/시안 + 와이어프레임 지평선', desc: '80~90년대 레트로 퓨처리즘 네온 컬러와 스캔라인 그리드 배경의 노스탤지어 무드' },
        { id: 'sty_11', code: '비주얼 11 텍스트 스크램블 테마', eng: 'Cyber Text Scramble', slot: 'behavior', span: 'half', meta: '터미널 그린 + 암호 해독 디코딩 테마', desc: '사이버 보안·해킹 콘셉트의 모노스페이스 터미널과 난수 해독 연출' },
        { id: 'sty_12', code: '비주얼 12 바우하우스', eng: 'Bauhaus Geometric', slot: 'behavior', span: 'half', meta: '원·삼각·사각 순수 기하학 + 3원색 조형', desc: '장식을 배제하고 순수 기하학 도형과 빨강·노랑·파랑 삼원색 균형을 살린 모더니즘' },
        { id: 'sty_13', code: '비주얼 13 뉴브루탈리즘', eng: 'Neubrutalism', slot: 'behavior', span: 'half', meta: '2px 블랙 실선 테두리 + 블러 없는 하드 그림자', desc: '굵은 검은색 외곽선과 블러 없는 딱딱한 그림자(4px 4px 0 #000), 고채도 원색 대비' },
        { id: 'sty_14', code: '비주얼 14 셰이프 모프', eng: 'Shape Morphing', slot: 'behavior', span: 'half', meta: '단절 없는 벡터 도형/아이콘 연속 변신', desc: '원에서 사각형, 아이콘으로 끊김 없이 형태가 유기적으로 변하는 패스 모핑' },
        { id: 'sty_15', code: '비주얼 15 멤피스 디자인', eng: 'Memphis 80s', slot: 'behavior', span: 'half', meta: '지그재그 물결선 + 도트 패턴 + 캔디 컬러', desc: '규칙에 얽매이지 않는 지그재그 도형과 파스텔·네온 컬러의 유쾌한 팝 스타일' },
        { id: 'sty_16', code: '비주얼 16 라인 애니메이션', eng: 'Stroke Line Draw', slot: 'behavior', span: 'half', meta: '면 채우기 없는 단일 획(Stroke) 드로잉', desc: '색 채움 없이 얇고 정교한 외곽선(SVG Stroke)이 스스로 그려지며 완성되는 미니멀 기법' },
        { id: 'sty_17', code: '비주얼 17 로우 폴리', eng: 'Low Poly 3D', slot: 'behavior', span: 'half', meta: '각진 다각형 평면 음영 (디지털 종이접기)', desc: '곡면 스무딩 없이 다각형(Polygon) 면의 명암 대비를 살린 디지털 오리가미 3D' },
        { id: 'sty_18', code: '비주얼 18 스쿼시 앤 스트레치', eng: 'Squash & Stretch', slot: 'behavior', span: 'half', meta: '이동 시 팽창 · 착지 시 압축 탄성 부피보존', desc: '디즈니 애니메이션 제1원칙으로 버튼 클릭이나 카드 이동 시 찌그러졌다 펴지는 탄력 부여' },
        { id: 'sty_19', code: '비주얼 19 그레이니 그라디언트', eng: 'Grainy Gradient', slot: 'behavior', span: 'half', meta: '몽환적 다색 그라데이션 + 필름 노이즈 입자', desc: '부드러운 컬러 그라데이션 위에 미세한 필름 그레인(Noise) 입자를 얹은 감성 벨벳 질감' },
        { id: 'sty_20', code: '비주얼 20 글리치', eng: 'Digital Glitch', slot: 'behavior', span: 'half', meta: 'RGB 채널 분리 색수차 + 슬라이스 노이즈', desc: '틱톡·사이버펑크풍의 RGB 색상 분리와 디지털 신호 왜곡을 활용한 강렬한 테크 아트워크' },
        { id: 'sty_21', code: '비주얼 21 글래스모피즘 [추가]', eng: 'Glassmorphism', slot: 'behavior', span: 'half', meta: '반투명 배경 블러(backdrop-blur) + 얇은 유리 테두리', desc: 'Apple VisionOS·macOS처럼 반투명 유리 질감(backdrop-blur-md)과 은은한 흰색 테두리로 깊이감 표현' }
      ],
      chart: [
        { id: 'cht_01', code: '차트 01 스파크라인 미니 추이선', eng: 'Sparkline chart', slot: 'main', span: 'half', meta: 'KPI 숫자 카드 내부 초소형 추세선', desc: '축이나 눈금 없이 KPI 숫자 옆에 최근 7일간의 상승/하락 추세만 직관적으로 그리는 미니 선 그래프' },
        { id: 'cht_02', code: '차트 02 도넛 & 비중 차트', eng: 'Donut & Breakdown chart', slot: 'main', span: 'half', meta: '카테고리별 점유율(%) + 중앙 합계 표시', desc: '전체 대비 각 항목이 차지하는 비중(%)을 색상 링으로 나누고 도넛 중앙에 총합 수치를 배치' },
        { id: 'cht_03', code: '차트 03 막대 & 그룹 비교 차트', eng: 'Grouped Bar chart', slot: 'main', span: 'full', meta: '월별/항목별 실적 높이 직관적 대조', desc: '기간별 매출이나 카테고리 간 수치를 수직·수평 막대 길이로 나란히 비교하고 호버 시 툴팁 표시' },
        { id: 'cht_04', code: '차트 04 잔디 캘린더 히트맵', eng: 'Contribution Heatmap', slot: 'main', span: 'full', meta: 'GitHub 스타일 일별 활동 밀도 타일', desc: '365일 또는 요일·시간대별 활동 빈도를 타일 색상의 진하기(농도)로 시각화해 꾸준함을 증명' },
        { id: 'cht_05', code: '차트 05 전환 퍼널 차트', eng: 'Conversion Funnel chart', slot: 'main', span: 'full', meta: '방문→가입→장바구니→결제 단계별 이탈률', desc: '사용자 여정 단계별로 몇 %가 남고 어디서 가장 많이 이탈했는지 깔때기 폭으로 시각화' },
        { id: 'cht_06', code: '차트 06 레이더 역량 오각형', eng: 'Radar / Spider chart', slot: 'main', span: 'half', meta: '5~6개 다면 평가 지표 밸런스 비교', desc: '인재 역량 평가나 상품 스펙(성능·가격·디자인·내구성)의 균형도를 다각형 면적으로 한눈에 비교' }
      ],
      commerce: [
        { id: 'com_01', code: '커머스 01 요금제 가격 비교 카드', eng: 'Pricing tier cards', slot: 'main', span: 'full', meta: 'Free/Pro/Enterprise 3단 비교 + 추천 배지', desc: '[월간/연간 20% 할인] 토글과 함께 요금제별 포함 기능을 비교하고 주력 플랜에 [Most Popular] 강조' },
        { id: 'com_02', code: '커머스 02 하단 고정 구매 바', eng: 'Sticky bottom buy bar', slot: 'bottom', span: 'full', meta: '상세페이지 스크롤 시에도 [찜 + 구매하기] 상시 노출', desc: '긴 상품 상세 설명을 내려 읽는 도중에도 언제든 즉시 옵션을 열고 결제할 수 있는 하단 고정 바' },
        { id: 'com_03', code: '커머스 03 슬라이드 장바구니 드로어', eng: 'Slide-over Mini Cart', slot: 'bottom', span: 'half', meta: '페이지 이동 없이 우측에서 열리는 장바구니', desc: '상품 담기 클릭 시 현재 페이지를 떠나지 않고 우측 드로어로 담긴 목록과 무료배송까지 남은 금액 표시' },
        { id: 'com_04', code: '커머스 04 별점 평균 & 리뷰 분포 바', eng: 'Rating summary & breakdown', slot: 'main', span: 'half', meta: '★ 4.8 평균 + 5점~1점 비율 가로 막대', desc: '단순 별점 평균뿐만 아니라 5점·4점·1점 리뷰가 각각 몇 %인지 가로 게이지 바로 신뢰도 있게 제시' },
        { id: 'com_05', code: '커머스 05 쿠폰·프로모션 코드 입력', eng: 'Promo code input box', slot: 'main', span: 'half', meta: '할인 코드 검증 + 즉시 차감 금액 피드백', desc: '결제 직전 프로모션 코드를 입력해 유효성을 검증하고 할인된 최종 결제 금액을 실시간 재계산' },
        { id: 'com_06', code: '커머스 06 주문 금액 영수증 요약', eng: 'Order summary receipt', slot: 'main', span: 'half', meta: '상품가 - 할인 + 배송비 = 최종 결제액 명세', desc: '총 상품 금액, 등급 할인, 쿠폰 차감, 배송비를 투명하게 가감하여 최종 결제 예정 금액을 확정' }
      ],
      auth: [
        { id: 'aut_01', code: '계정 01 아바타 스택 & 멤버 초대', eng: 'Avatar group stack', slot: 'header', span: 'half', meta: '겹쳐진 원형 프로필 사진 + [+4명] 배지 + 초대', desc: '현재 워크스페이스나 문서에 참여 중인 팀원들의 프로필을 겹쳐 보여주고 [+ 멤버 초대] 모달 연결' },
        { id: 'aut_02', code: '계정 02 권한·역할(RBAC) 관리 표', eng: 'Role & Permission matrix', slot: 'main', span: 'full', meta: 'Owner / Admin / Editor / Viewer 권한 드롭다운', desc: '팀원별로 열람·편집·결제·멤버관리 권한을 부여하거나 회수하는 엔터프라이즈 설정 테이블' },
        { id: 'aut_03', code: '계정 03 API 키 마스킹 & 복사 박스', eng: 'Secret API key reveal & copy', slot: 'main', span: 'half', meta: 'sk-•••••• 마스킹 + 눈 아이콘 보기 + 원클릭 복사', desc: '보안 토큰이나 API 키를 기본 별표(•)로 가려두고 필요할 때만 노출하거나 클립보드로 안전하게 복사' },
        { id: 'aut_04', code: '계정 04 위험 구역 (Danger Zone)', eng: 'Danger zone confirmation', slot: 'main', span: 'full', meta: '붉은 테두리 경고 + 프로젝트명 타이핑 후 영구 삭제', desc: '계정 탈퇴나 데이터 초기화처럼 되돌릴 수 없는 파괴적 액션을 붉은 박스로 격리해 실수를 방지' },
        { id: 'aut_05', code: '계정 05 패스키 & 2단계 인증(2FA) 설정', eng: 'Passkey & 2FA security card', slot: 'main', span: 'half', meta: '생체인증(FaceID) 패스키 등록 및 활성 배지', desc: '비밀번호 없는 로그인(Passkey)이나 OTP 앱 연동을 설정하고 활성 보안 상태를 표시하는 카드' }
      ],
      media_collab: [
        { id: 'med_01', code: '미디어 01 이미지 라이트박스 뷰어', eng: 'Image Lightbox gallery', slot: 'bottom', span: 'full', meta: '클릭 시 어두운 배경 위 고해상도 원본 확대', desc: '썸네일 클릭 시 주변을 어둡게 덮고 고화질 원본 이미지와 좌우 넘김·줌 컨트롤을 띄우는 뷰어' },
        { id: 'med_02', code: '미디어 02 비포 & 애프터 비교 슬라이더', eng: 'Before / After split slider', slot: 'main', span: 'full', meta: '중앙 분할선을 좌우로 끌어 보정 전·후 비교', desc: 'AI 화질 개선, 인테리어 시공, 디자인 리뉴얼 전(Before)과 후(After)를 핸들 드래그로 겹쳐 비교' },
        { id: 'med_03', code: '미디어 03 오디오 파형(Waveform) 플레이어', eng: 'Audio waveform player', slot: 'main', span: 'half', meta: '음성 높낮이 막대 파형 + 구간 클릭 점프', desc: '회의 녹음이나 보이스 메모의 소리 크기 파형을 시각화하여 원하는 발언 구간으로 즉시 탐색' },
        { id: 'med_04', code: '미디어 04 스레드 댓글 & 이모지 리액션', eng: 'Threaded comments & reactions', slot: 'main', span: 'full', meta: '대댓글 들여쓰기 + 👍🎉❤️ 원클릭 공감 카운트', desc: '특정 문서 블록이나 피드에 대댓글 스레드를 달고 텍스트 없이도 이모지 칩으로 빠른 피드백 표시' },
        { id: 'med_05', code: '미디어 05 플로팅 PIP 미니 플레이어', eng: 'Picture-in-Picture (PIP) mini player', slot: 'bottom', span: 'half', meta: '스크롤/이동 시 우측 하단 작은 영상창 고정', desc: '라이브 방송이나 강의 영상을 보면서 다른 메뉴를 탐색할 수 있도록 구석에 띄워두는 미니 창' }
      ]
    };

    // 모든 아이템에 소속 쇼케이스 메타 정보 주입
    SHOWCASE_BOOKS.forEach(book => {
      const list = PATTERN_DB[book.key] || [];
      list.forEach(item => {
        item.catKey = book.key;
        item.catTitle = book.title;
        item.catShort = book.short;
        item.file = book.file;
      });
    });

    const ALL_PATTERNS = Object.values(PATTERN_DB).flat();
    const ACTIVE_PATTERNS = ALL_PATTERNS.filter(p => (p.status || 'active') === 'active');

    // =========================================================================
    // 3. 207종 전 패턴 리얼 미니 UI 그래픽 렌더러 (단순 텍스트 박스 완전 퇴출)
    // =========================================================================
    function getVisualWireframeHTML(item) {
      switch (item.id) {
        // [01. 레이아웃 & 02. 콘텐츠]
        case 'lay_01':
        case 'cnt_01':
          return `
            <div class="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 text-white p-3 rounded-xl flex items-center justify-between gap-2 shadow-xs">
              <div class="space-y-1">
                <span class="text-[8px] bg-blue-500/30 border border-blue-400/30 text-blue-200 px-1.5 py-0.5 rounded-full font-bold">HERO BANNER</span>
                <div class="text-xs font-extrabold tracking-tight">핵심 가치 제안 헤드라인 타이틀</div>
                <div class="text-[9px] text-slate-300">방문자의 시선을 사로잡는 상단 와이드 영역</div>
              </div>
              <span class="bg-blue-500 hover:bg-blue-400 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg shrink-0 shadow-xs">시작하기 →</span>
            </div>`;
        case 'lay_02':
        case 'cnt_02':
          return `
            <div class="grid grid-cols-3 gap-1.5 bg-slate-100 p-2 rounded-xl border border-slate-200/80 text-[9px]">
              <div class="col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-2 rounded-lg font-bold flex flex-col justify-between min-h-[48px]">
                <span>🍱 메인 핵심 기능 (2×2 Span)</span>
                <span class="text-[8px] text-blue-100">시각적 위계 1순위</span>
              </div>
              <div class="bg-white p-2 rounded-lg border border-slate-200 font-bold text-slate-700 flex flex-col justify-between">
                <span>요약 A</span><span class="text-blue-600 text-[10px]">98%</span>
              </div>
              <div class="bg-white p-1.5 rounded-lg border border-slate-200 text-slate-600 font-semibold text-center">모듈 B (1×1)</div>
              <div class="col-span-2 bg-white p-1.5 rounded-lg border border-slate-200 text-slate-700 font-bold flex items-center justify-between px-2.5">
                <span>비대칭 서브 모듈 C (2×1)</span><span class="text-emerald-600">● Active</span>
              </div>
            </div>`;
        case 'lay_03':
        case 'cnt_04':
          return `
            <div class="grid grid-cols-12 gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-[9px]">
              <div class="col-span-5 bg-white p-2 rounded-lg border border-slate-200 space-y-1">
                <div class="text-[8px] font-extrabold text-slate-400 uppercase">Left / Master</div>
                <div class="bg-blue-50 border border-blue-200 text-blue-700 font-bold px-2 py-1 rounded flex justify-between"><span>● 선택된 항목 #1</span><span>→</span></div>
                <div class="text-slate-500 px-2 py-0.5">○ 대기 중인 항목 #2</div>
              </div>
              <div class="col-span-7 bg-white p-2 rounded-lg border border-slate-200 flex flex-col justify-between">
                <div class="flex justify-between items-center"><span class="text-[8px] font-extrabold text-blue-600 uppercase">Right / Detail View</span><span class="px-1.5 py-0.2 bg-emerald-50 text-emerald-600 rounded font-bold">상세 열람</span></div>
                <div class="h-2.5 w-3/4 bg-slate-200 rounded my-1"></div>
                <div class="h-2 w-1/2 bg-slate-100 rounded"></div>
              </div>
            </div>`;
        case 'lay_04':
          return `
            <div class="grid grid-cols-3 gap-1.5 text-[9px]">
              <div class="bg-white p-1.5 rounded-lg border border-slate-200"><div class="h-7 bg-blue-50 rounded mb-1"></div><div class="font-bold text-slate-700 truncate">균일 카드 #1</div></div>
              <div class="bg-white p-1.5 rounded-lg border-2 border-blue-500"><div class="h-7 bg-blue-100 rounded mb-1"></div><div class="font-bold text-blue-600 truncate">균일 카드 #2</div></div>
              <div class="bg-white p-1.5 rounded-lg border border-slate-200"><div class="h-7 bg-slate-100 rounded mb-1"></div><div class="font-bold text-slate-700 truncate">균일 카드 #3</div></div>
            </div>`;
        case 'lay_05':
          return `
            <div class="flex gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-[9px]">
              <div class="w-16 bg-slate-900 text-white p-1.5 rounded-lg space-y-1 shrink-0"><div class="bg-blue-600 px-1.5 py-0.5 rounded font-bold">홈</div><div class="text-slate-400 px-1.5">분석</div></div>
              <div class="flex-1 bg-white p-2 rounded-lg border border-slate-200 font-semibold text-slate-700 flex items-center justify-center">우측 메인 작업 캔버스 (Workspace)</div>
            </div>`;
        case 'lay_06':
          return `
            <div class="grid grid-cols-12 gap-1.5 bg-white p-2 rounded-xl border border-slate-200 text-[9px]">
              <div class="col-span-6 bg-slate-900 text-white p-2 rounded-lg flex flex-col justify-end min-h-[46px]"><span class="text-[8px] text-amber-300 font-bold">COVER STORY</span><span class="font-extrabold">헤드라인 특집 기사</span></div>
              <div class="col-span-6 space-y-1"><div class="p-1 bg-slate-50 rounded border border-slate-100 font-semibold">• 에디토리얼 칼럼 01</div><div class="p-1 bg-slate-50 rounded border border-slate-100 font-semibold">• 트렌드 리포트 02</div></div>
            </div>`;
        case 'lay_07':
        case 'cnt_08':
          return `
            <div class="grid grid-cols-3 gap-1.5 text-[9px]">
              <div class="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                <div class="text-slate-400 font-medium">전환율 KPI</div>
                <div class="text-xs font-extrabold text-slate-900 mt-0.5">68.4% <span class="text-[8px] text-emerald-600 font-bold">▲12%</span></div>
              </div>
              <div class="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">
                <div class="text-slate-400 font-medium">활성 사용자</div>
                <div class="text-xs font-extrabold text-blue-600 mt-0.5">1,280명</div>
              </div>
              <div class="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs flex items-end gap-1 h-full">
                <div class="w-full bg-blue-200 h-3 rounded-t"></div><div class="w-full bg-blue-400 h-5 rounded-t"></div><div class="w-full bg-blue-600 h-8 rounded-t"></div><div class="w-full bg-blue-300 h-6 rounded-t"></div>
              </div>
            </div>`;
        case 'lay_10':
          return `
            <div class="grid grid-cols-3 gap-1.5 items-start text-[8px] font-bold text-slate-600">
              <div class="space-y-1.5"><div class="h-10 bg-rose-50 border border-rose-200 rounded-lg p-1.5">핀 카드 A</div><div class="h-6 bg-slate-100 rounded-lg p-1">D</div></div>
              <div class="space-y-1.5"><div class="h-6 bg-blue-50 border border-blue-200 rounded-lg p-1">카드 B</div><div class="h-10 bg-indigo-50 border border-indigo-200 rounded-lg p-1.5">가변 높이 E</div></div>
              <div class="space-y-1.5"><div class="h-9 bg-emerald-50 border border-emerald-200 rounded-lg p-1.5">카드 C</div><div class="h-7 bg-amber-50 border border-amber-200 rounded-lg p-1">F</div></div>
            </div>`;
        case 'cnt_03':
          return `
            <div class="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 text-[9px]">
              <div class="p-2 flex items-center justify-between"><div class="flex items-center gap-2"><span class="w-5 h-5 rounded-lg bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center">1</span><div><div class="font-bold text-slate-800">피드/리스트 아이템 타이틀 A</div><div class="text-[8px] text-slate-400">방금 전 · 조회 142</div></div></div><span class="text-slate-400">›</span></div>
              <div class="p-2 flex items-center justify-between"><div class="flex items-center gap-2"><span class="w-5 h-5 rounded-lg bg-slate-100 text-slate-600 font-extrabold flex items-center justify-center">2</span><div><div class="font-bold text-slate-800">피드/리스트 아이템 타이틀 B</div><div class="text-[8px] text-slate-400">10분 전 · 조회 89</div></div></div><span class="text-slate-400">›</span></div>
            </div>`;
        case 'cnt_05':
          return `
            <div class="bg-white rounded-xl border border-slate-200 p-2 text-[9px]">
              <div class="flex justify-between font-bold text-slate-800"><span>Q. 클릭 시 펼쳐지는 아코디언 질문 타이틀</span><span class="text-blue-600">▲</span></div>
              <div class="mt-1 pt-1 border-t border-slate-100 text-slate-500">숨겨진 상세 설명이 스크롤 절약을 위해 접혀 있다가 펼쳐집니다.</div>
            </div>`;
        case 'cnt_06':
        case 'src_08':
          return `
            <div class="bg-slate-50 p-3 rounded-xl border border-dashed border-slate-300 text-center space-y-1">
              <div class="text-[10px] font-extrabold text-slate-700">📂 표시할 데이터가 아직 없어요 (Empty State)</div>
              <div class="text-[9px] text-slate-400">조건을 변경하거나 첫 항목을 새로 생성해 보세요</div>
              <span class="inline-block bg-blue-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-md mt-1">+ 새로 만들기</span>
            </div>`;
        case 'cnt_07':
        case 'aut_02':
          return `
            <div class="bg-white rounded-xl border border-slate-200 overflow-hidden text-[9px]">
              <div class="grid grid-cols-4 bg-slate-100 px-2.5 py-1 font-extrabold text-slate-600 border-b border-slate-200">
                <span>이름/항목</span><span>역할/분류</span><span>상태</span><span class="text-blue-600 text-right">점수/권한 ↕</span>
              </div>
              <div class="grid grid-cols-4 px-2.5 py-1.5 text-slate-700 border-b border-slate-100 items-center"><span class="font-bold">김디자이너</span><span>Product</span><span class="text-emerald-600 font-bold">● 승인됨</span><span class="text-right font-mono font-bold">94점</span></div>
              <div class="grid grid-cols-4 px-2.5 py-1.5 text-slate-700 items-center"><span class="font-bold">박프론트</span><span>Engineering</span><span class="text-amber-600 font-bold">● 검토중</span><span class="text-right font-mono font-bold">88점</span></div>
            </div>`;
        case 'cnt_09':
          return `
            <div class="bg-white p-2.5 rounded-xl border border-slate-200 pl-3 text-[9px] space-y-1.5">
              <div class="border-l-2 border-blue-600 pl-2.5 relative"><span class="w-2 h-2 rounded-full bg-blue-600 absolute -left-[5px] top-1"></span><span class="font-extrabold text-blue-600">14:00</span> <span class="text-slate-800 font-bold">심사 및 검증 완료</span></div>
              <div class="border-l-2 border-slate-200 pl-2.5 relative text-slate-400"><span class="w-2 h-2 rounded-full bg-slate-300 absolute -left-[5px] top-1"></span><span>어제</span> <span>최초 포트폴리오 제출됨</span></div>
            </div>`;
        case 'cnt_10':
          return `
            <div class="grid grid-cols-3 gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-[9px]">
              <div class="bg-slate-200/70 p-1.5 rounded-lg space-y-1"><div class="font-extrabold text-slate-600">TO DO (2)</div><div class="bg-white p-1.5 rounded shadow-2xs font-semibold">기획안 작성</div></div>
              <div class="bg-blue-50/80 p-1.5 rounded-lg space-y-1 border border-blue-200"><div class="font-extrabold text-blue-700">DOING (1)</div><div class="bg-white p-1.5 rounded shadow-2xs font-bold text-blue-600">UI 와이어프레임</div></div>
              <div class="bg-emerald-50/70 p-1.5 rounded-lg space-y-1"><div class="font-extrabold text-emerald-700">DONE (4)</div><div class="bg-white p-1.5 rounded shadow-2xs text-slate-400 line-through">사전 DB 구축</div></div>
            </div>`;
        case 'cnt_11':
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 text-[9px] space-y-1 font-medium">
              <div class="font-bold text-slate-800">▾ 📂 디자인 시스템 루트 폴더</div>
              <div class="pl-3 text-blue-600 font-bold">▾ 📂 01_컴포넌트 토큰</div>
              <div class="pl-6 text-slate-600">📄 color-palette.json</div>
            </div>`;
        case 'cnt_12':
        case 'lay_12':
          return `
            <div class="flex gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-[9px]">
              <div class="flex-1 bg-white p-2 rounded-lg text-slate-500">메인 캔버스 영역</div>
              <div class="w-28 bg-white p-2 rounded-lg border-l-2 border-blue-500 shadow-xs"><div class="font-extrabold text-blue-600">우측 인스펙터</div><div class="text-[8px] text-slate-400 mt-0.5">속성·목차 상세창</div></div>
            </div>`;
      }

      // 카테고리별 전용 리얼 그래픽 렌더링 (모든 207개 항목 완벽 대응)
      if (item.catKey === 'onboarding') {
        if (item.id === 'onb_05') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 space-y-1 text-[9px] font-bold text-center">
              <div class="bg-amber-300 text-slate-900 py-1.5 rounded-lg">💬 카카오로 3초 만에 시작하기</div>
              <div class="bg-slate-900 text-white py-1.5 rounded-lg"> Apple로 계속하기</div>
            </div>`;
        }
        if (item.id === 'onb_06') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 space-y-1 text-[9px]">
              <div class="font-extrabold text-slate-900 border-b border-slate-100 pb-1">☑ 전체 약관에 모두 동의합니다</div>
              <div class="text-slate-600">☑ [필수] 서비스 이용약관 및 개인정보 동의</div>
            </div>`;
        }
        return `
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-2.5 flex items-center justify-between text-[9px]">
            <div class="flex items-center gap-2">
              <span class="w-6 h-6 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center">🚀</span>
              <div><div class="font-extrabold text-slate-900">${item.code}</div><div class="text-slate-500 text-[8px]">${item.meta}</div></div>
            </div>
            <span class="bg-blue-600 text-white px-2.5 py-1 rounded-lg font-bold">다음 →</span>
          </div>`;
      }

      if (item.catKey === 'nav' || item.catKey === 'menu_icon') {
        const iconSvgMap = {
          ico_01: '<svg viewBox="0 0 20 20" class="w-4 h-4 stroke-slate-800" fill="none" stroke-width="2" stroke-linecap="round"><path d="M3 5h14M3 10h14M3 15h14"/></svg>',
          ico_02: '<svg viewBox="0 0 20 20" class="w-4 h-4 fill-slate-800"><circle cx="10" cy="4" r="1.6"/><circle cx="10" cy="10" r="1.6"/><circle cx="10" cy="16" r="1.6"/></svg>',
          ico_03: '<svg viewBox="0 0 20 20" class="w-4 h-4 fill-slate-800"><circle cx="4" cy="10" r="1.6"/><circle cx="10" cy="10" r="1.6"/><circle cx="16" cy="10" r="1.6"/></svg>',
          ico_04: '<svg viewBox="0 0 20 20" class="w-4 h-4 fill-slate-800"><circle cx="5" cy="5" r="1.4"/><circle cx="10" cy="5" r="1.4"/><circle cx="15" cy="5" r="1.4"/><circle cx="5" cy="10" r="1.4"/><circle cx="10" cy="10" r="1.4"/><circle cx="15" cy="10" r="1.4"/><circle cx="5" cy="15" r="1.4"/><circle cx="10" cy="15" r="1.4"/><circle cx="15" cy="15" r="1.4"/></svg>',
          ico_05: '<svg viewBox="0 0 20 20" class="w-4 h-4 fill-slate-800"><rect x="3.5" y="3.5" width="3.2" height="3.2" rx="0.6"/><rect x="8.4" y="3.5" width="3.2" height="3.2" rx="0.6"/><rect x="13.3" y="3.5" width="3.2" height="3.2" rx="0.6"/><rect x="3.5" y="8.4" width="3.2" height="3.2" rx="0.6"/><rect x="8.4" y="8.4" width="3.2" height="3.2" rx="0.6"/><rect x="13.3" y="8.4" width="3.2" height="3.2" rx="0.6"/><rect x="3.5" y="13.3" width="3.2" height="3.2" rx="0.6"/><rect x="8.4" y="13.3" width="3.2" height="3.2" rx="0.6"/><rect x="13.3" y="13.3" width="3.2" height="3.2" rx="0.6"/></svg>',
          ico_06: '<svg viewBox="0 0 20 20" class="w-4 h-4 stroke-slate-800" fill="none" stroke-width="2" stroke-linecap="round"><path d="M3 5h14M5.5 10h9M8 15h4"/></svg>',
          ico_07: '<svg viewBox="0 0 20 20" class="w-4 h-4 stroke-slate-800" fill="none" stroke-width="2.2" stroke-linecap="round"><path d="M4 7.5h12M4 12.5h12"/></svg>',
          ico_08: '<svg viewBox="0 0 20 20" class="w-4 h-4 stroke-slate-800" fill="none" stroke-width="2" stroke-linecap="round"><path d="M3 5h10M6 10h11M9 15h8"/></svg>',
          ico_09: '<svg viewBox="0 0 20 20" class="w-4 h-4 stroke-slate-800" fill="none" stroke-width="1.8" stroke-linecap="round"><path d="M3 6h14M3 14h14"/><circle cx="7" cy="6" r="2" fill="#2563eb" stroke="#2563eb"/><circle cx="13" cy="14" r="2" fill="#2563eb" stroke="#2563eb"/></svg>'
        };
        if (iconSvgMap[item.id]) {
          return `
            <div class="bg-white border border-slate-200 rounded-xl px-3 py-1.5 flex items-center justify-between text-[10px] shadow-2xs">
              <div class="flex items-center gap-2">
                <span class="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">${iconSvgMap[item.id]}</span>
                <div><div class="font-bold text-slate-800">${item.code}</div><div class="text-[8px] text-slate-400">${item.meta}</div></div>
              </div>
              <span class="text-[9px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-bold shrink-0">${item.eng}</span>
            </div>`;
        }
        if (item.id === 'ico_10') {
          return `
            <div class="bg-white border border-slate-200 rounded-xl px-3 py-1.5 flex items-center justify-between text-[9px]">
              <span class="font-bold text-slate-700">${item.code}</span>
              <div class="flex items-center gap-1">
                <span class="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[9px]">📷</span>
                <span class="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[9px]">🎙</span>
                <span class="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[9px]">📄</span>
                <span class="w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center shadow-xs">✕</span>
              </div>
            </div>`;
        }
        if (item.id === 'ico_11') {
          return `
            <div class="bg-white border border-slate-200 rounded-xl px-3 py-1.5 flex items-center justify-between text-[9px]">
              <span class="font-bold text-slate-700">${item.code}</span>
              <div class="inline-flex rounded-lg overflow-hidden border border-blue-700 font-bold text-white">
                <span class="bg-blue-600 px-2.5 py-1">바로 전송</span>
                <span class="bg-blue-700 px-1.5 py-1 border-l border-blue-500">▾</span>
              </div>
            </div>`;
        }
        if (item.id === 'nav_01') {
          return `
            <div class="bg-white border border-slate-200 rounded-xl px-3 py-1.5 flex justify-around text-[9px] font-bold shadow-2xs">
              <span class="text-blue-600 flex flex-col items-center"><span>●</span><span>홈</span></span>
              <span class="text-slate-400 flex flex-col items-center"><span>○</span><span>검색</span></span>
              <span class="text-slate-400 flex flex-col items-center"><span>○</span><span>리포트</span></span>
              <span class="text-slate-400 flex flex-col items-center"><span>○</span><span>마이</span></span>
            </div>`;
        }
        if (item.id === 'nav_02' || item.id === 'ind_08') {
          return `
            <div class="bg-white border-b-2 border-slate-100 px-3 pt-1 flex gap-4 text-[10px] font-bold">
              <span class="border-b-2 border-blue-600 text-blue-600 pb-1">전체 추천</span>
              <span class="text-slate-400 pb-1">실시간 인기</span>
              <span class="text-slate-400 pb-1">팔로잉</span>
            </div>`;
        }
        if (item.id === 'nav_04') {
          return `
            <div class="bg-white border border-slate-200 rounded-xl px-3 py-1.5 flex items-center gap-1.5 text-[9px] font-semibold text-slate-500">
              <span>홈</span><span>›</span><span>카테고리</span><span>›</span><span class="text-blue-600 font-extrabold">상세 페이지</span>
            </div>`;
        }
        if (item.id === 'nav_06') {
          return `
            <div class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 flex items-center justify-between text-[9px]">
              <span class="text-slate-500 font-semibold">우측 하단 최우선 핵심 CTA</span>
              <span class="w-7 h-7 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center shadow-md text-xs">+</span>
            </div>`;
        }
        if (item.id === 'nav_07') {
          return `
            <div class="bg-white border border-slate-200 rounded-xl px-3 py-1.5 flex items-center justify-center gap-1 text-[9px] font-bold">
              <span class="px-1.5 py-0.5 text-slate-400">‹</span>
              <span class="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center">1</span>
              <span class="w-5 h-5 rounded text-slate-600 flex items-center justify-center">2</span>
              <span class="w-5 h-5 rounded text-slate-600 flex items-center justify-center">3</span>
              <span class="px-1.5 py-0.5 text-slate-500">›</span>
            </div>`;
        }
        if (item.id === 'nav_09') {
          return `
            <div class="bg-white border border-slate-200 rounded-xl px-3 py-1.5 flex items-center gap-2 text-[10px]">
              <span class="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-extrabold text-slate-700">←</span>
              <span class="font-bold text-slate-800">이전 화면으로 복귀</span>
            </div>`;
        }
        if (item.id === 'nav_10') {
          return `
            <div class="bg-slate-900 text-white rounded-xl px-3 py-2 flex items-center justify-between text-[10px] shadow-md">
              <span class="text-slate-300">⚡ 이동할 페이지나 실행할 명령을 입력하세요...</span>
              <kbd class="px-1.5 py-0.5 rounded bg-slate-800 text-blue-300 border border-slate-700 font-mono text-[9px]">⌘K</kbd>
            </div>`;
        }
        if (item.id === 'nav_11') {
          return `
            <div class="bg-white border border-slate-200 rounded-xl p-2 text-[8px] space-y-1">
              <div class="flex gap-3 font-bold text-slate-700 border-b border-slate-100 pb-1"><span class="text-blue-600">제품 ▾</span><span>솔루션</span><span>가격</span></div>
              <div class="grid grid-cols-3 gap-1 text-slate-500"><span class="bg-slate-50 p-1 rounded">• 대분류 A</span><span class="bg-slate-50 p-1 rounded">• 중분류 B</span><span class="bg-blue-50 text-blue-600 p-1 rounded font-bold">★ 추천 배너</span></div>
            </div>`;
        }
        if (item.id === 'nav_12') {
          return `
            <div class="bg-white border border-slate-200 rounded-xl p-2 text-[8px] space-y-1">
              <div class="font-bold text-slate-400">ON THIS PAGE</div>
              <div class="border-l-2 border-blue-600 pl-2 font-bold text-blue-600">2. 핵심 아키텍처 (현재)</div>
              <div class="border-l-2 border-slate-200 pl-2 text-slate-500">3. 성능 최적화</div>
            </div>`;
        }
        return `
          <div class="bg-white border border-slate-200 rounded-xl px-3 py-1.5 flex items-center justify-between text-[10px] shadow-2xs">
            <div class="flex items-center gap-2">
              <span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-extrabold">☰</span>
              <span class="font-bold text-slate-800">${item.code}</span>
            </div>
            <span class="text-[9px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-bold">${item.eng}</span>
          </div>`;
      }

      if (item.catKey === 'search') {
        if (item.id === 'src_01' || item.id === 'src_02') {
          return `
            <div class="bg-white rounded-xl border-2 border-blue-500 px-3 py-1.5 flex items-center justify-between text-[10px] shadow-2xs">
              <div class="flex items-center gap-2"><span class="text-blue-600 font-bold">🔍</span><span class="text-slate-800 font-semibold">프론트엔드 포트폴리오</span></div>
              <span class="w-4 h-4 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[8px] font-bold">✕</span>
            </div>`;
        }
        if (item.id === 'src_03' || item.id === 'src_10') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-1 text-[9px]">
              <div class="flex flex-wrap gap-1">
                <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">최근: 디자인 시스템 ✕</span>
                <span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold">서울/판교 ✕</span>
              </div>
              <span class="text-slate-400 underline">전체 초기화</span>
            </div>`;
        }
        return `
          <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px]">
            <div class="flex items-center gap-1.5">
              <span class="px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold">필터 조건 ▾</span>
              <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">${item.code}</span>
            </div>
            <span class="font-bold text-slate-600">정렬: 정확도순 ▾</span>
          </div>`;
      }

      if (item.catKey === 'form') {
        if (item.id === 'form_01') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 text-[9px] space-y-1">
              <div class="flex justify-between"><span class="font-bold text-slate-700">이메일 주소 *</span><span class="text-blue-600 font-semibold">Focus 상태</span></div>
              <div class="border-2 border-blue-500 rounded-lg px-2.5 py-1 text-slate-800 font-medium bg-blue-50/10">woody@uxstudio.ai</div>
            </div>`;
        }
        if (item.id === 'form_03') {
          return `
            <div class="grid grid-cols-3 bg-slate-100 p-1 rounded-xl text-[9px] font-bold text-center">
              <div class="bg-white text-blue-600 py-1 rounded-lg shadow-2xs">일간</div>
              <div class="text-slate-500 py-1">주간</div>
              <div class="text-slate-500 py-1">월간</div>
            </div>`;
        }
        if (item.id === 'form_04') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[10px]">
              <span class="font-bold text-slate-800">실시간 푸시 알림 받기 (Switch)</span>
              <div class="w-8 h-4 bg-blue-600 rounded-full p-0.5 flex justify-end"><span class="w-3 h-3 rounded-full bg-white"></span></div>
            </div>`;
        }
        if (item.id === 'form_07') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 text-[9px] space-y-1">
              <div class="flex justify-between font-bold"><span>예산 범위 슬라이더</span><span class="text-blue-600">300만 ~ 800만 원</span></div>
              <div class="w-full h-1.5 bg-slate-200 rounded-full relative"><div class="w-2/3 h-full bg-blue-600 rounded-full"></div><span class="w-3 h-3 rounded-full bg-white border-2 border-blue-600 absolute -top-1 left-2/3"></span></div>
            </div>`;
        }
        if (item.id === 'form_08') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[10px]">
              <span class="font-bold text-slate-700">수량 / 인원 선택</span>
              <div class="flex items-center gap-2 bg-slate-100 px-2 py-0.5 rounded-lg font-extrabold"><button type="button">-</button><span class="text-blue-600">2</span><button type="button">+</button></div>
            </div>`;
        }
        if (item.id === 'form_10') {
          return `
            <div class="bg-slate-50 border-2 border-dashed border-blue-300 rounded-xl p-2.5 text-center text-[9px]">
              <div class="font-extrabold text-blue-600">☁️ 파일을 여기에 끌어다 놓거나 클릭해 업로드</div>
              <div class="text-[8px] text-slate-400 mt-0.5">PDF, PNG, JPG (최대 10MB)</div>
            </div>`;
        }
        if (item.id === 'form_11') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[10px]">
              <span class="font-bold text-slate-700 text-[9px]">인증번호 6자리</span>
              <div class="flex gap-1 font-mono font-extrabold text-blue-600">
                <span class="w-5 h-6 border border-blue-500 rounded flex items-center justify-center bg-blue-50">4</span>
                <span class="w-5 h-6 border border-blue-500 rounded flex items-center justify-center bg-blue-50">8</span>
                <span class="w-5 h-6 border border-slate-300 rounded flex items-center justify-center text-slate-300">•</span>
                <span class="w-5 h-6 border border-slate-300 rounded flex items-center justify-center text-slate-300">•</span>
              </div>
            </div>`;
        }
        return `
          <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px]">
            <span class="font-bold text-slate-700">${item.code}</span>
            <span class="px-2 py-0.5 rounded border border-slate-300 text-slate-600 font-semibold">옵션 선택 ▾</span>
          </div>`;
      }

      if (item.catKey === 'datetime') {
        if (item.id === 'dt_02') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 grid grid-cols-3 gap-1 text-center text-[9px]">
              <div class="text-slate-400">2025년</div><div class="text-slate-400">10월</div><div class="text-slate-400">15일</div>
              <div class="bg-blue-50 text-blue-700 font-extrabold rounded py-0.5">2026년</div><div class="bg-blue-50 text-blue-700 font-extrabold rounded py-0.5">11월</div><div class="bg-blue-50 text-blue-700 font-extrabold rounded py-0.5">16일</div>
            </div>`;
        }
        if (item.id === 'dt_04') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center gap-1.5 text-[9px] font-bold">
              <span class="px-2 py-0.5 rounded-full bg-blue-600 text-white">오늘</span>
              <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">내일</span>
              <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">이번 주말</span>
            </div>`;
        }
        if (item.id === 'dt_05') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 grid grid-cols-4 gap-1 text-center text-[9px] font-bold">
              <span class="py-1 rounded bg-slate-100 text-slate-700">10:00</span>
              <span class="py-1 rounded bg-blue-600 text-white">11:00</span>
              <span class="py-1 rounded bg-slate-50 text-slate-300 line-through">12:00</span>
              <span class="py-1 rounded bg-slate-100 text-slate-700">14:00</span>
            </div>`;
        }
        if (item.id === 'dt_06') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 grid grid-cols-4 gap-1 text-center text-[9px] font-bold">
              <span class="py-1 rounded bg-slate-50 text-slate-600">9월</span>
              <span class="py-1 rounded bg-slate-50 text-slate-600">10월</span>
              <span class="py-1 rounded bg-blue-600 text-white">11월</span>
              <span class="py-1 rounded bg-slate-50 text-slate-600">12월</span>
            </div>`;
        }
        if (item.id === 'dt_07') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px]">
              <span class="font-bold text-slate-600">생년월일</span>
              <span class="font-mono font-extrabold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">1996 . 05 . 21</span>
            </div>`;
        }
        if (item.id === 'dt_08') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px]">
              <div><div class="text-[8px] text-slate-400">체크인</div><div class="font-extrabold text-slate-800">11.14 (금)</div></div>
              <span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-extrabold">3박 4일</span>
              <div class="text-right"><div class="text-[8px] text-slate-400">체크아웃</div><div class="font-extrabold text-slate-800">11.17 (월)</div></div>
            </div>`;
        }
        if (item.id === 'dt_09') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px] font-bold">
              <span class="text-slate-600">반복 주기</span>
              <div class="flex gap-1"><span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">매일</span><span class="px-1.5 py-0.5 rounded bg-blue-600 text-white">매주</span><span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">매월</span></div>
            </div>`;
        }
        if (item.id === 'dt_10') {
          return `
            <div class="bg-slate-900 text-white p-2 rounded-xl flex items-center justify-between text-[9px]">
              <span class="font-bold text-slate-300">⏰ 마감 임박</span>
              <span class="font-mono font-extrabold text-amber-300">D-2 04:12:59</span>
            </div>`;
        }
        if (item.id === 'dt_11') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px]">
              <span class="font-bold text-slate-700">🌐 기준 시간대</span>
              <span class="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Asia/Seoul (GMT+9)</span>
            </div>`;
        }
        return `
          <div class="bg-white p-2 rounded-xl border border-slate-200 text-[9px] space-y-1.5">
            <div class="flex items-center justify-between"><span class="font-extrabold text-slate-800">📅 ${item.code}</span><span class="text-blue-600 font-bold">2026.11.14 ~ 11.17</span></div>
            <div class="grid grid-cols-7 gap-1 text-center text-[8px] font-bold">
              <span class="py-0.5 text-slate-400">일</span><span class="py-0.5 text-slate-600">12</span><span class="py-0.5 text-slate-600">13</span>
              <span class="py-0.5 bg-blue-600 text-white rounded-l">14</span><span class="py-0.5 bg-blue-100 text-blue-700">15</span><span class="py-0.5 bg-blue-100 text-blue-700">16</span><span class="py-0.5 bg-blue-600 text-white rounded-r">17</span>
            </div>
          </div>`;
      }

      if (item.catKey === 'feedback') {
        if (item.id === 'fb_06') {
          return `
            <div class="bg-rose-50 border border-rose-200 text-rose-600 px-2.5 py-1.5 rounded-lg text-[9px] font-bold flex items-center gap-1.5">
              <span>⚠️ 입력하신 이메일 형식을 다시 확인해 주세요 (Inline Error)</span>
            </div>`;
        }
        if (item.id === 'fb_04' || item.id === 'fb_05') {
          return `
            <div class="bg-slate-800 text-white p-2.5 rounded-xl text-[9px] flex items-center justify-between shadow-md">
              <div><div class="font-extrabold">${item.code} 레이어</div><div class="text-[8px] text-slate-300">${item.meta}</div></div>
              <div class="flex gap-1"><span class="px-2 py-0.5 rounded bg-slate-700">취소</span><span class="px-2 py-0.5 rounded bg-blue-500 font-bold">확인</span></div>
            </div>`;
        }
        return `
          <div class="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-[9px] flex items-center justify-between shadow-sm">
            <span class="font-semibold">🔔 ${item.code}: 작업이 안전하게 반영되었습니다</span>
            <span class="text-amber-400 font-bold">실행 취소</span>
          </div>`;
      }

      if (item.catKey === 'loading' || item.catKey === 'indicator') {
        if (item.id === 'ld_02' || item.id === 'onb_08') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-slate-200 animate-pulse shrink-0"></div>
              <div class="space-y-1 flex-1"><div class="h-2 w-1/2 bg-slate-200 rounded animate-pulse"></div><div class="h-2 w-3/4 bg-slate-100 rounded animate-pulse"></div></div>
            </div>`;
        }
        if (item.id === 'ld_09') {
          return `
            <div class="bg-blue-600 text-white py-2 px-3 rounded-xl text-[10px] font-extrabold text-center flex items-center justify-center gap-1.5 shadow-xs">
              <span class="w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
              <span>안전하게 제출 처리 중... (중복 클릭 방지)</span>
            </div>`;
        }
        if (item.id === 'ind_02') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px] font-bold">
              <span class="text-emerald-600">✓ 1.정보</span><span class="h-0.5 flex-1 mx-1.5 bg-blue-600"></span>
              <span class="text-blue-600">● 2.결제</span><span class="h-0.5 flex-1 mx-1.5 bg-slate-200"></span>
              <span class="text-slate-400">○ 3.완료</span>
            </div>`;
        }
        if (item.id === 'ind_04') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px]">
              <span class="font-bold text-slate-600">페이지 인디케이터</span>
              <div class="flex items-center gap-1"><span class="w-3 h-1.5 rounded-full bg-blue-600"></span><span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span><span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span></div>
            </div>`;
        }
        if (item.id === 'ind_09') {
          return `
            <div class="bg-slate-50 p-2 rounded-xl border border-slate-200 flex flex-col items-center gap-1 text-[8px] text-slate-400">
              <span>Safe Area Home Indicator</span>
              <span class="w-20 h-1 rounded-full bg-slate-800"></span>
            </div>`;
        }
        return `
          <div class="bg-white p-2 rounded-xl border border-slate-200 text-[9px] space-y-1">
            <div class="flex justify-between font-bold text-slate-700"><span>${item.code}</span><span class="text-blue-600">78% 완료</span></div>
            <div class="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div class="w-[78%] h-full bg-blue-600 rounded-full"></div></div>
          </div>`;
      }

      if (item.catKey === 'ai') {
        if (item.id === 'ai_01') {
          return `
            <div class="bg-indigo-50/70 p-2 rounded-xl border border-indigo-200 flex items-center justify-between text-[9px]">
              <span class="font-bold text-indigo-700">AI가 문맥을 추론하고 있습니다</span>
              <div class="flex gap-1"><span class="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce"></span><span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span><span class="w-1.5 h-1.5 rounded-full bg-indigo-300"></span></div>
            </div>`;
        }
        if (item.id === 'ai_02') {
          return `
            <div class="bg-white p-2 rounded-xl border border-indigo-200 text-[9px] text-slate-700">
              <span class="font-bold text-indigo-600">AI:</span> 요청하신 반응형 코드를 토큰 단위로 생성 중입니다<span class="inline-block w-1.5 h-3 bg-indigo-600 ml-0.5 align-middle"></span>
            </div>`;
        }
        if (item.id === 'ai_05') {
          return `
            <div class="bg-white p-2 rounded-xl border border-indigo-200 text-[9px] text-slate-700">
              <span>권장 대비율은 4.5:1 이상입니다</span>
              <span class="inline-flex items-center px-1 py-0.2 rounded bg-indigo-100 text-indigo-700 font-bold text-[8px] ml-1">[1] WCAG</span>
            </div>`;
        }
        if (item.id === 'ai_09') {
          return `
            <div class="bg-slate-900 text-white p-2 rounded-xl text-[8px] flex items-center justify-between font-bold">
              <span class="text-emerald-400">✓ 1. 파싱</span><span>→</span><span class="text-emerald-400">✓ 2. 대조</span><span>→</span><span class="text-blue-300">⟳ 3. 생성</span>
            </div>`;
        }
        if (item.id === 'ai_10') {
          return `
            <div class="grid grid-cols-12 gap-1.5 bg-slate-900 text-white p-2 rounded-xl text-[9px]">
              <div class="col-span-5 bg-slate-800 p-1.5 rounded-lg"><div class="text-blue-300 font-bold">💬 AI 대화 스트림</div><div class="text-[8px] text-slate-300 mt-0.5">대시보드 코드를 생성했습니다</div></div>
              <div class="col-span-7 bg-slate-950 border border-blue-500/40 p-1.5 rounded-lg"><div class="text-emerald-400 font-mono font-bold">⚡ Artifact Live Canvas</div><div class="text-[8px] text-slate-400 mt-0.5">우측 실시간 UI 렌더링 창</div></div>
            </div>`;
        }
        return `
          <div class="bg-gradient-to-r from-indigo-50/80 to-blue-50/80 p-2 rounded-xl border border-indigo-200/80 text-[9px] space-y-1">
            <div class="flex items-center justify-between"><span class="font-extrabold text-indigo-700">✨ ${item.code}</span><span class="text-[8px] bg-white px-1.5 py-0.5 rounded text-indigo-600 font-bold">${item.eng}</span></div>
            <div class="text-slate-700 truncate">${item.meta}</div>
          </div>`;
      }

      if (item.catKey === 'chart') {
        if (item.id === 'cht_01') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px]">
              <div><div class="text-slate-400 font-semibold">주간 추이</div><div class="font-extrabold text-slate-900">1,284 <span class="text-emerald-600">+18%</span></div></div>
              <svg viewBox="0 0 80 24" class="w-20 h-6 stroke-blue-600 fill-none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,20 18,15 32,17 48,8 64,11 78,3"/></svg>
            </div>`;
        }
        if (item.id === 'cht_02') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px]">
              <div class="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style="background: conic-gradient(#2563eb 0% 58%, #6366f1 58% 85%, #e2e8f0 85% 100%)"><span class="w-5 h-5 rounded-full bg-white text-[7px] font-extrabold flex items-center justify-center">58%</span></div>
              <div class="text-right"><div class="font-extrabold text-slate-800">${item.code}</div><div class="text-[8px] text-slate-400">모바일 58% · PC 27%</div></div>
            </div>`;
        }
        if (item.id === 'cht_04') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 space-y-1 text-[8px]">
              <div class="flex justify-between font-bold text-slate-700"><span>활동 밀도 히트맵</span><span class="text-emerald-600">연속 14일</span></div>
              <div class="grid grid-cols-10 gap-1">
                <span class="h-2.5 rounded-xs bg-emerald-100"></span><span class="h-2.5 rounded-xs bg-emerald-300"></span><span class="h-2.5 rounded-xs bg-emerald-500"></span><span class="h-2.5 rounded-xs bg-emerald-200"></span><span class="h-2.5 rounded-xs bg-emerald-600"></span><span class="h-2.5 rounded-xs bg-emerald-400"></span><span class="h-2.5 rounded-xs bg-slate-100"></span><span class="h-2.5 rounded-xs bg-emerald-300"></span><span class="h-2.5 rounded-xs bg-emerald-500"></span><span class="h-2.5 rounded-xs bg-emerald-600"></span>
              </div>
            </div>`;
        }
        if (item.id === 'cht_05') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 space-y-1 text-[8px] font-bold text-white text-center">
              <div class="bg-blue-600 rounded py-0.5 w-full">방문 100%</div>
              <div class="bg-blue-500 rounded py-0.5 w-3/4 mx-auto">장바구니 42%</div>
              <div class="bg-indigo-600 rounded py-0.5 w-1/2 mx-auto">결제 18%</div>
            </div>`;
        }
        if (item.id === 'cht_06') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px]">
              <svg viewBox="0 0 40 40" class="w-9 h-9 shrink-0"><polygon points="20,4 35,15 29,34 11,34 5,15" fill="none" stroke="#cbd5e1" stroke-width="1.5"/><polygon points="20,9 30,17 26,30 14,28 10,16" fill="rgba(37,99,235,0.25)" stroke="#2563eb" stroke-width="1.5"/></svg>
              <div class="text-right"><div class="font-extrabold text-slate-800">${item.code}</div><div class="text-[8px] text-slate-400">5축 역량 밸런스</div></div>
            </div>`;
        }
        return `
          <div class="bg-white p-2.5 rounded-xl border border-slate-200 text-[9px] space-y-1.5">
            <div class="flex items-center justify-between"><span class="font-extrabold text-slate-800">📊 ${item.code}</span><span class="text-emerald-600 font-bold">▲ +24.8%</span></div>
            <div class="flex items-end gap-1.5 h-10 pt-1 px-2 bg-slate-50 rounded-lg">
              <div class="flex-1 bg-blue-200 h-4 rounded-t"></div>
              <div class="flex-1 bg-blue-300 h-6 rounded-t"></div>
              <div class="flex-1 bg-blue-500 h-5 rounded-t"></div>
              <div class="flex-1 bg-blue-600 h-8 rounded-t"></div>
              <div class="flex-1 bg-indigo-600 h-9 rounded-t"></div>
            </div>
          </div>`;
      }

      if (item.catKey === 'commerce') {
        if (item.id === 'com_01') {
          return `
            <div class="grid grid-cols-3 gap-1.5 text-[9px] text-center">
              <div class="bg-white p-1.5 rounded-lg border border-slate-200"><div class="font-bold">Free</div><div class="text-slate-400">₩0</div></div>
              <div class="bg-blue-600 text-white p-1.5 rounded-lg font-bold shadow-xs"><div>Pro ★</div><div>₩19,000</div></div>
              <div class="bg-white p-1.5 rounded-lg border border-slate-200"><div class="font-bold">Team</div><div class="text-slate-400">₩49,000</div></div>
            </div>`;
        }
        if (item.id === 'com_04') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center gap-3 text-[9px]">
              <div class="font-extrabold text-slate-900">★ 4.8</div>
              <div class="flex-1 space-y-1"><div class="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div class="w-4/5 h-full bg-amber-400"></div></div><div class="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div class="w-1/4 h-full bg-amber-300"></div></div></div>
            </div>`;
        }
        if (item.id === 'com_05') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between gap-2 text-[9px]">
              <span class="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">WELCOME20</span>
              <span class="text-emerald-600 font-extrabold">-₩5,000 적용됨</span>
            </div>`;
        }
        if (item.id === 'com_06') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 space-y-0.5 text-[9px]">
              <div class="flex justify-between text-slate-500"><span>상품 ₩49,000 - 할인 ₩5,000</span><span>배송비 ₩0</span></div>
              <div class="flex justify-between font-extrabold text-blue-600 border-t border-slate-100 pt-0.5"><span>최종 결제액</span><span>₩44,000</span></div>
            </div>`;
        }
        return `
          <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px]">
            <div><span class="font-extrabold text-slate-900">🛍️ ${item.code}</span><div class="text-[8px] text-slate-400">${item.meta}</div></div>
            <span class="bg-blue-600 text-white font-bold px-2.5 py-1 rounded-lg">결제/적용</span>
          </div>`;
      }

      if (item.catKey === 'auth') {
        if (item.id === 'aut_01') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px]">
              <div class="flex -space-x-1.5"><span class="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold ring-2 ring-white">K</span><span class="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold ring-2 ring-white">L</span><span class="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold ring-2 ring-white">+4</span></div>
              <span class="px-2 py-0.5 rounded bg-blue-50 text-blue-600 font-bold">+ 멤버 초대</span>
            </div>`;
        }
        if (item.id === 'aut_03') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px]">
              <span class="font-mono font-bold text-slate-700">sk-live-••••••••9a4f</span>
              <span class="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">복사</span>
            </div>`;
        }
        if (item.id === 'aut_04') {
          return `
            <div class="bg-rose-50/70 p-2 rounded-xl border border-rose-300 flex items-center justify-between text-[9px]">
              <span class="font-extrabold text-rose-700">⚠️ Danger Zone</span>
              <span class="px-2 py-0.5 rounded bg-rose-600 text-white font-bold">영구 삭제</span>
            </div>`;
        }
        return `
          <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px]">
            <div class="flex items-center gap-2"><span class="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold">🔐</span><div><div class="font-bold text-slate-800">${item.code}</div><div class="text-[8px] text-slate-400">${item.meta}</div></div></div>
            <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">보안 활성</span>
          </div>`;
      }

      if (item.catKey === 'media_collab') {
        if (item.id === 'med_02') {
          return `
            <div class="bg-white p-1.5 rounded-xl border border-slate-200 grid grid-cols-2 overflow-hidden text-[8px] font-extrabold text-center relative">
              <div class="bg-slate-200 text-slate-600 py-2 rounded-l-lg">BEFORE</div>
              <div class="bg-blue-600 text-white py-2 rounded-r-lg">AFTER</div>
            </div>`;
        }
        if (item.id === 'med_03') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center gap-2 text-[9px]">
              <span class="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[8px]">▶</span>
              <div class="flex items-center gap-0.5 flex-1 h-4"><span class="w-1 h-2 bg-blue-600 rounded"></span><span class="w-1 h-4 bg-blue-600 rounded"></span><span class="w-1 h-3 bg-blue-600 rounded"></span><span class="w-1 h-4 bg-slate-300 rounded"></span><span class="w-1 h-2 bg-slate-300 rounded"></span><span class="w-1 h-3 bg-slate-300 rounded"></span></div>
              <span class="font-mono text-[8px] text-slate-500">01:24</span>
            </div>`;
        }
        if (item.id === 'med_04') {
          return `
            <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px]">
              <span class="font-bold text-slate-700">💬 대댓글 스레드 (3)</span>
              <div class="flex gap-1 text-[8px] font-bold"><span class="px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700">👍 12</span><span class="px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700">🎉 4</span></div>
            </div>`;
        }
      }

      if (item.catKey === 'visual_style') {
        if (item.id === 'sty_13') {
          return `<div class="bg-amber-300 border-2 border-black shadow-[3px_3px_0_#000] p-2 rounded-lg flex items-center justify-between text-[9px] font-black text-black"><span>${item.code}</span><span>2px + Hard Shadow</span></div>`;
        }
        if (item.id === 'sty_21') {
          return `<div class="bg-gradient-to-r from-sky-100 to-indigo-100 p-2 rounded-xl border border-white/80 backdrop-blur-md flex items-center justify-between text-[9px] font-bold text-slate-800"><span>${item.code}</span><span class="px-1.5 py-0.5 rounded bg-white/70 border border-white">Glass Blur</span></div>`;
        }
        if (item.id === 'sty_11' || item.id === 'sty_20') {
          return `<div class="bg-slate-950 border border-emerald-500/50 text-emerald-400 p-2 rounded-xl font-mono flex items-center justify-between text-[9px]"><span>> ${item.code}</span><span>[ACTIVE]</span></div>`;
        }
        if (item.id === 'sty_02' || item.id === 'sty_19') {
          return `<div class="bg-gradient-to-r from-pink-200 via-indigo-200 to-cyan-200 p-2 rounded-xl border border-white flex items-center justify-between text-[9px] font-extrabold text-slate-900"><span>${item.code}</span><span>Spectrum</span></div>`;
        }
      }

      if (item.catKey === 'text_anim' && item.id === 'txt_04') {
        return `<div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[10px]"><span class="font-bold text-slate-700">${item.code}</span><span class="font-mono font-extrabold text-blue-600">0 → 1,280명</span></div>`;
      }
      if (item.catKey === 'text_anim' && item.id === 'txt_07') {
        return `<div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px]"><span class="font-bold text-slate-700">${item.code}</span><span class="bg-amber-200/80 px-1.5 py-0.5 rounded font-extrabold text-slate-900">핵심 키워드 강조</span></div>`;
      }

      const catBadgeMap = { gesture: '👆', motion: '⚡', text_anim: 'Aa', visual_style: '🎨', media_collab: '🎬' };
      return `
        <div class="bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-between text-[9px]">
          <div class="flex items-center gap-2"><span class="w-5 h-5 rounded-lg bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center shrink-0">${catBadgeMap[item.catKey] || '✦'}</span><div><div class="font-bold text-slate-800">${item.code}</div><div class="text-[8px] text-slate-400">${item.meta}</div></div></div>
          <span class="text-[8px] font-mono text-slate-400 shrink-0">${item.eng}</span>
        </div>`;
    }

// =========================================================================
// 쇼케이스 구현 레시피 & 비주얼 테마 CSS 가이드
// =========================================================================
function getImplementationRecipe(item) {
      const recipes = {
        // 레이아웃 & 콘텐츠
        lay_10: "CSS columns 또는 grid-auto-rows + ResizeObserver로 가변 높이 카드의 간격 없는 벽돌(Masonry) 배치 구현",
        lay_11: "우측 설명 섹션 스크롤 시 IntersectionObserver로 현재 단계를 감지해 좌측 position: sticky 비주얼 상태를 전환",
        lay_12: "lg:grid-cols-[240px_1fr_220px] 3단 홀리 그레일 골격 + 양쪽 사이드바 sticky top-16 독립 스크롤 적용",
        cnt_04: "좌측 목록(Master) 항목 클릭 시 active 상태와 우측 상세(Detail) 뷰를 즉시 동기화하고 모바일에서는 드로어/뷰 전환 처리",
        cnt_05: "버튼 클릭 시 aria-expanded 토글 및 grid-template-rows(0fr→1fr) 트랜지션으로 부드러운 아코디언 개폐 구현",
        cnt_07: "테이블 헤더 클릭 시 오름/내림차순 정렬 상태(▲/▼) 전환, 행 호버 강조 및 다중 선택 체크박스 연동",
        cnt_10: "HTML5 Drag & Drop(draggable, ondragover, ondrop) 및 키보드 이동 버튼으로 상태 열(To-do/Doing/Done) 간 카드 이동 및 카운트 갱신",
        cnt_11: "중첩 ul/li 구조에 들여쓰기(pl-4)와 화살표 회전 애니메이션, aria-expanded 기반 하위 노드 접기/펼치기 구현",
        cnt_12: "항목 선택 시 페이지 이동 없이 우측 인스펙터 패널(w-80~96) 슬라이드 인 및 실시간 속성 편집 반영",
        // 온보딩 & 탐색
        onb_06: "[전체 동의] 마스터 체크박스 클릭 시 하위 필수/선택 체크박스 일괄 토글 및 개별 해제 시 마스터 상태 역동기화",
        onb_10: "관심사 태그 칩 다중 선택 토글(최소 3개 선택 시 하단 CTA 활성화) 및 선택 개수 카운터 실시간 표시",
        onb_11: "미션 단계별 완료 체크박스 연동, 완료율 프로그레스 바(width %) 갱신 및 100% 달성 시 완료 배지/축하 피드백 노출",
        nav_01: "하단 고정(fixed bottom-0) 3~5개 탭 메뉴 + 활성 탭 아이콘/라벨 강조 + pb-[env(safe-area-inset-bottom)] 안전 영역 확보",
        nav_02: "상단 탭 클릭 시 하단 인디케이터 바 위치(translateX) 이동 및 연결된 탭 패널(role='tabpanel') 즉시 전환",
        nav_03: "햄버거 버튼 클릭 시 좌측 드로어 슬라이드 인 + 배경 Dim 클릭/Esc 키 닫기 및 포커스 복귀 처리",
        nav_10: "Cmd+K / Ctrl+K 단축키로 <dialog> 커맨드 팔레트 오픈, 화살표 위/아래 키 선택 이동 및 Enter 즉시 실행 구현",
        nav_11: "상단 GNB 호버/포커스 시 다단 메가 메뉴 패널 전개, Esc 및 마우스 이탈 지연(150ms) 닫기 처리",
        nav_12: "IntersectionObserver로 본문 헤딩(h2/h3) 가시성을 추적해 우측 TOC 목차 활성 링크 자동 하이라이트 및 부드러운 스크롤 이동",
        ico_10: "플로팅(+) 버튼 클릭 시 회전(rotate-45)과 함께 하위 액션 버튼들이 stagger 딜레이로 위로 펼쳐지는 스피드 다이얼 구현",
        ico_11: "주 액션 버튼과 드롭다운(▾) 트리거를 분리 배치하고, ▾ 클릭 시 popover='auto' 보조 옵션 메뉴 노출",
        // 검색 & 필터
        src_01: "input[type='search'] + oninput 이벤트로 1글자 이상일 때만 우측 지우기(X) 버튼 노출, 클릭 시 값 초기화 및 focus() 유지",
        src_02: "입력 키워드와 일치하는 추천어 접두사(Prefix)를 <strong class='text-blue-600 font-bold'>로 실시간 하이라이트하는 드롭다운 구현",
        src_03: "최근 검색어 배열(recentTags)을 알약 칩으로 렌더링하고 개별 삭제(X) 및 [전체 삭제] 버튼 상태 연동",
        src_05: "가격 범위 input[type='range'] 및 필터 칩 클릭 시 실제 목록 데이터(items)를 실시간 필터링하여 결과 건수 업데이트",
        src_06: "정렬 기준(추천순/낮은가격순/리뷰순) 변경 시 목록 개수는 유지하고 배열 순서만 즉시 재정렬",
        src_08: "필터/검색 결과 0건일 때 빈 화면 폴백 노출 + 오타 교정/추천 키워드 칩 클릭 시 즉시 재검색 실행",
        src_09: "범위 탭([전체|상품|브랜드|후기]) 전환 시 동일 검색어 상태를 유지한 채 도메인별 필터링 및 결과 카운트 갱신",
        src_10: "활성 필터 조건을 상단 알약 칩으로 렌더링하고 개별 X 해제 및 [전체 초기화] 클릭 시 기본 목록 즉시 복원",
        src_11: "패싯 필터 옵션 옆에 현재 조건 기준 예상 결과 건수(예: 브랜드 (12))를 동적으로 계산·표시하고 0건 옵션은 비활성화",
        // 입력 폼 & 날짜시간
        form_01: "Default / Focus(border-blue-600 ring-2) / Filled / Error(border-rose-500 bg-rose-50/30) 상태를 실시간 구분",
        form_03: "2~4개 옵션을 role='radiogroup' 세그먼트 바로 배치하고 선택 시 활성 배경 pill 슬라이드 이동 구현",
        form_04: "role='switch' + aria-checked 토글 시 노브(translate-x) 이동과 함께 시스템 설정 즉시 반영 및 토스트 안내",
        form_08: "- / + 스테퍼 버튼 클릭 시 정수로 1씩 증감하며 최솟값(1) 이하 감소 방지(disabled)",
        form_10: "드래그 오버 시 점선 테두리 강조(dragover/drop) + 파일 확장자/용량(10MB) 검증 후 첨부 목록 및 삭제(X) 버튼 렌더링",
        form_11: "6자리 OTP 칸에서 1글자 입력 시 다음 input 자동 focus(), Backspace 시 이전 칸 복귀 및 붙여넣기(paste) 6자리 일괄 분배 구현",
        form_12: "Enter/쉼표 입력 시 중복·공백 검증 후 해시태그 칩 배열에 추가하고 백스페이스/X 버튼으로 즉시 제거",
        dt_03: "시작일(startDate)과 종료일(endDate) 선택 시 사이 날짜 셀들에 bg-blue-100 구간 밴드 하이라이트 적용",
        dt_05: "시간대 슬롯 그리드에서 마감 시간대는 disabled + 취소선 처리, 선택 슬롯만 활성 강조 및 예약 요약 연동",
        dt_08: "체크인·체크아웃 좌우 분할 박스 클릭 시 날짜 변경 및 하단 CTA 버튼에 총 숙박 박수(N박 M일) 자동 계산 표시",
        dt_10: "목표 마감 시각 기준 setInterval(1000ms)로 남은 일·시·분·초를 2자리(padStart)로 실시간 카운트다운 표시",
        dt_11: "타임존 선택(KST/UTC/EST 등) 변경 시 기준 일정 시간을 Intl.DateTimeFormat으로 즉시 환산·재렌더링",
        // 피드백, 로딩 & 인디케이터
        fb_01: "액션 발생 시 화면 하단 중앙에 토스트(role='status' aria-live='polite')를 띄우고 setTimeout 2500ms 후 자동 fade-out 소멸",
        fb_02: "하단 스낵바 우측에 [실행 취소(Undo)] 버튼을 포함하고 클릭 시 직전 상태 복원",
        fb_03: "상단 고정 공지/경고 배너 + 닫기(X) 버튼 클릭 시 숨김 및 세션 상태 유지",
        fb_04: "네이티브 <dialog closedby='any'> 및 showModal()로 열어 배경 Dim 처리 및 Esc/바깥 클릭 닫기 지원",
        fb_05: "모바일 하단 슬라이드업 시트(translate-y 전환) + 배경 Dim 닫기 및 열림 시 body 스크롤 잠금 처리",
        fb_06: "유효성 검증 실패 시 입력창 직하단에 붉은색(text-rose-600) 인라인 에러 문구 즉시 노출",
        fb_07: "popover='auto' 또는 hover/focus 트리거로 보조 설명 말풍선 노출 및 Esc 키로 즉시 닫기 지원",
        ld_02: "데이터 로드 전 animate-pulse 스켈레톤 레이아웃 뼈대를 먼저 노출한 뒤 실데이터로 전환",
        ld_03: "0%에서 100%까지 차오르는 가로 프로그레스 바와 퍼센트 숫자 실시간 동기화",
        ld_07: "좋아요/북마크 클릭 시 서버 대기 없이 0초 만에 활성 색상 및 카운트(+1) 즉시 선반영(Optimistic UI)",
        ld_08: "화면 상단 Pull-to-refresh 당김 거리(touchstart/touchmove)에 따라 스피너 회전 후 임계점 도달 시 목록 새로고침 실행",
        ld_09: "제출 버튼 클릭 즉시 버튼 disabled 처리 + 내부 회전 스피너 노출 + 완료 후 원래 상태 복귀",
        ind_02: "다단계 위저드(1→2→3)에서 완료 단계 체크 표시, 현재 단계 강조 및 이전 단계 클릭 복귀 제어",
        ind_03: "window scroll 이벤트(또는 Scroll-driven animation)로 본문 읽기 진행률(%)을 상단 얇은 바에 실시간 반영",
        ind_09: "모바일 하단 안전 영역(pb-[env(safe-area-inset-bottom)]) 및 중앙 홈 인디케이터 바(w-32 h-1 rounded-full) 배치",
        // 생성형 AI
        ai_01: "3개의 점(dot)에 animation-delay(-0.32s, -0.16s, 0s) 바운스 키프레임을 적용한 AI 추론 대기 표시기",
        ai_02: "생성 텍스트를 한 번에 띄우지 않고 setInterval(30ms)로 토큰 단위 타자기 스트리밍 및 깜빡이는 커서 구현",
        ai_05: "문장 내 각주 번호([1], [2]) 배지 클릭 시 참조한 RAG 문서 출처 팝오버 토글",
        ai_09: "에이전트 도구 실행 파이프라인(1. 문맥 파싱 → 2. 데이터 대조 → 3. 결론 생성) 단계별 완료 체크 애니메이션",
        ai_10: "좌측 대화 스트림(col-span-5)과 우측 실시간 결과물 아티팩트 프리뷰 캔버스(col-span-7) 분할 구조",
        // 모션 & 계정/보안 & 미디어/협업
        mo_02: "등장 트랜지션에 cubic-bezier(0.215, 0.61, 0.355, 1) Ease-out 감속 곡선 적용",
        mo_03: "모달/카드 팝업에 cubic-bezier(0.34, 1.56, 0.64, 1) 물리 스프링 탄성 오버슈트 키프레임 적용",
        mo_05: "리스트/그리드 자식 카드들에 animation-delay를 60ms씩 차등 부여해 계단식 순차 등장(Stagger) 구현",
        aut_01: "아바타 원형 겹침(-space-x-2 ring-2 ring-white) + 초과 인원(+N) 배지 + [+ 멤버 초대] <dialog> 모달 연동",
        aut_02: "멤버 행별 역할(Owner/Admin/Editor/Viewer) 셀렉트 변경 시 권한 배지 색상 및 설명 즉시 업데이트",
        aut_03: "API 키 기본 마스킹(sk-••••) + 눈 아이콘 보기/숨김 토글 + navigator.clipboard.writeText 복사 후 2초 '복사됨' 피드백",
        aut_04: "위험 구역(border-rose-300 bg-rose-50/40) 내 확인 입력값이 대상 프로젝트명과 정확히 일치할 때만 영구 삭제 버튼 활성화",
        aut_05: "패스키/2FA 카드에서 등록 상태 배지 토글 및 인증 수단 추가/해제 확인 모달 연동",
        med_01: "썸네일 클릭 시 <dialog> 라이트박스 오픈, 좌우 화살표/키보드(←/→) 이미지 전환 및 줌 토글 구현",
        med_02: "중앙 분할 핸들 포인터 드래그(pointermove)로 clip-path: inset(0 X% 0 0) 값을 조절해 Before/After 실시간 비교",
        med_03: "막대 파형(SVG/Flex) 클릭 시 재생 위치(%) 즉시 점프 및 재생/일시정지 시간(01:24 / 03:40) 동기화",
        med_04: "댓글/대댓글 들여쓰기 스레드 렌더링 + 답글 입력 폼 토글 + 이모지 리액션 칩 클릭 시 카운트(+1/-1) 토글",
        med_05: "스크롤 이탈 시 우측 하단 fixed PIP 미니 플레이어 활성화, 닫기/원위치 복귀 버튼 연동"
      };
      if (recipes[item.id]) return recipes[item.id];
      if (item.catKey === 'chart') return `SVG 또는 CSS Flex/Grid를 활용해 정적 이미지가 아닌 수치 변경/호버 툴팁이 반응하는 인터랙티브 ${item.eng} 위젯 구현`;
      if (item.catKey === 'commerce') return `선택한 요금제/수량/쿠폰에 따라 결제 예정 금액이 실시간으로 재계산되는 ${item.eng} 상태 로직 구현`;
      if (item.catKey === 'gesture') return `Pointer/Touch 이벤트(pointerdown/move/up)와 touch-action 제어를 통해 ${item.eng} 제스처 피드백 구현 (모션 최소화 환경 대체 버튼 제공)`;
      if (item.catKey === 'text_anim') return `CSS Keyframes 또는 requestAnimationFrame으로 ${item.eng} 타이포 모션 구현 (prefers-reduced-motion: reduce 시 즉시 표시)`;
      return `${item.desc} (${item.meta} 특성 준수)`;
    }

    function getVisualThemeCssGuide(themeValue) {
      if (themeValue.includes('Claymorphism')) {
        return "둥근 모서리(rounded-3xl) + 부드러운 3D 입체 그림자(box-shadow: 12px 12px 24px rgba(37,99,235,0.14), inset 3px 3px 8px rgba(255,255,255,0.9), inset -4px -4px 10px rgba(30,58,138,0.12))";
      }
      if (themeValue.includes('Glassmorphism')) {
        return "반투명 유리 질감(bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-white/60 dark:border-slate-700/60 shadow-xl) 및 은은한 파스텔 배경 오브젝트 배치";
      }
      if (themeValue.includes('Neubrutalism')) {
        return "2px 솔리드 블랙 보더(border-2 border-black) + 블러 없는 하드 드롭 섀도우(shadow-[4px_4px_0px_#000]) + 클릭 시 active:translate-x-[2px] active:translate-y-[2px]";
      }
      if (themeValue.includes('Holographic')) {
        return "오팔 프리즘 그라데이션(bg-gradient-to-br from-pink-200 via-indigo-200 to-cyan-200) 배경 애니메이션 및 다크 글래스 카드 대비";
      }
      if (themeValue.includes('Grainy Gradient')) {
        return "부드러운 다색 그라데이션 헤더/배경 + 미세한 노이즈 질감과 깊이감 있는 다크/슬레이트 포인트 카드";
      }
      if (themeValue.includes('Isometric')) {
        return "정교한 격자 보더 라인과 입체적인 레이어 계층감이 돋보이는 B2B 엔터프라이즈 테크 스타일";
      }
      if (themeValue.includes('Bauhaus')) {
        return "순수 기하학 도형(원·사각·삼각)과 원색 포인트(red-600, amber-400, blue-600), 굵은 그리드 구분선 기반 모더니즘 레이아웃";
      }
      if (themeValue.includes('Cyber') || themeValue.includes('Scramble') || themeValue.includes('Glitch')) {
        return "다크 터미널 베이스(bg-slate-950 text-emerald-400) + 모노스페이스 폰트 + 얇은 네온 보더(border-emerald-500/40) 및 글로우 강조";
      }
      if (themeValue.includes('Stroke Line') || themeValue.includes('Line Draw')) {
        return "면 채우기 최소화 + 정교한 1px 선형 보더(border-slate-300 dark:border-slate-700)와 SVG stroke-dasharray 드로잉 포인트";
      }
      if (themeValue.includes('Kinetic')) {
        return "대형 볼드 타이포그래피(tracking-tight font-black) + 고대비 흑백 팔레트 + 무한 루프 마키(marquee) 배너 강조";
      }
      if (themeValue.includes('Dark') || themeValue.includes('다크')) {
        return "시맨틱 다크 토큰(bg-slate-950 캔버스, bg-slate-900 카드, border-slate-800, text-slate-100, 포인트 blue-500/indigo-400)";
      }
      return "Pretendard 폰트 기반 클린 SaaS 디자인 시스템 (라이트: bg-slate-50/bg-white/border-slate-200, 다크: dark:bg-slate-950/dark:bg-slate-900/dark:border-slate-800, 포인트: blue-600/indigo-600)";
    }

window.UX_TAXONOMY_DB = {
  SHOWCASE_BOOKS,
  PATTERN_DB,
  ALL_PATTERNS,
  ACTIVE_PATTERNS,
  getVisualWireframeHTML,
  getImplementationRecipe,
  getVisualThemeCssGuide
};
