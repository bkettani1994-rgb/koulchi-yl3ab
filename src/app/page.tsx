import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloatingButton } from "@/components/layout/WhatsAppFloatingButton";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { Advantages } from "@/components/sections/Advantages";
import { Pricing } from "@/components/sections/Pricing";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Gallery } from "@/components/sections/Gallery";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { ReservationForm } from "@/components/sections/ReservationForm";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PACKS, FAQ_ITEMS } from "@/lib/data";
import { SITE } from "@/lib/constants";

function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    telephone: SITE.phoneDisplay,
    areaServed: SITE.deliveryZones,
    priceRange: `${Math.min(...PACKS.map((p) => p.price))}-${Math.max(
      ...PACKS.map((p) => p.price),
    )} MAD`,
    makesOffer: PACKS.map((pack) => ({
      "@type": "Offer",
      name: pack.name,
      price: pack.price,
      priceCurrency: "MAD",
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <Header />
      <main className="pb-24 lg:pb-0">
        <Hero />
        <SocialProof />
        <Advantages />
        <Pricing />
        <HowItWorks />
        <Gallery />
        <Testimonials />
        <FAQ />
        <ReservationForm />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
      <StickyMobileCTA />
    </>
  );
}
