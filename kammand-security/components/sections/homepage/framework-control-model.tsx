"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import {
  capabilities,
  frameworks,
  type CapabilityIconName,
  type FrameworkIconName,
} from "./framework-data";

const MotionLink = motion.create(Link);

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Entrance timeline for the parts of the diagram that still reveal on scroll:
 * the control model appears, the rings fade in, the frameworks resolve, and
 * capabilities settle in last. The connecting arrows are no longer part of
 * this sequence — they are static from first paint, and carry their own
 * separate, continuously repeating signal-dot cycle instead (see
 * CYCLE_DURATION below).
 */
const T = {
  core: 0,
  rings: 0.45,
  frameworks: 0.62,
  capabilities: 1.72,
} as const;

/**
 * Entry offsets push each framework slightly away from centre before it
 * resolves inward, so the reveal reads as convergence rather than a fade.
 * Outer frameworks travel further than inner ones.
 */
const FRAMEWORK_ENTRY = [
  { x: -20, y: -8 },
  { x: -10, y: -12 },
  { x: 10, y: -12 },
  { x: 20, y: -8 },
] as const;

/** Pull toward centre when the control model is hovered. Signs mirror. */
const MAGNET_X = [6, 4, -4, -6] as const;

/**
 * Coordinates below are measured from the rendered diagram at its fixed
 * desktop breakpoint (this section only renders at >=1024px, and the layout
 * caps at the 1280px container, so one measurement covers the whole visible
 * range). They deliberately do not match the framework/capability icons'
 * naive evenly-spaced guess — the icons render a few px off that guess, and
 * an arrow that does not start under its icon is the "floating" look this
 * pass fixes.
 */
const FRAMEWORK_ICON_X = [118, 436, 764, 1082] as const;
const CAPABILITY_ICON_X = [92, 295, 498, 702, 905, 1108] as const;

/** SSR / first-paint fallback, calibrated against a 1280px measurement.
 * Replaced by useBoxEntryPoints' real measurement immediately on mount. */
const BOX_ENTRY_X_FALLBACK = [510, 570, 630, 690] as const;

/**
 * The box's rendered width turned out not to be a stable fraction of the
 * stage across breakpoints -- measured at 25% of stage width at 1280px but
 * only 15.5% at 1920px, because of a pre-existing, apparently-dead legacy CSS
 * rule elsewhere in this file that also sets a width on the outer wrapper
 * (unrelated to this change, left alone). A hardcoded spread calibrated to
 * one breakpoint therefore overshoots the box at others -- confirmed the
 * rightmost entry point landing outside the box at 1920px.
 *
 * Measuring the box's real rendered position at runtime sidesteps that
 * entirely: it stays correct against whatever width wins the CSS cascade, at
 * any viewport, without depending on which rule that turns out to be.
 */
function useBoxEntryPoints(
  stageRef: React.RefObject<HTMLElement | null>,
  boxRef: React.RefObject<HTMLElement | null>,
) {
  const [entryX, setEntryX] = useState<readonly number[]>(BOX_ENTRY_X_FALLBACK);

  useLayoutEffect(() => {
    function measure() {
      const stage = stageRef.current;
      const box = boxRef.current;

      if (!stage || !box) {
        return;
      }

      const stageRect = stage.getBoundingClientRect();
      const boxRect = box.getBoundingClientRect();

      if (stageRect.width === 0) {
        return;
      }

      const unitsPerPx = 1200 / stageRect.width;
      const centerUnit = ((boxRect.left + boxRect.right) / 2 - stageRect.left) * unitsPerPx;
      const halfSpreadUnit = (boxRect.width * unitsPerPx * 0.6) / 2;
      const step = (halfSpreadUnit * 2) / 3;

      setEntryX([
        centerUnit - halfSpreadUnit,
        centerUnit - halfSpreadUnit + step,
        centerUnit - halfSpreadUnit + step * 2,
        centerUnit + halfSpreadUnit,
      ]);
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [stageRef, boxRef]);

  return entryX;
}

/** Where the box's true top/bottom edges land in each circuit SVG's local
 * coordinates, measured against the rendered box — not the SVG's own nominal
 * 90-unit height, which the box overlaps into by a few units at each end. */
const BOX_TOP_Y = 56;
const BOX_BOTTOM_Y = 0;
const CAPABILITY_ICON_TOP_Y = 156;
const DISTRIBUTION_Y = 48;

const ELBOW_Y = 40;
const CORNER_R = 12;

function upperConnectorPath(startX: number, destX: number) {
  const dir = destX > startX ? 1 : -1;
  return [
    `M ${startX} 6`,
    `V ${ELBOW_Y - CORNER_R}`,
    `Q ${startX} ${ELBOW_Y} ${startX + dir * CORNER_R} ${ELBOW_Y}`,
    `H ${destX - dir * CORNER_R}`,
    `Q ${destX} ${ELBOW_Y} ${destX} ${ELBOW_Y + CORNER_R}`,
    `V ${BOX_TOP_Y}`,
  ].join(" ");
}

const CAPABILITY_BRANCH_X = CAPABILITY_ICON_X;

/** Signal-dot cycle. One pass through the whole diagram, then it repeats. */
const CYCLE_DURATION = 3.2;
const INPUT_STAGGER = 0.12;
const INPUT_DOT_DURATION = 0.9;
const OUTPUT_PHASE_START = 1.5;
const OUTPUT_STAGGER = 0.08;
const OUTPUT_DOT_DURATION = 0.7;
const INNER_RING_PULSE_DURATION = 5.2;

/**
 * The scroll-entry variants above are serialised into the SSR markup as
 * inline opacity:0 on nodes/capabilities/core/rings, so without JavaScript
 * the diagram would render permanently invisible even though its text is
 * present. The connector/spine/branch paths need no such rule any more --
 * they are plain static paths with no inline opacity, JS or not.
 */
const NO_SCRIPT_FALLBACK = `
.framework-control__node,
.framework-control__capability,
.framework-control__core,
.framework-control__radar-rings {
  opacity: 1 !important;
  transform: none !important;
}
`;

const stageVariants: Variants = {
  hidden: {},
  visible: {},
};

const coreVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, delay: T.core, ease: EASE },
  },
};

const ringsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: T.rings, ease: EASE },
  },
};

const frameworkVariants: Variants = {
  hidden: (index: number) => ({
    opacity: 0,
    x: FRAMEWORK_ENTRY[index]?.x ?? 0,
    y: FRAMEWORK_ENTRY[index]?.y ?? 0,
  }),
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 105,
      damping: 21,
      delay: T.frameworks + index * 0.1,
    },
  }),
};

/**
 * Capabilities resolve centre-out rather than left-to-right, so the bus reads
 * as distributing from the control model instead of scanning across.
 */
const capabilityVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.96 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.44,
      delay: T.capabilities + Math.abs(index - 2.5) * 0.08,
      ease: EASE,
    },
  }),
};

type Waypoints = { x: number[]; y: number[]; times: number[] };

/**
 * One dot, following the same waypoints as the static path it rides. Waypoints
 * are the path's straight-segment corners (not its small rounded fillets) —
 * close enough at this speed and scale that the shortcut across a 12-unit
 * corner radius is not perceptible.
 *
 * delay positions this dot within the first 3.5s cycle; repeatDelay is set so
 * duration + repeatDelay always equals the full cycle, so every dot lands on
 * the same beat every time round rather than drifting.
 */
function SignalDot({
  waypoints,
  duration,
  delay,
  reduceMotion,
}: {
  waypoints: Waypoints;
  duration: number;
  delay: number;
  reduceMotion: boolean | null;
}) {
  if (reduceMotion) {
    return null;
  }

  const opacity = waypoints.times.map((_, index) =>
    index === 0 || index === waypoints.times.length - 1 ? 0 : 1,
  );

  return (
    <motion.circle
      className="framework-control__signal"
      r="3.5"
      initial={false}
      animate={{ cx: waypoints.x, cy: waypoints.y, opacity }}
      transition={{
        cx: { duration, times: waypoints.times, ease: "linear" },
        cy: { duration, times: waypoints.times, ease: "linear" },
        opacity: { duration, times: waypoints.times, ease: "easeInOut" },
        delay,
        repeat: Infinity,
        repeatDelay: CYCLE_DURATION - duration,
      }}
    />
  );
}

export function FrameworkControlModel() {
  const reduceMotion = useReducedMotion();
  const [coreEngaged, setCoreEngaged] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const entryX = useBoxEntryPoints(stageRef, boxRef);
  const upperConnectorPaths = FRAMEWORK_ICON_X.map((startX, index) =>
    upperConnectorPath(startX, entryX[index] ?? BOX_ENTRY_X_FALLBACK[index]),
  );

  /** Magnetic response and continuous rotation are both motion-only. */
  const magnetic = !reduceMotion && coreEngaged;
  const spring = { type: "spring", stiffness: 180, damping: 22 } as const;

  return (
    <motion.div
      className="framework-control"
      aria-label="KAMMAND framework intelligence control model"
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={stageVariants}
    >
      {/* The entry variants are serialised into the SSR markup as inline
          `opacity:0`, so without JavaScript the whole diagram would render
          permanently invisible even though its text is present. This restores
          the resolved state when scripting is unavailable. */}
      <noscript>
        <style>{NO_SCRIPT_FALLBACK}</style>
      </noscript>

      <motion.div className="framework-control__stage" ref={stageRef} variants={stageVariants}>
        <motion.ul className="framework-control__nodes" aria-label="Framework pages">
          {frameworks.map((framework, index) => (
            <motion.li
              className={`framework-control__node framework-control__node--${framework.key}`}
              key={framework.key}
              style={{ "--framework-index": index } as CSSProperties}
              custom={index}
              variants={frameworkVariants}
            >
              <MotionLink
                aria-label={`${framework.label}: ${framework.descriptor}`}
                className="framework-control__link"
                href={framework.href}
                animate={{
                  x: magnetic ? MAGNET_X[index] : 0,
                  scale: magnetic ? 1.01 : 1,
                }}
                whileHover={reduceMotion ? undefined : { y: -5, scale: 1.02 }}
                transition={spring}
              >
                <span className="framework-control__icon" aria-hidden="true">
                  <FrameworkIcon icon={framework.icon} />
                </span>
                <span className="framework-control__number">{framework.number}</span>
                <span className="framework-control__name">{framework.label}</span>
                <span className="framework-control__descriptor">
                  {framework.descriptor}
                </span>
                <span className="framework-control__anchor" aria-hidden="true" />
              </MotionLink>
            </motion.li>
          ))}
        </motion.ul>

        <div className="framework-control__circuit-upper" aria-hidden="true">
          <svg
            className="framework-control__circuit-svg"
            viewBox="0 0 1200 90"
            preserveAspectRatio="none"
          >
            <defs>
              <marker
                id="framework-control-arrow-upper"
                markerHeight="8"
                markerUnits="strokeWidth"
                markerWidth="8"
                orient="auto"
                refX="7"
                refY="4"
                viewBox="0 0 8 8"
              >
                <path className="framework-control__arrowhead" d="M 1 1 L 7 4 L 1 7" />
              </marker>
            </defs>
            <g className="framework-control__connectors">
              {/* Static from first paint: no entrance draw-in on these paths.
                  The only motion here is the signal dot below. */}
              {upperConnectorPaths.map((d, index) => (
                <path
                  className="framework-control__connector"
                  d={d}
                  key={FRAMEWORK_ICON_X[index]}
                  markerEnd="url(#framework-control-arrow-upper)"
                />
              ))}
              {FRAMEWORK_ICON_X.map((startX, index) => {
                const destX = entryX[index] ?? BOX_ENTRY_X_FALLBACK[index];

                return (
                  <SignalDot
                    key={startX}
                    reduceMotion={reduceMotion}
                    duration={INPUT_DOT_DURATION}
                    delay={index * INPUT_STAGGER}
                    waypoints={{
                      x: [startX, startX, destX, destX],
                      y: [6, ELBOW_Y, ELBOW_Y, BOX_TOP_Y],
                      times: [0, 0.3, 0.7, 1],
                    }}
                  />
                );
              })}
            </g>
          </svg>
        </div>

        <div className="framework-control__center-wrapper">
          <div className="framework-control__hub">
            <motion.div
              className="framework-control__radar-rings"
              aria-hidden="true"
              variants={ringsVariants}
            >
              <svg
                className="framework-control__radar-svg"
                viewBox="0 0 400 400"
                preserveAspectRatio="xMidYMid meet"
              >
                <motion.g
                  style={{ originX: "200px", originY: "200px" }}
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 70, ease: "linear", repeat: Infinity }}
                >
                  <circle className="framework-control__ring framework-control__ring--outer" cx="200" cy="200" r="199" />
                  <circle className="framework-control__ring framework-control__ring--middle" cx="200" cy="200" r="194" />
                </motion.g>
                <motion.g
                  style={{ originX: "200px", originY: "200px" }}
                  animate={reduceMotion ? undefined : { rotate: -360 }}
                  transition={{ duration: 55, ease: "linear", repeat: Infinity }}
                >
                  <circle className="framework-control__ring framework-control__ring--faint" cx="200" cy="200" r="198" />
                </motion.g>
                <motion.circle
                  className="framework-control__ring framework-control__ring--inner"
                  cx="200"
                  cy="200"
                  r="188"
                  style={{ originX: "200px", originY: "200px" }}
                  animate={reduceMotion ? undefined : { scale: [1, 1.015, 1] }}
                  transition={{
                    duration: INNER_RING_PULSE_DURATION,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </svg>
            </motion.div>

            <div className="framework-control__core-position">
              <motion.div
                className="framework-control__core"
                variants={coreVariants}
                onHoverStart={() => setCoreEngaged(true)}
                onHoverEnd={() => setCoreEngaged(false)}
                transition={spring}
              >
                <div className="framework-control__core-content" ref={boxRef}>
                  <span className="framework-control__core-mark" aria-hidden="true">
                    <KammandLogoMark />
                  </span>
                  <div className="framework-control__core-text">
                    <span className="framework-control__brand-title">KAMMAND</span>
                    <span className="framework-control__brand-subtitle">CONTROL MODEL</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="framework-control__circuit-lower" aria-hidden="true">
          <svg
            className="framework-control__circuit-svg"
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
          >
            <defs>
              <marker
                id="framework-control-arrow-lower"
                markerHeight="8"
                markerUnits="strokeWidth"
                markerWidth="8"
                orient="auto"
                refX="7"
                refY="4"
                viewBox="0 0 8 8"
              >
                <path className="framework-control__arrowhead" d="M 1 1 L 7 4 L 1 7" />
              </marker>
            </defs>
            <g className="framework-control__capability-lines">
              {/* Trunk and the two symmetric distribution rails carry no
                  arrowhead: they are routing, not a pointer at a destination.
                  Only the six drops into the capability icons are arrows. */}
              <path
                className="framework-control__lower-spine"
                d={`M 600 ${BOX_BOTTOM_Y} V ${DISTRIBUTION_Y}`}
              />
              <path
                className="framework-control__lower-spine"
                d={`M 600 ${DISTRIBUTION_Y} H ${CAPABILITY_ICON_X[0]}`}
              />
              <path
                className="framework-control__lower-spine"
                d={`M 600 ${DISTRIBUTION_Y} H ${CAPABILITY_ICON_X[CAPABILITY_ICON_X.length - 1]}`}
              />

              {CAPABILITY_BRANCH_X.map((x) => (
                <path
                  className="framework-control__capability-branch"
                  d={`M ${x} ${DISTRIBUTION_Y} V ${CAPABILITY_ICON_TOP_Y}`}
                  key={x}
                  markerEnd="url(#framework-control-arrow-lower)"
                />
              ))}

              {CAPABILITY_ICON_X.map((targetX, index) => (
                <SignalDot
                  key={targetX}
                  reduceMotion={reduceMotion}
                  duration={OUTPUT_DOT_DURATION}
                  delay={OUTPUT_PHASE_START + index * OUTPUT_STAGGER}
                  waypoints={{
                    x: [600, 600, targetX, targetX],
                    y: [BOX_BOTTOM_Y, DISTRIBUTION_Y, DISTRIBUTION_Y, CAPABILITY_ICON_TOP_Y],
                    times: [0, 0.25, 0.65, 1],
                  }}
                />
              ))}
            </g>
          </svg>
        </div>

        <motion.ul
          className="framework-control__capabilities"
          aria-label="Capability domains"
          variants={stageVariants}
        >
          {capabilities.map((capability, index) => (
            <motion.li
              className="framework-control__capability"
              key={capability.label}
              style={{ "--capability-index": index } as CSSProperties}
              custom={index}
              variants={capabilityVariants}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              transition={spring}
            >
              <span className="framework-control__capability-icon" aria-hidden="true">
                <CapabilityIcon icon={capability.icon} />
              </span>
              <span className="framework-control__capability-name">
                {capability.label}
              </span>
              <span className="framework-control__capability-description">
                {capability.description}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}

function KammandLogoMark() {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className="framework-control__logo-svg"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M6 5 H12.5 V27 H6 Z" fill="var(--color-accent)" />
      <path
        d="M14.5 14.5 L22.8 5 H28.5 L19.2 15.6 L14.5 14.5 Z"
        fill="var(--color-accent)"
      />
      <path
        d="M14.5 17.5 L19.2 16.4 L28.5 27 H22.8 L14.5 17.5 Z"
        fill="var(--color-accent)"
      />
    </svg>
  );
}

/* =========================================================================
   Top Framework Icons (28×28 viewBox, stroke-based)
   ========================================================================= */
function FrameworkIcon({ icon }: { icon: FrameworkIconName }) {
  if (icon === "institution") {
    // 01 SAMA CSF: Classical Bank/Temple Columns & Pediment
    return (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
      >
        <path d="M4.5 10.5 L14 4.5 L23.5 10.5 H4.5 Z" />
        <path d="M3.5 10.5 H24.5" />
        <path d="M7.5 11 V19.5" />
        <path d="M14 11 V19.5" />
        <path d="M20.5 11 V19.5" />
        <path d="M5.5 19.5 H22.5" />
        <path d="M3.5 23 H24.5" />
      </svg>
    );
  }

  if (icon === "boundary") {
    // 02 NCA ECC: Target / Tech Reticle Crosshair in Square Frame
    return (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
      >
        <rect x="7" y="7" width="14" height="14" rx="1.5" />
        <rect x="11" y="11" width="6" height="6" />
        <path d="M14 3 V7" />
        <path d="M14 21 V25" />
        <path d="M3 14 H7" />
        <path d="M21 14 H25" />
      </svg>
    );
  }

  if (icon === "privacy") {
    // 03 SAUDI PDPL: Security Padlock
    return (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
      >
        <path d="M9 12 V8.5 A5 5 0 0 1 19 8.5 V12" />
        <rect x="6.5" y="12" width="15" height="12" rx="2" />
        <path d="M14 16 V19.5" />
        <circle cx="14" cy="16" r="1" fill="currentColor" />
      </svg>
    );
  }

  // 04 ISO 27001: Checklist Screen / Management Device
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      aria-hidden="true"
    >
      <rect x="5.5" y="4.5" width="17" height="19" rx="2.5" />
      <path d="M10 13.5 L12.5 16 L18 10.5" />
      <path d="M10 20 H18" />
    </svg>
  );
}

/* =========================================================================
   Bottom Capability Icons (28×28 viewBox, stroke-based)
   ========================================================================= */
function CapabilityIcon({ icon }: { icon: CapabilityIconName }) {
  if (icon === "governance") {
    // GOVERNANCE: Shield with vertical line & horizontal bars
    return (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
      >
        <path d="M14 4 L22.5 7.5 V13.5 C22.5 19 14 23.5 14 23.5 C14 23.5 5.5 19 5.5 13.5 V7.5 Z" />
        <path d="M10 10.5 L12.5 13 L18 9" />
      </svg>
    );
  }

  if (icon === "risk") {
    // RISK MANAGEMENT: Warning Triangle with Exclamation
    return (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
      >
        <path d="M14 5 L24.5 22.5 H3.5 Z" />
        <path d="M14 10.5 V15.5" />
        <circle cx="14" cy="19" r="0.85" fill="currentColor" />
      </svg>
    );
  }

  if (icon === "compliance") {
    // COMPLIANCE: Document / Certificate Page with Lines
    return (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
      >
        <path d="M7 4.5 H16.5 L21 9 V23.5 H7 Z" />
        <path d="M16.5 4.5 V9 H21" />
        <path d="M10.5 13.5 H17.5" />
        <path d="M10.5 17 H17.5" />
      </svg>
    );
  }

  if (icon === "data") {
    // DATA PROTECTION: User Avatar Profile
    return (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
      >
        <circle cx="14" cy="9.5" r="4.25" />
        <path d="M6.5 22.5 C6.5 17.5 9.8 16.5 14 16.5 C18.2 16.5 21.5 17.5 21.5 22.5" />
      </svg>
    );
  }

  if (icon === "response") {
    // INCIDENT RESPONSE: Lightning Bolt
    return (
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        aria-hidden="true"
      >
        <path d="M15.5 4 L8 14.5 H14.5 L12.5 24 L20 12.5 H14 Z" />
      </svg>
    );
  }

  // ASSURANCE: Shield with Checkmark
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M14 4 L22.5 7.5 V13.5 C22.5 19 14 23.5 14 23.5 C14 23.5 5.5 19 5.5 13.5 V7.5 Z" />
      <path d="M10 13 L12.5 15.5 L18 10" />
    </svg>
  );
}
