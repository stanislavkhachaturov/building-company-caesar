import Image from "next/image";
import { CircleCheckBig } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "./ui/Reveal";
import { Counter } from "./ui/Counter";
import { LogoMark } from "./Logo";
import { images } from "@/lib/images.generated";
import { advantages, site, stats } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32">
      <div className="absolute inset-0 -z-10 bg-ink-900" aria-hidden="true" />
      <div className="blueprint-grid absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <div
        className="absolute bottom-0 left-1/4 -z-10 h-80 w-[36rem] rounded-full bg-brand-700/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Фотография в оранжевой рамке со смещением */}
          <Reveal direction="right" className="relative">
            <div className="relative mx-auto max-w-lg lg:mx-0">
              <span
                className="absolute -top-5 -left-5 hidden h-full w-full rounded-2xl border border-brand-500/35 sm:block"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-2xl">
                <Image
                  src={images.about.src}
                  alt="Прораб СК «ЦЕЗАРЬ» за проектной документацией"
                  width={images.about.width}
                  height={images.about.height}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  placeholder="blur"
                  blurDataURL={images.about.blurDataURL}
                  className="h-full w-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>

              {/* Плашка с подписью руководителя */}
              <div className="grain absolute -right-3 -bottom-6 flex items-center gap-3.5 overflow-hidden rounded-xl border border-white/10 bg-ink-850/90 px-4 py-3.5 backdrop-blur-md sm:-right-6">
                <LogoMark className="h-11 w-11 shrink-0" />
                <span className="leading-tight">
                  <span className="block text-[0.92rem] font-semibold text-fog-100">{site.owner}</span>
                  <span className="block text-[0.76rem] text-fog-500">{site.ownerRole}</span>
                </span>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading
              eyebrow="О компании"
              title={
                <>
                  Строительная <span className="text-gradient-brand">компания «Цезарь»</span>
                </>
              }
              description="Мы собрали команду, которая умеет вести объект от первого колышка до финальной уборки. За каждым направлением закреплён свой мастер, а за объектом целиком — прораб, который всегда на связи."
            />

            <RevealGroup className="mt-9 grid gap-x-6 gap-y-5 sm:grid-cols-2" delay={0.1}>
              {advantages.map((item) => (
                <RevealItem key={item.title}>
                  <div className="flex gap-3.5">
                    <CircleCheckBig className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" strokeWidth={2} />
                    <span>
                      <span className="block text-[0.95rem] font-semibold text-fog-100">{item.title}</span>
                      <span className="mt-1 block text-[0.86rem] leading-relaxed text-fog-400">{item.text}</span>
                    </span>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* Цифры */}
        <RevealGroup className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/8 lg:mt-24 lg:grid-cols-4">
          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <div className="group h-full bg-ink-900 px-6 py-8 text-center transition-colors duration-500 hover:bg-ink-850 lg:px-8 lg:py-10">
                <span className="font-display block text-[2.4rem] leading-none text-fog-100 lg:text-[3.2rem]">
                  <Counter value={stat.value} />
                  <span className="text-gradient-brand">{stat.suffix}</span>
                </span>
                <span className="mt-3 block text-[0.82rem] tracking-wide text-fog-400 lg:text-[0.88rem]">
                  {stat.label}
                </span>
                <span
                  className="mx-auto mt-4 block h-px w-10 bg-brand-500/40 transition-all duration-500 group-hover:w-16 group-hover:bg-brand-500"
                  aria-hidden="true"
                />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
