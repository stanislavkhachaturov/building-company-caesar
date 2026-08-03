import { Quote, Star } from "lucide-react";
import { SectionHeading } from "./ui/SectionHeading";
import { RevealGroup, RevealItem } from "./ui/Reveal";
import { reviews } from "@/lib/site";

export function Reviews() {
  return (
    <section id="reviews" className="relative overflow-hidden py-24 lg:py-32">
      <div
        className="absolute bottom-0 left-0 -z-10 h-[26rem] w-[26rem] -translate-x-1/3 rounded-full bg-brand-700/10 blur-[130px]"
        aria-hidden="true"
      />

      <div className="shell">
        <SectionHeading
          eyebrow="Отзывы"
          title={
            <>
              Что говорят <span className="text-gradient-brand">заказчики</span>
            </>
          }
          description="Большая часть новых объектов приходит к нам по рекомендации — это лучший показатель работы."
          align="center"
        />

        <RevealGroup className="mt-14 grid gap-4 lg:mt-16 lg:grid-cols-2">
          {reviews.map((review) => (
            <RevealItem key={review.name} as="article">
              <figure className="group grain relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-900/70 p-7 transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-brand-500/35 lg:p-8">
                <Quote
                  className="absolute -top-3 right-5 h-20 w-20 rotate-180 text-white/3 transition-colors duration-500 group-hover:text-brand-500/10"
                  aria-hidden="true"
                />

                <div className="relative flex items-center gap-1" aria-label="Оценка 5 из 5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-brand-500 text-brand-500" aria-hidden="true" />
                  ))}
                </div>

                <blockquote className="relative mt-5 flex-1 text-[0.95rem] leading-relaxed text-fog-300">
                  {review.text}
                </blockquote>

                <figcaption className="relative mt-7 flex items-center gap-4 border-t border-white/6 pt-6">
                  <span className="hexagon grid h-11 w-11 shrink-0 place-items-center bg-gradient-to-br from-brand-400 to-brand-600">
                    <span className="font-display text-[1.05rem] text-ink-950">{review.name.charAt(0)}</span>
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-[0.95rem] font-semibold text-fog-100">
                      {review.name}
                      <span className="ml-2 text-[0.8rem] font-normal text-fog-500">{review.city}</span>
                    </span>
                    <span className="mt-1 block truncate text-[0.8rem] text-brand-400/90">{review.service}</span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
