---
name: kammand-performance
description: Protect the KAMMAND Lighthouse >=95 targets - Server Component defaults and justified client boundaries, next/image discipline with sizes and priority, committed image weight and format, CSS payload, and layout stability. Use before a release, after adding a Client Component or image, when adding a dependency, or when a page feels slow.
---

# KAMMAND Performance

`AGENTS.md` sets Lighthouse Performance, Accessibility, Best Practices, and SEO
at 95 or better. This skill defends the Performance target.

Read this first, because it changes what the job is: **this site is currently in
good shape.** Nine Client Components, all justified. Zero bare `<img>`. The
entire `public/images/` tree is 164 KB. There is no crisis to fix.

So the work here is almost entirely **preventing regression**, plus two known
items. Do not manufacture findings. A pass that reports "no regressions, two
known items unchanged" is a successful pass.

## Baseline

Re-measure these before claiming anything moved:

```
grep -rl '"use client"' app components lib | wc -l        # baseline 9
grep -rn '<img ' app components --include=*.tsx | wc -l   # baseline 0 — must stay 0
find public -type f \( -name '*.png' -o -name '*.jpg' -o -name '*.jpeg' \) # baseline: 1, see below
du -sh public/images                                       # baseline 164K
wc -l < app/globals.css                                    # baseline 10,587
```

| Check | Threshold | Baseline |
|-------|-----------|----------|
| Bare `<img>` | must be 0 | 0 |
| Client Components | each justified by interactivity | 9 |
| Committed raster over 200 KB | must be 0 | 0 (largest is 48 KB) |
| Non-WebP raster | must be 0 | **1** — `saudipdpl.jpg` |
| `fill` without `sizes` | must be 0 | 0 |
| `priority` below the fold | must be 0 | 0 (one use, correct) |
| `app/globals.css` lines | must not grow | 10,587 |

## The two known items

**1. `public/images/frameworks/saudipdpl.jpg`** — the only non-WebP raster, and
it is orphaned: nothing in `app/`, `components/`, `lib/`, or `content/`
references it. Compare `sama-csf.webp`, `nca-ecc.webp`, and `iso-27001.webp`,
all wired through `lib/framework-badges.ts` and rendered via `next/image` in
`trust-strip.tsx`. It violates the WebP rule in `AGENTS.md`. Delete it, or
convert and wire it if a Saudi PDPL badge is actually wanted.

**2. `app/globals.css` is 10,587 lines shipped to every route**, whatever that
route uses. Next.js extracts and minifies it, so this is more a maintainability
problem than a runtime one — but 93 dead selectors in that file are bytes every
visitor downloads for nothing. The fix routes through
`kammand-css-architecture` (migrate to modules) and `kammand-design-consistency`
(delete dead rules), not through this skill. Report the number; do not fix it
here.

## Client Component discipline

Server Components are the default. `"use client"` needs a reason that is
genuinely interactive — state, effects, event handlers, browser APIs.

The nine current ones are all legitimate: analytics provider, three consent
components, three navigation components, footer newsletter, and the contact
form. When reviewing a new one, ask whether only a leaf needs to be a client
component — pushing the boundary down keeps the server-rendered tree larger.

Never add `"use client"` to a section component to get one interactive detail.
Extract the detail.

## Image discipline

Rules from `AGENTS.md`, all currently satisfied:

- Render with `next/image`, never a bare `<img>`.
- Always pass `sizes` alongside `fill`. Fixed `width`/`height` needs no `sizes`
  — `trust-strip.tsx` is correct as written.
- `priority` only above the fold. Exactly one use today,
  `company-page.tsx:118`, correctly paired with a `sizes` value.
- Photographs and renders are WebP; diagrams, icons, and logos are SVG.
- A committed raster stays well under 200 KB. `next.config.ts` generates AVIF
  and WebP derivatives on delivery — that is not licence to commit a heavy
  source.

Converting: aim for the result achieved on the company story render, 1.48 MB
down to 41 KB. If a converted file is still over 200 KB it has not really been
converted.

## Layout stability

CLS is mostly a function of reserved space:

- Every `next/image` needs intrinsic `width`/`height` or `fill` inside a sized
  container.
- Fonts load through `next/font`, which handles `font-display`. Do not add a
  `<link>` to a font CDN.
- Avoid content that appears after hydration and pushes layout — the consent
  banner should overlay, not insert.

## In-browser check

With a dev server running and the `claude-in-chrome` skill loaded:

```js
JSON.stringify({
  lcp: performance.getEntriesByType('largest-contentful-paint').slice(-1)[0]?.startTime,
  cls: performance.getEntriesByType('layout-shift').filter(e=>!e.hadRecentInput).reduce((s,e)=>s+e.value,0),
  transferKB: Math.round(performance.getEntriesByType('resource').reduce((s,r)=>s+r.transferSize,0)/1024),
  scripts: performance.getEntriesByType('resource').filter(r=>r.initiatorType==='script').length,
}, null, 1)
```

Dev-server numbers are not production numbers — they carry the dev overlay,
unminified bundles, and no caching. Use them to compare **before against after**
on the same server, never as an absolute score. Report them as dev figures.

## Do not

- Do not add a dependency to solve something the platform does. `AGENTS.md`
  requires justification for large dependencies.
- Do not add an animation library. `SPEC-003` bars Three.js, WebGL, and GSAP.
- Do not chase a Lighthouse number by removing content that earns its place.
- Do not report a dev-server measurement as a production result.

## Before you finish

Report every baseline number before and after. If nothing moved, say so — "no
regression" is the expected outcome on most passes and is worth stating plainly
rather than dressing up.

Gate: `npm run lint && npm run typecheck && npm run test && npm run build`.
