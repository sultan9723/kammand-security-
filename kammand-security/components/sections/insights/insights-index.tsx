import Link from "next/link";
import type { CSSProperties } from "react";
import type { InsightEntry } from "../../../lib/insights";
import { formatInsightDate } from "../../../lib/insights";
import { Breadcrumbs } from "../../ui/breadcrumbs";
import { Container } from "../../ui/container";

type InsightsIndexProps = {
  insights: readonly InsightEntry[];
};

export function InsightsIndex({ insights }: InsightsIndexProps) {
  const hasPublishedInsights = insights.some(
    (insight) => !insight.draft && Boolean(insight.publishedAt),
  );

  return (
    <main className="insights-index-page" id="main-content">
      <section className="insights-index-hero" aria-labelledby="insights-index-title">
        <Container className="insights-index-hero__container">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Insights", href: "/insights" },
            ]}
          />

          <div className="insights-index-hero__stage">
            <InsightsHeroVisual side="left" />

            <div className="insights-index-hero__content">
              <p className="eyebrow insights-index-eyebrow">INSIGHTS</p>
              <h1 id="insights-index-title">
                Insights for a changing risk landscape<span>.</span>
              </h1>
              <p className="text-body-large">
                Practical perspectives on governance, cybersecurity, regulation,
                risk, compliance, and assurance.
              </p>
            </div>

            <InsightsHeroVisual side="right" />
          </div>
        </Container>
      </section>

      <section className="insights-index-library" aria-labelledby="published-insights-title">
        <Container>
          <header className="insights-index-library__header">
            <p className="eyebrow insights-index-eyebrow">EDITORIAL LIBRARY</p>
            <h2 id="published-insights-title">
              {hasPublishedInsights
                ? "Reviewed analysis, published with intent."
                : "Planned editorial topics in progress."}
            </h2>
            <p className="text-body-large">
              {hasPublishedInsights
                ? "KAMMAND publishes insight content only after the underlying analysis, sourcing, and editorial review are ready."
                : "These topics are being prepared and will appear here once source review and editorial approval are complete."}
            </p>
          </header>

          {insights.length > 0 ? (
            <div className="insights-index-list">
              {insights.map((insight, index) => (
                <InsightIndexEntry insight={insight} index={index} key={insight.href} />
              ))}
            </div>
          ) : (
            <div className="insights-empty" role="status">
              <p className="eyebrow">NO PUBLISHED INSIGHTS YET</p>
              <p className="text-body-large">
                Editorial topics are being prepared and will appear here once
                they have reviewed source material and approved publication copy.
              </p>
            </div>
          )}
        </Container>
      </section>
    </main>
  );
}

function InsightIndexEntry({ insight, index }: { insight: InsightEntry; index: number }) {
  const className = "insights-index-entry";
  const content = (
    <>
      <span className="insights-index-entry__icon" aria-hidden="true">
        <InsightTopicIcon category={insight.category} />
      </span>
      <span className="insights-index-entry__body">
        <span className="insights-index-entry__category">{insight.category}</span>
        <h3>{insight.title}</h3>
        <span className="insights-index-entry__description">{insight.description}</span>
      </span>
      <span className="insights-index-entry__status">
        {insight.draft
          ? "Planned"
          : insight.publishedAt
            ? formatInsightDate(insight.publishedAt)
            : "Reviewed"}
      </span>
      <span className="insights-index-entry__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M5 12h13M13 7l5 5-5 5" />
        </svg>
      </span>
    </>
  );

  if (insight.draft) {
    return (
      <article className={className} style={{ "--insight-index": index } as CSSProperties}>
        {content}
      </article>
    );
  }

  return (
    <Link className={className} href={insight.href} style={{ "--insight-index": index } as CSSProperties}>
      {content}
    </Link>
  );
}

function InsightTopicIcon({ category }: { category: InsightEntry["category"] }) {
  if (category === "Assurance") {
    return (
      <svg viewBox="0 0 48 48">
        <rect x="11" y="7" width="24" height="32" rx="3" />
        <path d="M17 15h12M17 22h8M17 29h5" />
        <circle cx="34" cy="33" r="8" />
        <path d="m30.5 33 2.5 2.5 4.5-5" />
      </svg>
    );
  }

  if (category === "Risk") {
    return (
      <svg viewBox="0 0 48 48">
        <circle cx="18" cy="17" r="7" />
        <circle cx="32" cy="18" r="6" />
        <path d="M7 38c0-7 4.8-11 11-11s11 4 11 11M27 28c1.4-.8 3.1-1.2 5-1.2 5.3 0 9 3.8 9 10.2" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48">
      <path d="m24 7 14 8-14 8-14-8 14-8Z" />
      <path d="m10 23 14 8 14-8M10 31l14 8 14-8" />
    </svg>
  );
}

function InsightsHeroVisual({ side }: { side: "left" | "right" }) {
  if (side === "right") {
    return (
      <div className="insights-index-visual insights-index-visual--right" aria-hidden="true">
        <svg viewBox="0 0 300 280">
          <g className="insights-index-visual__dots">
            {Array.from({ length: 24 }).map((_, index) => (
              <circle cx={186 + (index % 6) * 13} cy={22 + Math.floor(index / 6) * 13} key={index} r="1.8" />
            ))}
          </g>
          <rect className="insights-index-visual__panel" x="58" y="60" width="158" height="190" rx="10" transform="rotate(6 137 155)" />
          <path className="insights-index-visual__shield" d="M137 102 174 118v35c0 26-16 48-37 58-21-10-37-32-37-58v-35l37-16Z" />
          <path className="insights-index-visual__check" d="m120 153 12 12 24-29" />
          <path className="insights-index-visual__rule" d="M102 220h70M102 234h44" />
          <rect className="insights-index-visual__chip" x="200" y="168" width="66" height="62" rx="10" />
          <path className="insights-index-visual__trend" d="m216 209 12-14 10 7 13-18M244 184h7v7" />
        </svg>
      </div>
    );
  }

  return (
    <div className="insights-index-visual insights-index-visual--left" aria-hidden="true">
      <svg viewBox="0 0 300 280">
        <g className="insights-index-visual__dots">
          {Array.from({ length: 24 }).map((_, index) => (
            <circle cx={18 + (index % 6) * 13} cy={22 + Math.floor(index / 6) * 13} key={index} r="1.8" />
          ))}
        </g>
        <rect className="insights-index-visual__panel" x="62" y="62" width="150" height="184" rx="10" transform="rotate(-5 137 154)" />
        <path className="insights-index-visual__bars" d="M93 145v-23M113 145v-39M133 145V92" />
        <path className="insights-index-visual__rule" d="M91 169h74M91 185h52" />
        <circle className="insights-index-visual__ring" cx="184" cy="215" r="50" />
        <circle className="insights-index-visual__ring-track" cx="184" cy="215" r="27" />
        <path className="insights-index-visual__ring-value" d="M184 188a27 27 0 1 1-24 39" />
      </svg>
    </div>
  );
}
