import { afterEach, describe, expect, it, vi } from "vitest";
import { deliverContactLead } from "./provider";

const lead = {
  fullName: "Aisha Rahman",
  workEmail: "aisha@example.com",
  organization: "Example Financial",
  message: "We need help understanding GRC priorities and audit readiness.",
} as const;

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("deliverContactLead", () => {
  it("uses a safe development fallback outside production", async () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("CONTACT_DELIVERY_PROVIDER", "development");

    await expect(deliverContactLead(lead)).resolves.toMatchObject({
      ok: true,
      provider: "development",
    });
  });

  it("does not pretend production delivery works without configuration", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("CONTACT_DELIVERY_PROVIDER", "development");

    await expect(deliverContactLead(lead)).resolves.toEqual({
      ok: false,
      status: "configuration_error",
    });
  });

  it("sends through Resend when configured without installing a provider SDK", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: "email_123" }),
    });

    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("CONTACT_DELIVERY_PROVIDER", "resend");
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_RECIPIENT", "leads@example.com");
    vi.stubEnv("CONTACT_FROM", "KAMMAND <no-reply@example.com>");

    await expect(deliverContactLead(lead)).resolves.toEqual({
      ok: true,
      provider: "resend",
      id: "email_123",
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it("reports provider failure without exposing provider details", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));
    vi.stubEnv("CONTACT_DELIVERY_PROVIDER", "resend");
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.stubEnv("CONTACT_RECIPIENT", "leads@example.com");
    vi.stubEnv("CONTACT_FROM", "KAMMAND <no-reply@example.com>");

    await expect(deliverContactLead(lead)).resolves.toEqual({
      ok: false,
      status: "provider_error",
    });
  });
});
