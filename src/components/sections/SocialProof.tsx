import { ShieldCheck, Star, Timer, Headset } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { StaggerGroup, StaggerItem } from "@/components/ui/AnimateIn";
import { STATS } from "@/lib/data";

const ICONS = [ShieldCheck, Star, Timer, Headset];

const TRUST_BADGES = [
  "Paiement à la livraison",
  "Matériel vérifié avant chaque location",
  "Assistance en français & darija",
  "Livreurs identifiés",
];

export function SocialProof() {
  return (
    <section className="border-y border-border bg-background-elevated/60 py-14">
      <Container>
        <StaggerGroup className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((stat, i) => {
            const Icon = ICONS[i];
            return (
              <StaggerItem key={stat.label} className="flex flex-col items-center gap-2 text-center">
                <Icon className="size-5 text-primary-light" aria-hidden />
                <p className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-foreground-subtle sm:text-sm">
                  {stat.label}
                </p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-border pt-8">
          {TRUST_BADGES.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-foreground-muted"
            >
              {badge}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
