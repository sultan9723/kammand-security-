# SPEC-004 - Framework Intelligence and Comparison

Status: Approved for implementation
Project: KAMMAND Security
Version: 1.0
Depends on:
- SPEC-001 - KAMMAND Design System
- SPEC-002 - Global Header and Navigation
- SPEC-003 - Homepage Hero and Signature GRC Motion

## 1. Purpose

Create a dark technical framework-intelligence section for the homepage.

This section must demonstrate that KAMMAND understands overlapping regulatory and compliance regimes rather than merely listing framework names.

The section should feel analytical, authoritative, technical, easy to scan, enterprise-grade, and restrained.

## 2. Section Content

Eyebrow:

`FRAMEWORK INTELLIGENCE`

H2:

`One control environment. Multiple obligations.`

Supporting copy:

`Regulatory frameworks often overlap. KAMMAND helps organizations understand where controls align, where requirements differ, and where evidence can support multiple obligations.`

Qualification:

The comparison must be labeled as illustrative or high-level. Do not present the mapping as definitive legal, regulatory, audit, or certification guidance.

## 3. Framework References

Use:

- SAMA CSF -> `/frameworks/sama-csf`
- NCA ECC -> `/frameworks/nca-ecc`
- Saudi PDPL -> `/frameworks/pdpl`
- ISO 27001 -> `/frameworks/iso-27001`

These are framework references only.

Do not display regulator logos unless approved assets and usage rights exist.

## 4. Capability Rows

Use:

- Governance
- Risk Management
- Compliance
- Data Protection
- Incident Response
- Assurance

## 5. Comparison Matrix

Use an illustrative high-level capability view:

| Capability | SAMA CSF | NCA ECC | Saudi PDPL | ISO 27001 |
| --- | --- | --- | --- | --- |
| Governance | Strong | Strong | Not primary | Strong |
| Risk Management | Strong | Strong | Not primary | Strong |
| Compliance | Strong | Strong | Strong | Strong |
| Data Protection | Context-dependent | Context-dependent | Strong | Context-dependent |
| Incident Response | Strong | Strong | Context-dependent | Strong |
| Assurance | Strong | Strong | Not primary | Strong |

Do not treat this sample mapping as authoritative legal or regulatory truth.

Wording must clarify that detailed mapping depends on organizational scope, applicability, and evidence requirements.

## 6. Visual Direction

This is a primary dark technical section.

Use SPEC-001 dark technical tokens:

- deep navy/ink background
- white/off-white text
- cobalt active indicators
- restrained muted indicators
- thin grid lines
- technical mono labels where appropriate
- strong spacing

Avoid:

- purple
- gradients
- glowing neon tables
- dashboard clutter
- glassmorphism

## 7. Table Design

Desktop:

- Use semantic table markup.
- Left column contains capability names.
- Framework names appear across the top as links.
- Indicators align consistently.
- Row hover or focus may clarify relationships, but must not be required to understand the table.

Avoid a conventional spreadsheet feel. Use strong typography and generous row spacing.

## 8. Mobile Design

Do not compress the desktop table until unreadable.

Mobile should use an intentional card-style framework view. Each framework card lists all six capabilities with relationship labels.

Avoid horizontal-scroll tables unless a later spec explicitly chooses that pattern.

Mobile must remain understandable at 320px.

## 9. Accessibility

Desktop semantic table must use:

- `table`
- `caption`
- `thead`
- `tbody`
- `th`
- `scope`

Indicators must not rely on color alone.

Each indicator must expose accessible relationship text:

- Strong relationship
- Context-dependent relationship
- Not primary focus

Avoid screen-reader output that reads only visual symbols.

## 10. SEO and Content

Use one H2 for this major homepage section.

Do not introduce another H1.

Framework names must be visible HTML text.

Important explanatory copy must be HTML text and not live exclusively inside SVG.

Use natural internal framework links.

Do not keyword-stuff framework names.

## 11. Motion

Motion should communicate relationship resolution:

1. Section heading appears.
2. Framework column headings resolve.
3. Grid lines reveal.
4. Capability indicators appear progressively.

Do not animate every indicator repeatedly.

No continuous glow, random pulses, or decorative particles.

Use existing motion tokens and respect `prefers-reduced-motion`.

## 12. Component Architecture

Use:

- `components/sections/homepage/framework-intelligence.tsx`
- `components/sections/homepage/framework-matrix.tsx`

Keep section copy server-rendered.

Do not use a Client Component unless later interaction requires it.

## 13. Out of Scope

Do not build:

- services
- process
- industries
- insights
- footer
- forms
- Calendly
- additional framework pages

## 14. Testing

Verify:

- H2 exists
- no additional H1 exists
- all four frameworks are present
- all six capability rows are present
- framework links have correct destinations
- mobile alternative remains accessible
- indicators do not rely solely on color

## 15. Definition of Done

SPEC-004 is complete only when:

- this spec exists
- homepage includes the framework-intelligence section after the hero
- desktop comparison uses semantic table markup
- mobile uses an intentional non-compressed representation
- all framework links use planned routes
- illustrative mapping qualification is visible
- indicators have accessible text labels
- no approved tokens are changed
- no out-of-scope sections are built
- lint passes
- typecheck passes
- tests pass
- production build passes
