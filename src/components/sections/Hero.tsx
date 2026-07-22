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
    <section className="relative isolate overflow-hidden bg-background">
      {/* Invisible heading kept for SEO/accessibility — visual title removed per design. */}
      <h1 className="sr-only">
        Transformez votre journée en expérience gaming ultime — Location PlayStation 5 à domicile
        au Maroc
      </h1>

      {/* Banner: full width, natural aspect ratio, never cropped. */}
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={BANNER_SRC}
          alt="PlayStation 5 et manette DualSense — location à domicile au Maroc"
          className="block h-auto w-full"
        />
        {/* Subtle top fade so the fixed nav stays readable over the image. */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/60 to-transparent" />
      </div>

      {/* Content band, pulled up over the banner's lower edge. Normal flow so it always
          renders in full, regardless of the banner's rendered height. */}
      <div className="relative -mt-24 pb-10 pt-16 sm:-mt-32 sm:pb-14 sm:pt-20">
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/85 to-transparent" />

        <Container>
          <div className="flex flex-col items-start gap-5 sm:gap-7">
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
      </div>
    </section>
  );
}
