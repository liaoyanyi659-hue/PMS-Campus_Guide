window.PMS_FORUM_I18N={t:s=>PMS_UI.translate(s),locale:()=>({zh:'zh-MY',en:'en-MY',ms:'ms-MY'}[PMS_UI.language])};
document.getElementById('forum-language').value=PMS_UI.language;
document.addEventListener('pms-language-change',()=>{document.title=PMS_UI.translate('校园社区 · PMS 校园探索');});
document.title=PMS_UI.translate('校园社区 · PMS 校园探索');
