import type { CSSProperties } from "react";
import type { ServiceDetail } from "../../../lib/services";
import { Container } from "../../ui/container";
import { SectionLabel } from "../../ui/section-label";
import styles from "./third-party-risk-activities.module.css";

const activityMeta = [
  {
    title: "Vendor classification and inherent risk criteria design",
    icon: "tiers",
  },
  {
    title: "Supplier due diligence questionnaire review and improvement",
    icon: "checklist",
  },
  {
    title: "Security evidence review for higher-risk third parties",
    icon: "evidence",
  },
  {
    title: "Contractual security expectation and onboarding control support",
    icon: "contract",
  },
  {
    title: "Vendor ownership, remediation, and periodic review workflow design",
    icon: "workflow",
  },
  {
    title: "Concentration, dependency, and offboarding consideration review",
    icon: "dependency",
  },
] as const;

type ActivityIconName = (typeof activityMeta)[number]["icon"];

function ActivityIcon({ name }: { name: ActivityIconName }) {
  if (name === "tiers")
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M5 10h22" />
        <path d="M5 10v5h22v-5" />
        <path d="M5 15v5h22v-5" />
        <path d="M5 20v5h22v-5" />
        <path d="M9 7h14" />
      </svg>
    );
  if (name === "checklist")
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <rect x="8" y="4" width="16" height="24" rx="2" />
        <path d="M12 10h8M12 15h8M12 20h5" />
        <path d="m21 20 2 2 4-4" />
      </svg>
    );
  if (name === "evidence")
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M16 4c3 2 6 3 9 3v7c0 6-4 10-9 12-5-2-9-6-9-12V7c3 0 6-1 9-3Z" />
        <path d="m12 16 3 3 6-7" />
      </svg>
    );
  if (name === "contract")
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M8 3h11l6 6v20H8Z" />
        <path d="M19 3v7h6" />
        <path d="M12 15h9M12 20h9M12 25h5" />
      </svg>
    );
  if (name === "workflow")
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <circle cx="9" cy="9" r="4" />
        <circle cx="23" cy="9" r="4" />
        <circle cx="16" cy="23" r="4" />
        <path d="M13 9h6M16 13v6M9 13v6M23 13v6" />
      </svg>
    );
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <circle cx="8" cy="16" r="5" />
      <circle cx="24" cy="16" r="5" />
      <circle cx="16" cy="7" r="4" />
      <path d="M20 9 22 12M12 9l-4 3M10 14l3 4M22 14l-3 4M16 11v8" />
    </svg>
  );
}

function describeActivity(title: string) {
  switch (title) {
    case activityMeta[0].title:
      return "Define how suppliers are classified and weighted by inherent risk so review effort and controls scale to exposure.";
    case activityMeta[1].title:
      return "Improve the questions, coverage, and vendor experience of due diligence questionnaires so they surface the right risk signals.";
    case activityMeta[2].title:
      return "Examine certifications, audit reports, and control evidence for higher-risk providers to confirm they support the stated risk profile.";
    case activityMeta[3].title:
      return "Align contractual security expectations and onboarding controls so supplier risk is addressed before access and data flow.";
    case activityMeta[4].title:
      return "Structure clear vendor ownership, remediation tracking, and periodic review cycles so oversight continues after onboarding.";
    default:
      return "Assess vendor concentration, dependencies, and offboarding so transitions and termination do not leave hidden exposure.";
  }
}

type ThirdPartyRiskActivitiesProps = {
  service: ServiceDetail;
};

export function ThirdPartyRiskActivities({ service }: ThirdPartyRiskActivitiesProps) {
  return (
    <section className={styles.section} aria-labelledby="third-party-activities-title">
      <Container>
        <div className={styles.header}>
          <SectionLabel align="center" as="p">
            What Kammand Does
          </SectionLabel>
          <h2 id="third-party-activities-title">
            Practical advisory across classification, due diligence, evidence and oversight.
          </h2>
          <p>{service.approach}</p>
        </div>
        <ul className={styles.grid}>
          {activityMeta.map((meta, index) => (
            <li
              className={styles.card}
              key={meta.title}
              style={{ "--activity-index": index } as CSSProperties}
            >
              <div className={styles.cardHeader}>
                <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.icon}>
                  <ActivityIcon name={meta.icon} />
                </span>
              </div>
              <h3 className={styles.title}>{meta.title}</h3>
              <p className={styles.description}>{describeActivity(meta.title)}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
