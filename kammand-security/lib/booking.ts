export function getCalendlyUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  if (!configuredUrl) {
    return undefined;
  }

  try {
    const url = new URL(configuredUrl);
    const hostname = url.hostname.toLowerCase();
    const isCalendly = hostname === "calendly.com" || hostname.endsWith(".calendly.com");

    if (url.protocol !== "https:" || !isCalendly) {
      return undefined;
    }

    return url.toString();
  } catch {
    return undefined;
  }
}
