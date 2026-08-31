# KAMMAND Release Checklist

Release candidate: `v1.0.0`

## Code Quality

- [x] All code-level P0 findings resolved
- [x] All required code-level P1 findings resolved
- [x] lint passes
- [x] typecheck passes
- [x] tests pass
- [x] production build passes
- [x] routes checked
- [x] broken links checked
- [x] responsive QA complete
- [x] accessibility QA complete
- [x] metadata checked
- [x] sitemap checked
- [x] robots checked
- [x] structured data checked
- [x] drafts excluded
- [x] consent verified
- [x] CSP verified
- [x] secrets checked

## Content and Legal

- [ ] regulatory claims reviewed by appropriate business/legal reviewer
- [ ] company claims reviewed by business owner
- [ ] legal review status documented as approved
- [ ] privacy retention decisions approved
- [ ] governing law and jurisdiction approved where required
- [ ] production contact/privacy contact details approved

## Production Integrations

- [ ] contact production configuration verified
- [ ] rate limiting verified with a persistent production provider
- [ ] Calendly verified with approved production URL
- [ ] analytics configuration verified if intentionally enabled
- [ ] monitoring configuration verified if intentionally enabled

## Domain and Operations

- [ ] production domain connected
- [ ] DNS verified
- [ ] TLS verified
- [ ] registrar MFA enabled
- [ ] registrar lock enabled
- [ ] DNSSEC reviewed
- [ ] CAA reviewed
- [ ] SPF configured
- [ ] DKIM configured
- [ ] DMARC configured
- [ ] GitHub branch protection reviewed
- [ ] required CI checks enabled
- [x] rollback procedure documented

## Release Controls

- [ ] final human visual review completed
- [ ] final deployment approval received
- [ ] release commit identified
- [ ] release tag approved
- [ ] post-release smoke test owner assigned
