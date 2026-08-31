// @vitest-environment jsdom

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { SiteHeader } from "./site-header";

afterEach(() => {
  cleanup();
});

describe("SiteHeader", () => {
  it("renders crawlable desktop navigation links and the consultation CTA", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "KAMMAND home" }).getAttribute("href")).toBe("/");
    expect(
      screen.getByRole("button", { name: /Services/ }).getAttribute("aria-expanded"),
    ).toBe("false");
    expect(
      screen.getByRole("button", { name: /Frameworks/ }).getAttribute("aria-expanded"),
    ).toBe("false");
    expect(
      screen.getByRole("button", { name: /Industries/ }).getAttribute("aria-expanded"),
    ).toBe("false");
    expect(screen.getByRole("link", { name: "Insights" }).getAttribute("href")).toBe(
      "/insights",
    );
    expect(screen.getByRole("link", { name: "Company" }).getAttribute("href")).toBe(
      "/company",
    );
    expect(
      screen.getByRole("link", { name: "Book a Consultation" }).getAttribute("href"),
    ).toBe("/book");
  });

  it("opens desktop dropdowns with crawlable planned routes", () => {
    render(<SiteHeader />);

    const servicesTrigger = screen.getByRole("button", { name: /Services/ });
    fireEvent.click(servicesTrigger);

    expect(servicesTrigger.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("link", { name: "GRC Advisory" }).getAttribute("href")).toBe(
      "/services/grc-advisory",
    );
    expect(
      screen.getByRole("link", { name: "View All Services" }).getAttribute("href"),
    ).toBe("/services");

    const frameworksTrigger = screen.getByRole("button", { name: /Frameworks/ });
    fireEvent.click(frameworksTrigger);

    expect(servicesTrigger.getAttribute("aria-expanded")).toBe("false");
    expect(frameworksTrigger.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("link", { name: "SAMA CSF" }).getAttribute("href")).toBe(
      "/frameworks/sama-csf",
    );
    expect(
      screen.getByRole("link", { name: "View All Frameworks" }).getAttribute("href"),
    ).toBe("/frameworks");

    const industriesTrigger = screen.getByRole("button", { name: /Industries/ });
    fireEvent.click(industriesTrigger);

    expect(frameworksTrigger.getAttribute("aria-expanded")).toBe("false");
    expect(industriesTrigger.getAttribute("aria-expanded")).toBe("true");
    expect(
      screen.getByRole("link", { name: "Financial Services" }).getAttribute("href"),
    ).toBe("/industries/financial-services");
    expect(
      screen.getByRole("link", { name: "View All Industries" }).getAttribute("href"),
    ).toBe("/industries");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(industriesTrigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("toggles a desktop dropdown by clicking its trigger", () => {
    render(<SiteHeader />);

    const servicesTrigger = screen.getByRole("button", { name: /Services/ });

    fireEvent.click(servicesTrigger);
    expect(servicesTrigger.getAttribute("aria-expanded")).toBe("true");

    fireEvent.click(servicesTrigger);
    expect(servicesTrigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("closes an open desktop dropdown after outside click", () => {
    render(<SiteHeader />);

    const servicesTrigger = screen.getByRole("button", { name: /Services/ });
    fireEvent.click(servicesTrigger);

    expect(servicesTrigger.getAttribute("aria-expanded")).toBe("true");

    fireEvent.pointerDown(document.body);

    expect(servicesTrigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("renders mobile navigation groups with nested destinations", () => {
    render(<SiteHeader />);

    fireEvent.click(screen.getByRole("button", { name: "Open primary navigation" }));

    expect(
      screen.getAllByRole("button", { name: /Services/ }).every(
        (button) => button.getAttribute("aria-expanded") === "false",
      ),
    ).toBe(true);

    fireEvent.click(screen.getAllByRole("button", { name: /Services/ })[1]);

    expect(
      screen.getAllByRole("button", { name: /Services/ }).some(
        (button) => button.getAttribute("aria-expanded") === "true",
      ),
    ).toBe(true);
    expect(
      screen.getAllByRole("link", { name: "View All Services" }).some(
        (link) => link.getAttribute("href") === "/services",
      ),
    ).toBe(true);

    fireEvent.click(screen.getAllByRole("button", { name: /Frameworks/ })[1]);

    expect(
      screen.getAllByRole("link", { name: "View All Frameworks" }).some(
        (link) => link.getAttribute("href") === "/frameworks",
      ),
    ).toBe(true);

    fireEvent.click(screen.getAllByRole("button", { name: /Industries/ })[1]);

    expect(
      screen.getAllByRole("link", { name: "View All Industries" }).some(
        (link) => link.getAttribute("href") === "/industries",
      ),
    ).toBe(true);
    expect(
      screen.getAllByRole("link", { name: "Regulated Enterprises" }).some(
        (link) => link.getAttribute("href") === "/industries/regulated-enterprises",
      ),
    ).toBe(true);
  });

  it("renders the glass navbar and AWS-style light dropdown styling hooks", () => {
    const css = readFileSync(join(process.cwd(), "app", "globals.css"), "utf8");

    expect(css).toContain("backdrop-filter: blur(14px)");
    expect(css).toContain(".site-header__dropdown");
    expect(css).toContain("background: var(--color-surface)");
    expect(css).toContain("background: var(--color-bg-subtle)");
    expect(css).toContain(".site-header__nav-trigger[aria-expanded=\"true\"]");
  });

  it("keeps the consultation CTA crawlable", () => {
    render(<SiteHeader />);

    expect(
      screen.getByRole("link", { name: "Book a Consultation" }).getAttribute("href"),
    ).toBe("/book");
  });

  it("keeps direct desktop navigation crawlable", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "Insights" }).getAttribute("href")).toBe(
      "/insights",
    );
    expect(screen.getByRole("link", { name: "Company" }).getAttribute("href")).toBe(
      "/company",
    );
  });

  it("opens and closes the mobile menu with correct expanded state", async () => {
    render(<SiteHeader />);

    const trigger = screen.getByRole("button", {
      name: "Open primary navigation",
    });

    expect(trigger.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(trigger);

    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(screen.getByRole("dialog").getAttribute("id")).toBe(
      "mobile-navigation-panel",
    );
    expect(
      screen.getByRole("navigation", { name: "Mobile primary navigation" }),
    ).toBeTruthy();

    fireEvent.click(
      screen.getByRole("button", { name: "Close primary navigation" }),
    );

    await waitFor(() => {
      expect(trigger.getAttribute("aria-expanded")).toBe("false");
    });
  });

  it("closes the mobile menu with Escape and after selecting a destination", async () => {
    render(<SiteHeader />);

    const trigger = screen.getByRole("button", {
      name: "Open primary navigation",
    });

    fireEvent.click(trigger);
    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() => {
      expect(trigger.getAttribute("aria-expanded")).toBe("false");
    });

    fireEvent.click(trigger);
    fireEvent.click(screen.getAllByRole("button", { name: /Services/ })[1]);
    const mobileServicesLink = screen.getAllByRole("link", { name: "View All Services" })[1];
    mobileServicesLink.addEventListener("click", (event) => event.preventDefault(), {
      once: true,
    });
    fireEvent.click(mobileServicesLink);

    await waitFor(() => {
      expect(trigger.getAttribute("aria-expanded")).toBe("false");
    });
  });
});
