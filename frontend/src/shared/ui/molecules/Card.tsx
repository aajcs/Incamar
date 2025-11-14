import React from "react";

export function Card({
  title,
  children,
  footer,
  className = "",
}: {
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[var(--radius-2)] border border-[var(--border)] bg-[var(--surface)] text-[var(--fg)] shadow-sm ${className}`}
    >
      {title ? (
        <header className="px-4 py-3 border-b border-[var(--border)] text-sm font-semibold">
          {title}
        </header>
      ) : null}
      <div className="p-4">{children}</div>
      {footer ? (
        <footer className="px-4 py-3 border-t border-[var(--border)]">
          {footer}
        </footer>
      ) : null}
    </section>
  );
}

export default Card;
