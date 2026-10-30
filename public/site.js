(() => {
  const root = document.documentElement;
  const params = new URLSearchParams(window.location.search);
  const initialLanguage = params.get("lang") === "zh" ? "zh" : "en";

  function updateLanguageLinks(language) {
    document.querySelectorAll("a[data-keep-language]").forEach((link) => {
      const target = new URL(link.href, window.location.href);
      if (language === "zh") {
        target.searchParams.set("lang", "zh");
      } else {
        target.searchParams.delete("lang");
      }
      link.href = target.href;
    });
  }

  function setLanguage(language, updateURL) {
    const normalized = language === "zh" ? "zh" : "en";
    root.dataset.language = normalized;
    root.lang = normalized === "zh" ? "zh-Hans" : "en";

    document.querySelectorAll("[data-language-choice]").forEach((button) => {
      const isActive = button.dataset.languageChoice === normalized;
      button.setAttribute("aria-pressed", String(isActive));
      button.classList.toggle("is-active", isActive);
    });

    updateLanguageLinks(normalized);

    if (updateURL) {
      const nextURL = new URL(window.location.href);
      if (normalized === "zh") {
        nextURL.searchParams.set("lang", "zh");
      } else {
        nextURL.searchParams.delete("lang");
      }
      window.history.replaceState({}, "", nextURL);
    }
  }

  document.querySelectorAll("[data-language-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      setLanguage(button.dataset.languageChoice, true);
      document.querySelector("main")?.focus({ preventScroll: true });
    });
  });

  setLanguage(initialLanguage, false);
})();
