// phoneDisplay/phoneHref/whatsappNumber are real. Other fields below are still
// placeholders — replace with real values before going live.
export const SITE = {
  name: "Koulchi Yl3ab",
  tagline: "Location de PlayStation 5 à domicile",
  url: "https://koulchiyl3ab.ma",
  logoUrl:
    "https://res.cloudinary.com/diptsoc4h/image/upload/v1785069658/logos_they_trust_us_500_x_500_px_tu0xqx.png",
  description:
    "Louez une PlayStation 5 livrée directement chez vous au Maroc. Installation incluse, assistance disponible, réservation en quelques minutes.",
  phoneDisplay: "+212 709-202017",
  phoneHref: "tel:+212709202017",
  whatsappNumber: "212709202017",
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
  { label: "Jeux", href: "#jeux" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "Comment ça marche", href: "#comment-ca-marche" },
  { label: "Avis", href: "#avis" },
  { label: "FAQ", href: "#faq" },
] as const;
