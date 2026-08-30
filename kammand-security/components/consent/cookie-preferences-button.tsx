"use client";

import { openConsentPreferences } from "../../lib/consent/consent-storage";

export function CookiePreferencesButton() {
  return (
    <button
      className="site-footer__preferences-button"
      onClick={openConsentPreferences}
      type="button"
    >
      Cookie Preferences
    </button>
  );
}
