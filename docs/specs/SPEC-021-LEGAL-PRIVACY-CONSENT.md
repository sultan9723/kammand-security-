# SPEC-021 - Legal, Privacy, Cookies, Terms, Accessibility and Consent

Status: Implemented as operational draft requiring business/legal review
Project: KAMMAND Security
Version: 1.0
Depends on:
- SPEC-001 through SPEC-020

## 1. Purpose

Create legal/privacy foundation pages and a first-party consent preference system that describe the site KAMMAND actually operates today.

This specification is not legal advice and does not certify compliance with any privacy, accessibility, cookie, or consumer-protection law. Public policy copy is an operational draft and requires final business/legal review before production publication.

## 2. Actual Data-Flow Inventory

### Contact Form

Route: `/contact`

Endpoint: `POST /api/contact`

Fields currently collected:

- Full name
- Work email
- Company / Organization
- Message / inquiry
- Job title, optional
- Phone, optional
- Country / Region, optional
- Area of interest, optional

Security/abuse fields:

- Honeypot field named `website`
- Form elapsed time value named `elapsedMs`
- IP-derived rate-limit key from forwarding headers where available

Purpose:

- respond to inquiries
- understand requested services
- communicate regarding the request
- maintain appropriate business records where applicable

Provider:

- Development mode: local development acknowledgement, no email delivery
- Production when configured: Resend-compatible email API through server-only credentials
- CRM: none currently implemented

Storage:

- No application database is currently created for leads.
- Lead contents are delivered through the configured provider when active.
- Production retention periods are not defined in code and require business/legal approval.

Third-party transfer:

- Resend or another future provider receives contact inquiry data only when configured.
- No marketing subscription is created from a contact inquiry.

### Booking

Route: `/book`

Provider:

- Calendly iframe only when `NEXT_PUBLIC_CALENDLY_URL` is configured with a valid HTTPS Calendly URL.

Chosen consent classification:

- Calendly is treated as optional functional scheduling content because it is a third-party embedded service that may use its own cookies/storage and receives scheduling information when used.
- The iframe must not load until the visitor enables functional scheduling content or accepts optional categories.
- If no Calendly URL is configured, the booking page shows a controlled contact fallback.

Legal review:

- Calendly cookie behavior, international processing, and provider terms must be reviewed against the actual configured Calendly account before production.

### Analytics

No analytics provider is currently implemented.

The consent architecture includes an analytics category for SPEC-022. Analytics must not load until the consent API indicates analytics consent.

### Marketing

No marketing pixels, advertising tags, or newsletter/marketing subscription flow is currently implemented.

Marketing consent remains separate from inquiry-response processing.

### First-Party Preference Storage

The site stores consent preferences locally under the first-party key `kammand_consent_preferences`.

Stored fields:

- consent version
- necessary
- functional
- analytics
- marketing
- timestamp

This preference record is not authentication, authorization, or proof of identity.

## 3. Routes

Implement:

- `/privacy`
- `/cookies`
- `/terms`
- `/accessibility`

Each page requires unique metadata, one H1, canonical handling through the existing environment-driven URL architecture, breadcrumbs, crawlable content, and Direction A visual treatment.

## 4. Privacy Notice Architecture

The privacy page explains current processing activities:

- about the notice
- information users provide
- contact inquiries
- booking through Calendly where configured and enabled
- technical/site information
- purposes of processing
- third-party service providers
- international processing/transfers where relevant
- retention requiring business/legal approval
- security
- data-subject/privacy rights under applicable law
- cookies and similar technologies
- contact route
- changes to the notice

Do not assert a specific statutory legal basis, retention period, privacy email address, company registration detail, or jurisdiction unless verified.

## 5. Cookie Policy and Registry

The cookie/storage registry records:

- first-party consent preference storage
- Calendly as optional functional scheduling content with provider details requiring verification
- analytics as not active
- marketing as not active

Do not invent cookie names, exact durations, or provider practices that are not verified.

## 6. Consent System

The consent UI must provide:

- Reject Optional
- Preferences
- Accept Optional
- persistent footer control to reopen preferences

Strictly necessary state is always active and cannot be disabled.

Functional consent controls the Calendly iframe.

Analytics consent is off by default and reserved for SPEC-022.

Marketing consent remains off and is not used by the current site.

Consent records are versioned through `CONSENT_VERSION`. Material category or policy changes may require re-prompting visitors.

## 7. Calendly Relationship

Calendly must not load globally.

The `/book` page may only render the Calendly iframe when:

- a valid configured Calendly URL exists, and
- functional consent is enabled.

Without functional consent, the page shows a controlled scheduling-content prompt and a contact fallback.

## 8. Terms of Use Architecture

The terms page is restrained website terms content covering:

- website purpose
- informational content
- no legal/regulatory advice
- no guaranteed outcomes
- intellectual property
- permitted use
- third-party links/services
- availability
- limitation language requiring legal review
- changes
- contact

Governing law, court jurisdiction, registered office, company registration numbers, and formal limitation clauses require business/legal input.

## 9. Accessibility Statement Architecture

The accessibility page states that KAMMAND aims to align the website with WCAG 2.2 Level AA.

It may describe implemented practices such as semantic HTML, keyboard navigation, visible focus, responsive layouts, reduced motion support, contrast-conscious tokens, accessible form labels and errors, and the skip link.

Do not claim formal certification or third-party audit.

## 10. SPEC-022 Integration Contract

Future analytics or monitoring code must use the central consent API:

- call `hasConsent("analytics")` before loading analytics scripts or collecting analytics events
- subscribe to the `kammand:consentchange` browser event to respond to preference changes
- never read or write separate ad hoc consent state in random components
- treat marketing as separate from inquiry-response processing
- avoid loading third-party scripts before required consent

## 11. Definition of Done

SPEC-021 is complete only when:

- this spec exists
- data-flow inventory is documented
- legal/privacy routes are implemented
- cookie/storage registry exists
- global consent UI exists
- footer can reopen preferences
- consent state is persisted and versioned
- Calendly iframe is gated by functional consent
- analytics is not implemented
- no fabricated company/legal facts are added
- tests cover consent behavior and legal routes
- responsive QA is performed
- release check is performed
- lint passes
- typecheck passes
- tests pass
- production build passes
