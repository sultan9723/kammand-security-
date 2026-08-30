// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import PrivacyRoute, { metadata } from "./page";

afterEach(() => {
  cleanup();
});

describe("PrivacyRoute", () => {
  it("renders one H1, breadcrumbs and actual contact-form data fields", () => {
    render(<PrivacyRoute />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: "Privacy Notice" })).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
    expect(screen.getByText(/full name, work email, company or organization/i)).toBeTruthy();
    expect(screen.getByText(/does not subscribe the visitor to marketing/i)).toBeTruthy();
  });

  it("defines unique metadata", () => {
    expect(metadata.title).toBe("Privacy Notice");
    expect(metadata.description).toContain("Privacy information");
  });
});
