import type { HTMLAttributes, ReactNode } from "react";

type SectionHeadingProps = HTMLAttributes<HTMLDivElement> & {
  description?: ReactNode;
  eyebrow?: ReactNode;
  level?: 1 | 2 | 3;
  title: ReactNode;
  titleId?: string;
};

export function SectionHeading({
  className = "",
  description,
  eyebrow,
  level = 2,
  title,
  titleId,
  ...props
}: SectionHeadingProps) {
  const classes = ["ui-section-heading", className].filter(Boolean).join(" ");
  const Heading = `h${level}` as const;

  return (
    <div className={classes} {...props}>
      {eyebrow ? <p className="ui-section-heading__eyebrow">{eyebrow}</p> : null}
      <Heading className="ui-section-heading__title" id={titleId}>
        {title}
      </Heading>
      {description ? (
        <p className="ui-section-heading__description">{description}</p>
      ) : null}
    </div>
  );
}
