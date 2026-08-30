// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { consentStorageKey } from "../../lib/consent/categories";
import { CookieConsent } from "./cookie-consent";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("CookieConsent", () => {
  it("shows the initial consent banner and rejects optional categories", async () => {
    render(<CookieConsent />);

    expect(await screen.findByRole("button", { name: "Reject Optional" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Reject Optional" }));

    await waitFor(() => {
      expect(screen.queryByRole("button", { name: "Reject Optional" })).toBeNull();
    });
    expect(window.localStorage.getItem(consentStorageKey)).toContain('"analytics":false');
    expect(window.localStorage.getItem(consentStorageKey)).toContain('"marketing":false');
  });

  it("accepts active optional categories", async () => {
    render(<CookieConsent />);

    fireEvent.click(await screen.findByRole("button", { name: "Accept Optional" }));

    await waitFor(() => {
      expect(window.localStorage.getItem(consentStorageKey)).toContain('"functional":true');
    });
    expect(window.localStorage.getItem(consentStorageKey)).toContain('"analytics":true');
    expect(window.localStorage.getItem(consentStorageKey)).toContain('"marketing":false');
  });

  it("saves custom preferences", async () => {
    render(<CookieConsent />);

    fireEvent.click(await screen.findByRole("button", { name: "Preferences" }));
    fireEvent.click(screen.getByLabelText(/Functional scheduling content/i));
    fireEvent.click(screen.getByRole("button", { name: "Save Preferences" }));

    await waitFor(() => {
      expect(window.localStorage.getItem(consentStorageKey)).toContain('"functional":true');
    });
    expect(window.localStorage.getItem(consentStorageKey)).toContain('"analytics":false');
  });
});
