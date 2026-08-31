import type { NextConfig } from "next";
import { getProductionEnvironmentChecks } from "./lib/env";

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "upgrade-insecure-requests",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-src 'self' https://calendly.com",
      "worker-src 'self'",
    ].join("; "),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), autoplay=(), fullscreen=(self), gyroscope=(), accelerometer=(), magnetometer=(), midi=(), sync-xhr=()",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
];

function assertProductionEnvironment() {
  if (process.env.NODE_ENV !== "production" || process.env.CI) {
    return;
  }

  const { issues, warnings } = getProductionEnvironmentChecks();

  if (warnings.length > 0) {
    const warningMessage = [
      "KAMMAND production environment:",
      ...warnings.map((warning) => `  - ${warning}`),
    ].join("\n");
    console.warn(`[kammand:production-environment]\n${warningMessage}`);
  }

  if (issues.length === 0) {
    return;
  }

  const message = [
    "KAMMAND production environment is not fully configured.",
    ...issues.map((issue) => `  - ${issue}`),
    "Configure these variables in the deployment provider before deploying.",
  ].join("\n");

  if (process.env.VERCEL_ENV === "production") {
    throw new Error(message);
  }

  console.warn(`[kammand:production-environment]\n${message}`);
}

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

assertProductionEnvironment();

export default nextConfig;
