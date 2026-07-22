import { Facebook, Gamepad2, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, SITE, whatsappHref } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background-elevated/60 pt-16">
      <Container className="flex flex-col gap-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient">
                <Gamepad2 className="size-5 text-white" aria-hidden />
              </span>
              <span className="text-base font-semibold tracking-tight text-white">
                {SITE.name}
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-foreground-muted">
              {SITE.description}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-primary-light/60 hover:text-primary-light"
              >
                <Facebook className="size-4" aria-hidden />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-primary-light/60 hover:text-primary-light"
              >
                <Instagram className="size-4" aria-hidden />
              </a>
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex size-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-primary-light/60 hover:text-primary-light"
              >
                <MessageCircle className="size-4" aria-hidden />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white">Navigation</h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#reservation"
                  className="text-sm text-foreground-muted transition-colors hover:text-white"
                >
                  Réservation
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white">Contact</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-2 text-sm text-foreground-muted transition-colors hover:text-white"
                >
                  <Phone className="size-4 text-primary-light" aria-hidden />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-foreground-muted transition-colors hover:text-white"
                >
                  <MessageCircle className="size-4 text-primary-light" aria-hidden />
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-foreground-muted">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary-light" aria-hidden />
                <span>Zone de livraison : {SITE.deliveryZones.join(", ")}</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white">Légal</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-foreground-muted transition-colors hover:text-white"
                >
                  Conditions générales
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-foreground-muted transition-colors hover:text-white"
                >
                  Politique de confidentialité
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-8 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-foreground-subtle">
            © {new Date().getFullYear()} {SITE.name}. Tous droits réservés.
          </p>
          <p className="text-xs text-foreground-subtle">Location de PS5 à domicile au Maroc</p>
        </div>
      </Container>
    </footer>
  );
}
