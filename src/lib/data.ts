import type { LucideIcon } from "lucide-react";
import {
  Gamepad2,
  Truck,
  Zap,
  Users,
  ListChecks,
  CalendarCheck,
  PackageCheck,
  Sparkles,
} from "lucide-react";

export type Advantage = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const ADVANTAGES: Advantage[] = [
  {
    icon: Gamepad2,
    title: "PS5 Nouvelle Génération",
    description:
      "Profitez des meilleures performances gaming avec des jeux fluides en 4K et un temps de chargement quasi instantané.",
  },
  {
    icon: Truck,
    title: "Livraison à Domicile",
    description:
      "Nous livrons directement chez vous, où que vous soyez dans la zone couverte, à l'heure convenue.",
  },
  {
    icon: Zap,
    title: "Installation Rapide",
    description:
      "Notre équipe installe et configure tout sur place. Vous êtes prêt à jouer en quelques minutes.",
  },
  {
    icon: Users,
    title: "Idéal Entre Amis",
    description:
      "Parfait pour les soirées gaming, anniversaires ou moments en famille, avec plusieurs manettes incluses.",
  },
];

export type Pack = {
  id: string;
  name: string;
  duration: string;
  controllers: number;
  weekdayPrice: number;
  weekendPrice: number;
  featured?: boolean;
  badge?: string;
  features: string[];
};

export const PACKS: Pack[] = [
  {
    id: "standard",
    name: "Pack Standard",
    weekdayPrice: 100,
    weekendPrice: 150,
    duration: "1 Journée",
    controllers: 2,
    features: ["PS5", "2 Manettes sans fil", "Installation incluse", "Assistance disponible"],
  },
  {
    id: "pro",
    name: "Pack Pro",
    weekdayPrice: 125,
    weekendPrice: 175,
    duration: "1 Journée",
    controllers: 3,
    featured: true,
    badge: "Plus populaire",
    features: [
      "PS5",
      "3 Manettes sans fil",
      "Installation incluse",
      "Assistance prioritaire",
    ],
  },
  {
    id: "royal",
    name: "Pack Royal",
    weekdayPrice: 150,
    weekendPrice: 200,
    duration: "1 Journée",
    controllers: 4,
    features: [
      "PS5",
      "4 Manettes sans fil",
      "Installation incluse",
      "Assistance prioritaire",
    ],
  },
];

/** Vendredi, samedi, dimanche = tarif weekend. Lundi à jeudi = tarif semaine. */
export function isWeekendDay(date: Date) {
  const day = date.getDay(); // 0 = dimanche, 5 = vendredi, 6 = samedi
  return day === 0 || day === 5 || day === 6;
}

export function getPackPrice(pack: Pack, date?: Date) {
  if (!date) return pack.weekdayPrice;
  return isWeekendDay(date) ? pack.weekendPrice : pack.weekdayPrice;
}

export type Step = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const STEPS: Step[] = [
  {
    icon: ListChecks,
    title: "Choisissez votre pack",
    description: "Sélectionnez le pack adapté à votre soirée : Standard, Pro ou Royal.",
  },
  {
    icon: CalendarCheck,
    title: "Sélectionnez votre date",
    description: "Indiquez la date et l'adresse de livraison souhaitées en quelques clics.",
  },
  {
    icon: PackageCheck,
    title: "Nous livrons chez vous",
    description: "Notre équipe livre et installe la PS5 directement à votre domicile.",
  },
  {
    icon: Sparkles,
    title: "Vous profitez de votre PS5",
    description: "Détendez-vous et profitez d'une expérience gaming premium entre proches.",
  },
];

export type GalleryItem = {
  title: string;
  category: string;
  tall?: boolean;
};

export const GALLERY_ITEMS: GalleryItem[] = [
  { title: "Console PS5", category: "Matériel", tall: true },
  { title: "Manettes DualSense", category: "Matériel" },
  { title: "Soirée gaming entre amis", category: "Expérience" },
  { title: "Famille réunie autour du jeu", category: "Expérience", tall: true },
  { title: "Installation à domicile", category: "Service" },
  { title: "Configuration prête à jouer", category: "Service" },
];

export type Game = {
  title: string;
  genre: string;
  /** Une fois fournie (PNG/JPG), l'image remplace automatiquement la jaquette vectorielle. */
  coverImageUrl?: string;
};

export const GAMES: Game[] = [
  { title: "Jeu 1", genre: "Titre à venir" },
  { title: "Jeu 2", genre: "Titre à venir" },
  { title: "Jeu 3", genre: "Titre à venir" },
];

export type Testimonial = {
  name: string;
  city: string;
  rating: number;
  text: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Yassine B.",
    city: "Casablanca",
    rating: 5,
    text: "Service rapide et matériel impeccable. La PS5 était comme neuve et l'installation a pris 5 minutes.",
  },
  {
    name: "Salma E.",
    city: "Rabat",
    rating: 5,
    text: "Livraison à l'heure et expérience parfaite. Idéal pour l'anniversaire de mon fils !",
  },
  {
    name: "Karim T.",
    city: "Marrakech",
    rating: 5,
    text: "Mes enfants ont adoré. On a passé un super week-end en famille grâce à Koulchi Yl3ab.",
  },
  {
    name: "Imane R.",
    city: "Salé",
    rating: 5,
    text: "Très professionnel du début à la fin. Réservation simple et livreur ponctuel et sympathique.",
  },
  {
    name: "Amine L.",
    city: "Mohammedia",
    rating: 5,
    text: "Le Pack Pro avec 3 manettes était parfait pour notre soirée entre potes. On recommande !",
  },
  {
    name: "Hind M.",
    city: "Casablanca",
    rating: 5,
    text: "Réactivité au top sur WhatsApp, et le matériel fonctionnait à merveille. On refera appel à eux.",
  },
];

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Combien coûte la livraison ?",
    answer:
      "La livraison est incluse dans nos zones de couverture (Casablanca, Rabat, Marrakech, Salé, Mohammedia). Pour les zones hors périmètre, contactez-nous sur WhatsApp pour un devis rapide.",
  },
  {
    question: "Quels jeux sont disponibles ?",
    answer:
      "Nous proposons une sélection de jeux populaires multijoueurs et solo (FIFA, sport, aventure, party games). Vous pouvez nous indiquer vos préférences lors de la réservation.",
  },
  {
    question: "Peut-on louer plusieurs jours ?",
    answer:
      "Oui, la location longue durée est possible avec un tarif dégressif. Précisez le nombre de jours souhaité dans le formulaire ou sur WhatsApp.",
  },
  {
    question: "Que faire en cas de problème ?",
    answer:
      "Notre équipe d'assistance reste joignable sur WhatsApp pendant toute la durée de la location pour résoudre rapidement tout imprévu technique.",
  },
  {
    question: "Quels moyens de paiement acceptez-vous ?",
    answer:
      "Le paiement s'effectue en espèces à la livraison. D'autres moyens de paiement pourront être proposés prochainement.",
  },
];

export const STATS = [
  { value: "+500", label: "Locations réalisées" },
  { value: "4.9/5", label: "Satisfaction client" },
  { value: "<2h", label: "Livraison rapide" },
  { value: "24/7", label: "Support réactif" },
] as const;
