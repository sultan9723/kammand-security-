import type { ContactLead } from "./config";

export type LeadDeliveryResult =
  | {
      ok: true;
      provider: "development" | "resend";
      id?: string;
    }
  | {
      ok: false;
      status: "configuration_error" | "provider_error";
    };

export async function deliverContactLead(lead: ContactLead): Promise<LeadDeliveryResult> {
  const provider = process.env.CONTACT_DELIVERY_PROVIDER;

  if (!provider || provider === "development") {
    if (process.env.NODE_ENV === "production") {
      return { ok: false, status: "configuration_error" };
    }

    return { ok: true, provider: "development", id: "development-lead" };
  }

  if (provider === "resend") {
    return deliverWithResend(lead);
  }

  return { ok: false, status: "configuration_error" };
}

async function deliverWithResend(lead: ContactLead): Promise<LeadDeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_RECIPIENT;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !recipient || !from) {
    return { ok: false, status: "configuration_error" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: lead.workEmail,
        subject: "New KAMMAND contact inquiry",
        text: formatLeadText(lead),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      return { ok: false, status: "provider_error" };
    }

    const body = (await response.json().catch(() => ({}))) as { id?: string };

    return { ok: true, provider: "resend", id: body.id };
  } catch {
    return { ok: false, status: "provider_error" };
  }
}

function formatLeadText(lead: ContactLead) {
  return [
    "New KAMMAND contact inquiry",
    "",
    `Name: ${lead.fullName}`,
    `Work email: ${lead.workEmail}`,
    `Organization: ${lead.organization}`,
    lead.jobTitle ? `Job title: ${lead.jobTitle}` : undefined,
    lead.phone ? `Phone: ${lead.phone}` : undefined,
    lead.country ? `Country / Region: ${lead.country}` : undefined,
    lead.areaOfInterest ? `Area of interest: ${lead.areaOfInterest}` : undefined,
    "",
    "Message:",
    lead.message,
  ]
    .filter(Boolean)
    .join("\n");
}
