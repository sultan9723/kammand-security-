import Link from "next/link";
import { engagementSteps, frameworks, serviceSummaries } from "../../../lib/services";
import { Container } from "../../ui/container";
import { DirectionalArrow } from "../../ui/directional-arrow";
import { FinalCtaSection } from "../homepage/final-cta";

const serviceIcons = [
  "governance",
  "leadership",
  "risk",
  "third-party",
  "audit",
  "assurance",
] as const;

const frameworkRelationships = [
  ["strong", "strong", "strong", "strong"],
  ["strong", "strong", "partial", "strong"],
  ["strong", "strong", "strong", "strong"],
  ["strong", "partial", "partial", "strong"],
  ["strong", "strong", "partial", "strong"],
  ["strong", "strong", "strong", "strong"],
] as const;

type ServiceIconName = (typeof serviceIcons)[number];
type Relationship = (typeof frameworkRelationships)[number][number];

const heroValues = [
  {
    icon: "tailored",
    title: "Tailored",
    description: "Solutions aligned to your regulatory and business context.",
  },
  {
    icon: "integrated",
    title: "Integrated",
    description: "Bringing governance, risk and compliance into one flow.",
  },
  {
    icon: "practical",
    title: "Practical",
    description: "Actionable roadmaps that turn requirements into results.",
  },
  {
    icon: "trusted",
    title: "Trusted",
    description: "Independent advice to strengthen confidence and accountability.",
  },
] as const;

type HeroValueIconName = (typeof heroValues)[number]["icon"];

function HeroValueIcon({ icon }: { icon: HeroValueIconName }) {
  if (icon === "tailored") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="9" />
        <circle cx="16" cy="16" r="3" />
        <path d="M16 3v5M16 24v5M3 16h5M24 16h5" />
      </svg>
    );
  }

  if (icon === "integrated") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <circle cx="7" cy="16" r="3" />
        <circle cx="23" cy="7" r="3" />
        <circle cx="25" cy="23" r="3" />
        <circle cx="16" cy="16" r="3" />
        <path d="m10 16 3 0M18 13l3-4M18 18l4 3" />
      </svg>
    );
  }

  if (icon === "practical") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M5 27h22M7 27v-8h5v8M14 27V13h5v14M21 27V6h5v21" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <path d="M16 3c4 3 8 4 11 4v8c0 7-4 11-11 14C9 26 5 22 5 15V7c3 0 7-1 11-4Z" />
      <path d="m11 16 3 3 7-8" />
    </svg>
  );
}

function HeroPanelIcon({ type }: { type: "governance" | "risk" | "compliance" | "assurance" }) {
  if (type === "risk") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="8" />
        <path d="M16 4v4M16 24v4M4 16h4M24 16h4M13 13l6 6M19 13l-6 6" />
      </svg>
    );
  }

  if (type === "compliance") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M8 4h13l4 4v20H8zM21 4v5h5" />
        <path d="m12 16 2 2 4-4M12 23h8" />
      </svg>
    );
  }

  if (type === "assurance") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M16 3 20 6l5 1 1 5 3 4-3 4-1 5-5 1-4 3-4-3-5-1-1-5-3-4 3-4 1-5 5-1Z" />
        <path d="m11 16 3 3 7-8" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <path d="M16 3c4 3 8 4 11 4v8c0 7-4 11-11 14C9 26 5 22 5 15V7c3 0 7-1 11-4Z" />
    </svg>
  );
}

function ServicesHeroDiagram() {
  const panels = ["governance", "risk", "compliance", "assurance"] as const;
  const stages = ["Structured", "Integrated", "Evidence-driven", "Assurance-led"];

  return (
    <div className="services-hero-diagram" aria-hidden="true">
      <div className="services-hero-diagram__field">
        <span className="services-hero-diagram__guide services-hero-diagram__guide--one" />
        <span className="services-hero-diagram__guide services-hero-diagram__guide--two" />
        {panels.map((panel) => (
          <div
            className={`services-hero-diagram__panel services-hero-diagram__panel--${panel}`}
            key={panel}
          >
            <HeroPanelIcon type={panel} />
            <span>{panel === "risk" ? "Risk management" : panel}</span>
          </div>
        ))}
        <div className="services-hero-diagram__axis">
          {stages.map((stage) => <span key={stage}>{stage}</span>)}
        </div>
      </div>
    </div>
  );
}

function ServiceIcon({ icon }: { icon: ServiceIconName }) {
  if (icon === "leadership") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <circle cx="16" cy="11" r="5" />
        <path d="M7 27v-2c0-5 4-8 9-8s9 3 9 8v2M12 26h8" />
      </svg>
    );
  }

  if (icon === "risk") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M5 26h22M8 23v-5M14 23v-9M20 23v-6M26 23V8" />
        <path d="m7 14 6-5 6 3 8-7M22 5h5v5" />
      </svg>
    );
  }

  if (icon === "third-party") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <circle cx="12" cy="11" r="4" />
        <circle cx="22" cy="13" r="3" />
        <path d="M4 27v-3c0-5 3-8 8-8s8 3 8 8v3M20 18c5 0 8 3 8 7v2" />
      </svg>
    );
  }

  if (icon === "audit") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M9 4h14v24H9z" />
        <path d="M13 10h6M13 16h6M13 22h6" />
        <circle cx="6" cy="10" r="1" />
        <circle cx="6" cy="16" r="1" />
        <circle cx="6" cy="22" r="1" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <path d="M16 3c4 3 8 4 11 4v8c0 7-4 11-11 14C9 26 5 22 5 15V7c3 0 7-1 11-4Z" />
      {icon === "assurance" ? <path d="m11 16 3 3 7-8" /> : null}
    </svg>
  );
}

function ProcessIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <circle cx="14" cy="14" r="8" />
        <path d="m20 20 7 7" />
      </svg>
    );
  }

  if (index === 1) {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M7 5h16v22H7zM11 11h7M11 16h5M11 21h4" />
        <path d="m18 20 8-8 3 3-8 8-4 1Z" />
      </svg>
    );
  }

  if (index === 2) {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="5" />
        <path d="m16 3 2 3 4-1 1 4 4 1-1 4 3 2-3 2 1 4-4 1-1 4-4-1-2 3-2-3-4 1-1-4-4-1 1-4-3-2 3-2-1-4 4-1 1-4 4 1Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <path d="M16 3c4 3 8 4 11 4v8c0 7-4 11-11 14C9 26 5 22 5 15V7c3 0 7-1 11-4Z" />
      <path d="m11 16 3 3 7-8" />
    </svg>
  );
}

function FrameworkMark({ index }: { index: number }) {
  const labels = ["S", "N", "P", "ISO"];

  return <span aria-hidden="true">{labels[index]}</span>;
}

function RelationshipMark({ relationship }: { relationship: Relationship }) {
  return (
    <span
      aria-label={`${relationship} alignment`}
      className={`services-frameworks__relationship services-frameworks__relationship--${relationship}`}
      role="img"
    />
  );
}

export function ServicesOverviewPage() {
  return (
    <main className="services-overview" id="main-content">
      <section className="services-overview__hero" aria-labelledby="services-overview-title">
        <Container className="container-wide">
          <div className="services-overview__hero-frame">
            <div className="services-overview__hero-main">
              <div className="services-overview__hero-content">
                <div className="services-overview__hero-kicker">
                  <p className="eyebrow">SERVICES</p>
                </div>
                <h1 id="services-overview-title">
                  GRC and cybersecurity services for regulated organizations.
                </h1>
                <p className="text-body-large">
                  Use this page to compare KAMMAND&apos;s advisory paths and choose
                  the workstream that matches your current GRC or security need.
                </p>
                <div className="services-overview__hero-actions">
                  <Link className="ui-button ui-button--primary" href="/book">
                    Book a Consultation
                    <DirectionalArrow />
                  </Link>
                  <Link className="ui-button ui-button--secondary" href="#service-capabilities">
                    Explore Services
                    <DirectionalArrow />
                  </Link>
                </div>
              </div>
              <ServicesHeroDiagram />
            </div>
            <ul className="services-overview__hero-values" aria-label="KAMMAND service principles">
              {heroValues.map((value) => (
                <li key={value.title}>
                  <span className="services-overview__hero-value-icon">
                    <HeroValueIcon icon={value.icon} />
                  </span>
                  <span>
                    <strong>{value.title}</strong>
                    <small>{value.description}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="services-capabilities" id="service-capabilities" aria-labelledby="service-summaries-title">
        <Container>
          <div className="services-overview__section-header">
            <p className="eyebrow">CAPABILITIES</p>
            <h2 id="service-summaries-title">Choose the advisory path that fits the problem.</h2>
          </div>

          <div className="services-capabilities__grid">
            {serviceSummaries.map((service, index) => (
              <Link className="services-capabilities__card" href={service.href} key={service.href}>
                <span className="services-capabilities__icon">
                  <ServiceIcon icon={serviceIcons[index]} />
                </span>
                <DirectionalArrow className="services-capabilities__arrow" />
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="services-frameworks" aria-labelledby="framework-support-title">
        <Container>
          <div className="services-frameworks__layout">
            <div className="services-frameworks__content">
              <p className="eyebrow">FRAMEWORK RELATIONSHIPS</p>
              <h2 id="framework-support-title">Frameworks shape how the work is organized.</h2>
              <p>
                KAMMAND services help teams organize controls, evidence,
                ownership and remediation across applicable frameworks.
              </p>
              <p>Detailed mapping depends on scope, obligations and the organization.</p>
            </div>

            <div
              aria-label="Indicative service and framework relationship matrix"
              className="services-frameworks__table-wrap"
              role="region"
              tabIndex={0}
            >
              <table>
                <caption>
                  Indicative relationships only; final mapping depends on engagement scope and obligations.
                </caption>
                <thead>
                  <tr>
                    <th scope="col"><span className="sr-only">Service</span></th>
                    {frameworks.map((framework, index) => (
                      <th scope="col" key={framework.href}>
                        <Link href={framework.href}>
                          <FrameworkMark index={index} />
                          {framework.label}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {serviceSummaries.map((service, serviceIndex) => (
                    <tr key={service.href}>
                      <th scope="row">
                        <Link href={service.href}>{service.title}</Link>
                      </th>
                      {frameworkRelationships[serviceIndex].map((relationship, frameworkIndex) => (
                        <td key={`${service.href}-${frameworks[frameworkIndex].href}`}>
                          <RelationshipMark relationship={relationship} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5}>
                      <span><RelationshipMark relationship="strong" /> Strong alignment</span>
                      <span><RelationshipMark relationship="partial" /> Partial alignment</span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </Container>
      </section>

      <section className="services-engagement" id="how-we-work" aria-labelledby="engagements-title">
        <Container>
          <div className="services-overview__section-header">
            <p className="eyebrow">HOW ENGAGEMENTS WORK</p>
            <h2 id="engagements-title">Structured advisory from discovery to assurance.</h2>
          </div>
          <ol className="services-engagement__steps" aria-label="Service engagement process">
            {engagementSteps.map((step, index) => (
              <li key={step.title}>
                <span className="services-engagement__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="services-engagement__icon">
                  <ProcessIcon index={index} />
                </span>
                {index < engagementSteps.length - 1 ? (
                  <DirectionalArrow className="services-engagement__arrow" />
                ) : null}
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <FinalCtaSection />
    </main>
  );
}
