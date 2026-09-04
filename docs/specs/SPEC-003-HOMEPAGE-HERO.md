# SPEC-003 - Homepage Hero and Signature GRC Motion

Status: Approved for implementation
Project: KAMMAND Security
Version: 1.2
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

> Superseded by the amendment in section 14. The copy below is the original
> v1.0 content, kept for history.

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

> The operating states listed in this section are superseded by section 14.

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

## 14. Amendment v1.1 - Niche repositioning

> The H1 and its rationale in this section are superseded by section 15.
> The rest of the amendment stands.

Supersedes section 2 in full, and the operating-state list in section 4.
Everything else in this spec - layout, motion, reduced motion, responsive
targets, semantics, performance, component architecture - stands unchanged.

### 14.1 Why

The v1.0 hero sold a category rather than a practice. `Navigate regulation.
Control risk. Stay audit-ready.` over `Strategic GRC and cybersecurity advisory
for regulated organizations across the GCC.` describes most GRC firms in the
Gulf. Nothing above the fold named SAMA, fintech, or payments.

Section 1 requires the hero to communicate in about five seconds that KAMMAND
serves regulated organizations. It did - but only in the broadest sense, which
left the visitor unable to tell whether the practice was for them.

### 14.2 Approved hero content

Eyebrow (unchanged):

`Where Precision Meets Protection`

H1:

`SAMA compliance and cybersecurity assurance for GCC fintechs and payment companies.`

Supporting copy:

`Controls, evidence, and assurance that hold up under regulatory scrutiny.`

Credibility line:

`Led by an ISO 27001 Lead Auditor · SAMA CSF & CRFR specialist advisory`

Primary CTA:

`Book a SAMA Readiness Consultation` -> `/book`

Secondary CTA (unchanged):

`Explore Services` -> `/services`

Positioning line:

`Built for organizations under SAMA, NCA, and PDPL supervision.`

The credibility line composes the existing `.eyebrow` primitive and overrides
colour only. It must remain visually subordinate to both the eyebrow pill and
the H1. It is not a heading and must not be marked up as one.

### 14.3 Content-claim basis

Section 2 of v1.0 barred presenting framework names as certifications,
endorsements, or partnerships. That still holds. Two new claims were introduced
here, and both were confirmed factual by the business owner before being
written:

- **ISO 27001 Lead Auditor** is a credential genuinely held. It is stated as a
  fact about the practice's leadership, not as an accreditation of KAMMAND as
  an entity.
- **The positioning line makes no customer claim.** An earlier draft read
  "Trusted by regulated fintechs across Saudi Arabia and the GCC", which would
  have been a customer claim while `lib/proof.ts` and `lib/team.ts` are
  deliberately empty. It was replaced with a statement of who the practice is
  built for, which is true today and stays true until real engagements can be
  cited.

Neither line may be broadened without evidence. `app/page.test.tsx` pins both
strings so they cannot drift silently.

### 14.4 Operating states

Section 4 listed Govern, Identify, Protect, Detect, Respond, Recover, Comply,
Assure - five of which are NIST CSF's function names. NIST CSF is not one of
the four frameworks this site advises on, so the diagram was speaking a
vocabulary the rest of the site does not use.

The eight states, read clockwise from the top:

- Govern
- Assess
- Control
- Remediate
- Evidence
- Comply
- Assure
- Report

These are the terms used across the rest of the site, and match AGENTS.md's
stated KAMMAND visual language: risk, control, governance, evidence, audit,
remediation, compliance.

The count stays at eight. Node coordinates, tone alternation, ring geometry,
connector draw, and the staggered reveal are all unchanged - this was a label
swap only. The SVG `<title>` is unchanged; the `<desc>` was updated because it
enumerated the old terms.

### 14.5 Known gaps

- **CRFR has no framework page.** The hero names it while `/frameworks/` covers
  only SAMA CSF, NCA ECC, Saudi PDPL, and ISO 27001. Every other framework
  reference on the site is one click from a page that backs it. A CRFR page
  should follow.
- **`lib/team.ts` is still empty** while the hero now asserts an ISO 27001 Lead
  Auditor. Populating it would render the Team section and put the credential
  behind a named practitioner.
- **`.homepage-hero` line 903 uses `var(--space-14)`, which is not defined.**
  The declaration is invalid, so the hero's top padding computes to `0`. Found
  during this work, left unfixed as out of scope; the scale jumps `--space-12`
  to `--space-16`.

### 14.6 Scope

Hero only. The site header, final-CTA section, footer, and `siteConfig` each
hold their own independent `Book a Consultation` string and were deliberately
not touched. The site header still reads `Book a Consultation`.

## 15. Amendment v1.2 - Regulator-led headline

Supersedes the H1 in section 14.2. Every other element of the v1.1 amendment -
supporting copy, credibility line, CTAs, positioning line, and the operating
states in 14.4 - stands unchanged.

### 15.1 Why

The v1.1 H1 named a sector: `SAMA compliance and cybersecurity assurance for GCC
fintechs and payment companies.` A whole-site narrative audit found that this
contradicted the site it sits on. The site ships six industry pages, four of
them - Insurance, Technology, Healthcare, Critical & Regulated Enterprises -
outside that niche. A visitor from any of those four was told, in the largest
type on the site, that the practice was for someone else, and had to disbelieve
the headline to reach their own sector page.

The business decision was to position as a GCC regulated-sector generalist
rather than a fintech specialist, keeping all six industries at equal weight.

### 15.2 Approved H1

`SAMA, NCA, PDPL and ISO 27001 assurance for regulated organizations across the GCC.`

### 15.3 Why the regulators and not the sector

The obvious execution of "generalist" was `Cybersecurity and compliance
assurance for regulated organizations across the GCC` - which is four words from
the pre-v1.1 supporting line the audit had already flagged as generic, and would
have returned the hero to roughly where it started.

Naming the four frameworks keeps the specificity that made v1.1 worth doing
while dropping the sector narrowing that made it wrong. Frameworks are
verifiable, they are the four this site actually covers, and they are
sector-neutral: a bank CISO and a healthcare CIO each recognise their own
regulator in the line.

At 79 characters against the previous 82, the new H1 needs no change to the
bespoke type ramp on `.homepage-hero__title`.

### 15.4 Open question - SAMA supervisory scope

The hero leads on SAMA while only two of six industry pages name SAMA in prose:
Financial Services and Fintech & Payments. Insurance, Technology, Healthcare and
Critical & Regulated Enterprises name NCA, PDPL and ISO 27001 instead.

During this amendment it was suggested that SAMA applies to all six sectors.
That was not acted on. SAMA is the Saudi Central Bank and its published remit
covers banks, insurers, finance companies, and payment and fintech entities - not
healthcare providers or general technology companies, which sit under NCA for
cybersecurity and PDPL for personal data. Adding SAMA to those pages would place
a false regulatory claim on a site whose proposition is regulatory accuracy, and
`AGENTS.md` forbids fabricated compliance claims.

**No industry page's framework list was changed.** The question stays open: if
SAMA does apply more widely for KAMMAND's engagements - Insurance being the most
likely - the specific sectors need confirming before the copy changes.

The sector-neutral H1 above is correct either way, so this does not block.

### 15.5 Knock-on not addressed here

The primary CTA still reads `Book a SAMA Readiness Consultation`, set in v1.1
when the hero was fintech- and SAMA-led. With a sector-neutral H1 it is now the
narrowest element on the page, and the only place on the site using that
wording - nine other locations say `Book a Consultation`. Tracked as its own
punch-list item; not changed here.
