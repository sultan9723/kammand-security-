import Link from "next/link";
import { Container } from "../../ui/container";
import { GrcOrbit } from "./grc-orbit";

export function HomepageHero() {
  return (
    <section className="homepage-hero" aria-labelledby="homepage-hero-title">
      <Container>
        <p className="homepage-hero__bar">Where Precision Meets Protection</p>
        <div className="homepage-hero__grid">
          <div className="homepage-hero__content">
            <h1 className="homepage-hero__title" id="homepage-hero-title">
              Navigate regulation. Control risk. Stay audit-ready.
            </h1>
            <p className="homepage-hero__copy">
              Strategic GRC and cybersecurity advisory for regulated organizations
              across the GCC.
            </p>
            <div className="homepage-hero__actions" aria-label="Hero actions">
              <Link className="ui-button ui-button--primary" href="/book">
                Book a Consultation
              </Link>
              <Link className="ui-button ui-button--secondary" href="/services">
                Explore Services
              </Link>
            </div>
          </div>

          <div className="homepage-hero__visual">
            <GrcOrbit />
          </div>
        </div>
      </Container>
    </section>
  );
}
