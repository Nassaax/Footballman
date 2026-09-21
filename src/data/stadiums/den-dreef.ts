import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite, viaSearch } from "../sources";
import { buildAccess, classicSections, defaultMatchday, defaultRules, defaultTicketing } from "../stadiumBase";

const stadium: Stadium = {
  id: "den-dreef",
  slug: "den-dreef",
  name: "Den Dreef",
  clubId: "oh-leuven",
  city: "Louvain",
  address: v(
    "Kardinaal Mercierlaan 46, 3001 Louvain (Heverlee)",
    viaSearch("OH Leuven — mobilité", "https://ohleuven.com/mobiliteit/"),
    LAST_AUDIT,
  ),
  latitude: 50.8636,
  longitude: 4.6864,
  capacity: v(10000, WIKI, LAST_AUDIT, "Capacité approximative à confirmer auprès du club"),
  openingYear: tbc<number>("Date d'ouverture à confirmer auprès du club"),
  tagline: "Le stade d'une ville étudiante : jeune public, club né d'une fusion.",
  description:
    "Louvain est une ville universitaire : 100 000 habitants et des dizaines de milliers d'étudiants. Son club, OH Leuven, est né en 2002 de la fusion de trois entités locales — il n'a donc presque pas de passé, mais un bassin de population très particulier. Den Dreef, à Heverlee, reflète cela : une enceinte compacte, moderne par endroits, avec un public plus jeune que la moyenne du championnat.",
  architecture:
    "Enceinte de taille moyenne rénovée par phases, insérée dans un environnement universitaire et résidentiel. Les tribunes sont proches du terrain et l'accès à pied depuis le centre de Louvain est envisageable.",
  history: [
    { year: 2002, title: "Naissance d'OH Leuven", description: "Le club naît de la fusion de Stade Leuven, Daring Club Leuven et Zwarte Duivels Oud-Heverlee.", source: WIKI },
    { year: 2017, title: "Nouvel actionnariat international", description: "Le club passe sous le contrôle d'un actionnaire étranger, avec un impact sur son projet sportif. Détails à confirmer.", source: WIKI },
  ],
  fervour: {
    intro:
      "OH Leuven a construit son public avec une ville d'étudiants : moins de tradition héritée, plus de renouvellement. L'ambiance est jeune, souvent bon enfant, avec un noyau de supporters qui s'est structuré au fil des montées.",
    supporterGroups: tbc<string[]>("Groupes de supporters : à documenter avec le club"),
    chants: tbc<string[]>("Répertoire des chants : à documenter"),
    traditions: ["Un public sensiblement plus jeune que la moyenne du championnat.", "Un lien fort avec la vie étudiante louvaniste."],
    rivalries: [{ opponent: "Clubs du Brabant flamand", description: "Rivalités régionales, avec une intensité variable : à confirmer." }],
    greatNights: [{ date: "Information à confirmer", title: "Les montées en première division", description: "Documentation en cours avant publication comme faits." }],
    attendance: tbc<string>("Affluence moyenne : à publier depuis les chiffres officiels Pro League"),
    quotes: [],
  },
  sections: classicSections({ main: "Tribune principale", opposite: "Tribune latérale opposée", home: "Virage des supporters", away: "Secteur visiteurs" }),
  access: buildAccess({
    source: viaSearch("OH Leuven — mobilité", "https://ohleuven.com/mobiliteit/"),
    train:
      "Louvain est à une vingtaine de minutes de Bruxelles en train. Le plus efficace reste de descendre à la halte de Heverlee, à 6 minutes à pied du stade, plutôt qu'à la gare principale.",
    station: "Heverlee, à 6 minutes à pied — ou Louvain centre, à 10 minutes de bus",
    walk: "6 minutes depuis la halte de Heverlee.",
    transit:
      "Depuis la gare de Louvain, comptez une dizaine de minutes de bus. Les arrêts De Lijn les plus proches sont « Leuven Naamsepoort » et « Leuven Redingenhof ».",
    car:
      "Accès autoroutier simple, mais le parking du Kardinaal Mercierlaan est réservé aux invités business du club. Deux solutions de report existent, à 10 à 15 minutes de marche.",
    parking: [
      "Parking Imec / Kapeldreef (tour Arenberg III) : gratuit, 750 places, à 15 minutes à pied.",
      "Parking Philipssite : payant, 1 150 places, à 10 minutes à pied.",
      "Parking du Kardinaal Mercierlaan : réservé aux clients business du club.",
    ],
    bike: "Louvain est une ville de vélos : stationnement vélo abondant au pied du stade, Kardinaal Mercierlaan 46.",
  }),
  ticketing: { ...defaultTicketing("https://www.ohl.be") },
  rules: defaultRules(),
  beforeMatch: { intro: "Louvain possède l'une des plus grandes places de cafés d'Europe : l'avant-match en ville est excellent, puis on rejoint Heverlee.", places: [], timing: v("Prévoir 1 h 30 si vous partez du centre de Louvain.", { label: "Observation éditoriale Stadia Belgica", tier: 4 }, LAST_AUDIT) },
  afterMatch: { intro: "Retour vers le centre de Louvain, qui reste très animé en soirée grâce à la vie étudiante.", tips: ["Le centre est l'un des meilleurs après-matchs du pays en semaine.", "Trains fréquents vers Bruxelles : vérifier tout de même les derniers départs."], exits: tbc<string[]>() },
  anecdotes: [
    { hook: "Le club est né de trois clubs à la fois", body: "OH Leuven est le produit d'une fusion en 2002 entre Stade Leuven, Daring Club Leuven et Zwarte Duivels Oud-Heverlee.", source: WIKI, socialReady: true },
    { hook: "Le stade n'est pas à Louvain, mais à Heverlee", body: "Den Dreef se trouve administrativement à Heverlee, commune fusionnée avec Louvain — ce qui explique le nom complet du club.", socialReady: true },
  ],
  gallery: [],
  videos: [],
  matchdayTemplate: defaultMatchday(),
  services: ["Buvettes", "Boutique officielle (horaires à confirmer)", "Sanitaires"],
  accessibility: tbc<string[]>("Places PMR : à confirmer auprès du club"),
  lastVerified: LAST_AUDIT,
  sources: [
    PRO_LEAGUE,
    STADIUMDB,
    WIKI,
    clubSite("https://www.ohl.be"),
    viaSearch("OH Leuven — mobilité", "https://ohleuven.com/mobiliteit/"),
    viaSearch("OH Leuven — informations jour de match", "https://ohleuven.com/faq-matchday-info/"),
  ],
};

export default stadium;
