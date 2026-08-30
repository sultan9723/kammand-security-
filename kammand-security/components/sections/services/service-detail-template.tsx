import Link from "next/link";
import { engagementSteps, type ServiceDetail } from "../../../lib/services";
import { Breadcrumbs } from "../../ui/breadcrumbs";
import { Container } from "../../ui/container";
import { FinalCtaSection } from "../homepage/final-cta";

type ServiceDetailTemplateProps = {
  service: ServiceDetail;
};

type ServiceIconName = "arrow" | "check" | "document" | "framework" | "people" | "scope";

function ServiceIcon({ name }: { name: ServiceIconName }) {
  if (name === "document") return <svg viewBox="0 0 32 32"><path d="M8 3h11l6 6v20H8zM19 3v7h6M12 15h9M12 20h9M12 25h6" /></svg>;
  if (name === "framework") return <svg viewBox="0 0 32 32"><path d="m16 3 12 6-12 6L4 9l12-6Z" /><path d="m4 15 12 6 12-6M4 21l12 6 12-6" /></svg>;
  if (name === "people") return <svg viewBox="0 0 32 32"><circle cx="11" cy="11" r="4" /><circle cx="22" cy="12" r="3" /><path d="M4 27v-3c0-5 3-8 7-8s7 3 7 8v3M19 18c5 0 8 3 8 7v2" /></svg>;
  if (name === "scope") return <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" /><circle cx="16" cy="16" r="5" /><path d="m16 16 11-11M22 5h5v5" /></svg>;
  if (name === "arrow") return <svg viewBox="0 0 32 32"><path d="M5 16h22M20 9l7 7-7 7" /></svg>;
  return <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" /><path d="m10 16 4 4 8-9" /></svg>;
}

export function ServiceDetailTemplate({ service }: ServiceDetailTemplateProps) {
  return (
    <main className="service-profile" id="main-content">
      <section className="service-profile__hero" aria-labelledby="service-detail-title">
        <Container className="container-wide">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: service.title, href: service.href }]} />
          <div className="service-profile__hero-grid">
            <div className="service-profile__hero-content">
              <p className="eyebrow">{service.eyebrow}</p>
              <h1 id="service-detail-title">{service.h1}</h1>
              <p className="text-body-large">{service.valueProposition}</p>
              <div className="service-profile__hero-actions" aria-label={`${service.title} actions`}>
                <Link className="ui-button ui-button--primary" href="/book">Book a Consultation <span aria-hidden="true">-&gt;</span></Link>
                <Link className="ui-button ui-button--secondary" href="/services">View All Services <span aria-hidden="true">-&gt;</span></Link>
              </div>
            </div>
            <aside className="service-profile__hero-panel" aria-label={`${service.title} focus areas`}>
              <div className="service-profile__hero-panel-heading">
                <span><ServiceIcon name="scope" /></span>
                <div><p className="eyebrow">SERVICE FOCUS</p><strong>Clear scope. Practical structure.</strong></div>
              </div>
              <ol>
                {service.activities.slice(0, 4).map((activity, index) => (
                  <li key={activity}><span>{String(index + 1).padStart(2, "0")}</span><p>{activity}</p></li>
                ))}
              </ol>
            </aside>
          </div>
        </Container>
      </section>

      <section className="service-profile__context" aria-labelledby="service-context-title">
        <Container className="container-wide">
          <div className="service-profile__context-band">
            <div><p className="eyebrow">CONTEXT</p><h2 id="service-context-title">The problem this service addresses.</h2></div>
            <p>{service.problem}</p>
          </div>
        </Container>
      </section>

      <section className="service-profile__work" aria-labelledby="service-work-title">
        <Container>
          <div className="service-profile__section-header">
            <p className="eyebrow">WHAT KAMMAND DOES</p>
            <h2 id="service-work-title">Practical advisory across governance, controls and evidence.</h2>
            <p>{service.approach}</p>
          </div>
          <ul className="service-profile__activity-grid" aria-label={`${service.title} activities`}>
            {service.activities.map((activity, index) => (
              <li key={activity}>
                <span className="service-profile__activity-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="service-profile__activity-icon"><ServiceIcon name="document" /></span>
                <p>{activity}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="service-profile__value" aria-label={`${service.title} audience and outcomes`}>
        <Container className="container-wide">
          <div className="service-profile__value-grid">
            <article aria-labelledby="service-fit-title">
              <p className="eyebrow">WHO THIS IS FOR</p>
              <h2 id="service-fit-title">Organizations that need a clearer GRC operating model.</h2>
              <ul>{service.audience.map((item) => <li key={item}><ServiceIcon name="people" /><span>{item}</span></li>)}</ul>
            </article>
            <article aria-labelledby="service-outcomes-title">
              <p className="eyebrow">PRACTICAL OUTCOMES</p>
              <h2 id="service-outcomes-title">What the engagement helps strengthen.</h2>
              <ul>{service.outcomes.map((item) => <li key={item}><ServiceIcon name="check" /><span>{item}</span></li>)}</ul>
            </article>
          </div>
        </Container>
      </section>

      <section className="service-profile__frameworks" aria-labelledby="service-frameworks-title">
        <Container className="container-wide">
          <div className="service-profile__frameworks-grid">
            <div className="service-profile__frameworks-copy">
              <p className="eyebrow">RELEVANT FRAMEWORKS</p>
              <h2 id="service-frameworks-title">Framework-aware without overstating equivalence.</h2>
              <p>This service can support work across common GCC and international frameworks. Exact applicability and control mapping depend on organizational scope and obligations.</p>
            </div>
            <ul aria-label={`${service.title} frameworks`}>
              {service.frameworks.map((framework, index) => (
                <li key={framework.href}>
                  <Link href={framework.href}><span>{String(index + 1).padStart(2, "0")}</span><ServiceIcon name="framework" /><strong>{framework.label}</strong><ServiceIcon name="arrow" /></Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="service-profile__process" id="service-engagement" aria-labelledby="service-engagement-title">
        <Container>
          <div className="service-profile__section-header">
            <p className="eyebrow">ENGAGEMENT APPROACH</p>
            <h2 id="service-engagement-title">A structured path from discovery to assurance.</h2>
            <p>A consistent engagement structure keeps scope, ownership, implementation, and assurance connected.</p>
          </div>
          <ol>
            {engagementSteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div className="service-profile__process-icon"><ServiceIcon name={index === 0 ? "scope" : index === 1 ? "framework" : index === 2 ? "document" : "check"} /></div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="service-profile__related" aria-labelledby="related-services-title">
        <Container>
          <div className="service-profile__section-header">
            <p className="eyebrow">RELATED SERVICES</p>
            <h2 id="related-services-title">Adjacent support for risk, audit and assurance.</h2>
          </div>
          <div className="service-profile__related-grid">
            {service.relatedServices.map((related, index) => (
              <Link href={related.href} key={related.href}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{related.title}</h3>
                <ServiceIcon name="arrow" />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <FinalCtaSection
        actionsLabel={`${service.title} consultation actions`}
        description="Talk with KAMMAND about governance, risk, compliance, evidence and remediation priorities."
        headingId="service-final-cta-title"
        title="Ready to make GRC more practical?"
      />
    </main>
  );
}
