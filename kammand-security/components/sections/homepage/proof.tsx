import { engagementOutcomes } from "../../../lib/proof";
import { Container } from "../../ui/container";
import { SectionHeading } from "../../ui/section-heading";
import styles from "./homepage-sections.module.css";

/**
 * Engagement proof.
 *
 * Renders nothing while `engagementOutcomes` is empty. That is deliberate:
 * a visible "case studies coming soon" tells a regulated buyer the firm is
 * not yet operating. No section is better than a placeholder, and better
 * than a fabricated one — see AGENTS.md.
 */
export function ProofSection() {
  if (engagementOutcomes.length === 0) {
    return null;
  }

  return (
    <section className={styles.section} aria-labelledby="proof-title">
      <Container>
        <div className={styles.intro}>
          <SectionHeading
            description="Anonymised engagement shapes, described with client consent."
            eyebrow="Proof"
            title="Work in regulated environments."
            titleId="proof-title"
          />
        </div>

        <div className={styles.grid}>
          {engagementOutcomes.map((entry) => (
            <article className={styles.card} key={entry.organization + entry.mandate}>
              <span className={styles.number}>{entry.sector}</span>
              <h3 className={styles.title}>{entry.organization}</h3>
              <p className={styles.description}>
                <strong>{entry.mandate}.</strong> {entry.outcome}
              </p>
              <p className={styles.proofMeta}>
                {entry.frameworks.map((framework) => (
                  <span key={framework}>{framework}</span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
