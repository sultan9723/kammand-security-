import { NextResponse, type NextRequest } from "next/server";
import { checkContactRateLimit } from "../../../lib/leads/rate-limit";
import { submitContactLead } from "../../../lib/leads/submit-lead";
import { hasOversizedPayload, validateContactPayload } from "../../../lib/leads/validation";
import { logOperationalEvent } from "../../../lib/logging";

export async function POST(request: NextRequest) {
  if (hasOversizedPayload(request.headers.get("content-length"))) {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          form: "The submitted message is too large.",
        },
      },
      { status: 413 },
    );
  }

  const rateLimit = checkContactRateLimit(getRateLimitKey(request));

  if (rateLimit.productionFallback) {
    logOperationalEvent("contact_rate_limit_production_fallback");
  }

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        errors: {
          form: "Too many submissions. Please wait before trying again.",
        },
      },
      {
        status: 429,
        headers: rateLimit.retryAfterSeconds
          ? { "Retry-After": String(rateLimit.retryAfterSeconds) }
          : {},
      },
    );
  }

  const payload = await request.json().catch(() => undefined);
  const validation = validateContactPayload(payload);

  if (!validation.ok) {
    return NextResponse.json(
      {
        ok: false,
        errors: validation.errors,
      },
      { status: 400 },
    );
  }

  const delivery = await submitContactLead(validation.data);

  if (!delivery.ok) {
    logOperationalEvent(
      delivery.status === "configuration_error"
        ? "contact_delivery_configuration_error"
        : "contact_delivery_provider_error",
    );

    return NextResponse.json(
      {
        ok: false,
        errors: {
          form:
            "Your inquiry could not be submitted right now. Please try again or use the booking path.",
        },
      },
      { status: 503 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Thank you. Your inquiry has been received.",
  });
}

function getRateLimitKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip");

  return forwardedFor || realIp || "unknown";
}
