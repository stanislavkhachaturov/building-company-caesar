"use client";

import { motion } from "motion/react";
import { SectionHeading } from "./ui/SectionHeading";
import { ButtonLink } from "./ui/Button";
import { WhatsAppIcon } from "./icons";
import { processSteps, site } from "@/lib/site";

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden py-24 lg:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Как мы работаем"
          title={
            <>
              Пять шагов <span className="text-gradient-brand">до готового объекта</span>
            </>
          }
          description="Прозрачный процесс без сюрпризов: вы всегда знаете, что происходит на объекте сегодня и что будет завтра."
          align="center"
        />

        <div className="relative mt-16 lg:mt-20">
          {/* Линия-соединитель: рисуется при попадании секции во вьюпорт */}
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.22, 0.61, 0.24, 1] }}
            className="absolute top-7 right-[10%] left-[10%] hidden h-px origin-left bg-gradient-to-r from-brand-500/10 via-brand-500/60 to-brand-500/10 lg:block"
            aria-hidden="true"
          />
          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.22, 0.61, 0.24, 1] }}
            className="absolute top-4 bottom-8 left-[1.72rem] w-px origin-top bg-gradient-to-b from-brand-500/60 via-brand-500/35 to-transparent lg:hidden"
            aria-hidden="true"
          />

          <ol className="grid gap-9 lg:grid-cols-5 lg:gap-6">
            {processSteps.map((step, index) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 0.61, 0.24, 1] }}
                className="group relative flex gap-5 lg:flex-col lg:gap-0 lg:text-center"
              >
                <span className="relative z-10 shrink-0 lg:mx-auto">
                  <span className="hexagon grid h-14 w-14 place-items-center bg-ink-800 ring-1 ring-white/10 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-brand-400 group-hover:to-brand-600">
                    <span className="font-display text-[1.35rem] text-brand-400 transition-colors duration-500 group-hover:text-ink-950">
                      {index + 1}
                    </span>
                  </span>
                </span>

                <span className="lg:mt-6">
                  <span className="block text-[1.05rem] font-semibold text-fog-100 lg:text-[1.02rem]">
                    {step.title}
                  </span>
                  <span className="mt-2.5 block text-[0.88rem] leading-relaxed text-fog-400">{step.text}</span>
                </span>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-[0.95rem] text-fog-400">
            Первый шаг занимает пару минут — расскажите, что нужно сделать.
          </p>
          <ButtonLink href={site.whatsapp} target="_blank" rel="noopener noreferrer" variant="whatsapp" size="lg">
            <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />
            Обсудить объект в WhatsApp
          </ButtonLink>
        </motion.div>
      </div>
    </section>
  );
}
