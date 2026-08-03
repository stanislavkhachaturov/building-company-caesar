import { site } from "@/lib/site";

/**
 * Знак компании: шестиугольник с профилем шлема центуриона.
 * Перерисован в вектор с визитки, чтобы оставаться чётким на любом размере.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="presentation" aria-hidden="true">
      <defs>
        <linearGradient id="cezar-hex" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#F9BE5C" />
          <stop offset="0.45" stopColor="#EC9631" />
          <stop offset="1" stopColor="#C2680F" />
        </linearGradient>
      </defs>

      <path
        d="M27 5 H73 L96 50 L73 95 H27 L4 50 Z"
        fill="url(#cezar-hex)"
        stroke="url(#cezar-hex)"
        strokeWidth="7"
        strokeLinejoin="round"
      />

      <g transform="translate(50 51) scale(0.7) translate(-51 -50)">
        <g fill="none" stroke="#111418" strokeLinecap="butt">
          <path d="M20 82 C16 40 36 15 60 15 C72 15 82 20 89 30" strokeWidth="14" />
          <path d="M40 82 C37 52 47 33 61 33 C69 33 75 37 80 44" strokeWidth="12" />
        </g>
        <path d="M46 67 C47 57 55 50 65 53 L80 47 L75 60 L86 67 L65 73 L59 91 L48 74 Z" fill="#111418" />
        <circle cx="55" cy="62" r="3.8" fill="url(#cezar-hex)" />
      </g>
    </svg>
  );
}

export function Logo({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark className="h-10 w-10 shrink-0 drop-shadow-[0_2px_10px_rgba(240,146,31,0.35)] sm:h-11 sm:w-11" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.32rem] font-semibold tracking-[0.14em] text-fog-100 uppercase sm:text-[1.45rem]">
          Цезарь
        </span>
        {!compact && (
          <span className="mt-1 text-[0.6rem] font-medium tracking-[0.22em] text-fog-400 uppercase">
            {site.tagline.split(" ").slice(0, 2).join(" ")}
          </span>
        )}
      </span>
    </span>
  );
}
