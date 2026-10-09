/* Shell enhancement over the existing protected CMS API. No new permissions or endpoints. */
(() => {
 'use strict';
 const $=s=>document.querySelector(s), UI=window.PMS_UI, A=window.PMS_ADMIN;
 if(!A||!$('#workspace'))return;
 const lang=()=>UI?.language||'en', t=s=>UI?.translate(s)||s;
 const labels={dashboard:['Overview','Ringkasan','总览'],users:['Accounts','Akaun','账号管理'],clubs:['Club approvals','Kelulusan kelab','Kelab 审批'],places:['Places & hours','Lokasi & waktu','地点与时间'],pages:['Page content','Kandungan halaman','页面内容'],media:['Photo library','Pustaka foto','照片管理'],forum:['Forum moderation','Moderasi forum','论坛管理'],audit:['Activity log','Log aktiviti','操作记录'],feedback:['Corrections','Pembetulan','资料反馈'],analytics:['Usage counts','Jumlah penggunaan','使用统计'],security:['Security','Keselamatan','安全设置'],updates:['Updates & notifications','Makluman & notifikasi','资讯与通知']};
 const paths={dashboard:'M3 10 12 3l9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z',users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 4a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',clubs:'m9 12 2 2 4-4M12 3l8 4v6c0 4-8 8-8 8s-8-4-8-8V7Z',places:'M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',pages:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8M8 17h6',media:'M3 3h18v18H3Zm0 14 5-5 4 4 3-3 6 6M9 7h.01',forum:'M21 11a8 8 0 0 1-8 8H7l-5 3V5a2 2 0 0 1 2-2h9a8 8 0 0 1 8 8M7 8h9M7 12h6',audit:'M3 12a9 9 0 1 0 3-7M3 3v5h5M12 7v5l3 2',feedback:'M12 3 2 21h20Zm0 6v5M12 17h.01',analytics:'M4 20V10M10 20V4M16 20v-7M22 20H2',security:'M12 3 3 7v6c0 5 9 9 9 9s9-4 9-9V7Zm-3 9 2 2 4-4'};
 let epoch=0,returnFocus=null,lastData=null,lastFeed=null;
 const mobile=window.matchMedia('(max-width:850px)');
 const backdrop=document.createElement('button');backdrop.type='button';backdrop.className='sidebar-backdrop';backdrop.tabIndex=-1;backdrop.setAttribute('aria-label',t('Close menu'));document.body.append(backdrop);
 function label(id){return (labels[id]||[id,id,id])[({en:0,ms:1,zh:2})[lang()]];}
 function decorate(){
  const query=$('#menu-search').value.trim().toLocaleLowerCase();let found=0;
  $('#admin-sidebar').querySelectorAll('#tabs [data-tab],.sidebar-updates').forEach(b=>{
   const id=b.dataset.tab||'updates', text=label(id);b.dataset.label=text;b.setAttribute('data-no-translate','');if(b.tagName==='BUTTON')b.type='button';b.setAttribute('aria-current',b.classList.contains('active')?'page':'false');b.replaceChildren();
   const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('class','menu-icon');svg.setAttribute('aria-hidden','true');const p=document.createElementNS(svg.namespaceURI,'path');p.setAttribute('d',paths[id]||paths.pages);svg.append(p);b.append(svg);
   const span=document.createElement('span'),index=query?text.toLocaleLowerCase().indexOf(query):-1;
   if(index>=0){span.append(document.createTextNode(text.slice(0,index)));const m=document.createElement('mark');m.textContent=text.slice(index,index+query.length);span.append(m,document.createTextNode(text.slice(index+query.length)));}else span.textContent=text;
   b.append(span);b.hidden=!!query&&index<0;if(!b.hidden)found++;
  });
  const msg=$('#menu-results');msg.classList.toggle('sr-only',found>0);msg.textContent=found?'':t('No matching menu items.');
  const active=$('#tabs .active');if(active)$('#section-title').textContent=label(active.dataset.tab);
 }
 function closeMenu(){document.body.classList.remove('sidebar-is-open');$('#sidebar-open').setAttribute('aria-expanded','false');$('#admin-sidebar').inert=mobile.matches;returnFocus?.focus();returnFocus=null;}
 function openMenu(){returnFocus=document.activeElement;$('#admin-sidebar').inert=false;document.body.classList.add('sidebar-is-open');$('#sidebar-open').setAttribute('aria-expanded','true');$('#sidebar-close').focus();}
 function selectTab(id){const b=$(`#tabs [data-tab="${id}"]`);if(!b)return;$('#menu-search').value='';decorate();b.click();}
 $('#menu-search').addEventListener('input',decorate);
 $('#sidebar-open').addEventListener('click',openMenu);$('#sidebar-close').addEventListener('click',closeMenu);backdrop.addEventListener('click',closeMenu);
 $('#tabs').addEventListener('click',e=>{if(!e.target.closest('[data-tab]'))return;queueMicrotask(decorate);if(mobile.matches)closeMenu();});
 document.addEventListener('keydown',e=>{
  const editable=e.target.closest?.('input,textarea,select,[contenteditable=true]');
  if(e.key==='/'&&!editable&&!$('dialog[open]')&&!$('#workspace').hidden){e.preventDefault();if(mobile.matches)openMenu();$('#menu-search').focus();}
  if(e.key==='Escape'&&document.body.classList.contains('sidebar-is-open')){e.preventDefault();closeMenu();}
  if(e.key==='Tab'&&document.body.classList.contains('sidebar-is-open')){
   const nodes=[...$('#admin-sidebar').querySelectorAll('a[href],button:not([disabled]),input')].filter(x=>!x.hidden&&!x.closest('[hidden]'));
   const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
  }
 });
 const resize=()=>{closeMenu();$('#admin-sidebar').inert=mobile.matches;};mobile.addEventListener?.('change',resize);
 $('#admin-language').value=lang();$('#admin-language').addEventListener('change',e=>UI.setLanguage(e.target.value));
 document.addEventListener('pms-language-change',()=>{decorate();$('#admin-language').value=lang();backdrop.setAttribute('aria-label',t('Close menu'));if(lastData)updateSnapshot(lastData);if(lastFeed)renderFeed(lastFeed);});
 const routes={users:'users',active_users:'users',posts:'forum',reports:'forum',pending_clubs:'clubs',published_content:'places',photos:'media',subscribers:'updates'};
 $('#dashboard').addEventListener('click',e=>{const b=e.target.closest('[data-dashboard-tab],[data-stat]');if(!b)return;const route=b.dataset.dashboardTab||routes[b.dataset.stat];if(route==='updates')location.assign('campus.html');else if(route)selectTab(route);});
 function session(u){epoch++;document.body.classList.toggle('admin-is-ready',u?.role==='admin');if(!u){closeMenu();lastData=null;lastFeed=null;window.PMS_ADMIN_DASHBOARD=null;$('#stats').replaceChildren();for(const id of ['snapshot-users','snapshot-posts','activity-percent'])$('#'+id).textContent='—';for(const id of ['recent-activity','recent-posts','activity-caption'])$('#'+id).replaceChildren();$('#activity-ring-value').setAttribute('stroke-dasharray','0 377');$('#admin-name').textContent='';}else{$('#admin-avatar').textContent=[...(u.nickname||'P')][0].toUpperCase();}resize();}
 document.addEventListener('pms-admin-session',e=>session(e.detail));
 const number=n=>typeof n==='number'&&Number.isFinite(n)&&n>=0?n:null;
 const format=n=>n===null?'—':n.toLocaleString(({en:'en-MY',ms:'ms-MY',zh:'zh-CN'})[lang()]);
 function updateSnapshot(r){
  const s=r.stats||{},total=number(s.users),active=number(s.active_users),posts=number(s.posts);
  $('#snapshot-users').textContent=format(total);$('#snapshot-posts').textContent=format(posts);
  const valid=total!==null&&active!==null&&active<=total, pct=valid&&total>0?Math.round(active/total*100):null;
  $('#activity-percent').textContent=pct===null?'—':pct+'%';$('#activity-ring-value').setAttribute('stroke-dasharray',pct===null?'0 377':`${pct/100*377} 377`);
  $('#activity-caption').textContent=valid&&total>0?`${format(active)} / ${format(total)} · ${t('Active accounts / total accounts')}`:t(total===0?'No account data yet.':'Data unavailable');
  $('#activity-ring-label').textContent=t('Active');
 }
 function timestamp(v){if(!v)return '';const raw=String(v),dt=new Date(raw.includes('T')?raw:raw.replace(' ','T')+'Z');if(Number.isNaN(dt.getTime()))return raw;return new Intl.DateTimeFormat(({en:'en-MY',ms:'ms-MY',zh:'zh-CN'})[lang()],{dateStyle:'medium',timeStyle:'short',timeZone:'Asia/Kuala_Lumpur'}).format(dt)+' · MYT';}
 function message(container,value){container.replaceChildren();const p=document.createElement('p');p.className='muted';p.textContent=t(value);container.append(p);}
 function item(container,title,meta,href){const row=document.createElement('div');row.className='dashboard-item';row.setAttribute('data-user-content','');const emblem=document.createElement('span');emblem.className='item-emblem';emblem.setAttribute('aria-hidden','true');emblem.textContent=href?'↗':'↺';const body=document.createElement('div'),name=document.createElement(href?'a':'strong');name.textContent=title;if(href)name.href=href;const sub=document.createElement('p');sub.textContent=meta;body.append(name,sub);row.append(emblem,body);container.append(row);}
 async function overview(r){
  lastData=r;updateSnapshot(r);const n=++epoch;
  const log=$('#recent-activity'),posts=$('#recent-posts');message(log,'Loading…');message(posts,'Loading…');
  const result=await Promise.allSettled([A.api('admin_audit',undefined,{page:1}),A.api('admin_forum',undefined,{page:1})]);
  if(n!==epoch||A.user()?.role!=='admin')return;
  lastFeed=result;renderFeed(result);
 }
 function renderFeed(result){result.forEach((res,i)=>{const container=$('#'+(i?'recent-posts':'recent-activity'));if(res.status==='rejected'){message(container,'Could not load this panel. Use Refresh to retry.');return;}const rows=i?res.value.posts:res.value.logs;if(!Array.isArray(rows)){message(container,'Could not load this panel. Use Refresh to retry.');return;}container.replaceChildren();if(!rows.length){message(container,i?'No recent posts yet.':'No recent activity yet.');return;}rows.slice(0,4).forEach(row=>i?item(container,row.title,`${row.nickname||''} · ${timestamp(row.created_at)}`,row.status==='published'?`community.html?post=${Number(row.id)}`:null):item(container,String(row.action||'').replace(/_/g,' '),`${row.target||''} · ${timestamp(row.created_at)}`));});}
 document.addEventListener('pms-admin-dashboard-error',()=>{lastData=null;lastFeed=null;epoch++;for(const id of ['recent-activity','recent-posts'])message($('#'+id),'Could not load this panel. Use Refresh to retry.');});
 document.addEventListener('pms-admin-dashboard',e=>overview(e.detail));
 decorate();session(A.user());if(window.PMS_ADMIN_DASHBOARD&&A.user()?.role==='admin')overview(window.PMS_ADMIN_DASHBOARD);
})();
