/**
 * Architecture de monétisation.
 *
 * Règle produit : la monétisation reste premium et discrète. Les emplacements
 * existent partout dans le code, mais ne s'affichent que si un partenaire est
 * réellement configuré ici. Aucun emplacement vide n'est rendu.
 */

export type SlotId =
  | "home-hero-presented-by"
  | "home-experience"
  | "stadium-access"
  | "stadium-before-match"
  | "stadium-tickets"
  | "map-sidebar";

export interface Sponsor {
  id: string;
  /** Nom de la marque affiché. */
  name: string;
  /** Formulation éditoriale : « Expérience présentée par … ». */
  claim?: string;
  logo?: string;
  url: string;
  /** Secteur, utile pour éviter les conflits d'exclusivité. */
  sector?: string;
}

export interface SlotConfig {
  slot: SlotId;
  sponsor: Sponsor | null;
  /** Limite la diffusion à certains stades (ex. partenariat régional). */
  stadiumIds?: string[];
}

/**
 * Aucun partenaire commercial n'est actif en V1 : les emplacements sont câblés
 * mais vides. Un administrateur remplit ce tableau (ou la table équivalente)
 * sans toucher au reste du code.
 */
export const slots: SlotConfig[] = [
  { slot: "home-hero-presented-by", sponsor: null },
  { slot: "home-experience", sponsor: null },
  { slot: "stadium-access", sponsor: null },
  { slot: "stadium-before-match", sponsor: null },
  { slot: "stadium-tickets", sponsor: null },
  { slot: "map-sidebar", sponsor: null },
];

export function getSponsor(slot: SlotId, stadiumId?: string): Sponsor | null {
  const config = slots.find(
    (s) => s.slot === slot && (!s.stadiumIds || (stadiumId && s.stadiumIds.includes(stadiumId))),
  );
  return config?.sponsor ?? null;
}

/** Offre d'abonnement préparée, non commercialisée en V1. */
export const stadiumPass = {
  enabled: false,
  name: "Stadium Pass",
  monthly: "4,99 €",
  yearly: "29,99 €",
  benefits: [
    "Guides approfondis stade par stade",
    "Itinéraires personnalisés jour de match",
    "Cartes détaillées hors ligne",
    "Archives historiques et documents",
    "Bons plans partenaires",
  ],
  /** Prestataire de paiement à brancher plus tard (Stripe ou équivalent). */
  provider: null as null | "stripe",
} as const;

/** Offre B2B clubs, préparée sans développement complet en V1. */
export const clubOffer = {
  enabled: true,
  title: "Votre stade sur Stadia Belgica",
  pitch:
    "Les clubs peuvent corriger les informations de leur fiche, fournir des contenus officiels et mettre en avant leurs visites et leurs offres.",
  contactPath: "/clubs",
} as const;
