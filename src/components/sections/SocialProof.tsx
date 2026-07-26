import Image from "next/image";
import { ShieldCheck, Star, Timer, Headset } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { StaggerGroup, StaggerItem, AnimateIn } from "@/components/ui/AnimateIn";
import { STATS } from "@/lib/data";

const TRUST_LOGOS_SRC =
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1785069658/logos_they_trust_us_500_x_500_px_tu0xqx.png";

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

        <AnimateIn className="mt-10 flex flex-col items-center gap-4 border-t border-border pt-8">
          <div className="relative h-24 w-24 opacity-90 sm:h-28 sm:w-28">
            <Image
              src={TRUST_LOGOS_SRC}
              alt="Marques et partenaires qui nous font confiance"
              fill
              sizes="112px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-foreground-muted"
              >
                {badge}
              </span>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
