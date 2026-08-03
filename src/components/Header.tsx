"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./icons";
import { ButtonLink } from "./ui/Button";
import { navLinks, site } from "@/lib/site";

const SECTION_IDS = navLinks.map((l) => l.href.slice(1));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Подсветка пункта меню для секции, которая сейчас в фокусе экрана
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5] },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Блокируем прокрутку под открытым мобильным меню
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-brand ${
          scrolled || menuOpen
            ? "border-b border-white/8 bg-ink-950/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-18 items-center justify-between gap-6 py-3 lg:h-20">
          <a href="#top" className="shrink-0" aria-label={`${site.name} — на главную`}>
            <Logo />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
            {navLinks.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-[0.86rem] font-medium transition-colors duration-300 ${
                    isActive ? "text-fog-100" : "text-fog-400 hover:text-fog-100"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 340, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 text-[0.92rem] font-semibold text-fog-100 transition-colors hover:text-brand-400 xl:flex"
            >
              <Phone className="h-4 w-4 text-brand-500" strokeWidth={2.2} />
              {site.phoneDisplay}
            </a>

            {/* Обёртка, а не класс на кнопке: у неё уже есть свой display-утилити */}
            <span className="hidden sm:block">
              <ButtonLink href="#contacts">Оставить заявку</ButtonLink>
            </span>

            <a
              href={site.phoneHref}
              aria-label="Позвонить"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/5 text-fog-100 transition-colors hover:border-brand-500/60 hover:text-brand-400 sm:hidden"
            >
              <Phone className="h-[1.15rem] w-[1.15rem]" strokeWidth={2} />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={menuOpen}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/5 text-fog-100 transition-colors hover:border-brand-500/60 lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="grid place-items-center"
                >
                  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <motion.div
          style={{ scaleX: progress }}
          className="h-px origin-left bg-gradient-to-r from-brand-400 via-brand-500 to-brand-700"
          aria-hidden="true"
        />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-ink-950/97 pt-24 backdrop-blur-xl lg:hidden"
          >
            <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

            <nav className="shell relative flex flex-1 flex-col gap-1 overflow-y-auto pb-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -26 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + i * 0.055, duration: 0.4, ease: [0.22, 0.61, 0.24, 1] }}
                  className="group flex items-baseline gap-4 border-b border-white/6 py-4"
                >
                  <span className="font-display text-xs text-brand-500/80 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-2xl text-fog-100 uppercase transition-colors group-hover:text-brand-400">
                    {link.label}
                  </span>
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.45 }}
                className="mt-8 flex flex-col gap-3"
              >
                <ButtonLink href={site.phoneHref} size="lg" className="w-full">
                  <Phone className="h-[1.05rem] w-[1.05rem]" />
                  {site.phoneDisplay}
                </ButtonLink>
                <ButtonLink
                  href={site.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  size="lg"
                  className="w-full"
                >
                  <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />
                  Написать в WhatsApp
                </ButtonLink>
                <p className="mt-2 text-center text-[0.8rem] text-fog-500">
                  {site.hours} · {site.regionShort}
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
