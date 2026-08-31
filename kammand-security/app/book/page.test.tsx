// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { consentStorageKey } from "../../lib/consent/categories";
import BookRoute, { metadata } from "./page";

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  vi.unstubAllEnvs();
});

describe("BookRoute", () => {
  it("renders one H1 and a controlled fallback when Calendly is missing", () => {
    render(<BookRoute />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: "Let's turn your priorities into clear next steps." })).toBeTruthy();
    expect(screen.getByText("SCHEDULING NOT CONFIGURED")).toBeTruthy();
    expect(screen.getByRole("link", { name: "Contact KAMMAND" }).getAttribute("href")).toBe(
      "/contact",
    );
  });

  it("gates the Calendly iframe behind functional scheduling consent", async () => {
    vi.stubEnv("NEXT_PUBLIC_CALENDLY_URL", "https://calendly.com/kammand/consultation");

    render(<BookRoute />);

    expect(screen.queryByTitle("Schedule a KAMMAND consultation")).toBeNull();
    expect(await screen.findByRole("button", { name: "Enable scheduling content" })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Enable scheduling content" }));

    await waitFor(() => {
      const iframe = screen.getByTitle("Schedule a KAMMAND consultation");
      expect(iframe.getAttribute("src")).toBe("https://calendly.com/kammand/consultation");
    });
    expect(window.localStorage.getItem(consentStorageKey)).toContain('"functional":true');
  });

  it("does not render non-Calendly URLs as booking embeds", () => {
    vi.stubEnv("NEXT_PUBLIC_CALENDLY_URL", "https://example.com/schedule");

    render(<BookRoute />);

    expect(screen.queryByTitle("Schedule a KAMMAND consultation")).toBeNull();
    expect(screen.getByText("SCHEDULING NOT CONFIGURED")).toBeTruthy();
  });

  it("defines unique metadata", () => {
    expect(metadata.title).toBe("Book a Consultation");
    expect(metadata.description).toContain("Book a consultation");
  });
});
