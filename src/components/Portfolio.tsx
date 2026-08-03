"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { images } from "@/lib/images.generated";
import { projectCategories, projects, type ProjectCategory } from "@/lib/site";

type Filter = ProjectCategory | "all";

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const visible = useMemo(
    () => projects.filter((p) => filter === "all" || p.category === filter),
    [filter],
  );

  const open = lightbox !== null ? visible[lightbox] : null;

  const step = (delta: number) =>
    setLightbox((current) => (current === null ? null : (current + delta + visible.length) % visible.length));

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, visible.length]);

  return (
    <section id="portfolio" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-ink-900" aria-hidden="true" />
      <div
        className="absolute top-1/3 -right-40 -z-10 h-[32rem] w-[32rem] rounded-full bg-brand-600/8 blur-[140px]"
        aria-hidden="true"
      />

      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Портфолио"
            title={
              <>
                Наши <span className="text-gradient-brand">работы</span>
              </>
            }
            description="Дома, квартиры и отдельные виды работ, которые мы сдали заказчикам в Нальчике, по республике и на Кавминводах."
          />

          <div className="flex flex-wrap gap-2 lg:shrink-0" role="tablist" aria-label="Фильтр работ">
            {projectCategories.map((category) => {
              const isActive = filter === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setFilter(category.id);
                    setLightbox(null);
                  }}
                  className={`relative rounded-full px-4 py-2 text-[0.83rem] font-medium transition-colors duration-300 ${
                    isActive ? "text-ink-950" : "text-fog-400 hover:text-fog-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="portfolio-filter"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div layout className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => {
              const image = images[project.image];
              return (
                <motion.button
                  key={project.title}
                  type="button"
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.42, ease: [0.22, 0.61, 0.24, 1] }}
                  onClick={() => setLightbox(index)}
                  className="group relative block aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/8 text-left"
                  aria-label={`Открыть фото: ${project.title}`}
                >
                  <Image
                    src={image.src}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL={image.blurDataURL}
                    className="object-cover transition-transform duration-700 ease-brand group-hover:scale-108"
                  />

                  <span
                    className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95"
                    aria-hidden="true"
                  />

                  <span className="absolute inset-x-0 bottom-0 p-5">
                    <span className="block translate-y-1 text-[0.72rem] font-semibold tracking-[0.16em] text-brand-400 uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      {projectCategories.find((c) => c.id === project.category)?.label}
                    </span>
                    <span className="mt-1.5 block text-[1.05rem] leading-snug font-semibold text-fog-100">
                      {project.title}
                    </span>
                    <span className="mt-1 block text-[0.8rem] text-fog-400">{project.meta}</span>
                  </span>

                  <span
                    className="absolute top-4 right-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full border border-white/20 bg-ink-950/60 text-fog-100 opacity-0 backdrop-blur-sm transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-0 z-[60] grid place-items-center bg-ink-950/94 p-4 backdrop-blur-md sm:p-8"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Закрыть"
              className="absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/5 text-fog-100 transition-colors hover:border-brand-500/60 hover:text-brand-400"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.figure
              key={open.title}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 0.61, 0.24, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl"
            >
              <Image
                src={images[open.image].src}
                alt={open.title}
                width={images[open.image].width}
                height={images[open.image].height}
                placeholder="blur"
                blurDataURL={images[open.image].blurDataURL}
                className="max-h-[72vh] w-full rounded-2xl object-cover"
              />
              <figcaption className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <span>
                  <span className="block text-[1.15rem] font-semibold text-fog-100">{open.title}</span>
                  <span className="mt-1 block text-[0.85rem] text-fog-400">{open.meta}</span>
                </span>

                <span className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Предыдущее фото"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-fog-100 transition-colors hover:border-brand-500/60 hover:text-brand-400"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <span className="min-w-14 text-center text-[0.8rem] text-fog-500 tabular-nums">
                    {(lightbox ?? 0) + 1} / {visible.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Следующее фото"
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/5 text-fog-100 transition-colors hover:border-brand-500/60 hover:text-brand-400"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
