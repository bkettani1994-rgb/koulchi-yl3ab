import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimateIn";
import { ADVANTAGES } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Advantages() {
  return (
    <section id="avantages" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Pourquoi nous choisir"
          title="Pourquoi nous choisir ?"
          description="Une expérience gaming premium pensée pour votre confort, de la réservation à la restitution."
        />

        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((advantage, index) => {
            const Icon = advantage.icon;
            const isRed = index % 2 === 1;
            return (
              <StaggerItem key={advantage.title}>
                <div
                  className={cn(
                    "group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white/[0.06]",
                    isRed ? "hover:border-secondary-light/50" : "hover:border-primary-light/50",
                  )}
                >
                  <div
                    className={cn(
                      "pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100",
                      isRed ? "bg-secondary/20" : "bg-primary/20",
                    )}
                  />
                  <span
                    className={cn(
                      "relative mb-5 flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br",
                      isRed
                        ? "from-secondary to-secondary-light shadow-[0_8px_24px_-6px_rgba(224,30,38,0.6)]"
                        : "from-primary to-primary-light shadow-[0_8px_24px_-6px_rgba(0,111,205,0.6)]",
                    )}
                  >
                    <Icon className="size-6 text-white" aria-hidden />
                  </span>
                  <h3 className="relative text-lg font-semibold text-white">{advantage.title}</h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-foreground-muted">
                    {advantage.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </section>
  );
}
