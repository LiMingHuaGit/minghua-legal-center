import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { products, render404, renderGeneralPrivacy, renderHome, renderProduct, renderProductPrivacy, renderProductSupport, renderSupport } from "../src/render.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "public");

async function writeRoute(route, html) {
  const directory = route === "/" ? output : resolve(output, route.replace(/^\//, ""));
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, "index.html"), html);
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await Promise.all([
  writeRoute("/", renderHome()),
  writeRoute("/privacy/", renderGeneralPrivacy()),
  writeRoute("/support/", renderSupport()),
  writeFile(resolve(output, "404.html"), render404()),
  cp(resolve(root, "src/styles.css"), resolve(output, "styles.css")),
  cp(resolve(root, "src/site.js"), resolve(output, "site.js")),
  cp(resolve(root, "src/_headers"), resolve(output, "_headers")),
  ...products.flatMap((product) => [
    writeRoute(`/products/${product.slug}/`, renderProduct(product)),
    writeRoute(`/products/${product.slug}/privacy/`, renderProductPrivacy(product)),
    writeRoute(`/products/${product.slug}/support/`, renderProductSupport(product)),
  ]),
]);

console.log(`Built ${3 + products.length * 3} routes for ${products.length} products.`);
