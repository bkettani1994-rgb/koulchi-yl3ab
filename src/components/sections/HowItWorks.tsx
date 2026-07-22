import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { STEPS } from "@/lib/data";

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Simple & rapide"
          title="Comment ça marche ?"
          description="Quatre étapes pour transformer votre salon en salle de jeu premium."
        />

        <div className="relative grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block" />

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <AnimateIn key={step.title} delay={index * 0.1} className="relative flex flex-col items-start gap-4">
                <div className="relative flex size-14 items-center justify-center rounded-2xl border border-border-strong bg-background-elevated shadow-[0_0_0_6px_rgba(5,5,5,1)]">
                  <Icon className="size-6 text-primary-light" aria-hidden />
                  <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-[11px] font-bold text-white">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-foreground-muted">{step.description}</p>
              </AnimateIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
