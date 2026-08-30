// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from "vitest";
import {
  analyticsEventTargetName,
  parseAnalyticsEvent,
  trackAnalyticsEvent,
} from ".";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("analytics event dispatch", () => {
  it("dispatches sanitized client events without PII payload values", () => {
    const listener = vi.fn((event: Event) => parseAnalyticsEvent(event));
    window.addEventListener(analyticsEventTargetName, listener);

    trackAnalyticsEvent("contact_form_error", {
      error_type: "validation",
      cta_location: "contact_form",
    });

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.results[0]?.value).toEqual({
      name: "contact_form_error",
      payload: {
        error_type: "validation",
        cta_location: "contact_form",
      },
    });

    window.removeEventListener(analyticsEventTargetName, listener);
  });
});
