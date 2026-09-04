import Link from "next/link";
import { serviceSummaries } from "../../../lib/services";
import { Container } from "../../ui/container";
import { SectionHeading } from "../../ui/section-heading";

export function ServicesSection() {
  return (
    <section
      className="services-section"
      id="homepage-capabilities"
      aria-labelledby="services-title"
    >
      <Container>
        <div className="services-section__intro">
          <SectionHeading
            className="services-section__heading"
            description="From governance strategy to audit readiness, KAMMAND helps regulated organizations turn requirements into practical controls, evidence, and measurable action."
            eyebrow="Capabilities"
            title="GRC and cybersecurity, built around your risk."
            titleId="services-title"
          />
        </div>

        <ul
          className="services-rail"
          aria-label="All KAMMAND service capabilities"
        >
          {serviceSummaries.map((service) => (
            <li key={service.href}>
              <Link className="service-cell" href={service.href}>
                <div className="service-cell__content">
                  <div className="service-cell__meta">
                    <h3 className="service-cell__title">{service.title}</h3>
                    <p className="service-cell__description">
                      {service.description}
                    </p>
                  </div>
                  <span className="service-cell__action ui-button ui-button--secondary">
                    Explore service
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
