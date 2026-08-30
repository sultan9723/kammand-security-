import type { AnalyticsEvent } from "./events";

export type AnalyticsProviderName = "disabled";

export type AnalyticsProvider = {
  name: AnalyticsProviderName;
  enabled: boolean;
  track: (event: AnalyticsEvent) => void;
  shutdown: () => void;
};

export function getConfiguredAnalyticsProviderName(): AnalyticsProviderName {
  const configured = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;

  if (!configured || configured === "disabled") {
    return "disabled";
  }

  return "disabled";
}

export function createAnalyticsProvider(): AnalyticsProvider {
  return {
    name: getConfiguredAnalyticsProviderName(),
    enabled: false,
    track: () => undefined,
    shutdown: () => undefined,
  };
}
