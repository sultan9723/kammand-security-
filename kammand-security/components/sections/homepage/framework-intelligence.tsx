import { Container } from "../../ui/container";
import { FrameworkControlModel } from "./framework-control-model";

export function FrameworkIntelligence() {
  return (
    <section
      className="framework-intelligence"
      aria-labelledby="framework-intelligence-title"
    >
      {/* Decorative Ambient Background Elements */}
      <div className="framework-intelligence__bg-decor" aria-hidden="true">
        {/* Top-Left Dot Grid Matrix */}
        <svg
          className="framework-intelligence__dot-grid"
          width="240"
          height="180"
          viewBox="0 0 240 180"
          fill="none"
        >
          <defs>
            <pattern
              id="fi-dot-grid"
              x="0"
              y="0"
              width="16"
              height="16"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.25" fill="var(--color-accent)" fillOpacity="0.28" />
            </pattern>
            <linearGradient id="fi-grid-fade" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="60%" stopColor="white" stopOpacity="0.6" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="fi-grid-mask">
              <rect width="240" height="180" fill="url(#fi-grid-fade)" />
            </mask>
          </defs>
          <rect
            width="240"
            height="180"
            fill="url(#fi-dot-grid)"
            mask="url(#fi-grid-mask)"
          />
        </svg>

        {/* Top-Right Orbital Arcs & Nodes */}
        <svg
          className="framework-intelligence__orbit-arcs"
          width="280"
          height="240"
          viewBox="0 0 280 240"
          fill="none"
        >
          <circle
            cx="240"
            cy="40"
            r="80"
            stroke="var(--color-accent)"
            strokeOpacity="0.16"
            strokeWidth="1"
          />
          <circle
            cx="240"
            cy="40"
            r="140"
            stroke="var(--color-accent)"
            strokeOpacity="0.12"
            strokeWidth="1"
          />
          <circle
            cx="240"
            cy="40"
            r="200"
            stroke="var(--color-accent)"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
          <circle cx="160" cy="40" r="2.5" fill="var(--color-accent)" fillOpacity="0.4" />
          <circle cx="240" cy="180" r="2.5" fill="var(--color-accent)" fillOpacity="0.4" />
          <circle cx="100" cy="40" r="2" fill="var(--color-accent)" fillOpacity="0.3" />
        </svg>
      </div>

      <Container className="container-wide framework-intelligence__container">
        <div className="framework-intelligence__header">
          <p className="framework-intelligence__eyebrow">
            <span className="framework-intelligence__eyebrow-mark" aria-hidden="true">■ ▬</span>
            <span>FRAMEWORK INTELLIGENCE</span>
            <span className="framework-intelligence__eyebrow-mark" aria-hidden="true">▬ ■</span>
          </p>
          <h2
            id="framework-intelligence-title"
            aria-label="Multiple frameworks. One control environment."
          >
            <span className="framework-intelligence__title-line">Multiple frameworks.</span>
            <span className="framework-intelligence__title-line">One control environment.</span>
          </h2>
          <p className="text-body-large framework-intelligence__subtitle">
            One coordinated approach to governance, cybersecurity, privacy and
            assurance.
          </p>
        </div>

        <FrameworkControlModel />
      </Container>
    </section>
  );
}
