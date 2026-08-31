# SPEC-011 - Accessibility and Responsive QA

Status: Approved for implementation
Project: KAMMAND Security
Version: 1.0
Depends on:
- SPEC-001 - KAMMAND Design System
- SPEC-002 - Global Header and Navigation
- SPEC-003 - Homepage Hero and Signature GRC Motion
- SPEC-004 - Framework Intelligence and Comparison
- SPEC-005 - Homepage Services and Capabilities
- SPEC-006 - Homepage Process and How KAMMAND Works
- SPEC-008 - Homepage Insights
- SPEC-009 - Final CTA and Global Footer
- SPEC-010 - SEO, Metadata, Structured Data and Internal Links

## 1. Purpose

Audit the complete implemented homepage, global navigation, and footer for responsive behavior and accessibility readiness.

This is not a redesign sprint. Fix only clear violations of approved specs, AGENTS.md, or the established Direction A system.

## 2. Viewports

Test at minimum:

- 320
- 360
- 375
- 390
- 430
- 640
- 768
- 820
- 1024
- 1280
- 1440
- 1920

## 3. Responsive Audit Scope

Check:

- Header
- Hero
- Framework Intelligence
- Capabilities
- Process
- Insights
- Final CTA
- Footer

Industries are not present in the repository at this phase and must be tracked as missing future scope, not silently invented in this audit.

## 4. Responsive Checks

Verify:

- no horizontal overflow
- no content clipping
- heading wrapping remains readable
- container alignment
- section spacing
- grid collapse
- table and matrix behavior
- mobile menu
- CTA layout
- touch targets
- SVG sizing
- GRC visualization
- process transformation
- footer stacking

## 5. Accessibility Checks

Target WCAG 2.2 AA where applicable.

Audit:

- semantic landmarks
- heading hierarchy
- keyboard navigation
- focus order
- focus-visible state
- skip navigation
- mobile menu accessibility
- Escape behavior
- focus restoration
- touch target size
- link purpose
- button purpose
- color contrast using approved tokens
- non-color indicators
- decorative SVG handling
- reduced motion
- table semantics
- ARIA correctness

## 6. Skip Link

Implement a keyboard-accessible skip link if missing.

Main content must have a target.

## 7. Reduced Motion

With `prefers-reduced-motion`, all content remains visible and no required information depends on animation.

## 8. Issue Classification

Classify findings:

- Critical: blocks use or causes inaccessible operation
- Major: materially weakens responsive behavior, readability, interaction, or conversion
- Minor: polish issue that does not block use

Fix clear critical and major violations within existing specs.

## 9. Definition of Done

SPEC-011 is complete only when:

- this spec exists
- viewport QA is performed
- skip link exists and targets main content
- clear critical and major issues are fixed
- responsive/a11y findings are reported
- full project validation passes
