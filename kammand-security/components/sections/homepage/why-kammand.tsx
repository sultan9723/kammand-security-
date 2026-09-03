import { operatingPrinciples } from "../../../lib/company";
import { Container } from "../../ui/container";
import { SectionHeading } from "../../ui/section-heading";
import styles from "./homepage-sections.module.css";

/**
 * Differentiation. Uses the approved operating principles from the company
 * page rather than restating them, so both pages stay in step.
 */
export function WhyKammandSection() {
  return (
    <section className={styles.section} aria-labelledby="why-kammand-title">
      <Container>
        <div className={styles.intro}>
          <SectionHeading
            description="KAMMAND is an advisory practice, not a documentation exercise. These are the principles the work is held to."
            eyebrow="WHY KAMMAND"
            title="Built to be operated, not filed."
            titleId="why-kammand-title"
          />
        </div>

        <div className={styles.grid}>
          {operatingPrinciples.map((principle, index) => (
            <article className={styles.card} key={principle.title}>
              <span className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.title}>{principle.title}</h3>
              <p className={styles.description}>{principle.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
