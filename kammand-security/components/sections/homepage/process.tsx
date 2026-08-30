import type { CSSProperties, ReactNode } from "react";
import { Container } from "../../ui/container";

const processSteps = [
  {
    number: "01",
    title: "Discover",
    icon: "discover",
    description:
      "Understand the organization, regulatory obligations, current controls, risk exposure, and business priorities.",
  },
  {
    number: "02",
    title: "Design",
    icon: "design",
    description:
      "Translate requirements and identified gaps into a practical governance, risk, compliance, and security roadmap.",
  },
  {
    number: "03",
    title: "Deliver",
    icon: "deliver",
    description:
      "Support implementation of controls, documentation, remediation activities, ownership, and evidence.",
  },
  {
    number: "04",
    title: "Assure",
    icon: "assure",
    description:
      "Review control effectiveness, evidence, and readiness to help maintain confidence beyond a single assessment.",
  },
] as const;

type ProcessIcon = (typeof processSteps)[number]["icon"];

function ProcessIconSvg({ icon }: { icon: ProcessIcon }) {
  if (icon === "discover") {
    return (
      <svg aria-hidden="true" viewBox="0 0 160 160">
        <ellipse className="process-icon__shadow" cx="82" cy="132" rx="42" ry="10" />
        <circle className="process-icon__halo" cx="70" cy="66" r="43" />
        <circle className="process-icon__surface" cx="70" cy="66" r="32" />
        <circle className="process-icon__glass" cx="70" cy="66" r="22" />
        <path className="process-icon__edge" d="m94 92 33 33" />
        <path className="process-icon__edge" d="m62 66h16" />
        <path className="process-icon__edge" d="M70 58v16" />
        <path className="process-icon__shine" d="M52 49c9-10 25-12 37-3" />
      </svg>
    );
  }

  if (icon === "design") {
    return (
      <svg aria-hidden="true" viewBox="0 0 160 160">
        <ellipse className="process-icon__shadow" cx="80" cy="134" rx="44" ry="10" />
        <path className="process-icon__paper-back" d="M49 24h50l18 18v78H49z" />
        <path className="process-icon__surface" d="M42 18h54l21 21v82H42z" />
        <path className="process-icon__glass" d="M96 18v24h24" />
        <path className="process-icon__edge" d="M58 58h40" />
        <path className="process-icon__edge" d="M58 76h32" />
        <path className="process-icon__edge" d="m70 106 43-43 13 13-43 43-20 6z" />
        <path className="process-icon__shine" d="m112 64 13 13" />
      </svg>
    );
  }

  if (icon === "deliver") {
    return (
      <svg aria-hidden="true" viewBox="0 0 160 160">
        <ellipse className="process-icon__shadow" cx="80" cy="133" rx="48" ry="11" />
        <path className="process-icon__layer-back" d="m34 72 46-24 46 24-46 24z" />
        <path className="process-icon__surface" d="m34 90 46-24 46 24-46 24z" />
        <path className="process-icon__glass" d="m34 108 46-24 46 24-46 24z" />
        <path className="process-icon__edge" d="m48 82 32 16 32-16" />
        <path className="process-icon__edge" d="m48 100 32 16 32-16" />
        <path className="process-icon__shine" d="m63 75 17-9 17 9" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 160 160">
      <ellipse className="process-icon__shadow" cx="80" cy="134" rx="44" ry="11" />
      <path className="process-icon__halo" d="M80 18 122 36v34c0 35-20 56-42 68-22-12-42-33-42-68V36z" />
      <path className="process-icon__surface" d="M80 29 111 42v27c0 26-14 43-31 53-17-10-31-27-31-53V42z" />
      <path className="process-icon__glass" d="M80 44 98 52v17c0 16-8 27-18 34-10-7-18-18-18-34V52z" />
      <path className="process-icon__edge" d="m67 75 9 10 20-25" />
      <path className="process-icon__shine" d="M59 47 80 38l21 9" />
    </svg>
  );
}

function ProcessBackground() {
  return (
    <svg
      aria-hidden="true"
      className="process-section__background"
      focusable="false"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="process-dot-field" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.25" />
        </pattern>
        <radialGradient
          id="process-dot-fade"
          cx="0"
          cy="210"
          r="240"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="white" stopOpacity="1" />
          <stop offset="0.62" stopColor="white" stopOpacity="0.6" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask
          id="process-dot-mask"
          x="0"
          y="100"
          width="260"
          height="220"
          maskUnits="userSpaceOnUse"
          maskContentUnits="userSpaceOnUse"
        >
          <rect y="100" width="260" height="220" fill="url(#process-dot-fade)" />
        </mask>
      </defs>
      <rect
        className="process-bg__dots"
        x="0"
        y="100"
        width="260"
        height="220"
        fill="url(#process-dot-field)"
        mask="url(#process-dot-mask)"
      />
      <g className="process-bg__rings">
        <circle cx="1440" cy="54" r="64" />
        <circle cx="1440" cy="54" r="84" />
        <circle cx="1440" cy="54" r="104" />
        <circle cx="1440" cy="54" r="124" />
        <circle cx="1440" cy="54" r="146" />
        <circle cx="1390" cy="226" r="4" />
        <circle cx="1320" cy="108" r="3" />
      </g>
      <g className="process-bg__wave">
        {Array.from({ length: 82 }, (_, index) => {
          const x = 20 + index * 18;
          const y = 750 + Math.sin(index * 0.42) * 36 + Math.sin(index * 0.15) * 24;

          return <circle cx={x} cy={y} key={index} r={index % 5 === 0 ? 2.2 : 1.45} />;
        })}
        {Array.from({ length: 76 }, (_, index) => {
          const x = 42 + index * 19;
          const y = 804 + Math.sin(index * 0.5) * 26;

          return <circle cx={x} cy={y} key={`lower-${index}`} r="1.2" />;
        })}
        {Array.from({ length: 70 }, (_, index) => {
          const x = 76 + index * 20;
          const y = 850 + Math.sin(index * 0.38) * 18;

          return <circle cx={x} cy={y} key={`base-${index}`} r="1" />;
        })}
      </g>
    </svg>
  );
}

function ProcessTimeline() {
  return (
    <svg
      aria-hidden="true"
      className="process-timeline"
      focusable="false"
      viewBox="0 0 1200 110"
      preserveAspectRatio="none"
    >
      <path
        className="process-timeline__halo"
        d="M-20 33 C90 33 132 33 168 33 C246 33 268 64 334 64 C400 64 426 33 500 33 C574 33 600 64 666 64 C732 64 760 33 834 33 C908 33 934 64 1000 64 C1066 64 1096 33 1220 33"
      />
      <path
        className="process-timeline__line"
        d="M-20 33 C90 33 132 33 168 33 C246 33 268 64 334 64 C400 64 426 33 500 33 C574 33 600 64 666 64 C732 64 760 33 834 33 C908 33 934 64 1000 64 C1066 64 1096 33 1220 33"
      />
      {[285, 585, 885].map((x) => (
        <g className="process-timeline__chevron" key={x}>
          <path d={`M${x} 48 ${x + 10} 56 ${x} 64`} />
          <path d={`M${x + 18} 48 ${x + 28} 56 ${x + 18} 64`} />
        </g>
      ))}
    </svg>
  );
}

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
  eyebrow = "HOW WE WORK",
  headingId = "process-title",
  sectionId,
  title,
}: ProcessSectionProps = {}) {
  return (
    <section className="process-section" id={sectionId} aria-labelledby={headingId}>
      <ProcessBackground />
      <Container>
        <div className="process-section__header">
          <p className="process-section__eyebrow">{eyebrow}</p>
          {title ? (
            <h2 id={headingId}>{title}</h2>
          ) : (
            <h2 aria-label="From uncertainty to assurance." id={headingId}>
              <span>From uncertainty</span>
              <span>
                to <span className="process-section__title-accent">assurance.</span>
              </span>
            </h2>
          )}
          <p className="text-body-large">{description}</p>
        </div>

        <div className="process-visual">
          <ProcessTimeline />
          <ol className="process-steps" aria-label="KAMMAND advisory process">
            {processSteps.map((step, index) => (
              <li
                className="process-step"
                key={step.number}
                style={{ "--process-index": index } as CSSProperties}
              >
                <span className="process-step__number">{step.number}</span>
                <span className="process-step__connector" aria-hidden="true" />
                <span className="process-step__icon" aria-hidden="true">
                  <span className="process-step__platform" />
                  <ProcessIconSvg icon={step.icon} />
                </span>
                <div className="process-step__content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
