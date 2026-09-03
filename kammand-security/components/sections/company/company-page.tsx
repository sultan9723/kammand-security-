import Image from "next/image";
import { operatingPrinciples, supportContexts } from "../../../lib/company";
import Link from "next/link";
import { frameworkSummaries } from "../../../lib/frameworks";
import { engagementSteps, serviceSummaries } from "../../../lib/services";
import { Breadcrumbs } from "../../ui/breadcrumbs";
import { Container } from "../../ui/container";
import { DirectionalArrow } from "../../ui/directional-arrow";

const storyHighlights = [
  { icon: "building", label: "Advisory-first approach" },
  { icon: "users", label: "Cross-industry perspective" },
  { icon: "shield", label: "Focused on measurable outcomes" },
] as const;

const commitments = [
  { icon: "users", label: "Cross-industry perspective" },
  { icon: "shield", label: "Advisory independence" },
  { icon: "chart", label: "Outcome-focused work" },
  { icon: "handshake", label: "Long-term continuity" },
] as const;

type CompanyIconName =
  | "building"
  | "chart"
  | "check"
  | "continuity"
  | "document"
  | "gear"
  | "handshake"
  | "lock"
  | "pen"
  | "person"
  | "search"
  | "shield"
  | "target"
  | "users";

function CompanyIcon({ name }: { name: CompanyIconName }) {
  if (name === "target") return <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" /><circle cx="16" cy="16" r="5" /><path d="m16 16 11-11M22 5h5v5" /></svg>;
  if (name === "person") return <svg viewBox="0 0 32 32"><circle cx="16" cy="10" r="5" /><path d="M7 28v-3c0-6 4-9 9-9s9 3 9 9v3" /></svg>;
  if (name === "gear") return <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="5" /><path d="m16 3 2 3 4-1 1 4 4 1-1 4 3 2-3 2 1 4-4 1-1 4-4-1-2 3-2-3-4 1-1-4-4-1 1-4-3-2 3-2-1-4 4-1 1-4 4 1Z" /></svg>;
  if (name === "document") return <svg viewBox="0 0 32 32"><path d="M8 3h11l6 6v20H8zM19 3v7h6M12 15h9M12 20h9M12 25h6" /></svg>;
  if (name === "shield") return <svg viewBox="0 0 32 32"><path d="M16 3c4 3 8 4 11 4v8c0 7-4 11-11 14C9 26 5 22 5 15V7c3 0 7-1 11-4Z" /><path d="m11 16 3 3 7-8" /></svg>;
  if (name === "continuity") return <svg viewBox="0 0 32 32"><path d="M13 10c-2-3-7-3-9 0-3 5 3 12 8 12 6 0 8-12 15-12 5 0 5 12-2 12-3 0-5-2-6-4" /></svg>;
  if (name === "building") return <svg viewBox="0 0 32 32"><path d="M5 28h22M7 28V13h8v15M15 28V5h10v23M10 17h2M10 21h2M19 10h2M19 15h2M19 20h2" /></svg>;
  if (name === "users") return <svg viewBox="0 0 32 32"><circle cx="11" cy="11" r="4" /><circle cx="22" cy="12" r="3" /><path d="M4 27v-3c0-5 3-8 7-8s7 3 7 8v3M19 18c5 0 8 3 8 7v2" /></svg>;
  if (name === "chart") return <svg viewBox="0 0 32 32"><path d="M5 27h22M7 27v-7M13 27V15M19 27V10M25 27V5" /><path d="m6 15 7-6 6 3 8-8" /></svg>;
  if (name === "handshake") return <svg viewBox="0 0 32 32"><path d="m3 12 6-6 6 3 3-2 11 9-5 5-3 5-5 2-5-4-3-5Z" /><path d="m11 12 5 4c2 2 4-1 2-3l-3-3M13 23l3 3M17 20l4 3M20 17l4 3" /></svg>;
  if (name === "search") return <svg viewBox="0 0 32 32"><circle cx="14" cy="14" r="8" /><path d="m20 20 7 7" /></svg>;
  if (name === "pen") return <svg viewBox="0 0 32 32"><path d="m7 24 3-8L23 3l6 6-13 13-9 2ZM20 6l6 6M7 24l7-2" /></svg>;
  if (name === "lock") return <svg viewBox="0 0 32 32"><rect x="7" y="13" width="18" height="15" rx="2" /><path d="M11 13V9a5 5 0 0 1 10 0v4M16 19v4" /></svg>;
  return <svg viewBox="0 0 32 32"><path d="m10 16 4 4 9-10" /><circle cx="16" cy="16" r="12" /></svg>;
}

function CompanyCompass() {
  const nodes: readonly { icon: CompanyIconName; className: string }[] = [
    { icon: "shield", className: "company-compass__node--one" },
    { icon: "document", className: "company-compass__node--two" },
    { icon: "chart", className: "company-compass__node--three" },
    { icon: "lock", className: "company-compass__node--four" },
    { icon: "users", className: "company-compass__node--five" },
  ];

  return (
    <div className="company-compass" aria-hidden="true">
      <span className="company-compass__orbit company-compass__orbit--outer" />
      <span className="company-compass__orbit company-compass__orbit--middle" />
      <span className="company-compass__orbit company-compass__orbit--inner" />
      <div className="company-compass__dial">
        <span className="company-compass__needle company-compass__needle--north" />
        <span className="company-compass__needle company-compass__needle--south" />
        <span className="company-compass__pin" />
      </div>
      {nodes.map((node) => (
        <span className={`company-compass__node ${node.className}`} key={node.className}>
          <CompanyIcon name={node.icon} />
        </span>
      ))}
    </div>
  );
}

export function CompanyPage() {
  const processIcons: readonly CompanyIconName[] = ["search", "pen", "gear", "shield"];
  const serviceIcons: readonly CompanyIconName[] = ["search", "document", "shield", "building", "pen", "users"];

  return (
    <main className="company-page" id="main-content">
      <section className="company-hero" aria-labelledby="company-title">
        <Container className="container-wide company-hero__container">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Company", href: "/company" }]} />
          <div className="company-hero__grid">
            <div className="company-hero__content">
              <p className="eyebrow">COMPANY</p>
              <h1 id="company-title">Clarity, accountability, and security by design<span>.</span></h1>
              <p className="text-body-large">Use this page to understand how KAMMAND approaches advisory work, what principles guide it, and why the practice is structured the way it is.</p>
              <div className="company-hero__actions" aria-label="Company actions">
                <Link className="ui-button ui-button--primary" href="/book">Book a Consultation <DirectionalArrow /></Link>
                <Link className="ui-button ui-button--secondary" href="/services">Explore Services <DirectionalArrow /></Link>
              </div>
            </div>
            <CompanyCompass />
          </div>
        </Container>
      </section>

      <section className="company-story" aria-labelledby="company-story-title">
        <Container className="container-wide">
          <div className="company-story__panel">
            <div className="company-story__content">
              <p className="eyebrow">OUR STORY</p>
              <h2 id="company-story-title">Built to bring structure to complexity.</h2>
              <p>KAMMAND supports organizations in turning complex governance, risk, and security requirements into practical operating structures that create clarity, ownership, and confidence.</p>
              <p>We work with regulated and high-accountability organizations to connect obligations to clearer ownership, practical controls, management-ready evidence, and sustainable assurance routines.</p>
            </div>
            <div className="company-story__visual">
              <Image alt="Curved modern architecture representing clarity and structured progress" fill priority sizes="(min-width: 1024px) 58vw, 100vw" src="/images/company/story-architecture.webp" />
              <div className="company-story__highlights">
                {storyHighlights.map((highlight) => (
                  <div key={highlight.label}>
                    <span aria-hidden="true"><CompanyIcon name={highlight.icon} /></span>
                    <strong>{highlight.label}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="company-principles" aria-labelledby="company-principles-title">
        <Container className="container-wide">
          <header className="company-section-header">
            <p className="eyebrow">OPERATING PRINCIPLES</p>
            <h2 id="company-principles-title">The principles behind the work.</h2>
          </header>
          <ol className="company-principles__grid" aria-label="KAMMAND operating principles">
            {operatingPrinciples.map((principle, index) => (
              <li key={principle.title}>
                <span className="company-principles__icon" aria-hidden="true"><CompanyIcon name={principle.icon} /></span>
                <h3>{principle.title}</h3>
                <span className="company-principles__number">{String(index + 1).padStart(2, "0")}</span>
                <p>{principle.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="company-process" aria-labelledby="company-process-title">
        <Container className="container-wide">
          <header className="company-section-header">
            <p className="eyebrow">HOW KAMMAND WORKS</p>
            <h2 id="company-process-title">Structured advisory from discovery to assurance.</h2>
          </header>
          <ol className="company-process__steps" aria-label="KAMMAND engagement approach">
            {engagementSteps.map((step, index) => (
              <li key={step.title}>
                <span className="company-process__icon" aria-hidden="true"><CompanyIcon name={processIcons[index]} /></span>
                <span className="company-process__connector" aria-hidden="true" />
                <span className="company-process__number">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="company-audience" aria-label="KAMMAND expertise and audience">
        <Container className="container-wide">
          <div className="company-audience__grid">
            <article aria-labelledby="company-expertise-title">
              <p className="eyebrow">AREAS OF EXPERTISE</p>
              <h2 id="company-expertise-title">Capabilities connected to governance, risk, and assurance.</h2>
              <ul className="company-expertise-list" aria-label="KAMMAND capability links">
                {serviceSummaries.map((service, index) => (
                  <li key={service.href}><Link href={service.href}><span aria-hidden="true"><CompanyIcon name={serviceIcons[index]} /></span>{service.title}</Link></li>
                ))}
              </ul>
              <div className="company-framework-links" aria-label="Framework perspective links">
                {frameworkSummaries.map((framework) => <Link href={framework.href} key={framework.href}>{framework.title}</Link>)}
              </div>
            </article>
            <article aria-labelledby="company-support-title">
              <p className="eyebrow">WHO WE HELP</p>
              <h2 id="company-support-title">Organizations that need practical control over risk.</h2>
              <ul className="company-support-list">
                {supportContexts.map((context) => <li key={context}><span aria-hidden="true"><CompanyIcon name="check" /></span>{context}</li>)}
              </ul>
              <div className="company-audience__links">
                <Link href="/industries">Explore industry context <DirectionalArrow /></Link>
                <Link href="/insights">Read KAMMAND insights <DirectionalArrow /></Link>
              </div>
            </article>
          </div>
        </Container>
      </section>

      <section className="company-commitments" aria-labelledby="company-commitments-title">
        <Container className="container-wide">
          <div className="company-commitments__panel">
            <div>
              <p className="eyebrow">ADVISORY CHARACTERISTICS</p>
              <h2 id="company-commitments-title">Independent thinking. Practical outcomes. Long-term impact.</h2>
            </div>
            <ul>
              {commitments.map((item) => <li key={item.label}><span aria-hidden="true"><CompanyIcon name={item.icon} /></span><strong>{item.label}</strong></li>)}
            </ul>
          </div>
        </Container>
      </section>

      <section className="company-connect" aria-labelledby="company-final-cta-title">
        <Container className="container-wide">
          <div className="company-connect__panel">
            <div>
              <p className="eyebrow">LET&apos;S CONNECT</p>
              <h2 id="company-final-cta-title">Let&apos;s bring clarity and control to your priorities.</h2>
              <p>Talk with our team to explore the right starting point for your organization.</p>
            </div>
            <div className="company-connect__actions" aria-label="Company consultation actions">
              <Link className="ui-button ui-button--primary" href="/book">Book a Consultation <DirectionalArrow /></Link>
              <Link className="ui-button ui-button--secondary" href="/services">Explore Services <DirectionalArrow /></Link>
            </div>
            <span className="company-connect__dots" aria-hidden="true" />
          </div>
        </Container>
      </section>
    </main>
  );
}
