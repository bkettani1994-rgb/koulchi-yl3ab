import { CheckCircle2, MessageCircle, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { AvailabilityCounter } from "@/components/ui/AvailabilityCounter";
import { PS5Showcase } from "@/components/sections/hero/PS5Showcase";
import { whatsappHref } from "@/lib/constants";

const CHECKLIST = ["Livraison à domicile", "Installation incluse", "Assistance disponible"];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40 lg:pb-28 lg:pt-48">
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-orb absolute -left-32 top-0 h-[420px] w-[420px] bg-primary/25" />
        <div className="glow-orb absolute -right-24 top-40 h-[380px] w-[380px] bg-primary-light/15" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-col items-start gap-7">
          <AnimateIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary-light">
              <Sparkles className="size-3.5" aria-hidden />
              Disponible aujourd&apos;hui
            </span>
          </AnimateIn>

          <AnimateIn delay={0.08}>
            <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Transformez votre journée en{" "}
              <span className="text-gradient-blue">expérience gaming ultime</span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.16}>
            <p className="max-w-xl text-balance text-lg leading-relaxed text-foreground-muted">
              Louez une PlayStation 5 livrée directement chez vous et profitez des meilleurs jeux
              entre amis ou en famille.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.24} className="flex w-full flex-col gap-3 sm:flex-row">
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

          <AnimateIn delay={0.32} className="flex flex-wrap gap-x-6 gap-y-3">
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

          <AnimateIn delay={0.4}>
            <AvailabilityCounter />
          </AnimateIn>
        </div>

        <AnimateIn direction="left" delay={0.2}>
          <PS5Showcase />
        </AnimateIn>
      </Container>
    </section>
  );
}
