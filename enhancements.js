/* Text directories transcribed from student-supplied signs on 10 October 2026. */
(() => {
  'use strict';
  const label = (en, ms, zh) => ({ en, ms, zh });
  const room = (en, ms, zh, direction = '') => ({ name: label(en, ms, zh), direction });
  const records = {
    '资讯与通讯科技系': {
      title: label('JTMK building · floor directory', 'Bangunan JTMK · panduan tingkat', 'JTMK 大楼 · 楼层目录'),
      aliases: 'JTMK JMSK MKT MSKD MKR hypermedia komputer computer rangkaian network structured cabling kabel terstruktur application development pembangunan aplikasi CAD dewan kuliah utama DKU bilik suis presentation pembentangan 数学 科学 电脑 实验室 主讲堂',
      floors: [
        ['G', [
          room('Information & Communication Technology Department (JTMK)', 'Jabatan Teknologi Maklumat & Komunikasi (JTMK)', '资讯与通讯科技系（JTMK）', 'right'),
          room('Computer System & Digital Laboratories 1–2', 'Makmal Sistem Komputer & Digital 1–2', '电脑系统与数字实验室 1–2（MSKD1／MSKD2）', 'left'),
          room('Network Switch Room', 'Bilik Suis Rangkaian', '网络交换机房', 'right'),
        ]],
        ['1', [
          room('Information Technology Laboratory 1', 'Makmal Teknologi Maklumat 1', '资讯科技实验室 1（MKT1）', 'right'),
          room('Information Technology Laboratory 2', 'Makmal Teknologi Maklumat 2', '资讯科技实验室 2（MKT2）', 'right'),
          room('Main Lecture Theatre', 'Dewan Kuliah Utama', '主讲堂（Dewan Kuliah Utama）', 'right'),
          room('Structured Cabling Laboratories 1–2', 'Makmal Kabel Terstruktur 1–2', '结构化布线实验室 1–2', 'left'),
          room('Communication & Network Laboratory 1', 'Makmal Komunikasi & Rangkaian 1', '通讯与网络实验室 1', 'left'),
          room('Communication & Network Laboratories 1–2', 'Makmal Komunikasi & Rangkaian 1–2', '通讯与网络实验室 1–2', 'right'),
        ]],
        ['2', [
          room('Mathematics, Science & Computer Department (JMSK)', 'Jabatan Matematik, Sains & Komputer (JMSK)', '数学、科学与电脑系（JMSK）', 'left'),
          room('Computer Laboratories 1–2', 'Makmal Komputer 1–2', '电脑实验室 1–2', 'left'),
          room('Application Development Laboratory 2', 'Makmal Pembangunan Aplikasi 2', '应用开发实验室 2', 'right'),
        ]],
        ['3', [
          room('Hypermedia Laboratory', 'Makmal Hypermedia', '超媒体实验室', 'left'),
          room('Presentation Room 1', 'Bilik Pembentangan 1', '演示室 1', 'left'),
          room('Hypermedia Laboratory 3', 'Makmal Hypermedia 3', '超媒体实验室 3', 'right'),
          room('Information Technology Laboratory 2', 'Makmal Teknologi Maklumat 2', '资讯科技实验室 2（MKT2）', 'right'),
          room('Computer Aided Design & Drafting Laboratory 1', 'Makmal Rekabentuk & Tulisan Berbantu Komputer 1', '电脑辅助设计与绘图实验室 1', 'right'),
          room('Application Development Laboratories 3–4', 'Makmal Pembangunan Aplikasi 3–4', '应用开发实验室 3–4', 'right'),
          room('Communication & Network Laboratory 3', 'Makmal Komunikasi & Rangkaian 3', '通讯与网络实验室 3', 'right'),
        ]],
      ],
      note: label('The signs list Information Technology Laboratory 2 on both floors 1 and 3. Check the room-door label for your class.', 'Papan tanda menyenaraikan Makmal Teknologi Maklumat 2 pada tingkat 1 dan 3. Semak label pintu bilik untuk kelas anda.', '指示牌将资讯科技实验室 2 同时列于 1 楼与 3 楼，上课前请核对课室门牌。'),
    },
    // Retain the existing map key so saved links and CMS records still match.
    'JP / JPA / JMSK 教学区域': {
      title: label('JP / JPA / Examination Unit building', 'Bangunan JP / JPA / Unit Peperiksaan', 'JP／JPA／考试单位大楼'),
      aliases: 'JP JPA unit peperiksaan examination exam UPLI latihan industri internship BK18 BK19 BK25 BK26 BK27 BK37 BK38 bilik kuliah lecture room seminar presentation drawing lukisan 考试 课室 实习',
      floors: [
        ['G', [
          room('General Studies Department (JPA)', 'Jabatan Pengajian Am (JPA)', '通识教育系（JPA）'),
          room('Industry Liaison & Training Unit (UPLI)', 'Unit Perhubungan & Latihan Industri (UPLI)', '工业联系与实习单位（UPLI）', 'left'),
        ]],
        ['1', [
          room('Commerce Department (JP)', 'Jabatan Perdagangan (JP)', '商业系（JP）'),
          room('Lecture Rooms 18–19 (BK 18–19)', 'Bilik Kuliah 18–19 (BK 18–19)', '课室 18–19（BK 18–19）', 'right'),
          room('Seminar & Presentation Room', 'Bilik Seminar & Pembentangan', '研讨与演示室', 'left'),
          room('Drawing Room', 'Bilik Lukisan', '绘图室', 'left'),
        ]],
        ['2', [
          room('Examination Unit', 'Unit Peperiksaan', '考试单位（Unit Peperiksaan）'),
          room('Lecture Rooms 25–27 (BK 25–27)', 'Bilik Kuliah 25–27 (BK 25–27)', '课室 25–27（BK 25–27）', 'left'),
          room('Lecture Rooms 37–38 (BK 37–38)', 'Bilik Kuliah 37–38 (BK 37–38)', '课室 37–38（BK 37–38）', 'right'),
        ]],
      ],
    },
  };
  const copy = {
    en: { floor: 'Floor', ground: 'Ground floor', left: 'Left', right: 'Right', orientation: 'Left and right follow the photographed signs when facing them at that location.', source: 'Building signs · updated 10 October 2026' },
    ms: { floor: 'Tingkat', ground: 'Aras bawah', left: 'Kiri', right: 'Kanan', orientation: 'Kiri dan kanan mengikut papan tanda yang difoto apabila anda menghadapnya di lokasi tersebut.', source: 'Papan tanda bangunan · dikemas kini 10 Oktober 2026' },
    zh: { floor: '楼层', ground: '底层', left: '左侧', right: '右侧', orientation: '左右方向按照片中的指示牌整理，指在拍摄位置面对指示牌时的方向。', source: '建筑现场指示牌 · 更新于 2026年10月10日' },
  };
  const current = () => window.PMS_UI?.language || 'en';
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  function markup(key, language = current()) {
    const building = records[key];
    if (!building) return '';
    const l = copy[language] ? language : 'en', c = copy[l];
    return `<div class="wayfinding" data-building-directory="${esc(key)}" data-no-translate><h3>${esc(building.title[l])}</h3>${building.floors.map(([level, rooms]) => `<h4>${level === 'G' ? `G · ${c.ground}` : `${c.floor} ${level}`}</h4><ul>${rooms.map(r => `<li>${esc(r.name[l])}${r.direction ? ` (${esc(c[r.direction])})` : ''}</li>`).join('')}</ul>`).join('')}<p>${esc(c.orientation)}</p>${building.note ? `<p>${esc(building.note[l])}</p>` : ''}<p class="detail-source">${esc(c.source)}</p></div>`;
  }
  function searchText(key, language = current()) {
    const b = records[key], l = copy[language] ? language : 'en';
    return b ? [b.title[l], ...b.floors.flatMap(([level, rooms]) => rooms.map(r => `${copy[l].floor} ${level} ${r.name[l]}`))].join(' ') : '';
  }
  window.PMS_BUILDINGS = { records, markup, searchText, updated: '2026-10-10' };
  document.addEventListener('pms-language-change', () => {
    document.querySelectorAll('[data-building-directory]').forEach(el => {
      el.outerHTML = markup(el.dataset.buildingDirectory);
    });
  });
})();

const guideUpdated = "2026-10-02";
const locationHints = {
  图书馆:
    "Mini Library 位于 Aras 1（1 楼）的 Bilik Studio UIDM；请从楼内前往。",
  "Café Siber": "学生事务处（HEP）楼下。可购买文具、复印文件。",
  "Cafe Koi": "校园中心环形教学区域南侧、UIDM 旁。店面照片可帮助辨认入口。",
  "Coop Mart": "宿舍附近，从标有 Love Kamsis 的入口直走。",
  包裹中心: "位于 Bizz Mall；领取柜台与楼层请以现场指示为准。",
  宿舍洗衣服务: "洗衣设施就在宿舍内，具体机器请到所在宿舍查看。",
  "Bizz Mall 旁洗衣服务": "Bizz Mall 旁边、女生宿舍后方。",
  游泳池: "JPH 旁，地图标示泳池区域；具体入口以现场为准。",
};
const searchAliases = {
  图书馆: "library perpustakaan books buku 读书 自习",
  "Coop Mart": "便利店 购物 生活用品 coop mall",
  "Café Siber":
    "cyber cafe siber printing print cetak cetakan fotokopi alat tulis 打印 photostat 复印 文具",
  "Cafe Koi": "咖啡 cafe koi 打印 photostat",
  包裹中心: "快递 parcel bungkusan bizzmall delivery collect 领取",
  食堂: "吃饭 cafe cafeteria kafeteria food makan 餐饮",
  宿舍洗衣服务: "dobi laundry washing drying basuh kering 洗衣 烘衣",
  "Bizz Mall 旁洗衣服务": "dobi laundry washing drying basuh kering 洗衣 烘衣",
  游泳池: "swim swimming kolam renang 泳池",
  体育综合设施: "sukan sport 羽毛球 篮球 排球 乒乓球 射箭",
  田径场: "跑步 跑道 track",
  学生事务处: "hep 学生事务",
  资讯与通讯科技系: "jtmk it 信息 电脑",
  机械工程系: "jkm mechanical",
  学生宿舍区:
    "kamsis hostel 住宿 男生 女生 lelaki perempuan block 1 2 3 4 5 a b c d e",
};
for (const [key, building] of Object.entries(window.PMS_BUILDINGS.records)) {
  searchAliases[key] = [searchAliases[key] || '', building.aliases,
    ...['en', 'ms', 'zh'].map(l => window.PMS_BUILDINGS.searchText(key, l))].join(' ');
}
function matchesPlace(p, query) {
  const key = (p.join(" ") + " " + (searchAliases[p[0]] || ""))
    .normalize("NFKC")
    .toLowerCase();
  return query
    .normalize("NFKC")
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .every((t) => key.includes(t));
}
function klClock(now = new Date()) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kuala_Lumpur",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  );
  return {
    day: new Date(
      `${parts.year}-${parts.month}-${parts.day}T12:00:00Z`,
    ).getUTCDay(),
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
    date: `${parts.year}-${parts.month}-${parts.day}`,
  };
}
function todaySchedule(name, now = new Date()) {
  const c = klClock(now),
    d = c.day;
  let slots = [],
    note = "按所提供的常规时间推算；假期及临时调整请现场确认。",
    known = true;
  const add = (a, b, label = "") => slots.push({ a, b, label });
  if (name === "Coop Mart") {
    if (d === 5) {
      add("08:30", "12:20");
      add("14:40", "16:30");
      add("17:00", "19:00");
      add("20:30", "22:40");
    } else if (d === 6) {
      add("10:00", "16:30");
      add("20:30", "22:40");
    } else {
      add("08:30", "16:30");
      if (d !== 0) add("17:00", "19:00");
      add("20:30", "22:40");
    }
  } else if (name === "Cafe Koi") {
    if (d >= 1 && d <= 5) add("07:00", "16:30");
  } else if (name === "包裹中心") {
    if (d === 5) {
      add("09:30", "12:20");
      add("14:40", "18:00");
    } else if (d !== 6) add("09:30", "18:00");
  } else if (name === "图书馆") {
    if (d >= 1 && d <= 4) {
      add("09:00", "12:30");
      add("14:30", "16:30");
    } else if (d === 5) {
      add("09:00", "12:15");
      add("14:45", "16:30");
    }
  } else if (name === "学术区食堂") {
    if (d >= 1 && d <= 5) add("08:00", "17:00");
  } else if (name === "食堂") {
    if (d >= 1 && d <= 5) add("08:00", "21:30");
    else {
      known = false;
      note = "周末及假期大部分店铺可能不营业，请向店家确认。";
    }
  } else if (name === "Café Siber") {
    if (d >= 1 && d <= 4) add("08:30", "16:30");
    else if (d === 5) add("12:40", "16:30");
  } else if (["体育综合设施", "田径场"].includes(name)) {
    add("08:00", "19:00");
    note = "按常规时间推算；天气及场地安排以工作人员通知为准。";
  } else if (name === "游泳池") {
    if (d >= 1 && d <= 4) {
      add("09:00", "13:00", "JPH 教学");
      add("14:00", "17:00", "JPH 教学");
      add(
        "17:00",
        "19:00",
        { 1: "女性教职员", 2: "男性教职员", 3: "男学生", 4: "女学生" }[d],
      );
    } else if (d === 6) add("09:00", "18:00", "PMS 男性教职员及男学生");
    else if (d === 0) add("09:00", "18:00", "PMS 女性教职员及女学生");
    note =
      d === 5
        ? "周五维护与清洁，时间表列为关闭。"
        : "按分组告示展示，不代表所有人都可入场。手写告示另列 13:00–14:00 休息；周末如有课程将关闭，请向柜台确认。";
  } else known = false;
  const minutes = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
  const active = slots.find(
    (s) => c.minutes >= minutes(s.a) && c.minutes < minutes(s.b),
  );
  const poolRest =
    name === "游泳池" &&
    [0, 6].includes(d) &&
    c.minutes >= 780 &&
    c.minutes < 840;
  return {
    state: !known
      ? "unknown"
      : poolRest
        ? "closed"
        : active
          ? "open"
          : "closed",
    clock: c,
    slots,
    note: known
      ? note
      : note.startsWith("周末")
        ? note
        : "今天的开放安排未确认，请查看原营业页面或现场告示。",
    status: !known
      ? "时间待确认"
      : poolRest
        ? "按时间表 · 非营业"
        : active
          ? `按时间表 · ${active.label || "开放时段"}`
          : slots.length
            ? "按时间表 · 非营业"
            : "按时间表 · 非营业",
  };
}
function todayMarkup(name) {
  const t = todaySchedule(name);
  return `<div class="today-panel" data-today="${name}"><h3>今天 · ${["周日", "周一", "周二", "周三", "周四", "周五", "周六"][t.clock.day]}</h3><strong>${t.status}</strong><p>${t.slots.map((s) => `${s.a}–${s.b}${s.label ? " · " + s.label : ""}`).join("<br>") || "暂无开放时段"}</p><small>${t.note}</small><small>马来西亚时间 · ${t.clock.date}</small></div>`;
}
function placeExtras(p) {
  return `${["Bizz Mall", "食堂"].includes(p[0]) || (p[1] === "教学区域" && p[0] !== "图书馆") ? "" : todayMarkup(p[0])}${p[0] === "学生宿舍区" ? '<div class="detail">' + kamsisOfficeMarkup() + feloMarkup() + "</div>" : ""}${window.PMS_BUILDINGS.markup(p[0]) || `<div class="wayfinding"><h3>入口与楼层</h3><p>${locationHints[p[0]] || "地图标示设施所在区域；具体入口与楼层待补充，请参照现场指示。"}</p></div>`}`;
}
function kamsisOfficeMarkup() {
  const managed=window.PMS_KAMSIS_RECORD;
  if(managed){
    const l=window.PMS_UI?.language||'en';
    const escape=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const text=v=>escape(v?.[l]||v?.en||'');
    const days={en:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],ms:['Ahad','Isnin','Selasa','Rabu','Khamis','Jumaat','Sabtu'],zh:['周日','周一','周二','周三','周四','周五','周六']}[l];
    const closed={en:'Closed',ms:'Tutup',zh:'休息'}[l];
    return `<section class="kamsis-office" data-no-translate><h3>${text(managed.title)}</h3><p>${text(managed.body)}</p>${managed.schedule?'<ul>'+managed.schedule.map((s,i)=>`<li>${days[i]}: ${s.map(v=>escape(v.a)+'–'+escape(v.b)).join(' · ')||closed}</li>`).join('')+'</ul>':''}<p class="detail-source">${text(managed.note)}</p></section>`;
  }
  const copy = {
    en: ["Kamsis administration office", "Pejabat Penyelia Kolej Kediaman Pelajar, beside Coop Mart (student-supplied location).", "Mon–Thu", "Friday", "Sat–Sun", "Closed", "For hostel damage, ask the Kamsis office about making a report. This reporting route is student feedback dated 5 October 2026; the official procedure has not been independently confirmed.", "Hours transcribed from the supplied office-door notice, reviewed 8 October 2026. Friday resumes at 14:45, rather than the feedback's 14:40. The photo does not establish when the notice was issued; confirm changes and public holidays with the office."],
    ms: ["Pejabat pengurusan Kamsis", "Pejabat Penyelia Kolej Kediaman Pelajar, sebelah Coop Mart (lokasi daripada pelajar).", "Isnin–Khamis", "Jumaat", "Sabtu–Ahad", "Tutup", "Untuk kerosakan asrama, rujuk pejabat Kamsis tentang cara membuat laporan. Saluran ini berdasarkan maklum balas pelajar bertarikh 5 Oktober 2026; prosedur rasmi belum disahkan secara bebas.", "Waktu disalin daripada notis pada pintu pejabat yang diberikan, disemak pada 8 Oktober 2026. Urusan Jumaat bersambung pada 14:45, bukan 14:40 seperti maklum balas. Tarikh notis asal tidak dapat dipastikan daripada foto; semak perubahan dan cuti umum dengan pejabat."],
    zh: ["Kamsis 宿舍管理办公室", "Pejabat Penyelia Kolej Kediaman Pelajar，位于 Coop Mart 旁（位置由学生提供）。", "周一至周四", "星期五", "周六、周日", "休息", "宿舍设施损坏，可到 Kamsis 办公室咨询报修方式。此报修渠道来自 2026年10月5日的学生反馈，具体官方流程尚未独立核实。", "时间按提供的办公室门上告示整理，于 2026年10月8日核对。星期五下午恢复办公时间为 14:45，而非反馈的 14:40。照片未显示告示发布日期；临时调整及公共假期请向办公室确认。"]
  };
  const d = copy[window.PMS_UI?.language] || copy.en;
  return `<section class="kamsis-office" data-no-translate><h3>${d[0]}</h3><p>${d[1]}</p><ul><li>${d[2]}: 08:00–13:00 · 14:00–17:00</li><li>${d[3]}: 08:00–12:15 · 14:45–17:00</li><li>${d[4]}: ${d[5]}</li></ul><p>${d[6]}</p><p class="detail-source">${d[7]}</p></section>`;
}
function reportButton(name) {
  return `<div class="data-meta"><span>资料更新：${window.PMS_BUILDINGS.records[name] ? window.PMS_BUILDINGS.updated : ["学术区食堂", "学生宿舍区"].includes(name) ? "2026-10-03" : guideUpdated}<br>位置${confirmedPositions.has(name) ? "经维护者确认" : "为参考图约略标注"} · 营业时间见来源说明</span><button type="button" class="soft-button" data-report-place="${name}">资料有误？反馈</button></div>`;
}

function feloMarkup() {
  return '<h3>宿舍有事，找 Felo</h3><p>生病时请致电当天值班的 Felo-on-call，说明自己的 Block、房号和情况。值班电话请查看宿舍最新值班表。</p><p>Felo 办公室每天 21:00–23:00 开放，包括周末；此安排与 Kamsis 管理办公室的日间办公时间不同。</p><h4>紧急值班 · Felo-on-call</h4><ul><li>周一至周五：17:00 至隔天 08:00。</li><li>周六、周日：24 小时紧急值班。</li></ul><p>宿舍主任（Ketua Felo）：En. Akhwan Hafis bin Akmal Hidzri</p><p><a href="tel:+60132899987">013-289 9987</a></p><details><summary>什么事情可以找 Felo？</summary><ul><li>紧急情况下申请夜间离开宿舍。</li><li>回乡申请及 i-Kamsis 批准手续；请通过 SPMP 的 i-Kamsis 至少提前 3 天申请。</li><li>办公时间后的住宿问题。</li><li>办公时间后或周末，需要送院的紧急情况。</li></ul></details><p class="detail-source">根据你提供的现场告示整理，值班人员与安排以宿舍最新通知为准。</p><p><a href="photos/felo-office.jpeg" target="_blank" rel="noopener noreferrer">查看 Felo 办公室告示</a> · <a href="photos/felo-board.jpeg" target="_blank" rel="noopener noreferrer">查看宿舍 Felo 名单</a></p>';
}
