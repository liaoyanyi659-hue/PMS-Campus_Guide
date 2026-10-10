"use strict";
(() => {
  const dict = {
    ms: {
      title: "Info & Aktiviti Kampus",
      body: "Nak tahu apa jadi di PMS? Semak info semasa, aktiviti dan aktifkan notifikasi.",
      open: "Tengok info & aktiviti",
      aduan: "Aduan fasiliti",
      hint: "Sediakan dokumen untuk Pejabat Felo",
      lost: "Barang hilang? Tengok Lost & Found dalam Forum.",
    },
    en: {
      title: "Campus Updates & Events",
      body: "What’s happening at PMS? Check campus updates, activities and turn on notifications.",
      open: "View updates & events",
      aduan: "Report a facility issue",
      hint: "Prepare documents for Pejabat Felo",
      lost: "Lost something? Visit Lost & Found in the Forum.",
    },
    zh: {
      title: "校园资讯与活动",
      body: "查看 PMS 即时资讯、校园活动，并订阅手机通知。",
      open: "查看资讯与活动",
      aduan: "设施报修",
      hint: "准备文件，亲自交到 Pejabat Felo",
      lost: "遗失物品？前往 Forum 的失物招领。",
    },
  };
  const root = document.createElement("section");
  root.className = "campus-entry";
  root.setAttribute("aria-label", "Campus updates and services");
  const target =
    document.querySelector("#life .intro") || document.querySelector("#life");
  if (target) target.after(root);
  else document.querySelector("main")?.prepend(root);
  function render() {
    let l = "ms";
    try {
      l = localStorage.getItem("pms-language") || "en";
    } catch {}
    const d = dict[l] || dict.en;
    root.setAttribute("data-no-translate", "");
    root.innerHTML = `<div class="service-heading"><h2>${d.title}</h2><p>${d.body}</p></div><div class="campus-entry-actions"><a class="service-tile" href="campus.html"><span class="service-icon" aria-hidden="true">▤</span><span>${d.open}</span><span class="service-arrow" aria-hidden="true">→</span></a><a class="service-tile" href="complaints.html"><span class="service-icon" aria-hidden="true">⚒</span><span>${d.aduan}<small>${d.hint}</small></span><span class="service-arrow" aria-hidden="true">→</span></a><a class="service-tile" href="community.html?category=lost_found"><span class="service-icon" aria-hidden="true">⌕</span><span>${d.lost}</span><span class="service-arrow" aria-hidden="true">→</span></a></div>`;
  }
  render();
  root
    .querySelector('a[href="community.html"]')
    ?.setAttribute("href", "community.html?category=lost_found");
  document.querySelector("#language-select")?.addEventListener("change", () =>
    requestAnimationFrame(() => {
      render();
      root
        .querySelector('a[href="community.html"]')
        ?.setAttribute("href", "community.html?category=lost_found");
    }),
  );
  window.addEventListener("storage", (e) => {
    if (e.key === "pms-language") {
      render();
      root
        .querySelector('a[href="community.html"]')
        ?.setAttribute("href", "community.html?category=lost_found");
    }
  });
  if (window.isSecureContext && "serviceWorker" in navigator)
    navigator.serviceWorker
      .register("./service-worker.js", { scope: "./" })
      .catch(() => {});
})();
