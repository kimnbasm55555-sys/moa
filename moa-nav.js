/* ============================================================
   모아 공통 하단 네비게이션 (moa-nav.js)
   - 모든 화면에 <script src="moa-nav.js"></script> 로 삽입
   - 세션(moa_user)의 role에 따라 창업자/영업사원 메뉴 자동 분기
   - 현재 페이지는 data-active 로 표시
   ============================================================ */
(function(){
  "use strict";

  // 세션에서 역할 읽기 (없으면 창업자 기본)
  var user = null;
  try { user = JSON.parse(sessionStorage.getItem('moa_user') || 'null'); } catch(e){}
  var role = (user && user.role) || 'founder';

  // 현재 파일명
  var here = (location.pathname.split('/').pop() || '').toLowerCase();

  // 역할별 메뉴 정의 [파일, 라벨, 아이콘path]
  var ICON = {
    search: '<path d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.3-4.3"/>',
    edit:   '<path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',
    meet:   '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
    user:   '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"/>',
    chart:  '<path d="M18 20V10M12 20V4M6 20v-6"/>'
  };

  var menus = {
    founder: [
      { file:'brand-finder.html',    label:'브랜드찾기', icon:ICON.search },
      { file:'index.html',           label:'조건등록',   icon:ICON.edit },
      { file:'founder-meetings.html',label:'내 미팅',    icon:ICON.meet },
      { file:'industry-trends.html', label:'트렌드',     icon:ICON.chart }
    ],
    rep: [
      { file:'rep-meetings.html',    label:'제안·미팅',  icon:ICON.meet },
      { file:'brand-finder.html',    label:'브랜드',     icon:ICON.search },
      { file:'industry-trends.html', label:'트렌드',     icon:ICON.chart },
      { file:'rep-profile.html',     label:'내 프로필',  icon:ICON.user }
    ]
  };

  var items = menus[role] || menus.founder;

  // 스타일 주입
  var css = document.createElement('style');
  css.textContent = [
    '.moa-nav{position:fixed;bottom:0;left:0;right:0;z-index:100;display:flex;',
    'background:color-mix(in srgb,var(--bg,#f6f5f2) 92%,transparent);backdrop-filter:blur(12px);',
    'border-top:1px solid var(--border,#e4e0d6);padding:6px 0 max(6px,env(safe-area-inset-bottom));}',
    '.moa-nav a{flex:1;display:flex;flex-direction:column;align-items:center;gap:3px;',
    'text-decoration:none;color:var(--text-3,#8a8478);font-size:11px;font-weight:600;',
    'font-family:inherit;padding:6px 0;transition:color .16s;}',
    '.moa-nav a:hover{color:var(--text-2,#5a5548);}',
    '.moa-nav a[data-active]{color:var(--accent,#5266eb);}',
    '.moa-nav svg{width:22px;height:22px;}',
    'body{padding-bottom:72px!important;}'
  ].join('');
  document.head.appendChild(css);

  // 네비 HTML
  var nav = document.createElement('nav');
  nav.className = 'moa-nav';
  nav.innerHTML = items.map(function(it){
    var active = (here === it.file.toLowerCase()) ? ' data-active' : '';
    return '<a href="'+it.file+'"'+active+'>'
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+it.icon+'</svg>'
      + '<span>'+it.label+'</span></a>';
  }).join('');
  document.body.appendChild(nav);
})();
