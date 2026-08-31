import Link from "next/link";
import type { FrameworkDetail } from "../../../lib/frameworks";
import { Breadcrumbs } from "../../ui/breadcrumbs";
import { Container } from "../../ui/container";
import { DirectionalArrow } from "../../ui/directional-arrow";
import { FinalCtaSection } from "../homepage/final-cta";

type FrameworkDetailTemplateProps = { framework: FrameworkDetail };
type FrameworkIconName = "check" | "controls" | "evidence" | "focus" | "relationship" | "scope";

function FrameworkIcon({ name }: { name: FrameworkIconName }) {
  if (name === "check") return <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" /><path d="m10 16 4 4 8-9" /></svg>;
  if (name === "controls") return <svg viewBox="0 0 32 32"><path d="M4 8h24M4 16h24M4 24h24" /><circle cx="11" cy="8" r="3" /><circle cx="21" cy="16" r="3" /><circle cx="14" cy="24" r="3" /></svg>;
  if (name === "evidence") return <svg viewBox="0 0 32 32"><path d="M8 3h11l6 6v20H8zM19 3v7h6M12 15h9M12 20h9M12 25h6" /></svg>;
  if (name === "relationship") return <svg viewBox="0 0 32 32"><circle cx="9" cy="16" r="5" /><circle cx="23" cy="9" r="4" /><circle cx="23" cy="24" r="4" /><path d="m13 14 6-3M13 18l6 4" /></svg>;
  if (name === "scope") return <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" /><circle cx="16" cy="16" r="5" /><path d="m16 16 11-11M22 5h5v5" /></svg>;
  return <svg viewBox="0 0 32 32"><path d="m16 3 12 6-12 6L4 9l12-6Z" /><path d="m4 15 12 6 12-6M4 21l12 6 12-6" /></svg>;
}

export function FrameworkDetailTemplate({ framework }: FrameworkDetailTemplateProps) {
  return (
    <main className="framework-profile" id="main-content">
      <section className="framework-profile__hero" aria-labelledby="framework-detail-title">
        <Container className="container-wide">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Frameworks", href: "/frameworks" }, { label: framework.title, href: framework.href }]} />
          <div className="framework-profile__hero-grid">
            <div className="framework-profile__hero-content">
              <p className="eyebrow">{framework.eyebrow}</p>
              <h1 id="framework-detail-title">{framework.h1}</h1>
              <p className="text-body-large">{framework.context}</p>
              <div className="framework-profile__hero-actions" aria-label={`${framework.title} actions`}>
                <Link className="ui-button ui-button--primary" href="/book">Book a Consultation <DirectionalArrow /></Link>
                <Link className="ui-button ui-button--secondary" href="/services">Explore Services <DirectionalArrow /></Link>
              </div>
            </div>
            <aside className="framework-profile__hero-panel" aria-label={`${framework.title} implementation themes`}>
              <div className="framework-profile__hero-panel-heading">
                <span><FrameworkIcon name="focus" /></span>
                <div><p className="eyebrow">FRAMEWORK LENS</p><strong>{framework.fullName}</strong></div>
              </div>
              <ol>{framework.focusAreas.slice(0, 4).map((area, index) => <li key={area}><span>{String(index + 1).padStart(2, "0")}</span><p>{area}</p></li>)}</ol>
            </aside>
          </div>
        </Container>
      </section>

      <section className="framework-profile__definition" aria-labelledby="framework-what-title">
        <Container className="container-wide">
          <div className="framework-profile__definition-band">
            <div><p className="eyebrow">WHAT IT IS</p><h2 id="framework-what-title">{framework.fullName}</h2></div>
            <p>{framework.whatItIs}</p>
          </div>
        </Container>
      </section>

      <section className="framework-profile__applicability" aria-label={`${framework.title} relevance and focus areas`}>
        <Container className="container-wide">
          <div className="framework-profile__applicability-grid">
            <article aria-labelledby="framework-relevance-title">
              <p className="eyebrow">WHO IT MAY BE RELEVANT TO</p>
              <h2 id="framework-relevance-title">Teams turning expectations into accountable work.</h2>
              <ul>{framework.relevance.map((item) => <li key={item}><FrameworkIcon name="scope" /><span>{item}</span></li>)}</ul>
            </article>
            <article aria-labelledby="framework-focus-title">
              <p className="eyebrow">MAJOR FOCUS AREAS</p>
              <h2 id="framework-focus-title">Common areas to organize and sustain.</h2>
              <ul>{framework.focusAreas.map((item) => <li key={item}><FrameworkIcon name="check" /><span>{item}</span></li>)}</ul>
            </article>
          </div>
        </Container>
      </section>

      <section className="framework-profile__challenges" aria-labelledby="framework-challenges-title">
        <Container>
          <div className="framework-profile__section-header">
            <p className="eyebrow">IMPLEMENTATION CHALLENGES</p>
            <h2 id="framework-challenges-title">The difficult work is operational, not cosmetic.</h2>
            <p>These are common organizational challenges KAMMAND helps teams structure. They are not presented as official findings or formal framework requirements.</p>
          </div>
          <ul className="framework-profile__challenge-grid" aria-label={`${framework.title} implementation challenges`}>
            {framework.challenges.map((challenge, index) => <li key={challenge}><span>{String(index + 1).padStart(2, "0")}</span><FrameworkIcon name="controls" /><p>{challenge}</p></li>)}
          </ul>
        </Container>
      </section>

      <section className="framework-profile__help" aria-labelledby="framework-help-title">
        <Container>
          <div className="framework-profile__section-header">
            <p className="eyebrow">HOW KAMMAND CAN HELP</p>
            <h2 id="framework-help-title">Advisory support across governance, risk and assurance.</h2>
          </div>
          <div className="framework-profile__help-grid">
            {framework.help.map((service, index) => (
              <Link href={service.href} key={service.href}>
                <span>{String(index + 1).padStart(2, "0")}</span><FrameworkIcon name="evidence" />
                <h3>{service.title}</h3><p>{service.description}</p><DirectionalArrow />
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="framework-profile__relationships" aria-labelledby="framework-relationships-title">
        <Container className="container-wide">
          <div className="framework-profile__relationships-grid">
            <div className="framework-profile__relationships-copy">
              <p className="eyebrow">FRAMEWORK RELATIONSHIPS</p>
              <h2 id="framework-relationships-title">Related obligations may overlap in practice.</h2>
              <p>These links are contextual references only. They do not imply formal equivalence between requirements or control mappings.</p>
            </div>
            <ul>{framework.relationships.map((related, index) => (
              <li key={related.href}><Link href={related.href}>
                <span>{String(index + 1).padStart(2, "0")}</span><FrameworkIcon name="relationship" />
                <div><strong>{related.title}</strong><p>{related.description}</p></div><DirectionalArrow />
              </Link></li>
            ))}</ul>
          </div>
        </Container>
      </section>

      <section className="framework-profile__related" aria-labelledby="framework-related-services-title">
        <Container>
          <div className="framework-profile__section-header"><p className="eyebrow">RELATED SERVICES</p><h2 id="framework-related-services-title">Service paths connected to framework work.</h2></div>
          <div className="framework-profile__related-grid">
            {framework.relatedServices.map((service, index) => <Link href={service.href} key={service.href}><span>{String(index + 1).padStart(2, "0")}</span><h3>{service.title}</h3><DirectionalArrow /></Link>)}
          </div>
        </Container>
      </section>

      <section className="framework-profile__sources" aria-labelledby="framework-sources-title">
        <Container className="container-wide">
          <div className="framework-profile__sources-grid">
            <div>
              <p className="eyebrow">SOURCES AND VERIFICATION</p><h2 id="framework-sources-title">Authoritative references pending verification.</h2>
              {framework.references.length > 0 ? (
                <ul className="framework-profile__source-list">{framework.references.map((reference) => <li key={reference.label}>{reference.href ? <Link href={reference.href}>{reference.label}</Link> : <strong>{reference.label}</strong>}<p>{reference.note}</p></li>)}</ul>
              ) : (
                <p>No official source URLs are stored in the project yet. This section is structured to support verified issuing authority, official framework, and regulatory guidance references when approved source material is added.</p>
              )}
            </div>
            <aside aria-label={`${framework.title} publication verification notes`}>
              <p className="eyebrow">PUBLICATION CHECKS</p>
              <ul>{framework.verificationNotes.map((note) => <li key={note}><FrameworkIcon name="evidence" /><span>{note}</span></li>)}</ul>
            </aside>
          </div>
          <div className="framework-profile__disclaimer" role="note"><FrameworkIcon name="scope" /><p>KAMMAND framework content provides general information and advisory context. It is not legal advice or an authoritative substitute for requirements issued by the relevant regulator or standards body.</p></div>
        </Container>
      </section>

      <FinalCtaSection actionsLabel={`${framework.title} consultation actions`} description="Talk with KAMMAND about governance, controls, evidence, remediation and assurance priorities." headingId="framework-final-cta-title" title="Need to turn framework pressure into action?" />
    </main>
  );
}
