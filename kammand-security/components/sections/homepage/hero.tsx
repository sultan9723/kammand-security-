import Link from "next/link";
import { Container } from "../../ui/container";
import { SectionLabel } from "../../ui/section-label";
import { GrcOrbit } from "./grc-orbit";

/**
 * Homepage hero.
 *
 * The headline names the regulators rather than the sector. Naming a sector
 * (fintech, payments) contradicted the six industry pages the site actually
 * ships; naming the frameworks is equally specific but works for every one of
 * them, because a bank CISO and a healthcare CIO each recognise their own
 * regulator in it. The credential and positioning lines below it are
 * factual statements, not trust decoration: the ISO 27001 Lead Auditor
 * credential is held, and the positioning line states who the practice is
 * built for rather than claiming customers. See SPEC-003 §2 and the
 * no-fabrication rules in AGENTS.md.
 */
export function HomepageHero() {
  return (
    <section className="homepage-hero" aria-labelledby="homepage-hero-title">
      <Container>
        <SectionLabel align="center" as="p" className="homepage-hero__bar">
          Where Precision Meets Protection
        </SectionLabel>
        <div className="homepage-hero__grid">
          <div className="homepage-hero__content">
            <h1 className="homepage-hero__title" id="homepage-hero-title">
              SAMA, NCA, PDPL and ISO 27001 assurance for regulated
              organizations across the GCC.
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
                Book a Consultation
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
