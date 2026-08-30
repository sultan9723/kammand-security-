import Link from "next/link";
import { ContactForm } from "./contact-form";
import { Breadcrumbs } from "../../ui/breadcrumbs";
import { Container } from "../../ui/container";

const nextSteps = [
  "KAMMAND reviews the inquiry context and area of interest.",
  "If the inquiry needs a live conversation, KAMMAND may point you to the booking path.",
  "Please avoid sending credentials or highly sensitive technical details through the form.",
] as const;

export function ContactPage() {
  return (
    <main className="contact-page" id="main-content">
      <section className="internal-hero" aria-labelledby="contact-title">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Contact", href: "/contact" },
            ]}
          />
          <div className="internal-hero__content">
            <p className="eyebrow">CONTACT</p>
            <h1 id="contact-title">Let&apos;s talk about what your organization needs.</h1>
            <p className="text-body-large">
              Tell us about your GRC, cybersecurity, risk, compliance, or
              assurance priorities. Use this form for written inquiries, scoped
              questions, or background information when you do not yet need to
              schedule a consultation.
            </p>
          </div>
        </Container>
      </section>

      <section className="internal-section" aria-labelledby="contact-form-title">
        <Container>
          <div className="contact-layout">
            <div className="internal-section__header">
              <p className="eyebrow">INQUIRY FORM</p>
              <h2 id="contact-form-title">Send a focused inquiry.</h2>
              <p className="text-body-large">
                Use the form for service, framework, risk, compliance, or
                assurance questions that need a direct response path.
              </p>
            </div>
            <ContactForm />
          </div>
        </Container>
      </section>

      <section className="internal-section internal-section--subtle" aria-labelledby="next-steps-title">
        <Container>
          <div className="detail-two-column">
            <div>
              <p className="eyebrow">WHAT HAPPENS NEXT</p>
              <h2 id="next-steps-title">Clear context helps define the next step.</h2>
              <ul className="check-list">
                {nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow">READY TO SCHEDULE?</p>
              <h2>Book a consultation instead.</h2>
              <p>
                Use the booking path when you are ready for a live discussion
                about an active or near-term advisory need. If you only need to
                send written context or a question, stay on this form.
              </p>
              <div className="related-service-list">
                <Link href="/book">
                  Book a Consultation
                  <span aria-hidden="true">-&gt;</span>
                </Link>
                <Link href="/security">
                  Review security and trust information
                  <span aria-hidden="true">-&gt;</span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
