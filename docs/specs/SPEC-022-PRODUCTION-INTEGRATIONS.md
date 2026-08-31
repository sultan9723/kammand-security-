# SPEC-022 - Analytics, Monitoring and Production Integrations

Status: Implemented as production-integration architecture
Project: KAMMAND Security
Version: 1.0
Depends on:
- SPEC-001 through SPEC-021

## 1. Purpose

Complete the production integration architecture for KAMMAND without adding an arbitrary analytics, monitoring, CRM, or advertising provider.

This specification covers:

- privacy-first analytics architecture
- conversion event taxonomy
- consent integration
- monitoring and error-reporting boundaries
- production logging boundaries
- contact delivery readiness
- Calendly production readiness
- environment configuration
- security/CSP implications
- CI/CD review

## 2. Provider Status

No analytics provider is currently approved or configured.

No monitoring or error-reporting provider is currently approved or configured.

No CRM provider is currently approved or configured.

Resend-compatible contact delivery exists when explicitly configured through server-only environment variables.

Calendly can be embedded only on `/book` when `NEXT_PUBLIC_CALENDLY_URL` is a valid HTTPS Calendly URL and the visitor enables functional scheduling content through the SPEC-021 consent architecture.

## 3. Analytics Architecture

Analytics is implemented as a provider abstraction and disabled by default.

The architecture supports a small taxonomy of coarse business events without collecting form values, contact messages, names, emails, phone numbers, credentials, sensitive business details, or query strings containing personal data.

Allowed event names:

- `consultation_cta_clicked`
- `contact_cta_clicked`
- `contact_form_started`
- `contact_form_submitted`
- `contact_form_success`
- `contact_form_error`
- `booking_page_viewed`
- `booking_started`
- `booking_completed`
- `service_viewed`
- `framework_viewed`
- `insight_viewed`

`booking_completed` is architecture-only until a reliable Calendly completion signal is implemented. Do not fabricate booking-completion detection.

## 4. Consent Integration

SPEC-021 is authoritative.

Optional analytics must not load or collect before analytics consent.

Analytics code must use the central consent API:

- `hasStoredConsent("analytics")`
- `kammand:consentchange`

No component should directly implement separate ad hoc consent storage logic.

When analytics consent is withdrawn, future analytics events must stop where technically possible.

## 5. Conversion Architecture

Primary conversions:

- successful contact inquiry
- booking completion only when technically verifiable

Secondary conversions:

- booking initiation
- consultation CTA click
- contact CTA click
- qualified service/framework/insight exploration

Page views are not treated as leads.

## 6. Contact Delivery Readiness

Contact delivery remains production-ready only when these server-only variables are configured:

- `CONTACT_DELIVERY_PROVIDER=resend`
- `CONTACT_RECIPIENT`
- `CONTACT_FROM`
- `RESEND_API_KEY`

Development fallback is not production lead delivery.

Production persistent rate limiting is not currently configured and remains a production blocker until a managed provider is selected.

## 7. Calendly Production Readiness

Calendly implementation requirements:

- URL must come from `NEXT_PUBLIC_CALENDLY_URL`
- no hard-coded booking URL
- iframe loads only on `/book`
- iframe loads only after functional consent
- fallback to `/contact`
- CSP allows only Calendly framing

Calendly cookie/storage and data-processing behavior require provider/account verification before production.

## 8. Monitoring Architecture

No monitoring provider is currently active.

The production recommendation is to select one error-monitoring provider intentionally and configure sanitization to avoid sending:

- contact messages
- names
- email addresses
- phone numbers
- cookies
- secrets
- authorization values

Monitoring should focus on server errors, failed contact submissions, integration failures, critical route failures, and performance regressions.

## 9. Logging

Production logs should help diagnose failure classes without storing full lead content.

Permitted logging categories:

- contact delivery configuration error
- provider delivery failure
- rate-limit production fallback warning
- unexpected server error category

Do not log API keys, cookies, full contact messages, credentials, or full lead payloads.

## 10. Health Endpoint

Implement `/api/health`.

It should return minimal availability information only:

- `status: "ok"`

Do not expose environment variables, dependency versions, build internals, or secret status.

## 11. Third-Party Inventory

Centralized third-party inventory must distinguish active from planned providers.

Actual configured-capable providers:

- Calendly, client iframe, functional consent, configured by `NEXT_PUBLIC_CALENDLY_URL`
- Resend-compatible email API, server-side delivery, configured by server-only contact variables

Planned providers:

- Analytics provider
- Monitoring/error reporting provider
- Persistent rate-limit provider
- CRM provider

Planned providers must not be represented as active in privacy/cookie copy.

## 12. Environment Configuration

Environment variables are classified as:

Public:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CALENDLY_URL`
- `NEXT_PUBLIC_ANALYTICS_PROVIDER`

Server-only:

- `CONTACT_DELIVERY_PROVIDER`
- `CONTACT_RECIPIENT`
- `CONTACT_FROM`
- `RESEND_API_KEY`
- `CONTACT_RATE_LIMIT_PROVIDER`
- future monitoring/rate-limit provider credentials

Optional variables must not crash unrelated public pages when missing.

## 13. CSP and Security Headers

Current CSP remains intentionally narrow:

- `connect-src 'self'`
- `frame-src 'self' https://calendly.com`
- no wildcard origins
- no `unsafe-eval`

Because no analytics or monitoring provider is active, no analytics or monitoring origins are added.

Any future provider must update CSP deliberately.

## 14. CI/CD

Existing CI runs from the nested Next.js app root and executes:

- `npm ci`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run build`

CI must not require production secrets for compile-time checks.

## 15. Definition of Done

SPEC-022 is complete only when:

- this spec exists
- analytics abstraction exists
- analytics is disabled without consent and without configured provider
- conversion taxonomy exists
- event payloads exclude PII
- third-party inventory exists
- environment registry/validation exists
- health endpoint exists
- contact production status is documented
- Calendly production status is documented
- CSP is reviewed without unnecessary new origins
- tests cover analytics consent and integration boundaries
- responsive QA is performed for affected UI
- release check is performed
- lint passes
- typecheck passes
- tests pass
- production build passes
