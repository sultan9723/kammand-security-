// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import TermsRoute, { metadata } from "./page";

afterEach(() => {
  cleanup();
});

describe("TermsRoute", () => {
  it("renders one H1 and restrained terms without invented jurisdiction", () => {
    render(<TermsRoute />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: "Terms of Use" })).toBeTruthy();
    expect(screen.getByText(/No guaranteed outcomes/i)).toBeTruthy();
    expect(screen.getByText(/Governing law, court jurisdiction/i)).toBeTruthy();
  });

  it("defines unique metadata", () => {
    expect(metadata.title).toBe("Terms of Use");
    expect(metadata.description).toContain("Website terms");
  });
});
