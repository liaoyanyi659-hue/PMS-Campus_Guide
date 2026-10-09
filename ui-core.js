/* Shared UI translation and accessibility; authored content is never machine translated. */
(() => {
  'use strict';
  let language='en';
  const languageKey='pms-language';
  try { const saved=localStorage.getItem(languageKey)||localStorage.getItem('pms-admin-language');if(['en','ms','zh'].includes(saved))language=saved; } catch (_) {}
  const rows=window.PMS_UI_COPY||[], aliases=new Map();
  const normal=s=>String(s).replace(/\s+/g,' ').trim();
  for(const row of rows)for(const s of row)if(s&&!aliases.has(normal(s)))aliases.set(normal(s),row);
  const chinese=[...aliases.keys()].filter(s=>/[\u3400-\u9fff]/.test(s)).sort((a,b)=>b.length-a.length);
  const pattern=new RegExp(chinese.map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g');
  const index=l=>({en:0,ms:1,zh:2}[l]??0);
  function translate(value,lang=language){
    const original=String(value??''),s=normal(original),row=aliases.get(s);
    if(lang==='zh'&&/[\u3400-\u9fff]/.test(original))return original;
    if(row)return original.replace(original.trim(),row[index(lang)]||row[0]);
    if(lang==='zh')return s;
    return s.replace(pattern,key=>aliases.get(key)[index(lang)]||aliases.get(key)[0]);
  }
  const textCache=new WeakMap(),attributeCache=new WeakMap();
  const excluded='script,style,textarea,input,[data-no-translate],[data-user-content],#language-select,#forum-language,#campus-language,#pms-menu-language';
  let observer,frame=null;
  function refresh(){
    observer?.disconnect();
    document.documentElement.lang=language==='zh'?'zh-CN':language;
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
    while((node=walker.nextNode())){
      if(!node.parentElement||node.parentElement.closest(excluded))continue;
      const old=textCache.get(node),source=old&&old.applied===node.nodeValue?old.source:node.nodeValue;
      const applied=translate(source);if(applied!==node.nodeValue)node.nodeValue=applied;textCache.set(node,{source,applied});
    }
    document.querySelectorAll('[placeholder],[aria-label],[alt],[title]').forEach(el=>{
      if(el.closest('[data-no-translate],[data-user-content]'))return;
      const cache=attributeCache.get(el)||{};
      for(const name of ['placeholder','aria-label','alt','title'])if(el.hasAttribute(name)){
        const value=el.getAttribute(name),old=cache[name],source=old&&old.applied===value?old.source:value,applied=translate(source);
        if(applied!==value)el.setAttribute(name,applied);cache[name]={source,applied};
      }attributeCache.set(el,cache);
    });
    observer?.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','alt','title']});
  }
  function setLanguage(value){
    if(!['en','ms','zh'].includes(value))return;language=value;try{localStorage.setItem(languageKey,value);localStorage.setItem('pms-admin-language',value);}catch(_){}
    refresh();document.dispatchEvent(new CustomEvent('pms-language-change',{detail:value}));
  }
  window.PMS_UI={translate,refresh,setLanguage,get language(){return language;}};
  // Same API only: preserve browser Request semantics and do not alter third-party requests.
  const sourceFetch=window.fetch;
  if(sourceFetch)window.fetch=function(input,init){
    let url;try{url=new URL(typeof input==='string'||input instanceof URL?input:input.url,location.href);}catch(_){return sourceFetch.call(this,input,init);}
    const api=window.PMS_FORUM_CONFIG?.api;
    if(api&&url.origin===new URL(api).origin&&url.pathname===new URL(api).pathname){
      const headers=new Headers(init?.headers||(input instanceof Request?input.headers:undefined));headers.set('Accept-Language',language);
      return sourceFetch.call(this,input,{...init,headers});
    }return sourceFetch.call(this,input,init);
  };
  function ready(){
    observer=new MutationObserver(()=>{if(frame===null)frame=requestAnimationFrame(()=>{frame=null;refresh();});});
    document.querySelectorAll('option').forEach(o=>{if(!o.hasAttribute('value'))o.value=o.textContent;});
    document.addEventListener('change',e=>{if(e.target.matches('#language-select,#forum-language,#campus-language,#pms-menu-language'))setLanguage(e.target.value);});
    window.addEventListener('storage',e=>{if(e.key===languageKey)setLanguage(e.newValue);});
    refresh();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});else ready();
})();
