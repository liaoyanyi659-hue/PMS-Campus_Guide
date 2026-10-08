/* v1.8: compact shared header; keep original controls and their listeners. */
(() => {
  const header = document.querySelector("body > header");
  const language = document.querySelector("#campus-language, #forum-language");
  if (!header || !language) return;
  header.classList.add("compact-header");
  const brand = header.querySelector(".brand");
  if (document.querySelector("#campus-language")) {
    brand.replaceChildren();
    const logo = document.createElement("span");
    logo.className = "logo";
    logo.innerHTML = "PMS<small>EXPLORE</small>";
    const name = document.createElement("span");
    name.className = "brand-name";
    name.textContent = "PMS Explore";
    brand.append(logo, name);
  }
  const toolbar = document.createElement("div");
  toolbar.className = "compact-toolbar";
  header.append(language, toolbar);
  const account = document.querySelector("#account-button");
  if (account) toolbar.append(account);
  const actions = header.querySelector(".pms-navigation-actions");
  if (actions) toolbar.append(actions);
  header
    .querySelectorAll(":scope > nav, :scope > .header-actions")
    .forEach((el) => el.classList.add("legacy-header-links"));
})();
