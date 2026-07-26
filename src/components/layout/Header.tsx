"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircle, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE, whatsappHref } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-border bg-background-elevated transition-all duration-300",
        scrolled ? "py-3 shadow-lg shadow-black/30" : "py-5",
      )}
    >
      <Container className="flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5" aria-label={`${SITE.name} — Accueil`}>
          <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl">
            <Image src={SITE.logoUrl} alt="" fill sizes="36px" className="object-cover" />
          </span>
          <span className="text-base font-semibold tracking-tight text-white">{SITE.name}</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground-muted transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href={whatsappHref()} variant="secondary" size="md" icon={MessageCircle}>
            WhatsApp
          </Button>
          <Button href="#reservation" variant="primary" size="md">
            Réserver maintenant
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="glass flex size-11 cursor-pointer items-center justify-center rounded-full text-white lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "fixed inset-x-0 bottom-0 z-40 overflow-y-auto border-t border-border bg-background lg:hidden",
              scrolled ? "top-[69px]" : "top-[85px]",
            )}
          >
            <Container className="flex flex-col gap-1 py-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-foreground-muted transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-3">
                <Button
                  href={whatsappHref()}
                  variant="secondary"
                  size="md"
                  icon={MessageCircle}
                  className="w-full"
                >
                  WhatsApp
                </Button>
                <Button
                  href="#reservation"
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  Réserver maintenant
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
