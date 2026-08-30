import Link from "next/link";
import { Container } from "../ui/container";
import { FooterNavigation } from "./footer-navigation";
import { FooterNewsletter } from "./footer-newsletter";

const footerGroups = [
  {
    label: "Services",
    links: [
      { label: "GRC Advisory", href: "/services/grc-advisory" },
      { label: "Virtual CISO", href: "/services/virtual-ciso" },
      { label: "Risk Management", href: "/services/risk-management" },
      { label: "Third-Party Risk", href: "/services/third-party-risk" },
      { label: "Audit Readiness", href: "/services/audit-readiness" },
      { label: "Security Assurance", href: "/services/security-assurance" },
    ],
  },
  {
    label: "Frameworks",
    links: [
      { label: "SAMA CSF", href: "/frameworks/sama-csf" },
      { label: "NCA ECC", href: "/frameworks/nca-ecc" },
      { label: "Saudi PDPL", href: "/frameworks/pdpl" },
      { label: "ISO 27001", href: "/frameworks/iso-27001" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/company" },
      { label: "Industries", href: "/industries" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
      { label: "Book a Consultation", href: "/book" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Terms", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Security", href: "/security" },
    ],
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container className="container-wide">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Link aria-label="KAMMAND home" className="site-footer__wordmark" href="/">
              KAMMAND
            </Link>
            <div className="site-footer__positioning">
              <p>GRC and cybersecurity advisory for regulated organizations.</p>
              <p>Navigate regulation. Control risk. Stay audit-ready.</p>
            </div>

            <address className="site-footer__contact">
              <a href="mailto:hello@kammand.com">
                <FooterIcon icon="mail" />
                hello@kammand.com
              </a>
              <a href="tel:+966501234567">
                <FooterIcon icon="phone" />
                +966 50 123 4567
              </a>
              <span>
                <FooterIcon icon="location" />
                Riyadh, Saudi Arabia
              </span>
            </address>
          </div>

          <FooterNavigation groups={footerGroups} />
        </div>

        <FooterNewsletter />

        <div className="site-footer__bottom">
          <p>&copy; {year} KAMMAND Security. All rights reserved.</p>
          <div className="site-footer__social" aria-label="KAMMAND contact links">
            <a aria-label="Email KAMMAND" href="mailto:hello@kammand.com">
              <FooterIcon icon="mail" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterIcon({ icon }: { icon: "mail" | "phone" | "location" }) {
  if (icon === "phone") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M7 3 4 6c0 7 7 14 14 14l3-3-5-4-2 2c-2-1-4-3-5-5l2-2-4-5Z" />
      </svg>
    );
  }

  if (icon === "location") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z" />
        <circle cx="12" cy="9" r="2" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M3 5h18v14H3z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
