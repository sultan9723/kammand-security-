import type { HTMLAttributes, ReactNode } from "react";
import { SectionLabel } from "./section-label";

type SectionHeadingProps = HTMLAttributes<HTMLDivElement> & {
  align?: "start" | "center";
  description?: ReactNode;
  eyebrow?: ReactNode;
  labelVariant?: "light" | "dark";
  level?: 1 | 2 | 3;
  title: ReactNode;
  titleId?: string;
};

export function SectionHeading({
  align = "center",
  className = "",
  description,
  eyebrow,
  labelVariant = "light",
  level = 2,
  title,
  titleId,
  ...props
}: SectionHeadingProps) {
  const classes = ["ui-section-heading", className].filter(Boolean).join(" ");
  const Heading = `h${level}` as const;

  return (
    <div className={classes} {...props}>
      {eyebrow ? (
        <SectionLabel align={align} as="p" variant={labelVariant}>
          {eyebrow}
        </SectionLabel>
      ) : null}
      <Heading className="ui-section-heading__title" id={titleId}>
        {title}
      </Heading>
      {description ? (
        <p className="ui-section-heading__description">{description}</p>
      ) : null}
    </div>
  );
}
