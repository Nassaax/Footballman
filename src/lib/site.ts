/** Configuration globale de la marque et du site. */
export const site = {
  name: "Stadia Belgica",
  shortName: "Stadia",
  /** Baseline produit, utilisée en meta et en pied de page. */
  tagline: "L'expérience des stades du football belge",
  principle:
    "Le stade n'est pas seulement l'endroit où se joue le match. C'est une expérience.",
  description:
    "Histoire, ferveur, tribunes, accès, billetterie : préparez votre visite dans les 18 stades de la Jupiler Pro League.",
  locale: "fr_BE",
  lang: "fr",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://stadiabelgica.be",
  season: "2026-2027",
  seasonNote:
    "Saison 2026-2027 : 18 clubs, 34 journées, sans play-offs.",
  social: {
    tiktok: "",
    instagram: "",
  },
  /** Solution analytics respectueuse de la vie privée, activée par variable d'env. */
  analytics: {
    plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "",
    plausibleSrc:
      process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js",
  },
} as const;

export const nav = [
  { href: "/", label: "Accueil", icon: "home" },
  { href: "/stades", label: "Stades", icon: "stadium" },
  { href: "/carte", label: "Carte", icon: "map" },
  { href: "/favoris", label: "Favoris", icon: "heart" },
  { href: "/recherche", label: "Recherche", icon: "search" },
] as const;
