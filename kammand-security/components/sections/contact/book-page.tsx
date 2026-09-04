import Link from "next/link";
import { getCalendlyUrl } from "../../../lib/booking";
import { CalendlyConsentEmbed } from "../../consent/calendly-consent-embed";
import { Breadcrumbs } from "../../ui/breadcrumbs";
import { Container } from "../../ui/container";
import { DirectionalArrow } from "../../ui/directional-arrow";
import { SectionLabel } from "../../ui/section-label";

const conversationSteps = [
  { title: "Share your context", description: "We start by understanding your organization, challenges, and priorities." },
  { title: "Identify what matters", description: "We focus on the risks, controls, and decisions that deserve attention." },
  { title: "Explore practical options", description: "We discuss approaches that fit your environment and constraints." },
  { title: "Define next steps", description: "You leave with clarity on the next steps and how KAMMAND can help." },
] as const;

const expectations = [
  { icon: "target", title: "Focused 30 minutes", description: "A concentrated session designed to respect your time and priorities." },
  { icon: "users", title: "Expert perspective", description: "Experienced advisors with practical GRC and cybersecurity insight." },
  { icon: "shield", title: "Actionable outcomes", description: "Leave with practical options and a clearer direction forward." },
  { icon: "lock", title: "Confidential by design", description: "Your information is handled with care and never shared without permission." },
] as const;

const meetingDetails = [
  { icon: "clock", title: "30 Minute Meeting", description: "A focused session to discuss your priorities and explore how we can help." },
  { icon: "users", title: "Expert-to-expert", description: "Meet with a KAMMAND advisor across GRC, cybersecurity, risk, and compliance." },
  { icon: "video", title: "Video meeting", description: "A secure meeting link is provided after booking." },
] as const;

type BookIconName = "chat" | "clock" | "lock" | "shield" | "target" | "users" | "video";

function BookIcon({ name }: { name: BookIconName }) {
  if (name === "chat") return <svg viewBox="0 0 32 32"><path d="M5 6h22v16H14l-7 5v-5H5z" /><path d="M11 14h1M16 14h1M21 14h1" /></svg>;
  if (name === "clock") return <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" /><path d="M16 9v8l5 3" /></svg>;
  if (name === "users") return <svg viewBox="0 0 32 32"><circle cx="11" cy="11" r="4" /><circle cx="22" cy="12" r="3" /><path d="M4 27v-3c0-5 3-8 7-8s7 3 7 8v3M19 18c5 0 8 3 8 7v2" /></svg>;
  if (name === "lock") return <svg viewBox="0 0 32 32"><rect x="7" y="13" width="18" height="15" rx="2" /><path d="M11 13V9a5 5 0 0 1 10 0v4M16 19v4" /></svg>;
  if (name === "video") return <svg viewBox="0 0 32 32"><rect x="4" y="7" width="18" height="18" rx="2" /><path d="m22 13 7-4v14l-7-4ZM9 12h5" /></svg>;
  if (name === "target") return <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" /><circle cx="16" cy="16" r="5" /><path d="m16 16 11-11M22 5h5v5" /></svg>;
  return <svg viewBox="0 0 32 32"><path d="M16 3c4 3 8 4 11 4v8c0 7-4 11-11 14C9 26 5 22 5 15V7c3 0 7-1 11-4Z" /><path d="m11 16 3 3 7-8" /></svg>;
}

function ConsultationGuide() {
  return (
    <div className="book-overview__guide">
      <div className="book-overview__guide-copy">
        <span className="book-overview__icon"><BookIcon name="chat" /></span>
        <h2>Real conversation.<br />Practical guidance.</h2>
        <span className="book-overview__short-rule" aria-hidden="true" />
        <ol>
          {conversationSteps.map((step) => (
            <li key={step.title}>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
      <div className="book-overview__doorway" aria-hidden="true">
        <span className="book-overview__door-frame" />
        <span className="book-overview__door" />
        <span className="book-overview__floor book-overview__floor--one" />
        <span className="book-overview__floor book-overview__floor--two" />
        <span className="book-overview__floor book-overview__floor--three" />
      </div>
    </div>
  );
}

export function BookPage() {
  const calendlyUrl = getCalendlyUrl();

  return (
    <main className="book-overview" id="main-content">
      <section className="book-overview__hero" aria-labelledby="book-title">
        <Container className="container-wide">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Book", href: "/book" }]} />
          <div className="book-overview__hero-grid">
            <div className="book-overview__hero-content">
              <SectionLabel as="p">Book a Consultation</SectionLabel>
              <h1 id="book-title">Let&apos;s turn your priorities into clear next steps<span>.</span></h1>
              <p className="text-body-large">A focused 30-minute conversation with a KAMMAND advisor helps you understand your risks, explore options, and identify what will have the most impact.</p>
              <div className="book-overview__hero-actions" aria-label="Booking page actions">
                <Link className="ui-button ui-button--primary" href="#scheduling">Book a Consultation <DirectionalArrow /></Link>
                <Link className="ui-button ui-button--secondary" href="/services">Explore Services <DirectionalArrow /></Link>
              </div>
            </div>
            <ConsultationGuide />
          </div>
        </Container>
      </section>

      <section className="book-overview__expectations" aria-labelledby="booking-expectations-title">
        <Container className="container-wide">
          <div className="book-overview__section-header">
            <SectionLabel align="center" as="p">
              What to Expect
            </SectionLabel>
            <h2 id="booking-expectations-title">One meeting. Real clarity.</h2>
          </div>
          <ul>
            {expectations.map((item) => (
              <li key={item.title}>
                <span><BookIcon name={item.icon} /></span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="book-overview__scheduling" id="scheduling" aria-labelledby="booking-area-title">
        <Container className="container-wide">
          <div className="book-overview__scheduling-panel">
            <aside className="book-overview__meeting-details">
              <SectionLabel as="p">Scheduling</SectionLabel>
              <h2 id="booking-area-title">Choose a time that works for you.</h2>
              <ul>
                {meetingDetails.map((item) => (
                  <li key={item.title}>
                    <span><BookIcon name={item.icon} /></span>
                    <div><strong>{item.title}</strong><p>{item.description}</p></div>
                  </li>
                ))}
              </ul>
              <div className="book-overview__contact-alternative">
                <p>Need to send information or ask a question first?</p>
                <Link href="/contact">Use the contact form instead <DirectionalArrow /></Link>
              </div>
            </aside>
            <div className="book-overview__scheduler">
              {calendlyUrl ? (
                <CalendlyConsentEmbed calendlyUrl={calendlyUrl} />
              ) : (
                <div className="booking-panel booking-panel--fallback" role="status">
                  <p className="eyebrow">SCHEDULING NOT CONFIGURED</p>
                  <p className="text-body-large">The consultation scheduler is not configured in this environment. Use the contact form for written inquiries or to share background before scheduling.</p>
                  <Link className="ui-button ui-button--primary" href="/contact">Contact KAMMAND</Link>
                </div>
              )}
            </div>
          </div>
          <div className="book-overview__privacy-bar" aria-label="Booking privacy commitments">
            <div><span><BookIcon name="shield" /></span><strong>Focused and confidential scheduling.</strong></div>
            <ul>
              <li><BookIcon name="chat" /><span><strong>No spam</strong><small>We respect your time.</small></span></li>
              <li><BookIcon name="users" /><span><strong>No sharing</strong><small>Your data stays private.</small></span></li>
              <li><BookIcon name="target" /><span><strong>You&apos;re in control</strong><small>You decide what happens next.</small></span></li>
            </ul>
          </div>
        </Container>
      </section>
    </main>
  );
}
