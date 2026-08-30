// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import AccessibilityRoute, { metadata } from "./page";

afterEach(() => {
  cleanup();
});

describe("AccessibilityRoute", () => {
  it("renders one H1 and avoids certification claims", () => {
    render(<AccessibilityRoute />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "Accessibility Statement" }),
    ).toBeTruthy();
    expect(screen.getByText(/aims to align the website with WCAG 2.2 Level AA/i)).toBeTruthy();
    expect(screen.queryByText(/Certified WCAG/i)).toBeNull();
  });

  it("defines unique metadata", () => {
    expect(metadata.title).toBe("Accessibility Statement");
    expect(metadata.description).toContain("accessibility statement");
  });
});
