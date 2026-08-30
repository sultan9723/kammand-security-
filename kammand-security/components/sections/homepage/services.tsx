import Link from "next/link";
import type { CSSProperties } from "react";
import { riskManagementService, serviceSummaries } from "../../../lib/services";
import { Container } from "../../ui/container";
import { SectionHeading } from "../../ui/section-heading";

const servicePositions = [
  { x: "50%", y: "4%" },
  { x: "88%", y: "28%" },
  { x: "88%", y: "72%" },
  { x: "50%", y: "96%" },
  { x: "12%", y: "72%" },
  { x: "12%", y: "28%" },
] as const;

function CapabilityIcon({
  index,
  active = false,
}: {
  index: number;
  active?: boolean;
}) {
  const classes = ["service-icon", active ? "service-icon--active" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} aria-hidden="true">
      <svg viewBox="0 0 32 32" focusable="false">
        {index === 0 || index === 3 ? (
          <>
            <circle cx="11" cy="11" r="3.5" />
            <circle cx="21" cy="11" r="3.5" />
            <path d="M6.5 25c.8-4.2 3.2-6.4 7-6.4h5c3.8 0 6.2 2.2 7 6.4" />
            <path d="M16 18.6v6" />
          </>
        ) : index === 1 ? (
          <>
            <circle cx="16" cy="10.5" r="4" />
            <path d="M9 25c.7-5.2 3-7.7 7-7.7s6.3 2.5 7 7.7" />
            <path d="M22.5 20.5l3 3 4.5-5" />
          </>
        ) : index === 2 ? (
          <>
            <path d="M16 5.5 28 26.5H4L16 5.5Z" />
            <path d="M16 13v6.5" />
            <path d="M16 23.5h.01" />
          </>
        ) : index === 4 ? (
          <>
            <path d="M9 4.5h10l5 5v18H9z" />
            <path d="M19 4.5v5h5" />
            <path d="M12.5 16h7" />
            <path d="M12.5 20h5" />
            <circle cx="23.5" cy="23" r="3" />
          </>
        ) : (
          <>
            <path d="M16 4.5 26 8v7.8c0 6.5-4 10.2-10 12-6-1.8-10-5.5-10-12V8z" />
            <path d="m11.5 16 3.2 3.2 6.3-7" />
          </>
        )}
      </svg>
    </span>
  );
}

export function ServicesSection() {
  const activeServiceIndex = 2;

  return (
    <section className="services-section" aria-labelledby="services-title">
      <Container>
        <div className="services-section__workspace">
          <div className="services-section__intro">
            <SectionHeading
              className="services-section__heading"
              description="From governance strategy to audit readiness, KAMMAND helps regulated organizations turn requirements into practical controls, evidence, and measurable action."
              eyebrow="CAPABILITIES"
              title="GRC and cybersecurity, built around your risk."
              titleId="services-title"
            />
          </div>

          <div
            className="services-control"
            role="img"
            aria-label="KAMMAND services connected through one control system"
          >
            <svg
              className="services-control__map"
              viewBox="0 0 560 560"
              aria-hidden="true"
              focusable="false"
            >
              <circle className="services-control__ring" cx="280" cy="280" r="170" />
              <circle className="services-control__ring" cx="280" cy="280" r="132" />
              <circle className="services-control__ring" cx="280" cy="280" r="96" />
              <path className="services-control__axis" d="M280 86v388" />
              <path className="services-control__axis" d="M86 280h388" />
              <path className="services-control__axis" d="M143 143l274 274" />
              <path className="services-control__axis" d="M417 143 143 417" />
              <path className="services-control__active-path" d="M280 280 407 407" />
              <circle className="services-control__marker" cx="280" cy="86" r="4" />
              <circle className="services-control__marker" cx="445" cy="182" r="4" />
              <circle className="services-control__marker" cx="407" cy="407" r="4" />
              <circle className="services-control__marker" cx="280" cy="474" r="4" />
              <circle className="services-control__marker" cx="153" cy="407" r="4" />
              <circle className="services-control__marker" cx="115" cy="182" r="4" />
            </svg>
            <div className="services-control__core">
              <span>KAMMAND</span>
              <span>Control System</span>
            </div>

            {serviceSummaries.map((service, index) => (
              <Link
                className={`services-control__point${
                  index === activeServiceIndex ? " services-control__point--active" : ""
                }`}
                href={service.href}
                key={service.href}
                style={
                  {
                    "--point-x": servicePositions[index].x,
                    "--point-y": servicePositions[index].y,
                    "--service-index": index,
                  } as CSSProperties
                }
              >
                <CapabilityIcon index={index} active={index === activeServiceIndex} />
                <span className="services-control__point-label">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {service.title}
                </span>
              </Link>
            ))}
          </div>

          <aside className="services-detail" aria-labelledby="services-detail-title">
            <div className="services-detail__kicker">
              <span>03 / Risk</span>
              <span aria-hidden="true">-&gt;</span>
            </div>
            <div className="services-detail__header">
              <CapabilityIcon index={activeServiceIndex} active />
              <div>
                <p className="services-detail__title" id="services-detail-title">
                  Risk Management
                </p>
                <p className="services-detail__summary">
                  Identify. Assess. Prioritize. Treat.
                </p>
              </div>
            </div>
            <p className="services-detail__copy">
              {riskManagementService.valueProposition}
            </p>
            <div className="services-detail__divider" aria-hidden="true" />
            <div className="services-detail__activities">
              <p>Key activities</p>
              <ul>
                {riskManagementService.activities.slice(0, 4).map((activity) => (
                  <li key={activity}>{activity}</li>
                ))}
              </ul>
            </div>
            <Link
              className="ui-button ui-button--primary services-detail__cta"
              href={riskManagementService.href}
            >
              Explore Risk Management
              <span aria-hidden="true">-&gt;</span>
            </Link>
          </aside>
        </div>

        <div
          className="services-rail"
          aria-label="All KAMMAND service capabilities"
        >
          {serviceSummaries.map((service, index) => (
            <Link
              className="service-cell"
              href={service.href}
              key={service.href}
              style={{ "--service-index": index } as CSSProperties}
            >
              <span className="service-cell__icon-wrap">
                <CapabilityIcon index={index} />
              </span>
              <div className="service-cell__meta">
                <span className="service-cell__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="service-cell__title">{service.title}</h3>
              </div>
              <span className="service-cell__description">
                {service.description}
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
