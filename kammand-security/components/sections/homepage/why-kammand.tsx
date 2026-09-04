import { Container } from "../../ui/container";
import { SectionLabel } from "../../ui/section-label";
import styles from "./why-kammand.module.css";

/**
 * Differentiation, stated as a comparison.
 *
 * Two panels running the same six rows in the same order, so the difference
 * reads from the alignment rather than from any claim. Both lists describe
 * ways of working, not results — no metrics, no customers, no outcomes that
 * would need evidence behind them (see the no-fabrication rules in AGENTS.md).
 *
 * Row order is load-bearing: row N on the left is the failure mode that row N
 * on the right answers. Keep the two arrays the same length and in step.
 */

const traditionalItems = [
  "Manual reviews and fragmented inputs",
  "Controls without clear ownership",
  "Evidence gathered late under pressure",
  "Generic recommendations with limited context",
  "Remediation that stalls after assessment",
  "Repeated effort across audits and cycles",
] as const;

const kammandItems = [
  "Structured governance tied to real operations",
  "Clear ownership across controls, risks, and actions",
  "Evidence built continuously, not assembled last minute",
  "Practical roadmaps shaped by business context",
  "Measurable remediation and readiness tracking",
  "Ongoing assurance that improves decision-making",
] as const;

function CrossMark({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={className}>
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M8 8l8 8M16 8l-8 8" />
      </svg>
    </span>
  );
}

function CheckMark({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={className}>
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M6 12.5l4 4 8-9" />
      </svg>
    </span>
  );
}

export function WhyKammandSection() {
  return (
    <section className={styles.section} aria-labelledby="why-kammand-title">
      <Container>
        <div className={styles.intro}>
          <SectionLabel align="center" as="p">
            Why Kammand
          </SectionLabel>
          <h2 className={styles.heading} id="why-kammand-title">
            A clearer model for regulated work.
          </h2>
          <p className={styles.standfirst}>
            A clearer path from scattered effort to structured, decision-ready
            assurance.
          </p>
        </div>

        <div className={styles.comparison}>
          <article
            className={`${styles.panel} ${styles.panelTraditional}`}
            aria-labelledby="why-kammand-traditional"
          >
            <header className={styles.panelHeader}>
              <CrossMark className={styles.headerMarkTraditional} />
              <h3 className={styles.panelTitle} id="why-kammand-traditional">
                Traditional Work
              </h3>
            </header>
            <ul className={styles.rows}>
              {traditionalItems.map((item) => (
                <li className={styles.row} key={item}>
                  <CrossMark className={styles.rowMarkTraditional} />
                  <span className={styles.rowText}>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article
            className={`${styles.panel} ${styles.panelKammand}`}
            aria-labelledby="why-kammand-model"
          >
            <header className={styles.panelHeader}>
              <CheckMark className={styles.headerMarkKammand} />
              <h3 className={styles.panelTitle} id="why-kammand-model">
                The KAMMAND Model
              </h3>
            </header>
            <ul className={styles.rows}>
              {kammandItems.map((item) => (
                <li className={styles.row} key={item}>
                  <CheckMark className={styles.rowMarkKammand} />
                  <span className={styles.rowText}>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </Container>
    </section>
  );
}
