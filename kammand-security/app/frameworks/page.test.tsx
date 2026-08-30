// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import FrameworksPage, { metadata } from "./page";

afterEach(() => {
  cleanup();
});

describe("FrameworksPage", () => {
  it("renders the frameworks overview with one H1 and all framework links", () => {
    render(<FrameworksPage />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Navigate complex frameworks with greater clarity.",
      }),
    ).toBeTruthy();

    [
      ["/frameworks/sama-csf", "SAMA CSF"],
      ["/frameworks/nca-ecc", "NCA ECC"],
      ["/frameworks/pdpl", "Saudi PDPL"],
      ["/frameworks/iso-27001", "ISO 27001"],
    ].forEach(([href, label]) => {
      expect(
        screen
          .getAllByRole("link", { name: new RegExp(label) })
          .some((link) => link.getAttribute("href") === href),
      ).toBe(true);
    });
  });

  it("qualifies framework relationship content without equivalence claims", () => {
    render(<FrameworksPage />);

    expect(
      screen.getByText(/Shared capability areas do not mean formal equivalence/i),
    ).toBeTruthy();
    expect(screen.getByText(/not official domain names/i)).toBeTruthy();
    expect(screen.queryByText(/Equivalent controls/i)).toBeNull();
  });

  it("defines unique metadata for the overview", () => {
    expect(metadata.title).toBe("Frameworks");
    expect(metadata.description).toContain("Framework advisory context");
  });
});
