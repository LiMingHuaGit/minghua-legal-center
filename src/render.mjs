import { generalPrivacy, products, site, supportGuide } from "./content.mjs";

const escapeHTML = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const arrow = `<svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const localized = (en, zh, tag = "span", className = "") =>
  `<${tag} class="lang-en ${className}" lang="en">${en}</${tag}><${tag} class="lang-zh ${className}" lang="zh-Hans">${zh}</${tag}>`;

function layout({ title, description, current = "", body, product = null }) {
  const productNav = product
    ? `<div class="product-subnav" aria-label="Product navigation">
        <a data-keep-language ${current === "product" ? 'aria-current="page"' : ""} href="/products/${product.slug}/">${localized("Overview", "产品概览")}</a>
        <a data-keep-language ${current === "product-privacy" ? 'aria-current="page"' : ""} href="/products/${product.slug}/privacy/">${localized("Privacy", "隐私政策")}</a>
        <a data-keep-language ${current === "product-support" ? 'aria-current="page"' : ""} href="/products/${product.slug}/support/">${localized("Support", "产品支持")}</a>
      </div>`
    : "";

  return `<!doctype html>
<html lang="en" data-language="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${escapeHTML(description)}">
  <meta name="color-scheme" content="light">
  <title>${escapeHTML(title)} · MingHua Legal Center</title>
  <link rel="stylesheet" href="/styles.css">
  <script src="/site.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">${localized("Skip to content", "跳到正文")}</a>
  <div class="site-shell">
    <header class="site-header">
      <div class="header-inner">
        <a class="brand" data-keep-language href="/">MingHua <span>Legal Center</span></a>
        <nav class="desktop-nav" aria-label="Primary">
          <a data-keep-language ${current === "privacy" ? 'aria-current="page"' : ""} href="/privacy/">${localized("Privacy", "隐私")}</a>
          <a data-keep-language ${current === "support" ? 'aria-current="page"' : ""} href="/support/">${localized("Support", "支持")}</a>
          <div class="language-switch" aria-label="Language">
            <button type="button" data-language-choice="en" aria-pressed="true">EN</button><span aria-hidden="true">/</span><button type="button" data-language-choice="zh" aria-pressed="false">中文</button>
          </div>
        </nav>
        <details class="mobile-menu">
          <summary aria-label="Open navigation"><span class="menu-icon"></span></summary>
          <div class="mobile-menu-panel">
            <a data-keep-language href="/privacy/">${localized("Privacy", "隐私")}</a>
            <a data-keep-language href="/support/">${localized("Support", "支持")}</a>
            <div class="language-switch"><button type="button" data-language-choice="en">EN</button><span>/</span><button type="button" data-language-choice="zh">中文</button></div>
          </div>
        </details>
      </div>
${productNav}
    </header>
    <main id="main" class="page-main" tabindex="-1">${body}</main>
    <footer class="site-footer"><div><span>© ${new Date().getFullYear()} ${site.publisher}</span><a href="mailto:${site.email}">${site.email}</a></div></footer>
  </div>
</body>
</html>`;
}

const productRows = (context) => `<div class="product-ledger">
  ${products.map((product, index) => `<article class="product-row">
    <a class="row-main" data-keep-language href="/products/${product.slug}/" aria-label="${escapeHTML(product.name)}">
      <span class="row-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="row-copy"><strong>${escapeHTML(product.name)}</strong>${localized(product.kind.en, product.kind.zh, "span", "row-kind")}</span>
      ${arrow}
    </a>
    <div class="row-actions">
      <a data-keep-language href="/products/${product.slug}/privacy/">${localized("Privacy", "隐私")}</a>
      <a data-keep-language href="/products/${product.slug}/support/">${localized("Support", "支持")}</a>
    </div>
  </article>`).join("")}
</div>`;

export function renderHome() {
  return layout({
    title: "Product compliance directory",
    description: "Privacy and support records for products published by MingHua Li.",
    body: `<section class="home-main">
      <p class="eyebrow">${localized("Independent developer · compliance archive", "独立开发者 · 合规档案")}</p>
      <h1>${localized("Product records you can verify.", "可核验的产品合规档案。")}</h1>
      <p class="lede">${localized("Choose a product to review its identity, data boundaries, privacy policy, and support guidance.", "选择产品，查看身份信息、数据边界、隐私政策与支持说明。")}</p>
      ${productRows("home")}
      <div class="general-rail"><span>${localized("Shared policies", "统一入口")}</span><a data-keep-language href="/privacy/">${localized("General privacy principles", "通用隐私原则")}</a><a data-keep-language href="/support/">${localized("Support directory", "支持目录")}</a></div>
    </section>`,
  });
}

const sectionNav = (sections) => `<aside class="document-toc"><p>${localized("On this page", "本页目录")}</p>${sections.map(([id, en, zh]) => `<a href="#${id}-en">${localized(en.replace(/^\d+\.\s*/, ""), zh.replace(/^\d+\.\s*/, ""))}</a>`).join("")}</aside>`;
const policySections = (sections, language) => sections.map(([id, title, html]) => `<section id="${id}-${language}" class="policy-section lang-${language}" lang="${language === "zh" ? "zh-Hans" : "en"}" data-section-id="${id}"><h2>${title}</h2>${html}</section>`).join("");

export function renderGeneralPrivacy() {
  const toc = generalPrivacy.en.map(([id, en], i) => [id, en, generalPrivacy.zh[i][1]]);
  return layout({
    title: "General Privacy Principles",
    description: "Shared privacy principles and product-specific privacy policy index.",
    current: "privacy",
    body: `<div class="document-shell"><header class="document-hero"><p class="eyebrow">${localized("Shared policy", "统一政策")}</p><h1>${localized("General Privacy Principles", "通用隐私原则")}</h1><p>${localized("This page defines the common baseline. Each product policy records the actual product-specific data practices.", "本页定义共同基线；每款产品的专项政策记录其实际数据实践。")}</p><dl class="meta-line"><div><dt>${localized("Effective", "生效日期")}</dt><dd>${localized(generalPrivacy.effective.en, generalPrivacy.effective.zh)}</dd></div><div><dt>${localized("Publisher", "发布者")}</dt><dd>${site.publisher}</dd></div></dl></header><div class="document-grid">${sectionNav(toc)}<article class="document-content">${policySections(generalPrivacy.en, "en")}${policySections(generalPrivacy.zh, "zh")}<section class="policy-index"><h2>${localized("Product privacy policies", "产品隐私政策")}</h2>${productRows("privacy")}</section></article></div></div>`,
  });
}

export function renderSupport() {
  return layout({
    title: "Support Directory",
    description: "Unified product support and contact directory.",
    current: "support",
    body: `<div class="document-shell"><header class="document-hero"><p class="eyebrow">${localized("One support entrance", "统一支持入口")}</p><h1>${localized(supportGuide.en.title, supportGuide.zh.title)}</h1><p>${localized(supportGuide.en.intro, supportGuide.zh.intro)}</p></header><section class="support-directory">${productRows("support")}</section><section class="contact-band"><div><p class="eyebrow">${localized(supportGuide.en.contactTitle, supportGuide.zh.contactTitle)}</p><p>${localized(supportGuide.en.contactBody, supportGuide.zh.contactBody)}</p></div><a class="button-link" href="mailto:${site.email}?subject=Product%20Support">${localized("Email support", "发送支持邮件")}${arrow}</a></section></div>`,
  });
}

const factGrid = (product) => `<dl class="fact-grid">${product.facts.en.map(([enLabel, enValue], i) => { const [zhLabel, zhValue] = product.facts.zh[i]; return `<div><dt>${localized(enLabel, zhLabel)}</dt><dd>${localized(enValue, zhValue)}</dd></div>`; }).join("")}</dl>`;
const boundaryGrid = (product) => `<div class="boundary-list">${product.boundaries.en.map(([kind, enTitle, enBody], i) => { const [, zhTitle, zhBody] = product.boundaries.zh[i]; return `<article data-boundary="${kind}"><span class="boundary-mark" aria-hidden="true"></span><div><h3>${localized(enTitle, zhTitle)}</h3><p>${localized(enBody, zhBody)}</p></div></article>`; }).join("")}</div>`;

export function renderProduct(product) {
  return layout({
    title: product.name,
    description: product.summary.en,
    current: "product",
    product,
    body: `<div class="product-page"><header class="product-hero product-${product.slug}"><div><p class="eyebrow">${localized(product.platform.en, product.platform.zh)} · ${localized(product.kind.en, product.kind.zh)}</p><h1>${escapeHTML(product.name)}</h1><p class="lede">${localized(product.summary.en, product.summary.zh)}</p></div><div class="record-stamp"><span>${localized("Product record", "产品档案")}</span><strong>${escapeHTML(product.slug)}</strong><small>${localized("Updated", "更新于")} ${product.updated}</small></div></header><section class="record-section"><div class="section-heading"><span>01</span><h2>${localized("Data summary", "数据摘要")}</h2></div>${factGrid(product)}</section><section class="record-section"><div class="section-heading"><span>02</span><h2>${localized("Actual data boundaries", "实际数据边界")}</h2></div>${boundaryGrid(product)}</section><section class="record-links"><a data-keep-language href="/products/${product.slug}/privacy/"><span>${localized("Read the product privacy policy", "阅读产品隐私政策")}</span>${arrow}</a><a data-keep-language href="/products/${product.slug}/support/"><span>${localized("Open product support", "打开产品支持")}</span>${arrow}</a></section></div>`,
  });
}

export function renderProductPrivacy(product) {
  const toc = product.privacy.en.map(([id, en], i) => [id, en, product.privacy.zh[i][1]]);
  return layout({
    title: `${product.name} Privacy Policy`,
    description: `Privacy policy for ${product.name}.`,
    current: "product-privacy",
    product,
    body: `<div class="document-shell"><header class="document-hero"><p class="eyebrow">${escapeHTML(product.name)}</p><h1>${localized("Privacy Policy", "隐私政策")}</h1><p>${localized(product.summary.en, product.summary.zh)}</p><dl class="meta-line"><div><dt>${localized("Effective", "生效日期")}</dt><dd>${localized(product.privacy.effective.en, product.privacy.effective.zh)}</dd></div><div><dt>${localized("General baseline", "通用基线")}</dt><dd><a data-keep-language href="/privacy/">${localized("General Privacy Principles", "通用隐私原则")}</a></dd></div></dl></header><div class="document-grid">${sectionNav(toc)}<article class="document-content">${policySections(product.privacy.en, "en")}${policySections(product.privacy.zh, "zh")}</article></div></div>`,
  });
}

export function renderProductSupport(product) {
  const faqs = product.support.en.map(([enQ, enA], i) => { const [zhQ, zhA] = product.support.zh[i]; return `<details class="faq-item"><summary>${localized(enQ, zhQ)}<span aria-hidden="true"></span></summary><div>${localized(`<p>${enA}</p>`, `<p>${zhA}</p>`, "div")}</div></details>`; }).join("");
  return layout({
    title: `${product.name} Support`,
    description: `Setup, data, purchase, and troubleshooting support for ${product.name}.`,
    current: "product-support",
    product,
    body: `<div class="support-page"><header class="document-hero"><p class="eyebrow">${escapeHTML(product.name)}</p><h1>${localized("Product Support", "产品支持")}</h1><p>${localized("Start with the questions below. If the issue remains, email the developer with reproducible details.", "请先查看下列常见问题；如果问题仍未解决，请通过邮件提供可复现的信息。")}</p></header><section class="faq-list"><h2>${localized("Common questions", "常见问题")}</h2>${faqs}</section><section class="contact-band"><div><p class="eyebrow">${localized("Still need help?", "仍需帮助？")}</p><p>${localized(supportGuide.en.contactBody, supportGuide.zh.contactBody)}</p></div><a class="button-link" href="mailto:${site.email}?subject=${encodeURIComponent(product.name)}%20Support">${localized("Email support", "发送支持邮件")}${arrow}</a></section></div>`,
  });
}

export function render404() {
  return layout({ title: "Not Found", description: "The requested legal record was not found.", body: `<section class="not-found"><p class="eyebrow">404</p><h1>${localized("Record not found.", "未找到对应档案。")}</h1><p>${localized("Return to the product directory to continue.", "请返回产品目录继续查看。")}</p><a class="button-link" data-keep-language href="/">${localized("Product directory", "产品目录")}${arrow}</a></section>` });
}

export { products };
