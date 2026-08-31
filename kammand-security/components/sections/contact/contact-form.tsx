"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent, type SyntheticEvent } from "react";
import { trackAnalyticsEvent } from "../../../lib/analytics";
import { contactInterestOptions } from "../../../lib/leads/config";
import { DirectionalArrow } from "../../ui/directional-arrow";

type FormErrors = Record<string, string>;

type SubmissionState =
  | {
      status: "idle";
    }
  | {
      status: "submitting";
    }
  | {
      status: "success";
      message: string;
    }
  | {
      status: "error";
      errors: FormErrors;
    };

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef<number | undefined>(undefined);
  const [submission, setSubmission] = useState<SubmissionState>({ status: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    payload.elapsedMs = String(
      startedAtRef.current === undefined
        ? 0
        : Math.round(Math.max(0, event.timeStamp - startedAtRef.current)),
    );
    const clientErrors = validateClientPayload(payload);

    if (Object.keys(clientErrors).length > 0) {
      trackAnalyticsEvent("contact_form_error", { error_type: "validation" });
      setSubmission({ status: "error", errors: clientErrors });
      focusStatus();
      return;
    }

    trackAnalyticsEvent("contact_form_submitted");
    setSubmission({ status: "submitting" });

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch(() => undefined);

    if (!response) {
      trackAnalyticsEvent("contact_form_error", { error_type: "network" });
      setSubmission({
        status: "error",
        errors: {
          form: "Your inquiry could not be submitted right now. Please try again.",
        },
      });
      focusStatus();
      return;
    }

    const body = (await response.json().catch(() => ({}))) as {
      ok?: boolean;
      message?: string;
      errors?: FormErrors;
    };

    if (response.ok && body.ok) {
      trackAnalyticsEvent("contact_form_success");
      setSubmission({
        status: "success",
        message: body.message ?? "Thank you. Your inquiry has been received.",
      });
      form.reset();
      focusStatus();
      return;
    }

    trackAnalyticsEvent("contact_form_error", {
      error_type: response.status >= 500 ? "delivery" : "validation",
    });
    setSubmission({
      status: "error",
      errors: body.errors ?? {
        form: "Your inquiry could not be submitted right now. Please try again.",
      },
    });
    focusStatus();
  }

  function captureStartTime(event: SyntheticEvent<HTMLFormElement>) {
    if (startedAtRef.current === undefined) {
      startedAtRef.current = event.timeStamp;
      trackAnalyticsEvent("contact_form_started");
    }
  }

  function focusStatus() {
    window.requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>("[data-form-status]")?.focus();
    });
  }

  const errors = submission.status === "error" ? submission.errors : {};

  return (
    <form
      className="contact-form"
      noValidate
      onSubmit={handleSubmit}
      onFocusCapture={captureStartTime}
      onKeyDownCapture={captureStartTime}
      onPointerDownCapture={captureStartTime}
      ref={formRef}
      aria-describedby="contact-form-guidance contact-form-status"
    >
      <div
        className={
          submission.status === "success"
            ? "form-status form-status--success"
            : "form-status"
        }
        data-form-status
        id="contact-form-status"
        role={submission.status === "error" ? "alert" : "status"}
        tabIndex={-1}
      >
        {submission.status === "success"
          ? submission.message
          : errors.form ?? "Required fields are marked with an asterisk."}
      </div>

      <input
        aria-label="Leave this field blank"
        autoComplete="off"
        name="website"
        tabIndex={-1}
        type="text"
        hidden
      />
      <input name="elapsedMs" type="hidden" value="" readOnly />

      <div className="form-grid">
        <FormField
          autoComplete="name"
          error={errors.fullName}
          id="fullName"
          label="Full name"
          name="fullName"
          required
        />
        <FormField
          autoComplete="email"
          error={errors.workEmail}
          id="workEmail"
          label="Work email"
          name="workEmail"
          required
          type="email"
        />
        <FormField
          autoComplete="organization"
          error={errors.organization}
          id="organization"
          label="Company / Organization"
          name="organization"
          required
        />
        <FormField
          autoComplete="organization-title"
          error={errors.jobTitle}
          id="jobTitle"
          label="Job title"
          name="jobTitle"
        />
        <FormField
          autoComplete="tel"
          error={errors.phone}
          id="phone"
          label="Phone"
          name="phone"
          type="tel"
        />
        <FormField
          autoComplete="country-name"
          error={errors.country}
          id="country"
          label="Country / Region"
          name="country"
        />
      </div>

      <div className="form-field">
        <label htmlFor="areaOfInterest">Area of interest</label>
        <select
          aria-describedby={errors.areaOfInterest ? "areaOfInterest-error" : undefined}
          aria-invalid={Boolean(errors.areaOfInterest)}
          id="areaOfInterest"
          name="areaOfInterest"
        >
          <option value="">Select an area if helpful</option>
          {contactInterestOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.areaOfInterest ? (
          <p className="form-error" id="areaOfInterest-error">
            {errors.areaOfInterest}
          </p>
        ) : null}
      </div>

      <div className="form-field">
        <label htmlFor="message">
          How can we help? <span aria-hidden="true">*</span>
        </label>
        <p className="form-help" id="contact-form-guidance">
          Do not include passwords, credentials, or other highly sensitive information
          in this form.
        </p>
        <textarea
          aria-describedby={`contact-form-guidance${errors.message ? " message-error" : ""}`}
          aria-invalid={Boolean(errors.message)}
          id="message"
          name="message"
          required
          rows={7}
        />
        {errors.message ? (
          <p className="form-error" id="message-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      <p className="form-privacy-note">
        By submitting this form, you acknowledge that KAMMAND will use the
        information provided to respond to your inquiry. Review the{" "}
        <Link href="/privacy">privacy information</Link>.
      </p>

      <div className="form-actions">
        <button
          className="ui-button ui-button--primary"
          disabled={submission.status === "submitting"}
          type="submit"
        >
          {submission.status === "submitting" ? "Submitting..." : "Submit Inquiry"}
          <DirectionalArrow />
        </button>
        <Link className="ui-button ui-button--text" href="/book">
          Book a Consultation
          <DirectionalArrow />
        </Link>
      </div>
    </form>
  );
}

function FormField({
  error,
  id,
  label,
  name,
  required = false,
  type = "text",
  autoComplete,
}: {
  error?: string;
  id: string;
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>
        {label} {required ? <span aria-hidden="true">*</span> : null}
      </label>
      <input
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        id={id}
        name={name}
        required={required}
        type={type}
      />
      {error ? (
        <p className="form-error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function validateClientPayload(payload: Record<string, FormDataEntryValue>) {
  const errors: FormErrors = {};
  const fullName = String(payload.fullName ?? "").trim();
  const workEmail = String(payload.workEmail ?? "").trim();
  const organization = String(payload.organization ?? "").trim();
  const message = String(payload.message ?? "").trim();

  if (fullName.length < 2) {
    errors.fullName = "Enter your full name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail)) {
    errors.workEmail = "Enter a valid work email.";
  }

  if (organization.length < 2) {
    errors.organization = "Enter your company or organization.";
  }

  if (message.length < 20) {
    errors.message = "Tell us a little more about how KAMMAND can help.";
  }

  if (message.length > 3000) {
    errors.message = "Keep the message under 3000 characters.";
  }

  return errors;
}
