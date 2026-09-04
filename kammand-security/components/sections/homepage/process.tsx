import type { CSSProperties, ReactNode } from "react";
import { deliverablesByPhase } from "../../../lib/engagement";
import { Container } from "../../ui/container";
import { SectionLabel } from "../../ui/section-label";

const processSteps = [
  {
    number: "01",
    label: "Understand",
    title: "Discover",
    description:
      "Understand the organization, regulatory obligations, current controls, risk exposure, and business priorities.",
  },
  {
    number: "02",
    label: "Structure",
    title: "Design",
    description:
      "Translate requirements and identified gaps into a practical governance, risk, compliance, and security roadmap.",
  },
  {
    number: "03",
    label: "Implement",
    title: "Deliver",
    description:
      "Support implementation of controls, documentation, remediation activities, ownership, and evidence.",
  },
  {
    number: "04",
    label: "Verify",
    title: "Assure",
    description:
      "Review control effectiveness, evidence, and readiness to help maintain confidence beyond a single assessment.",
  },
] as const;

type ProcessSectionProps = {
  description?: string;
  eyebrow?: string;
  headingId?: string;
  sectionId?: string;
  title?: ReactNode;
};

export function ProcessSection({
  description =
    "A structured approach that turns regulatory obligations, cybersecurity risk, and business priorities into practical action.",
  eyebrow = "How We Work",
  headingId = "process-title",
  sectionId,
  title,
}: ProcessSectionProps = {}) {
  return (
    <section className="process-section" id={sectionId} aria-labelledby={headingId}>
      <Container>
        <div className="process-section__header">
          <SectionLabel align="center" as="p" className="process-section__eyebrow">
            {eyebrow}
          </SectionLabel>
          {title ? (
            <h2 id={headingId}>{title}</h2>
          ) : (
            <h2 aria-label="From uncertainty to assurance." id={headingId}>
              <span>From uncertainty</span>
              <span>to assurance.</span>
            </h2>
          )}
          <p className="text-body-large">{description}</p>
        </div>

        <div className="process-board">
          <ol className="process-steps" aria-label="KAMMAND advisory process">
            {processSteps.map((step, index) => (
              <li
                className="process-step"
                key={step.number}
                style={{ "--process-index": index } as CSSProperties}
              >
                <div className="process-step__index">
                  <span className="process-step__number">{step.number}</span>
                  <span className="process-step__label">{step.label}</span>
                </div>

                <div className="process-step__content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>

                <div className="process-step__outputs">
                  <span className="process-step__outputs-label">Outputs</span>
                  <ul>
                    {(deliverablesByPhase[step.title] ?? []).map((deliverable) => (
                      <li key={deliverable}>{deliverable}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
