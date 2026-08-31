import Link from "next/link";
import type { InsightBlock, InsightEntry } from "../../../lib/insights";
import { formatInsightDate } from "../../../lib/insights";
import { Breadcrumbs } from "../../ui/breadcrumbs";
import { Container } from "../../ui/container";
import { DirectionalArrow } from "../../ui/directional-arrow";

type InsightArticleProps = {
  insight: InsightEntry;
  relatedInsights: readonly InsightEntry[];
};

export function InsightArticle({ insight, relatedInsights }: InsightArticleProps) {
  return (
    <main id="main-content">
      <article>
        <section className="internal-hero" aria-labelledby="insight-article-title">
          <Container>
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Insights", href: "/insights" },
                { label: insight.title, href: insight.href },
              ]}
            />
            <div className="internal-hero__content">
              <p className="eyebrow">{insight.category}</p>
              <h1 id="insight-article-title">{insight.title}</h1>
              <p className="text-body-large">{insight.description}</p>
              <div className="article-meta" aria-label="Insight publication metadata">
                {insight.publishedAt ? (
                  <time dateTime={insight.publishedAt}>
                    Published {formatInsightDate(insight.publishedAt)}
                  </time>
                ) : null}
                {insight.updatedAt ? (
                  <time dateTime={insight.updatedAt}>
                    Updated {formatInsightDate(insight.updatedAt)}
                  </time>
                ) : null}
                {insight.author ? <span>{insight.author}</span> : null}
              </div>
            </div>
          </Container>
        </section>

        <section className="internal-section" aria-labelledby="article-body-title">
          <Container>
            <div className="editorial-grid">
              <div className="editorial-sidebar">
                <p className="eyebrow">ARTICLE</p>
              </div>
              <div className="article-body">
                <h2 id="article-body-title" className="sr-only">
                  Article body
                </h2>
                {insight.body.map((block, index) => (
                  <ArticleBlock block={block} key={`${block.type}-${index}`} />
                ))}
              </div>
            </div>
          </Container>
        </section>
      </article>

      {insight.references && insight.references.length > 0 ? (
        <section className="internal-section internal-section--subtle" aria-labelledby="article-sources-title">
          <Container>
            <div className="editorial-grid">
              <div className="editorial-sidebar">
                <p className="eyebrow">SOURCES</p>
              </div>
              <div className="editorial-content">
                <h2 id="article-sources-title">References and source material.</h2>
                <ul className="source-list">
                  {insight.references.map((reference) => (
                    <li key={reference.label}>
                      {reference.href ? (
                        <Link href={reference.href}>{reference.label}</Link>
                      ) : (
                        <span>{reference.label}</span>
                      )}
                      <p>{reference.note}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      <section className="internal-section internal-section--subtle" aria-labelledby="article-related-title">
        <Container>
          <div className="detail-two-column">
            <div>
              <p className="eyebrow">RELATED INSIGHTS</p>
              <h2 id="article-related-title">Continue reading with context.</h2>
              {relatedInsights.length > 0 ? (
                <div className="related-service-list">
                  {relatedInsights.map((related) => (
                    <Link href={related.href} key={related.href}>
                      {related.title}
                      <DirectionalArrow />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-body">
                  Related published insights will appear here as the editorial
                  library grows.
                </p>
              )}
            </div>

            <div>
              <p className="eyebrow">KAMMAND CONTEXT</p>
              <h2>Relevant services and frameworks.</h2>
              <div className="related-service-list">
                {[...(insight.relatedServices ?? []), ...(insight.relatedFrameworks ?? [])].map(
                  (link) => (
                    <Link href={link.href} key={link.href}>
                      {link.title}
                      <DirectionalArrow />
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="final-cta ink-section" aria-labelledby="insight-final-cta-title">
        <Container>
          <div className="final-cta__grid">
            <div className="final-cta__content">
              <p className="eyebrow">CONSULTATION</p>
              <h2 id="insight-final-cta-title">Need to turn insight into action?</h2>
              <p className="text-body-large">
                Talk with KAMMAND about governance, risk, compliance, evidence,
                and assurance priorities.
              </p>
            </div>
            <div className="final-cta__actions" aria-label="Insight consultation actions">
              <Link className="ui-button ui-button--primary" href="/book">
                Book a Consultation
              </Link>
              <Link className="ui-button ui-button--secondary final-cta__secondary" href="/services">
                Explore Services
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}

function ArticleBlock({ block }: { block: InsightBlock }) {
  if (block.type === "heading") {
    return <h2>{block.text}</h2>;
  }

  if (block.type === "paragraph") {
    return <p>{block.text}</p>;
  }

  if (block.type === "list") {
    return (
      <ul className="check-list">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <aside className="article-callout" role="note">
      <h2>{block.title}</h2>
      <p>{block.text}</p>
    </aside>
  );
}
