# MingHua Li Legal Center

Standalone static bilingual legal and support site for all personal products published by MingHua Li. This project is intentionally independent from every app and extension repository so policies can be maintained and deployed from one place.

Publisher: MingHua Li（李明华），independent developer
Contact: `2290320152@qq.com`

Production routes:

- `https://legal.liminghua.fyi/` — legal center index
- `https://legal.liminghua.fyi/privacy/` — reusable privacy core and PushUp Pilot disclosure
- `https://legal.liminghua.fyi/support/` — PushUp Pilot support
- `https://legal.liminghua.fyi/products/better-excalidraw/privacy/` — Better Excalidraw Workspace privacy policy

The site has no external runtime, font, analytics, or CDN dependency. `public/_headers` applies restrictive security headers. The language switch uses the `lang` query parameter and keeps both English and Simplified Chinese text in the source HTML.

## Production deployment

- Cloudflare Worker: `legal-liminghua-fyi`
- Deployed version: `93732f6b-7293-4e76-841e-6164a5b76ee9`
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

## Adding another product

1. Add the product to the bilingual product directory in `public/index.html`.
2. Create a stable product route under `public/products/<product-slug>/privacy/index.html`.
3. Keep general publisher terms in `public/privacy/index.html`; put product-specific permissions, data flows, retention, and third parties on the product route.
4. Run `pnpm check`, verify English and Chinese at desktop and mobile sizes, then run `pnpm run deploy`.
5. Update this README with the new production route and deployed version.
