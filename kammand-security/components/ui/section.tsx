import type { HTMLAttributes, ReactNode } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
};

export function Section({ children, className = "", ...props }: SectionProps) {
  const classes = ["section", className].filter(Boolean).join(" ");

  return (
    <section className={classes} {...props}>
      {children}
    </section>
  );
}
