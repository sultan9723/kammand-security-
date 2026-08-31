# SPEC-009 - Final CTA and Global Footer

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

## 1. Final CTA Purpose

Create the final homepage conversion point after the visitor has reviewed the primary homepage narrative.

The CTA should convert qualified interest into a consultation without using fabricated urgency or trust claims.

## 2. Final CTA Content

H2:

`Ready to bring clarity to your GRC program?`

Supporting copy:

`Talk with KAMMAND about your regulatory, cybersecurity, risk, or assurance priorities.`

Primary CTA:

`Book a Consultation` -> `/book`

Secondary CTA:

`Contact Us` -> `/contact`

## 3. Final CTA Design

Use Direction A.

Use a deep ink/navy section, strong typography, controlled cobalt accent, and large whitespace.

A restrained technical motif may be used if it is lightweight and consistent with the established visual system.

Do not use lavender gradients, purple, glass cards, decorative blobs, stock cybersecurity photography, or fake proof claims.

## 4. Footer Purpose

Build a complete global footer that supports navigation, crawlability, and user orientation.

The footer must use semantic `<footer>` markup.

Footer navigation groups should have accessible labels. Group labels should not create unnecessary page-outline headings.

## 5. Footer Content

Brand:

`KAMMAND`

Positioning statement:

`GRC and cybersecurity advisory for regulated organizations.`

Services:

- GRC Advisory -> `/services/grc-advisory`
- Virtual CISO -> `/services/virtual-ciso`
- Risk Management -> `/services/risk-management`
- Third-Party Risk -> `/services/third-party-risk`
- Audit Readiness -> `/services/audit-readiness`
- Security Assurance -> `/services/security-assurance`

Frameworks:

- SAMA CSF -> `/frameworks/sama-csf`
- NCA ECC -> `/frameworks/nca-ecc`
- Saudi PDPL -> `/frameworks/pdpl`
- ISO 27001 -> `/frameworks/iso-27001`

Company:

- About -> `/company`
- Industries -> `/industries`
- Insights -> `/insights`
- Contact -> `/contact`
- Book a Consultation -> `/book`

Legal:

- Privacy -> `/privacy`
- Cookie Policy -> `/cookies`
- Terms -> `/terms`
- Accessibility -> `/accessibility`
- Security -> `/security`

Do not use `#` links.

## 6. Social Links

Do not fabricate social profiles.

Only add social links if verified URLs exist in project data or configuration.

If no verified URLs exist, omit social links.

## 7. Copyright

Use the current year dynamically or through server-rendered application logic.

Use:

`KAMMAND Security.`

Do not invent extra rights, certifications, or claims.

## 8. Responsive Behavior

Desktop:

- multi-column footer navigation

Tablet:

- controlled column reduction

Mobile:

- clean stacked layout
- no accordion unless later required
- all links directly accessible

## 9. Accessibility

Ensure:

- semantic footer landmark
- accessible labels for footer navigation groups
- descriptive links
- visible focus
- practical touch targets
- no hidden SEO text

## 10. Definition of Done

SPEC-009 is complete only when:

- this spec exists
- homepage includes the final CTA after Insights
- global footer is mounted site-wide
- all footer routes are crawlable links
- no fabricated social links or trust claims are added
- footer labels do not disrupt heading hierarchy
- no approved tokens are changed
- tests pass
- production build passes
