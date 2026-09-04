import Link from "next/link";
import { frameworkSummaries } from "../../../lib/frameworks";
import { Breadcrumbs } from "../../ui/breadcrumbs";
import { Container } from "../../ui/container";
import { DirectionalArrow } from "../../ui/directional-arrow";
import { SectionLabel } from "../../ui/section-label";

const frameworkOrder = [1, 0, 3, 2] as const;

const realities = [
  { icon: "overlap", title: "Overlapping requirements", description: "Many controls appear in more than one framework, but not always in the same way." },
  { icon: "evidence", title: "Different expectations", description: "Frameworks vary in structure, language, and evidence expectations." },
  { icon: "shield", title: "Scope drives gaps", description: "What is in scope for one framework may be out of scope for another." },
  { icon: "chart", title: "Mappings are not one-size-fits-all", description: "Official mappings help, but they still depend on the organization’s context and scope." },
] as const;

const approach = [
  { icon: "understand", title: "Understand", description: "Clarify scope, obligations, and stakeholder needs across all relevant frameworks." },
  { icon: "analyze", title: "Analyze", description: "Identify overlaps, differences, and gaps to focus effort where it matters most." },
  { icon: "structure", title: "Structure", description: "Design a control and evidence model that fits your operating environment." },
  { icon: "shield", title: "Sustain", description: "Keep mappings and evidence current as frameworks and requirements evolve." },
] as const;

type FrameworkIconName =
  | "analyze"
  | "chart"
  | "evidence"
  | "globe"
  | "overlap"
  | "palm"
  | "shield"
  | "structure"
  | "understand";

function FrameworkIcon({ name }: { name: FrameworkIconName }) {
  if (name === "overlap") return <svg viewBox="0 0 32 32"><circle cx="12" cy="16" r="9" /><circle cx="20" cy="16" r="9" /></svg>;
  if (name === "evidence") return <svg viewBox="0 0 32 32"><path d="M7 3h12l6 6v12H7zM19 3v7h6M11 14h9M11 18h6" /><circle cx="22" cy="23" r="5" /><path d="m26 27 3 3" /></svg>;
  if (name === "chart") return <svg viewBox="0 0 32 32"><path d="M4 28h25M7 28v-7M13 28V16M19 28V10M25 28V5" /><path d="m5 15 7-6 6 3 9-8" /></svg>;
  if (name === "understand") return <svg viewBox="0 0 32 32"><circle cx="14" cy="14" r="8" /><path d="m20 20 7 7M14 9v10M9 14h10" /><path d="m24 5 2-2M27 9h3M23 12l3 2" /></svg>;
  if (name === "analyze") return <svg viewBox="0 0 32 32"><path d="m16 3 12 6-12 6L4 9l12-6Z" /><path d="m4 15 12 6 12-6M4 21l12 6 12-6" /></svg>;
  if (name === "structure") return <svg viewBox="0 0 32 32"><path d="M8 3h12l6 6v20H8zM20 3v7h6M12 15h9M12 20h9M12 25h5" /><circle cx="23" cy="24" r="5" /><path d="m21 24 2 2 4-5" /></svg>;
  if (name === "globe") return <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" /><path d="M4 16h24M16 4c4 4 6 8 6 12s-2 8-6 12c-4-4-6-8-6-12s2-8 6-12Z" /></svg>;
  if (name === "palm") return <svg viewBox="0 0 32 32"><path d="M16 29V11M16 13c-5-5-9-4-11 0 5 0 8 2 11 5M16 12c4-6 9-6 11-2-5 1-8 3-11 8M16 20c-4-3-8-2-9 2 4 0 7 1 9 5M16 20c4-4 8-3 10 1-4 0-7 2-10 6M13 8c0-3 1-5 3-6 2 1 3 3 3 6" /></svg>;
  return <svg viewBox="0 0 32 32"><path d="M16 3c4 3 8 4 11 4v8c0 7-4 11-11 14C9 26 5 22 5 15V7c3 0 7-1 11-4Z" /><path d="m11 16 3 3 7-8" /></svg>;
}

function frameworkIcon(index: number): FrameworkIconName {
  if (index === 2) return "palm";
  if (index === 3) return "globe";
  return "shield";
}

function FrameworkMap() {
  return (
    <div className="frameworks-overview__map" id="framework-map" aria-label="Framework reference links">
      <div className="frameworks-overview__map-grid" aria-hidden="true" />
      <div className="frameworks-overview__map-lines" aria-hidden="true"><span /><span /><span /><span /></div>
      <div className="frameworks-overview__map-core" aria-hidden="true"><span /><span /><span /></div>
      <div className="frameworks-overview__map-cards">
        {frameworkOrder.map((frameworkIndex, position) => {
          const framework = frameworkSummaries[frameworkIndex];
          return (
            <Link className={`frameworks-overview__map-card frameworks-overview__map-card--${position + 1}`} href={framework.href} key={framework.href}>
              <span className={`frameworks-overview__map-icon frameworks-overview__map-icon--${frameworkIndex}`}><FrameworkIcon name={frameworkIcon(frameworkIndex)} /></span>
              <strong>{framework.title}</strong>
              <span className="frameworks-overview__map-fields" aria-hidden="true"><span /><span /><span /></span>
              <span className="frameworks-overview__map-check" aria-hidden="true">✓</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function FrameworksOverviewPage() {
  return (
    <main className="frameworks-overview" id="main-content">
      <section className="frameworks-overview__hero" aria-labelledby="frameworks-overview-title">
        <Container className="container-wide">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Frameworks", href: "/frameworks" }]} />
          <div className="frameworks-overview__hero-grid">
            <div className="frameworks-overview__hero-content">
              <SectionLabel as="p">Frameworks</SectionLabel>
              <h1 id="frameworks-overview-title" aria-label="Navigate complex frameworks with greater clarity."><span>Navigate complex </span><span>frameworks with </span><span>greater clarity.</span></h1>
              <p className="text-body-large">Use this page to understand how requirements overlap, where evidence can be reused, and why official mappings still depend on scope.</p>
              <div className="frameworks-overview__hero-actions" aria-label="Framework overview actions">
                <Link className="ui-button ui-button--primary" href="/book">Book a Consultation <DirectionalArrow /></Link>
                <Link className="ui-button ui-button--secondary" href="/services">Explore Services <DirectionalArrow /></Link>
              </div>
            </div>
            <FrameworkMap />
          </div>
        </Container>
      </section>

      <section className="frameworks-overview__reality" id="framework-context" aria-labelledby="framework-reality-title">
        <Container className="container-wide">
          <div className="frameworks-overview__reality-panel">
            <div className="frameworks-overview__reality-intro">
              <SectionLabel as="p">The Reality</SectionLabel>
              <h2 id="framework-reality-title">Many frameworks.<br />One challenge.</h2>
              <p>Organizations face growing pressure to meet multiple frameworks and regulations. The hard part is not collecting documents; it is understanding what applies, what overlaps, and what must be proven.</p>
            </div>
            <ul className="frameworks-overview__reality-grid" aria-label="Framework mapping considerations">
              {realities.map((item) => (
                <li key={item.title}>
                  <span><FrameworkIcon name={item.icon} /></span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </li>
              ))}
            </ul>
            <p className="frameworks-overview__qualification">Shared capability areas do not mean formal equivalence. These are KAMMAND organizational lenses, not official domain names across every framework.</p>
          </div>
        </Container>
      </section>

      <section className="frameworks-overview__approach" id="framework-approach" aria-labelledby="framework-approach-title">
        <Container className="container-wide">
          <div className="frameworks-overview__section-header">
            <SectionLabel align="center" as="p">
              Our Approach
            </SectionLabel>
            <h2 id="framework-approach-title">Clarity through structure.</h2>
            <p>We help organizations translate complex framework requirements into practical structures that support ownership, evidence, and assurance.</p>
          </div>
          <ol className="frameworks-overview__steps">
            {approach.map((item, index) => (
              <li key={item.title}>
                <span className="frameworks-overview__step-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="frameworks-overview__step-icon"><FrameworkIcon name={item.icon} /></span>
                {index < approach.length - 1 && <span className="frameworks-overview__step-connector" aria-hidden="true" />}
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="frameworks-overview__confidence" aria-labelledby="framework-confidence-title">
        <Container className="container-wide">
          <div className="frameworks-overview__confidence-panel">
            <span className="frameworks-overview__confidence-icon" aria-hidden="true"><FrameworkIcon name="shield" /></span>
            <div>
              <h2 id="framework-confidence-title">Frameworks provide structure.<br />We help you turn structure into confidence.</h2>
              <p>Better clarity. Smarter reuse. Stronger assurance.</p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
