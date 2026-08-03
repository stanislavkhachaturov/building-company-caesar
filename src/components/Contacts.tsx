"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { CircleCheckBig, Clock, MapPin, Phone, Send, User } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { SectionHeading } from "./ui/SectionHeading";
import { Button, ButtonLink } from "./ui/Button";
import { Reveal } from "./ui/Reveal";
import { images } from "@/lib/images.generated";
import { services, site } from "@/lib/site";

/** Приводит ввод к виду +7 (999) 123-45-67 по мере набора. */
function formatPhone(input: string) {
  let digits = input.replace(/\D/g, "");
  if (digits.startsWith("8")) digits = `7${digits.slice(1)}`;
  if (digits && !digits.startsWith("7")) digits = `7${digits}`;
  digits = digits.slice(0, 11);

  const [, a = "", b = "", c = "", d = ""] =
    /^7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/.exec(digits) ?? [];

  let result = "+7";
  if (a) result += ` (${a}`;
  if (a.length === 3) result += ")";
  if (b) result += ` ${b}`;
  if (c) result += `-${c}`;
  if (d) result += `-${d}`;
  return result;
}

const CONTACT_CARDS = [
  { icon: Phone, label: "Телефон", value: site.phoneDisplay, href: site.phoneHref, note: site.owner },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "Открыть переписку",
    href: site.whatsapp,
    note: "Ответим за 15 минут",
  },
  { icon: MapPin, label: "Работаем", value: "Нальчик, КБР и КМВ", note: "Выезд на объект бесплатный" },
  { icon: Clock, label: "График", value: "Ежедневно 8:00–21:00", note: "Без выходных" },
];

export function Contacts() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.trim().length < 2) {
      setError("Напишите, как к вам обращаться");
      return;
    }
    if (phone.replace(/\D/g, "").length !== 11) {
      setError("Проверьте номер телефона — нужно 11 цифр");
      return;
    }
    setError(null);

    const lines = [
      "Здравствуйте! Заявка с сайта СК «ЦЕЗАРЬ».",
      `Имя: ${name.trim()}`,
      `Телефон: ${phone}`,
      service && `Услуга: ${service}`,
      comment.trim() && `Комментарий: ${comment.trim()}`,
    ].filter(Boolean);

    window.open(`${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setService("");
    setComment("");
    setSent(false);
  };

  const fieldClass =
    "w-full rounded-xl border border-white/10 bg-ink-950/60 px-4 py-3.5 text-[0.93rem] text-fog-100 placeholder:text-fog-500 transition-colors duration-300 outline-none focus:border-brand-500/70 focus:bg-ink-950";

  return (
    <section id="contacts" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
      <Image
        src={images.cta.src}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        blurDataURL={images.cta.blurDataURL}
        className="-z-30 object-cover opacity-25"
      />
      <div
        className="absolute inset-0 -z-20 bg-[linear-gradient(115deg,var(--color-ink-950)_25%,rgba(8,9,11,0.9)_60%,rgba(8,9,11,0.97)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute -top-20 left-1/3 -z-20 h-[28rem] w-[28rem] rounded-full bg-brand-600/12 blur-[140px]"
        aria-hidden="true"
      />

      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Контакты"
            title={
              <>
                Обсудим <span className="text-gradient-brand">ваш объект</span>
              </>
            }
            description="Позвоните или оставьте заявку — перезвоним, зададим несколько уточняющих вопросов и назовём ориентир по стоимости ещё до выезда."
          />

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {CONTACT_CARDS.map(({ icon: Icon, label, value, href, note }, index) => {
              const inner = (
                <>
                  <span className="hexagon grid h-11 w-11 shrink-0 place-items-center bg-gradient-to-br from-brand-400 to-brand-600 text-ink-950 transition-transform duration-500 group-hover:scale-105">
                    <Icon className="h-[1.1rem] w-[1.1rem]" />
                  </span>
                  <span className="min-w-0 leading-tight">
                    <span className="block text-[0.72rem] font-semibold tracking-[0.16em] text-fog-500 uppercase">
                      {label}
                    </span>
                    <span className="mt-1.5 block text-[0.98rem] font-semibold text-fog-100">{value}</span>
                    <span className="mt-1 block text-[0.78rem] text-fog-500">{note}</span>
                  </span>
                </>
              );

              const className =
                "group grain relative flex h-full items-start gap-4 overflow-hidden rounded-2xl border border-white/8 bg-ink-900/70 p-5 backdrop-blur-sm transition-all duration-500 ease-brand";

              return (
                <Reveal key={label} delay={index * 0.07}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={`${className} hover:-translate-y-1 hover:border-brand-500/40`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={className}>{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-4 flex flex-wrap gap-2">
              {site.cities.map((city) => (
                <span
                  key={city}
                  className="rounded-full border border-white/8 bg-white/4 px-3.5 py-1.5 text-[0.78rem] text-fog-400"
                >
                  {city}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal direction="left">
          <div className="grain relative overflow-hidden rounded-3xl border border-white/10 bg-ink-900/85 p-6 backdrop-blur-xl sm:p-9">
            <span
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/70 to-transparent"
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 }}
                  className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                >
                  <span className="hexagon grid h-16 w-16 place-items-center bg-gradient-to-br from-brand-400 to-brand-600 text-ink-950">
                    <CircleCheckBig className="h-7 w-7" strokeWidth={2} />
                  </span>
                  <h3 className="mt-6 text-[1.5rem] text-fog-100 uppercase">Заявка собрана</h3>
                  <p className="mt-3 max-w-sm text-[0.92rem] leading-relaxed text-fog-400">
                    Мы открыли WhatsApp с готовым сообщением — отправьте его, и мы ответим в течение 15 минут. Если
                    окно не открылось, позвоните напрямую.
                  </p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <ButtonLink href={site.phoneHref} size="lg">
                      <Phone className="h-[1.05rem] w-[1.05rem]" />
                      {site.phoneDisplay}
                    </ButtonLink>
                    <Button type="button" variant="outline" size="lg" onClick={resetForm}>
                      Заполнить заново
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <h3 className="text-[1.5rem] text-fog-100 uppercase sm:text-[1.7rem]">Заявка на расчёт</h3>
                  <p className="mt-2.5 text-[0.88rem] text-fog-400">
                    Заполните три поля — остальное уточним при разговоре.
                  </p>

                  <div className="mt-7 grid gap-4">
                    <label className="block">
                      <span className="mb-2 block text-[0.78rem] font-semibold tracking-wide text-fog-400">
                        Как вас зовут <span className="text-brand-500">*</span>
                      </span>
                      <span className="relative block">
                        <User
                          className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-fog-500"
                          aria-hidden="true"
                        />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Например, Аслан"
                          autoComplete="name"
                          className={`${fieldClass} pl-11`}
                        />
                      </span>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[0.78rem] font-semibold tracking-wide text-fog-400">
                        Телефон <span className="text-brand-500">*</span>
                      </span>
                      <span className="relative block">
                        <Phone
                          className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-fog-500"
                          aria-hidden="true"
                        />
                        <input
                          type="tel"
                          inputMode="tel"
                          value={phone}
                          onChange={(e) => setPhone(formatPhone(e.target.value))}
                          onFocus={() => !phone && setPhone("+7 (")}
                          placeholder="+7 (___) ___-__-__"
                          autoComplete="tel"
                          className={`${fieldClass} pl-11`}
                        />
                      </span>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[0.78rem] font-semibold tracking-wide text-fog-400">
                        Что нужно сделать
                      </span>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className={`${fieldClass} appearance-none bg-[length:1.1rem] bg-[position:right_1rem_center] bg-no-repeat pr-11 ${
                          service ? "" : "text-fog-500"
                        }`}
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7482' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
                        }}
                      >
                        <option value="">Выберите услугу</option>
                        {services.map((item) => (
                          <option key={item.id} value={item.title} className="bg-ink-900 text-fog-100">
                            {item.title}
                          </option>
                        ))}
                        <option value="Другое" className="bg-ink-900 text-fog-100">
                          Другое
                        </option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[0.78rem] font-semibold tracking-wide text-fog-400">
                        Детали объекта
                      </span>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={3}
                        placeholder="Площадь, адрес, сроки — всё, что считаете важным"
                        className={`${fieldClass} resize-none`}
                      />
                    </label>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 text-[0.83rem] text-red-400"
                        role="alert"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <Button type="submit" size="lg" className="mt-7 w-full">
                    <Send className="h-[1.05rem] w-[1.05rem]" />
                    Отправить заявку
                  </Button>

                  <p className="mt-4 text-center text-[0.74rem] leading-relaxed text-fog-500">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных. Заявка уходит напрямую в
                    WhatsApp — без рассылок и спама.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
