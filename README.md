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

### Configuration (Google Apps Script — aucune Google Cloud Console requise)

1. Crée (ou ouvre) le Google Sheet qui doit recevoir les réservations.
2. Dans ce Sheet, va dans **Extensions → Apps Script**. Un éditeur de script
   s'ouvre dans un nouvel onglet.
3. Supprime le contenu par défaut (`function myFunction() {}`) et colle-y
   tout le contenu du fichier
   [`google-apps-script/reservations.gs`](./google-apps-script/reservations.gs)
   de ce dépôt. Clique sur l'icône 💾 pour enregistrer (nomme le projet si
   demandé, ex. "Réservations Koulchi Yl3ab").
4. *(Optionnel)* Le fichier contient déjà un secret généré aléatoirement
   (`SHARED_SECRET`). Tu peux le garder tel quel, ou le remplacer par une
   autre valeur — dans ce cas, utilise exactement la même valeur à l'étape 7.
5. Clique sur **Déployer → Nouveau déploiement**. Type : **Application Web**.
   Renseigne :
   - **Exécuter en tant que** : Moi (ton compte Google)
   - **Qui a accès** : Tout le monde
   
   Clique sur **Déployer**. Google demandera d'autoriser le script à accéder
   à ce Sheet la première fois (c'est normal, c'est ton propre script).
6. Une fois déployé, copie l'**URL de l'application Web** affichée (elle se
   termine par `/exec`).
7. Renseigne les variables d'environnement (voir `.env.example`) — en local
   dans `.env.local`, et en production dans les *Environment Variables* du
   projet Vercel :

   | Variable | Valeur |
   |----------|--------|
   | `GOOGLE_SHEETS_WEBHOOK_URL` | l'URL copiée à l'étape 6 |
   | `GOOGLE_SHEETS_WEBHOOK_SECRET` | la valeur de `SHARED_SECRET` dans le script (étape 4) |

8. Redéploie (ou relance `npm run dev` en local) — les nouvelles réservations
   apparaissent désormais dans l'onglet "Réservations" de la feuille, avec
   l'en-tête déjà mis en forme aux couleurs de Koulchi Yl3ab.

**Si tu modifies le script plus tard** (ex. changer `SHARED_SECRET` ou
`SHEET_NAME`), il faut le redéployer : **Déployer → Gérer les déploiements**
→ icône crayon sur le déploiement existant → **Nouvelle version** → Déployer.
L'URL reste la même, pas besoin de mettre à jour la variable d'environnement.

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
