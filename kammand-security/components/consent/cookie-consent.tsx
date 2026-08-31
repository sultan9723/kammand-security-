"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  configurableConsentCategories,
  consentCategories,
} from "../../lib/consent/categories";
import {
  createAcceptedOptionalConsent,
  createDefaultConsentPreferences,
  createRejectedOptionalConsent,
  normalizeConsentPreferences,
  type ConsentPreferences,
} from "../../lib/consent/consent-state";
import {
  openConsentPreferencesEventName,
  readStoredConsentPreferences,
  writeConsentPreferences,
} from "../../lib/consent/consent-storage";

type DraftPreferences = Pick<ConsentPreferences, "functional" | "analytics">;

export function CookieConsent() {
  const [preferences, setPreferences] = useState<ConsentPreferences | undefined>();
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [draft, setDraft] = useState<DraftPreferences>({
    functional: false,
    analytics: false,
  });
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastActiveElementRef = useRef<HTMLElement | null>(null);
  const preferencesLoadedRef = useRef(false);

  const applyStoredPreferences = useCallback(() => {
    const stored = readStoredConsentPreferences();
    preferencesLoadedRef.current = true;
    setPreferences(stored);
    setShowBanner(!stored);
    setDraft({
      functional: Boolean(stored?.functional),
      analytics: Boolean(stored?.analytics),
    });
  }, []);

  useEffect(() => {
    window.requestAnimationFrame(applyStoredPreferences);
  }, [applyStoredPreferences]);

  useEffect(() => {
    function handleOpenPreferences() {
      lastActiveElementRef.current = document.activeElement as HTMLElement | null;
      const stored = readStoredConsentPreferences();

      if (stored === undefined && !preferencesLoadedRef.current) {
        applyStoredPreferences();
      }

      setDraft({
        functional: Boolean(stored?.functional),
        analytics: Boolean(stored?.analytics),
      });
      setShowPreferences(true);
      setShowBanner(false);
    }

    window.addEventListener(openConsentPreferencesEventName, handleOpenPreferences);

    return () => {
      window.removeEventListener(openConsentPreferencesEventName, handleOpenPreferences);
    };
  }, [applyStoredPreferences]);

  const restoreFocus = useCallback(() => {
    window.requestAnimationFrame(() => {
      lastActiveElementRef.current?.focus();
    });
  }, []);

  const closePreferences = useCallback(() => {
    setShowPreferences(false);
    setShowBanner(!preferences);
    restoreFocus();
  }, [preferences, restoreFocus]);

  useEffect(() => {
    if (!showPreferences) {
      return;
    }

    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closePreferences();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePreferences, showPreferences]);

  function persist(nextPreferences: ConsentPreferences) {
    writeConsentPreferences(nextPreferences);
    setPreferences(nextPreferences);
    setShowBanner(false);
    setShowPreferences(false);
    restoreFocus();
  }

  function rejectOptional() {
    persist(createRejectedOptionalConsent());
  }

  function acceptOptional() {
    persist(createAcceptedOptionalConsent());
  }

  function saveCustomPreferences() {
    persist(
      normalizeConsentPreferences({
        ...createDefaultConsentPreferences(),
        functional: draft.functional,
        analytics: draft.analytics,
        marketing: false,
      }),
    );
  }

  function openPreferencesFromBanner() {
    lastActiveElementRef.current = document.activeElement as HTMLElement | null;
    setShowPreferences(true);
    setShowBanner(false);
  }

  return (
    <>
      {showBanner ? (
        <section
          aria-label="Cookie and privacy preferences"
          className="cookie-banner"
        >
          <div className="cookie-banner__content">
            <p className="cookie-banner__title">Privacy preferences</p>
            <p>
              KAMMAND uses strictly necessary first-party preference storage.
              Optional scheduling content and future analytics stay off unless you
              allow them.
            </p>
          </div>
          <div className="cookie-banner__actions">
            <button className="ui-button ui-button--secondary" onClick={rejectOptional} type="button">
              Reject Optional
            </button>
            <button className="ui-button ui-button--text" onClick={openPreferencesFromBanner} type="button">
              Preferences
            </button>
            <button className="ui-button ui-button--primary" onClick={acceptOptional} type="button">
              Accept Optional
            </button>
          </div>
        </section>
      ) : null}

      {showPreferences ? (
        <div className="consent-dialog" role="presentation">
          <div
            aria-labelledby="consent-dialog-title"
            aria-modal="true"
            className="consent-dialog__panel"
            ref={dialogRef}
            role="dialog"
            tabIndex={-1}
          >
            <div className="consent-dialog__header">
              <div>
                <p className="eyebrow">COOKIE PREFERENCES</p>
                <h2 id="consent-dialog-title">Manage optional site technologies.</h2>
              </div>
              <button
                aria-label="Close cookie preferences"
                className="consent-dialog__close"
                onClick={closePreferences}
                type="button"
              >
                Close
              </button>
            </div>

            <div className="consent-category">
              <div>
                <p className="consent-category__title">
                  {consentCategories.necessary.label}
                </p>
                <p>{consentCategories.necessary.description}</p>
              </div>
              <p className="mono-label">Always active</p>
            </div>

            {configurableConsentCategories.map((categoryId) => {
              const category = consentCategories[categoryId];

              return (
                <label className="consent-category consent-category--toggle" key={categoryId}>
                  <span>
                    <span className="consent-category__title">{category.label}</span>
                    <span>{category.description}</span>
                  </span>
                  <input
                    checked={draft[categoryId]}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        [categoryId]: event.target.checked,
                      }))
                    }
                    type="checkbox"
                  />
                </label>
              );
            })}

            <div className="consent-category">
              <div>
                <p className="consent-category__title">
                  {consentCategories.marketing.label}
                </p>
                <p>{consentCategories.marketing.description}</p>
              </div>
              <p className="mono-label">Not active</p>
            </div>

            <div className="consent-dialog__actions">
              <button className="ui-button ui-button--secondary" onClick={rejectOptional} type="button">
                Reject Optional
              </button>
              <button className="ui-button ui-button--primary" onClick={saveCustomPreferences} type="button">
                Save Preferences
              </button>
              <button className="ui-button ui-button--text" onClick={acceptOptional} type="button">
                Accept Optional
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
