import { Clock, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./icons";
import { navLinks, services, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-ink-950 pt-16 pb-8">
      <div className="blueprint-grid absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="absolute -bottom-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-brand-700/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[0.88rem] leading-relaxed text-fog-400">
              {site.tagline}. {site.taglineSecondary}. Работаем в Нальчике, по Кабардино-Балкарии и на КМВ.
            </p>
            <div className="mt-6 flex gap-2.5">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/4 text-fog-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#20b95c]/60 hover:text-[#20b95c]"
              >
                <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />
              </a>
              <a
                href={site.phoneHref}
                aria-label="Позвонить"
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/4 text-fog-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/60 hover:text-brand-400"
              >
                <Phone className="h-[1.05rem] w-[1.05rem]" />
              </a>
            </div>
          </div>

          <nav aria-label="Разделы сайта">
            <h2 className="text-[0.75rem] font-semibold tracking-[0.2em] text-fog-500 uppercase">Разделы</h2>
            <ul className="mt-5 grid gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.88rem] text-fog-300 transition-colors hover:text-brand-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.75rem] font-semibold tracking-[0.2em] text-fog-500 uppercase">Услуги</h2>
            <ul className="mt-5 grid gap-3">
              {services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="text-[0.88rem] text-fog-300 transition-colors hover:text-brand-400"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.75rem] font-semibold tracking-[0.2em] text-fog-500 uppercase">Контакты</h2>
            <ul className="mt-5 grid gap-4">
              <li>
                <a
                  href={site.phoneHref}
                  className="font-display text-[1.35rem] tracking-wide text-fog-100 transition-colors hover:text-brand-400"
                >
                  {site.phoneDisplay}
                </a>
                <span className="mt-1 block text-[0.8rem] text-fog-500">{site.owner}</span>
              </li>
              <li className="flex items-start gap-2.5 text-[0.86rem] text-fog-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" strokeWidth={2} />
                {site.region}
              </li>
              <li className="flex items-start gap-2.5 text-[0.86rem] text-fog-400">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" strokeWidth={2} />
                {site.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/8 pt-7 text-[0.78rem] text-fog-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {site.legalName}.
          </p>
          <p>
            Сайт носит информационный характер и не является публичной офертой.
          </p>
        </div>
      </div>
    </footer>
  );
}
