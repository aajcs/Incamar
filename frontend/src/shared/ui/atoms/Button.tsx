import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
};

const base =
  "inline-flex items-center justify-center rounded-[var(--radius-2)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-[var(--primary)] text-[var(--primary-contrast)] hover:brightness-95 focus-visible:ring-[var(--primary)]",
  ghost:
    "bg-transparent text-[var(--fg)] border border-[var(--border)] hover:bg-[color-mix(in_oklab,var(--fg)10%,transparent)]",
} as const;

const sizes = {
  sm: "h-8 px-3 text-sm gap-2",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-3",
} as const;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}

export default Button;
