"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/data";
import { cn } from "@/lib/utils";

const AUTO_ADVANCE_MS = 5500;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  const active = TESTIMONIALS[index];

  return (
    <section id="avis" className="relative scroll-mt-24 py-24 sm:py-32">
      <Container className="flex flex-col items-center gap-14">
        <SectionHeading
          eyebrow="Avis clients"
          title="Ils nous font confiance"
          description="Des centaines de familles et groupes d'amis ont déjà vécu l'expérience Koulchi Yl3ab."
        />

        <div
          className="relative w-full max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="glass relative min-h-[280px] overflow-hidden rounded-[2rem] p-8 sm:p-12">
            <Quote className="absolute right-8 top-8 size-14 text-primary/15" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col gap-6"
              >
                <div className="flex items-center gap-1" aria-label={`${active.rating} sur 5 étoiles`}>
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-primary-light text-primary-light" aria-hidden />
                  ))}
                </div>
                <p className="text-balance text-xl font-medium leading-relaxed text-white sm:text-2xl">
                  &ldquo;{active.text}&rdquo;
                </p>
                <div>
                  <p className="text-sm font-semibold text-white">{active.name}</p>
                  <p className="text-sm text-foreground-subtle">{active.city}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((testimonial, i) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Voir l'avis de ${testimonial.name}`}
                aria-current={i === index}
                className={cn(
                  "h-1.5 cursor-pointer rounded-full transition-all duration-300",
                  i === index ? "w-8 bg-primary-light" : "w-1.5 bg-white/20 hover:bg-white/40",
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
