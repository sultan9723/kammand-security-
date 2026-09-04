import type { ElementType, HTMLAttributes, ReactNode } from "react";

type SectionLabelProps<TElement extends ElementType = "span"> = {
  align?: "start" | "center";
  as?: TElement;
  children?: ReactNode;
  className?: string;
  label?: ReactNode;
  variant?: "light" | "dark";
} & Omit<HTMLAttributes<HTMLElement>, "as" | "children">;

export function SectionLabel<TElement extends ElementType = "span">({
  align = "start",
  as,
  children,
  className = "",
  label,
  variant = "light",
  ...props
}: SectionLabelProps<TElement>) {
  const Component = (as ?? "span") as ElementType;
  const classes = [
    "ui-section-label",
    `ui-section-label--${variant}`,
    `ui-section-label--${align}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...props}>
      {children ?? label}
    </Component>
  );
}
