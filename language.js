let currentLanguage = PMS_UI.language;
function tr(text, language = PMS_UI.language) { return PMS_UI.translate(text, language); }
function translatePage() { PMS_UI.refresh(); document.title=tr('PMS 校园探索 — 新生指南'); }
document.getElementById('language-select').value=currentLanguage;
document.getElementById('language-select').addEventListener('change',e=>{currentLanguage=e.target.value;PMS_UI.setLanguage(currentLanguage);translatePage();});
document.addEventListener('pms-language-change',e=>{currentLanguage=e.detail;translatePage();});
translatePage();
