# KAMMAND UI Refactor Plan

Status: Proposed plan only. No refactor performed.
Date: 2026-08-17

## Objective

Normalize the current KAMMAND UI without redesigning Direction A. The goal is to reduce drift, formalize primitives, and make future page implementation predictable across homepage, services, frameworks, industries, insights, company, contact, booking, legal and consent surfaces.

## Phase A: Design-System / Token Normalization

- P0: Preserve `SPEC-001-DESIGN-SYSTEM.md` and `app/globals.css` as the source of truth. Do not introduce a new visual direction.
- P1: Separate foundational tokens from page/component CSS. Keep `globals.css` for tokens, global resets and truly shared primitive classes; move page-family styles toward component-scoped patterns or governed shared classes.
- P1: Add a small semantic z-index token set for header, mobile nav, cookie banner and dialogs.
- P1: Define compact heading variants for list/card/editorial row titles so H3s no longer rely on ad hoc H4-size overrides.
- P1: Define named rhythm roles: page header, section, section header, grid, list item, card item, CTA block and form group.
- P2: Define dark-section border/muted-line patterns to reduce repeated `color-mix` values.
- P2: Document allowed component-specific geometry exceptions for diagrams, icons, circular nodes and table minimum widths.
- P3: Audit whether `container-wide` is needed and expose it through the `Container` primitive if retained.

## Phase B: Shared UI Primitives

- P1: Create a `PageHeader` primitive for breadcrumbs, eyebrow, H1, lead copy and actions.
- P1: Refactor `SectionHeading` into the default section-header primitive and migrate local section headers to it.
- P1: Create `Stack` and `Grid` primitives or governed class patterns for repeated vertical rhythm and responsive grids.
- P1: Create `LinkButton` or extend button primitives for Next.js links using approved button variants.
- P1: Create `TextLink` for arrow affordances and editorial inline actions.
- P1: Create `Card` or `EditorialLinkCard` for internal link cards with strict variants.
- P2: Create `Eyebrow`, `Divider`, `FrameworkLinkList`, `RelatedLinkList` and `TechnicalList` primitives if migration confirms repeated usage.
- P2: Create `IconMark` for restrained decorative technical marks.
- P3: Keep specialized diagram components bespoke, but document geometry and motion rules.

## Phase C: Typography / Spacing Migration

- P1: Replace `.homepage-hero__title` local clamp with an approved hero heading role or documented H1 variant.
- P1: Normalize list/card H3 visual size through a named typography class or primitive prop.
- P1: Replace local max-width values with semantic heading/reading width tokens where possible.
- P1: Normalize internal page H1 wrapping rules. Avoid `overflow-wrap: anywhere` as a broad default unless visual QA confirms acceptable wrapping.
- P2: Normalize heading-to-copy and copy-to-CTA gaps across homepage and internal pages.
- P2: Normalize article body and callout heading hierarchy through article primitives.
- P3: Review all mono label usage to ensure IBM Plex Mono is not overused for ordinary prose.

## Phase D: Responsive / Mobile Normalization

- P1: Run browser QA at 320, 375, 390, 430, 640, 768, 820, 1024, 1280, 1440 and 1920 after primitive migration.
- P1: Audit long internal H1 wrapping across all page families.
- P1: Review framework-control and GRC orbit visualization scale on 320-430 and 768-820.
- P1: Review cookie registry horizontal table behavior at 320 and 375.
- P1: Confirm mobile menu, consent dialog and Calendly consent flow maintain focus order and no overflow.
- P2: Normalize mobile CTA stacking and button width behavior across final CTAs, page headers and forms.
- P2: Review tablet transition points for internal split grids and two-column detail layouts.
- P3: Add visual regression screenshots for representative pages if project process allows.

## Phase E: Page-by-Page UI/UX Refinement

- P1: Homepage: review hero, framework intelligence, capabilities, process, insights and final CTA for rhythm consistency after primitives.
- P1: Services: confirm overview and detail pages feel editorial rather than repetitive template pages.
- P1: Frameworks: preserve conservative regulatory content while improving technical hierarchy and source/reference readability.
- P1: Industries: reduce repeated service/framework list density and verify each page feels differentiated.
- P2: Insights: verify empty state, index and future article template typography before publishing articles.
- P2: Company/Security: ensure credibility pages do not feel sparse or generic without fabricated facts.
- P2: Contact/Book: review form density, consent states and booking fallback.
- P2: Legal/Privacy/Cookies/Terms/Accessibility: keep utility pages readable without making them visually over-designed.

## Phase F: Motion Refinement

- P1: Apply `kammand-motion-guardian` to every animation in `globals.css`.
- P1: Remove or simplify reveal animations that do not communicate meaning.
- P1: Review the framework progress node glow and either document it as a meaningful state indicator or remove it.
- P2: Keep process and framework motion meaningful, one-shot and reduced-motion safe.
- P2: Standardize arrow affordance movement across text links and editorial rows.
- P3: Consider disabling non-essential list reveals on low-power/mobile contexts if visual QA finds distraction.

## Phase G: Final Visual QA

- P1: Use `kammand-visual-qa` after primitives and responsive fixes.
- P1: Screenshot review representative routes at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920.
- P1: Check dark/light transitions, heading widths, list density, button dimensions, footer stacking and consent overlays.
- P2: Classify any remaining subjective refinements as KEEP, REFINE, REDESIGN or REMOVE.
- P3: Document approved exceptions so future page builds do not reopen settled decisions.

## Recommended Implementation Order

1. P1: Token/rhythm/z-index normalization plan and design-guardian pass.
2. P1: PageHeader, SectionHeading, Stack/Grid and LinkButton primitives.
3. P1: Migrate internal page headers and section headers.
4. P1: Normalize card/list heading variants and related-link patterns.
5. P1: Mobile H1 and diagram/table responsive audit.
6. P1: Motion audit and simplification.
7. P2: Page-family UX refinement for services, frameworks and industries.
8. P2: Contact, booking, legal and consent utility UI refinement.
9. P2: Whole-site responsive/accessibility QA.
10. P3: Final visual QA documentation and approved exceptions list.

## Non-Goals

- Do not redesign Direction A.
- Do not introduce new colors, font families, shadows, radii or decorative systems without a spec update.
- Do not rebuild page content or create new routes during the governance refactor.
- Do not fabricate trust claims, proof, clients, certifications, statistics or regulatory endorsements.
