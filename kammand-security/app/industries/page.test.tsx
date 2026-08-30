// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import IndustriesPage, { metadata } from "./page";

afterEach(() => {
  cleanup();
});

describe("IndustriesPage", () => {
  it("renders the industries overview with one H1 and all industry links", () => {
    render(<IndustriesPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "GRC and cybersecurity for high-accountability environments.",
      }),
    ).toBeTruthy();

    [
      ["/industries/financial-services", "Financial Services"],
      ["/industries/fintech-payments", "Fintech & Payments"],
      ["/industries/insurance", "Insurance"],
      ["/industries/technology", "Technology"],
      ["/industries/healthcare", "Healthcare"],
      ["/industries/regulated-enterprises", "Critical & Regulated Enterprises"],
    ].forEach(([href, label]) => {
      expect(
        screen
          .getAllByRole("link", { name: new RegExp(label) })
          .some((link) => link.getAttribute("href") === href),
      ).toBe(true);
    });
  });

  it("renders framework context, engagement flow, and consultation actions", () => {
    render(<IndustriesPage />);

    [
      "/frameworks/sama-csf",
      "/frameworks/nca-ecc",
      "/frameworks/pdpl",
      "/frameworks/iso-27001",
    ].forEach((href) => {
      expect(screen.getAllByRole("link").some((link) => link.getAttribute("href") === href)).toBe(
        true,
      );
    });

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Industry does not automatically define applicability.",
      }),
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: /View framework mapping/ }).getAttribute("href"))
      .toBe("/frameworks");
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Structured advisory from discovery to assurance.",
      }),
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: /Book a Consultation/ }).getAttribute("href"))
      .toBe("/book");
  });

  it("defines unique overview metadata", () => {
    expect(metadata.title).toBe("Industries");
    expect(metadata.description).toContain("Industry context");
  });
});
