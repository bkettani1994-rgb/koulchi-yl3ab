import Image from "next/image";
import { Gamepad2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { GameCoverArt } from "@/components/sections/games/GameCoverArt";
import { GAMES } from "@/lib/data";

export function Games() {
  return (
    <section id="jeux" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Jeux disponibles"
          title="Vos jeux préférés vous attendent"
          description="Une sélection de titres multijoueurs et solo installés sur chaque PS5 livrée."
        />

        <div className="grid gap-6 sm:grid-cols-3">
          {GAMES.map((game, index) => (
            <AnimateIn key={game.title} delay={index * 0.1}>
              <div className="group flex flex-col gap-4">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border border-border bg-background-elevated transition-transform duration-300 group-hover:-translate-y-1.5">
                  {game.coverImageUrl ? (
                    <Image
                      src={game.coverImageUrl}
                      alt={game.title}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <>
                      <GameCoverArt accent={index % 2 === 0 ? "primary" : "secondary"} />
                      <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium text-foreground-muted backdrop-blur-sm">
                        Jaquette à venir
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2.5 px-1">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                    <Gamepad2 className="size-4 text-primary-light" aria-hidden />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{game.title}</p>
                    <p className="text-xs text-foreground-subtle">{game.genre}</p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
