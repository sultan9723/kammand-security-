import { describe, expect, it } from "vitest";
import { generateMetadata, generateStaticParams } from "./page";

describe("InsightArticlePage route architecture", () => {
  it("does not generate draft article routes", () => {
    expect(generateStaticParams()).toEqual([]);
  });

  it("does not expose draft metadata as a published article", async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: "overlapping-cybersecurity-frameworks" }),
    });

    expect(metadata.title).toBe("Insight Not Found");
    expect(metadata.openGraph).toBeUndefined();
  });
});
