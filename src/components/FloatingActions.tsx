"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { site } from "@/lib/site";

/** Плавающие кнопки связи и подъёма наверх — появляются после первого экрана. */
export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ duration: 0.32, ease: [0.22, 0.61, 0.24, 1] }}
          className="fixed right-4 bottom-4 z-40 flex flex-col items-center gap-3 sm:right-6 sm:bottom-6"
        >
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Наверх"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-ink-900/85 text-fog-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/60 hover:text-brand-400"
          >
            <ArrowUp className="h-[1.05rem] w-[1.05rem]" />
          </button>

          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в WhatsApp"
            className="relative grid h-14 w-14 place-items-center rounded-full bg-[#20b95c] text-white shadow-[0_12px_30px_-8px_rgba(32,185,92,0.75)] transition-transform duration-300 hover:scale-105"
          >
            <span
              className="absolute inset-0 animate-pulse-ring rounded-full bg-[#20b95c]/60"
              aria-hidden="true"
            />
            <WhatsAppIcon className="relative h-6 w-6" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
