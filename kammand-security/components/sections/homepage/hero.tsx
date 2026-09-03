import Link from "next/link";
import { Container } from "../../ui/container";
import { GrcOrbit } from "./grc-orbit";

/**
 * Homepage hero.
 *
 * The headline names the niche outright — SAMA, fintech, payments — rather
 * than describing the category, so a visitor knows within a line whether the
 * practice is for them. The credential and positioning lines below it are
 * factual statements, not trust decoration: the ISO 27001 Lead Auditor
 * credential is held, and the positioning line states who the practice is
 * built for rather than claiming customers. See SPEC-003 §2 and the
 * no-fabrication rules in AGENTS.md.
 */
export function HomepageHero() {
  return (
    <section className="homepage-hero" aria-labelledby="homepage-hero-title">
      <Container>
        <p className="homepage-hero__bar">Where Precision Meets Protection</p>
        <div className="homepage-hero__grid">
          <div className="homepage-hero__content">
            <h1 className="homepage-hero__title" id="homepage-hero-title">
              SAMA compliance and cybersecurity assurance for GCC fintechs and
              payment companies.
            </h1>
            <p className="homepage-hero__copy">
              Controls, evidence, and assurance that hold up under regulatory
              scrutiny.
            </p>
            <p className="eyebrow homepage-hero__credential">
              Led by an ISO 27001 Lead Auditor · SAMA CSF &amp; CRFR specialist
              advisory
            </p>
            <div className="homepage-hero__actions" aria-label="Hero actions">
              <Link className="ui-button ui-button--primary" href="/book">
                Book a SAMA Readiness Consultation
              </Link>
              <Link className="ui-button ui-button--secondary" href="/services">
                Explore Services
              </Link>
            </div>
            <p className="homepage-hero__trust">
              Built for organizations under SAMA, NCA, and PDPL supervision.
            </p>
          </div>

          <div className="homepage-hero__visual">
            <GrcOrbit />
          </div>
        </div>
      </Container>
    </section>
  );
}
