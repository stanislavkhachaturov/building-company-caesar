import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline" | "whatsapp";
type Size = "md" | "lg";

const BASE =
  "group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold whitespace-nowrap transition-all duration-300 ease-brand disabled:cursor-not-allowed disabled:opacity-60";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-brand-400 to-brand-600 text-ink-950 shadow-[0_10px_30px_-10px_rgba(240,146,31,0.7)] hover:shadow-[0_16px_40px_-12px_rgba(240,146,31,0.85)] hover:-translate-y-0.5",
  outline:
    "border border-white/15 bg-white/5 text-fog-100 backdrop-blur-sm hover:border-brand-500/60 hover:bg-brand-500/10 hover:-translate-y-0.5",
  whatsapp:
    "bg-[#20b95c] text-white shadow-[0_10px_30px_-10px_rgba(32,185,92,0.7)] hover:bg-[#1ca551] hover:-translate-y-0.5",
};

const SIZES: Record<Size, string> = {
  md: "px-5 py-2.5 text-[0.86rem]",
  lg: "px-7 py-3.5 text-[0.95rem]",
};

function Shine() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-opacity duration-300 group-hover/btn:animate-shimmer group-hover/btn:opacity-100"
    />
  );
}

type LinkProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function ButtonLink({ variant = "primary", size = "md", className = "", children, ...rest }: LinkProps) {
  return (
    <a className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...rest}>
      <Shine />
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </a>
  );
}

type Props = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = "primary", size = "md", className = "", children, ...rest }: Props) {
  return (
    <button className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`} {...rest}>
      <Shine />
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </button>
  );
}
