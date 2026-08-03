import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", className = "" }: Props) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      <Reveal>
        <span
          className={`inline-flex items-center gap-2.5 text-[0.7rem] font-semibold tracking-[0.24em] text-brand-500 uppercase ${
            centered ? "justify-center" : ""
          }`}
        >
          <span className="hexagon inline-block h-2 w-2 bg-brand-500" aria-hidden="true" />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="mt-4 text-[2rem] leading-[1.08] text-fog-100 uppercase sm:text-[2.6rem] lg:text-[3.1rem]">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-[0.98rem] leading-relaxed text-fog-400 sm:text-[1.05rem]">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
