import Link from "next/link";
import { crossIndustryChallenges, industrySummaries } from "../../../lib/industries";
import { frameworkSummaries } from "../../../lib/frameworks";
import { Container } from "../../ui/container";
import { ProcessSection } from "../homepage/process";

const overviewIndustries = [
  industrySummaries[0], industrySummaries[1], industrySummaries[4],
  industrySummaries[3], industrySummaries[5], industrySummaries[2],
] as const;

const industryTags = [
  ["Governance", "Third-party risk", "Assurance"],
  ["Control ownership", "Resilience", "Readiness"],
  ["Privacy governance", "Continuity", "Third-party risk"],
  ["Cloud oversight", "Supplier risk", "Assurance"],
  ["Resilience", "Control ownership", "Evidence"],
  ["Risk visibility", "Sensitive data", "Assurance"],
] as const;

type IndustryIconName = "finance" | "fintech" | "healthcare" | "technology" | "regulated" | "insurance" | "critical" | "government";

function IndustryIcon({ icon }: { icon: IndustryIconName }) {
  if (icon === "finance") return <svg aria-hidden="true" viewBox="0 0 32 32"><path d="m4 12 12-7 12 7M6 13h20M8 13v11M14 13v11M20 13v11M26 13v11M5 25h22M3 28h26" /></svg>;
  if (icon === "fintech") return <svg aria-hidden="true" viewBox="0 0 32 32"><rect x="4" y="7" width="24" height="18" rx="2" /><path d="M4 12h24M9 20h5" /><circle cx="23" cy="19" r="2" /></svg>;
  if (icon === "healthcare") return <svg aria-hidden="true" viewBox="0 0 32 32"><path d="M16 27S5 21 5 12a6 6 0 0 1 11-3 6 6 0 0 1 11 3c0 9-11 15-11 15Z" /><path d="M10 16h4l2-5 3 9 2-4h3" /></svg>;
  if (icon === "technology") return <svg aria-hidden="true" viewBox="0 0 32 32"><rect x="9" y="9" width="14" height="14" rx="2" /><path d="M13 13h6v6h-6zM4 12h5M4 20h5M23 12h5M23 20h5M12 4v5M20 4v5M12 23v5M20 23v5" /></svg>;
  if (icon === "regulated") return <svg aria-hidden="true" viewBox="0 0 32 32"><path d="M5 27V13h8v14M13 27V5h7v22M20 27V10h7v17M3 27h26" /><path d="M8 17h2M8 21h2M16 9h2M16 14h2M16 19h2M23 14h2M23 19h2" /></svg>;
  if (icon === "critical") return <svg aria-hidden="true" viewBox="0 0 32 32"><path d="M16 3c4 3 8 4 11 4v8c0 7-4 11-11 14C9 26 5 22 5 15V7c3 0 7-1 11-4Z" /><path d="m11 16 3 3 7-8" /></svg>;
  if (icon === "government") return <svg aria-hidden="true" viewBox="0 0 32 32"><path d="M4 27h24M7 24h18M9 24V15h14v9M6 15h20M10 15a6 6 0 0 1 12 0M16 9V3M16 3h7v4h-7" /></svg>;
  return <svg aria-hidden="true" viewBox="0 0 32 32"><path d="M16 4c4 3 8 4 11 4v8c0 6-4 10-11 13C9 26 5 22 5 16V8c3 0 7-1 11-4Z" /><path d="M11 17h10M13 13h6M14 21h4" /></svg>;
}

function FrameworkIcon({ index }: { index: number }) {
  if (index === 0) return <svg aria-hidden="true" viewBox="0 0 32 32"><path d="M16 3C9 3 4 8 4 15M16 7c-5 0-8 4-8 8 0 6-1 8-3 11M16 11c-3 0-4 2-4 5 0 6-1 10-4 13M16 15c0 7-1 11-4 15M20 4c5 2 8 6 8 12 0 5-1 9-3 13M21 9c2 2 3 4 3 7 0 5-1 9-3 12M20 14c0 6-1 10-3 14M16 19c0 4 0 8-1 11" /></svg>;
  if (index === 1) return <svg aria-hidden="true" viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" /><circle cx="16" cy="16" r="5" /><path d="M16 5v6M16 21v6M5 16h6M21 16h6M8 8l4 4M20 20l4 4M24 8l-4 4M12 20l-4 4" /></svg>;
  if (index === 2) return <svg aria-hidden="true" viewBox="0 0 32 32"><path d="M16 29V10M16 14c-5-5-9-4-10 0 4 1 7 2 10 5M16 12c4-6 9-6 11-2-4 1-8 3-11 7M16 20c-4-3-8-2-9 2 4 0 7 1 9 4M16 20c4-4 8-3 10 1-4 0-7 2-10 5M13 8c0-3 1-5 3-6 2 1 3 3 3 6" /></svg>;
  return <svg aria-hidden="true" viewBox="0 0 32 32"><circle cx="15" cy="14" r="10" /><path d="M5 14h20M15 4c3 3 5 6 5 10s-2 7-5 10c-3-3-5-6-5-10s2-7 5-10ZM20 22c5 1 8 4 8 8M24 18v8M21 21h6" /></svg>;
}

function ChallengeIcon({ index }: { index: number }) {
  const icons = [
    <><circle cx="16" cy="10" r="5" /><path d="M7 28v-3c0-6 4-9 9-9s9 3 9 9v3" /></>,
    <><path d="M5 8h12M22 8h5M5 16h4M14 16h13M5 24h16M26 24h1" /><circle cx="19" cy="8" r="2" /><circle cx="11" cy="16" r="2" /><circle cx="23" cy="24" r="2" /></>,
    <><path d="M8 4h14v20H8zM12 8h14v20H12" /><path d="M15 13h7M15 18h7M15 23h5" /></>,
    <><ellipse cx="16" cy="7" rx="10" ry="4" /><path d="M6 7v9c0 2 4 4 10 4s10-2 10-4V7M6 16v9c0 2 4 4 10 4s10-2 10-4v-9" /></>,
    <><circle cx="11" cy="11" r="4" /><circle cx="22" cy="13" r="3" /><path d="M4 27v-3c0-5 3-8 7-8s7 3 7 8v3M19 18c5 0 8 3 8 7v2" /></>,
    <><path d="M16 3c4 3 8 4 11 4v8c0 7-4 11-11 14C9 26 5 22 5 15V7c3 0 7-1 11-4Z" /><path d="m11 16 3 3 7-8" /></>,
    <><path d="M5 27h22M7 27v-7M13 27V15M19 27V10M25 27V5" /></>,
    <><path d="M9 5h14v23H9zM13 5V3h6v2" /><path d="m12 13 2 2 5-5M12 21h8" /></>,
  ];
  return <svg aria-hidden="true" viewBox="0 0 32 32">{icons[index]}</svg>;
}

function IndustriesHeroVisual() {
  const panels = [["Financial", "Services"], ["Healthcare"], ["Technology"], ["Critical", "Infrastructure"], ["Government"]] as const;
  const icons = ["finance", "healthcare", "technology", "critical", "government"] as const;
  return <div className="industries-overview__hero-visual" aria-hidden="true"><div className="industries-overview__hero-orbits"><span /><span /><span /><span /></div><div className="industries-overview__hero-platform"><span /><span /><span /></div><div className="industries-overview__hero-panels">{panels.map((lines, index) => <div className={`industries-overview__hero-panel industries-overview__hero-panel--${index + 1}`} key={lines.join("-")}><IndustryIcon icon={icons[index]} /><span>{lines.map((line) => <i key={line}>{line}</i>)}</span></div>)}</div></div>;
}

export function IndustriesOverviewPage() {
  const industryIcons: readonly IndustryIconName[] = ["finance", "fintech", "healthcare", "technology", "regulated", "insurance"];
  return (
    <main className="industries-overview" id="main-content">
      <section className="industries-overview__hero" aria-labelledby="industries-overview-title"><Container className="container-wide"><div className="industries-overview__hero-grid"><div className="industries-overview__hero-content"><p className="eyebrow">INDUSTRIES</p><span className="industries-overview__hero-rule" aria-hidden="true" /><h1 id="industries-overview-title" aria-label="GRC and cybersecurity for high-accountability environments."><span>GRC and</span><span>cybersecurity for</span><span>high-accountability</span><span>environments.</span></h1><p className="text-body-large">Different sectors. Different risks.<br />One consistent standard: stronger governance,<br />clearer controls, measurable assurance.</p><div className="industries-overview__hero-actions"><Link className="ui-button ui-button--primary" href="#industry-categories">Explore Industry Solutions <span aria-hidden="true">-&gt;</span></Link><Link className="ui-button ui-button--secondary" href="/book"><svg aria-hidden="true" viewBox="0 0 24 24"><path d="M6 3v3M18 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" /><path d="M8 12h3v3H8z" /></svg>Talk to an Expert</Link></div></div><IndustriesHeroVisual /></div></Container></section>

      <section className="industries-overview__context" aria-labelledby="industry-introduction-title"><Container className="container-wide"><div className="industries-overview__context-band"><div><p className="eyebrow">CONTEXT</p><h2 id="industry-introduction-title">Industry context changes what needs attention first.</h2></div><p>KAMMAND does not treat every environment as the same. Governance, cyber risk, evidence, suppliers, privacy, resilience, and assurance need to be structured around the organization&apos;s operating model, obligations, and risk profile.</p></div></Container></section>

      <section className="industries-overview__categories" id="industry-categories" aria-labelledby="industry-categories-title"><Container><div className="industries-overview__section-header"><p className="eyebrow">INDUSTRY CATEGORIES</p><h2 id="industry-categories-title">Different environments. Different priorities.</h2><p>Focused advisory for the sectors where risk and accountability matter most.</p></div><div className="industries-overview__cards">{overviewIndustries.map((industry, index) => <Link className="industries-overview__card" href={industry.href} key={industry.href}><span className="industries-overview__card-icon"><IndustryIcon icon={industryIcons[index]} /></span><span className="industries-overview__card-number">{String(index + 1).padStart(2, "0")}</span><span className="industries-overview__card-arrow" aria-hidden="true">-&gt;</span><h3>{industry.title}</h3><p>{industry.description}</p><span className="industries-overview__card-tags">{industryTags[index].map((tag) => <i key={tag}>{tag}</i>)}</span></Link>)}</div></Container></section>

      <section className="industries-overview__frameworks" aria-labelledby="industry-frameworks-title"><Container className="container-wide"><div className="industries-overview__framework-grid"><div className="industries-overview__framework-content"><p className="eyebrow">FRAMEWORK CONTEXT</p><h2 id="industry-frameworks-title" aria-label="Industry does not automatically define applicability."><span>Industry does not</span><span>automatically define</span><span>applicability.</span></h2><p>We map the right frameworks to your obligations so you focus on what truly matters.</p><Link className="ui-button ui-button--secondary" href="/frameworks">View framework mapping <span aria-hidden="true">-&gt;</span></Link></div><div className="industries-overview__framework-rail">{frameworkSummaries.map((framework, index) => <Link href={framework.href} key={framework.href}><FrameworkIcon index={index} /><span>{framework.title}</span></Link>)}<span className="industries-overview__framework-axis" aria-hidden="true" /></div></div></Container></section>

      <section className="industries-overview__challenges" aria-labelledby="industry-challenges-title"><Container className="container-wide"><div className="industries-overview__challenges-panel"><div className="industries-overview__challenges-content"><p className="eyebrow">CROSS-INDUSTRY CHALLENGES</p><h2 id="industry-challenges-title">Recurring themes, not universal claims.</h2><p>These are advisory themes KAMMAND often considers when helping organizations structure governance, risk, controls, evidence, remediation, and assurance.</p></div><ul aria-label="Cross-industry advisory themes">{crossIndustryChallenges.map((challenge, index) => <li key={challenge}><ChallengeIcon index={index} /><span>{challenge}</span></li>)}</ul></div></Container></section>

      <ProcessSection
        eyebrow="HOW ENGAGEMENTS WORK"
        headingId="industry-process-title"
        sectionId="industry-process"
        title="Structured advisory from discovery to assurance."
      />

      <section className="industries-overview__cta" aria-labelledby="industries-final-cta-title"><Container className="container-wide"><div className="industries-overview__cta-panel"><div><h2 id="industries-final-cta-title">Ready to discuss the right service path for your industry?</h2><p>Book a consultation for a live discussion or send written context first.</p></div><div className="industries-overview__cta-actions" aria-label="Industries consultation actions"><Link className="ui-button ui-button--primary" href="/book">Book a Consultation <span aria-hidden="true">-&gt;</span></Link><Link className="ui-button ui-button--secondary" href="/contact">Contact Us</Link></div><div className="industries-overview__cta-motif" aria-hidden="true"><span /><span /><span /></div></div></Container></section>
    </main>
  );
}
