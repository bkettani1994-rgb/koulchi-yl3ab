// Placeholder business info — replace with real values before going live.
export const SITE = {
  name: "Koulchi Yl3ab",
  tagline: "Location de PlayStation 5 à domicile",
  url: "https://koulchiyl3ab.ma",
  description:
    "Louez une PlayStation 5 livrée directement chez vous au Maroc. Installation incluse, assistance disponible, réservation en quelques minutes.",
  phoneDisplay: "+212 6 00 00 00 00",
  phoneHref: "tel:+212600000000",
  whatsappNumber: "212600000000",
  whatsappMessage: "Bonjour, je souhaite réserver une PlayStation 5 pour mon domicile.",
  email: "contact@koulchiyl3ab.ma",
  facebook: "https://facebook.com/koulchiyl3ab",
  instagram: "https://instagram.com/koulchiyl3ab",
  deliveryZones: ["Casablanca", "Rabat", "Marrakech", "Salé", "Mohammedia"],
} as const;

export const whatsappHref = (message?: string) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    message ?? SITE.whatsappMessage,
  )}`;

export const NAV_LINKS = [
  { label: "Avantages", href: "#avantages" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "Avis", href: "#avis" },
  { label: "FAQ", href: "#faq" },
] as const;
