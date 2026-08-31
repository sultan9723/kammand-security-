# SPEC-005 - Homepage Services and Capabilities

Status: Approved for implementation
Project: KAMMAND Security
Version: 1.0
Depends on:
- SPEC-001 - KAMMAND Design System
- SPEC-002 - Global Header and Navigation
- SPEC-003 - Homepage Hero and Signature GRC Motion
- SPEC-004 - Framework Intelligence and Comparison

## 1. Purpose

Create the homepage services and capabilities section.

The section must make KAMMAND's commercial offering immediately understandable.

It should communicate:

- what KAMMAND does
- what business problems KAMMAND helps solve
- where each capability leads
- that KAMMAND is a serious GRC and cybersecurity advisory firm

The design must remain clean, restrained, premium, scannable, professional, and enterprise appropriate.

## 2. Section Position

Place this section after the framework-intelligence section.

This section returns the homepage to the primary arctic/light canvas after the dark framework section.

The light/dark transition should feel intentional.

## 3. Section Heading

Eyebrow:

`CAPABILITIES`

H2:

`GRC and cybersecurity, built around your risk.`

Supporting copy:

`From governance strategy to audit readiness, KAMMAND helps regulated organizations turn requirements into practical controls, evidence, and measurable action.`

Do not introduce another H1.

## 4. Services

Use six capabilities:

01 - GRC Advisory

Description:

`Translate regulatory and business requirements into practical governance, risk, and compliance programs.`

Destination:

`/services/grc-advisory`

02 - Virtual CISO

Description:

`Strategic cybersecurity leadership for organizations that need experienced security direction without a full-time CISO.`

Destination:

`/services/virtual-ciso`

03 - Risk Management

Description:

`Identify, assess, prioritize, and manage cybersecurity risk through structured and decision-focused programs.`

Destination:

`/services/risk-management`

04 - Third-Party Risk

Description:

`Evaluate supplier and partner risk with structured due diligence, control reviews, and ongoing oversight.`

Destination:

`/services/third-party-risk`

05 - Audit Readiness

Description:

`Prepare controls, evidence, ownership, and remediation activities before regulatory or certification assessments.`

Destination:

`/services/audit-readiness`

06 - Security Assurance

Description:

`Assess whether cybersecurity controls are designed appropriately, operating effectively, and supported by reliable evidence.`

Destination:

`/services/security-assurance`

## 5. Content Accuracy

These are service descriptions, not proof claims.

Do not add:

- guaranteed compliance
- guaranteed certification
- guaranteed audit success
- fabricated client numbers
- fabricated years of experience
- fabricated certifications
- fabricated regulatory approvals
- fabricated partnerships

Prefer language such as support, prepare, assess, help, strengthen, and align where outcomes cannot be guaranteed.

## 6. Visual Direction

Use the approved Direction A light canvas.

Preferred desktop layout:

- 3 columns by 2 rows, or an equivalent six-item editorial grid

Each service item contains:

- service number
- restrained decorative technical mark
- service name
- short description
- subtle destination affordance

Do not create six giant boxed SaaS cards.

Use whitespace, subtle dividers, restrained borders, and precise alignment.

Avoid heavy shadows, glass effects, large rounded containers, gradient borders, and glowing icons.

## 7. Icons

Use restrained line icons or simple technical marks.

Do not use shields for every service, locks, hacker icons, AI sparkle icons, or colorful illustrations.

Icons are decorative unless a later spec defines semantic icon meaning.

## 8. Interaction

Each service links to its corresponding route with a standard crawlable link.

Hover and focus states may use:

- subtle border change
- text/accent change
- small directional affordance movement

Do not use dramatic card lift, card scaling, or hover-only information.

## 9. Motion

Motion should be minimal.

Permitted:

- restrained section reveal
- slight service-item stagger
- subtle arrow movement on interaction

Do not create six independent distracting animations.

Respect `prefers-reduced-motion`.

## 10. Responsive Behavior

Mobile:

- single-column service list
- practical touch targets
- readable descriptions
- no horizontal carousel

Tablet:

- two columns where space allows

Desktop:

- three columns where space allows

Check:

- 320px
- 375px
- 430px
- 640px
- 768px
- 1024px
- 1280px
- 1440px

## 11. SEO

Use one H2 for the section.

Each service name may use H3 because each represents a meaningful subsection beneath the services H2.

Maintain:

Homepage H1 -> Capabilities H2 -> service H3 headings.

Do not use heading tags for service numbers.

All service names and descriptions must be server-rendered HTML text.

## 12. Accessibility

Ensure:

- logical heading hierarchy
- keyboard accessible links
- visible focus states
- decorative icons use `aria-hidden`
- no information conveyed through color alone
- adequate contrast
- readable descriptions
- practical touch targets

## 13. Component Architecture

Use:

- `components/sections/homepage/services.tsx`

Do not add a reusable component unless real duplication justifies it.

Keep the section as a Server Component.

## 14. Out of Scope

Do not build:

- service detail pages
- process section
- industries section
- insights section
- final CTA
- footer
- forms
- Calendly
- cookie consent

## 15. Testing

Verify:

- Capabilities H2 exists
- all six service names render
- all six descriptions render
- all six links use correct destinations
- H3 hierarchy is logical
- no additional H1 is introduced
- section content renders server-side

## 16. Definition of Done

SPEC-005 is complete only when:

- this spec exists
- homepage includes the services section after framework intelligence
- section returns to the light Direction A canvas
- all six services render with correct links
- all service names use H3 under the Capabilities H2
- no approved tokens are changed
- no out-of-scope sections are built
- lint passes
- typecheck passes
- tests pass
- production build passes
