import { describe, expect, it } from "vitest";
import {
  getPublishedInsightBySlug,
  getPublishedInsights,
  getRelatedInsights,
  insightEntries,
  isPublishedInsight,
} from "./insights";

describe("insights content model", () => {
  it("keeps initial editorial fixtures in draft state", () => {
    expect(insightEntries).toHaveLength(3);
    expect(insightEntries.every((insight) => insight.draft)).toBe(true);
    expect(insightEntries.every((insight) => !insight.publishedAt)).toBe(true);
  });

  it("excludes drafts from public published insight helpers", () => {
    expect(getPublishedInsights()).toEqual([]);
    expect(getPublishedInsightBySlug("overlapping-cybersecurity-frameworks")).toBeUndefined();
    expect(isPublishedInsight(insightEntries[0])).toBe(false);
  });

  it("does not suggest draft related insights", () => {
    expect(getRelatedInsights(insightEntries[0])).toEqual([]);
  });
});
