/* Shared compact header; move existing controls so their listeners remain attached. */
(() => {
  const header = document.querySelector("body > header");
  const language = document.querySelector("#campus-language, #forum-language");
  if (!header || !language) return;
  const isAdmin = !!document.getElementById("workspace");
  header.classList.add("compact-header");
  const brand = header.querySelector(".brand");
  if (!brand) return;
  if (!brand.querySelector(".logo")) {
    brand.replaceChildren();
    const logo = document.createElement("span");
    logo.className = "logo";
    const name = document.createElement("span");
    name.className = "brand-name";
    name.textContent = "PMS Explore";
    brand.append(logo, name);
  }
  const logo = brand.querySelector(".logo");
  logo.setAttribute("data-no-translate", "");
  logo.innerHTML = '<span class="logo-word">PMS</span><small>EXPLORE</small>';
  const toolbar = document.createElement("div");
  toolbar.className = "compact-toolbar";
  header.append(language, toolbar);
  if (isAdmin) {
    const view = header.querySelector('a[href="index.html"]:not(.brand)');
    if (view) { view.classList.add("compact-view-site"); toolbar.append(view); }
    const logout = document.getElementById("logout");
    if (logout) toolbar.append(logout);
  }
  const account = document.querySelector("#account-button");
  if (account) toolbar.append(account);
  const actions = header.querySelector(".pms-navigation-actions");
  if (actions) toolbar.append(actions);
  [...header.children].forEach(el => {
    if (el !== brand && el !== language && el !== toolbar) el.classList.add("legacy-header-links");
  });
})();
