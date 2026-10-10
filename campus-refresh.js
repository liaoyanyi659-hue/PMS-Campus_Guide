/* Presentation only. Existing accounts, API data and map coordinates remain intact. */
(() => {
  'use strict';
  const copy = {
    en: {map:'Find your way around PMS',mapIntro:'Look up a building, check service hours, or find where to collect your parcel.',guide:'Start at PMS',guideIntro:'Registration, hostel life, student systems and the essentials for your first week.',life:'Everyday campus life',lifeIntro:'Food, laundry, sports and getting around. Start with the service you need.',about:'A closer look at PMS',aboutIntro:'Explore the campus, its departments and places through student photographs.',forum:'Campus conversations',forumIntro:'Ask a question, share a photograph, or catch up with other students.',lost:'Lost & Found',lostIntro:'Lost something or found an item? Check the board or post the location and date.',report:'Report an item',feed:'Latest posts',lostFeed:'Reported items',updates:'Campus updates',updatesIntro:'Current information and events shared by the campus community.',details:'Weekly hours & details'},
    ms: {map:'Cari jalan di PMS',mapIntro:'Cari bangunan, semak waktu perkhidmatan atau ketahui lokasi pengambilan bungkusan.',guide:'Bermula di PMS',guideIntro:'Pendaftaran, asrama, sistem pelajar dan keperluan untuk minggu pertama anda.',life:'Kehidupan harian kampus',lifeIntro:'Makanan, dobi, sukan dan perjalanan. Mulakan dengan perkhidmatan yang anda perlukan.',about:'Kenali PMS dengan lebih dekat',aboutIntro:'Lihat kampus, jabatan dan tempatnya melalui gambar yang dikongsi pelajar.',forum:'Perbualan kampus',forumIntro:'Tanya soalan, kongsi gambar atau ikuti cerita pelajar lain.',lost:'Barang hilang & dijumpai',lostIntro:'Barang hilang atau dijumpai? Semak siaran atau laporkan lokasi dan tarikhnya.',report:'Laporkan barang',feed:'Siaran terkini',lostFeed:'Laporan barang',updates:'Info kampus',updatesIntro:'Maklumat semasa dan acara yang dikongsi oleh komuniti kampus.',details:'Waktu mingguan & butiran'},
    zh: {map:'在 PMS，找到你要去的地方',mapIntro:'找教学楼、查服务时间，或看看包裹应该去哪里领取。',guide:'从这里开始你的 PMS 生活',guideIntro:'报到、宿舍、学生系统，以及第一周需要知道的实用资料。',life:'校园里的日常',lifeIntro:'吃饭、洗衣、运动和出行。从你现在需要的服务开始。',about:'走近 PMS',aboutIntro:'透过同学的照片，看看校园、各系与周边地点。',forum:'校园交流',forumIntro:'问个问题，分享一张照片，看看同学最近在聊什么。',lost:'失物招领',lostIntro:'遗失或捡到物品？先看看已有帖子，发布时注明地点和日期。',report:'发布失物招领',feed:'最新分享',lostFeed:'物品报告',updates:'校园资讯',updatesIntro:'查看校园社区发布的有效资讯与活动。',details:'每周时间表与详细资料'}
  };
  const lang = () => window.PMS_UI?.language || 'en';
  function set(el, key) { if (!el) return; el.dataset.noTranslate=''; el.textContent=(copy[lang()]||copy.en)[key]; }
  function compactServices() {
    document.querySelectorAll('#daily-services .article,#laundry-services .article,#pool-guide').forEach(article => {
      if (article.querySelector(':scope>.service-details')) return;
      const paragraphs=Array.from(article.children).filter(el=>el.tagName==='P'&&!el.classList.contains('detail-source'));
      const keep=new Set(paragraphs.slice(0,2));
      const extras=Array.from(article.children).filter(el=> !keep.has(el)&&!el.matches('.tag,h2,.location-photo,.today-panel,.source-badge'));
      if (!extras.length) return;
      const details=document.createElement('details'); details.className='reading-details service-details';
      const summary=document.createElement('summary'); summary.dataset.refreshCopy='details'; set(summary,'details'); details.append(summary,...extras); article.append(details);
    });
  }
  function refresh() {
    const brand=document.querySelector('body>header .brand b,body>header .brand-name');
    if (brand) { brand.dataset.noTranslate=''; brand.textContent='PMS Explore'; }
    for (const [id,key] of [['explore','map'],['guide','guide'],['life','life'],['about','about']]) {
      const intro=document.querySelector('#'+id+'>.intro');
      if (intro) {set(intro.querySelector('h1'),key);set(intro.querySelector('p'),key+'Intro');}
    }
    document.querySelectorAll('select option[value=zh]').forEach(el=>{el.dataset.noTranslate='';el.textContent='中文';});
    if (document.getElementById('feed')) {
      const lost=document.querySelector('[data-action=category][data-category=lost_found]')?.getAttribute('aria-pressed')==='true';
      set(document.querySelector('.hero h1'),lost?'lost':'forum');set(document.querySelector('.hero p'),lost?'lostIntro':'forumIntro');set(document.querySelector('.feed-heading h2'),lost?'lostFeed':'feed');
      const button=document.querySelector('.hero [data-action=compose]');
      if(button) {button.dataset.noTranslate='';button.textContent=lost?copy[lang()].report:({en:'Share a post',ms:'Kongsi siaran',zh:'发布帖子'})[lang()];}
    }
    if (document.getElementById('updates')) {set(document.querySelector('.hero h1'),'updates');set(document.querySelector('.hero>p:not(.eyebrow):not(.small)'),'updatesIntro');}
    compactServices();
    document.querySelectorAll('[data-refresh-copy]').forEach(el=>set(el,el.dataset.refreshCopy));
  }
  refresh();
  document.addEventListener('DOMContentLoaded',refresh,{once:true});
  document.addEventListener('pms-language-change',refresh);
  document.addEventListener('pms-cms-updated',refresh);
  document.addEventListener('click',e=>{if(e.target.closest('[data-action=category],[data-action=clear-filters]'))requestAnimationFrame(refresh);});
})();
