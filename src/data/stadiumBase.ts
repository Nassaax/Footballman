import {
  type Source,
  type Access,
  type Rules,
  type Stadium,
  type Ticketing,
  tbc,
  v,
} from "./types";
import { LAST_AUDIT, WIKI } from "./sources";

/**
 * Socle par défaut d'une fiche stade. Tout ce qui n'est pas explicitement
 * vérifié dans le fichier du stade reste « Information à confirmer » : c'est
 * volontaire, et c'est ce que l'interface affiche.
 */

const emptyMode = () => ({
  available: true,
  summary: tbc<string>(),
  details: tbc<string[]>(),
});

export const defaultAccess = (): Access => ({
  train: { ...emptyMode(), nearestStation: tbc<string>(), walk: tbc<string>() },
  publicTransport: emptyMode(),
  car: { ...emptyMode(), parking: tbc<string[]>(), restrictions: tbc<string>() },
  bike: emptyMode(),
  foot: emptyMode(),
  matchdayOnly: [],
});

export const defaultTicketing = (officialUrl?: string): Ticketing => ({
  officialUrl,
  accountRequired: tbc<boolean>("Création de compte : à confirmer sur la billetterie officielle"),
  nominative: tbc<boolean>("Billet nominatif ou non : à confirmer"),
  conditions: tbc<string[]>(),
  prices: tbc<string>("Tarif variable selon la rencontre — voir la billetterie officielle"),
  season: tbc<string>(),
  boxOffice: tbc<string>(),
  awayFans: tbc<string>("Modalités visiteurs : à confirmer auprès des deux clubs"),
});

/**
 * Règlement d'ordre intérieur : la grille est identique partout (elle sert de
 * checklist), mais chaque statut reste `unknown` jusqu'à vérification dans le
 * ROI du club. Le cadre général est fixé par la loi football belge.
 */
export const defaultRules = (): Rules => ({
  items: [
    { icon: "🎒", label: "Sacs et bagages", status: "unknown" },
    { icon: "📷", label: "Appareil photo", status: "unknown" },
    { icon: "🍺", label: "Boissons", status: "unknown" },
    { icon: "🚭", label: "Tabac", status: "unknown" },
    { icon: "🔥", label: "Fumigènes et engins pyrotechniques", status: "forbidden", detail: "Interdits par la loi football belge dans tous les stades." },
    { icon: "🚩", label: "Drapeaux et bâches", status: "unknown" },
    { icon: "📢", label: "Mégaphones", status: "unknown" },
    { icon: "🪑", label: "Objets encombrants", status: "unknown" },
    { icon: "🐕", label: "Animaux", status: "unknown" },
    { icon: "☂️", label: "Parapluies", status: "unknown" },
  ],
  lastVerified: LAST_AUDIT,
  bagPolicy: tbc<string>("Dimensions autorisées : voir le règlement d'ordre intérieur du club"),
  cashless: tbc<boolean>("Paiement à l'intérieur du stade : à confirmer"),
});

/** Déroulé type d'un jour de match, ajustable par stade. */
export const defaultMatchday = (): Stadium["matchdayTemplate"] => [
  { offset: "J-7", label: "Réservez votre place", detail: "La billetterie officielle est la seule source fiable pour les disponibilités et les tarifs." },
  { offset: "J-1", label: "Vérifiez l'heure et les accès", detail: "Les horaires peuvent changer pour des raisons de diffusion ou de sécurité." },
  { offset: "-2 h 00", label: "Départ", detail: "Prévoyez large : les abords d'un stade se densifient très vite." },
  { offset: "-1 h 30", label: "Arrivée dans le quartier", detail: "Le moment idéal pour prendre le pouls de l'avant-match." },
  { offset: "-1 h 00", label: "Entrée au stade", detail: "Contrôle du billet puis palpation de sécurité. Les files s'allongent dans les 30 dernières minutes." },
  { offset: "-0 h 30", label: "Rejoignez votre tribune", detail: "Repérez votre bloc, votre rang, et le chemin vers les sanitaires et les buvettes." },
  { offset: "0 h 00", label: "Coup d'envoi", detail: "" },
  { offset: "+1 h 50", label: "Coup de sifflet final", detail: "Les sorties se vident par vagues : attendre 10 minutes fait souvent gagner 20 minutes." },
];

/** Spécification compacte d'une tribune, complétée par les valeurs par défaut. */
export interface SectionSpec {
  id: string;
  name: string;
  side: "north" | "south" | "east" | "west";
  description: string;
  atmosphere: string;
  audience: string;
  visibility: string;
  notes?: string;
  services?: string[];
}

export function sections(specs: SectionSpec[]): Stadium["sections"] {
  return specs.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description,
    entrance: tbc<string>("Numéro de porte : voir le plan officiel du club"),
    atmosphere: s.atmosphere,
    audience: s.audience,
    visibility: s.visibility,
    accessibility: tbc<string>("Accès PMR dans cette tribune : à confirmer auprès du club"),
    services: s.services ?? ["Buvettes", "Sanitaires"],
    layout: { side: s.side },
    notes: s.notes,
  }));
}

/** Quatre tribunes génériques quand la nomenclature officielle reste à confirmer. */
export function classicSections(labels: {
  main: string;
  opposite: string;
  home: string;
  away: string;
}): Stadium["sections"] {
  return sections([
    {
      id: "main",
      name: labels.main,
      side: "west",
      description: "Tribune latérale principale, côté caméras et loges.",
      atmosphere: "Assise, plus calme, réactive dans les grands moments.",
      audience: "Abonnés de longue date, familles, invités du club.",
      visibility: "Meilleure lecture du jeu : vue latérale centrale.",
    },
    {
      id: "opposite",
      name: labels.opposite,
      side: "east",
      description: "Tribune latérale opposée, populaire.",
      atmosphere: "Populaire et bruyante par intermittence.",
      audience: "Public mixte, abonnés et places à l'unité.",
      visibility: "Vue latérale.",
    },
    {
      id: "home-end",
      name: labels.home,
      side: "north",
      description: "Virage du soutien : chants, drapeaux, tifos.",
      atmosphere: "Intense, debout une grande partie du match.",
      audience: "Groupes de supporters organisés et habitués du virage.",
      visibility: "Vue derrière le but ; l'ambiance prime sur la lecture tactique.",
      notes: "À éviter si vous cherchez une place assise calme.",
    },
    {
      id: "away-end",
      name: labels.away,
      side: "south",
      description: "Virage opposé, incluant généralement le parcage visiteurs.",
      atmosphere: "Variable selon la rencontre.",
      audience: "Public local et supporters visiteurs dans un secteur dédié.",
      visibility: "Vue derrière le but.",
      notes: "Configuration exacte du parcage visiteurs à confirmer match par match.",
    },
  ]);
}

/** Source d'une appréciation éditoriale (pas une donnée factuelle vérifiable). */
export const EDITO: Source = {
  label: "Observation éditoriale Stadia Belgica",
  tier: 4,
};

export interface AccessSpec {
  train?: string;
  station?: string;
  walk?: string;
  transit?: string;
  car?: string;
  parking?: string[];
  restrictions?: string;
  bike?: string;
  foot?: string;
  matchdayOnly?: string[];
}

/** Construit un bloc accès : ce qui est fourni est daté et sourcé, le reste reste à confirmer. */
export function buildAccess(spec: AccessSpec): Access {
  const a = defaultAccess();
  const set = <T>(value: T | undefined, note?: string) =>
    value === undefined ? tbc<T>(note) : v(value, EDITO, LAST_AUDIT, note);

  a.train.summary = set(spec.train);
  a.train.nearestStation = spec.station
    ? v(spec.station, WIKI, LAST_AUDIT, "Desserte à revérifier sur les horaires SNCB du jour")
    : tbc<string>("Gare la plus proche : à confirmer");
  a.train.walk = set(spec.walk, spec.walk ? "Temps indicatif, hors affluence" : "Temps de marche : à confirmer");
  a.publicTransport.summary = set(spec.transit, spec.transit ? undefined : "Lignes et arrêts : à confirmer auprès de l'opérateur (De Lijn / TEC / STIB-MIVB)");
  a.car.summary = set(spec.car);
  a.car.parking = spec.parking
    ? v(spec.parking, EDITO, LAST_AUDIT, "Capacités et tarifs à confirmer auprès du club")
    : tbc<string[]>("Parkings officiels : à confirmer auprès du club");
  a.car.restrictions = set(spec.restrictions, spec.restrictions ? undefined : "Restrictions de circulation les jours de match : à confirmer auprès de la commune");
  a.bike.summary = set(spec.bike, spec.bike ? undefined : "Stationnement vélo : à confirmer auprès du club");
  a.foot.summary = set(spec.foot);
  a.matchdayOnly = spec.matchdayOnly ?? [];
  return a;
}
