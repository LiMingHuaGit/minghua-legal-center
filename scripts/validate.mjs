import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { products } from "../src/content.mjs";

const root = resolve("public");
const routes = ["", "privacy", "support", ...products.flatMap(({ slug }) => [`products/${slug}`, `products/${slug}/privacy`, `products/${slug}/support`])];
const failures = [];

for (const route of routes) {
  const file = resolve(root, route, "index.html");
  try {
    const html = await readFile(file, "utf8");
    for (const marker of ["<!doctype html>", "lang-en", "lang-zh", "/styles.css", "/site.js"]) {
      if (!html.includes(marker)) failures.push(`${file}: missing ${marker}`);
    }
  } catch (error) {
    failures.push(`${file}: ${error.message}`);
  }
}

for (const asset of ["styles.css", "site.js", "_headers", "404.html"]) {
  try { await access(resolve(root, asset)); } catch { failures.push(`public/${asset}: missing`); }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Validated ${routes.length} bilingual routes and shared assets.`);
