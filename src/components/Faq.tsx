"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { faq } from "@/lib/site";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-ink-900" aria-hidden="true" />
      <div className="blueprint-grid absolute inset-0 -z-10 opacity-70" aria-hidden="true" />

      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Вопросы"
            title={
              <>
                Частые <span className="text-gradient-brand">вопросы</span>
              </>
            }
            description="Если нужного вопроса нет в списке — напишите, ответим лично и без шаблонных фраз."
          />
        </div>

        <ul className="divide-y divide-white/8 border-y border-white/8">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <li key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start justify-between gap-6 py-6 text-left"
                  >
                    <span
                      className={`text-[1.02rem] font-semibold transition-colors duration-300 sm:text-[1.08rem] ${
                        isOpen ? "text-brand-400" : "text-fog-100 group-hover:text-brand-400"
                      }`}
                    >
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 0.61, 0.24, 1] }}
                      className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                        isOpen
                          ? "border-brand-500/60 bg-brand-500/15 text-brand-400"
                          : "border-white/12 bg-white/4 text-fog-300 group-hover:border-brand-500/50"
                      }`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.2} />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: [0.22, 0.61, 0.24, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pr-12 pb-7 text-[0.93rem] leading-relaxed text-fog-400">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
