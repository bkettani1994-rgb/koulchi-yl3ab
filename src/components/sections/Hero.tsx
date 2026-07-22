import Image from "next/image";
import { CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { AvailabilityCounter } from "@/components/ui/AvailabilityCounter";
import { whatsappHref } from "@/lib/constants";

const CHECKLIST = ["Livraison à domicile", "Installation incluse", "Assistance disponible"];

const BANNER_SRC =
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1784752581/Gemini_Generated_Image_qogombqogombqogo_xqpcfk.png";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
      {/* Full-bleed background banner */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={BANNER_SRC}
          alt="PlayStation 5 et manette DualSense — location à domicile au Maroc"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
      </div>

      {/* Invisible heading kept for SEO/accessibility — visual title removed per design. */}
      <h1 className="sr-only">
        Transformez votre journée en expérience gaming ultime — Location PlayStation 5 à domicile
        au Maroc
      </h1>

      <Container>
        <div className="flex flex-col items-start gap-7">
          <AnimateIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-light">
              <Sparkles className="size-3.5" aria-hidden />
              Disponible aujourd&apos;hui
            </span>
          </AnimateIn>

          <AnimateIn delay={0.16} className="flex w-full flex-col gap-3 sm:flex-row">
            <Button href="#reservation" variant="primary" size="lg" className="w-full sm:w-auto">
              Réserver maintenant
            </Button>
            <Button
              href={whatsappHref()}
              variant="secondary"
              size="lg"
              icon={MessageCircle}
              className="w-full sm:w-auto"
            >
              Contacter sur WhatsApp
            </Button>
          </AnimateIn>

          <AnimateIn delay={0.24} className="flex flex-wrap gap-x-6 gap-y-3">
            {CHECKLIST.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground-muted"
              >
                <CheckCircle2 className="size-4 text-primary-light" aria-hidden />
                {item}
              </span>
            ))}
          </AnimateIn>

          <AnimateIn delay={0.32}>
            <AvailabilityCounter />
          </AnimateIn>
        </div>
      </Container>
    </section>
  );
}
