import Link from "next/link";
import { ContactForm } from "./contact-form";
import { Breadcrumbs } from "../../ui/breadcrumbs";
import { Container } from "../../ui/container";
import { DirectionalArrow } from "../../ui/directional-arrow";
import { FinalCtaSection } from "../homepage/final-cta";

const nextSteps = [
  {
    title: "Context review",
    description: "KAMMAND reviews the inquiry context and selected area of interest.",
  },
  {
    title: "Response path",
    description: "The response is directed toward the most relevant service, framework, or next step.",
  },
  {
    title: "Live discussion when useful",
    description: "If the inquiry needs a conversation, KAMMAND may recommend the booking path.",
  },
] as const;

const inquiryGuidance = [
  "Describe the priority, decision, or challenge that needs attention.",
  "Include relevant service, framework, industry, or timing context when helpful.",
  "Keep credentials and highly sensitive technical information out of the inquiry.",
] as const;

export function ContactPage() {
  return (
    <main className="contact-page" id="main-content">
      <section className="contact-hero" aria-labelledby="contact-title">
        <Container className="container-wide">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact", href: "/contact" },
            ]}
          />
          <div className="contact-hero__grid">
            <div className="contact-hero__content">
              <p className="eyebrow">CONTACT</p>
              <h1 id="contact-title">Let&apos;s talk about what your organization needs.</h1>
              <p className="text-body-large">
                Tell us about your GRC, cybersecurity, risk, compliance, or
                assurance priorities. Use this form for written inquiries,
                scoped questions, or background information.
              </p>
              <div className="contact-hero__actions" aria-label="Contact options">
                <Link className="ui-button ui-button--primary" href="/book">
                  Book a Consultation
                  <DirectionalArrow />
                </Link>
                <Link className="ui-button ui-button--secondary" href="#contact-inquiry">
                  Send an Inquiry
                  <DirectionalArrow />
                </Link>
              </div>
            </div>

            <aside className="contact-hero__panel" aria-label="Contact inquiry path">
              <p className="eyebrow">INQUIRY PATH</p>
              <h2>Written context. Clear next steps.</h2>
              <ol>
                {nextSteps.map((step, index) => (
                  <li key={step.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <p>{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </Container>
      </section>

      <section className="contact-inquiry" id="contact-inquiry" aria-labelledby="contact-form-title">
        <Container className="container-wide">
          <header className="contact-section-heading">
            <p className="eyebrow">INQUIRY FORM</p>
            <h2 id="contact-form-title">Send a focused inquiry.</h2>
            <p>
              Use the form for service, framework, risk, compliance, or assurance
              questions that need a direct response path.
            </p>
          </header>

          <div className="contact-inquiry__panel">
            <aside className="contact-inquiry__guidance" aria-labelledby="contact-guidance-title">
              <p className="eyebrow">BEFORE YOU SEND</p>
              <h3 id="contact-guidance-title">Useful context keeps the response focused.</h3>
              <ul>
                {inquiryGuidance.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href="/security">
                Review security and trust information
                <DirectionalArrow />
              </Link>
            </aside>

            <div className="contact-inquiry__form">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>

      <section className="contact-next" aria-labelledby="next-steps-title">
        <Container>
          <header className="contact-section-heading">
            <p className="eyebrow">WHAT HAPPENS NEXT</p>
            <h2 id="next-steps-title">Clear context helps define the next step.</h2>
          </header>
          <ol className="contact-next__steps">
            {nextSteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <FinalCtaSection
        actionsLabel="Contact consultation actions"
        description="Book a focused conversation when you are ready to discuss an active or near-term advisory priority."
        headingId="contact-consultation-title"
        title="Prefer to discuss your priorities live?"
      />
    </main>
  );
}
