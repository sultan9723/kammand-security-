import { z } from "zod";
import { contactInterestOptions, contactLimits, type ContactLead } from "./config";

export type ContactValidationResult =
  | {
      ok: true;
      data: ContactLead;
    }
  | {
      ok: false;
      errors: Record<string, string>;
    };

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .or(z.literal("").transform(() => undefined));

const contactSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name.").max(120),
    workEmail: z.string().trim().email("Enter a valid work email.").max(254),
    organization: z
      .string()
      .trim()
      .min(2, "Enter your company or organization.")
      .max(160),
    message: z
      .string()
      .trim()
      .min(20, "Tell us a little more about how KAMMAND can help.")
      .max(3000, "Keep the message under 3000 characters."),
    jobTitle: optionalText(120),
    phone: optionalText(40),
    country: optionalText(80),
    areaOfInterest: z.enum(contactInterestOptions).optional().or(z.literal("").transform(() => undefined)),
    website: z.string().max(0).optional().or(z.literal("")),
    elapsedMs: z.coerce.number().int().nonnegative(),
  })
  .strict();

export function validateContactPayload(payload: unknown): ContactValidationResult {
  const parsed = contactSchema.safeParse(payload);

  if (!parsed.success) {
    const errors: Record<string, string> = {};

    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0]?.toString() ?? "form";
      const publicField = field === "elapsedMs" || field === "website" ? "form" : field;
      errors[publicField] =
        publicField === "form" ? "Unable to process this submission." : issue.message;
    });

    return { ok: false, errors };
  }

  if (parsed.data.website) {
    return { ok: false, errors: { form: "Unable to process this submission." } };
  }

  if (parsed.data.elapsedMs < contactLimits.minSubmissionMs) {
    return { ok: false, errors: { form: "Please review the form before submitting." } };
  }

  if (parsed.data.elapsedMs > contactLimits.maxSubmissionMs) {
    return { ok: false, errors: { form: "This form session expired. Please refresh and try again." } };
  }

  const {
    fullName,
    workEmail,
    organization,
    message,
    jobTitle,
    phone,
    country,
    areaOfInterest,
  } = parsed.data;

  return {
    ok: true,
    data: {
      fullName,
      workEmail,
      organization,
      message,
      ...(jobTitle ? { jobTitle } : {}),
      ...(phone ? { phone } : {}),
      ...(country ? { country } : {}),
      ...(areaOfInterest ? { areaOfInterest } : {}),
    },
  };
}

export function hasOversizedPayload(contentLength: string | null) {
  if (!contentLength) {
    return false;
  }

  const bytes = Number.parseInt(contentLength, 10);

  return Number.isFinite(bytes) && bytes > contactLimits.maxPayloadBytes;
}
