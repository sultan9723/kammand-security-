import Link from "next/link";
import { CookiePreferencesButton } from "../../consent/cookie-preferences-button";
import { cookieRegistry } from "../../../lib/consent/categories";
import { Breadcrumbs } from "../../ui/breadcrumbs";
import { Container } from "../../ui/container";

export type LegalPageKind = "privacy" | "cookies" | "terms" | "accessibility";

type LegalPageProps = {
  kind: LegalPageKind;
};

const privacySections = [
  {
    title: "About this notice",
    body:
      "This notice describes the website information flows currently implemented for KAMMAND Security. It is an operational draft and should be reviewed against KAMMAND's final business, legal, and privacy requirements before production publication.",
  },
  {
    title: "Information users provide",
    body:
      "The contact form currently asks for full name, work email, company or organization, and an inquiry message. It may also collect job title, phone, country or region, and area of interest when a visitor chooses to provide them.",
  },
  {
    title: "Contact inquiries",
    body:
      "KAMMAND uses contact-form information to understand the inquiry, respond to the request, communicate about relevant next steps, and maintain appropriate business records where applicable. Submitting an inquiry does not subscribe the visitor to marketing communications.",
  },
  {
    title: "Booking information",
    body:
      "The booking page can load Calendly when a valid scheduling URL is configured and the visitor enables functional scheduling content. Scheduling information submitted inside Calendly is handled by Calendly as an external scheduling provider and must be reviewed against the configured account and provider terms.",
  },
  {
    title: "Technical and site information",
    body:
      "The site uses first-party local preference storage for consent choices. The contact endpoint also uses security and abuse-prevention signals such as payload size, a honeypot field, elapsed form time, and rate-limit keys derived from request forwarding headers where available.",
  },
  {
    title: "Third-party service providers",
    body:
      "Current provider architecture may involve Calendly for scheduling and a Resend-compatible provider for contact email delivery when configured. No CRM, analytics, monitoring provider, or marketing-pixel integration is currently active.",
  },
  {
    title: "Retention",
    body:
      "KAMMAND should retain personal information only as long as reasonably necessary for the relevant purpose and applicable obligations. Specific retention periods are not defined in the current website code and require business/legal approval.",
  },
  {
    title: "Privacy rights",
    body:
      "Individuals may have rights under applicable data-protection laws depending on their location and the relevant processing context. Privacy requests should use the contact route until a dedicated privacy contact is verified.",
  },
] as const;

const termsSections = [
  {
    title: "Website purpose",
    body:
      "This website provides general information about KAMMAND Security, its advisory services, frameworks, industries, insights, contact path, and booking path.",
  },
  {
    title: "Informational content",
    body:
      "Framework, regulatory, privacy, security, and risk content is provided for general informational and advisory context. It does not replace official regulator, standards-body, legal, audit, or certification guidance.",
  },
  {
    title: "No guaranteed outcomes",
    body:
      "Nothing on the website guarantees compliance, certification, audit success, regulatory approval, elimination of cybersecurity risk, or a specific business result.",
  },
  {
    title: "Permitted use",
    body:
      "Visitors should use the site lawfully and should not attempt to disrupt, misuse, probe, or interfere with the site, form processing, or related systems.",
  },
  {
    title: "Third-party services",
    body:
      "The site may link to or embed third-party services, including Calendly when configured. Third-party services are governed by their own terms and privacy practices.",
  },
  {
    title: "Business and legal input required",
    body:
      "Governing law, court jurisdiction, registered office, formal limitation wording, and corporate registration information are not verified in the repository and require business/legal input.",
  },
] as const;

const accessibilitySections = [
  {
    title: "Accessibility approach",
    body:
      "KAMMAND aims to align the website with WCAG 2.2 Level AA where applicable. This statement does not claim third-party certification or formal conformance auditing.",
  },
  {
    title: "Implemented practices",
    body:
      "The site uses semantic landmarks, one logical H1 per page, visible focus states, keyboard-accessible navigation, a skip link, readable line lengths, reduced-motion support, responsive layouts, labeled form controls, and accessible form error messaging.",
  },
  {
    title: "Known limitations",
    body:
      "Third-party scheduling content may have accessibility characteristics outside KAMMAND's direct control. The booking page provides a contact fallback if the embed is unavailable or not enabled.",
  },
  {
    title: "Feedback",
    body:
      "Accessibility feedback should use the existing contact route until a dedicated accessibility contact is verified.",
  },
] as const;

export function LegalPage({ kind }: LegalPageProps) {
  if (kind === "privacy") {
    return (
      <main className="legal-page" id="main-content">
        <LegalHero
          current="Privacy"
          eyebrow="PRIVACY"
          title="Privacy Notice"
          copy="How KAMMAND describes the personal-information flows currently implemented on this website."
        />
        <LegalNotice />
        <LegalSections sections={privacySections} />
        <LegalLinkSection
          title="Cookies and similar technologies."
          copy="Cookie and storage information is maintained separately so visitors can understand current strictly necessary storage, optional scheduling content, and future analytics architecture."
          links={[{ href: "/cookies", label: "Review the Cookie Policy" }]}
        />
      </main>
    );
  }

  if (kind === "cookies") {
    return (
      <main className="legal-page" id="main-content">
        <LegalHero
          current="Cookie Policy"
          eyebrow="COOKIES"
          title="Cookie Policy"
          copy="A practical inventory of current first-party preference storage, optional scheduling content, and inactive future categories."
        />
        <LegalNotice />
        <section className="internal-section" aria-labelledby="cookie-categories-title">
          <Container>
            <div className="editorial-grid">
              <div className="editorial-sidebar">
                <p className="eyebrow">CATEGORIES</p>
              </div>
              <div className="editorial-content">
                <h2 id="cookie-categories-title">Current consent categories.</h2>
                <p>
                  Strictly necessary preference storage is always active. Functional
                  scheduling content, analytics, and marketing are optional
                  categories. Analytics and marketing providers are not currently
                  implemented.
                </p>
                <div className="related-service-list">
                  <CookiePreferencesButton />
                </div>
              </div>
            </div>
          </Container>
        </section>
        <CookieRegistrySection />
      </main>
    );
  }

  if (kind === "terms") {
    return (
      <main className="legal-page" id="main-content">
        <LegalHero
          current="Terms"
          eyebrow="TERMS"
          title="Terms of Use"
          copy="Website terms for informational use of the KAMMAND Security site, subject to final legal review."
        />
        <LegalNotice />
        <LegalSections sections={termsSections} />
      </main>
    );
  }

  return (
    <main className="legal-page" id="main-content">
      <LegalHero
        current="Accessibility"
        eyebrow="ACCESSIBILITY"
        title="Accessibility Statement"
        copy="KAMMAND's current approach to accessible structure, navigation, forms, motion, and responsive content."
      />
      <LegalNotice />
      <LegalSections sections={accessibilitySections} />
      <LegalLinkSection
        title="Accessibility feedback."
        copy="Use the contact form to report accessibility issues or request an accessible alternative until a dedicated accessibility contact is configured."
        links={[{ href: "/contact", label: "Contact KAMMAND" }]}
      />
    </main>
  );
}

function LegalHero({
  current,
  eyebrow,
  title,
  copy,
}: {
  current: string;
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <section className="internal-hero" aria-labelledby="legal-title">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: current, href: getLegalHref(current) },
          ]}
        />
        <div className="internal-hero__content">
          <p className="eyebrow">{eyebrow}</p>
          <h1 id="legal-title">{title}</h1>
          <p className="text-body-large">{copy}</p>
          <p className="legal-page__updated">Last updated: August 16, 2026</p>
        </div>
      </Container>
    </section>
  );
}

function getLegalHref(label: string) {
  if (label === "Cookie Policy") {
    return "/cookies";
  }

  return `/${label.toLowerCase().replaceAll(" ", "-")}`;
}

function LegalNotice() {
  return (
    <section className="internal-section internal-section--subtle" aria-labelledby="legal-review-title">
      <Container>
        <div className="editorial-grid">
          <div className="editorial-sidebar">
            <p className="eyebrow">REVIEW STATUS</p>
          </div>
          <div className="editorial-content">
            <h2 id="legal-review-title">Operational draft requiring review.</h2>
            <p>
              This page is intended to describe the current website implementation
              accurately. It should be reviewed by KAMMAND&apos;s business and legal
              advisors before production publication or reliance.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function LegalSections({
  sections,
}: {
  sections: ReadonlyArray<{ title: string; body: string }>;
}) {
  return (
    <section className="internal-section" aria-labelledby="legal-sections-title">
      <Container>
        <div className="legal-section-list">
          <h2 className="sr-only" id="legal-sections-title">
            Policy sections
          </h2>
          {sections.map((section) => (
            <article className="legal-section" key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CookieRegistrySection() {
  return (
    <section className="internal-section internal-section--subtle" aria-labelledby="cookie-registry-title">
      <Container>
        <div className="internal-section__header">
          <p className="eyebrow">REGISTRY</p>
          <h2 id="cookie-registry-title">Current cookie and storage inventory.</h2>
          <p className="text-body-large">
            Durations and provider-specific behavior are listed only where
            verified or explicitly scoped by the current implementation.
          </p>
        </div>
        <div className="cookie-registry" role="region" aria-label="Cookie and storage registry">
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Provider</th>
                <th scope="col">Category</th>
                <th scope="col">Purpose</th>
                <th scope="col">Storage</th>
                <th scope="col">Duration</th>
              </tr>
            </thead>
            <tbody>
              {cookieRegistry.map((item) => (
                <tr key={`${item.provider}-${item.name}-${item.category}`}>
                  <th scope="row">{item.name}</th>
                  <td>{item.provider}</td>
                  <td>{item.category}</td>
                  <td>{item.purpose}</td>
                  <td>{item.storageType}</td>
                  <td>{item.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

function LegalLinkSection({
  title,
  copy,
  links,
}: {
  title: string;
  copy: string;
  links: Array<{ href: string; label: string }>;
}) {
  return (
    <section className="final-cta ink-section" aria-labelledby="legal-link-title">
      <Container>
        <div className="final-cta__grid">
          <div className="final-cta__content">
            <p className="eyebrow">NEXT STEP</p>
            <h2 id="legal-link-title">{title}</h2>
            <p className="text-body-large">{copy}</p>
          </div>
          <div className="final-cta__actions" aria-label="Related legal links">
            {links.map((link, index) => (
              <Link
                className={`ui-button ${
                  index === 0 ? "ui-button--primary" : "ui-button--secondary final-cta__secondary"
                }`}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
