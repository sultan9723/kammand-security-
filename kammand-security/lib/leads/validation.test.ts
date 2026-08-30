import { describe, expect, it } from "vitest";
import { validateContactPayload } from "./validation";

const validPayload = {
  fullName: "Aisha Rahman",
  workEmail: "aisha@example.com",
  organization: "Example Financial",
  message: "We need help understanding GRC priorities and audit readiness.",
  jobTitle: "Risk Lead",
  phone: "+966500000000",
  country: "Saudi Arabia",
  areaOfInterest: "GRC Advisory",
  website: "",
  elapsedMs: 3000,
};

describe("validateContactPayload", () => {
  it("normalizes valid contact submissions", () => {
    const result = validateContactPayload({
      ...validPayload,
      fullName: "  Aisha Rahman  ",
    });

    expect(result.ok).toBe(true);

    if (result.ok) {
      expect(result.data.fullName).toBe("Aisha Rahman");
      expect(result.data.areaOfInterest).toBe("GRC Advisory");
    }
  });

  it("rejects invalid email and missing required fields", () => {
    const result = validateContactPayload({
      ...validPayload,
      fullName: "",
      workEmail: "not-an-email",
      organization: "",
    });

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.errors.fullName).toBeTruthy();
      expect(result.errors.workEmail).toBeTruthy();
      expect(result.errors.organization).toBeTruthy();
    }
  });

  it("rejects oversized messages and invalid area values", () => {
    const result = validateContactPayload({
      ...validPayload,
      areaOfInterest: "Unsupported",
      message: "x".repeat(3001),
    });

    expect(result.ok).toBe(false);

    if (!result.ok) {
      expect(result.errors.areaOfInterest).toBeTruthy();
      expect(result.errors.message).toBeTruthy();
    }
  });

  it("rejects honeypot and rapid submissions", () => {
    const honeypot = validateContactPayload({
      ...validPayload,
      website: "https://spam.example",
    });
    const tooFast = validateContactPayload({
      ...validPayload,
      elapsedMs: 0,
    });

    expect(honeypot.ok).toBe(false);
    expect(tooFast.ok).toBe(false);
  });

  it("rejects unexpected fields", () => {
    const result = validateContactPayload({
      ...validPayload,
      password: "should-not-exist",
    });

    expect(result.ok).toBe(false);
  });
});
