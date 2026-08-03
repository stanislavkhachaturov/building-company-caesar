"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, FileText, Phone, ShieldCheck, Ruler } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { ButtonLink } from "./ui/Button";
import { images } from "@/lib/images.generated";
import { site } from "@/lib/site";

const TITLE_LINES = [
  ["Полный", "цикл"],
  ["строительных", "работ"],
];

const GUARANTEES = [
  { icon: Ruler, title: "Замер бесплатно", text: "Выезжаем в день обращения" },
  { icon: FileText, title: "Договор и смета", text: "Фиксируем цену и сроки" },
  { icon: ShieldCheck, title: "Гарантия 2 года", text: "На все виды работ" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.12]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, reduced ? 1 : 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-20 pb-6 lg:pt-32 lg:pb-8"
    >
      {/* Фон: фотография с параллаксом и слоями затемнения */}
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0 -z-30 will-change-transform">
        <Image
          src={images.hero.src}
          alt="Строительство многоэтажных зданий"
          fill
          priority
          sizes="100vw"
          placeholder="blur"
          blurDataURL={images.hero.blurDataURL}
          className="object-cover object-center"
        />
      </motion.div>

      <div
        className="absolute inset-0 -z-20 bg-[linear-gradient(105deg,var(--color-ink-950)_8%,rgba(8,9,11,0.92)_38%,rgba(8,9,11,0.55)_65%,rgba(8,9,11,0.8)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-20 bg-[linear-gradient(to_top,var(--color-ink-950)_2%,transparent_45%)]"
        aria-hidden="true"
      />
      <div className="blueprint-grid absolute inset-0 -z-20 opacity-50" aria-hidden="true" />
      <div
        className="absolute top-1/4 -left-40 -z-20 h-[34rem] w-[34rem] rounded-full bg-brand-600/16 blur-[130px]"
        aria-hidden="true"
      />

      {/* Оранжевый шеврон — тот же приём, что на визитке */}
      <div
        className="absolute inset-y-0 left-[52%] -z-10 hidden w-40 -skew-x-12 bg-gradient-to-b from-brand-500/0 via-brand-500/70 to-brand-500/0 opacity-30 lg:block"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 left-[60%] -z-10 hidden w-2 -skew-x-12 bg-brand-500/60 lg:block"
        aria-hidden="true"
      />

      {/* Парящие шестиугольники */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block" aria-hidden="true">
        <span className="hexagon absolute top-[22%] right-[12%] h-16 w-16 animate-float bg-brand-500/12" />
        <span className="hexagon absolute top-[58%] right-[26%] h-8 w-8 animate-float-slow bg-brand-400/20" />
        <span className="hexagon absolute top-[38%] right-[6%] h-24 w-24 animate-float-slow bg-white/4" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="shell relative flex flex-1 flex-col justify-end pb-8 lg:pb-14"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.24, 1] }}
          className="inline-flex w-fit items-center gap-2.5 self-start rounded-full border border-brand-500/25 bg-brand-500/10 px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.18em] text-brand-300 uppercase backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand-400" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-400" />
          </span>
          {site.regionShort}
          <span className="hidden sm:inline">· {site.responseTime.toLowerCase()}</span>
        </motion.span>

        <h1 className="mt-4 max-w-4xl text-[2.6rem] sm:mt-6 leading-[0.98] tracking-tight text-fog-100 uppercase sm:text-[4rem] lg:text-[5.2rem]">
          {TITLE_LINES.map((line, lineIndex) => (
            <span key={lineIndex} className="block overflow-hidden">
              {line.map((word, wordIndex) => (
                <motion.span
                  key={word}
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{
                    duration: 0.85,
                    delay: 0.12 + lineIndex * 0.12 + wordIndex * 0.08,
                    ease: [0.22, 0.61, 0.24, 1],
                  }}
                  className="mr-[0.28em] inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          ))}
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.46, ease: [0.22, 0.61, 0.24, 1] }}
            className="text-gradient-brand mt-1 block"
          >
            От фундамента до отделки
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-5 max-w-xl text-[1rem] sm:mt-7 leading-relaxed text-fog-300 sm:text-[1.12rem]"
        >
          Строим дома, делаем ремонт квартир и берём на себя всё, что между: демонтаж, кровлю, отделку и вывоз
          мусора. Свои бригады, договор и понятная смета — в Нальчике, по КБР и на КМВ.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72 }}
          className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center"
        >
          <ButtonLink href="#contacts" size="lg">
            Рассчитать стоимость
            <ArrowRight className="h-[1.05rem] w-[1.05rem] transition-transform duration-300 group-hover/btn:translate-x-1" />
          </ButtonLink>
          <ButtonLink href={site.whatsapp} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg">
            <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />
            Написать в WhatsApp
          </ButtonLink>
          <a
            href={site.phoneHref}
            className="group inline-flex items-center gap-3 px-1 py-2 sm:ml-3"
            aria-label={`Позвонить по номеру ${site.phoneDisplay}`}
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-brand-400 transition-colors duration-300 group-hover:border-brand-500/60 group-hover:bg-brand-500/10">
              <Phone className="h-[1.05rem] w-[1.05rem]" strokeWidth={2.1} />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-[1.1rem] tracking-wide text-fog-100">{site.phoneDisplay}</span>
              <span className="text-[0.72rem] text-fog-500">{site.owner}</span>
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Нижняя стеклянная панель с гарантиями */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.85, ease: [0.22, 0.61, 0.24, 1] }}
        className="shell relative"
      >
        <div className="grain relative overflow-hidden rounded-2xl border border-white/8 bg-white/4 backdrop-blur-md">
          <ul className="grid grid-cols-3 divide-x divide-white/8">
            {GUARANTEES.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="flex flex-col items-center gap-2 px-2 py-3.5 text-center sm:flex-row sm:gap-4 sm:px-5 sm:py-4 sm:text-left lg:px-7 lg:py-5"
              >
                <span className="hexagon grid h-9 w-9 shrink-0 place-items-center bg-gradient-to-br from-brand-400 to-brand-600 text-ink-950 sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 sm:h-[1.05rem] sm:w-[1.05rem]" strokeWidth={2.1} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.76rem] leading-tight font-semibold text-fog-100 sm:text-[0.9rem]">
                    {title}
                  </span>
                  <span className="mt-1 hidden truncate text-[0.78rem] text-fog-500 sm:mt-0 sm:block">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      <span
        className="pointer-events-none absolute top-1/2 right-6 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex"
        aria-hidden="true"
      >
        <span className="text-[0.62rem] font-semibold tracking-[0.3em] text-fog-500 uppercase [writing-mode:vertical-rl]">
          Листайте вниз
        </span>
        <span className="h-9 w-5 rounded-full border border-white/15">
          <span className="mx-auto mt-1.5 block h-1.5 w-1 animate-scroll-hint rounded-full bg-brand-400" />
        </span>
      </span>
    </section>
  );
}
