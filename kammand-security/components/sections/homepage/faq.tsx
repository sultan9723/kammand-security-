import Link from "next/link";
import { homepageFaqs } from "../../../lib/faq";
import { Container } from "../../ui/container";
import { SectionHeading } from "../../ui/section-heading";
import styles from "./homepage-sections.module.css";

/**
 * Handles the objections a buyer raises before they will book.
 *
 * Built on native <details>/<summary>, so every answer is reachable by
 * keyboard and exposed to assistive technology with no JavaScript. The
 * answers stay in the DOM when collapsed, so they remain crawlable.
 */
export function FaqSection() {
  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <Container>
        <div className={styles.intro}>
          <SectionHeading
            description="The questions regulated buyers ask before a first conversation."
            eyebrow="FAQ"
            title="Before you reach out."
            titleId="faq-title"
          />
        </div>

        <div className={styles.faqList}>
          {homepageFaqs.map((faq) => (
            <details className={styles.faqItem} key={faq.question}>
              <summary className={styles.faqQuestion}>
                {faq.question}
                <span className={styles.faqMarker} aria-hidden="true">
                  +
                </span>
              </summary>
              <p className={styles.faqAnswer}>{faq.answer}</p>
              {faq.link ? (
                <Link className={styles.faqLink} href={faq.link.href}>
                  {faq.link.label}
                </Link>
              ) : null}
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
