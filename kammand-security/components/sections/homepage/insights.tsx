import Link from "next/link";
import type { CSSProperties } from "react";
import { formatInsightDate, getPublishedInsights } from "../../../lib/insights";
import { Container } from "../../ui/container";
import { DirectionalArrow } from "../../ui/directional-arrow";

const editorialFocusAreas = [
  {
    label: "Cybersecurity governance",
    graphic: "governance",
  },
  {
    label: "Regulatory change",
    graphic: "regulation",
  },
  {
    label: "Risk and compliance",
    graphic: "risk",
  },
  {
    label: "Assurance",
    graphic: "assurance",
  },
] as const;

type EditorialGraphic = (typeof editorialFocusAreas)[number]["graphic"];

function EditorialPreviewGraphic({ graphic }: { graphic: EditorialGraphic }) {
  if (graphic === "governance") {
    return (
      <svg aria-hidden="true" viewBox="0 0 320 190">
        <g className="insight-preview__rings">
          {[28, 48, 68, 88].map((radius) => (
            <circle cx="196" cy="98" key={radius} r={radius} />
          ))}
        </g>
        <path className="insight-preview__path" d="M196 98h74" />
        <circle className="insight-preview__node" cx="270" cy="98" r="20" />
        <circle className="insight-preview__point" cx="196" cy="98" r="3" />
      </svg>
    );
  }

  if (graphic === "regulation") {
    return (
      <svg aria-hidden="true" viewBox="0 0 320 190">
        <path className="insight-preview__plane" d="M0 190 58 78 112 54v136Z" />
        <path className="insight-preview__plane insight-preview__plane--mid" d="m92 190 28-130 72-36v166Z" />
        <path className="insight-preview__plane insight-preview__plane--quiet" d="m176 190 14-132 74-18v150Z" />
        <path className="insight-preview__rule" d="M76 72v118M148 44v146M230 50v140" />
      </svg>
    );
  }

  if (graphic === "risk") {
    return (
      <svg aria-hidden="true" viewBox="0 0 320 190">
        {[0, 1, 2, 3].map((index) => (
          <path
            className="insight-preview__layer"
            d={`M${44 + index * 48} 190 178 ${56 - index * 12} 212 190Z`}
            key={index}
          />
        ))}
        <path className="insight-preview__baseline" d="M20 176h280" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 320 190">
      <g className="insight-preview__dots">
        {Array.from({ length: 48 }, (_, index) => {
          const x = 8 + (index % 12) * 24;
          const row = Math.floor(index / 12);
          const y = 122 + row * 14 + Math.sin(index * 0.72) * 16;

          return <circle cx={x} cy={y} key={index} r="1.4" />;
        })}
      </g>
      {[0, 1, 2, 3].map((index) => (
        <path
          className="insight-preview__flow"
          d={`M0 ${146 + index * 10} C92 ${188 - index * 8} 180 ${154 - index * 16} 320 ${72 + index * 16}`}
          key={index}
        />
      ))}
    </svg>
  );
}

function ReviewIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m5 19 4.5-1 9-9a2.1 2.1 0 0 0-3-3l-9 9L5 19Z" />
      <path d="m13.5 8 3 3M4 21h16" />
    </svg>
  );
}

export function InsightsSection() {
  const insights = getPublishedInsights({ limit: 3 });

  return (
    <section className="insights-section" aria-labelledby="insights-title">
      <Container className="container-wide">
        <div className="insights-section__header">
          <p className="eyebrow insights-section__eyebrow">INSIGHTS</p>
          <h2 id="insights-title">Perspective for a changing risk landscape.</h2>
          <p className="text-body-large">
            Practical analysis on cybersecurity governance, regulatory change,
            risk, compliance, and assurance.
          </p>
        </div>

        {insights.length > 0 ? (
          <div className="insights-list">
            {insights.map((insight, index) => (
              <Link
                className="insight-entry"
                href={insight.href}
                key={insight.href}
                style={{ "--insight-index": index } as CSSProperties}
              >
                <span className="insight-entry__category">{insight.category}</span>
                <span className="insight-entry__body">
                  <h3>{insight.title}</h3>
                  <span className="insight-entry__description">
                    {insight.description}
                  </span>
                </span>
                <span className="insight-entry__status">
                  {insight.publishedAt
                    ? formatInsightDate(insight.publishedAt)
                    : "Reviewed"}
                </span>
                <span className="insight-entry__arrow" aria-hidden="true">
                  <DirectionalArrow />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="insights-empty">
            <div className="insights-empty__notice" role="status">
              <span className="insights-empty__icon">
                <ReviewIcon />
              </span>
              <div className="insights-empty__message">
                <p className="eyebrow">EDITORIAL REVIEW IN PROGRESS</p>
                <p className="text-body-large">
                  KAMMAND insight topics are being prepared and will appear here
                  once reviewed source material and publication copy are approved.
                </p>
              </div>
              <Link className="insights-empty__hub-link" href="/insights">
                Browse the Insights hub
                <DirectionalArrow />
              </Link>
            </div>

            <ul className="insights-preview-grid" aria-label="Editorial focus areas">
              {editorialFocusAreas.map((area) => (
                <li className="insights-preview" key={area.label}>
                  <span className="insights-preview__category">{area.label}</span>
                  <span className="insights-preview__visual">
                    <EditorialPreviewGraphic graphic={area.graphic} />
                  </span>
                  <span className="insights-preview__status">
                    <span aria-hidden="true" />
                    In review
                  </span>
                  <h3>{area.label}</h3>
                  <p>Editorial topic under review.</p>
                  <span className="insights-preview__footer">
                    Publication pending
                  </span>
                </li>
              ))}
            </ul>

            <Link className="ui-button ui-button--secondary" href="/insights">
              View Insights
              <DirectionalArrow />
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
