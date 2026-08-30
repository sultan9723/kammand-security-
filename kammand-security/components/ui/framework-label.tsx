import type { HTMLAttributes, ReactNode } from "react";

type FrameworkLabelProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
};

export function FrameworkLabel({
  children,
  className = "",
  ...props
}: FrameworkLabelProps) {
  const classes = ["ui-framework-label", className].filter(Boolean).join(" ");

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
