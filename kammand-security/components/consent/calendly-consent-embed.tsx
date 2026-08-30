"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { trackAnalyticsEvent } from "../../lib/analytics";
import {
  createDefaultConsentPreferences,
  normalizeConsentPreferences,
} from "../../lib/consent/consent-state";
import {
  consentChangeEventName,
  readStoredConsentPreferences,
  writeConsentPreferences,
} from "../../lib/consent/consent-storage";

type CalendlyConsentEmbedProps = {
  calendlyUrl: string;
};

export function CalendlyConsentEmbed({ calendlyUrl }: CalendlyConsentEmbedProps) {
  const [functionalEnabled, setFunctionalEnabled] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      const stored = readStoredConsentPreferences();
      setFunctionalEnabled(Boolean(stored?.functional));
      setIsReady(true);
    });

    function handleConsentChange(event: Event) {
      const customEvent = event as CustomEvent<{ functional?: boolean }>;
      setFunctionalEnabled(Boolean(customEvent.detail?.functional));
    }

    window.addEventListener(consentChangeEventName, handleConsentChange);

    return () => {
      window.removeEventListener(consentChangeEventName, handleConsentChange);
    };
  }, []);

  function enableSchedulingContent() {
    const current = readStoredConsentPreferences() ?? createDefaultConsentPreferences();
    const next = normalizeConsentPreferences({
      ...current,
      functional: true,
    });
    writeConsentPreferences(next);
    setFunctionalEnabled(true);
    trackAnalyticsEvent("booking_started");
  }

  if (!isReady || !functionalEnabled) {
    return (
      <div className="booking-panel booking-panel--fallback" role="region" aria-label="Scheduling content consent">
        <p className="eyebrow">SCHEDULING CONTENT</p>
        <p className="text-body-large">
          Calendly is a third-party scheduling service. Enable functional
          scheduling content to load the booking iframe, or use the contact form
          instead.
        </p>
        <div className="form-actions">
          <button className="ui-button ui-button--primary" onClick={enableSchedulingContent} type="button">
            Enable scheduling content
          </button>
          <Link className="ui-button ui-button--secondary" href="/contact">
            Use the contact form
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="booking-panel"
      aria-label="Calendly consultation scheduling"
      role="region"
    >
      <iframe
        className="booking-panel__iframe"
        src={calendlyUrl}
        title="Schedule a KAMMAND consultation"
      />
    </div>
  );
}
