"use strict";
(() => {
  const base = window.PMS_FORUM_CONFIG.api,
    esc = (v) =>
      String(v ?? "").replace(
        /[&<>"']/g,
        (c) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[c],
      );
  const language = () => {
      try {
        return localStorage.getItem("pms-language") || "en";
      } catch {
        return "en";
      }
    },
    text = (v) => v?.[language()] || (language() === "zh" ? v?.en || v?.ms : v?.en) || "";
  let data = { records: [], hidden_places: [] };
  const managed = new Map(),
    hidden = new Set();
  const sourceSchedule = todaySchedule,
    sourceMatches = matchesPlace,
    sourceRender = render,
    sourcePhoto = photoMarkup;
  const originalLife = new Map(
    [...lifeByName].map(([k, v]) => [k, JSON.parse(JSON.stringify(v))]),
  );
  const leafSlots = new Set([
    "arrival-route",
    "orientation-clothes",
    "checklist",
    "hostel-blocks",
    "hostel-facilities",
    "hostel-living",
    "holiday-departure",
    "campus-network",
    "mobile-signal",
    "student-systems",
    "timetable-guide",
    "club-joining",
    "contacts",
    "faq",
    "outing-guide",
    "about",
  ]);
  const backups = new Map();
  let nativePages={};
  window.PMS_CMS={title:key=>text(managed.get(key)?.title),hidden:key=>hidden.has(key)};
  const state=document.createElement('p');state.className='source-note';state.setAttribute('role','status');state.dataset.noTranslate='';
  const retry=document.createElement('button');retry.type='button';retry.className='soft-button';retry.hidden=true;
  document.getElementById('today-pms')?.append(state,retry);
  let phase='loading';
  function status(){const l=language();const words={en:['Loading the latest guide…','Guide data loaded.','Latest guide unavailable. Showing the bundled guide; information may be outdated.','Try again'],ms:['Memuatkan panduan terkini…','Data panduan telah dimuatkan.','Panduan terkini tidak tersedia. Panduan tersimpan dipaparkan; maklumat mungkin lapuk.','Cuba lagi'],zh:['正在载入最新指南…','指南资料已载入。','最新指南暂时无法读取，现显示内置版本，资料可能不是最新。','重试']}[l]||[];state.textContent=words[{loading:0,current:1,fallback:2}[phase]];retry.textContent=words[3];retry.hidden=phase!=='fallback';}
  status();
  function imgURL(id) {
    const u = new URL(base);
    u.searchParams.set("action", "cms_media_file");
    u.searchParams.set("id", Number(id));
    return u.href;
  }
  function photo(src, caption) {
    return `<figure class="location-photo" data-no-translate><a href="${esc(src)}" target="_blank" rel="noopener noreferrer"><img src="${esc(src)}" alt="${esc(caption)}" loading="lazy"></a><figcaption>${esc(caption)}</figcaption></figure>`;
  }
  photoMarkup = function (name) {
    const p = managed.get(name);
    if (!p) return sourcePhoto(name);
    if (p.media_id) return photo(imgURL(p.media_id), text(p.title));
    if (p.photo_path) return photo(p.photo_path, text(p.title));
    return sourcePhoto(name);
  };
  matchesPlace = function (p, q) {
    return !hidden.has(p[0]) && sourceMatches(p, q);
  };
  todaySchedule = function (name, now = new Date()) {
    const p = managed.get(name);
    if (!p) return sourceSchedule(name, now);
    const clock = klClock(now),
      note = esc(text(p.note)),
      empty = {
        clock,
        slots: [],
        note,
        status:
          {
            en: "Hours unconfirmed",
            ms: "Waktu belum disahkan",
            zh: "时间待确认",
          }[language()] || "Hours unconfirmed",
        state: "unknown",
      };
    const special = p.exceptions?.find((e) => e.date === clock.date);
    if (special) {
      const mins = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
      const slots = special.slots.map((s) => ({ ...s, label: esc(s.label) }));
      const on = slots.some(
        (s) => clock.minutes >= mins(s.a) && clock.minutes < mins(s.b),
      );
      return {
        clock,
        slots,
        note: esc(special.note) || note,
        state: on ? "open" : "closed",
        status:
          language() === "ms"
            ? "Jadual khas hari ini"
            : language() === "zh"
              ? "今日特殊时间表"
              : "Special hours today",
      };
    }
    if (p.closure === "closed")
      return {
        ...empty,
        state: "closed",
        status:
          { en: "Temporarily closed", ms: "Ditutup sementara", zh: "临时关闭" }[
            language()
          ] || "Temporarily closed",
      };
    if (p.closure === "unknown") return empty;
    if (p.schedule === null) {
      const original = sourceSchedule(name, now);
      return { ...original, note: note || original.note };
    }
    const slots = (p.schedule?.[clock.day] || []).map((s) => ({
      a: s.a,
      b: s.b,
      label: esc(s.label),
    }));
    const mins = (t) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
    const on = slots.some(
      (s) => clock.minutes >= mins(s.a) && clock.minutes < mins(s.b),
    );
    return {
      clock,
      slots,
      note,
      state: on ? "open" : "closed",
      status: PMS_UI.translate(on ? "按时间表 · 开放时段" : "按时间表 · 非营业"),
    };
  };
  render = function () {
    sourceRender();
    document.querySelectorAll("#directory [data-id]").forEach((button) => {
      const row = places[Number(button.dataset.id)],
        content = row && managed.get(row[0]);
      const title = button.querySelector(".place-title");
      if (content && title) {
        title.firstChild.textContent = text(content.title);
        title.firstChild.parentElement.setAttribute("data-no-translate", "");
        const sub=title.querySelector('small');if(sub&&sub.textContent.trim()===text(content.title).trim())sub.remove();
      }
    });
    const p = places[selected],
      m = p && managed.get(p[0]);
    if (m) {
      const d = document.getElementById("detail");
      const title = d.querySelector("h2");
      if (title) {
        title.textContent = text(m.title);
        title.setAttribute("data-no-translate", "");
      }
      const subtitle=d.querySelector('p[lang="ms"]');if(subtitle&&subtitle.textContent.trim()===text(m.title).trim())subtitle.remove();
      d.querySelectorAll('.schedule').forEach(list=>{if(!list.children.length){const p=document.createElement('p');p.dataset.noTranslate='';p.textContent={en:'Hours unconfirmed',ms:'Waktu belum disahkan',zh:'时间待确认'}[language()];list.replaceWith(p);}});
      const v = m.verification;
      const box = document.createElement("div");
      box.className = "verification";
      box.setAttribute("data-no-translate", "");
      if (v?.date) {
        const stale =
          (new Date(klClock().date) - new Date(v.date)) / 86400000 > 90;
        box.classList.toggle("stale", stale);
        box.textContent =
          (language() === "ms"
            ? "Disemak"
            : language() === "zh"
              ? "已核实"
              : "Checked") +
          " " +
          v.date +
          " · " +
          v.by +
          " · " +
          v.source +
          (stale
            ? " · " +
              (language() === "ms"
                ? "Perlu semakan semula"
                : language() === "zh"
                  ? "建议重新核实"
                  : "Review recommended")
            : "");
      } else
        box.textContent =
          language() === "ms"
            ? "Belum disahkan oleh pentadbir"
            : language() === "zh"
              ? "尚未由管理员核实"
              : "Not yet verified by an administrator";
      d.append(box);
    }
  };
  function setRecords() {
    managed.clear();
    window.PMS_KAMSIS_RECORD = data.records.find(r=>r.kind==='place' && r.record_key==='Pejabat Kamsis')?.payload || null;
    hidden.clear();
    for (const key of data.hidden_places || []) hidden.add(key);
    for (const r of data.records.filter((r) => r.kind === "place")) {
      const v = r.payload;
      managed.set(r.record_key, v);
      let p = places.find((p) => p[0] === r.record_key);
      if (!p) {
        p = [r.record_key, v.category, v.x, v.y, text(v.title), text(v.body)];
        places.push(p);
      }
      p[1] = v.category;
      p[2] = v.x;
      p[3] = v.y;
      p[4] = esc(text(v.title));
      p[5] = esc(text(v.body));
      const old = originalLife.get(r.record_key),
        entry = {
          ...(old || { name: r.record_key, sections: [] }),
          ms: esc(text(v.title)),
          desc: esc(text(v.body)),
        };
      if (v.schedule !== null)
        entry.hours = v.schedule.map((day, i) => [
          ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][i],
          day.length
            ? day
                .map(
                  (s) =>
                    s.a + "–" + s.b + (s.label ? " · " + esc(s.label) : ""),
                )
                .join(" / ")
            : "非营业",
        ]);
      if (!entry.hours) entry.hours = [];
      lifeByName.set(r.record_key, entry);
    }
    // Content keys retain original map indices and deep links.
    render();
    const daily = document.getElementById("daily-services");
    if (daily)
      daily.innerHTML = lifeEntries
        .filter((e) => !hidden.has(e.name) && !["宿舍洗衣服务","Bizz Mall 旁洗衣服务"].includes(e.name))
        .map((e) => {
          const m = managed.get(e.name),
            v = lifeByName.get(e.name) || e;
          const title=m ? text(m.title) : e.name;
          return `<article class="article"><span class="tag">餐饮 · 购物 · 洗衣</span><h2>${esc(title)}</h2>${photoMarkup(e.name)}${v.ms===esc(title)?'':`<p>${v.ms}</p>`}<p>${v.desc}</p>${todayMarkup(e.name)}${hoursMarkup(v)}${sectionsMarkup(v)}</article>`;
        })
        .join("");
    const laundry=document.getElementById('laundry-services');
    if(laundry)laundry.innerHTML=['宿舍洗衣服务','Bizz Mall 旁洗衣服务'].filter(key=>!hidden.has(key)).map(key=>{const v=lifeByName.get(key),p=managed.get(key);return `<article class="article"><h2>${esc(p?text(p.title):key)}</h2>${photoMarkup(key)}<p>${v.desc}</p>${todayMarkup(key)}${hoursMarkup(v)}${sectionsMarkup(v)}</article>`;}).join('');
    const pool = document.getElementById("pool-guide"),
      p = managed.get(poolEntry.name);
    if (pool) pool.hidden = hidden.has(poolEntry.name);
    if (pool && p) {
      const v = lifeByName.get(poolEntry.name);
      pool.innerHTML = `<h2>${esc(text(p.title))}</h2>${photoMarkup(poolEntry.name)}<p>${esc(text(p.body))}</p>${todayMarkup(poolEntry.name)}${hoursMarkup(v)}${sectionsMarkup(v)}${poolPhotoMarkup()}`;
    }
    for (const key of ["report-place"]) {
      const select = document.getElementById(key);
      if (select) {
        const value = select.value;
        select.innerHTML = places
          .filter((p) => !hidden.has(p[0]))
          .map(
            (p) =>
              `<option value="${esc(p[0])}">${esc(managed.has(p[0]) ? text(managed.get(p[0]).title) : p[0])}</option>`,
          )
          .join("");
        select.value = value;
      }
    }
  }
  function pages() {
    document.querySelectorAll("[data-cms-block]").forEach((e) => e.remove());
    for (const [slot, original] of backups) {
      const el = document.getElementById(slot);
      if (el) {
        el.replaceChildren(...original);
        backups.delete(slot);
      }
    }
    const rows = data.records
      .filter((r) => r.kind === "page")
      .sort(
        (a, b) =>
          (a.payload.order || 0) - (b.payload.order || 0) || a.id - b.id,
      );
    for (const r of rows) {
      const p = r.payload,
        target = document.getElementById(p.slot);
      if (!target) continue;
      const native=nativePages[r.record_key];
      // Default imported text is a summary of the original section, not a replacement template.
      if(native && !p.media_id && ['en','ms','zh'].every(l=>p.title?.[l]===native.title?.[l]) && [native.legacy?.en,native.legacy?.ms,native.legacy?.zh,native.current?.en,native.current?.ms,native.current?.zh].filter(Boolean).includes(text(p.body)))continue;
      const block = document.createElement("article");
      block.className = "article cms-content-block";
      block.dataset.cmsBlock = String(r.id);
      block.setAttribute("data-no-translate", "");
      const h = document.createElement("h2");
      h.textContent = text(p.title);
      const body = document.createElement("p");
      body.className = "cms-paragraph";
      body.textContent = text(p.body);
      block.append(h, body);
      if (p.media_id) {
        const wrapper = document.createElement("div");
        wrapper.innerHTML = photo(imgURL(p.media_id), text(p.title));
        block.append(wrapper);
      }
      const interactive=target.querySelector('a,input,button,details,select,textarea,[data-read-target]');
      if (p.replace && !interactive && leafSlots.has(p.slot) && !backups.has(p.slot)) {
        backups.set(p.slot, [...target.childNodes]);
        target.replaceChildren(block);
      } else target.append(block);
    }
  }
  function apply() {
    setRecords();
    pages();
    document.dispatchEvent(new Event("pms-cms-updated"));
    if (typeof translatePage === "function") translatePage();
    status();
  }
  document.addEventListener('pms-language-change',()=>requestAnimationFrame(apply));
  async function load(){
  if(phase==='loading'&&load.busy)return;load.busy=true;phase='loading';status();
  const controller = new AbortController(),
    timer = setTimeout(() => controller.abort(), 15000);
  const url = new URL(base);
  url.searchParams.set("action", "cms_public");
  return fetch(url, {
    cache: "no-store",
    credentials: "omit",
    signal: controller.signal,
  })
    .then((r) => {
      if (!r.ok) throw Error("CMS unavailable");
      return r.json();
    })
    .then((r) => {
      if (r.ok && r.installed) {
        data = r;
        phase='current';
        apply();
      }else throw Error('CMS unavailable');
    })
    .catch(() => {
      /* Original guide remains available if CMS cannot be read. */
      phase='fallback';status();
    })
    .finally(() => {clearTimeout(timer);load.busy=false;});
  }
  retry.onclick=load;
  const nativeController=new AbortController(),nativeTimer=setTimeout(()=>nativeController.abort(),5000);
  fetch('cms-native.json?v=1.17',{credentials:'omit',signal:nativeController.signal}).then(r=>r.json()).then(r=>nativePages=r).catch(()=>{}).finally(()=>{clearTimeout(nativeTimer);load();});
})();
