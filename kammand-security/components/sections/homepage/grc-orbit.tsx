import type { CSSProperties } from "react";

/**
 * The operating states KAMMAND works through, read clockwise from the top.
 *
 * These are deliberately KAMMAND's own vocabulary rather than NIST CSF's
 * (Identify / Protect / Detect / Respond / Recover), which this site does not
 * advise on. The cycle maps to the four frameworks it does cover - SAMA CSF,
 * NCA ECC, Saudi PDPL, ISO 27001 - and to the language used everywhere else on
 * the site: governance, risk, control, evidence, remediation, assurance.
 *
 * Coordinates are authored, not computed, so the labels can be changed freely
 * but a position cannot be moved without redrawing its neighbours, the spokes,
 * and the signal-flow paths in lockstep.
 */
const orbitNodes = [
  { label: "GOVERN", x: 340, y: 100 },
  { label: "ASSESS", x: 481.4, y: 158.6 },
  { label: "CONTROL", x: 540, y: 300 },
  { label: "REMEDIATE", x: 481.4, y: 441.4 },
  { label: "EVIDENCE", x: 340, y: 500 },
  { label: "COMPLY", x: 198.6, y: 441.4 },
  { label: "ASSURE", x: 140, y: 300 },
  { label: "REPORT", x: 198.6, y: 158.6 },
] as const;

const orbitLabels = [
  { label: "GOVERN", x: 340, y: 79, anchor: "middle" },
  { label: "ASSESS", x: 496.4, y: 146.6, anchor: "start" },
  { label: "CONTROL", x: 556, y: 300, anchor: "start" },
  { label: "REMEDIATE", x: 496.4, y: 453.4, anchor: "start" },
  { label: "EVIDENCE", x: 340, y: 521, anchor: "middle" },
  { label: "COMPLY", x: 183.6, y: 453.4, anchor: "end" },
  { label: "ASSURE", x: 124, y: 300, anchor: "end" },
  { label: "REPORT", x: 183.6, y: 146.6, anchor: "end" },
] as const;

/** Invisible motion guides for Layer 6 - one per perimeter node, core edge to just short of the node. */
const signalPaths = [
  { id: "signal-path-1", d: "M340,346 L340,110" },
  { id: "signal-path-2", d: "M372.5,332.5 L473,172" },
  { id: "signal-path-3", d: "M386,300 L530,300" },
  { id: "signal-path-4", d: "M372.5,267.5 L473,428" },
  { id: "signal-path-5", d: "M340,254 L340,490" },
  { id: "signal-path-6", d: "M307.5,267.5 L207,428" },
  { id: "signal-path-7", d: "M294,300 L150,300" },
  { id: "signal-path-8", d: "M307.5,332.5 L207,172" },
] as const;

const signalBegins = ["0s", "0.4s", "0.8s", "1.2s", "1.6s", "2s", "2.4s", "2.8s"] as const;

/** 15 ambient particles: position, drift variant, twinkle timing, and a staggered negative delay so the field never looks synchronized. */
const orbitParticles = [
  { x: 410, y: 230, drift: 1, r: 1.0, color: "primary", driftDur: "7s", twinkleDur: "3.2s", delay: "-0.5s" },
  { x: 270, y: 250, drift: 2, r: 1.2, color: "signal", driftDur: "8s", twinkleDur: "3.6s", delay: "-1.3s" },
  { x: 430, y: 360, drift: 3, r: 0.9, color: "primary", driftDur: "9s", twinkleDur: "4.0s", delay: "-2.1s" },
  { x: 260, y: 360, drift: 4, r: 1.4, color: "signal", driftDur: "7.5s", twinkleDur: "2.8s", delay: "-0.8s" },
  { x: 380, y: 200, drift: 5, r: 0.8, color: "primary", driftDur: "10s", twinkleDur: "4.5s", delay: "-3.4s" },
  { x: 290, y: 410, drift: 1, r: 1.1, color: "signal", driftDur: "8.5s", twinkleDur: "3.4s", delay: "-1.7s" },
  { x: 430, y: 270, drift: 2, r: 1.3, color: "primary", driftDur: "9.5s", twinkleDur: "3.9s", delay: "-2.6s" },
  { x: 220, y: 300, drift: 3, r: 1.0, color: "signal", driftDur: "7.2s", twinkleDur: "3.0s", delay: "-0.3s" },
  { x: 450, y: 310, drift: 4, r: 0.9, color: "primary", driftDur: "8.8s", twinkleDur: "4.2s", delay: "-1.9s" },
  { x: 320, y: 430, drift: 5, r: 1.2, color: "signal", driftDur: "9.2s", twinkleDur: "3.5s", delay: "-2.8s" },
  { x: 240, y: 220, drift: 1, r: 1.4, color: "primary", driftDur: "7.8s", twinkleDur: "2.9s", delay: "-0.6s" },
  { x: 400, y: 420, drift: 2, r: 0.8, color: "signal", driftDur: "10s", twinkleDur: "4.4s", delay: "-3.1s" },
  { x: 360, y: 180, drift: 3, r: 1.1, color: "primary", driftDur: "8.2s", twinkleDur: "3.7s", delay: "-1.1s" },
  { x: 200, y: 380, drift: 4, r: 1.3, color: "signal", driftDur: "9.8s", twinkleDur: "4.1s", delay: "-2.3s" },
  { x: 470, y: 380, drift: 5, r: 1.0, color: "primary", driftDur: "7s", twinkleDur: "3.1s", delay: "-0.9s" },
] as const;

function spokePath(node: (typeof orbitNodes)[number]) {
  return `M 340 300 L ${node.x} ${node.y}`;
}

export function GrcOrbit() {
  return (
    <figure className="grc-orbit" aria-labelledby="grc-orbit-title grc-orbit-desc">
      <svg
        className="grc-orbit__svg"
        role="img"
        viewBox="0 0 680 580"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id="grc-orbit-title">KAMMAND governance, risk, and compliance orbit</title>
        <desc id="grc-orbit-desc">
          KAMMAND sits at the center of an organized operating model connecting
          governance, assessment, control design, remediation, evidence,
          compliance, assurance, and reporting.
        </desc>

        <defs>
          <radialGradient id="grc-orbit-atmo-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--orbit-primary)" stopOpacity="0.18" />
            <stop offset="55%" stopColor="var(--orbit-primary)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--orbit-primary)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="grc-orbit-core-glow-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--orbit-primary)" stopOpacity="0.55" />
            <stop offset="55%" stopColor="var(--orbit-primary)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--orbit-primary)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="grc-orbit-signal-glow-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--orbit-signal)" stopOpacity="0.85" />
            <stop offset="65%" stopColor="var(--orbit-primary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--orbit-primary)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="grc-orbit-perimeter-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--orbit-primary)" />
            <stop offset="50%" stopColor="var(--orbit-deep)" />
            <stop offset="100%" stopColor="var(--orbit-primary)" />
          </linearGradient>

          {signalPaths.map((path) => (
            <path key={path.id} id={path.id} d={path.d} fill="none" />
          ))}
        </defs>

        {/* Layer 1 - atmosphere */}
        <circle className="grc-orbit__atmosphere" cx="340" cy="300" r="200" fill="url(#grc-orbit-atmo-grad)" />

        {/* Layer 2 - outer perimeter ring, shimmering */}
        <circle className="grc-orbit__perimeter-ring" cx="340" cy="300" r="200" />

        {/* Layer 3 - slow clockwise decorative ring */}
        <g className="grc-orbit__rotate grc-orbit__rotate--outer" aria-hidden="true">
          <circle className="grc-orbit__ring-outer" cx="340" cy="300" r="170" />
        </g>

        {/* Layer 4 (structural) - prominent inner dashed ring, static */}
        <circle className="grc-orbit__ring grc-orbit__ring--inner" cx="340" cy="300" r="140" />

        {/* Layer 5 - slow counter-clockwise decorative ring */}
        <g className="grc-orbit__rotate grc-orbit__rotate--inner" aria-hidden="true">
          <circle className="grc-orbit__ring-inner" cx="340" cy="300" r="115" />
        </g>

        {/* Layer 6 (structural) - spokes */}
        <g className="grc-orbit__guides" aria-hidden="true">
          {orbitNodes.map((node) => (
            <path className="grc-orbit__spoke" d={spokePath(node)} key={`spoke-${node.label}`} />
          ))}
        </g>

        {/* Layer 7 - ambient particles */}
        <g className="grc-orbit__particles" aria-hidden="true">
          {orbitParticles.map((particle) => (
            <circle
              key={`particle-${particle.x}-${particle.y}`}
              className={`grc-orbit__particle grc-orbit__particle--drift-${particle.drift} grc-orbit__particle--${particle.color}`}
              cx={particle.x}
              cy={particle.y}
              r={particle.r}
              style={
                {
                  "--drift-duration": particle.driftDur,
                  "--twinkle-duration": particle.twinkleDur,
                  "--particle-delay": particle.delay,
                } as CSSProperties
              }
            />
          ))}
        </g>

        {/* Layer 8 - signal flow (primary motion) */}
        <g className="grc-orbit__signal-layer" aria-hidden="true">
          {signalPaths.map((path, index) => (
            <g className="grc-orbit__signal" key={path.id}>
              <animateMotion dur="3.2s" begin={signalBegins[index]} repeatCount="indefinite">
                <mpath href={`#${path.id}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.12;0.88;1"
                dur="3.2s"
                begin={signalBegins[index]}
                repeatCount="indefinite"
              />
              <circle className="grc-orbit__signal-halo" r="9" fill="url(#grc-orbit-signal-glow-grad)" />
              <circle className="grc-orbit__signal-dot" r="2.4">
                <animate
                  attributeName="r"
                  values="2.2;3.2;2.2"
                  keyTimes="0;0.5;1"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                  dur="1.4s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}
        </g>

        {/* Layer 9 - core glow */}
        <circle className="grc-orbit__core-glow" cx="340" cy="300" r="80" fill="url(#grc-orbit-core-glow-grad)" />

        {/* Layer 10 - core, breathing */}
        <g className="grc-orbit__core">
          <circle className="grc-orbit__core-fill" cx="340" cy="300" r="46" />
          <circle className="grc-orbit__core-ring" cx="340" cy="300" r="46" />
          {/* Layer 11 - static core label */}
          <text className="grc-orbit__core-label" textAnchor="middle" x="340" y="304">
            KAMMAND
          </text>
        </g>

        {/* Layer 12 - perimeter nodes and labels, always on top */}
        <g className="grc-orbit__nodes">
          {orbitNodes.map((node, index) => {
            const label = orbitLabels[index];
            return (
              <g className="grc-orbit__node" key={node.label}>
                <circle className="grc-orbit__node-ring" cx={node.x} cy={node.y} r="5" />
                <text className="grc-orbit__label" textAnchor={label.anchor} x={label.x} y={label.y}>
                  {node.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </figure>
  );
}
