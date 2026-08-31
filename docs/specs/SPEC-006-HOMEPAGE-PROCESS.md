# SPEC-006 - Homepage Process and How KAMMAND Works

Status: Approved for implementation
Project: KAMMAND Security
Version: 1.0
Depends on:
- SPEC-001 - KAMMAND Design System
- SPEC-002 - Global Header and Navigation
- SPEC-003 - Homepage Hero and Signature GRC Motion
- SPEC-004 - Framework Intelligence and Comparison
- SPEC-005 - Homepage Services and Capabilities

## 1. Purpose

Create the homepage section explaining how KAMMAND engages with clients.

The section must show that KAMMAND follows a structured advisory process rather than disconnected cybersecurity services.

Core process:

- 01 Discover
- 02 Design
- 03 Deliver
- 04 Assure

The process communicates:

understand -> structure -> implement -> verify

The section must feel methodical, calm, credible, precise, easy to understand, and enterprise appropriate.

## 2. Section Position

Place this section after the Capabilities section.

The homepage flow becomes:

- Header
- Hero
- Framework Intelligence
- Capabilities
- How We Work

This section uses the approved light/arctic system. It may use subtle background variation from SPEC-001 to separate it from the preceding light section.

## 3. Section Content

Eyebrow:

`HOW WE WORK`

H2:

`From uncertainty to assurance.`

Supporting copy:

`A structured approach that turns regulatory obligations, cybersecurity risk, and business priorities into practical action.`

Do not introduce another H1.

## 4. Process Steps

Step 01:

Title:

`Discover`

Description:

`Understand the organization, regulatory obligations, current controls, risk exposure, and business priorities.`

Step 02:

Title:

`Design`

Description:

`Translate requirements and identified gaps into a practical governance, risk, compliance, and security roadmap.`

Step 03:

Title:

`Deliver`

Description:

`Support implementation of controls, documentation, remediation activities, ownership, and evidence.`

Step 04:

Title:

`Assure`

Description:

`Review control effectiveness, evidence, and readiness to help maintain confidence beyond a single assessment.`

## 5. Claim Discipline

Use advisory language.

Do not imply:

- guaranteed compliance
- guaranteed certification
- guaranteed audit success
- regulator approval
- elimination of cybersecurity risk

KAMMAND supports, assesses, designs, reviews, and helps organizations strengthen their environment.

## 6. Desktop Layout

Use a clean four-step horizontal treatment.

Preferred visual structure:

`01 Discover ---- 02 Design ---- 03 Deliver ---- 04 Assure`

Each step contains:

- number
- process marker or node
- title
- concise description

The connecting line visually communicates progression. Keep alignment precise. Do not put every step inside a floating card.

Use whitespace, typographic hierarchy, and a restrained technical line rather than heavy containers.

## 7. Connecting Line

Create one restrained process line on desktop.

Four nodes represent the four stages.

Use existing border, accent, and motion tokens.

Do not use rainbow gradients, neon glow, thick progress bars, or excessive arrows.

On mobile, transform this into a restrained vertical connecting line.

## 8. Motion

Motion may communicate process progression:

1. Discover activates.
2. The line progresses.
3. Design activates.
4. The line progresses.
5. Deliver activates.
6. The line progresses.
7. Assure activates.

Use opacity, transform, line scale or reveal, and restrained node state changes.

Do not loop continuously.

Do not use scroll-jacking, pinned pages, or multi-viewport staged scrolling.

Once complete, leave the process in its final state.

## 9. Reduced Motion

With `prefers-reduced-motion`:

- show the complete line immediately
- show all four nodes
- show all four steps
- avoid sequential reveal

No information may depend on animation.

## 10. Responsive Behavior

Mobile 320-639:

- use a vertical ordered sequence
- keep descriptions readable
- no horizontal scrolling
- no compressed desktop timeline

Tablet 640-1023:

- use a two-column or vertical treatment where it protects readability
- do not force the desktop timeline too early

Desktop 1024-1439:

- use the four-stage horizontal process line

Large desktop 1440+:

- maintain max-width constraints and precise alignment

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

## 11. Typography and SEO

Use one H2 for this major section.

Each process stage may use H3 because it is a meaningful subsection beneath the H2.

Logical structure:

Homepage H1 -> How We Work H2 -> Discover H3 -> Design H3 -> Deliver H3 -> Assure H3.

Do not use heading elements for numbers.

Descriptions must be server-rendered HTML text.

## 12. Accessibility

Use semantic ordered-list markup for the sequence.

Decorative connecting lines and nodes should be hidden from assistive technology where appropriate.

The semantic content must remain understandable without the visual line.

Ensure:

- logical heading hierarchy
- readable contrast
- reduced-motion support
- no color-only meaning
- no horizontal overflow

## 13. Component Architecture

Use:

- `components/sections/homepage/process.tsx`

Keep the section as a Server Component.

Do not add a Client Component unless a later approved spec requires runtime interaction.

## 14. Performance

No new animation library.

No new image assets.

Use HTML and CSS with token-based motion.

Avoid unnecessary JavaScript.

## 15. Out of Scope

Do not build:

- industries
- insights
- final CTA
- footer
- service detail pages
- forms
- Calendly
- cookie consent

## 16. Testing

Verify:

- one process H2 exists
- four process stages exist
- stage order is maintained
- H3 hierarchy is logical
- no new H1 is introduced
- descriptions render without JavaScript
- semantic ordered structure exists
- reduced-motion behavior is supported

## 17. Definition of Done

SPEC-006 is complete only when:

- this spec exists
- homepage includes the process section after Capabilities
- process uses semantic ordered-list markup
- all four steps render in the correct order
- process names use H3 under the How We Work H2
- desktop uses a restrained horizontal process line
- mobile uses a vertical sequence
- reduced-motion is supported
- no approved global tokens are changed
- no out-of-scope sections are built
- lint passes
- typecheck passes
- tests pass
- production build passes
