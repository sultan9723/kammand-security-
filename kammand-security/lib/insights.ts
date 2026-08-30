import { insightEntries } from "../content/insights/entries";

export const insightCategories = [
  "GRC",
  "Cybersecurity",
  "Risk",
  "Regulation",
  "Assurance",
  "Privacy",
] as const;

export type InsightCategory = (typeof insightCategories)[number];

export type InsightLink = {
  title: string;
  href: string;
};

export type InsightReference = {
  label: string;
  href?: string;
  note: string;
};

export type InsightBlock =
  | {
      type: "heading";
      text: string;
    }
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: readonly string[];
    }
  | {
      type: "callout";
      title: string;
      text: string;
    };

export type InsightEntry = {
  title: string;
  slug: string;
  href: string;
  description: string;
  category: InsightCategory;
  publishedAt?: string;
  updatedAt?: string;
  author?: string;
  featured?: boolean;
  draft: boolean;
  seoTitle?: string;
  seoDescription?: string;
  relatedInsights?: readonly string[];
  relatedServices?: readonly InsightLink[];
  relatedFrameworks?: readonly InsightLink[];
  references?: readonly InsightReference[];
  body: readonly InsightBlock[];
};

export { insightEntries };

export function isPublishedInsight(insight: InsightEntry) {
  return !insight.draft && Boolean(insight.publishedAt);
}

export function getPublishedInsights({ limit }: { limit?: number } = {}) {
  const published = insightEntries
    .filter(isPublishedInsight)
    .sort((a, b) => {
      const aDate = a.publishedAt ? Date.parse(a.publishedAt) : 0;
      const bDate = b.publishedAt ? Date.parse(b.publishedAt) : 0;

      return bDate - aDate;
    });

  return typeof limit === "number" ? published.slice(0, limit) : published;
}

export function getPublishedInsightBySlug(slug: string) {
  return getPublishedInsights().find((insight) => insight.slug === slug);
}

export function getRelatedInsights(insight: InsightEntry, limit = 3) {
  const published = getPublishedInsights();
  const explicitlyRelated = insight.relatedInsights
    ? insight.relatedInsights
        .map((slug) => published.find((candidate) => candidate.slug === slug))
        .filter((candidate): candidate is InsightEntry => Boolean(candidate))
    : [];
  const categoryRelated = published.filter(
    (candidate) =>
      candidate.slug !== insight.slug &&
      candidate.category === insight.category &&
      !explicitlyRelated.some((related) => related.slug === candidate.slug),
  );

  return [...explicitlyRelated, ...categoryRelated].slice(0, limit);
}

export function formatInsightDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
