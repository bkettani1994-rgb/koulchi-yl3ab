# Koulchi Yl3ab — Location de PS5 à domicile

Landing page premium de conversion pour un service de location de PlayStation 5 à
domicile au Maroc. Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion,
Lucide Icons.

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # build de production
npm run lint    # ESLint
```

## À personnaliser avant mise en ligne

Toutes les informations de contact dans `src/lib/constants.ts` sont des
**placeholders** et doivent être remplacées par les vraies coordonnées avant le
lancement :

- `phoneDisplay` / `phoneHref` / `whatsappNumber` — numéro de téléphone réel
- `email`, `facebook`, `instagram` — liens réels
- `url` — nom de domaine réel (utilisé pour le SEO et l'Open Graph)
- `deliveryZones` — zones de livraison réellement couvertes

Le formulaire de réservation (`src/components/sections/ReservationForm.tsx`)
prépare la demande et ouvre WhatsApp avec un message pré-rempli — il n'y a pas
encore de backend/API de réservation. À connecter à un service d'e-mail, une
base de données ou un CRM selon les besoins.

Le visuel de la PS5 dans le hero (`src/components/sections/hero/PS5Showcase.tsx`)
et les tuiles de la galerie sont des compositions abstraites en CSS/SVG (pas de
photo produit réelle) — à remplacer par de vraies photos si disponibles.

### Jaquettes de jeux (section "Jeux disponibles")

Les 3 emplacements dans `src/lib/data.ts` (`GAMES`) affichent une jaquette
vectorielle générique en attendant les vraies jaquettes. Pour ajouter un
visuel réel, renseigne `coverImageUrl` (et le vrai `title`) sur l'entrée
correspondante :

```ts
export const GAMES: Game[] = [
  { title: "EA Sports FC 25", genre: "Sport", coverImageUrl: "/games/fc25.png" },
  // ...
];
```

Place les fichiers dans `public/games/` (ou donne une URL externe) — l'image
remplace automatiquement la jaquette vectorielle dès que `coverImageUrl` est
renseigné.

### Tarifs semaine / weekend

Les prix (`weekdayPrice` / `weekendPrice` dans `PACKS`, `src/lib/data.ts`)
s'appliquent respectivement du lundi au jeudi et du vendredi au dimanche.
Le formulaire de réservation calcule automatiquement le tarif applicable en
fonction de la date choisie.

## Structure

```
src/
  app/            # App Router : layout, page, SEO (sitemap, robots, OG image)
  components/
    layout/       # Header, Footer, WhatsApp flottant, CTA sticky mobile
    sections/     # Hero, Tarifs, FAQ, Formulaire, etc.
    ui/           # Primitives réutilisables (Button, AnimateIn, ...)
  lib/            # Constantes du site, données (packs, avis, FAQ), utils
```
