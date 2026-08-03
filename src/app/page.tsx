import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Process } from "@/components/Process";
import { Portfolio } from "@/components/Portfolio";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";

export default function HomePage() {
  return (
    <>
      <a
        href="#services"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-brand-500 focus:px-5 focus:py-2.5 focus:text-ink-950"
      >
        Перейти к содержимому
      </a>

      <Header />

      <main>
        <Hero />
        <Services />
        <About />
        <Process />
        <Portfolio />
        <Reviews />
        <Faq />
        <Contacts />
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
}
