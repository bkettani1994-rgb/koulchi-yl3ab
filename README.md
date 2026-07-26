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
prépare la demande, l'envoie à Google Sheets (voir section dédiée ci-dessous)
et ouvre WhatsApp avec un message pré-rempli.

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

## Réservations dans Google Sheets

Chaque réservation validée est automatiquement ajoutée comme une ligne dans un
Google Sheet, en plus du message WhatsApp habituel (les deux sont
indépendants — si Google Sheets n'est pas configuré ou indisponible, le
formulaire continue de fonctionner normalement via WhatsApp).

À la première écriture, l'onglet ("Réservations" par défaut) est créé
automatiquement si besoin, avec un en-tête déjà mis en forme aux couleurs de
Koulchi Yl3ab (fond bleu `#006FCD`, texte blanc en gras).

### Configuration (compte de service Google)

1. Sur [Google Cloud Console](https://console.cloud.google.com/), crée un
   projet (ou réutilise un projet existant).
2. Active l'**API Google Sheets** pour ce projet (menu *API et services* →
   *Bibliothèque*).
3. Crée un **compte de service** (*IAM et administration* → *Comptes de
   service* → *Créer un compte de service*).
4. Sur ce compte de service, génère une **clé JSON** (*Clés* → *Ajouter une
   clé* → *Créer une clé* → JSON) et télécharge le fichier.
5. Crée (ou ouvre) le Google Sheet qui recevra les réservations, puis
   **partage-le** avec l'adresse email du compte de service (champ
   `client_email` dans le JSON téléchargé), avec le rôle **Éditeur**.
6. Récupère l'ID de la feuille dans son URL :
   `https://docs.google.com/spreadsheets/d/`**`CET_ID`**`/edit`.
7. Renseigne les variables d'environnement (voir `.env.example`) — en local
   dans `.env.local`, et en production dans les *Environment Variables* du
   projet Vercel :

   | Variable | Valeur |
   |----------|--------|
   | `GOOGLE_SHEETS_CLIENT_EMAIL` | champ `client_email` du JSON |
   | `GOOGLE_SHEETS_PRIVATE_KEY` | champ `private_key` du JSON (garder les `\n`, entre guillemets) |
   | `GOOGLE_SHEETS_SPREADSHEET_ID` | l'ID récupéré à l'étape 6 |
   | `GOOGLE_SHEETS_SHEET_NAME` | *(optionnel)* nom de l'onglet, `Réservations` par défaut |

8. Redéploie (ou relance `npm run dev` en local) — les nouvelles réservations
   apparaissent désormais dans la feuille.

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
