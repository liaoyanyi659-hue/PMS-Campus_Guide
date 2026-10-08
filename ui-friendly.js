(() => {
  'use strict';
  const t=s=>PMS_UI.translate(s);
  if(location.pathname.endsWith('admin.html')){
    const select=document.createElement('select');select.id='campus-language';select.setAttribute('aria-label','Language');
    select.innerHTML='<option value="en">English</option><option value="ms">Bahasa Melayu</option><option value="zh">中文</option>';select.value=PMS_UI.language;
    document.querySelector('.pms-navigation-actions')?.before(select);
  }
  for(const input of document.querySelectorAll('input[type=password]')){
    const wrap=document.createElement('div');wrap.className='ui-password-wrap';input.before(wrap);wrap.append(input);
    const button=document.createElement('button');button.type='button';button.className='ui-password-toggle';button.setAttribute('aria-pressed','false');button.textContent=t('Show password');wrap.append(button);
    button.onclick=()=>{const visible=input.type==='password';input.type=visible?'text':'password';button.setAttribute('aria-pressed',String(visible));button.textContent=t(visible?'Hide password':'Show password');};
  }
  const offline=document.createElement('div');offline.className='ui-offline';offline.role='status';offline.textContent=t('Offline: saved guide content may still be available. Online services need a connection.');document.querySelector('header')?.after(offline);
  const connection=()=>{offline.hidden=navigator.onLine;};window.addEventListener('online',connection);window.addEventListener('offline',connection);connection();
  // Dynamic content uses live announcements; content remains available without a connection.
  for(const id of ['notice','message','connection','correction-status']){const el=document.getElementById(id);if(el){el.setAttribute('role','status');el.setAttribute('aria-live','polite');}}
  document.addEventListener('pms-language-change',()=>{if(location.pathname.endsWith('admin.html'))document.getElementById('campus-language').value=PMS_UI.language;document.title=location.pathname.endsWith('admin.html')?t('PMS Explore · Administration'):location.pathname.endsWith('campus.html')?t('Info & Events · PMS Explore'):document.title;});
  PMS_UI.refresh();
})();
