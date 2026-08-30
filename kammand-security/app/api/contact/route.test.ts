import { NextRequest } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import { resetContactRateLimit } from "../../../lib/leads/rate-limit";
import { POST } from "./route";

const validPayload = {
  fullName: "Aisha Rahman",
  workEmail: "aisha@example.com",
  organization: "Example Financial",
  message: "We need help understanding GRC priorities and audit readiness.",
  areaOfInterest: "GRC Advisory",
  website: "",
  elapsedMs: 3000,
};

afterEach(() => {
  resetContactRateLimit();
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

describe("POST /api/contact", () => {
  it("accepts valid development submissions without sending real email", async () => {
    vi.stubEnv("CONTACT_DELIVERY_PROVIDER", "development");

    const response = await POST(makeRequest(validPayload));
    const body = (await response.json()) as { ok: boolean; message: string };

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(body.message).toBe("Thank you. Your inquiry has been received.");
  });

  it("rejects invalid submissions", async () => {
    const response = await POST(makeRequest({ ...validPayload, workEmail: "bad" }));
    const body = (await response.json()) as { errors: Record<string, string> };

    expect(response.status).toBe(400);
    expect(body.errors.workEmail).toBeTruthy();
  });

  it("rejects oversized payloads before validation", async () => {
    const response = await POST(makeRequest(validPayload, { contentLength: "20000" }));
    const body = (await response.json()) as { errors: Record<string, string> };

    expect(response.status).toBe(413);
    expect(body.errors.form).toContain("too large");
  });

  it("rate limits repeated submissions from the same request key", async () => {
    vi.stubEnv("CONTACT_DELIVERY_PROVIDER", "development");

    const responses = [];

    for (let index = 0; index < 6; index += 1) {
      responses.push(await POST(makeRequest(validPayload)));
    }

    expect(responses.at(-1)?.status).toBe(429);
  });

  it("logs only a coarse delivery configuration event when production delivery is missing", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("CONTACT_DELIVERY_PROVIDER", "development");
    vi.stubEnv("CONTACT_RATE_LIMIT_PROVIDER", "managed");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const response = await POST(makeRequest(validPayload));

    expect(response.status).toBe(503);
    expect(warn).toHaveBeenCalledWith("[kammand:contact_delivery_configuration_error]");
    expect(JSON.stringify(warn.mock.calls)).not.toContain(validPayload.message);
    expect(JSON.stringify(warn.mock.calls)).not.toContain(validPayload.workEmail);
  });
});

function makeRequest(
  body: Record<string, unknown>,
  { contentLength }: { contentLength?: string } = {},
) {
  return new NextRequest("https://www.example.com/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "203.0.113.10",
      ...(contentLength ? { "content-length": contentLength } : {}),
    },
    body: JSON.stringify(body),
  });
}
