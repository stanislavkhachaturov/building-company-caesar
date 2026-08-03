import { ArrowUpRight, Check } from "lucide-react";
import { ServiceIcon } from "./icons";
import { SectionHeading } from "./ui/SectionHeading";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { services } from "@/lib/site";

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
      <div
        className="absolute top-0 right-0 -z-10 h-[30rem] w-[30rem] translate-x-1/3 rounded-full bg-brand-600/8 blur-[140px]"
        aria-hidden="true"
      />

      <div className="shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Что мы делаем"
            title={
              <>
                Услуги <span className="text-gradient-brand">полного цикла</span>
              </>
            }
            description="Шесть направлений, которые закрывают объект целиком. Можно заказать всё сразу под ключ или взять одну задачу — например, только демонтаж или только вывоз мусора."
          />
        </div>

        <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service, index) => (
            <RevealItem key={service.id} as="article">
              <div className="group grain relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-900/80 p-7 transition-all duration-500 ease-brand hover:-translate-y-1.5 hover:border-brand-500/40 hover:bg-ink-850">
                {/* Свечение под курсором */}
                <div
                  className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full bg-brand-500/0 blur-3xl transition-colors duration-500 group-hover:bg-brand-500/14"
                  aria-hidden="true"
                />

                <span
                  className="font-display absolute top-5 right-6 text-[3.4rem] leading-none text-white/4 transition-colors duration-500 group-hover:text-brand-500/12"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="hexagon relative grid h-14 w-14 place-items-center bg-gradient-to-br from-brand-400 to-brand-600 text-ink-950 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-6">
                  <ServiceIcon name={service.icon} className="h-6 w-6" />
                </span>

                <h3 className="relative mt-6 text-[1.35rem] text-fog-100 uppercase">{service.title}</h3>
                <p className="relative mt-3 text-[0.92rem] leading-relaxed text-fog-400">{service.description}</p>

                <ul className="relative mt-6 grid gap-2 border-t border-white/6 pt-5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[0.85rem] text-fog-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" strokeWidth={2.6} />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contacts"
                  className="relative mt-6 inline-flex items-center gap-2 text-[0.84rem] font-semibold text-brand-400 transition-colors hover:text-brand-300"
                >
                  Узнать стоимость
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
