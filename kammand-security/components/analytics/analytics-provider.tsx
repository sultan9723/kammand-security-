"use client";

import { useEffect, useRef, useState } from "react";
import { hasStoredConsent } from "../../lib/consent/consent-storage";
import { consentChangeEventName } from "../../lib/consent/consent-storage";
import { analyticsEventTargetName, parseAnalyticsEvent } from "../../lib/analytics";
import { createAnalyticsProvider, type AnalyticsProvider as AnalyticsProviderType } from "../../lib/analytics/provider";

export function AnalyticsProvider() {
  const providerRef = useRef<AnalyticsProviderType | null>(null);

  if (providerRef.current === null) {
    providerRef.current = createAnalyticsProvider();
  }

  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      setAnalyticsAllowed(hasStoredConsent("analytics"));
    });

    function handleConsentChange() {
      setAnalyticsAllowed(hasStoredConsent("analytics"));
    }

    window.addEventListener(consentChangeEventName, handleConsentChange);

    return () => {
      window.removeEventListener(consentChangeEventName, handleConsentChange);
    };
  }, []);

  useEffect(() => {
    const provider = providerRef.current;

    if (!analyticsAllowed || !provider?.enabled) {
      provider?.shutdown();
      return;
    }

    const activeProvider = provider;

    function handleAnalyticsEvent(event: Event) {
      const parsed = parseAnalyticsEvent(event);

      if (parsed) {
        activeProvider.track(parsed);
      }
    }

    window.addEventListener(analyticsEventTargetName, handleAnalyticsEvent);

    return () => {
      window.removeEventListener(analyticsEventTargetName, handleAnalyticsEvent);
    };
  }, [analyticsAllowed]);

  return null;
}
