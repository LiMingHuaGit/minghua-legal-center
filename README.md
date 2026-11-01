# MingHua Li Legal Center

Standalone static bilingual legal and support site for all personal products published by MingHua Li. This project is intentionally independent from every app and extension repository so policies can be maintained and deployed from one place.

Publisher: MingHua Li（李明华），independent developer
Contact: `2290320152@qq.com`

Production information architecture:

- `/` — product compliance directory
- `/privacy/` — shared privacy principles and product-policy index
- `/support/` — shared contact guidance and product-support directory
- `/products/<slug>/` — product identity, facts, and actual data boundaries
- `/products/<slug>/privacy/` — product-specific privacy policy
- `/products/<slug>/support/` — product-specific support and FAQ

Current products are PushUp Pilot, Better Excalidraw Workspace, and BetterMeAndCat.

The site has no external runtime, font, analytics, or CDN dependency. `public/_headers` applies restrictive security headers. The language switch uses the `lang` query parameter and keeps both English and Simplified Chinese text in the source HTML.

## Production deployment

- Cloudflare Worker: `legal-liminghua-fyi`
- Deployed version: `2e10fadb-305a-4c77-8fc4-49f0a34aa9da`
- Custom domain: `legal.liminghua.fyi`
- `workers_dev`: disabled
- Preview URLs: disabled
- The current standalone project was created and production-verified on 2026-10-30 by migrating the existing legal-center source out of the PushUp Pilot repository.

The published privacy disclosure records the currently verified Cloudflare Free-plan periods: Workers Logs are retained for 3 days, and D1 Time Travel recovery history is retained for 7 days. Re-check these periods and update both the source and the published page if the Cloudflare plan or settings change.

## Local preview and future updates

From this directory:

```sh
pnpm install
pnpm dev
pnpm check
pnpm run deploy
```

## Source and generated output

- `src/content.mjs` is the single content registry for shared policy text and every product.
- `src/render.mjs` owns reusable page structures.
- `src/styles.css` and `src/site.js` are shared by all routes.
- `scripts/build.mjs` regenerates the complete `public/` directory.
- `scripts/validate.mjs` checks route and asset completeness.

Do not hand-edit generated files under `public/`.

## Adding another product

1. Add one bilingual product object to `src/content.mjs`, including summary, facts, boundaries, privacy sections, and support FAQs.
2. Keep shared publisher principles in `generalPrivacy`; put actual permissions, data flows, retention, deletion, and providers in the product object.
3. Run `pnpm check`, verify English and Chinese at desktop and mobile sizes, then run `pnpm run deploy`.
4. Update the product list and deployed version in this README.
