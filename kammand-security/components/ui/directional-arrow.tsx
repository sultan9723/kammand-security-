type DirectionalArrowProps = {
  className?: string;
};

export function DirectionalArrow({ className }: DirectionalArrowProps) {
  const classes = ["ui-directional-arrow", className].filter(Boolean).join(" ");

  return (
    <svg aria-hidden="true" className={classes} focusable="false" viewBox="0 0 24 24">
      <path d="M4 12h16M15 7l5 5-5 5" />
    </svg>
  );
}
