import Link from "next/link";
import { Container } from "../components/ui/container";

export default function NotFound() {
  return (
    <main className="not-found" id="main-content">
      <Container>
        <div className="not-found__content">
          <p className="eyebrow">404</p>
          <h1>Page not found.</h1>
          <p className="text-body-large">
            The requested page is not available. Return to KAMMAND Security or
            continue to the consultation page.
          </p>
          <div className="not-found__actions">
            <Link className="ui-button ui-button--primary" href="/">
              Return Home
            </Link>
            <Link className="ui-button ui-button--secondary" href="/book">
              Book a Consultation
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
