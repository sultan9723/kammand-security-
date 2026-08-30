// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import CookiesRoute, { metadata } from "./page";

afterEach(() => {
  cleanup();
});

describe("CookiesRoute", () => {
  it("renders one H1, consent categories and the storage registry", () => {
    render(<CookiesRoute />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: "Cookie Policy" })).toBeTruthy();
    expect(screen.getByText("kammand_consent_preferences")).toBeTruthy();
    expect(screen.getByText("Calendly")).toBeTruthy();
    expect(screen.getByText(/No analytics provider is currently implemented/i)).toBeTruthy();
  });

  it("defines unique metadata", () => {
    expect(metadata.title).toBe("Cookie Policy");
    expect(metadata.description).toContain("Cookie and storage information");
  });
});
