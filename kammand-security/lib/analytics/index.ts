"use client";

import {
  isAnalyticsEventName,
  sanitizeAnalyticsPayload,
  type AnalyticsEvent,
  type AnalyticsEventName,
  type AnalyticsEventPayload,
} from "./events";

export const analyticsEventTargetName = "kammand:analytics-event";

export function trackAnalyticsEvent(
  name: AnalyticsEventName,
  payload?: AnalyticsEventPayload,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<AnalyticsEvent>(analyticsEventTargetName, {
      detail: {
        name,
        payload: sanitizeAnalyticsPayload(payload),
      },
    }),
  );
}

export function parseAnalyticsEvent(event: Event): AnalyticsEvent | undefined {
  const customEvent = event as CustomEvent<AnalyticsEvent>;
  const detail = customEvent.detail;

  if (!detail || !isAnalyticsEventName(detail.name)) {
    return undefined;
  }

  return {
    name: detail.name,
    payload: sanitizeAnalyticsPayload(detail.payload),
  };
}
