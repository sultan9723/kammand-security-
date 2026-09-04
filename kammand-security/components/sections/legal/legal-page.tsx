import Link from "next/link";
import { CookiePreferencesButton } from "../../consent/cookie-preferences-button";
import { cookieRegistry } from "../../../lib/consent/categories";
import { Breadcrumbs } from "../../ui/breadcrumbs";
import { Container } from "../../ui/container";
import { DirectionalArrow } from "../../ui/directional-arrow";
import { SectionLabel } from "../../ui/section-label";

export type LegalPageKind =
  | "privacy"
  | "cookies"
  | "terms"
  | "accessibility"
  | "security";

type LegalPageProps = { kind: LegalPageKind };

type LegalSection = {
  eyebrow?: string;
  title: string;
  body: string;
  items?: readonly string[];
  links?: ReadonlyArray<{ href: string; label: string }>;
  content?: "cookie-preferences" | "cookie-registry";
};

type LegalPageDefinition = {
  breadcrumb: string;
  eyebrow: string;
  title: string;
  copy: string;
  statusLabel: string;
  statusTitle: string;
  statusCopy: string;
  sections: readonly LegalSection[];
  related?: {
    eyebrow: string;
    title: string;
    copy: string;
    links: ReadonlyArray<{ href: string; label: string }>;
  };
};

const legalNavigation = [
  { href: "/privacy", label: "Privacy", kind: "privacy" },
  { href: "/cookies", label: "Cookies", kind: "cookies" },
  { href: "/terms", label: "Terms", kind: "terms" },
  { href: "/accessibility", label: "Accessibility", kind: "accessibility" },
  { href: "/security", label: "Security", kind: "security" },
] as const;

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

const pageDefinitions: Record<LegalPageKind, LegalPageDefinition> = {
  privacy: {
    breadcrumb: "Privacy",
    eyebrow: "Privacy",
    title: "Privacy Notice",
    copy: "How KAMMAND describes the personal-information flows currently implemented on this website.",
    statusLabel: "Review status",
    statusTitle: "Operational draft requiring review.",
    statusCopy:
      "This page is intended to describe the current website implementation accurately. It should be reviewed by KAMMAND's business and legal advisors before production publication or reliance.",
    sections: [
      {
        title: "About this notice",
        body: "This notice describes the website information flows currently implemented for KAMMAND Security. It is an operational draft and should be reviewed against KAMMAND's final business, legal, and privacy requirements before production publication.",
      },
      {
        title: "Information users provide",
        body: "The contact form currently asks for full name, work email, company or organization, and an inquiry message. It may also collect job title, phone, country or region, and area of interest when a visitor chooses to provide them.",
      },
      {
        title: "Contact inquiries",
        body: "KAMMAND uses contact-form information to understand the inquiry, respond to the request, communicate about relevant next steps, and maintain appropriate business records where applicable. Submitting an inquiry does not subscribe the visitor to marketing communications.",
      },
      {
        title: "Booking information",
        body: "The booking page can load Calendly when a valid scheduling URL is configured and the visitor enables functional scheduling content. Scheduling information submitted inside Calendly is handled by Calendly as an external scheduling provider and must be reviewed against the configured account and provider terms.",
      },
      {
        title: "Technical and site information",
        body: "The site uses first-party local preference storage for consent choices. The contact endpoint also uses security and abuse-prevention signals such as payload size, a honeypot field, elapsed form time, and rate-limit keys derived from request forwarding headers where available.",
      },
      {
        title: "Third-party service providers",
        body: "Current provider architecture may involve Calendly for scheduling and a Resend-compatible provider for contact email delivery when configured. No CRM, analytics, monitoring provider, or marketing-pixel integration is currently active.",
      },
      {
        title: "Retention",
        body: "KAMMAND should retain personal information only as long as reasonably necessary for the relevant purpose and applicable obligations. Specific retention periods are not defined in the current website code and require business/legal approval.",
      },
      {
        title: "Privacy rights",
        body: "Individuals may have rights under applicable data-protection laws depending on their location and the relevant processing context. Privacy requests should use the contact route until a dedicated privacy contact is verified.",
      },
    ],
    related: {
      eyebrow: "Related information",
      title: "Cookies and similar technologies.",
      copy: "Review current strictly necessary storage, optional scheduling content, and future analytics architecture.",
      links: [{ href: "/cookies", label: "Review the Cookie Policy" }],
    },
  },
  cookies: {
    breadcrumb: "Cookie Policy",
    eyebrow: "Cookies",
    title: "Cookie Policy",
    copy: "A practical inventory of current first-party preference storage, optional scheduling content, and inactive future categories.",
    statusLabel: "Review status",
    statusTitle: "Operational draft requiring review.",
    statusCopy:
      "This inventory reflects the current website implementation. Provider-specific storage should be verified again before production publication.",
    sections: [
      {
        title: "Current consent categories",
        body: "Strictly necessary preference storage is always active. Functional scheduling content, analytics, and marketing are optional categories. Analytics and marketing providers are not currently implemented.",
        content: "cookie-preferences",
      },
      {
        title: "Current cookie and storage inventory",
        body: "Durations and provider-specific behavior are listed only where verified or explicitly scoped by the current implementation.",
        content: "cookie-registry",
      },
    ],
  },
  terms: {
    breadcrumb: "Terms",
    eyebrow: "Terms",
    title: "Terms of Use",
    copy: "Website terms for informational use of the KAMMAND Security site, subject to final legal review.",
    statusLabel: "Review status",
    statusTitle: "Operational draft requiring review.",
    statusCopy:
      "This page describes the intended website terms. Corporate details, governing law, jurisdiction, and final limitation language require business and legal approval.",
    sections: [
      {
        title: "Website purpose",
        body: "This website provides general information about KAMMAND Security, its advisory services, frameworks, industries, insights, contact path, and booking path.",
      },
      {
        title: "Informational content",
        body: "Framework, regulatory, privacy, security, and risk content is provided for general informational and advisory context. It does not replace official regulator, standards-body, legal, audit, or certification guidance.",
      },
      {
        title: "No guaranteed outcomes",
        body: "Nothing on the website guarantees compliance, certification, audit success, regulatory approval, elimination of cybersecurity risk, or a specific business result.",
      },
      {
        title: "Permitted use",
        body: "Visitors should use the site lawfully and should not attempt to disrupt, misuse, probe, or interfere with the site, form processing, or related systems.",
      },
      {
        title: "Third-party services",
        body: "The site may link to or embed third-party services, including Calendly when configured. Third-party services are governed by their own terms and privacy practices.",
      },
      {
        title: "Business and legal input required",
        body: "Governing law, court jurisdiction, registered office, formal limitation wording, and corporate registration information are not verified in the repository and require business/legal input.",
      },
    ],
  },
  accessibility: {
    breadcrumb: "Accessibility",
    eyebrow: "Accessibility",
    title: "Accessibility Statement",
    copy: "KAMMAND's current approach to accessible structure, navigation, forms, motion, and responsive content.",
    statusLabel: "Statement scope",
    statusTitle: "Practical accessibility, without an unverified claim.",
    statusCopy:
      "This statement describes practices present in the website and does not claim third-party certification or formal conformance auditing.",
    sections: [
      {
        title: "Accessibility approach",
        body: "KAMMAND aims to align the website with WCAG 2.2 Level AA where applicable. This statement does not claim third-party certification or formal conformance auditing.",
      },
      {
        title: "Implemented practices",
        body: "The site uses semantic landmarks, one logical H1 per page, visible focus states, keyboard-accessible navigation, a skip link, readable line lengths, reduced-motion support, responsive layouts, labeled form controls, and accessible form error messaging.",
      },
      {
        title: "Known limitations",
        body: "Third-party scheduling content may have accessibility characteristics outside KAMMAND's direct control. The booking page provides a contact fallback if the embed is unavailable or not enabled.",
      },
      {
        title: "Feedback",
        body: "Accessibility feedback should use the existing contact route until a dedicated accessibility contact is verified.",
        links: [{ href: "/contact", label: "Contact KAMMAND" }],
      },
    ],
  },
  security: {
    breadcrumb: "Security",
    eyebrow: "Security / Trust",
    title: "Trust should be supported by how you operate.",
    copy: "KAMMAND treats security, privacy, and responsible information handling as operating responsibilities. This page establishes a foundation for trust information without implying that a full automated trust center is already available.",
    statusLabel: "Implementation scope",
    statusTitle: "Current-state information, not certification.",
    statusCopy:
      "The statements below are limited to intended operating principles and practices visible in the current codebase. Production controls still require deployment verification.",
    sections: [
      {
        eyebrow: "Security principles",
        title: "Principles that should guide client work and site operations",
        body: "These principles describe the intended security posture for KAMMAND work. They are not presented as a certification, independent audit result, or complete control report.",
        items: securityPrinciples,
      },
      {
        eyebrow: "Client information",
        title: "Information should be handled according to need and context",
        body: "Client information should be handled according to business need, appropriate access, confidentiality, agreed engagement requirements, and applicable privacy or security obligations. This page does not define retention periods or legal terms for future engagements.",
      },
      {
        eyebrow: "Current Website Implementation",
        title: "Security practices currently visible in the codebase",
        body: "These statements are limited to what the current website implementation supports. Production deployment controls must still be verified in the deployment environment.",
        items: currentWebsitePractices,
      },
      {
        eyebrow: "Third-party services",
        title: "Integrations should be transparent when they are added",
        body: "Planned production integrations may include scheduling, analytics, email delivery, monitoring, and CRM services. These services are not presented as active on this page until they are implemented and reviewed.",
        links: [
          { href: "/privacy", label: "View privacy information" },
          { href: "/cookies", label: "View cookie information" },
        ],
      },
      {
        eyebrow: "Responsible disclosure",
        title: "Security concerns should have a clear route",
        body: "A dedicated security contact route is not yet configured in the project. Until that is available, security-related website concerns should use the general contact route and include enough context for review. This is not a bug bounty program and does not promise monetary rewards.",
        links: [{ href: "/contact", label: "Contact KAMMAND" }],
      },
      {
        eyebrow: "Future Trust Documentation",
        title: "Additional trust documentation will be published as it becomes available",
        body: "The website is structured to support more detailed trust information later. Unavailable documents are not represented as live proof.",
        items: plannedTrustItems,
      },
    ],
    related: {
      eyebrow: "Contact",
      title: "Need to discuss security or privacy expectations?",
      copy: "Talk with KAMMAND about governance, cybersecurity, privacy, evidence, and assurance priorities.",
      links: [
        { href: "/contact", label: "Contact KAMMAND" },
        { href: "/book", label: "Book a Consultation" },
      ],
    },
  },
};

export function LegalPage({ kind }: LegalPageProps) {
  const page = pageDefinitions[kind];

  return (
    <main className={`legal-page legal-page--${kind}`} id="main-content">
      <LegalHero kind={kind} page={page} />
      <LegalStatus page={page} />
      <LegalDocument sections={page.sections} />
      {page.related ? <LegalRelated related={page.related} /> : null}
    </main>
  );
}

function LegalHero({ kind, page }: { kind: LegalPageKind; page: LegalPageDefinition }) {
  return (
    <section className="legal-hero" aria-labelledby="legal-title">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: page.breadcrumb, href: `/${kind}` },
          ]}
        />
        <div className="legal-hero__grid">
          <div className="legal-hero__content">
            <SectionLabel as="p">{page.eyebrow}</SectionLabel>
            <h1 id="legal-title">{page.title}</h1>
            <p className="text-body-large">{page.copy}</p>
            <p className="legal-page__updated">Last updated: August 16, 2026</p>
          </div>
          <LegalNavigation currentKind={kind} />
        </div>
      </Container>
    </section>
  );
}

function LegalNavigation({ currentKind }: { currentKind: LegalPageKind }) {
  return (
    <nav aria-label="Legal and trust pages" className="legal-route-nav">
      <p>Legal / Trust index</p>
      <ol>
        {legalNavigation.map((item, index) => (
          <li key={item.href}>
            <Link aria-current={item.kind === currentKind ? "page" : undefined} href={item.href}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function LegalStatus({ page }: { page: LegalPageDefinition }) {
  return (
    <section className="legal-status" aria-labelledby="legal-status-title">
      <Container>
        <div className="legal-status__grid">
          <SectionLabel as="p">{page.statusLabel}</SectionLabel>
          <h2 id="legal-status-title">{page.statusTitle}</h2>
          <p>{page.statusCopy}</p>
        </div>
      </Container>
    </section>
  );
}

function LegalDocument({ sections }: { sections: readonly LegalSection[] }) {
  return (
    <section className="legal-document" aria-labelledby="legal-document-title">
      <Container>
        <div className="legal-document__layout">
          <aside className="legal-toc">
            <nav aria-label="On this page">
              <p>On this page</p>
              <ol>
                {sections.map((section, index) => (
                  <li key={section.title}>
                    <a href={`#${toSectionId(section.title)}`}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {section.eyebrow ?? section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <div className="legal-document__content">
            <h2 className="sr-only" id="legal-document-title">Document sections</h2>
            {sections.map((section, index) => (
              <article className="legal-section" id={toSectionId(section.title)} key={section.title}>
                <p className="legal-section__number">{String(index + 1).padStart(2, "0")}</p>
                <div className="legal-section__body">
                  {section.eyebrow ? <SectionLabel as="p">{section.eyebrow}</SectionLabel> : null}
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                  {section.items ? (
                    <ul className="legal-section__list">
                      {section.items.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  ) : null}
                  {section.links ? <LegalLinks links={section.links} /> : null}
                  {section.content === "cookie-preferences" ? (
                    <div className="legal-preferences-action">
                      <CookiePreferencesButton />
                      <DirectionalArrow />
                    </div>
                  ) : null}
                  {section.content === "cookie-registry" ? <CookieRegistry /> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function CookieRegistry() {
  return (
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
              <th data-label="Name" scope="row">{item.name}</th>
              <td data-label="Provider">{item.provider}</td>
              <td data-label="Category">{item.category}</td>
              <td data-label="Purpose">{item.purpose}</td>
              <td data-label="Storage">{item.storageType}</td>
              <td data-label="Duration">{item.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LegalLinks({ links }: { links: ReadonlyArray<{ href: string; label: string }> }) {
  return (
    <div className="legal-links">
      {links.map((link) => (
        <Link href={link.href} key={link.href}>
          {link.label}
          <DirectionalArrow />
        </Link>
      ))}
    </div>
  );
}

function LegalRelated({ related }: { related: NonNullable<LegalPageDefinition["related"]> }) {
  return (
    <section className="legal-related" aria-labelledby="legal-related-title">
      <Container>
        <div className="legal-related__grid">
          <SectionLabel as="p">{related.eyebrow}</SectionLabel>
          <div>
            <h2 id="legal-related-title">{related.title}</h2>
            <p>{related.copy}</p>
          </div>
          <LegalLinks links={related.links} />
        </div>
      </Container>
    </section>
  );
}

function toSectionId(title: string) {
  return `section-${title
    .toLowerCase()
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/(^-|-$)/g, "")}`;
}
