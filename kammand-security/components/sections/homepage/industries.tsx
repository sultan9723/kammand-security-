import Link from "next/link";
import { industrySummaries } from "../../../lib/industries";
import { Container } from "../../ui/container";
import { DirectionalArrow } from "../../ui/directional-arrow";
import { SectionHeading } from "../../ui/section-heading";
import styles from "./homepage-sections.module.css";

/**
 * Sectors, presented as filed records.
 *
 * Each card carries an index spine on the left — a record mark and a vertical
 * number — with the sector itself on the right. The spine fills with the
 * accent when the card is engaged, so the whole record reads as the target
 * rather than the link text alone. The filing metaphor is the point: these are
 * organizations under standing regulatory oversight, not product tiles.
 */
export function IndustriesSection() {
  return (
    <section className={styles.section} aria-labelledby="industries-title">
      <Container>
        <div className={styles.intro}>
          <SectionHeading
            description="KAMMAND works with organizations that answer to regulators, boards, auditors, and customers at the same time."
            eyebrow="INDUSTRIES"
            title="Built for regulated sectors."
            titleId="industries-title"
          />
        </div>

        <div className={styles.industryGrid}>
          {industrySummaries.map((industry, index) => (
            <Link
              className={styles.industryCard}
              href={industry.href}
              key={industry.href}
            >
              <span className={styles.industrySpine} aria-hidden="true">
                <span className={styles.industryMark} />
                <span className={styles.industryIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <div className={styles.industryBody}>
                <h3 className={styles.industryTitle}>{industry.title}</h3>
                <p className={styles.industryDescription}>
                  {industry.description}
                </p>
                <span className={styles.industryAction}>
                  View sector
                  <DirectionalArrow />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
