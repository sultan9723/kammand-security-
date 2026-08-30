export const analyticsEventNames = [
  "consultation_cta_clicked",
  "contact_cta_clicked",
  "contact_form_started",
  "contact_form_submitted",
  "contact_form_success",
  "contact_form_error",
  "booking_page_viewed",
  "booking_started",
  "booking_completed",
  "service_viewed",
  "framework_viewed",
  "insight_viewed",
] as const;

export type AnalyticsEventName = (typeof analyticsEventNames)[number];

export type AnalyticsEventPayload = {
  cta_location?: string;
  service_slug?: string;
  framework_slug?: string;
  insight_slug?: string;
  error_type?: "validation" | "network" | "delivery" | "unknown";
};

export type AnalyticsEvent = {
  name: AnalyticsEventName;
  payload?: AnalyticsEventPayload;
};

const permittedPayloadKeys = [
  "cta_location",
  "service_slug",
  "framework_slug",
  "insight_slug",
  "error_type",
] as const;

export function sanitizeAnalyticsPayload(
  payload: Record<string, unknown> | undefined,
): AnalyticsEventPayload | undefined {
  if (!payload) {
    return undefined;
  }

  const sanitized: AnalyticsEventPayload = {};

  permittedPayloadKeys.forEach((key) => {
    const value = payload[key];

    if (typeof value === "string" && value.length > 0 && value.length <= 120) {
      sanitized[key] = value as never;
    }
  });

  return Object.keys(sanitized).length > 0 ? sanitized : undefined;
}

export function isAnalyticsEventName(value: string): value is AnalyticsEventName {
  return analyticsEventNames.includes(value as AnalyticsEventName);
}
