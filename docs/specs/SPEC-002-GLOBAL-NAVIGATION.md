
# SPEC-002 - Global Header and Navigation

Status: Approved for implementation
Project: KAMMAND Security
Version: 1.0
Depends on: SPEC-001 - KAMMAND Design System

## 1. Purpose

Build KAMMAND's global desktop and mobile navigation.

The navigation must communicate premium cybersecurity and GRC advisory, clarity, confidence, restraint, and technical credibility.

The implementation must follow the approved Direction A design system. Do not redesign SPEC-001.

## 2. Source of Truth

`docs/specs/SPEC-001-DESIGN-SYSTEM.md` is the authoritative design-system source.

`app/globals.css` is the authoritative implementation of foundational tokens.

SPEC-002 may define navigation structure and behavior, but it must not introduce new brand colors, typography scales, radii, spacing systems, or decorative visual styles.

## 3. Desktop Navigation

Desktop navigation uses semantic `<header>` and `<nav>` markup.

Structure:

- Left: KAMMAND logo or wordmark linking to `/`
- Navigation links:
  - Services -> `/services`
  - Frameworks -> `/frameworks`
  - Industries -> `/industries`
  - Insights -> `/insights`
  - Company -> `/company`
- Primary CTA:
  - Book a Consultation -> `/book`

Do not use `#` placeholder links.

Navigation links must remain standard crawlable links.

The header must not contain an H1.

## 4. Desktop Visual Behavior

The desktop header should feel light, precise, minimal, spacious, and professional.

Requirements:

- restrained height
- clear wordmark
- clean navigation spacing
- cobalt primary CTA through existing accent tokens
- subtle hover states
- visible keyboard focus
- no oversized pill navigation
- no glassmorphism
- no excessive shadow
- no decorative gradient

## 5. Header Positioning

Use a sticky header.

The header should remain available while navigating long pages.

The sticky treatment must remain restrained. Use a subtle border and stable surface treatment for separation.

Do not use blur, glass effects, dramatic shadows, or layout shifts when sticky behavior applies.

## 6. Mobile Navigation

At mobile and tablet widths below the desktop breakpoint, replace desktop navigation with:

- KAMMAND wordmark linking to `/`
- Accessible menu trigger

Opening the menu exposes:

- Services
- Frameworks
- Industries
- Insights
- Company
- Book a Consultation

The CTA must remain visually distinct.

## 7. Mobile Menu Design

Do not create a tiny dropdown.

Use a full-width or near-full viewport navigation panel.

Requirements:

- clear hierarchy
- generous touch targets
- no cramped links
- obvious close control
- CTA clearly visible
- works at 320px width
- no horizontal overflow
- no unnecessary animation

## 8. Mobile Menu Accessibility

The menu must support:

- semantic button trigger
- `aria-expanded`
- `aria-controls`
- clear accessible name
- keyboard operation
- Escape closes menu
- appropriate overlay or panel focus behavior
- focus returns to trigger after closing where appropriate
- menu closes after selecting a navigation destination
- body scroll handled while open

Do not implement clickable div controls.

## 9. Responsive Behavior

Follow SPEC-001 breakpoints.

Check at minimum:

- 320px
- 375px
- 640px
- 768px
- 1024px
- 1280px
- 1440px

Requirements:

- no navigation collision
- no text clipping
- no horizontal scrolling
- no undersized touch targets
- no hover-only information

## 10. Motion

Use only restrained navigation motion:

- menu reveal
- subtle link transition
- subtle CTA transition

Use existing motion tokens.

Respect `prefers-reduced-motion`.

Do not introduce bouncing, elastic transitions, decorative particles, or exaggerated menu animation.

## 11. Component Architecture

Use reusable layout components:

- `components/layout/site-header.tsx`
- `components/layout/desktop-navigation.tsx`
- `components/layout/mobile-navigation.tsx`

Keep Server Components by default.

Only the interactive mobile navigation component may be a Client Component.

Do not turn the root layout or entire header into a Client Component.

## 12. Logo

Use an approved KAMMAND logo asset if one exists.

If no approved asset exists, use a restrained text-based KAMMAND wordmark temporarily.

Do not invent a new logo, generate a shield, or create a permanent substitute mark.

## 13. SEO and Semantics

Use:

- `<header>`
- `<nav>`
- descriptive link labels
- accessible logo/home link name

Do not:

- put an H1 in the header
- hide SEO text inside navigation
- duplicate navigation purely for search engines
- use headings for CTA labels

## 14. Performance

Avoid unnecessary JavaScript.

Do not install a navigation/menu library.

Do not add animation libraries for the header.

Use CSS and minimal React state where sufficient.

## 15. Out of Scope

Do not build:

- homepage hero
- framework section
- services section
- process section
- industries section
- insights section
- footer
- Calendly
- contact forms
- cookie banner

Do not modify homepage content except where necessary to mount or test the global header.

## 16. Testing

Add tests that verify:

- desktop navigation links
- CTA destination
- mobile menu opens
- mobile menu closes
- Escape closes the menu
- `aria-expanded` changes correctly
- accessible names exist

## 17. Definition of Done

SPEC-002 is complete only when:

- this spec exists
- global header is mounted in the root layout
- desktop navigation uses the approved routes
- mobile navigation is accessible and keyboard operable
- header contains no H1
- no placeholder links are used
- no arbitrary colors or visual styles are introduced
- no out-of-scope page sections are built
- tests cover core navigation behavior
- lint passes
- typecheck passes
- tests pass
- production build passes
