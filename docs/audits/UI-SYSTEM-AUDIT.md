# KAMMAND UI System Audit

Status: Findings only. No visual refactor performed.
Date: 2026-08-17
Scope: Current KAMMAND implementation through the completed public route families present in the repository.

## Sources Reviewed

- `kammand-security/AGENTS.md`
- `docs/KAMMAND-MASTER-SPEC.md`
- `docs/specs/SPEC-001-DESIGN-SYSTEM.md`
- Completed specs present in `docs/specs`
- `kammand-security/app/globals.css`
- `kammand-security/app/layout.tsx`
- Homepage and major templates under `kammand-security/components/sections`
- Shared UI primitives under `kammand-security/components/ui`
- Existing KAMMAND skills under `C:\Users\DELL\.codex\skills`

## Executive Summary

The site broadly follows Direction A: arctic/light canvas, deep ink sections, cobalt accent, Fraunces headings, Inter body/UI, IBM Plex Mono labels, restrained borders, and conservative claims.

The main governance risk is not a rejected visual direction. The risk is drift caused by a large, page-specific `globals.css` file where homepage, internal pages, cards, editorial rows, forms, consent UI, diagrams, and legal tables all define their own geometry, spacing, heading overrides, and responsive behavior. The system has useful primitives, but many templates still bypass them.

## 1. Typography

- PASS WITH NOTES: Global typography tokens exist for display, H1, H2, H3, H4, body, labels, line heights, letter spacing and reading widths.
- P1: Homepage hero overrides H1 sizing with a local clamp in `app/globals.css:563-566`, creating a second H1 scale outside the global H1 token.
- P1: Service cards, process steps, insight entries, internal link cards, legal sections and consent dialog headings repeatedly override semantic heading sizes locally in `app/globals.css:1577-1580`, `1692-1695`, `1757-1760`, `2093-2096`, `2522-2523`, and `2633-2635`.
- P2: Several internal section headers use local max-width values such as `760px`, `820px`, `880px`, `13ch`, `18ch`, `22ch`, and `34ch`, which weakens a single heading-width system.

## 2. Heading Scales

- PASS WITH NOTES: Base heading tokens are defined and applied globally.
- P1: Local heading scale overrides use H4 token for H3 content in repeated list/card contexts. This may be intentional editorial density, but it should become an explicit primitive variant rather than scattered CSS.
- P2: Article callout uses `h2` styled down to H4 in `app/globals.css:1846-1849`; semantic level and visual role should be governed by an article primitive.

## 3. Heading Semantics

- PASS WITH NOTES: Templates generally maintain one H1 and logical H2/H3 hierarchies.
- P2: Some two-column template sections contain multiple H2s under one `aria-labelledby` section, for example service, framework, industry, company, contact and security detail patterns. This is not necessarily invalid, but section labeling and outline consistency should be reviewed.
- P2: Footer labels correctly avoid headings and use paragraph labels.

## 4. Paragraph Widths

- PASS WITH NOTES: Reading width tokens exist and most body copy uses them.
- P2: Internal hero content and section headers use local pixel widths rather than named reading or heading roles.
- P2: Technical lists and relationship cards can create uneven reading lengths across internal templates at tablet widths.

## 5. Section Spacing

- PASS WITH NOTES: `--section-spacing` responds at 640, 1024 and 1440.
- P1: Internal hero uses `padding-block: var(--space-12) var(--section-spacing)` and then overrides desktop top padding, creating a separate page-header rhythm from generic sections.
- P2: Homepage hero uses local top/bottom values instead of `.section`, while final CTA, technical sections and internal pages use different rhythm conventions.

## 6. Component Spacing

- P1: Repeated card/list spacing is defined locally across `.service-item`, `.internal-link-card`, `.insight-entry`, `.compact-process`, `.activity-list`, `.related-service-list`, `.framework-link-list`, `.cookie-banner`, and forms.
- P2: The spacing scale is mostly used, but zero gaps, pixel geometry and fixed min-heights are repeated without a named primitive contract.

## 7. Containers

- PASS WITH NOTES: `Container` and `.container` exist and major sections use them.
- P2: `Container` only supports the default container. `container-wide` exists in CSS but has no matching primitive prop or component.
- P2: Internal page templates use consistent containers, but page header and editorial layouts are not formalized as primitives.

## 8. Grids

- PASS WITH NOTES: Layouts use CSS grid consistently.
- P1: Grid behavior is centralized in `globals.css` selectors rather than reusable primitives or section-scoped modules.
- P2: Repeated patterns exist for `internal-link-grid`, `internal-split`, `editorial-grid`, `detail-two-column`, `compact-process` and framework link lists. These should become governed layout primitives or documented component classes.

## 9. Breakpoints

- PASS WITH NOTES: The implementation follows the approved 640, 1024 and 1440 breakpoints.
- P2: Some mobile-specific CSS uses `max-width: 639px` for complex diagrams. That is acceptable but should be documented as a diagram behavior pattern.
- P2: No explicit 390/430 refinements exist; mobile composition depends mainly on 320-to-639 behavior.

## 10. Buttons

- PASS: `.ui-button` variants exist and are reused broadly.
- P2: Link-based buttons use classes directly rather than a LinkButton primitive, which can cause future variants to drift.
- P2: Text button and arrow affordances vary between `Explore`, `->`, and inline text patterns.

## 11. Links

- PASS: Navigation and route links are standard crawlable links. No obvious `#` placeholder links were found in reviewed templates.
- P2: Internal related-link treatments are repeated across framework, service, industry, company, legal and contact templates.

## 12. Cards

- PASS WITH NOTES: The site avoids heavy card walls and uses borders/separators.
- P1: `internal-link-card` behaves like a shared card primitive but lives only as global CSS and is used as a catch-all across services, frameworks, company and industries.
- P2: Cookie banner and consent dialog are legitimate elevated UI, but their card treatment should be explicitly separated from marketing/content cards.

## 13. Icons

- PASS WITH NOTES: The current implementation favors simple marks and custom SVG diagrams instead of stock shields/locks.
- P2: Service marks are simple CSS plus signs. They are restrained, but repeated technical mark rules should be governed as an icon/mark primitive if expanded.

## 14. Forms

- PASS WITH NOTES: Form labels, errors, focus states and token usage are present.
- P2: Form grid and field styling live entirely in global CSS. Future form fields should use shared primitives to avoid drift.
- P2: Consent and contact forms have related but separate button/action spacing.

## 15. Borders

- PASS WITH NOTES: Borders mostly use semantic tokens.
- P2: Many divider patterns repeat `border-top`, `border-bottom`, `border-left`, and section-local color-mix borders. These need named usage patterns.

## 16. Radii

- PASS WITH NOTES: Radius tokens are used for most UI.
- P2: Circular nodes and icon containers use `50%`, which is legitimate component geometry but should be exempted explicitly in governance.
- P2: Pill radius appears in process nodes and dots; acceptable geometry, but future content tags should be constrained.

## 17. Shadows

- PASS WITH NOTES: Shadows are restrained.
- P1: A cobalt glow exists on `.framework-motion__progress-node` in `app/globals.css:910`. This is small, but it conflicts with the anti-glow rule unless treated as a temporary technical-effect exception.
- P2: `--shadow-elevated` is used by the cookie banner, a legitimate overlay. Avoid expanding it to cards.

## 18. Dark Sections

- PASS WITH NOTES: Dark technical sections use ink tokens and muted text.
- P2: Dark sections are used for framework intelligence, final CTAs, framework technical sections and some industry challenge sections. This is directionally correct but rhythm between dark and light sections needs visual QA.

## 19. Light Sections

- PASS WITH NOTES: Light/arctic canvas dominates as intended.
- P2: Repeated light/subtle alternation risks creating a uniform template feel across services, frameworks, industries, company and legal pages.

## 20. Motion

- PASS WITH NOTES: Motion uses CSS, opacity, transform and SVG stroke operations with reduced-motion support.
- P1: Multiple content lists animate on entry by default (`service-item`, `process-step`, `insight-entry`) even where motion communicates little beyond reveal.
- P1: Framework visualization has significant staged animation and one glowing node; this needs motion governance to keep meaning clear and prevent drift.

## 21. Mobile Behavior

- NEEDS REVIEW: Static audit indicates mobile rules exist for key components, but no live viewport screenshots were captured in this task.
- P1: Complex framework visual uses fixed stage heights around 660px and 720px in places. This may dominate mobile or tablet viewports.
- P1: Cookie registry uses a horizontal-scroll table with `min-width: 860px`; this is acceptable for data tables but should be reviewed at 320px.
- P2: Long internal H1s use `overflow-wrap: anywhere`, which prevents overflow but can create awkward word breaks.

## 22. Tablet Behavior

- NEEDS REVIEW: Tablet layouts are mostly controlled at 640 and 1024.
- P2: Two-column layouts begin at 640 for several grids. Some editorial/detail content may become narrow at 640-820.
- P2: Framework and process visual transitions should be screenshot-reviewed at 768, 820 and 1024.

## 23. Desktop Behavior

- PASS WITH NOTES: Desktop has clear max-widths and 12-column-inspired layouts.
- P2: Multiple desktop grid ratios are locally encoded, making cross-page alignment hard to govern.

## 24. Arbitrary CSS Values

Common hard-coded values that should be reviewed:

- Pixel widths/heights: `440px`, `470px`, `500px`, `640px`, `660px`, `680px`, `720px`, `760px`, `820px`, `880px`, `860px`
- Geometry: `10.5px`, `0.625rem`, `1.35`, `36px`, `44px`, `136px`, `18px`, `11px`, `17px`, `18px`
- Local clamps: homepage hero and hero framework title
- Local grid ratios: `0.58fr`, `0.95fr`, `0.9fr`, `0.38fr`, `0.45fr`, `1.32fr`

Some of these are legitimate diagram/control geometry. Others should become semantic tokens or primitive variants.

## 25. Duplicated Styling

- P1: Internal page sections duplicate hero, editorial split, technical split, link-grid, related-list and final CTA patterns across service, framework, industry, company, contact and security templates.
- P1: Global CSS is acting as both token file and page stylesheet. This increases future drift risk.

## 26. Page-Specific Design Drift

- P1: Homepage sections have stronger bespoke visual systems than internal pages. Internal pages are consistent but risk feeling templated because many use the same section alternation and link-card/list patterns.
- P2: Legal, consent and operational pages are visually coherent but need separate governance so their utility UI does not bleed into marketing/editorial pages.

## Primitive Inventory

| Primitive | Status | Notes |
| --- | --- | --- |
| Container | EXISTS / GOOD | Default container exists. Needs wide variant support if `container-wide` remains approved. |
| Section | EXISTS / NEEDS REFACTOR | Exists, but many sections bypass it with local section classes. |
| Stack | MISSING / SHOULD CREATE | Repeated grid gaps suggest a Stack primitive or governed utility. |
| Grid | MISSING / SHOULD CREATE | Repeated two/three/four column layouts need a shared pattern. |
| Heading | MISSING / SHOULD CREATE | `SectionHeading` exists, but there is no general heading component for role/variant control. |
| Eyebrow | MISSING / SHOULD CREATE | CSS class exists but no primitive. |
| SectionHeader | EXISTS / NEEDS REFACTOR | `SectionHeading` exists but most sections use local header markup/classes. |
| Button | EXISTS / GOOD | Button component exists for real buttons; link buttons still use direct classes. |
| TextLink | MISSING / SHOULD CREATE | Repeated text/arrow link affordances need governance. |
| Card | MISSING / SHOULD CREATE | Internal link card/service/card-like patterns exist only in CSS. |
| Icon | MISSING / SHOULD CREATE | Decorative icon/technical mark rules are ad hoc. |
| Divider | MISSING / SHOULD CREATE | Border/divider usage repeats frequently. |
| PageHeader | MISSING / SHOULD CREATE | Internal hero pattern is repeated across major pages. |

## Token Audit

| Category | Coverage | Gap |
| --- | --- | --- |
| Colors | GOOD | Semantic colors exist. Need governance around `color-mix` usage and the glow effect. |
| Typography | GOOD / NEEDS VARIANTS | Core tokens exist. Need formal compact heading/list title variants. |
| Spacing | GOOD | Scale exists. Need named rhythm roles for page header, section header, grid, CTA, card/list item. |
| Containers | PARTIAL | Default and wide CSS tokens exist. Component supports default only. |
| Reading Width | GOOD | Tokens exist. Local widths should map to roles. |
| Grid | PARTIAL | Breakpoints exist, but no named grid primitives. |
| Radius | GOOD | Circle geometry should be documented as component-specific. |
| Border | PARTIAL | Basic tokens exist. Need dark-section border token or pattern. |
| Shadow | PARTIAL | One elevated shadow exists. Need explicit overlay-only rule. |
| Motion | GOOD / NEEDS GOVERNANCE | Durations/easing exist. Need animation-purpose policy and reduced-motion audit per component. |
| Z-index | MISSING / SHOULD CREATE | Header, mobile panel, cookie banner and dialogs use numeric z-index values. |
| Breakpoint Behavior | PARTIAL | Breakpoints exist in CSS, but no page-template rules for 390/430/820/1920 checks. |

## Typography Audit: Worst Offenders

1. P1: `.homepage-hero__title` local H1 clamp in `app/globals.css:563-566`.
2. P1: `.service-item h3`, `.process-step h3`, `.insight-entry h3`, `.internal-link-card h3` all style H3s down to H4-size across unrelated content contexts.
3. P2: `.internal-hero__content h1` uses `max-width: 13ch` and `overflow-wrap: anywhere`, which solves overflow but may create poor mobile word breaks.
4. P2: `.article-callout h2` is semantically H2 but visually H4-sized.
5. P2: Section headers use repeated local max-widths instead of semantic heading-width roles.

## Spacing Audit: Worst Offenders

1. P1: Page header rhythm differs from section rhythm without a named PageHeader primitive.
2. P1: Link-card/list item padding and gaps repeat across service, internal, insight and relationship patterns.
3. P2: Final CTA action spacing and form action spacing are similar but separately defined.
4. P2: Technical diagram stage heights and section gaps are bespoke and need documented geometry rules.
5. P2: Footer has its own spacing system that should be explicitly governed.

## Mobile System Audit

Static findings requiring screenshot/browser verification at 320, 375, 390 and 430:

- P1: Long internal H1s may wrap awkwardly due to `overflow-wrap: anywhere`.
- P1: Framework-control visualization stage height may overwhelm mobile flow.
- P1: Cookie registry intentionally scrolls horizontally; confirm the scroll container is obvious and does not cause page overflow.
- P2: CTAs are flex-wrapped, but long labels should be visually checked at 320.
- P2: Service/internal link lists are directly discoverable, but repeated card-like rows may feel dense on 320.
- P2: Two-column capability/framework lists at mobile may be tight with long labels.
- P2: Consent dialog max-height and bottom alignment should be checked at 320 and browser zoom.
- P2: Header mobile panel should be retested for focus restoration and scroll lock after future changes.
- P3: SVG labels may be small at 320; current CSS hides some secondary labels, but visual QA is still needed.
- P3: Section-to-section whitespace may be generous enough to create long scrolling on small devices.

## Anti-AI / Template Audit

| Finding | Classification | Notes |
| --- | --- | --- |
| Glassmorphism | KEEP | Not present in reviewed CSS. |
| Purple/AI gradients | KEEP | Not present. |
| Gradient usage | REFINE | One semantic half-fill indicator uses `linear-gradient`; acceptable if documented as state representation, not decoration. |
| Glow effect | REFINE | Small cobalt shadow on framework progress node conflicts with no-glow rule unless justified or removed. |
| Excessive cards | REFINE | No giant SaaS cards, but internal link-card patterns repeat heavily across pages. |
| Excessive pills | KEEP | Pills are mostly compact/status geometry, not dominant. |
| Generic shields/locks | KEEP | Not found as a repeated motif. |
| Fake dashboards | KEEP | Technical diagrams are custom and generally meaningful. |
| Repetitive icon-card grids | REFINE | Service/internal grids risk becoming repetitive as pages scale. |
| Excessive centered layouts | KEEP | Most layouts are left-aligned/editorial. |
| Excessive animation | REFINE | Several list reveal animations are decorative rather than explanatory. |
| Generic SaaS template feel | REDESIGN LATER | Internal pages share repeated section structures and link-card/list patterns that may need page-family refinement after primitives exist. |

## Skill Responsibility Workflow

Use skills in this order for future UI work:

1. `kammand-design-guardian`: controls design-system compliance.
2. `kammand-page-builder`: implements approved designs.
3. `kammand-motion-guardian`: controls animation and interaction.
4. `kammand-typography-spacing-auditor`: controls type and rhythm.
5. `kammand-responsive-qa`: controls functional responsive behavior.
6. `kammand-ui-ux-reviewer`: controls customer experience and usability.
7. `kammand-visual-qa`: controls final visual polish.
8. `kammand-release-check`: controls production readiness.

Responsibilities should not be duplicated. If a finding crosses boundaries, the first skill identifies the rule and the later skill verifies the implemented result.
