# SPEC-003 - Homepage Hero and Signature GRC Motion

Status: Approved for implementation
Project: KAMMAND Security
Version: 1.0
Depends on:
- SPEC-001 - KAMMAND Design System
- SPEC-002 - Global Header and Navigation

## 1. Purpose

Build the primary KAMMAND homepage hero.

The hero must communicate within approximately five seconds:

- KAMMAND provides GRC and cybersecurity advisory.
- KAMMAND serves regulated organizations.
- KAMMAND understands governance, risk, compliance, and cybersecurity.
- The visitor can book a consultation or explore services.

The hero must feel precise, credible, premium, institutional, modern, technically sophisticated, and calm.

## 2. Approved Hero Content

Eyebrow:

`GOVERN. SECURE. ASSURE.`

H1:

`Navigate regulation. Control risk. Stay audit-ready.`

Supporting copy:

`Strategic GRC and cybersecurity advisory for regulated organizations across the GCC.`

Primary CTA:

`Book a Consultation` -> `/book`

Secondary CTA:

`Explore Services` -> `/services`

Framework expertise references:

- SAMA CSF
- NCA ECC
- Saudi PDPL
- ISO 27001

The framework area must be labeled `Framework expertise`.

Do not present framework names as client logos, endorsements, partnerships, certifications, or regulator approval.

## 3. Layout

Desktop:

- Left: eyebrow, H1, supporting paragraph, CTAs.
- Right: signature GRC orbital visualization.
- Below: framework expertise strip.

Mobile:

- Eyebrow
- H1
- Supporting copy
- Primary CTA
- Secondary CTA
- Visualization
- Framework expertise

Use generous whitespace. Do not overcrowd the hero.

## 4. Signature GRC Visual

Build a custom SVG-based orbital/control visualization.

Core concept:

- KAMMAND at the center.
- Around the center are operating states:
  - Govern
  - Identify
  - Protect
  - Detect
  - Respond
  - Recover
  - Comply
  - Assure

Use restrained concentric rings, nodes, and connecting guides.

The visual should communicate structured governance, control coverage, risk visibility, and operational assurance.

Do not use shields, locks, 3D cards, generic globes, binary rain, particle clouds, or random network diagrams.

## 5. Motion

Desktop motion sequence:

1. Core KAMMAND node appears.
2. Concentric control rings progressively reveal.
3. Primary framework/control nodes appear.
4. Connecting lines resolve.
5. Labels appear.
6. System settles into a stable controlled state.

The motion should communicate movement from unstructured to organized to controlled to assured without literally displaying those words.

Do not loop aggressively.

Use SVG and CSS:

- opacity
- transform
- stroke-dasharray
- stroke-dashoffset

Do not add Three.js, WebGL, GSAP, or a new animation library.

## 6. Reduced Motion

For `prefers-reduced-motion`, show the final fully resolved diagram immediately.

No progressive drawing, pulsing, or continuous animation.

The diagram must remain understandable without motion.

## 7. Responsive Requirements

Check:

- 320px
- 375px
- 390px
- 430px
- 640px
- 768px
- 820px
- 1024px
- 1280px
- 1440px

Requirements:

- no clipped H1
- no overflow
- no microscopic diagram labels
- CTA targets approximately 44px or larger
- balanced vertical spacing
- visualization scales intentionally
- framework strip remains legible

Mobile may simplify the SVG by hiding secondary labels while preserving the semantic concept.

## 8. SEO and Semantics

Homepage must have exactly one H1.

Hero text must be present in HTML and not rendered only inside SVG/canvas.

Use semantic:

- `<main>`
- `<section>`
- `<h1>`
- `<p>`

CTAs must be standard crawlable links.

Framework names should appear as normal HTML text outside the diagram.

The hero visualization should provide an accessible description if informative.

Do not keyword-stuff the hero.

## 9. Performance

Hero is above the fold and must remain lightweight.

Avoid:

- large raster hero image
- heavy client bundle
- layout shift
- render-blocking dependencies
- unnecessary Client Components

SVG must have explicit sizing and aspect ratio.

Do not delay headline rendering for animation.

## 10. Component Architecture

Use:

- `components/sections/homepage/hero.tsx`
- `components/sections/homepage/grc-orbit.tsx`
- `components/sections/homepage/framework-expertise-strip.tsx`

Keep these as Server Components unless interactivity becomes necessary.

## 11. Out of Scope

Do not build:

- framework comparison section
- services section
- process section
- industries section
- insights
- final CTA
- footer
- forms
- Calendly
- cookie banner

## 12. Testing

Verify:

- exactly one H1 on the homepage
- primary CTA links to `/book`
- secondary CTA links to `/services`
- framework names are present
- hero content renders without JavaScript-only behavior
- visualization does not introduce duplicate semantic headings
- reduced-motion behavior is supported in CSS

## 13. Definition of Done

SPEC-003 is complete only when:

- this spec exists
- homepage uses the approved hero copy
- one H1 exists on the homepage
- CTAs use crawlable links
- framework expertise appears without endorsement claims
- custom SVG orbit visual is implemented
- motion is lightweight and token-based
- reduced-motion behavior is supported
- no out-of-scope homepage sections are built
- lint passes
- typecheck passes
- tests pass
- production build passes
