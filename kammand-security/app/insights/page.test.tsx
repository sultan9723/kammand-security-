// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import InsightsPage, { metadata } from "./page";

afterEach(() => {
  cleanup();
});

describe("InsightsPage", () => {
  it("renders the insights index with one H1 and planned editorial topics", () => {
    render(<InsightsPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Insights for a changing risk landscape.",
      }),
    ).toBeTruthy();
    expect(screen.getByText("Planned editorial topics in progress.")).toBeTruthy();
    expect(
      screen.getByText(/These topics are being prepared/i),
    ).toBeTruthy();
  });

  it("exposes the planned insight topics without Article schema", () => {
    render(<InsightsPage />);

    expect(
      screen.queryByText("Understanding overlapping cybersecurity frameworks"),
    ).toBeTruthy();
    expect(screen.queryByText("Building evidence before the audit begins")).toBeTruthy();
    expect(
      screen.queryByText("Why third-party risk needs continuous oversight"),
    ).toBeTruthy();
    expect(document.querySelectorAll(".insights-index-entry__arrow")).toHaveLength(0);
    expect(document.querySelector('script[type="application/ld+json"]')).toBeNull();
  });

  it("defines unique index metadata", () => {
    expect(metadata.title).toBe("Insights");
    expect(metadata.description).toBe(
      "Practical perspectives on governance, cybersecurity, regulation, risk, compliance, and assurance.",
    );
  });
});
