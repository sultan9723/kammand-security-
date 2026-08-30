type OperationalLogEvent =
  | "contact_rate_limit_production_fallback"
  | "contact_delivery_configuration_error"
  | "contact_delivery_provider_error";

export function logOperationalEvent(event: OperationalLogEvent) {
  if (process.env.NODE_ENV === "test") {
    return;
  }

  console.warn(`[kammand:${event}]`);
}
