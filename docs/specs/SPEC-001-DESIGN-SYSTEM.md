# SPEC-001 - KAMMAND Design System

Status: Approved for implementation
Project: KAMMAND Security
Version: 2.0
Approved visual direction: Direction A

## 1. Purpose

Create the reusable visual, typographic, layout, accessibility, and interaction foundation for the KAMMAND Security website.

The system must communicate risk, governance, evidence, control, remediation, audit readiness, and regulatory clarity for regulated GCC organizations.

This specification replaces the previous Midnight Navy direction. Previous dark-first color decisions are rejected where they conflict with this document.

## 2. Brand Personality

KAMMAND should feel:

- precise
- calm
- premium
- technical
- trustworthy
- editorial where appropriate
- restrained
- serious without looking cold or generic

The brand should not feel like a generic AI startup, a cyberpunk security vendor, or a stock compliance template.

## 3. Visual Principles

- Use an arctic/light canvas as the primary website background.
- Use deep navy technical sections for contrast, diagrams, dense framework mapping, and high-signal technical content.
- Use cobalt/electric blue only for meaningful action, state, focus, and diagram relationships.
- Use high whitespace and strong typographic hierarchy before shadows or decoration.
- Use restrained borders to define structure.
- Use technical diagrams, framework mapping, control relationships, and evidence flows as the visual language.
- Avoid gradients as a default treatment.
- Avoid purple, glassmorphism, cyberpunk styling, generic shield imagery, and decorative glow.

## 4. Color System

All implementation must use semantic CSS variables. Page authors must not introduce arbitrary colors.

### Primary Light Background

`--color-bg: #F7FAFC`

Primary page canvas.

`--color-bg-subtle: #EEF4F8`

Subtle section alternation, table grouping, and quiet background separation.

`--color-surface: #FFFFFF`

Cards, panels, forms, and content surfaces on the light canvas.

`--color-surface-elevated: #FDFEFF`

Raised or active surfaces where elevation is needed without heavy shadow.

### Light Text

`--color-text: #0B1623`

Primary text on light backgrounds.

`--color-text-secondary: #435367`

Secondary copy, descriptions, helper text.

`--color-text-muted: #6F7F91`

Metadata, captions, disabled-adjacent copy.

### Borders

`--color-border: rgba(11, 22, 35, 0.12)`

Default borders.

`--color-border-strong: rgba(11, 22, 35, 0.22)`

Emphasized dividers, selected states, and high-density tables.

### Dark Technical Sections

`--color-ink: #07111F`

Deep navy technical section background.

`--color-ink-elevated: #0D1B2D`

Cards, panels, and diagram surfaces inside dark technical sections.

`--color-ink-text: #F4F8FC`

Primary text on ink backgrounds.

`--color-ink-text-muted: #9DB0C5`

Secondary text and metadata on ink backgrounds.

### Accent

`--color-accent: #155EEF`

Primary cobalt/electric blue for actions, active states, links, focus, and meaningful diagram relationships.

`--color-accent-hover: #004EEB`

Hover and pressed emphasis for accent controls.

`--color-accent-soft: rgba(21, 94, 239, 0.10)`

Subtle selected states, quiet diagram fills, focus backgrounds, and non-decorative emphasis.

Blue must remain controlled. It should not become a decorative glow or page-wide tint.

### Semantic Status

`--color-success: #167A4A`

Use only for confirmed success, completion, or positive state.

`--color-warning: #B7791F`

Use only for warnings, required attention, or unresolved review states.

`--color-danger: #C2413A`

Use only for errors, risks, destructive actions, or exposure.

Do not use semantic colors decoratively.

## 5. Typography

### Font Families

Display and headings: Fraunces, or the closest currently available approved serif.

Body and UI: Inter.

Technical labels: IBM Plex Mono.

### Heading Hierarchy

Every page must use the shared heading system. Page authors must not invent arbitrary heading sizes.

Display:
`clamp(4rem, 8vw, 7rem)`

Use only for rare editorial or hero-scale moments. Display text is not a substitute for semantic heading structure.

H1:
`clamp(3rem, 6vw, 5.75rem)`

Exactly one logical H1 per page.

H2:
`clamp(2.25rem, 4vw, 4rem)`

Defines major page sections.

H3:
`clamp(1.5rem, 2.25vw, 2.25rem)`

Subsections under H2s.

H4:
`1.25rem`

Small component-level headings where semantically needed.

### Body Sizes

Body large:
`1.125rem`

Body:
`1rem`

Body small:
`0.875rem`

Caption:
`0.8125rem`

### Label Styles

Eyebrow:
`0.75rem`, IBM Plex Mono, 600 weight, uppercase, `0.08em` letter spacing.

Mono label:
`0.75rem`, IBM Plex Mono, 500 weight, uppercase, `0.06em` letter spacing.

Framework labels:
IBM Plex Mono, 500 weight, uppercase when abbreviated, no invented heading semantics.

### Line Heights

Display:
`0.95`

H1:
`1.0`

H2:
`1.05`

H3:
`1.15`

Body:
`1.65`

Small text and labels:
`1.45`

### Letter Spacing

- Serif display and headings: `-0.01em` maximum.
- Body and UI text: `0`.
- Technical labels: `0.06em` to `0.08em`.
- Do not use wide tracking for paragraphs or navigation.

### Text Widths

Maximum reading width:
`68ch`

Narrow reading width:
`52ch`

Headings should generally not exceed:
`12ch` for display/H1, `16ch` for H2, and `28ch` for H3 unless layout requires otherwise.

## 6. Layout

Maximum content width:
`1280px`

Wide content width:
`1440px`

Page padding:

- Mobile 320-639: `20px`
- Tablet 640-1023: `24px`
- Desktop 1024-1439: `32px`
- Large desktop 1440+: `40px`

Major content must align to the shared container unless a spec explicitly defines a full-bleed visual or technical diagram.

## 7. Grid System

- Mobile: 4 columns
- Tablet: 8 columns
- Desktop: 12 columns
- Large desktop: 12 columns with wider margins

Use grid alignment for major sections, framework comparisons, cards, and technical diagrams. Do not position major content arbitrarily.

## 8. Breakpoints

- Mobile: 320-639
- Tablet: 640-1023
- Desktop: 1024-1439
- Large desktop: 1440+

Layouts must be intentionally designed for each category.

## 9. Spacing Scale

Use:

`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 144`

Avoid arbitrary spacing values.

## 10. Section Spacing

- Mobile: `72px`
- Tablet: `96px`
- Desktop: `120px`
- Large desktop: `144px`

Use high whitespace. Do not compress sections to show more content above the fold.

## 11. Cards

Cards should use surface color, spacing, border, and typographic hierarchy before shadow.

Light cards:

- background: `--color-surface`
- border: `1px solid var(--color-border)`
- radius: `var(--radius-md)`
- shadow: none by default

Dark technical cards:

- background: `--color-ink-elevated`
- border: subtle light border token used through section-local variables
- shadow: none by default

Do not make every section a card.

## 12. Border Radius

KAMMAND should remain structured, not soft or playful.

- Small: `4px`
- Medium/default: `6px`
- Large: `10px`
- Pill: `999px`, only for compact tags or badges

Buttons must not look like giant pills.

## 13. Shadows

Use shadows sparingly.

Default card shadows are not allowed.

Permitted shadows:

- sticky navigation
- dropdowns
- modals
- elevated interaction states

No neon shadows, glow fields, or decorative halos.

## 14. Buttons

Use buttons for actions. Use links for navigation.

Primary:

- background: `--color-accent`
- text: white
- hover: `--color-accent-hover`
- height: minimum `48px`
- radius: `var(--radius-md)`
- padding: `0 22px`

Secondary:

- background: transparent or `--color-surface`
- text: `--color-text`
- border: `--color-border`
- hover: `--color-bg-subtle`

Text action:

- no container
- accent text
- directional indicator allowed
- minimum touch target must still be practical

Button labels must be clear actions such as "Book a consultation" or "Explore capabilities". CTA labels must not be headings.

## 15. Links

Links must be descriptive. Avoid "click here".

Inline links use text color plus underline or accent state. Do not rely on color alone.

Navigation links must be links, not buttons.

## 16. Framework Labels and Tags

Framework labels identify systems such as SAMA CSF, NCA ECC, PDPL, and ISO 27001.

Use IBM Plex Mono.

Labels should not automatically become headings unless they introduce a semantic subsection.

Use accent only for active, selected, or mapped framework states.

## 17. Forms

Inputs:

- background: `--color-surface`
- text: `--color-text`
- border: `--color-border`
- minimum height: `48px`
- radius: `var(--radius-md)`

Labels must be visible and must not rely on placeholders.

Focus state must use accent border or ring.

Errors must use `--color-danger` and accessible text.

## 18. Icons

Use Lucide icons where generic UI icons are required.

Rules:

- simple line icons
- consistent stroke width
- no filled cartoon icons
- no decorative icon overload
- no generic shields, locks, hackers, binary rain, glowing globes, or circuit-board cliches

Custom SVG is preferred for KAMMAND-specific control, evidence, and framework mapping concepts.

## 19. Technical Diagrams

Technical diagrams should explain:

- framework relationships
- control mapping
- risk movement
- evidence flow
- remediation progress
- audit readiness

Use:

- nodes
- paths
- boundaries
- control gates
- evidence markers
- status relationships

Use blue for meaningful relationships and active states only.

Diagrams must not be decorative dashboards, random particles, fake terminal windows, or meaningless network visuals.

## 20. Motion

Motion must explain GRC, framework relationships, state change, or attention priority.

Preferred motion:

- opacity
- transform
- SVG path animation
- stroke-dashoffset
- progressive reveal
- scroll-linked state changes only where justified

Avoid:

- bouncing
- elastic motion
- excessive springs
- random particles
- layout thrashing
- continuous animation without meaning

Motion tokens:

- Micro interaction: `160ms`
- Standard transition: `220ms`
- Section reveal: `420ms`
- Technical diagram transition: `900ms`
- Default easing: `cubic-bezier(0.22, 1, 0.36, 1)`

## 21. Reduced Motion

All motion must respect `prefers-reduced-motion`.

Reduced-motion equivalents should preserve meaning through static state, opacity changes, or immediate visibility.

Continuous animation must stop under reduced motion.

## 22. Responsive Principles

Mobile is not a shrunken desktop.

Mobile 320-639:

- 4-column grid
- 20px page padding
- stacked cards
- reduced section spacing
- touch targets at least 44px

Tablet 640-1023:

- 8-column grid
- 24px page padding
- selective two-column layouts where readable

Desktop 1024-1439:

- 12-column grid
- 32px page padding
- multi-column layouts when content relationships justify them

Large desktop 1440+:

- 40px page padding
- max-width constraints remain active
- do not stretch reading text

All viewports:

- no horizontal overflow
- no hover-only information
- visible focus states
- readable line lengths
- card stacking must remain intentional
- headings must scale through the approved clamps

Navigation expectations are defined here only as foundation:

- desktop navigation may be horizontal
- mobile navigation must use practical touch targets
- navigation must not rely on hover

## 23. Accessibility

Target WCAG 2.2 AA.

Requirements:

- semantic HTML by default
- keyboard accessible interactions
- visible keyboard focus
- sufficient contrast
- logical heading hierarchy
- accessible names for controls
- form labels and errors
- meaningful alt text for informative images
- decorative visuals hidden from assistive technology where appropriate
- reduced-motion support

## 24. SEO and Content Hierarchy

Every page must have exactly one logical H1.

H2s define major page sections.

H3s sit under H2 sections.

Do not skip heading levels without a clear semantic reason.

Do not use headings purely for styling.

CTA labels must not be headings.

Framework names in tables or cards should not automatically become headings unless semantically appropriate.

Use descriptive link text. Avoid "click here".

Use buttons for actions and links for navigation.

Do not add hidden keyword stuffing.

Do not duplicate visible heading text solely for SEO.

Do not misuse headings to solve layout or visual styling.

Meaningful alt text is required for informative images. Decorative visuals should be hidden from assistive technology where appropriate.

## 25. Anti-Patterns

Do not use:

- purple AI gradients
- decorative teal
- glassmorphism
- generic cyberpunk styling
- neon glow
- stock hacker imagery
- generic shields and locks
- arbitrary colors
- excessive rounded cards
- decorative dashboards
- random animated particles
- meaningless 3D graphics
- fake trust claims
- fake certifications
- fake statistics
- fake customers
- hidden SEO keyword stuffing

## 26. Definition of Done

SPEC-001 is complete only when:

- this specification is the authoritative design-system source
- global tokens match Direction A
- typography uses Fraunces, Inter, and IBM Plex Mono
- heading sizes, line heights, letter spacing, and text widths are tokenized
- color tokens use semantic names
- light and dark technical section systems are defined
- responsive container and section spacing utilities exist
- focus and selection states exist
- reduced-motion support exists
- no arbitrary colors are introduced in foundational styles
- no homepage, navigation, footer, forms, Calendly, framework table, or animations are built as part of SPEC-001
- lint passes
- typecheck passes when configured
- tests pass when configured
- production build passes
