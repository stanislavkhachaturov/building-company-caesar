import type { Metadata, Viewport } from "next";
import { Manrope, Oswald } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const oswald = Oswald({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const description =
  "Строительная компания «ЦЕЗАРЬ» на КМВ: строительство домов под ключ, ремонт квартир, монтаж и демонтаж, кровля, бригады разнорабочих и вывоз строительного мусора. Договор, смета без скрытых работ, гарантия 2 года.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — строительство домов и ремонт квартир на КМВ`,
    template: `%s — ${site.name}`,
  },
  description,
  keywords: [
    "строительство домов КМВ",
    "ремонт квартир Пятигорск",
    "строительная компания Кавминводы",
    "вывоз строительного мусора Кисловодск",
    "демонтаж Ессентуки",
    "кровельные работы КМВ",
    "бригада разнорабочих Пятигорск",
  ],
  authors: [{ name: site.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — полный цикл строительных работ`,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — полный цикл строительных работ`,
    description,
    images: ["/og.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
  verification: {
    yandex: "6fb31d7cece34c86",
  },
};

export const viewport: Viewport = {
  themeColor: "#08090b",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: site.name,
  legalName: site.legalName,
  description,
  url: site.url,
  telephone: "+7 980 000-84-08",
  image: `${site.url}/og.jpg`,
  logo: `${site.url}/favicon.svg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Пятигорск",
    addressRegion: "Ставропольский край",
    addressCountry: "RU",
  },
  areaServed: site.cities.map((city) => ({ "@type": "City", name: city })),
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "08:00",
    closes: "21:00",
  },
  founder: { "@type": "Person", name: site.owner },
  makesOffer: [
    "Строительство домов под ключ",
    "Ремонт квартир",
    "Монтаж и демонтаж",
    "Кровельные работы",
    "Услуги разнорабочих",
    "Вывоз строительного мусора",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${oswald.variable} ${manrope.variable}`}>
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
