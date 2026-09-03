import Link from "next/link";
import type { CSSProperties } from "react";
import { serviceSummaries } from "../../../lib/services";
import { Container } from "../../ui/container";
import { DirectionalArrow } from "../../ui/directional-arrow";
import { SectionHeading } from "../../ui/section-heading";

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
            <path d="M7 8.5h18" />
            <path d="M7 16h18" />
            <path d="M7 23.5h18" />
            <circle cx="11" cy="8.5" r="2.5" />
            <circle cx="21" cy="16" r="2.5" />
            <circle cx="15" cy="23.5" r="2.5" />
            <path d="m11.5 16 3.2 3.2 6.3-7" />
          </>
        )}
      </svg>
    </span>
  );
}

export function ServicesSection() {
  return (
    <section className="services-section" aria-labelledby="services-title">
      <Container>
        <div className="services-section__intro">
          <SectionHeading
            className="services-section__heading"
            description="From governance strategy to audit readiness, KAMMAND helps regulated organizations turn requirements into practical controls, evidence, and measurable action."
            eyebrow="CAPABILITIES"
            title="End-to-end GRC and cybersecurity advisory."
            titleId="services-title"
          />
        </div>

        <ul
          className="services-rail"
          aria-label="All KAMMAND service capabilities"
        >
          {serviceSummaries.map((service, index) => (
            <li key={service.href}>
              <Link
                className="service-cell"
                href={service.href}
                style={{ "--service-index": index } as CSSProperties}
              >
                <span className="service-cell__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="service-cell__content">
                  <div className="service-cell__head">
                    <span className="service-cell__icon-wrap">
                      <CapabilityIcon index={index} />
                    </span>
                    <span className="service-cell__action">
                      Explore service
                      <DirectionalArrow />
                    </span>
                  </div>
                  <div className="service-cell__meta">
                    <h3 className="service-cell__title">{service.title}</h3>
                    <p className="service-cell__description">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
