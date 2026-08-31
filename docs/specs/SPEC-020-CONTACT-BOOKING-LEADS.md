# SPEC-020 - Contact, Booking and Lead Conversion System

Status: Approved for implementation
Project: KAMMAND Security
Version: 1.0
Depends on:
- SPEC-001 - KAMMAND Design System
- SPEC-002 - Global Header and Navigation
- SPEC-009 - Final CTA and Global Footer
- SPEC-010 - SEO, Metadata, Structured Data and Internal Links
- SPEC-012 - Security, Performance, CI/CD and Production Readiness
- SPEC-019 - Company, Trust and Security

## 1. Objective

Create two working conversion paths:

- `/contact` for inquiries
- `/book` for consultation scheduling

The contact experience must include a functional backend submission architecture. The booking experience must support Calendly through explicit configuration and must not load third-party booking resources globally.

## 2. Contact Page

Route:

`/contact`

H1:

`Let's talk about what your organization needs.`

Supporting copy:

`Tell us about your GRC, cybersecurity, risk, compliance, or assurance priorities. KAMMAND will use the information you provide to understand your inquiry and determine the appropriate next step.`

The page includes breadcrumb, hero, contact form, what happens next, booking alternative, privacy note, and trust/security link.

## 3. Contact Form Fields

Required:

- Full name
- Work email
- Company / Organization
- How can we help?

Optional:

- Job title
- Phone
- Country / Region
- Area of interest

Area of interest options:

- GRC Advisory
- Virtual CISO
- Risk Management
- Third-Party Risk
- Audit Readiness
- Security Assurance
- Framework / Regulatory Support
- Other

Do not request passwords, government IDs, financial information, security credentials, or sensitive technical secrets.

## 4. Validation

Implement client-side UX validation and authoritative server-side validation.

Validate length, email format, allowed select values, optional field limits, unexpected fields, and oversized payloads.

Normalize text input by trimming whitespace.

## 5. Security and Abuse Controls

Submission handling must include:

- strict payload schema
- visible sensitive-information warning
- honeypot field
- minimum submission timing check
- payload size check
- rate-limit abstraction
- generic error messages
- no unsafe rendering of submitted content
- no private credentials exposed to the browser

The initial rate-limit fallback may be in-memory for development. Production should use a persistent provider such as a managed Redis or edge rate-limit service. The fallback must not be described as reliable distributed production rate limiting.

## 6. Delivery Provider Architecture

Use a provider abstraction under `lib/leads`.

Supported V1 behavior:

- development fallback returns success without sending email
- Resend-compatible HTTP delivery when configured with server-only credentials
- production without a configured provider returns a generic delivery configuration error

Do not install a provider package during this spec.

Do not log full messages or provider secrets.

## 7. Booking Page

Route:

`/book`

H1:

`Book a consultation.`

Supporting copy:

`Choose a convenient time to discuss your organization's GRC, cybersecurity, risk, compliance, or assurance priorities.`

Use `NEXT_PUBLIC_CALENDLY_URL` for the scheduling URL. Do not invent a Calendly URL.

If the URL is missing or invalid, show a controlled fallback that routes visitors to `/contact`.

## 8. Calendly Loading and Privacy

Do not load Calendly globally.

Use a scoped iframe only on `/book` when a valid Calendly URL is configured.

Calendly remains a third-party service. SPEC-021 must address cookie consent, privacy disclosure, and whether the booking iframe should load before non-essential consent.

## 9. CSP

Keep CSP narrow.

Calendly iframe support requires adding only the specific frame origin needed for configured Calendly scheduling pages. Do not add wildcard frame, script, connect, or image permissions.

## 10. Environment Variables

Document:

- `NEXT_PUBLIC_CALENDLY_URL`
- `CONTACT_DELIVERY_PROVIDER`
- `CONTACT_RECIPIENT`
- `CONTACT_FROM`
- `RESEND_API_KEY`
- `CONTACT_RATE_LIMIT_PROVIDER`

Never put private credentials in `NEXT_PUBLIC_*`.

## 11. SEO and Structured Data

Both `/contact` and `/book` require unique metadata, one H1, canonical handling, and breadcrumbs.

Do not invent phone, address, opening hours, or review schema.

Breadcrumb JSON-LD is permitted.

## 12. Accessibility

The contact form must use labels, required indicators, error association, `aria-describedby`, useful autocomplete values, visible focus, keyboard access, and practical touch targets.

The booking page must include a descriptive booking region, fallback contact path, and no keyboard traps.

## 13. Testing

Tests cover:

- `/contact`
- `/book`
- valid and invalid submissions
- missing required fields
- invalid email
- oversized message
- invalid area of interest
- honeypot and timing checks
- provider success and failure
- booking configured and missing URL states
- CTA route consistency

Tests must not send real email or create real bookings.

## 14. Definition of Done

SPEC-020 is complete only when:

- this spec exists
- `/contact` is implemented
- `/book` is implemented
- `/api/contact` submission handling exists
- server-side validation is authoritative
- provider abstraction exists
- abuse controls exist
- Calendly is scoped to `/book`
- CSP is updated narrowly
- environment variables are documented
- no global design tokens are changed without justification
- responsive QA passes
- release check passes
- lint passes
- typecheck passes
- tests pass
- production build passes
