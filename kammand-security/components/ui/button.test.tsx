// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("renders the requested variant as an accessible button", () => {
    render(<Button variant="secondary">Secondary</Button>);

    const button = screen.getByRole("button", { name: "Secondary" });

    expect(button.getAttribute("type")).toBe("button");
    expect(button.classList.contains("ui-button")).toBe(true);
    expect(button.classList.contains("ui-button--secondary")).toBe(true);
  });
});
