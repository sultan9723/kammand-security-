import Link from "next/link";
import { industrySummaries } from "../../../lib/industries";
import { Container } from "../../ui/container";
import { SectionHeading } from "../../ui/section-heading";
import styles from "./homepage-sections.module.css";

/**
 * Sectors, presented as plain service-style cards.
 * The design relies on copy, spacing, and the shared secondary-button
 * treatment rather than decorative marks.
 */
export function IndustriesSection() {
  return (
    <section className={styles.section} aria-labelledby="industries-title">
      <Container>
        <div className={styles.intro}>
          <SectionHeading
            description="KAMMAND works with organizations that answer to regulators, boards, auditors, and customers at the same time."
            eyebrow="Industries"
            title="Built for regulated sectors."
            titleId="industries-title"
          />
        </div>

        <div className={styles.industryGrid}>
          {industrySummaries.map((industry) => (
            <Link
              className={styles.industryCard}
              href={industry.href}
              key={industry.href}
            >
              <div className={styles.industryBody}>
                <h3 className={styles.industryTitle}>{industry.title}</h3>
                <p className={styles.industryDescription}>
                  {industry.description}
                </p>
                <span
                  className={`${styles.industryAction} ui-button ui-button--secondary`}
                >
                  View sector
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
