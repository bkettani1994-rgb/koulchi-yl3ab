import { Check, Gamepad, Info } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { cn } from "@/lib/utils";
import { PACKS } from "@/lib/data";

export function Pricing() {
  return (
    <section id="tarifs" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-orb absolute left-1/2 top-1/3 h-[420px] w-[600px] -translate-x-1/2 bg-primary/10" />
      </div>

      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Tarifs"
          title="Choisissez votre pack"
          description="Des formules simples et transparentes, sans frais cachés. Le pack idéal pour chaque occasion."
        />

        <div className="grid gap-6 lg:grid-cols-3 lg:items-end">
          {PACKS.map((pack, index) => (
            <AnimateIn key={pack.id} delay={index * 0.1}>
              <div
                className={cn(
                  "relative flex h-full flex-col gap-7 rounded-[2rem] border p-8 transition-all duration-300",
                  pack.featured
                    ? "border-primary-light/60 bg-gradient-to-b from-primary/15 via-white/[0.04] to-transparent shadow-[0_30px_80px_-20px_rgba(0,111,205,0.55)] lg:-translate-y-4 lg:scale-[1.03]"
                    : "border-border bg-surface hover:border-primary-light/40 hover:bg-white/[0.06]",
                )}
              >
                {pack.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white shadow-[0_8px_20px_-6px_rgba(224,30,38,0.7)]">
                    {pack.badge}
                  </span>
                )}

                <div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "flex size-9 items-center justify-center rounded-xl",
                        pack.featured ? "bg-primary-light/20" : "bg-white/5",
                      )}
                    >
                      <Gamepad className="size-4 text-primary-light" aria-hidden />
                    </span>
                    <h3 className="text-lg font-semibold text-white">{pack.name}</h3>
                  </div>

                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-5xl font-semibold tracking-tight text-white">
                      {pack.weekdayPrice}
                    </span>
                    <span className="pb-1.5 text-base font-medium text-foreground-muted">
                      MAD
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-foreground-subtle">
                    Lun - Jeu · {pack.duration}
                  </p>

                  <div className="mt-3 flex w-fit items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wide text-secondary-light">
                      Ven - Sam - Dim
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {pack.weekendPrice} MAD
                    </span>
                  </div>
                </div>

                <ul className="flex flex-1 flex-col gap-3.5">
                  {pack.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-foreground-muted">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary-light" aria-hidden />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="#reservation"
                  variant={pack.featured ? "primary" : "secondary"}
                  size="lg"
                  className="w-full"
                >
                  Réserver
                </Button>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn>
          <div className="mx-auto flex w-fit items-center gap-2.5 rounded-full border border-border bg-surface px-5 py-2.5 text-sm text-foreground-muted">
            <Info className="size-4 shrink-0 text-primary-light" aria-hidden />
            <span>
              Tarif semaine du <span className="font-medium text-white">lundi au jeudi</span>,
              tarif weekend du{" "}
              <span className="font-medium text-white">vendredi au dimanche</span>.
            </span>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
