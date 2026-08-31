"use client";

import { FormEvent, useState } from "react";
import { DirectionalArrow } from "../ui/directional-arrow";

export function FooterNewsletter() {
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = String(form.get("updates-email") || "").trim();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("Enter a valid email address.");
      return;
    }

    setMessage("Your email app will open to complete the request.");
    window.location.href = `mailto:hello@kammand.com?subject=${encodeURIComponent(
      "KAMMAND updates request",
    )}&body=${encodeURIComponent(`Please add ${email} to KAMMAND updates.`)}`;
  }

  return (
    <div className="site-footer__newsletter">
      <span className="site-footer__newsletter-icon">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="M3 5h18v14H3z" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      </span>
      <div className="site-footer__newsletter-copy">
        <strong>Stay informed</strong>
        <p>Subscribe to receive insight, updates, and guidance from KAMMAND.</p>
      </div>
      <form className="site-footer__newsletter-form" onSubmit={handleSubmit} noValidate>
        <label className="sr-only" htmlFor="footer-updates-email">
          Email address for KAMMAND updates
        </label>
        <input
          autoComplete="email"
          id="footer-updates-email"
          inputMode="email"
          name="updates-email"
          placeholder="Enter your email"
          required
          type="email"
        />
        <button aria-label="Request KAMMAND updates" type="submit">
          <DirectionalArrow />
        </button>
        <p aria-live="polite" className="site-footer__newsletter-status">
          {message}
        </p>
      </form>
    </div>
  );
}
