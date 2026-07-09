import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { Enfoque } from "@/components/sections/Enfoque";
import { DashboardShowcase } from "@/components/sections/DashboardShowcase";
import { Process } from "@/components/sections/Process";
import { Metrics } from "@/components/sections/Metrics";
import { Technologies } from "@/components/sections/Technologies";
import { PainPoints } from "@/components/sections/PainPoints";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Enfoque />
        <DashboardShowcase />
        <Process />
        <Metrics />
        <Technologies />
        <PainPoints />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
