// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ContactRoute, { metadata } from "./page";

afterEach(() => {
  cleanup();
});

describe("ContactRoute", () => {
  it("renders one H1, breadcrumbs and the required form fields", () => {
    render(<ContactRoute />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Let's talk about what your organization needs.",
      }),
    ).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();

    ["Full name", "Work email", "Company / Organization", "How can we help?"].forEach(
      (label) => {
        expect(screen.getByLabelText(new RegExp(label))).toBeTruthy();
      },
    );
  });

  it("includes privacy, booking and security links", () => {
    render(<ContactRoute />);

    ["/privacy", "/book", "/security"].forEach((href) => {
      expect(screen.getAllByRole("link").some((link) => link.getAttribute("href") === href)).toBe(
        true,
      );
    });
    expect(screen.getByText(/Do not include passwords, credentials/i)).toBeTruthy();
  });

  it("defines unique metadata", () => {
    expect(metadata.title).toBe("Contact");
    expect(metadata.description).toContain("written inquiry");
  });
});
