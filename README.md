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

Dans `src/lib/constants.ts`, `phoneDisplay` / `phoneHref` / `whatsappNumber`
sont déjà les vraies coordonnées. Le reste est encore **placeholder** et à
remplacer avant le lancement :

- `email`, `facebook`, `instagram` — liens réels
- `url` — nom de domaine réel (utilisé pour le SEO et l'Open Graph)
- `deliveryZones` — zones de livraison réellement couvertes

Le formulaire de réservation (`src/components/sections/ReservationForm.tsx`)
prépare la demande et ouvre WhatsApp avec un message pré-rempli — il n'y a pas
encore de backend/API de réservation. À connecter à un service d'e-mail, une
base de données ou un CRM selon les besoins.

Le hero (`src/components/sections/Hero.tsx`), la galerie (`GALLERY_ITEMS` dans
`src/lib/data.ts`), les jaquettes de jeux (`GAMES`) et le logo du header
(`SITE.logoUrl`) utilisent déjà de vrais visuels hébergés sur Cloudinary.

### Jaquettes de jeux (section "Jeux disponibles")

Chaque entrée de `GAMES` (`src/lib/data.ts`) accepte un `coverImageUrl` réel :

```ts
export const GAMES: Game[] = [
  { title: "FC 26", genre: "Sport / Football", coverImageUrl: "https://..." },
  // ...
];
```

Une jaquette vectorielle générique s'affiche automatiquement en fallback si
`coverImageUrl` est omis (ex: nouveau jeu ajouté sans visuel pour l'instant).

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
