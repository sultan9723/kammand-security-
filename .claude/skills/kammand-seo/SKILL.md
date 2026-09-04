---
name: kammand-seo
description: Keep KAMMAND's metadata, structured data and internal linking correct and honest - per-route title, description, canonical, OpenGraph and Twitter cards, JSON-LD restricted to verifiable fields, sitemap and robots, and descriptive link text. Use when adding a route, changing page copy that metadata mirrors, or before a release. Implements SPEC-010.
---

# KAMMAND SEO

`SPEC-010-SEO.md` is approved and authoritative. This skill implements it.

The starting position is strong: **all 30 routes define `metadata` with an
`alternates.canonical` and an `openGraph` block**, every URL is derived from
`NEXT_PUBLIC_SITE_URL` through `getAbsoluteUrl`, and `sitemap.ts` and
`robots.ts` both exist and are environment-aware. Coverage is not the problem.

So this skill is about **quality and honesty**, not filling gaps — with one
genuine gap noted below.

## The honesty rule comes first

`SPEC-010 §5` restricts JSON-LD to `ProfessionalService` and `Organization`
with only verifiable fields, and explicitly forbids `Article` structured data
for planned insights. Structured data is a machine-readable claim, and the
`AGENTS.md` no-fabrication rules apply to it exactly as they apply to visible
copy — arguably harder, since a search engine will repeat it.

Never emit: `aggregateRating`, `review`, `award`, `hasCredential`,
`foundingDate`, `numberOfEmployees`, addresses, phone numbers, or social
profiles unless each is verified. `app/page.test.tsx` already asserts the
absence of `aggregateRating` and `review` — extend that pattern to any new
structured data.

See `kammand-content-integrity` for classifying the underlying claim.

## Detect

```
# metadata coverage — expect 0 output from both
for p in $(find app -name "page.tsx"); do grep -q "canonical" "$p" || echo "no canonical: ${p#app}"; done
for p in $(find app -name "page.tsx"); do grep -qE "export (const|async function) (metadata|generateMetadata)" "$p" || echo "no metadata: ${p#app}"; done

# per-route Twitter cards — currently only the homepage has its own
grep -rln "twitter:" app --include=page.tsx

# JSON-LD coverage
grep -rln "application/ld+json" app --include=page.tsx | wc -l

# forbidden structured-data fields — must return nothing
grep -rnE "aggregateRating|\"review\"|foundingDate|numberOfEmployees|award" app lib --include=*.ts --include=*.tsx | grep -v "\.test\."

# non-descriptive link text
grep -rniE ">(click here|read more|learn more|here)<" app components --include=*.tsx
```

## Thresholds

| Check | Threshold | Repo at last audit |
|-------|-----------|--------------------|
| Routes without `metadata` | 0 | 0 |
| Routes without `alternates.canonical` | 0 | 0 |
| Routes with their own `twitter` block | ideally all | **1 of 30** |
| Forbidden JSON-LD fields | 0 | 0 — hold this line |
| Hardcoded production domain | 0 | 0 — all env-derived |
| `h1` per route | exactly 1 | 1 |
| Non-descriptive link text | 0 | check |

## The real gap: per-route Twitter cards

Only `app/page.tsx` defines its own `twitter` field. The other 29 routes fall
back to the site-wide default in `app/layout.tsx:44-48`, so sharing
`/services/virtual-ciso` on X shows the generic homepage title and description
instead of the page's own.

`SPEC-010 §4` asks only for "a restrained OpenGraph and Twitter foundation" and
does not mandate per-page cards, so this is **not a spec violation** — it is a
real content gap worth fixing. Each route already has a correct `title` and
`description`; the fix is to mirror them into `twitter`, following the shape in
`app/page.tsx:26-29`.

Do not invent new copy for it. Metadata mirrors the page's existing approved
title and description; if it says something the page does not, that is a defect,
not optimisation.

## Hub pages and JSON-LD

Three hub pages emit no JSON-LD: `app/frameworks/page.tsx`,
`app/industries/page.tsx`, `app/insights/page.tsx`. Detail pages all do.

This may well be correct — `SPEC-010 §6` defers breadcrumbs to a future
template phase, and there is no approved `CollectionPage` shape. **Flag it, do
not fix it unilaterally.** Adding a structured-data type the spec has not
approved is the same class of mistake as inventing a design token.

## Titles and descriptions

- Title pattern is `{Page} | KAMMAND Security`.
- The homepage description is a fixed approved string in `SPEC-010`:
  `Strategic GRC and cybersecurity advisory for regulated organizations across
  the GCC.` It lives in `siteConfig.description` (`lib/site.ts:4`) and is
  asserted by the homepage JSON-LD test.
  **Note:** the hero's visible subheading no longer matches this string. That
  divergence is intentional — the hero was repositioned in `SPEC-003 v1.1`
  while `siteConfig.description` remains the approved site-level description.
  Do not "resynchronise" them without a spec change.
- Descriptions describe the page, are not keyword-stuffed, and do not make
  claims the page cannot support.

## Internal linking

- Descriptive anchor text; `AGENTS.md` bars "click here".
- Links for navigation, buttons for actions.
- No `href="#"` or JavaScript pseudo-links.
- Every framework, service, and industry named in copy should reach its page.
  `CRFR` is currently named in the hero with no page behind it — a linking gap
  and a content-integrity issue at once.

## Do not

- Do not add structured-data types beyond what `SPEC-010` approves.
- Do not hardcode a production domain. Everything derives from
  `NEXT_PUBLIC_SITE_URL`; `robots.ts` deliberately disallows all when
  `VERCEL_ENV` is not `production`.
- Do not write metadata that diverges from the page's visible content.
- Do not add `Article` structured data to insights. `SPEC-010` forbids it.

## Before you finish

Report metadata coverage before and after, any structured data added with the
verifiable field backing each property, and any claim you declined to emit.

Gate: `npm run lint && npm run typecheck && npm run test && npm run build`.
