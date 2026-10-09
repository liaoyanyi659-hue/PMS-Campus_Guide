/* Behaviour and system-copy repairs only. Existing CSS and layout remain unchanged. */
(() => {
  'use strict';
  const lang=()=>window.PMS_UI?.language||'en';
  const copy={
    en:{kind:'Lost / Found',status:'Status',all:'All',lost:'Lost',found:'Found',open:'Open',resolved:'Resolved',location:'Location',from:'From',until:'Until',filtered:'No posts match these filters.',clear:'Clear filters',loading:'Loading the latest guide…',current:'Guide data loaded.',fallback:'Latest guide unavailable. Showing the bundled guide; information may be outdated.',retry:'Try again',preview:'Preview',publishHint:'English and Malay titles and text are required before publishing. Interactive sections keep their original links and controls; plain-text edits are shown as additional information.',native:'This section includes links or interactive controls. Its existing structure is protected.',unknown:'Hours unconfirmed',storage:'Media storage',missing:'Map position unconfirmed',service:'The service could not be reached. Check your connection and try again.'},
    ms:{kind:'Barang hilang / dijumpai',status:'Status',all:'Semua',lost:'Hilang',found:'Dijumpai',open:'Belum selesai',resolved:'Selesai',location:'Lokasi',from:'Dari',until:'Hingga',filtered:'Tiada siaran sepadan dengan penapis ini.',clear:'Kosongkan penapis',loading:'Memuatkan panduan terkini…',current:'Data panduan telah dimuatkan.',fallback:'Panduan terkini tidak tersedia. Panduan tersimpan dipaparkan; maklumat mungkin lapuk.',retry:'Cuba lagi',preview:'Pratonton',publishHint:'Tajuk dan teks bahasa Inggeris serta Melayu diperlukan sebelum penerbitan. Bahagian interaktif mengekalkan pautan dan kawalan asal; suntingan teks dipaparkan sebagai maklumat tambahan.',native:'Bahagian ini mempunyai pautan atau kawalan interaktif. Struktur asalnya dilindungi.',unknown:'Waktu belum disahkan',storage:'Storan media',missing:'Lokasi peta belum disahkan',service:'Perkhidmatan tidak dapat dihubungi. Semak sambungan dan cuba lagi.'},
    zh:{kind:'Lost / Found',status:'Status',all:'All / Semua / 全部',lost:'Lost / Hilang / 遗失',found:'Found / Dijumpai / 捡到',open:'Open / Belum selesai / 未解决',resolved:'Resolved / Selesai / 已解决',location:'Location / Lokasi',from:'From / Dari',until:'Until / Hingga',filtered:'没有符合这些筛选条件的帖子。',clear:'清除筛选',loading:'正在载入最新指南…',current:'指南资料已载入。',fallback:'最新指南暂时无法读取，现显示内置版本，资料可能不是最新。',retry:'重试',preview:'预览',publishHint:'发布前必须填写英文和马来文标题及正文。交互区块保留原有链接和控件，纯文本修改显示为补充说明。',native:'此区块包含链接或交互控件，原有结构受到保护。',unknown:'时间待确认',storage:'媒体空间',missing:'地图位置待确认',service:'暂时无法连接服务，请检查网络后重试。'}
  };
  const t=k=>(copy[lang()]||copy.en)[k];
  function refresh(){
    const box=document.getElementById('lf-filters');
    if(box){
      for(const [id,key] of [['lf-kind','kind'],['lf-resolved','status'],['lf-location','location'],['lf-from','from'],['lf-to','until']]){
        const input=document.getElementById(id),label=input.closest('label');
        if(label.firstChild?.nodeType===3)label.firstChild.nodeValue=t(key);
      }
      const options={'lf-kind':{ '':'all',lost:'lost',found:'found'},'lf-resolved':{'':'all','0':'open','1':'resolved'}};
      for(const [id,values] of Object.entries(options))for(const o of document.getElementById(id).options)o.textContent=t(values[o.value]);
    }
    document.querySelectorAll('time[data-date]').forEach(e=>{const date=new Date(e.dataset.date.replace(' ','T')+'Z');if(!Number.isNaN(date.getTime())){e.dataset.noTranslate='';e.textContent=date.toLocaleString({en:'en-MY',ms:'ms-MY',zh:'zh-CN'}[lang()],{timeZone:'Asia/Kuala_Lumpur',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'});}});
    document.querySelectorAll('[data-repair-copy]').forEach(e=>e.textContent=t(e.dataset.repairCopy));
  }
  window.PMS_REPAIR={t,refresh};
  refresh();document.addEventListener('pms-language-change',refresh);
  let frame;
  const watch=new MutationObserver(()=>{if(!frame)frame=requestAnimationFrame(()=>{frame=null;watch.disconnect();refresh();watch.observe(document.body,{subtree:true,childList:true});});});
  watch.observe(document.body,{subtree:true,childList:true});
  const editor=document.getElementById('content-form');
  if(editor){
    const hint=document.createElement('p');hint.className='muted';hint.dataset.noTranslate='';hint.dataset.repairCopy='publishHint';editor.append(hint);
    const preview=document.createElement('button');preview.type='button';preview.className='secondary';preview.dataset.noTranslate='';preview.dataset.repairCopy='preview';editor.append(preview);
    const dialog=document.createElement('dialog');dialog.innerHTML='<form method="dialog"><button value="close" type="submit">×</button></form><div data-preview-body></div>';document.body.append(dialog);
    preview.onclick=()=>{const body=dialog.querySelector('[data-preview-body]');body.replaceChildren();for(const locale of ['en','ms','zh']){const section=document.createElement('section');section.dataset.noTranslate='';const h=document.createElement('h2'),p=document.createElement('p');h.textContent=({en:'English',ms:'Bahasa Melayu',zh:'中文'})[locale]+' · '+editor.elements['title_'+locale].value;p.textContent=editor.elements['body_'+locale].value;section.append(h,p);body.append(section);}dialog.showModal();};
    editor.addEventListener('submit',e=>{if(editor.elements.status.value!=='published')return;for(const field of ['title','body','note']){const values=['en','ms','zh'].map(l=>editor.elements[field+'_'+l].value);if(field!=='title'&&!values.some(v=>v.trim()))continue;if(values.slice(0,2).some(v=>!v.trim()||/[\u3400-\u9fff]/.test(v))){e.preventDefault();e.stopImmediatePropagation();window.PMS_ADMIN.say(t('publishHint'));return;}}},true);
  }
  document.addEventListener('pms-admin-dashboard',()=>{
    if(!window.PMS_ADMIN?.user())return;
    window.PMS_ADMIN.api('admin_health').then(r=>{let out=document.getElementById('release-health');if(!out){out=document.createElement('p');out.id='release-health';out.className='muted';out.dataset.noTranslate='';document.querySelector('#security')?.append(out);}const update=()=>out.textContent=t('storage')+': '+Math.round(r.storage.used_bytes/1024/1024)+' / '+Math.round(r.storage.limit_bytes/1024/1024)+' MB · '+(r.release.ready?'v'+r.release.version:({en:'Upgrade required',ms:'Naik taraf diperlukan',zh:'需要升级'})[lang()]+': '+r.release.missing.join(', '));update();document.addEventListener('pms-language-change',update,{once:true});}).catch(()=>{});
  });
  // CSP-safe replacements for the two former inline onclick attributes.
  document.addEventListener('click',e=>{const report=e.target.closest('[data-report-place]');if(report&&typeof openReport==='function')openReport(report.dataset.reportPlace);if(e.target.closest('[data-back-map]'))document.getElementById('mapviewport')?.scrollIntoView({behavior:'smooth',block:'center'});});
  // The guest admin page also shares the site's language preference.
  if(document.getElementById('login-panel')&&!document.querySelector('#login-panel select')){
    const select=document.createElement('select');select.setAttribute('aria-label','Language');select.dataset.noTranslate='';
    for(const [value,text] of [['en','English'],['ms','Bahasa Melayu'],['zh','中文']]){const o=document.createElement('option');o.value=value;o.textContent=text;select.append(o);}select.value=lang();select.onchange=()=>window.PMS_UI.setLanguage(select.value);document.querySelector('#login-panel > *')?.append(select);
  }
  refresh();
})();
