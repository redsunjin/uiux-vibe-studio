/**
 * UI/UX Vibe Coding Studio — Real-Time Dynamic Prototype Compiler (Method A) & AI API Bridge (Method B)
 * 현재 캔버스에 조립된 블록(activeComponents), 순서, 격자 골격, 비주얼 테마, 기획 메모를 읽어
 * 0.1초 만에 즉시 작동하는 풀사이즈 인터랙티브 HTML 프로토타입을 동적으로 합성합니다.
 */

(function () {
  // 개별 블록을 실제 작동하는 풀사이즈 인터랙티브 HTML 섹션으로 변환
  function renderInteractiveComponentSection(item, index) {
    const noteBadge = item.note
      ? `<div class="mb-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold">
           <span>📌 기획 지시:</span><span>${escapeHtml(item.note)}</span>
         </div>`
      : '';

    const cardBase = `proto-card bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm transition-all duration-200`;

    // 1. 검색 카테고리 (src_*)
    if (item.catKey === 'search') {
      if (item.id === 'src_01' || item.id === 'src_02') {
        return `
          <div class="w-full" data-proto-block="${item.id}">
            ${noteBadge}
            <search class="relative w-full">
              <div class="relative flex items-center">
                <i data-lucide="search" class="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none"></i>
                <input
                  type="search"
                  data-role="proto-search-input"
                  placeholder="${escapeHtml(item.note || '검색어를 입력하면 하단 리스트와 테이블이 실시간 필터링됩니다...')}"
                  class="w-full pl-10 pr-9 py-2.5 bg-white border-2 border-slate-200 focus:border-blue-600 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none shadow-sm transition"
                />
                <button type="button" data-role="proto-search-clear" class="hidden absolute right-3 text-slate-400 hover:text-slate-600">
                  <i data-lucide="x-circle" class="w-4 h-4"></i>
                </button>
              </div>
              <div data-role="proto-autocomplete-box" class="hidden absolute inset-x-0 top-full mt-1 bg-white rounded-xl border border-slate-200 shadow-xl p-2 z-40 text-xs space-y-1"></div>
            </search>
          </div>`;
      }
      if (item.id === 'src_03' || item.id === 'src_10') {
        return `
          <div class="${cardBase}" data-proto-block="${item.id}">
            ${noteBadge}
            <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="font-extrabold text-slate-500 mr-1">${escapeHtml(item.code)}:</span>
                <div data-role="proto-recent-chips" class="flex flex-wrap gap-1.5">
                  <span class="proto-tag-chip inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 font-semibold cursor-pointer">
                    <span data-role="proto-chip-text">디자인 시스템</span>
                    <button type="button" data-role="proto-chip-del" class="text-slate-400 hover:text-rose-600 font-bold">✕</button>
                  </span>
                  <span class="proto-tag-chip inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 text-slate-700 font-semibold cursor-pointer">
                    <span data-role="proto-chip-text">AI 에이전트</span>
                    <button type="button" data-role="proto-chip-del" class="text-slate-400 hover:text-rose-600 font-bold">✕</button>
                  </span>
                  <span class="proto-tag-chip inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-bold cursor-pointer">
                    <span data-role="proto-chip-text">React & Tailwind</span>
                    <button type="button" data-role="proto-chip-del" class="text-blue-400 hover:text-rose-600 font-bold">✕</button>
                  </span>
                </div>
              </div>
              <button type="button" data-role="proto-clear-all-chips" class="text-[11px] text-slate-400 hover:text-rose-600 font-bold underline">전체 초기화</button>
            </div>
          </div>`;
      }
      return `
        <div class="${cardBase}" data-proto-block="${item.id}">
          ${noteBadge}
          <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="font-extrabold text-slate-700">${escapeHtml(item.code)}</span>
              <button type="button" data-role="proto-filter-btn" data-filter="all" class="px-3 py-1 rounded-full bg-blue-600 text-white font-bold transition">전체 보기 (12)</button>
              <button type="button" data-role="proto-filter-btn" data-filter="인기" class="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition">인기 추천 (5)</button>
              <button type="button" data-role="proto-filter-btn" data-filter="신규" class="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition">신규 등록 (4)</button>
            </div>
            <div class="flex items-center gap-1.5">
              <span class="text-slate-400 font-bold">정렬:</span>
              <select data-role="proto-sort-select" class="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 font-bold text-slate-700 focus:outline-none">
                <option value="recommend">추천 정확도순</option>
                <option value="score_desc">점수/평점 높은순</option>
                <option value="latest">최신 등록순</option>
              </select>
            </div>
          </div>
        </div>`;
    }

    // 2. 레이아웃 & 콘텐츠 카테고리 (lay_*, cnt_*)
    if (item.id === 'lay_01' || item.id === 'cnt_01' || item.id === 'lay_09') {
      return `
        <div class="proto-card bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4" data-proto-block="${item.id}">
          <div class="space-y-2">
            <span class="inline-block px-2.5 py-0.5 rounded-full bg-blue-500/30 border border-blue-400/40 text-blue-200 text-[11px] font-bold">${escapeHtml(item.eng.toUpperCase())}</span>
            <h2 class="text-lg sm:text-xl font-extrabold tracking-tight">${escapeHtml(item.note || '데이터와 AI로 완성하는 차세대 워크스페이스 경험')}</h2>
            <p class="text-xs text-slate-300 max-w-xl">${escapeHtml(item.desc)}</p>
          </div>
          <button type="button" data-role="proto-trigger-toast" data-msg="🚀 히어로 배너 CTA 액션이 실행되었습니다!" class="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-extrabold shadow-sm transition shrink-0">
            지금 시작하기 →
          </button>
        </div>`;
    }

    if (item.id === 'cnt_07' || item.id === 'aut_02') {
      return `
        <div class="${cardBase} space-y-3" data-proto-block="${item.id}">
          ${noteBadge}
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-extrabold text-slate-900">${escapeHtml(item.code)} (${escapeHtml(item.eng)})</h3>
              <p class="text-[11px] text-slate-400">상단 검색창이나 필터 변경 시 아래 테이블 행이 실시간으로 연동됩니다</p>
            </div>
            <button type="button" data-role="proto-skeleton-toggle" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold transition">
              스켈레톤 로딩 시연 ↻
            </button>
          </div>
          <div data-role="proto-table-Wrap" class="overflow-x-auto">
            <table class="w-full text-left border-collapse text-xs">
              <thead>
                <tr class="border-b border-slate-200 text-slate-400 font-bold bg-slate-50">
                  <th class="py-2.5 px-3">항목 / 이름</th>
                  <th class="py-2.5 px-3">카테고리 태그</th>
                  <th class="py-2.5 px-3">상태</th>
                  <th class="py-2.5 px-3 text-right">점수 / 액션</th>
                </tr>
              </thead>
              <tbody data-role="proto-filterable-list" class="divide-y divide-slate-100">
                <tr data-item-text="디자인 시스템 토큰 설계 인기" data-score="96" data-order="1" class="hover:bg-slate-50">
                  <td class="py-2.5 px-3 font-bold text-slate-900">디자인 시스템 토큰 설계</td>
                  <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold">인기</span></td>
                  <td class="py-2.5 px-3 text-emerald-600 font-bold">● 승인 완료</td>
                  <td class="py-2.5 px-3 text-right"><button type="button" data-role="proto-optimistic-like" class="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-700 font-bold">★ 96점</button></td>
                </tr>
                <tr data-item-text="AI 에이전트 RAG 파이프라인 신규" data-score="92" data-order="2" class="hover:bg-slate-50">
                  <td class="py-2.5 px-3 font-bold text-slate-900">AI 에이전트 RAG 파이프라인</td>
                  <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold">신규</span></td>
                  <td class="py-2.5 px-3 text-blue-600 font-bold">● 심사 진행중</td>
                  <td class="py-2.5 px-3 text-right"><button type="button" data-role="proto-optimistic-like" class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-bold">☆ 92점</button></td>
                </tr>
                <tr data-item-text="React & Tailwind 반응형 대시보드 인기" data-score="89" data-order="3" class="hover:bg-slate-50">
                  <td class="py-2.5 px-3 font-bold text-slate-900">React & Tailwind 반응형 대시보드</td>
                  <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold">인기</span></td>
                  <td class="py-2.5 px-3 text-emerald-600 font-bold">● 검증 통과</td>
                  <td class="py-2.5 px-3 text-right"><button type="button" data-role="proto-optimistic-like" class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-bold">☆ 89점</button></td>
                </tr>
                <tr data-role="proto-empty-state" class="hidden">
                  <td colspan="4" class="py-8 px-4 text-center text-slate-400">
                    <div class="text-xs font-bold text-slate-500">조건에 일치하는 항목이 없습니다.</div>
                    <button type="button" data-role="proto-reset-filter" class="mt-2 px-3 py-1 rounded-lg bg-blue-50 text-blue-600 text-[11px] font-bold hover:bg-blue-100 transition">검색·필터 초기화</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>`;
    }

    if (item.id === 'cnt_05') {
      return `
        <div class="${cardBase} space-y-2" data-proto-block="${item.id}">
          ${noteBadge}
          <h3 class="text-xs font-extrabold text-slate-800">${escapeHtml(item.code)}</h3>
          <details open class="group rounded-xl border border-slate-200 bg-slate-50/60 p-3 text-xs">
            <summary class="font-bold text-slate-900 cursor-pointer flex items-center justify-between">
              <span>Q1. ${escapeHtml(item.note || '자주 묻는 질문이나 상세 스펙을 접고 펼칠 수 있나요?')}</span>
              <span class="text-blue-600 group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <p class="mt-2 pt-2 border-t border-slate-200/80 text-slate-600 leading-relaxed">
              네, 네이티브 &lt;details&gt; 및 &lt;summary&gt; 요소를 활용하여 별도의 무거운 스크립트 없이도 접근성과 키보드 탐색을 보장합니다.
            </p>
          </details>
        </div>`;
    }

    if (item.id === 'cnt_10') {
      return `
        <div class="${cardBase} space-y-2.5" data-proto-block="${item.id}">
          ${noteBadge}
          <div class="flex items-center justify-between">
            <h3 class="text-xs font-extrabold text-slate-900">📋 ${escapeHtml(item.code)} (상태 클릭 시 다음 단계로 카드 이동)</h3>
            <span class="text-[10px] text-blue-600 font-bold">Interactive Kanban</span>
          </div>
          <div class="grid grid-cols-3 gap-2.5 text-xs" data-role="proto-kanban-board">
            <div data-kanban-col="todo" class="bg-slate-100 p-2.5 rounded-xl space-y-2">
              <div class="font-extrabold text-slate-600 text-[11px]">할 일 (TO DO)</div>
              <div data-role="proto-kanban-card" class="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:border-blue-400">
                <div class="font-bold text-slate-800">와이어프레임 조립</div>
                <div class="text-[10px] text-slate-400 mt-1">클릭하여 상태 변경 →</div>
              </div>
            </div>
            <div data-kanban-col="doing" class="bg-blue-50/70 p-2.5 rounded-xl border border-blue-200/60 space-y-2">
              <div class="font-extrabold text-blue-700 text-[11px]">진행 중 (DOING)</div>
              <div data-role="proto-kanban-card" class="bg-white p-2.5 rounded-lg border border-blue-300 shadow-sm cursor-pointer">
                <div class="font-bold text-blue-700">프롬프트 실시간 검증</div>
                <div class="text-[10px] text-blue-400 mt-1">클릭하여 완료 처리 →</div>
              </div>
            </div>
            <div data-kanban-col="done" class="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200/60 space-y-2">
              <div class="font-extrabold text-emerald-700 text-[11px]">완료됨 (DONE)</div>
              <div data-role="proto-kanban-card" class="bg-white p-2.5 rounded-lg border border-emerald-200 text-slate-400 line-through cursor-pointer">
                <div class="font-bold">도감 DB 구축</div>
                <div class="text-[10px] mt-1">클릭하여 되돌리기 ↺</div>
              </div>
            </div>
          </div>
        </div>`;
    }

    // 3. 입력 폼 카테고리 (form_*)
    if (item.catKey === 'form') {
      if (item.id === 'form_01') {
        return `
          <div class="${cardBase} space-y-2" data-proto-block="${item.id}">
            ${noteBadge}
            <label class="block text-xs font-extrabold text-slate-800">${escapeHtml(item.note || '이메일 또는 필수 텍스트 입력 (실시간 유효성 검증)')} *</label>
            <input
              type="text"
              data-role="proto-live-input"
              value="woody@uxstudio.ai"
              placeholder="값을 지우거나 @를 빼면 인라인 에러가 표시됩니다"
              class="w-full px-3.5 py-2 rounded-xl border-2 border-slate-200 focus:border-blue-600 text-xs font-medium text-slate-800 focus:outline-none transition"
            />
            <p data-role="proto-inline-error" class="hidden text-[11px] font-bold text-rose-600">⚠️ 최소 3글자 이상 및 올바른 형식을 입력해 주세요 (Inline Error 작동됨)</p>
            <p data-role="proto-inline-ok" class="text-[11px] font-semibold text-emerald-600">✓ 입력 상태 정상 (Filled / Valid)</p>
          </div>`;
      }
      if (item.id === 'form_08') {
        return `
          <div class="${cardBase} flex items-center justify-between" data-proto-block="${item.id}">
            <div>
              ${noteBadge}
              <div class="text-xs font-extrabold text-slate-900">${escapeHtml(item.note || '인원 / 수량 스테퍼 조절')}</div>
              <div class="text-[11px] text-slate-400">${escapeHtml(item.desc)}</div>
            </div>
            <div class="flex items-center gap-3 bg-slate-100 px-3 py-1.5 rounded-xl font-extrabold text-sm">
              <button type="button" data-role="proto-step-minus" class="w-6 h-6 rounded-lg bg-white shadow-sm text-slate-700 hover:bg-slate-50">-</button>
              <span data-role="proto-step-val" class="text-blue-600 min-w-[24px] text-center">2</span>
              <button type="button" data-role="proto-step-plus" class="w-6 h-6 rounded-lg bg-white shadow-sm text-slate-700 hover:bg-slate-50">+</button>
            </div>
          </div>`;
      }
      if (item.id === 'form_10') {
        return `
          <div class="${cardBase} space-y-2.5" data-proto-block="${item.id}">
            ${noteBadge}
            <div data-role="proto-dropzone" class="border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/40 rounded-xl p-4 text-center cursor-pointer transition">
              <div class="text-xs font-extrabold text-blue-600">☁️ ${escapeHtml(item.note || '클릭하거나 파일을 드롭하여 업로드 진행률(0%→100%) 테스트')}</div>
              <div class="text-[11px] text-slate-400 mt-0.5">PDF, PNG, DOCX (최대 25MB)</div>
            </div>
            <div class="space-y-1">
              <div class="flex justify-between text-[11px] font-bold">
                <span class="text-slate-600">첨부파일 업로드 상태</span>
                <span data-role="proto-prog-label" class="text-blue-600">대기 중 (클릭 시 시작)</span>
              </div>
              <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div data-role="proto-prog-bar" class="h-full bg-blue-600 rounded-full transition-all duration-150" style="width: 0%;"></div>
              </div>
            </div>
          </div>`;
      }
      return `
        <div class="${cardBase} space-y-2" data-proto-block="${item.id}">
          ${noteBadge}
          <div class="flex items-center justify-between">
            <div>
              <div class="text-xs font-extrabold text-slate-900">${escapeHtml(item.code)}</div>
              <div class="text-[11px] text-slate-500">${escapeHtml(item.note || item.desc)}</div>
            </div>
            <label class="inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer" data-role="proto-switch-toggle">
              <div class="w-10 h-5 bg-slate-300 peer-checked:bg-blue-600 rounded-full relative transition after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
            </label>
          </div>
        </div>`;
    }

    // 4. 날짜·시간 카테고리 (dt_*)
    if (item.catKey === 'datetime') {
      return `
        <div class="${cardBase} space-y-3" data-proto-block="${item.id}">
          ${noteBadge}
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xs font-extrabold text-slate-900">📅 ${escapeHtml(item.code)} (${escapeHtml(item.eng)})</h3>
              <p class="text-[11px] text-slate-400">${escapeHtml(item.note || '날짜나 시간 슬롯을 클릭하면 선택 상태가 즉시 업데이트됩니다')}</p>
            </div>
            <span data-role="proto-date-summary" class="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-extrabold">11월 14일 (금) · 14:00 선택됨</span>
          </div>
          <div class="grid grid-cols-7 gap-1 text-center text-xs font-bold">
            <button type="button" data-role="proto-day-btn" data-day="11월 12일 (수)" class="py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600">12(수)</button>
            <button type="button" data-role="proto-day-btn" data-day="11월 13일 (목)" class="py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600">13(목)</button>
            <button type="button" data-role="proto-day-btn" data-day="11월 14일 (금)" class="py-1.5 rounded-lg bg-blue-600 text-white shadow-sm">14(금)</button>
            <button type="button" data-role="proto-day-btn" data-day="11월 15일 (토)" class="py-1.5 rounded-lg bg-blue-100 text-blue-700">15(토)</button>
            <button type="button" data-role="proto-day-btn" data-day="11월 16일 (일)" class="py-1.5 rounded-lg bg-blue-100 text-blue-700">16(일)</button>
            <button type="button" data-role="proto-day-btn" data-day="11월 17일 (월)" class="py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600">17(월)</button>
            <button type="button" data-role="proto-day-btn" data-day="11월 18일 (화)" class="py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600">18(화)</button>
          </div>
        </div>`;
    }

    // 5. 차트 시각화 & KPI (cht_*, cnt_08, lay_07)
    if (item.catKey === 'chart' || item.id === 'cnt_08' || item.id === 'lay_07') {
      return `
        <div class="${cardBase} space-y-3" data-proto-block="${item.id}">
          ${noteBadge}
          <div class="flex items-center justify-between">
            <div>
              <span class="text-[11px] font-bold text-slate-400">${escapeHtml(item.eng)}</span>
              <h3 class="text-sm font-extrabold text-slate-900">${escapeHtml(item.note || item.code)}</h3>
            </div>
            <button type="button" data-role="proto-chart-refresh" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 text-[11px] font-bold transition">
              데이터 리프레시 ↻
            </button>
          </div>
          <div class="grid grid-cols-3 gap-2 text-xs">
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="text-slate-400 text-[10px]">핵심 전환율</div>
              <div data-role="proto-stat-num" class="text-lg font-extrabold text-slate-900 mt-0.5">74.2%</div>
            </div>
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div class="text-slate-400 text-[10px]">활성 세션</div>
              <div data-role="proto-stat-num2" class="text-lg font-extrabold text-blue-600 mt-0.5">1,480</div>
            </div>
            <div class="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-end gap-1 h-16">
              <div data-role="proto-bar" class="flex-1 bg-blue-300 rounded-t transition-all duration-300" style="height: 45%;"></div>
              <div data-role="proto-bar" class="flex-1 bg-blue-500 rounded-t transition-all duration-300" style="height: 70%;"></div>
              <div data-role="proto-bar" class="flex-1 bg-blue-600 rounded-t transition-all duration-300" style="height: 95%;"></div>
              <div data-role="proto-bar" class="flex-1 bg-indigo-500 rounded-t transition-all duration-300" style="height: 60%;"></div>
            </div>
          </div>
        </div>`;
    }

    // 6. AI 인터페이스 카테고리 (ai_*)
    if (item.catKey === 'ai') {
      return `
        <div class="proto-card bg-slate-900 text-white rounded-2xl p-4 shadow-md space-y-3" data-proto-block="${item.id}">
          ${noteBadge}
          <div class="flex items-center justify-between border-b border-slate-800 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
              <span class="text-xs font-extrabold text-blue-300">${escapeHtml(item.code)} (${escapeHtml(item.eng)})</span>
            </div>
            <button type="button" data-role="proto-ai-run" class="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold transition">
              ✨ AI 스트리밍 실행
            </button>
          </div>
          <p data-role="proto-ai-output" class="text-xs text-slate-200 leading-relaxed min-h-[38px]">
            ${escapeHtml(item.note || '우측 상단 [AI 스트리밍 실행] 버튼을 누르면 실시간 토큰 타자기 애니메이션이 작동합니다.')}
          </p>
        </div>`;
    }

    // 7. 커머스 & 결제 카테고리 (com_*)
    if (item.catKey === 'commerce') {
      return `
        <div class="${cardBase} space-y-3" data-proto-block="${item.id}">
          ${noteBadge}
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-extrabold text-slate-900">🛍️ ${escapeHtml(item.code)}</h3>
              <p class="text-[11px] text-slate-500">${escapeHtml(item.note || item.desc)}</p>
            </div>
            <button type="button" data-role="proto-trigger-toast" data-msg="🛒 장바구니/결제 상태에 즉시 반영되었습니다!" class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-sm transition">
              즉시 적용 / 구매하기
            </button>
          </div>
        </div>`;
    }

    // 8. 로딩 버튼 / 모달 / 토스트 / 바텀시트 (ld_09, fb_*)
    if (item.id === 'ld_09' || item.catKey === 'feedback') {
      return `
        <div class="${cardBase} flex flex-wrap items-center justify-between gap-2" data-proto-block="${item.id}">
          <div>
            ${noteBadge}
            <div class="text-xs font-extrabold text-slate-900">${escapeHtml(item.code)} (${escapeHtml(item.eng)})</div>
            <div class="text-[11px] text-slate-500">${escapeHtml(item.note || item.desc)}</div>
          </div>
          <div class="flex items-center gap-2">
            <button type="button" data-role="proto-loading-cta" class="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition">
              <span data-role="proto-cta-spinner" class="hidden w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
              <span data-role="proto-cta-label">${escapeHtml(item.note || '클릭하여 액션 실행 & 피드백 확인')}</span>
            </button>
            <button type="button" data-role="proto-open-modal" class="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition">
              모달 열기
            </button>
          </div>
        </div>`;
    }

    // 8.5 계정·보안 & 미디어·협업 인터랙티브 블록 (aut_*, med_*)
    if (item.catKey === 'auth' || item.catKey === 'media_collab') {
      const isAuth = item.catKey === 'auth';
      const actionLabel = isAuth ? '보안 검증 실행' : '협업 액션 테스트';
      const toastMsg = isAuth
        ? `🔐 [${escapeHtml(item.code)}] 보안 정책이 안전하게 검증되었습니다.`
        : `🎬 [${escapeHtml(item.code)}] 실시간 협업 상태가 동기화되었습니다.`;
      return `
        <div class="${cardBase} space-y-2.5" data-proto-block="${item.id}">
          ${noteBadge}
          <div class="flex items-center justify-between gap-2">
            <div>
              <h3 class="text-xs sm:text-sm font-extrabold text-slate-900">${escapeHtml(item.code)}</h3>
              <p class="text-[11px] text-slate-500">${escapeHtml(item.note || item.desc)}</p>
            </div>
            <button type="button" data-role="proto-trigger-toast" data-msg="${toastMsg}" class="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-blue-600 text-white text-[11px] font-bold transition shrink-0">
              ${actionLabel} ▶
            </button>
          </div>
          <div>${window.UX_TAXONOMY_DB ? window.UX_TAXONOMY_DB.getVisualWireframeHTML(item) : ''}</div>
        </div>`;
    }

    // 8.6 온보딩 / 첫화면 카테고리 (onb_*)
    if (item.catKey === 'onboarding') {
      if (item.id === 'onb_01' || item.id === 'onb_02') {
        return `
          <div class="${cardBase} space-y-3" data-proto-block="${item.id}" data-onb-step="0">
            ${noteBadge}
            <div class="flex items-center justify-between">
              <span class="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-[10px] font-extrabold">${escapeHtml(item.code)}</span>
              <span data-role="proto-onb-badge" class="text-[11px] font-bold text-slate-400">1 / 3</span>
            </div>
            <div class="p-4 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white space-y-1.5">
              <div data-role="proto-onb-title" class="text-sm font-extrabold">${escapeHtml(item.note || '1단계: 직관적인 AI 워크스페이스 시작하기')}</div>
              <p data-role="proto-onb-desc" class="text-xs text-blue-100 leading-relaxed">복잡한 설정 없이 표준 UI/UX 블록을 조합해 즉시 실행 가능한 프로토타입을 완성하세요.</p>
            </div>
            <div class="flex items-center justify-between pt-1">
              <div class="flex items-center gap-1.5">
                <button type="button" data-role="proto-onb-dot" data-idx="0" aria-label="1단계" class="w-5 h-2 rounded-full bg-blue-600 transition-all"></button>
                <button type="button" data-role="proto-onb-dot" data-idx="1" aria-label="2단계" class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 transition-all"></button>
                <button type="button" data-role="proto-onb-dot" data-idx="2" aria-label="3단계" class="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 transition-all"></button>
              </div>
              <button type="button" data-role="proto-onb-next" class="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-blue-600 text-white text-xs font-bold hover:opacity-90 transition">다음 →</button>
            </div>
          </div>`;
      }
      if (item.id === 'onb_05') {
        return `
          <div class="${cardBase} space-y-2.5" data-proto-block="${item.id}">
            ${noteBadge}
            <div class="text-xs font-extrabold text-slate-900 dark:text-slate-100">${escapeHtml(item.code)}</div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-bold">
              <button type="button" data-role="proto-trigger-toast" data-msg="💬 카카오 계정으로 3초 간편 로그인되었습니다." class="py-2.5 px-3 rounded-xl bg-amber-300 hover:bg-amber-400 text-slate-950 transition">카카오로 시작</button>
              <button type="button" data-role="proto-trigger-toast" data-msg="🍎 Apple 계정으로 간편 인증되었습니다." class="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white transition">Apple로 계속</button>
              <button type="button" data-role="proto-trigger-toast" data-msg="🔵 Google 계정으로 간편 인증되었습니다." class="py-2.5 px-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-100 hover:bg-slate-50 transition">Google 계속</button>
            </div>
          </div>`;
      }
      if (item.id === 'onb_06') {
        return `
          <div class="${cardBase} space-y-2.5 text-xs" data-proto-block="${item.id}">
            ${noteBadge}
            <label class="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 font-extrabold text-slate-900 dark:text-slate-100 cursor-pointer">
              <input type="checkbox" data-role="proto-terms-master" class="w-4 h-4 accent-blue-600">
              <span>약관 전체 동의 (필수 · 선택 포함)</span>
            </label>
            <div class="space-y-1.5 pl-2 text-slate-600 dark:text-slate-300">
              <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" data-role="proto-terms-item" class="accent-blue-600"><span>[필수] 서비스 이용약관 동의</span></label>
              <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" data-role="proto-terms-item" class="accent-blue-600"><span>[필수] 개인정보 수집 및 이용 동의</span></label>
              <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" data-role="proto-terms-item" class="accent-blue-600"><span>[선택] 맞춤형 혜택 알림 수신</span></label>
            </div>
          </div>`;
      }
      return `
        <div class="${cardBase} flex items-center justify-between gap-3" data-proto-block="${item.id}">
          <div>
            ${noteBadge}
            <h3 class="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100">🎉 ${escapeHtml(item.code)}</h3>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">${escapeHtml(item.note || item.desc)}</p>
          </div>
          <button type="button" data-role="proto-trigger-toast" data-msg="🎉 환영합니다! 온보딩이 완료되어 홈 화면으로 이동합니다." class="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shrink-0 transition">시작하기 ▶</button>
        </div>`;
    }

    // 8.7 탐색 & 인디케이터 (nav_*, ind_*)
    if (item.id === 'nav_01') {
      return `
        <nav aria-label="하단 탭바" class="flex items-center justify-around py-1 text-[11px] font-bold text-slate-500 dark:text-slate-400" data-proto-block="${item.id}">
          <button type="button" data-role="proto-nav-tab" class="flex flex-col items-center gap-0.5 text-blue-600 dark:text-blue-400"><span>🏠</span><span>홈</span></button>
          <button type="button" data-role="proto-nav-tab" class="flex flex-col items-center gap-0.5 hover:text-slate-900 dark:hover:text-white"><span>🔍</span><span>탐색</span></button>
          <button type="button" data-role="proto-nav-tab" class="flex flex-col items-center gap-0.5 hover:text-slate-900 dark:hover:text-white"><span>💬</span><span>피드</span></button>
          <button type="button" data-role="proto-nav-tab" class="flex flex-col items-center gap-0.5 hover:text-slate-900 dark:hover:text-white"><span>👤</span><span>마이</span></button>
        </nav>`;
    }
    if (item.id === 'nav_02') {
      return `
        <div class="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-1 text-xs font-bold overflow-x-auto" data-proto-block="${item.id}">
          <button type="button" data-role="proto-nav-tab" class="px-3 py-1.5 rounded-lg bg-blue-600 text-white shrink-0">추천</button>
          <button type="button" data-role="proto-nav-tab" class="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0">최신</button>
          <button type="button" data-role="proto-nav-tab" class="px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0">팔로잉</button>
        </div>`;
    }
    if (item.id === 'ind_02' || item.id === 'ind_04') {
      return `
        <div class="${cardBase} flex items-center justify-between gap-2 text-xs" data-proto-block="${item.id}">
          <span class="font-extrabold text-slate-800 dark:text-slate-100">${escapeHtml(item.code)}</span>
          <div class="flex items-center gap-1.5">
            <button type="button" data-role="proto-step-btn" class="px-2.5 py-1 rounded-full bg-blue-600 text-white font-bold">1. 정보</button>
            <span class="text-slate-300">→</span>
            <button type="button" data-role="proto-step-btn" class="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">2. 옵션</button>
            <span class="text-slate-300">→</span>
            <button type="button" data-role="proto-step-btn" class="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">3. 완료</button>
          </div>
        </div>`;
    }
    if (item.id === 'ind_09') {
      return `
        <div class="pt-2 pb-[env(safe-area-inset-bottom)] flex justify-center" data-proto-block="${item.id}" aria-hidden="true">
          <div class="w-28 h-1 rounded-full bg-slate-400/60 dark:bg-slate-600"></div>
        </div>`;
    }

    // 9. 기본 범용 인터랙티브 카드 (모든 나머지 패턴 대응)
    return `
      <div class="${cardBase} space-y-2" data-proto-block="${item.id}" data-item-text="${escapeHtml(item.code + ' ' + item.eng + ' ' + (item.note || ''))}">
        ${noteBadge}
        <div class="flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[10px] font-extrabold">${escapeHtml(item.catShort)}</span>
            <h3 class="text-xs sm:text-sm font-extrabold text-slate-900">${escapeHtml(item.code)}</h3>
            <span class="text-[11px] font-mono text-slate-400">${escapeHtml(item.eng)}</span>
          </div>
          <button type="button" data-role="proto-trigger-toast" data-msg="✓ [${escapeHtml(item.code)}] 인터랙션이 정상 실행되었습니다!" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-[11px] font-bold transition">
            작동 테스트 ▶
          </button>
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">${escapeHtml(item.desc)}</p>
        <div class="pt-1">
          ${window.UX_TAXONOMY_DB ? window.UX_TAXONOMY_DB.getVisualWireframeHTML(item) : ''}
        </div>
      </div>`;
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  const CAT_ICON_MAP = {
    search: 'search',
    datetime: 'calendar',
    chart: 'bar-chart-2',
    commerce: 'shopping-bag',
    ai: 'bot',
    auth: 'shield-check',
    form: 'file-text',
    onboarding: 'rocket',
    media_collab: 'users',
    feedback: 'bell',
    loading: 'loader',
    content: 'layout-grid',
    layout: 'layout-template'
  };

  const PRESET_DOMAIN_LABELS = {
    apply: '채용·평가',
    ai_chat: 'AI 에이전트',
    search_shop: '커머스 탐색',
    booking: '예약 플로우',
    onboarding: '온보딩',
    saas_dash: 'SaaS 분석',
    rbac_security: '팀·보안',
    social_feed: '소셜 피드'
  };

  // 현재 조립된 블록(범용) + 프리셋 도메인 맥락을 결합해 레일/사이드바 내비게이션 항목 생성
  function buildNavigationItems(activeComponents = [], presetKey = '') {
    const domainLabel = PRESET_DOMAIN_LABELS[presetKey] || '커스텀 워크스페이스';
    const items = [
      {
        targetId: '__top__',
        label: '전체 화면 홈',
        icon: 'home',
        badge: activeComponents.length > 0 ? String(activeComponents.length) : ''
      }
    ];

    const mainItems = activeComponents.filter(x => x.slot === 'main');
    const sourceList = mainItems.length > 0 ? mainItems : activeComponents;
    const seen = new Set();

    for (const comp of sourceList) {
      if (items.length >= 5) break;
      if (!comp || seen.has(comp.id)) continue;
      seen.add(comp.id);
      const shortLabel = (comp.code || '').replace(/^[^\d]*\d+\s*/, '').replace(/\s*\[추가\]\s*/g, '').trim() || comp.catShort || comp.eng;
      items.push({
        targetId: comp.id,
        label: shortLabel,
        icon: CAT_ICON_MAP[comp.catKey] || 'layers',
        badge: ''
      });
    }

    if (items.length === 1) {
      items.push(
        { targetId: '__top__', label: '주요 구성 블록', icon: 'layers', badge: '' },
        { targetId: '__top__', label: '화면 설정', icon: 'settings', badge: '' }
      );
    }

    return { domainLabel, items };
  }

  // ===========================================================================
  // 메인 동적 HTML 합성 함수 (현재 캔버스 상태 -> 독립 실행 가능한 완전한 HTML 문서)
  // ===========================================================================
  function compileDynamicPrototypeHTML(config) {
    const {
      screenTitle = '바이브 코딩 실시간 프로토타입',
      viewport = 'desktop',
      gridArch = 'sidebar',
      visualTheme = 'clean',
      presetKey = '',
      activeComponents = []
    } = config;

    const bySlot = (s) => activeComponents.filter(x => x.slot === s);
    const headers = bySlot('header');
    const mains = bySlot('main');
    const bottoms = bySlot('bottom');
    const behaviors = bySlot('behavior');

    // 비주얼 테마별 커스텀 CSS 주입 (10종 전체 지원)
    let themeBodyClass = "bg-slate-50 text-slate-900";
    let themeCustomCss = "";
    if (visualTheme.includes('Claymorphism')) {
      themeBodyClass = "bg-blue-50/60 text-slate-900";
      themeCustomCss = `.proto-card { border-radius: 24px !important; border: 1px solid rgba(255,255,255,0.8) !important; box-shadow: 12px 12px 24px rgba(37, 99, 235, 0.12), -6px -6px 16px rgba(255,255,255,0.9), inset 3px 3px 8px rgba(255,255,255,0.8), inset -3px -3px 8px rgba(30,58,138,0.08) !important; }`;
    } else if (visualTheme.includes('Neubrutalism')) {
      themeBodyClass = "bg-amber-50 text-slate-950";
      themeCustomCss = `.proto-card { border: 2px solid #000 !important; box-shadow: 5px 5px 0px #000 !important; border-radius: 12px !important; }`;
    } else if (visualTheme.includes('Glassmorphism')) {
      themeBodyClass = "bg-gradient-to-br from-indigo-100 via-sky-50 to-pink-100 text-slate-900";
      themeCustomCss = `.proto-card { background: rgba(255,255,255,0.72) !important; backdrop-filter: blur(12px) !important; border: 1px solid rgba(255,255,255,0.75) !important; }`;
    } else if (visualTheme.includes('Holographic') || visualTheme.includes('Y2K')) {
      themeBodyClass = "bg-slate-950 text-slate-100";
      themeCustomCss = `.proto-card { background: rgba(30, 41, 59, 0.85) !important; border-color: rgba(99, 102, 241, 0.4) !important; color: #f8fafc !important; } .proto-card h3, .proto-card td { color: #f8fafc !important; }`;
    } else if (visualTheme.includes('Liquid Motion')) {
      themeBodyClass = "bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50 text-slate-900";
      themeCustomCss = `.proto-card { border-radius: 28px !important; border: 1px solid rgba(99, 102, 241, 0.18) !important; box-shadow: 0 12px 30px -10px rgba(79, 70, 229, 0.16) !important; } .proto-card:hover { transform: translateY(-2px); }`;
    } else if (visualTheme.includes('Bauhaus')) {
      themeBodyClass = "bg-stone-100 text-slate-950";
      themeCustomCss = `.proto-card { border-radius: 0px !important; border: 2px solid #0f172a !important; border-top: 6px solid #2563eb !important; box-shadow: none !important; }`;
    } else if (visualTheme.includes('Grainy Gradient')) {
      themeBodyClass = "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100";
      themeCustomCss = `.proto-card { background: rgba(15, 23, 42, 0.82) !important; border: 1px solid rgba(148, 163, 184, 0.25) !important; color: #f8fafc !important; } .proto-card h3, .proto-card td, .proto-card label { color: #f8fafc !important; }`;
    } else if (visualTheme.includes('Isometric')) {
      themeBodyClass = "bg-slate-100 text-slate-900";
      themeCustomCss = `body { background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 16px 16px; } .proto-card { border: 1px solid #cbd5e1 !important; box-shadow: 4px 4px 0px rgba(37, 99, 235, 0.14) !important; }`;
    } else if (visualTheme.includes('Kinetic Typography')) {
      themeBodyClass = "bg-neutral-950 text-white";
      themeCustomCss = `.proto-card { background: #171717 !important; border: 1px solid #404040 !important; color: #fafafa !important; } .proto-card h3, .proto-card td { color: #fafafa !important; letter-spacing: -0.02em; }`;
    }

    const mainGridClass = gridArch === 'stack'
      ? 'grid grid-cols-1 gap-4'
      : gridArch === 'bento3'
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
      : 'grid grid-cols-1 md:grid-cols-2 gap-4';

    const hasSidebar = gridArch === 'sidebar' || gridArch === 'bento3';
    const hasRightInspector = gridArch === 'bento3' || activeComponents.some(x => ['lay_12', 'cnt_12', 'nav_12'].includes(x.id));

    const headerHtml = headers.map((item, idx) => renderInteractiveComponentSection(item, idx)).join('\n');
    const mainHtml = mains.map((item, idx) => {
      const spanClass = item.span === 'full'
        ? (gridArch === 'bento3' ? 'col-span-1 md:col-span-2 lg:col-span-3' : 'col-span-1 md:col-span-2')
        : 'col-span-1';
      return `<div class="${spanClass} anim-stagger" style="animation-delay: ${idx * 55}ms;">${renderInteractiveComponentSection(item, idx)}</div>`;
    }).join('\n');
    const bottomHtml = bottoms.map((item, idx) => renderInteractiveComponentSection(item, idx)).join('\n');
    const behaviorBadges = behaviors.map(b => `<span class="px-2.5 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-200 text-[11px] font-bold">⚡ ${escapeHtml(b.code)}</span>`).join('');
    const { domainLabel, items: navItems } = buildNavigationItems(activeComponents, presetKey);
    const railButtonsHtml = navItems.slice(0, 5).map((nav, idx) => `
      <button type="button" data-role="proto-nav-jump" data-target="${escapeHtml(nav.targetId)}" title="${escapeHtml(nav.label)}" aria-label="${escapeHtml(nav.label)}" class="w-9 h-9 rounded-xl flex items-center justify-center transition ${idx === 0 ? 'bg-slate-800 text-blue-400' : 'hover:bg-slate-800 text-slate-400'}">
        <i data-lucide="${escapeHtml(nav.icon)}" class="w-4 h-4"></i>
      </button>`).join('');
    const sidebarButtonsHtml = navItems.map((nav, idx) => `
      <button type="button" data-role="proto-nav-jump" data-target="${escapeHtml(nav.targetId)}" class="w-full text-left px-3 py-2 rounded-xl flex items-center justify-between gap-2 transition ${idx === 0 ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}">
        <span class="flex items-center gap-2 min-w-0">
          <i data-lucide="${escapeHtml(nav.icon)}" class="w-3.5 h-3.5 shrink-0"></i>
          <span class="truncate">${escapeHtml(nav.label)}</span>
        </span>
        ${nav.badge ? `<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold shrink-0">${escapeHtml(nav.badge)}</span>` : ''}
      </button>`).join('');

    return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(screenTitle)} — Live Compiled Prototype</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>tailwind.config = { darkMode: 'class' };</script>
  <script src="https://unpkg.com/lucide@0.460.0"></script>
  <style>
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');
    body { font-family: 'Pretendard Variable', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif; word-break: keep-all; overflow-wrap: break-word; }
    @keyframes springIn {
      0% { transform: translateY(10px) scale(0.97); opacity: 0; }
      70% { transform: translateY(-2px) scale(1.01); opacity: 1; }
      100% { transform: translateY(0) scale(1); opacity: 1; }
    }
    .anim-stagger { animation: springIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
    dialog:modal { overscroll-behavior: contain; }
    dialog[open] { display: flex; }
    dialog::backdrop { background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(4px); }
    ${themeCustomCss}
  </style>
</head>
<body class="${themeBodyClass} dark:bg-slate-950 dark:text-slate-100 min-h-screen flex flex-col antialiased">

  <!-- 상단 프로토타입 메타 & 적용된 모션 규칙 안내 바 -->
  <div class="bg-slate-900 text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2">
    <div class="flex items-center gap-2">
      <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-extrabold text-[10px]">LIVE COMPILED PROTOTYPE</span>
      <strong class="font-extrabold">${escapeHtml(screenTitle)}</strong>
      <span class="text-slate-400 text-[11px]">(${activeComponents.length}개 블록 실시간 합성됨 · 테마: ${escapeHtml(visualTheme)})</span>
    </div>
    <div class="flex flex-wrap items-center gap-1.5">
      ${behaviorBadges || '<span class="text-[11px] text-slate-400">기본 인터랙션 모드</span>'}
      <button type="button" id="protoDarkToggle" class="ml-2 px-2.5 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] font-bold text-slate-200 transition">🌙 다크 모드</button>
    </div>
  </div>

  <!-- [A. Header Slot 영역] -->
  ${headers.length > 0 ? `
  <header class="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3">
    <div class="max-w-7xl mx-auto space-y-2.5">
      ${headerHtml}
    </div>
  </header>` : ''}

  <!-- [B. Main Body Wrapper: 태블릿 레일 + 좌측 사이드바 + 본문 Grid + 우측 인스펙터] -->
  <div class="flex-1 max-w-7xl w-full mx-auto flex">

    <!-- 태블릿 네비게이션 레일 (md:flex lg:hidden) -->
    <aside aria-label="태블릿 네비게이션 레일" class="hidden md:flex lg:hidden w-14 flex-col items-center py-4 gap-3 bg-slate-900 text-slate-400 shrink-0">
      <div class="w-8 h-8 rounded-xl bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center">UX</div>
      ${railButtonsHtml}
    </aside>

    ${hasSidebar ? `
    <!-- 데스크톱 좌측 고정 사이드바 -->
    <aside aria-label="워크스페이스 내비게이션" class="hidden lg:flex w-60 flex-col justify-between p-4 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0">
      <div class="space-y-1.5 text-xs font-bold">
        <div class="text-[10px] font-extrabold text-slate-400 uppercase px-2 mb-2 truncate">${escapeHtml(domainLabel)}</div>
        ${sidebarButtonsHtml}
      </div>
      <div class="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
        <div class="font-extrabold text-slate-800 dark:text-slate-200">${escapeHtml(domainLabel)} · ${escapeHtml(gridArch.toUpperCase())}</div>
        <div class="mt-0.5">메뉴를 클릭하면 해당 블록으로 이동합니다.</div>
      </div>
    </aside>` : ''}

    <!-- 중앙 본문 격자 슬롯 -->
    <main class="flex-1 p-4 sm:p-6 ${mainGridClass} content-start">
      ${mainHtml || `<div class="col-span-full p-12 text-center text-slate-400 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">캔버스 본문(Main) 슬롯에 추가된 블록이 없습니다.</div>`}
    </main>

    ${hasRightInspector ? `
    <!-- 우측 3단 보조 인스펙터 / 목차 -->
    <aside class="hidden xl:flex w-72 flex-col justify-between p-4 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shrink-0 text-xs">
      <div class="space-y-3">
        <div class="text-[10px] font-extrabold text-slate-400 uppercase">Right Inspector / TOC</div>
        <div class="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 space-y-1">
          <div class="font-extrabold text-blue-800 dark:text-blue-200">현재 화면 구성 요약</div>
          <p class="text-[11px] text-blue-600 dark:text-blue-300">총 ${activeComponents.length}개의 표준 패턴이 유기적으로 연결되어 작동 중입니다.</p>
        </div>
        <div class="space-y-1.5 border-l-2 border-slate-200 dark:border-slate-700 pl-3 text-[11px] text-slate-600 dark:text-slate-300">
          <div class="font-bold text-blue-600 dark:text-blue-400">1. 상단 헤더 (${headers.length}개 블록)</div>
          <div>2. 중앙 본문 (${mains.length}개 블록)</div>
          <div>3. 하단/오버레이 (${bottoms.length}개 블록)</div>
        </div>
      </div>
      <div class="text-[10px] text-slate-400">3단 홀리 그레일 / 벤토 보조 영역</div>
    </aside>` : ''}

  </div>

  <!-- [C. Bottom / Overlay Slot 영역] -->
  ${bottoms.length > 0 ? `
  <footer class="sticky bottom-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 px-4 py-3">
    <div class="max-w-7xl mx-auto space-y-2">
      ${bottomHtml}
    </div>
  </footer>` : ''}

  <!-- 공용 인터랙티브 스낵바 & 네이티브 모달 -->
  <div id="protoSnackbar" role="status" aria-live="polite" class="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 hidden bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl items-center gap-3 text-xs font-bold anim-stagger">
    <span id="protoSnackbarMsg">✓ 작업이 완료되었습니다.</span>
    <button type="button" id="protoSnackbarUndo" class="text-amber-400 underline">실행 취소(Undo)</button>
  </div>

  <dialog id="protoModal" closedby="any" class="m-auto w-[90vw] max-w-md rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-2xl flex-col gap-4">
    <div class="flex items-center justify-between">
      <h3 class="text-base font-extrabold text-slate-900 dark:text-slate-100">${escapeHtml(screenTitle)} — 확인 모달</h3>
      <form method="dialog"><button type="submit" class="text-slate-400 hover:text-slate-700">✕</button></form>
    </div>
    <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">네이티브 &lt;dialog closedby="any"&gt; 모달입니다. 바깥 배경(Backdrop)을 클릭하거나 Esc 키를 눌러 닫을 수 있습니다.</p>
    <form method="dialog" class="flex justify-end gap-2 pt-2 border-t border-slate-100">
      <button type="submit" value="cancel" class="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold">취소</button>
      <button type="submit" value="confirm" class="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold">확인 완료</button>
    </form>
  </dialog>

  <script>
    lucide.createIcons();

    let toastTimer;
    function showProtoToast(msg) {
      const bar = document.getElementById('protoSnackbar');
      document.getElementById('protoSnackbarMsg').textContent = msg;
      bar.classList.remove('hidden');
      bar.classList.add('flex');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        bar.classList.add('hidden');
        bar.classList.remove('flex');
      }, 2800);
    }

    let activeSearchQuery = '';
    let activeFilterTag = 'all';

    function applyProtoFilterAndSearch() {
      const rows = document.querySelectorAll('[data-item-text]');
      let visibleCount = 0;
      rows.forEach(row => {
        const text = (row.dataset.itemText || '').toLowerCase();
        const matchesQuery = !activeSearchQuery || text.includes(activeSearchQuery);
        const matchesFilter = activeFilterTag === 'all' || text.includes(activeFilterTag.toLowerCase());
        const show = matchesQuery && matchesFilter;
        row.style.display = show ? '' : 'none';
        if (show) visibleCount++;
      });
      document.querySelectorAll('[data-role="proto-empty-state"]').forEach(emptyRow => {
        emptyRow.classList.toggle('hidden', visibleCount > 0);
      });
    }

    // 검색 입력 시 페이지 내 리스트/카드 실시간 필터링 연동
    document.querySelectorAll('[data-role="proto-search-input"]').forEach(input => {
      const wrap = input.closest('search');
      const clearBtn = wrap.querySelector('[data-role="proto-search-clear"]');
      const autoBox = wrap.querySelector('[data-role="proto-autocomplete-box"]');

      input.addEventListener('input', () => {
        activeSearchQuery = input.value.trim().toLowerCase();
        if (clearBtn) clearBtn.classList.toggle('hidden', activeSearchQuery.length === 0);
        applyProtoFilterAndSearch();

        if (autoBox) {
          if (activeSearchQuery.length > 0) {
            autoBox.innerHTML = ['디자인 시스템', 'AI 에이전트', 'React & Tailwind'].map(keyword =>
              \`<div class="px-2.5 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer flex justify-between" data-pick="\${keyword}"><span><strong class="text-blue-600">\${activeSearchQuery}</strong> 관련 추천: \${keyword}</span><span>↖</span></div>\`
            ).join('');
            autoBox.classList.remove('hidden');
          } else {
            autoBox.classList.add('hidden');
          }
        }
      });

      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          input.value = '';
          input.dispatchEvent(new Event('input'));
          input.focus();
        });
      }
    });

    // 정렬 셀렉트 변경 시 테이블 행 실시간 재정렬
    document.querySelectorAll('[data-role="proto-sort-select"]').forEach(sel => {
      sel.addEventListener('change', () => {
        const mode = sel.value;
        document.querySelectorAll('tbody[data-role="proto-filterable-list"]').forEach(tbody => {
          const emptyRow = tbody.querySelector('[data-role="proto-empty-state"]');
          const rows = Array.from(tbody.querySelectorAll('tr[data-item-text]'));
          rows.sort((a, b) => {
            if (mode === 'score_desc') {
              return Number(b.dataset.score || 0) - Number(a.dataset.score || 0);
            }
            if (mode === 'latest') {
              return Number(b.dataset.order || 0) - Number(a.dataset.order || 0);
            }
            return Number(a.dataset.order || 0) - Number(b.dataset.order || 0);
          });
          rows.forEach(r => tbody.appendChild(r));
          if (emptyRow) tbody.appendChild(emptyRow);
        });
        showProtoToast('↕️ 정렬 기준(' + sel.options[sel.selectedIndex].text + ')이 반영되었습니다.');
      });
    });

    // 실시간 텍스트 인풋 인라인 에러 검증
    document.querySelectorAll('[data-role="proto-live-input"]').forEach(inp => {
      inp.addEventListener('input', () => {
        const wrap = inp.parentElement;
        const ok = inp.value.trim().length >= 3;
        const errEl = wrap.querySelector('[data-role="proto-inline-error"]');
        const okEl = wrap.querySelector('[data-role="proto-inline-ok"]');
        if (errEl) errEl.classList.toggle('hidden', ok);
        if (okEl) okEl.classList.toggle('hidden', !ok);
      });
    });

    // 이벤트 위임으로 모든 인터랙티브 버튼 작동 보장
    document.addEventListener('click', (e) => {
      const toastBtn = e.target.closest('[data-role="proto-trigger-toast"]');
      if (toastBtn) showProtoToast(toastBtn.dataset.msg);

      const likeBtn = e.target.closest('[data-role="proto-optimistic-like"]');
      if (likeBtn) {
        const isStarred = likeBtn.textContent.includes('★');
        likeBtn.textContent = isStarred ? likeBtn.textContent.replace('★', '☆') : likeBtn.textContent.replace('☆', '★');
        likeBtn.className = isStarred
          ? "px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 font-bold transition"
          : "px-2.5 py-1 rounded-lg bg-amber-100 text-amber-700 font-bold transition";
        showProtoToast('⚡ 서버 대기 없이 0초 낙관적 UI(Optimistic UI)로 즉시 반영되었습니다!');
      }

      const minus = e.target.closest('[data-role="proto-step-minus"]');
      if (minus) {
        const valEl = minus.parentElement.querySelector('[data-role="proto-step-val"]');
        const v = Math.max(1, parseInt(valEl.textContent, 10) - 1);
        valEl.textContent = v;
      }
      const plus = e.target.closest('[data-role="proto-step-plus"]');
      if (plus) {
        const valEl = plus.parentElement.querySelector('[data-role="proto-step-val"]');
        const v = parseInt(valEl.textContent, 10) + 1;
        valEl.textContent = v;
      }

      const dropzone = e.target.closest('[data-role="proto-dropzone"]');
      if (dropzone) {
        const card = dropzone.parentElement;
        const bar = card.querySelector('[data-role="proto-prog-bar"]');
        const lbl = card.querySelector('[data-role="proto-prog-label"]');
        let p = 0;
        const timer = setInterval(() => {
          p += 25;
          if (p >= 100) {
            p = 100;
            clearInterval(timer);
            showProtoToast('☁️ 파일 업로드 100% 완료!');
          }
          if (bar) bar.style.width = p + '%';
          if (lbl) lbl.textContent = p + '% 완료';
        }, 120);
      }

      const pickItem = e.target.closest('[data-pick]');
      if (pickItem) {
        const wrap = pickItem.closest('search');
        const input = wrap ? wrap.querySelector('[data-role="proto-search-input"]') : null;
        const autoBox = wrap ? wrap.querySelector('[data-role="proto-autocomplete-box"]') : null;
        if (input) {
          input.value = pickItem.dataset.pick;
          input.dispatchEvent(new Event('input'));
        }
        if (autoBox) autoBox.classList.add('hidden');
      }

      const filterBtn = e.target.closest('[data-role="proto-filter-btn"]');
      if (filterBtn) {
        activeFilterTag = filterBtn.dataset.filter || 'all';
        const group = filterBtn.parentElement;
        if (group) {
          group.querySelectorAll('[data-role="proto-filter-btn"]').forEach(btn => {
            btn.className = btn === filterBtn
              ? 'px-3 py-1 rounded-full bg-blue-600 text-white font-bold transition'
              : 'px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition';
          });
        }
        applyProtoFilterAndSearch();
      }

      const resetBtn = e.target.closest('[data-role="proto-reset-filter"]');
      if (resetBtn) {
        activeSearchQuery = '';
        activeFilterTag = 'all';
        document.querySelectorAll('[data-role="proto-search-input"]').forEach(inp => { inp.value = ''; });
        document.querySelectorAll('[data-role="proto-search-clear"]').forEach(btn => btn.classList.add('hidden'));
        document.querySelectorAll('[data-role="proto-filter-btn"]').forEach(btn => {
          btn.className = btn.dataset.filter === 'all'
            ? 'px-3 py-1 rounded-full bg-blue-600 text-white font-bold transition'
            : 'px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition';
        });
        applyProtoFilterAndSearch();
        showProtoToast('🔄 검색어와 필터가 초기화되었습니다.');
      }

      const skelBtn = e.target.closest('[data-role="proto-skeleton-toggle"]');
      if (skelBtn) {
        const card = skelBtn.closest('[data-proto-block]');
        const tbody = card ? card.querySelector('tbody[data-role="proto-filterable-list"]') : null;
        if (tbody) {
          tbody.classList.add('animate-pulse', 'opacity-40');
          skelBtn.disabled = true;
          showProtoToast('⏳ 스켈레톤 로딩 상태를 시연 중입니다...');
          setTimeout(() => {
            tbody.classList.remove('animate-pulse', 'opacity-40');
            skelBtn.disabled = false;
          }, 900);
        }
      }

      const kanbanCard = e.target.closest('[data-role="proto-kanban-card"]');
      if (kanbanCard) {
        const board = kanbanCard.closest('[data-role="proto-kanban-board"]');
        const col = kanbanCard.closest('[data-kanban-col]');
        if (board && col) {
          const order = ['todo', 'doing', 'done'];
          const nextKey = order[(order.indexOf(col.dataset.kanbanCol) + 1) % order.length];
          const nextCol = board.querySelector('[data-kanban-col="' + nextKey + '"]');
          if (nextCol) {
            nextCol.appendChild(kanbanCard);
            const sub = kanbanCard.querySelector('div:last-child');
            if (nextKey === 'done') {
              kanbanCard.className = 'bg-white p-2.5 rounded-lg border border-emerald-200 text-slate-400 line-through cursor-pointer';
              if (sub) sub.textContent = '클릭하여 되돌리기 ↺';
            } else if (nextKey === 'doing') {
              kanbanCard.className = 'bg-white p-2.5 rounded-lg border border-blue-300 shadow-sm cursor-pointer';
              if (sub) sub.textContent = '클릭하여 완료 처리 →';
            } else {
              kanbanCard.className = 'bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm cursor-pointer hover:border-blue-400';
              if (sub) sub.textContent = '클릭하여 상태 변경 →';
            }
            showProtoToast('📋 칸반 카드가 [' + nextKey.toUpperCase() + '] 단계로 이동했습니다.');
          }
        }
      }

      const dayBtn = e.target.closest('[data-role="proto-day-btn"]');
      if (dayBtn) {
        const card = dayBtn.closest('[data-proto-block]');
        card.querySelectorAll('[data-role="proto-day-btn"]').forEach(b => {
          b.className = b === dayBtn
            ? "py-1.5 rounded-lg bg-blue-600 text-white shadow-sm font-bold"
            : "py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold";
        });
        const sum = card.querySelector('[data-role="proto-date-summary"]');
        if (sum) sum.textContent = dayBtn.dataset.day + ' 선택됨';
      }

      const chartBtn = e.target.closest('[data-role="proto-chart-refresh"]');
      if (chartBtn) {
        const card = chartBtn.closest('[data-proto-block]');
        card.querySelectorAll('[data-role="proto-bar"]').forEach(b => {
          b.style.height = (Math.floor(Math.random() * 65) + 30) + '%';
        });
        const n1 = card.querySelector('[data-role="proto-stat-num"]');
        if (n1) n1.textContent = (Math.random() * 30 + 65).toFixed(1) + '%';
        showProtoToast('📊 차트 및 KPI 데이터가 실시간 갱신되었습니다.');
      }

      const aiBtn = e.target.closest('[data-role="proto-ai-run"]');
      if (aiBtn) {
        const card = aiBtn.closest('[data-proto-block]');
        const out = card.querySelector('[data-role="proto-ai-output"]');
        const msg = "AI 에이전트가 현재 화면의 컨텍스트를 분석하여 실시간 스트리밍 응답을 출력하고 있습니다. 모든 UX 블록이 정상 작동합니다!";
        out.textContent = "";
        let i = 0;
        const timer = setInterval(() => {
          out.textContent += msg.charAt(i);
          i++;
          if (i >= msg.length) clearInterval(timer);
        }, 25);
      }

      const loadingCta = e.target.closest('[data-role="proto-loading-cta"]');
      if (loadingCta) {
        const spin = loadingCta.querySelector('[data-role="proto-cta-spinner"]');
        const lbl = loadingCta.querySelector('[data-role="proto-cta-label"]');
        const orig = lbl.textContent;
        loadingCta.disabled = true;
        if (spin) spin.classList.remove('hidden');
        lbl.textContent = '처리 중... (중복 클릭 차단됨)';
        setTimeout(() => {
          loadingCta.disabled = false;
          if (spin) spin.classList.add('hidden');
          lbl.textContent = orig;
          showProtoToast('✓ 제출 완료! 하단 스낵바와 실행 취소(Undo)가 연동되었습니다.');
        }, 1000);
      }

      const modalBtn = e.target.closest('[data-role="proto-open-modal"]');
      if (modalBtn) {
        document.getElementById('protoModal').showModal();
      }

      const chipDel = e.target.closest('[data-role="proto-chip-del"]');
      if (chipDel) {
        chipDel.closest('.proto-tag-chip').remove();
      }

      const clearChips = e.target.closest('[data-role="proto-clear-all-chips"]');
      if (clearChips) {
        const box = clearChips.closest('[data-proto-block]').querySelector('[data-role="proto-recent-chips"]');
        if (box) box.innerHTML = '<span class="text-slate-400">최근 검색어가 모두 삭제되었습니다.</span>';
      }
    });

    document.getElementById('protoSnackbarUndo').addEventListener('click', () => {
      document.getElementById('protoSnackbar').classList.add('hidden');
    });

    const darkToggle = document.getElementById('protoDarkToggle');
    if (darkToggle) {
      darkToggle.addEventListener('click', () => {
        const isDark = document.documentElement.classList.toggle('dark');
        darkToggle.textContent = isDark ? '☀️ 라이트 모드' : '🌙 다크 모드';
      });
    }

    const onbSlides = [
      { title: '1단계: 직관적인 AI 워크스페이스 시작하기', desc: '복잡한 설정 없이 표준 UI/UX 블록을 조합해 즉시 실행 가능한 프로토타입을 완성하세요.' },
      { title: '2단계: 모바일·태블릿·PC 자동 반응형 전환', desc: '단일 명세서로 엄지 영역(Thumb Zone)부터 3단 벤토 그리드까지 완벽히 대응합니다.' },
      { title: '3단계: 클릭 한 번으로 실시간 코드 검증', desc: '폼 검증, 스낵바 Undo, 네이티브 모달까지 지금 바로 시작해 보세요!' }
    ];
    function setOnbStep(card, step) {
      card.dataset.onbStep = String(step);
      const t = card.querySelector('[data-role="proto-onb-title"]');
      const d = card.querySelector('[data-role="proto-onb-desc"]');
      const b = card.querySelector('[data-role="proto-onb-badge"]');
      if (t) t.textContent = onbSlides[step].title;
      if (d) d.textContent = onbSlides[step].desc;
      if (b) b.textContent = (step + 1) + ' / ' + onbSlides.length;
      card.querySelectorAll('[data-role="proto-onb-dot"]').forEach((dot, i) => {
        dot.className = i === step
          ? 'w-5 h-2 rounded-full bg-blue-600 transition-all'
          : 'w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700 transition-all';
      });
    }

    document.addEventListener('click', (e) => {
      const onbNext = e.target.closest('[data-role="proto-onb-next"]');
      if (onbNext) {
        const card = onbNext.closest('[data-proto-block]');
        const cur = Number(card.dataset.onbStep || 0);
        setOnbStep(card, (cur + 1) % onbSlides.length);
      }
      const onbDot = e.target.closest('[data-role="proto-onb-dot"]');
      if (onbDot) {
        setOnbStep(onbDot.closest('[data-proto-block]'), Number(onbDot.dataset.idx || 0));
      }
      const navTab = e.target.closest('[data-role="proto-nav-tab"]');
      if (navTab) {
        const parent = navTab.parentElement;
        parent.querySelectorAll('[data-role="proto-nav-tab"]').forEach(btn => {
          btn.classList.remove('bg-blue-600', 'text-white', 'text-blue-600', 'dark:text-blue-400');
        });
        if (parent.tagName === 'NAV') {
          navTab.classList.add('text-blue-600', 'dark:text-blue-400');
        } else {
          navTab.classList.add('bg-blue-600', 'text-white');
        }
      }
      const navJump = e.target.closest('[data-role="proto-nav-jump"]');
      if (navJump) {
        const targetId = navJump.dataset.target;
        document.querySelectorAll('[data-role="proto-nav-jump"]').forEach(btn => {
          const isMatch = btn.dataset.target === targetId;
          if (btn.closest('aside')?.getAttribute('aria-label')?.includes('레일')) {
            btn.className = isMatch
              ? 'w-9 h-9 rounded-xl flex items-center justify-center transition bg-slate-800 text-blue-400'
              : 'w-9 h-9 rounded-xl flex items-center justify-center transition hover:bg-slate-800 text-slate-400';
          } else {
            btn.className = isMatch
              ? 'w-full text-left px-3 py-2 rounded-xl flex items-center justify-between gap-2 transition bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-extrabold'
              : 'w-full text-left px-3 py-2 rounded-xl flex items-center justify-between gap-2 transition text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800';
          }
        });
        if (targetId === '__top__') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const targetEl = document.querySelector('[data-proto-block="' + targetId + '"]');
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetEl.classList.add('ring-2', 'ring-blue-500');
            setTimeout(() => targetEl.classList.remove('ring-2', 'ring-blue-500'), 1100);
          }
        }
      }
      const stepBtn = e.target.closest('[data-role="proto-step-btn"]');
      if (stepBtn) {
        stepBtn.parentElement.querySelectorAll('[data-role="proto-step-btn"]').forEach(btn => {
          btn.className = btn === stepBtn
            ? 'px-2.5 py-1 rounded-full bg-blue-600 text-white font-bold'
            : 'px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold';
        });
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target.matches('[data-role="proto-terms-master"]')) {
        const card = e.target.closest('[data-proto-block]');
        card.querySelectorAll('[data-role="proto-terms-item"]').forEach(cb => { cb.checked = e.target.checked; });
      } else if (e.target.matches('[data-role="proto-terms-item"]')) {
        const card = e.target.closest('[data-proto-block]');
        const items = Array.from(card.querySelectorAll('[data-role="proto-terms-item"]'));
        const master = card.querySelector('[data-role="proto-terms-master"]');
        if (master) master.checked = items.every(cb => cb.checked);
      }
    });
  <\/script>
</body>
</html>`;
  }

  // ===========================================================================
  // 방식 B 옵션: AI API (Gemini / OpenAI 호환) 실시간 호출 브릿지
  // ===========================================================================
  async function generatePrototypeViaAiApi({ provider, apiKey, model, promptText }) {
    const systemInstruction = `당신은 수석 프론트엔드 엔지니어입니다. 사용자의 UI/UX 프롬프트 명세서를 보고, 즉시 브라우저에서 작동하는 완전한 단일 HTML 파일(<!DOCTYPE html>부터 </html>까지, Tailwind CSS CDN 및 Lucide Icons 포함)만 출력하세요. 마크다운 코드펜스(\`\`\`html) 없이 순수 HTML 코드만 반환하거나 코드블록 안에 작성하세요.`;

    if (provider === 'gemini') {
      const targetModel = model || 'gemini-2.5-flash';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${ encodeURIComponent(targetModel) }:generateContent?key=${ encodeURIComponent(apiKey) }`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: [{ role: 'user', parts: [{ text: promptText }] }]
        })
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Gemini API 오류 (${res.status}): ${errText.slice(0, 180)}`);
      }
      const data = await res.json();
      const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      return extractHtmlFromResponse(raw);
    } else {
      // OpenAI 호환 엔드포인트
      const targetModel = model || 'gpt-4o-mini';
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: targetModel,
          messages: [
            { role: 'system', content: systemInstruction },
            { role: 'user', content: promptText }
          ]
        })
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`OpenAI API 오류 (${res.status}): ${errText.slice(0, 180)}`);
      }
      const data = await res.json();
      const raw = data?.choices?.[0]?.message?.content || '';
      return extractHtmlFromResponse(raw);
    }
  }

  function extractHtmlFromResponse(raw) {
    const match = raw.match(/```(?:html)?\s*([\s\S]*?)```/i);
    if (match && match[1]) return match[1].trim();
    const docIdx = raw.indexOf('<!DOCTYPE html>');
    if (docIdx > -1) return raw.slice(docIdx).trim();
    return raw.trim();
  }

  window.UX_PROTOTYPE_COMPILER = {
    buildNavigationItems,
    compileDynamicPrototypeHTML,
    generatePrototypeViaAiApi
  };
})();
