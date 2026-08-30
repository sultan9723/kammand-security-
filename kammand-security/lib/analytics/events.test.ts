import { describe, expect, it } from "vitest";
import {
  isAnalyticsEventName,
  sanitizeAnalyticsPayload,
} from "./events";

describe("analytics events", () => {
  it("recognizes the approved event taxonomy", () => {
    expect(isAnalyticsEventName("contact_form_success")).toBe(true);
    expect(isAnalyticsEventName("mouse_moved")).toBe(false);
  });

  it("sanitizes event payloads to approved coarse properties", () => {
    const payload = sanitizeAnalyticsPayload({
      service_slug: "grc-advisory",
      email: "aisha@example.com",
      fullName: "Aisha Rahman",
      message: "Sensitive inquiry content should never be sent.",
      error_type: "validation",
    });

    expect(payload).toEqual({
      service_slug: "grc-advisory",
      error_type: "validation",
    });
  });
});
