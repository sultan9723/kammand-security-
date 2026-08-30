import Link from "next/link";
import { Breadcrumbs } from "../../ui/breadcrumbs";
import { Container } from "../../ui/container";

const securityPrinciples = [
  "Data minimization",
  "Access control",
  "Secure configuration",
  "Least privilege",
  "Responsible dependency management",
  "Encryption where appropriate",
  "Incident preparedness",
  "Privacy-conscious design",
] as const;

const currentWebsitePractices = [
  "Conservative security headers are configured in the Next.js application.",
  "The contact form uses server-side validation, abuse controls, and provider-based delivery when configured.",
  "Calendly scheduling is scoped to the booking page and should load only after functional scheduling consent.",
  "Canonical URLs are environment-driven rather than hard-coded to an unverified production domain.",
  "Core page content is server-rendered and does not depend on third-party scripts.",
  "Project validation includes lint, typecheck, tests, and production build.",
] as const;

const plannedTrustItems = [
  "Dedicated security contact routing",
  "Privacy documentation",
  "Subprocessor information",
  "Policy summaries",
  "Assurance documentation when available",
] as const;

export function TrustSecurityPage() {
  return (
    <main className="security-page" id="main-content">
      <section className="internal-hero" aria-labelledby="security-title">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Security", href: "/security" },
            ]}
          />
          <div className="internal-hero__content">
            <p className="eyebrow">SECURITY / TRUST</p>
            <h1 id="security-title">Trust should be supported by how you operate.</h1>
            <p className="text-body-large">
              KAMMAND treats security, privacy, and responsible information
              handling as operating responsibilities. This page establishes a
              foundation for trust information without implying that a full
              automated trust center is already available.
            </p>
            <div className="internal-hero__actions" aria-label="Security page actions">
              <Link className="ui-button ui-button--primary" href="/contact">
                Contact KAMMAND
              </Link>
              <Link className="ui-button ui-button--secondary" href="/privacy">
                Privacy Information
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="framework-technical-section ink-section" aria-labelledby="security-principles-title">
        <Container>
          <div className="framework-technical-section__grid">
            <div className="framework-technical-section__content">
              <p className="eyebrow">SECURITY PRINCIPLES</p>
              <h2 id="security-principles-title">Principles that should guide client work and site operations.</h2>
              <p className="text-body-large">
                These principles describe the intended security posture for
                KAMMAND work. They are not presented as a certification,
                independent audit result, or complete control report.
              </p>
            </div>
            <ul className="capability-area-list" aria-label="Security principles">
              {securityPrinciples.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="internal-section" aria-labelledby="client-information-title">
        <Container>
          <div className="editorial-grid">
            <div className="editorial-sidebar">
              <p className="eyebrow">CLIENT INFORMATION</p>
            </div>
            <div className="editorial-content">
              <h2 id="client-information-title">Information should be handled according to need and context.</h2>
              <p>
                Client information should be handled according to business need,
                appropriate access, confidentiality, agreed engagement
                requirements, and applicable privacy or security obligations.
                This page does not define retention periods or legal terms for
                future engagements.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="internal-section internal-section--subtle" aria-labelledby="website-security-title">
        <Container>
          <div className="internal-section__header">
            <p className="eyebrow">CURRENT WEBSITE IMPLEMENTATION</p>
            <h2 id="website-security-title">Security practices currently visible in the codebase.</h2>
            <p className="text-body-large">
              These statements are limited to what the current website
              implementation supports. Production deployment controls must still
              be verified in the deployment environment.
            </p>
          </div>
          <ul className="check-list">
            {currentWebsitePractices.map((practice) => (
              <li key={practice}>{practice}</li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="internal-section" aria-labelledby="third-party-services-title">
        <Container>
          <div className="detail-two-column">
            <div>
              <p className="eyebrow">THIRD-PARTY SERVICES</p>
              <h2 id="third-party-services-title">Integrations should be transparent when they are added.</h2>
              <p>
                Planned production integrations may include scheduling,
                analytics, email delivery, monitoring, and CRM services. These
                services are not presented as active on this page until they are
                implemented and reviewed.
              </p>
            </div>
            <div>
              <p className="eyebrow">PRIVACY RELATIONSHIP</p>
              <h2>Privacy documentation remains separate.</h2>
              <p>
                Privacy terms, cookie details, and data processing information
                should be handled through dedicated policy pages when those pages
                are implemented.
              </p>
              <div className="related-service-list">
                <Link href="/privacy">
                  View privacy information
                  <span aria-hidden="true">-&gt;</span>
                </Link>
                <Link href="/cookies">
                  View cookie information
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="internal-section internal-section--subtle" aria-labelledby="disclosure-title">
        <Container>
          <div className="editorial-grid">
            <div className="editorial-sidebar">
              <p className="eyebrow">RESPONSIBLE DISCLOSURE</p>
            </div>
            <div className="editorial-content">
              <h2 id="disclosure-title">Security concerns should have a clear route.</h2>
              <p>
                A dedicated security contact route is not yet configured in the
                project. Until that is available, security-related website
                concerns should use the general contact route and include enough
                context for review. This is not a bug bounty program and does
                not promise monetary rewards.
              </p>
              <div className="related-service-list">
                <Link href="/contact">
                  Contact KAMMAND
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="internal-section" aria-labelledby="trust-docs-title">
        <Container>
          <div className="internal-split">
            <div className="internal-section__header">
              <p className="eyebrow">FUTURE TRUST DOCUMENTATION</p>
              <h2 id="trust-docs-title">Additional trust documentation will be published as it becomes available.</h2>
              <p className="text-body-large">
                The website is structured to support more detailed trust
                information later. Unavailable documents are not represented as
                live proof.
              </p>
            </div>
            <ul className="check-list" aria-label="Planned trust documentation">
              {plannedTrustItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="final-cta ink-section" aria-labelledby="security-final-cta-title">
        <Container>
          <div className="final-cta__grid">
            <div className="final-cta__content">
              <p className="eyebrow">CONTACT</p>
              <h2 id="security-final-cta-title">Need to discuss security or privacy expectations?</h2>
              <p className="text-body-large">
                Talk with KAMMAND about governance, cybersecurity, privacy,
                evidence, and assurance priorities.
              </p>
            </div>
            <div className="final-cta__actions" aria-label="Security contact actions">
              <Link className="ui-button ui-button--primary" href="/contact">
                Contact Us
              </Link>
              <Link className="ui-button ui-button--secondary final-cta__secondary" href="/book">
                Book a Consultation
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
