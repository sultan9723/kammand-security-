import type { CSSProperties } from "react";

/**
 * The operating states KAMMAND works through, read clockwise from the top.
 *
 * These are deliberately KAMMAND's own vocabulary rather than NIST CSF's
 * (Identify / Protect / Detect / Respond / Recover), which this site does not
 * advise on. The cycle maps to the four frameworks it does cover — SAMA CSF,
 * NCA ECC, Saudi PDPL, ISO 27001 — and to the language used everywhere else on
 * the site: governance, risk, control, evidence, remediation, assurance.
 *
 * Coordinates are authored, not computed, so the labels can be changed freely
 * but a position cannot be moved without redrawing its neighbours.
 */
const orbitNodes = [
  { label: "GOVERN", x: 260, y: 82, tone: "primary" },
  { label: "ASSESS", x: 386, y: 134, tone: "secondary" },
  { label: "CONTROL", x: 438, y: 260, tone: "primary" },
  { label: "REMEDIATE", x: 386, y: 386, tone: "secondary" },
  { label: "EVIDENCE", x: 260, y: 438, tone: "primary" },
  { label: "COMPLY", x: 134, y: 386, tone: "secondary" },
  { label: "ASSURE", x: 82, y: 260, tone: "primary" },
  { label: "REPORT", x: 134, y: 134, tone: "secondary" },
] as const;

function labelAnchor(x: number) {
  if (x < 170) {
    return "end";
  }

  if (x > 350) {
    return "start";
  }

  return "middle";
}

function labelOffsetX(x: number) {
  if (x < 170) {
    return -12;
  }

  if (x > 350) {
    return 12;
  }

  return 0;
}

function labelOffsetY(y: number) {
  if (y < 110) {
    return -20;
  }

  if (y > 410) {
    return 22;
  }

  return 5;
}

export function GrcOrbit() {
  return (
    <figure className="grc-orbit" aria-labelledby="grc-orbit-title grc-orbit-desc">
      <svg
        className="grc-orbit__svg"
        role="img"
        viewBox="0 0 520 520"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title id="grc-orbit-title">KAMMAND governance, risk, and compliance orbit</title>
        <desc id="grc-orbit-desc">
          KAMMAND sits at the center of an organized operating model connecting
          governance, assessment, control design, remediation, evidence,
          compliance, assurance, and reporting.
        </desc>

        <g className="grc-orbit__guides" aria-hidden="true">
          <circle className="grc-orbit__ring grc-orbit__ring--outer" cx="260" cy="260" r="178" />
          <circle className="grc-orbit__ring grc-orbit__ring--middle" cx="260" cy="260" r="138" />
          <circle className="grc-orbit__ring grc-orbit__ring--inner" cx="260" cy="260" r="98" />
          <circle className="grc-orbit__ring grc-orbit__ring--core" cx="260" cy="260" r="58" />
          {orbitNodes.map((node) => (
            <line
              className="grc-orbit__axis"
              key={`axis-${node.label}`}
              x1="260"
              x2={node.x}
              y1="260"
              y2={node.y}
            />
          ))}
        </g>

        <g className="grc-orbit__connectors" aria-hidden="true">
          {orbitNodes.map((node) => (
            <line
              className="grc-orbit__connector"
              key={`connector-${node.label}`}
              x1="260"
              x2={node.x}
              y1="260"
              y2={node.y}
            />
          ))}
        </g>

        <g className="grc-orbit__core">
          <circle className="grc-orbit__core-ring" cx="260" cy="260" r="49" />
          <circle className="grc-orbit__core-fill" cx="260" cy="260" r="34" />
          <text className="grc-orbit__core-label" textAnchor="middle" x="260" y="265">
            KAMMAND
          </text>
        </g>

        <g className="grc-orbit__nodes">
          {orbitNodes.map((node, index) => (
            <g
              className={`grc-orbit__node grc-orbit__node--${node.tone}`}
              key={node.label}
              style={{ "--node-index": index } as CSSProperties}
            >
              <circle className="grc-orbit__node-outer" cx={node.x} cy={node.y} r="11" />
              <circle className="grc-orbit__node-inner" cx={node.x} cy={node.y} r="4" />
              <text
                className={`grc-orbit__label ${
                  node.tone === "secondary" ? "grc-orbit__label--secondary" : ""
                }`}
                textAnchor={labelAnchor(node.x)}
                x={node.x + labelOffsetX(node.x)}
                y={node.y + labelOffsetY(node.y)}
              >
                {node.label}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </figure>
  );
}
