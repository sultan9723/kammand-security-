import Link from "next/link";
import type { CSSProperties } from "react";
import {
  capabilities,
  frameworks,
  type CapabilityIconName,
  type FrameworkIconName,
} from "./framework-data";

export function FrameworkControlModel() {
  return (
    <div
      className="framework-control"
      aria-label="KAMMAND framework intelligence control model"
    >
      <div className="framework-control__stage">
        <ul className="framework-control__nodes" aria-label="Framework pages">
          {frameworks.map((framework, index) => (
            <li
              className={`framework-control__node framework-control__node--${framework.key}`}
              key={framework.key}
              style={{ "--framework-index": index } as CSSProperties}
            >
              <Link
                aria-label={`${framework.label}: ${framework.descriptor}`}
                className="framework-control__link"
                href={framework.href}
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
              </Link>
            </li>
          ))}
        </ul>

        <div className="framework-control__circuit-upper" aria-hidden="true">
          <svg
            className="framework-control__circuit-svg"
            viewBox="0 0 1200 90"
            preserveAspectRatio="none"
          >
            <g className="framework-control__connectors">
              <circle className="framework-control__anchor-dot" cx="150" cy="6" r="3.5" />
              <path
                className="framework-control__connector"
                d="M 150 6 V 40 Q 150 52 165 52 H 535 Q 550 52 550 64 V 90"
                style={{ "--framework-index": 0 } as CSSProperties}
              />

              <circle className="framework-control__anchor-dot" cx="450" cy="6" r="3.5" />
              <path
                className="framework-control__connector"
                d="M 450 6 V 30 Q 450 42 465 42 H 565 Q 575 42 575 52 V 90"
                style={{ "--framework-index": 1 } as CSSProperties}
              />

              <circle className="framework-control__anchor-dot" cx="750" cy="6" r="3.5" />
              <path
                className="framework-control__connector"
                d="M 750 6 V 30 Q 750 42 735 42 H 635 Q 625 42 625 52 V 90"
                style={{ "--framework-index": 2 } as CSSProperties}
              />

              <circle className="framework-control__anchor-dot" cx="1050" cy="6" r="3.5" />
              <path
                className="framework-control__connector"
                d="M 1050 6 V 40 Q 1050 52 1035 52 H 665 Q 650 52 650 64 V 90"
                style={{ "--framework-index": 3 } as CSSProperties}
              />
            </g>
          </svg>
        </div>

        <div className="framework-control__center-wrapper">
          <div className="framework-control__radar-rings" aria-hidden="true">
            <svg
              className="framework-control__radar-svg"
              viewBox="0 0 500 500"
              preserveAspectRatio="xMidYMid meet"
            >
              {[50, 80, 110, 140, 170, 200, 230].map((radius, index) => (
                <circle
                  className="framework-control__ring"
                  cx="250"
                  cy="250"
                  key={radius}
                  r={radius}
                  style={{ "--ring-index": index } as CSSProperties}
                />
              ))}
            </svg>
          </div>

          <div className="framework-control__core">
            <div className="framework-control__core-content">
              <span className="framework-control__core-mark" aria-hidden="true">
                <KammandLogoMark />
              </span>
              <div className="framework-control__core-text">
                <span className="framework-control__brand-title">KAMMAND</span>
                <span className="framework-control__brand-subtitle">CONTROL MODEL</span>
              </div>
            </div>
          </div>
        </div>

        <div className="framework-control__circuit-lower" aria-hidden="true">
          <svg
            className="framework-control__circuit-svg"
            viewBox="0 0 1200 90"
            preserveAspectRatio="none"
          >
            <g className="framework-control__capability-lines">
              <path className="framework-control__lower-spine" d="M 600 0 V 22" />
              <circle className="framework-control__anchor-dot" cx="600" cy="22" r="3.5" />
              <path className="framework-control__lower-spine" d="M 600 22 V 44" />
              <circle className="framework-control__anchor-dot" cx="600" cy="44" r="3.5" />
              <path className="framework-control__lower-spine" d="M 100 44 H 1100" />

              {[100, 300, 500, 700, 900, 1100].map((x, index) => (
                <g key={x}>
                  <circle
                    className="framework-control__anchor-dot"
                    cx={x}
                    cy="44"
                    r="3.5"
                    style={{ "--capability-index": index } as CSSProperties}
                  />
                  <path
                    className="framework-control__capability-branch"
                    d={`M ${x} 44 V 84`}
                    style={{ "--capability-index": index } as CSSProperties}
                  />
                  <circle
                    className="framework-control__anchor-dot"
                    cx={x}
                    cy="84"
                    r="3.5"
                    style={{ "--capability-index": index } as CSSProperties}
                  />
                </g>
              ))}
            </g>
          </svg>
        </div>

        <ul className="framework-control__capabilities" aria-label="Capability domains">
          {capabilities.map((capability, index) => (
            <li
              className="framework-control__capability"
              key={capability.label}
              style={{ "--capability-index": index } as CSSProperties}
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
            </li>
          ))}
        </ul>
      </div>
    </div>
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
