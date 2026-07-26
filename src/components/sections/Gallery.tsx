import Image from "next/image";
import { Gamepad2, Joystick, PartyPopper, Users, Wrench, MonitorPlay } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { GALLERY_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";

const ICONS: LucideIcon[] = [Gamepad2, Joystick, PartyPopper, Users, Wrench, MonitorPlay];

export function Gallery() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container className="flex flex-col gap-14">
        <SectionHeading
          eyebrow="Galerie"
          title="Vivez l'expérience Koulchi Yl3ab"
          description="Un aperçu du matériel et des moments partagés par nos clients à travers le Maroc."
        />

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {GALLERY_ITEMS.map((item, index) => {
            const Icon = ICONS[index % ICONS.length];
            const isRed = index % 2 === 1;
            return (
              <AnimateIn key={item.title} delay={(index % 3) * 0.08} className="break-inside-avoid">
                <div
                  className={cn(
                    "group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-white/[0.06] to-transparent p-6",
                    item.tall ? "h-80" : "h-56",
                  )}
                >
                  {item.imageUrl ? (
                    <>
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </>
                  ) : (
                    <>
                      <div
                        className={cn(
                          "absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90",
                          isRed ? "from-secondary/25" : "from-primary/25",
                        )}
                      />
                      <Icon
                        className="absolute right-6 top-6 size-10 text-white/15 transition-transform duration-300 group-hover:scale-110 group-hover:text-white/25"
                        aria-hidden
                      />
                    </>
                  )}
                  <span
                    className={cn(
                      "relative w-fit rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium uppercase tracking-wide backdrop-blur-sm",
                      isRed ? "text-secondary-light" : "text-primary-light",
                    )}
                  >
                    {item.category}
                  </span>
                  <h3 className="relative mt-2 text-lg font-semibold text-white">{item.title}</h3>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
