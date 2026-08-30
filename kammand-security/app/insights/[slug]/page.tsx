import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightArticle } from "../../../components/sections/insights/insight-article";
import {
  getPublishedInsightBySlug,
  getPublishedInsights,
  getRelatedInsights,
} from "../../../lib/insights";
import { getAbsoluteUrl, getBreadcrumbJsonLd, siteConfig } from "../../../lib/site";

type InsightPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPublishedInsights().map((insight) => ({
    slug: insight.slug,
  }));
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = getPublishedInsightBySlug(slug);

  if (!insight) {
    return {
      title: "Insight Not Found",
    };
  }

  const canonicalUrl = getAbsoluteUrl(insight.href);
  const title = insight.seoTitle ?? insight.title;
  const description = insight.seoDescription ?? insight.description;

  return {
    title,
    description,
    ...(canonicalUrl ? { alternates: { canonical: canonicalUrl } } : {}),
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      type: "article",
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...(insight.publishedAt ? { publishedTime: insight.publishedAt } : {}),
      ...(insight.updatedAt ? { modifiedTime: insight.updatedAt } : {}),
    },
  };
}

export default async function InsightArticlePage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = getPublishedInsightBySlug(slug);

  if (!insight) {
    notFound();
  }

  const breadcrumbJsonLd = getBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Insights", path: "/insights" },
    { name: insight.title, path: insight.href },
  ]);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.description,
    datePublished: insight.publishedAt,
    ...(insight.updatedAt ? { dateModified: insight.updatedAt } : {}),
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      ...(getAbsoluteUrl("/") ? { url: getAbsoluteUrl("/") } : {}),
    },
    ...(getAbsoluteUrl(insight.href) ? { url: getAbsoluteUrl(insight.href) } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <InsightArticle insight={insight} relatedInsights={getRelatedInsights(insight)} />
    </>
  );
}
