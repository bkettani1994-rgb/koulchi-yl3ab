import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { whatsappHref } from "@/lib/constants";

export function FinalCTA() {
  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <AnimateIn>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-primary-light/30 bg-gradient-to-br from-primary/25 via-background-elevated to-background-elevated px-6 py-16 text-center sm:px-16 sm:py-20">
            <div className="glow-orb absolute left-1/2 top-0 h-64 w-[600px] -translate-x-1/2 -translate-y-1/2 bg-primary-light/30" />
            <div className="relative flex flex-col items-center gap-6">
              <h2 className="text-balance max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Prêt à vivre une expérience gaming exceptionnelle ?
              </h2>
              <p className="max-w-xl text-balance text-base leading-relaxed text-foreground-muted sm:text-lg">
                Réservez votre PlayStation 5 dès aujourd&apos;hui et profitez d&apos;une
                livraison rapide directement chez vous.
              </p>
              <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
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
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
