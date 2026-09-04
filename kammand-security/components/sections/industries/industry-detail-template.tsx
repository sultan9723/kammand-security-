import Link from "next/link";
import type { IndustryDetail } from "../../../lib/industries";
import { Breadcrumbs } from "../../ui/breadcrumbs";
import { Container } from "../../ui/container";
import { DirectionalArrow } from "../../ui/directional-arrow";
import { SectionLabel } from "../../ui/section-label";
import { FinalCtaSection } from "../homepage/final-cta";

type IndustryDetailTemplateProps = { industry: IndustryDetail };
type IndustryIconName = "check" | "controls" | "framework" | "people" | "service";

function IndustryIcon({ name }: { name: IndustryIconName }) {
  if (name === "check") return <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" /><path d="m10 16 4 4 8-9" /></svg>;
  if (name === "controls") return <svg viewBox="0 0 32 32"><path d="M4 8h24M4 16h24M4 24h24" /><circle cx="11" cy="8" r="3" /><circle cx="21" cy="16" r="3" /><circle cx="14" cy="24" r="3" /></svg>;
  if (name === "framework") return <svg viewBox="0 0 32 32"><path d="m16 3 12 6-12 6L4 9l12-6Z" /><path d="m4 15 12 6 12-6M4 21l12 6 12-6" /></svg>;
  if (name === "people") return <svg viewBox="0 0 32 32"><circle cx="11" cy="11" r="4" /><circle cx="22" cy="12" r="3" /><path d="M4 27v-3c0-5 3-8 7-8s7 3 7 8v3M19 18c5 0 8 3 8 7v2" /></svg>;
  return <svg viewBox="0 0 32 32"><path d="M8 3h11l6 6v20H8zM19 3v7h6M12 15h9M12 20h9M12 25h6" /></svg>;
}

export function IndustryDetailTemplate({ industry }: IndustryDetailTemplateProps) {
  return (
    <main className="industry-profile" id="main-content">
      <section className="industry-profile__hero" aria-labelledby="industry-detail-title">
        <Container className="container-wide">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: industry.title, href: industry.href }]} />
          <div className="industry-profile__hero-grid">
            <div className="industry-profile__hero-content">
              <SectionLabel as="p">{industry.eyebrow}</SectionLabel>
              <h1 id="industry-detail-title">{industry.h1}</h1>
              <p className="text-body-large">{industry.positioning}</p>
              <div className="industry-profile__hero-actions" aria-label={`${industry.title} actions`}>
                <Link className="ui-button ui-button--primary" href="/book">Book a Consultation <DirectionalArrow /></Link>
                <Link className="ui-button ui-button--secondary" href="/services">Explore Services <DirectionalArrow /></Link>
              </div>
            </div>
            <aside className="industry-profile__hero-panel" aria-label={`${industry.title} engagement priorities`}>
              <div className="industry-profile__hero-panel-heading">
                <p className="eyebrow">OPERATING CONTEXT</p>
                <strong>{industry.title}</strong>
                <p>Priority areas that shape advisory scope.</p>
              </div>
              <ol>{industry.engagementAreas.slice(0, 4).map((area, index) => <li key={area}><span>{String(index + 1).padStart(2, "0")}</span><p>{area}</p></li>)}</ol>
            </aside>
          </div>
        </Container>
      </section>

      <section className="industry-profile__context" aria-labelledby="industry-context-title">
        <Container className="container-wide">
          <div className="industry-profile__context-band">
            <div><SectionLabel as="p">Industry Context</SectionLabel><h2 id="industry-context-title">Operating context changes the work.</h2></div>
            <p>{industry.context}</p>
          </div>
        </Container>
      </section>

      <section className="industry-profile__challenges" aria-labelledby="industry-challenges-title">
        <Container>
          <div className="industry-profile__section-header">
            <SectionLabel align="center" as="p">
              Key GRC and Cybersecurity Challenges
            </SectionLabel>
            <h2 id="industry-challenges-title">Where governance and cybersecurity often need structure.</h2>
            <p>These are industry-specific advisory themes, not claims about every organization in the sector.</p>
          </div>
          <ul className="industry-profile__challenge-grid" aria-label={`${industry.title} GRC and cybersecurity challenges`}>
            {industry.challenges.map((challenge, index) => <li key={challenge}><span>{String(index + 1).padStart(2, "0")}</span><IndustryIcon name="controls" /><p>{challenge}</p></li>)}
          </ul>
        </Container>
      </section>

      <section className="industry-profile__support" aria-labelledby="industry-help-title">
        <Container className="container-wide">
          <div className="industry-profile__support-band">
            <div><SectionLabel as="p">How Kammand Can Help</SectionLabel><h2 id="industry-help-title">Advisory support matched to the environment.</h2></div>
            <p>{industry.support}</p>
          </div>
        </Container>
      </section>

      <section className="industry-profile__services" aria-labelledby="industry-services-title">
        <Container>
          <div className="industry-profile__section-header">
            <SectionLabel align="center" as="p">
              Relevant Services
            </SectionLabel>
            <h2 id="industry-services-title">Service paths connected to this context.</h2>
            <p>These links reflect likely advisory focus areas for this industry context. They are not presented as a universal package.</p>
          </div>
          <div className="industry-profile__service-grid">
            {industry.relatedServices.map((service, index) => <Link href={service.href} key={service.href}><span>{String(index + 1).padStart(2, "0")}</span><IndustryIcon name="service" /><h3>{service.title}</h3><DirectionalArrow /></Link>)}
          </div>
        </Container>
      </section>

      <section className="industry-profile__frameworks" aria-labelledby="industry-framework-title">
        <Container className="container-wide">
          <div className="industry-profile__frameworks-grid">
            <div className="industry-profile__frameworks-copy">
              <SectionLabel as="p">Regulatory and Framework Context</SectionLabel>
              <h2 id="industry-framework-title">Applicability depends on jurisdiction, activity and scope.</h2>
              <p>{industry.frameworkContext}</p>
            </div>
            <ul aria-label={`${industry.title} framework references`}>
              {industry.frameworks.map((framework, index) => <li key={framework.href}><Link href={framework.href}><span>{String(index + 1).padStart(2, "0")}</span><IndustryIcon name="framework" /><strong>{framework.title}</strong><DirectionalArrow /></Link></li>)}
            </ul>
          </div>
        </Container>
      </section>

      <section className="industry-profile__engagement" aria-label={`${industry.title} engagement areas and related industries`}>
        <Container className="container-wide">
          <div className="industry-profile__engagement-grid">
            <article aria-labelledby="industry-engagement-title">
              <SectionLabel as="p">Practical Engagement Areas</SectionLabel>
              <h2 id="industry-engagement-title">Where work can become more structured.</h2>
              <ul>{industry.engagementAreas.map((area) => <li key={area}><IndustryIcon name="check" /><span>{area}</span></li>)}</ul>
            </article>
            <article aria-labelledby="industry-related-title">
              <SectionLabel as="p">Related Industries</SectionLabel>
              <h2 id="industry-related-title">Adjacent operating contexts.</h2>
              <div className="industry-profile__related-grid">
                {industry.relatedIndustries.map((related, index) => <Link href={related.href} key={related.href}><span>{String(index + 1).padStart(2, "0")}</span><IndustryIcon name="people" /><strong>{related.title}</strong><DirectionalArrow /></Link>)}
              </div>
            </article>
          </div>
        </Container>
      </section>

      <FinalCtaSection actionsLabel={`${industry.title} consultation actions`} description="Talk with KAMMAND about governance, cybersecurity, evidence, remediation and assurance priorities in your operating environment." headingId="industry-final-cta-title" title="Ready to structure risk around your environment?" />
    </main>
  );
}
