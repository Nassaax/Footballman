/**
 * Modèle de données STADIA BELGICA.
 *
 * Règle de fiabilité : toute information susceptible de changer (capacité,
 * tarifs, accès, règlement, transports) est encapsulée dans `Fact<T>` qui porte
 * sa source et sa date de vérification. Une information non vérifiée n'est
 * jamais présentée comme un fait : elle s'affiche « Information à confirmer ».
 */

export type FactStatus = "verified" | "to_confirm";

export interface Source {
  /** Libellé lisible, ex. « Site officiel du club ». */
  label: string;
  url?: string;
  /** Niveau de confiance, 1 = source officielle primaire. */
  tier?: 1 | 2 | 3 | 4;
}

export interface Fact<T> {
  value: T | null;
  status: FactStatus;
  source?: Source;
  /** ISO date (YYYY-MM-DD) de la dernière vérification humaine. */
  lastVerified?: string;
  /** Précision affichée sous la donnée, ex. « variable selon la rencontre ». */
  note?: string;
}

/** Fait vérifié, avec source et date. */
export function v<T>(
  value: T,
  source: Source,
  lastVerified: string,
  note?: string,
): Fact<T> {
  return { value, status: "verified", source, lastVerified, note };
}

/** Information à confirmer : jamais affichée comme un fait. */
export function tbc<T>(note?: string): Fact<T> {
  return { value: null, status: "to_confirm", note };
}

/* ------------------------------------------------------------------ médias */

export type MediaLicense =
  | "unknown"
  | "owned" // produit par notre média
  | "cc-by"
  | "cc-by-sa"
  | "cc0"
  | "public-domain"
  | "rights-reserved";

export interface Image {
  /** Vide ou absent ⇒ le composant affiche un placeholder généré. */
  src?: string;
  alt: string;
  credit?: string;
  copyright?: string;
  license: MediaLicense;
  imageSource?: string;
  /** Une image n'est rendue que si la licence l'autorise. */
  usable: boolean;
}

export type VideoProvider = "youtube" | "tiktok" | "instagram" | "self";

export interface Video {
  provider: VideoProvider;
  /** Identifiant de la vidéo chez le fournisseur, ou URL pour `self`. */
  id: string;
  title: string;
  /** Vertical 9:16 pour l'expérience mobile immersive. */
  vertical?: boolean;
  credit?: string;
}

/* -------------------------------------------------------------------- clubs */

export interface Club {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  city: string;
  region: "Flandre" | "Wallonie" | "Bruxelles";
  founded: Fact<number>;
  colors: { primary: string; secondary: string; ink?: string };
  nicknames: string[];
  stadiumId: string;
  officialWebsite?: string;
  ticketingUrl?: string;
  socialLinks?: Partial<
    Record<"instagram" | "tiktok" | "facebook" | "x" | "youtube", string>
  >;
}

/* ------------------------------------------------------------------- stades */

export interface TimelineEvent {
  year: number;
  /** Date plus précise si connue, ex. « 17 juillet 2013 ». */
  date?: string;
  title: string;
  description: string;
  image?: Image;
  source?: Source;
}

export interface StadiumSection {
  id: string;
  name: string;
  description: string;
  /** Entrée / porte d'accès. */
  entrance: Fact<string>;
  atmosphere: string;
  /** Public habituel, sans jugement de valeur. */
  audience: string;
  visibility: string;
  accessibility: Fact<string>;
  services: string[];
  /** Position relative pour le plan schématique (0-1). */
  layout: { side: "north" | "south" | "east" | "west" };
  notes?: string;
}

export interface TransportMode {
  available: boolean;
  summary: Fact<string>;
  details: Fact<string[]>;
}

export interface Access {
  train: TransportMode & { nearestStation: Fact<string>; walk: Fact<string> };
  publicTransport: TransportMode;
  car: TransportMode & { parking: Fact<string[]>; restrictions: Fact<string> };
  bike: TransportMode;
  foot: TransportMode;
  /** Consignes valables uniquement les jours de match. */
  matchdayOnly: string[];
}

export interface Ticketing {
  officialUrl?: string;
  accountRequired: Fact<boolean>;
  nominative: Fact<boolean>;
  conditions: Fact<string[]>;
  prices: Fact<string>;
  season: Fact<string>;
  boxOffice: Fact<string>;
  awayFans: Fact<string>;
}

export interface RuleItem {
  icon: string;
  label: string;
  /** allowed | conditional | forbidden | unknown */
  status: "allowed" | "conditional" | "forbidden" | "unknown";
  detail?: string;
}

export interface Rules {
  items: RuleItem[];
  source?: Source;
  lastVerified?: string;
  bagPolicy: Fact<string>;
  cashless: Fact<boolean>;
}

export interface NearbyPlace {
  name: string;
  kind: "bar" | "restaurant" | "snack" | "place" | "meeting-point";
  description: string;
  /** Emplacement réservé à un futur partenariat commercial. */
  sponsored?: boolean;
  affiliateUrl?: string;
  source?: Source;
}

export interface Anecdote {
  hook: string;
  body: string;
  source?: Source;
  /** Prêt à être décliné en contenu vertical TikTok / Reels. */
  socialReady?: boolean;
}

export interface Fervour {
  intro: string;
  supporterGroups: Fact<string[]>;
  chants: Fact<string[]>;
  traditions: string[];
  rivalries: { opponent: string; name?: string; description: string }[];
  greatNights: { date: string; title: string; description: string; source?: Source }[];
  attendance: Fact<string>;
  quotes: { text: string; author: string; source?: Source }[];
}

export interface Stadium {
  id: string;
  slug: string;
  name: string;
  formerNames?: string[];
  clubId: string;
  /** Stade partagé (ex. Jan Breydel). */
  coTenantClubIds?: string[];
  city: string;
  address: Fact<string>;
  latitude: number;
  longitude: number;
  capacity: Fact<number>;
  openingYear: Fact<number>;
  /** Accroche courte, 1 phrase, utilisée en hero et meta description. */
  tagline: string;
  description: string;
  architecture: string;
  history: TimelineEvent[];
  fervour: Fervour;
  sections: StadiumSection[];
  access: Access;
  ticketing: Ticketing;
  rules: Rules;
  beforeMatch: { intro: string; places: NearbyPlace[]; timing: Fact<string> };
  afterMatch: { intro: string; tips: string[]; exits: Fact<string[]> };
  anecdotes: Anecdote[];
  gallery: Image[];
  videos: Video[];
  /** Calendrier type d'un jour de match (fonction Matchday). */
  matchdayTemplate: { offset: string; label: string; detail: string }[];
  services: string[];
  accessibility: Fact<string[]>;
  lastVerified: string;
  sources: Source[];
}

export interface StadiumWithClub {
  stadium: Stadium;
  club: Club;
  coTenants: Club[];
}
