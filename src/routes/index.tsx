import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { CompanyProvider } from "@/lib/company-store";
import { COMPANY } from "@/data/company";
import { Hero } from "@/components/card/Hero";
import { QuickActions } from "@/components/card/QuickActions";
import { About, Services, WhyChooseUs, ServiceAreas } from "@/components/card/Sections";
import { Gallery } from "@/components/card/Gallery";
import { Certificates } from "@/components/card/Trust";
import { ContactForm } from "@/components/card/ContactForm";
import { LocationSection, QRSection } from "@/components/card/Location";
import { Footer } from "@/components/card/Footer";
import { FloatingBar } from "@/components/card/FloatingBar";

const TITLE = "Arise Healthcare Solutions | Digital Business Card";
const DESCRIPTION =
  "Digital business card of Arise Healthcare Solutions — endoscopy repair specialists offering rigid & flexible scope repair, camera head and processor service, board-level PCB repair, refurbished endoscopy towers and AMC support.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#218EAF" },
      {
        name: "keywords",
        content:
          "endoscopy repair, rigid scope repair, flexible scope repair, laparoscope repair, camera head repair, video processor repair, medical equipment repair, PCB board level repair, refurbished endoscopy towers, AMC medical equipment",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icons/icon-192.png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: COMPANY.name,
          slogan: COMPANY.tagline,
          description: COMPANY.about,
          url: COMPANY.website,
          email: COMPANY.email,
          telephone: COMPANY.mobileRaw,
          knowsAbout: COMPANY.services,
          areaServed: "IN",
        }),
      },
    ],
  }),
});


function Index() {
  return (
    <CompanyProvider>
      <main className="relative min-h-screen overflow-x-hidden">
        <Hero />
        <QuickActions />
        <About />
        <Services />
        <Gallery />
        <WhyChooseUs />
        <Certificates />
        <ServiceAreas />
        <LocationSection />
        <ContactForm />
        <QRSection />
        <Footer />
        <FloatingBar />
      </main>
      <Toaster position="top-center" richColors />
    </CompanyProvider>
  );
}
