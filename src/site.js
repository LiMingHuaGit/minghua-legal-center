(() => {
  const root = document.documentElement;
  const initialLanguage = new URLSearchParams(window.location.search).get("lang") === "zh" ? "zh" : "en";

  function setLanguage(language, updateURL = false) {
    const selected = language === "zh" ? "zh" : "en";
    root.dataset.language = selected;
    root.lang = selected === "zh" ? "zh-Hans" : "en";

    document.querySelectorAll("[data-language-choice]").forEach((button) => {
      const active = button.dataset.languageChoice === selected;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    document.querySelectorAll("a[data-keep-language]").forEach((link) => {
      const target = new URL(link.href, window.location.href);
      selected === "zh" ? target.searchParams.set("lang", "zh") : target.searchParams.delete("lang");
      link.href = target.href;
    });

    document.querySelectorAll(".document-toc a").forEach((link) => {
      const base = link.hash.replace(/-(en|zh)$/, "");
      link.hash = `${base}-${selected}`;
    });

    updateMenuLabels(selected);

    if (updateURL) {
      const next = new URL(window.location.href);
      selected === "zh" ? next.searchParams.set("lang", "zh") : next.searchParams.delete("lang");
      history.replaceState({}, "", next);
    }
  }

  function updateMenuLabels(language) {
    document.querySelectorAll(".mobile-menu").forEach((menu) => {
      const summary = menu.querySelector("summary");
      const open = menu.open;
      const label = language === "zh"
        ? (open ? "关闭导航" : "打开导航")
        : (open ? "Close navigation" : "Open navigation");
      summary?.setAttribute("aria-label", label);
      summary?.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll("[data-language-choice]").forEach((button) => button.addEventListener("click", () => {
    setLanguage(button.dataset.languageChoice, true);
  }));

  document.querySelectorAll(".mobile-menu").forEach((menu) => menu.addEventListener("toggle", () => updateMenuLabels(root.dataset.language)));

  setLanguage(initialLanguage);
})();
