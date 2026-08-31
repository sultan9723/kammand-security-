# KAMMAND Production Environment

This document defines the environment-variable contract for the KAMMAND Security website release candidate.

Do not commit real secrets. Public variables may be visible in browser-delivered code. Server-only variables must be configured only in the deployment provider.

## Environment Matrix

| Name | Purpose | Visibility | Required | Development | Preview | Production |
| --- | --- | --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap, and robots host. | Public | Required in production | Optional; may be empty. | Should use the intended preview policy and must not become the production canonical unless intentional. | Set to the verified production origin. |
| `NEXT_PUBLIC_CALENDLY_URL` | HTTPS Calendly scheduling URL for the consent-gated booking iframe. | Public | Required only if booking embed is active | Optional; missing value shows contact fallback. | Optional; use a safe test/preview scheduling URL if needed. | Set to the approved production Calendly URL. |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | Analytics provider selector. Current supported value is `disabled`. | Public | Optional | `disabled` | `disabled` unless preview analytics is intentionally isolated. | `disabled` unless an approved analytics provider is implemented later. |
| `CONTACT_DELIVERY_PROVIDER` | Contact delivery mode. Current production-capable value is `resend`. | Server-only | Required in production | `development` | Usually `development` unless preview lead delivery is intentionally isolated. | `resend` when production email delivery is approved and configured. |
| `CONTACT_RECIPIENT` | Internal recipient for contact inquiries. | Server-only | Required with Resend delivery | Empty | Preview-only recipient if delivery is enabled. | Approved production recipient address. |
| `CONTACT_FROM` | Verified sender identity for contact inquiry delivery. | Server-only | Required with Resend delivery | Empty | Preview sender if delivery is enabled. | Approved and provider-verified sender. |
| `RESEND_API_KEY` | Server-only credential for Resend-compatible delivery. | Server-only | Required with Resend delivery | Empty | Preview/test key if delivery is enabled. | Production key stored only in deployment secrets. |
| `CONTACT_RATE_LIMIT_PROVIDER` | Rate-limit provider selector. Development fallback is not distributed. | Server-only | Required in production | `development` | Persistent preview provider if testing abuse controls. | Persistent production provider; do not use development fallback. |
| `MONITORING_PROVIDER` | Planned monitoring provider selector. No provider is active in this release candidate. | Server-only | Optional | Empty | Empty unless a provider is approved later. | Empty unless a provider is approved later. |
| `MONITORING_DSN` | Planned monitoring credential/DSN. | Server-only | Optional | Empty | Secret value only if approved later. | Secret value only if approved later. |

## Production Requirements

- Production must set `NEXT_PUBLIC_SITE_URL` to the verified public origin.
- Production contact delivery must not use the development fallback.
- Production contact handling requires a persistent rate-limit provider before live release.
- Calendly must use the approved KAMMAND scheduling URL; do not hard-code a personal or temporary URL.
- Analytics and monitoring remain disabled unless a provider is intentionally approved, implemented, documented, and reflected in privacy/cookie disclosures.

## Preview Requirements

- Preview deployments should not pollute production analytics, production lead delivery, or production booking workflows unless explicitly configured.
- Preview canonical behavior must not compete with the production domain.

## Secret Handling

- Never place provider credentials in `NEXT_PUBLIC_*`.
- Never print secret values in CI or release reports.
- Rotate any secret immediately if it is accidentally committed or exposed.
