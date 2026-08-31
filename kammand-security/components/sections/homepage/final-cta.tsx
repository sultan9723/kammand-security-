import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "../../ui/container";
import { DirectionalArrow } from "../../ui/directional-arrow";

const consultationOutcomes = [
  {
    icon: "discussion",
    title: "Live expert discussion",
    description: "Share your context and get practical, tailored guidance.",
  },
  {
    icon: "roadmap",
    title: "Actionable roadmaps",
    description: "Leave with clear next steps built around your priorities.",
  },
  {
    icon: "outcomes",
    title: "Measurable outcomes",
    description: "Solutions designed to reduce risk and strengthen resilience.",
  },
  {
    icon: "confidential",
    title: "Confidential & secure",
    description: "Your information stays private and protected.",
  },
] as const;

type OutcomeIcon = (typeof consultationOutcomes)[number]["icon"];

function ActionIcon({ icon }: { icon: "calendar" | "mail" }) {
  return icon === "calendar" ? (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6 3v3M18 3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
      <path d="M8 12h3v3H8z" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3 5h18v14H3z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function OutcomeIconGraphic({ icon }: { icon: OutcomeIcon }) {
  if (icon === "discussion") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M4 7h16a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-8l-5 4v-4a3 3 0 0 1-3-3V7Z" />
        <path d="M14 14h11a3 3 0 0 1 3 3v7l2 3-5-3h-5" />
      </svg>
    );
  }

  if (icon === "roadmap") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M9 5h14v23H9zM13 5V3h6v2" />
        <path d="m12 11 2 2 4-4M12 19l2 2 4-4M21 11h-1M21 19h-1" />
      </svg>
    );
  }

  if (icon === "outcomes") {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32">
        <path d="M5 27V16M13 27V12M21 27V8M29 27V4" />
        <path d="m4 13 8-7 6 4L28 2M23 2h5v5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 32 32">
      <path d="M16 3c4 3 8 4 11 4v8c0 7-4 11-11 14C9 26 5 22 5 15V7c3 0 7-1 11-4Z" />
      <path d="m11 16 3 3 7-8" />
    </svg>
  );
}

function ConsultationDiagram() {
  return (
    <svg
      className="consultation-diagram"
      role="img"
      viewBox="0 0 720 560"
      aria-labelledby="consultation-diagram-title consultation-diagram-description"
    >
      <title id="consultation-diagram-title">Connected GRC control model</title>
      <desc id="consultation-diagram-description">
        Governance, risk management, compliance, and assurance connect to a
        shared control model.
      </desc>

      <g className="consultation-diagram__rings">
        {[116, 156, 196, 236].map((radius) => (
          <circle cx="340" cy="265" key={radius} r={radius} />
        ))}
      </g>
      <g className="consultation-diagram__orbit-points">
        <circle cx="181" cy="124" r="4" />
        <circle cx="104" cy="265" r="4" />
        <circle cx="243" cy="480" r="4" />
        <circle cx="482" cy="454" r="4" />
        <circle cx="576" cy="265" r="4" />
        <circle cx="447" cy="70" r="4" />
      </g>

      <g className="consultation-diagram__cube-stack">
        <path d="m340 157 52 30-52 30-52-30Z" />
        <path d="m288 187 52 30v60l-52-30Z" />
        <path d="m392 187-52 30v60l52-30Z" />
        <path d="m280 219 60 35-60 35-60-35Z" />
        <path d="m220 254 60 35v68l-60-35Z" />
        <path d="m340 254-60 35v68l60-35Z" />
        <path d="m400 219 60 35-60 35-60-35Z" />
        <path d="m340 254 60 35v68l-60-35Z" />
        <path d="m460 254-60 35v68l60-35Z" />
        <path d="m340 250 62 36-62 36-62-36Z" />
        <path d="m278 286 62 36v72l-62-36Z" />
        <path d="m402 286-62 36v72l62-36Z" />
      </g>
      <g className="consultation-diagram__core">
        <path d="m340 252 48 28-48 28-48-28Z" />
        <path d="m292 280 48 28v54l-48-28Z" />
        <path d="m388 280-48 28v54l48-28Z" />
      </g>

      <g className="consultation-diagram__connector">
        <path d="M447 106 486 52h54" />
        <circle cx="447" cy="106" r="3" />
        <circle cx="540" cy="52" r="4" />
        <path d="M576 265h56" />
        <circle cx="632" cy="265" r="4" />
        <path d="M482 454h94" />
        <circle cx="576" cy="454" r="4" />
        <path d="M94 365h56" />
        <circle cx="94" cy="365" r="4" />
        <circle cx="150" cy="365" r="4" />
      </g>

      <g className="consultation-diagram__label">
        <text x="558" y="57">GOVERNANCE</text>
        <text className="consultation-diagram__copy" x="558" y="84">Clear direction</text>
        <text className="consultation-diagram__copy" x="558" y="106">and accountability</text>
        <text x="648" y="270">RISK MANAGEMENT</text>
        <text className="consultation-diagram__copy" x="648" y="297">Identify, assess,</text>
        <text className="consultation-diagram__copy" x="648" y="319">and treat risk</text>
        <text x="594" y="459">COMPLIANCE</text>
        <text className="consultation-diagram__copy" x="594" y="486">Align with regulatory</text>
        <text className="consultation-diagram__copy" x="594" y="508">expectations</text>
        <text x="0" y="370">ASSURANCE</text>
        <text className="consultation-diagram__copy" x="0" y="397">Evidence, oversight,</text>
        <text className="consultation-diagram__copy" x="0" y="419">and continuous</text>
        <text className="consultation-diagram__copy" x="0" y="441">improvement</text>
      </g>
    </svg>
  );
}

type FinalCtaSectionProps = {
  actionsLabel?: string;
  description?: string;
  eyebrow?: string;
  headingId?: string;
  title?: ReactNode;
};

export function FinalCtaSection({
  actionsLabel = "Final consultation actions",
  description = "Book a focused consultation about an active or near-term advisory need, or explore KAMMAND's service paths first.",
  eyebrow = "CONSULTATION",
  headingId = "final-cta-title",
  title = "Ready to bring clarity to your GRC program?",
}: FinalCtaSectionProps = {}) {
  return (
    <section className="final-cta-home" aria-labelledby={headingId}>
      <Container className="container-wide">
        <p className="eyebrow final-cta-home__eyebrow">{eyebrow}</p>

        <div className="final-cta-home__main">
          <div className="final-cta-home__content">
            <h2 id={headingId}>{title}</h2>
            <p className="text-body-large">{description}</p>

            <div className="final-cta-home__actions" aria-label={actionsLabel}>
              <Link className="ui-button ui-button--primary" href="/book">
                <ActionIcon icon="calendar" />
                Book a Consultation
                <DirectionalArrow className="final-cta-home__arrow" />
              </Link>
              <Link className="ui-button ui-button--secondary" href="/services">
                Explore Services
              </Link>
            </div>

            <p className="final-cta-home__context">
              Advisory for governance, risk, compliance, and assurance priorities
            </p>
          </div>

          <div className="final-cta-home__visual">
            <ConsultationDiagram />
          </div>
        </div>

        <ul className="final-cta-home__outcomes" aria-label="Consultation outcomes">
          {consultationOutcomes.map((outcome) => (
            <li key={outcome.title}>
              <span className="final-cta-home__outcome-icon">
                <OutcomeIconGraphic icon={outcome.icon} />
              </span>
              <span className="final-cta-home__outcome-copy">
                <strong>{outcome.title}</strong>
                <span>{outcome.description}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
