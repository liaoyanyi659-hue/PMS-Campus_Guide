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
  return `${["Bizz Mall", "食堂"].includes(p[0]) || (p[1] === "教学区域" && p[0] !== "图书馆") ? "" : todayMarkup(p[0])}${p[0] === "学生宿舍区" ? '<div class="detail">' + kamsisOfficeMarkup() + feloMarkup() + "</div>" : ""}<div class="wayfinding"><h3>入口与楼层</h3><p>${locationHints[p[0]] || "地图标示设施所在区域；具体入口与楼层待补充，请参照现场指示。"}</p></div>`;
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
  return `<div class="data-meta"><span>资料更新：${["学术区食堂", "学生宿舍区"].includes(name) ? "2026-10-03" : guideUpdated}<br>位置${confirmedPositions.has(name) ? "经维护者确认" : "为参考图约略标注"} · 营业时间见来源说明</span><button type="button" class="soft-button" data-report-place="${name}">资料有误？反馈</button></div>`;
}

function feloMarkup() {
  return '<h3>宿舍有事，找 Felo</h3><p>生病时请致电当天值班的 Felo-on-call，说明自己的 Block、房号和情况。值班电话请查看宿舍最新值班表。</p><p>Felo 办公室每天 21:00–23:00 开放，包括周末；此安排与 Kamsis 管理办公室的日间办公时间不同。</p><h4>紧急值班 · Felo-on-call</h4><ul><li>周一至周五：17:00 至隔天 08:00。</li><li>周六、周日：24 小时紧急值班。</li></ul><p>宿舍主任（Ketua Felo）：En. Akhwan Hafis bin Akmal Hidzri</p><p><a href="tel:+60132899987">013-289 9987</a></p><details><summary>什么事情可以找 Felo？</summary><ul><li>紧急情况下申请夜间离开宿舍。</li><li>回乡申请及 i-Kamsis 批准手续；请通过 SPMP 的 i-Kamsis 至少提前 3 天申请。</li><li>办公时间后的住宿问题。</li><li>办公时间后或周末，需要送院的紧急情况。</li></ul></details><p class="detail-source">根据你提供的现场告示整理，值班人员与安排以宿舍最新通知为准。</p><p><a href="photos/felo-office.jpeg" target="_blank" rel="noopener noreferrer">查看 Felo 办公室告示</a> · <a href="photos/felo-board.jpeg" target="_blank" rel="noopener noreferrer">查看宿舍 Felo 名单</a></p>';
}
