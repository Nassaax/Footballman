import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite } from "../sources";
import { buildAccess, classicSections, defaultMatchday, defaultRules, defaultTicketing } from "../stadiumBase";

const stadium: Stadium = {
  id: "guldensporenstadion",
  slug: "guldensporenstadion",
  name: "Guldensporenstadion",
  clubId: "kv-kortrijk",
  city: "Courtrai",
  address: v("Burgemeester Felix de Bethunelaan, 8500 Courtrai", WIKI, LAST_AUDIT, "Adresse à revalider auprès du club"),
  latitude: 50.8088,
  longitude: 3.2547,
  capacity: v(9399, WIKI, LAST_AUDIT),
  openingYear: tbc<number>("Date d'ouverture à confirmer auprès du club"),
  tagline: "Le stade des Éperons d'or : petit, compact, et nommé d'après une bataille de 1302.",
  description:
    "Le Guldensporenstadion porte le nom de la bataille des Éperons d'or, livrée à Courtrai en 1302 — un des événements fondateurs de l'imaginaire flamand. Le stade, lui, est modeste : moins de 10 000 places, quatre tribunes serrées, une atmosphère de club de province qui reçoit les grands sans complexe. C'est un excellent premier stade pour qui découvre le championnat belge : tout est à portée, rien n'est intimidant.",
  architecture:
    "Enceinte compacte à quatre tribunes, modernisée par étapes. Les gradins sont proches du terrain et la faible capacité crée une proximité inhabituelle avec les joueurs. L'implantation est périurbaine, avec des abords dégagés.",
  history: [
    { year: 1971, title: "Naissance du KV Kortrijk", description: "Le club actuel naît de la fusion de deux clubs de la ville.", source: WIKI },
    { year: 2000, title: "Modernisations successives", description: "Le stade est mis aux normes par phases pour la première division. Dates à confirmer.", source: WIKI },
  ],
  fervour: {
    intro:
      "Courtrai cultive une ferveur de proximité : on connaît les joueurs, on reconnaît les voisins en tribune. Le rouge et blanc domine, avec un noyau de supporters très stable malgré les saisons difficiles.",
    supporterGroups: tbc<string[]>("Groupes de supporters : à documenter avec le club"),
    chants: tbc<string[]>("Répertoire des chants : à documenter"),
    traditions: ["Une référence constante aux Éperons d'or et à l'identité flamande de la ville.", "Une culture familiale en tribunes latérales.", "Un virage réduit mais constant."],
    rivalries: [
      { opponent: "SV Zulte Waregem", name: "Le derby de Flandre occidentale", description: "Le duel régional le plus attendu de la saison pour les deux clubs." },
      { opponent: "Club Brugge", description: "Rencontre régionale avec un fort écart de moyens." },
    ],
    greatNights: [{ date: "Information à confirmer", title: "Les grandes soirées de Courtrai", description: "Les qualifications européennes et les victoires face aux cadors font l'histoire récente du club. Documentation en cours." }],
    attendance: tbc<string>("Affluence moyenne : à publier depuis les chiffres officiels Pro League"),
    quotes: [],
  },
  sections: classicSections({ main: "Tribune principale", opposite: "Tribune latérale opposée", home: "Virage des supporters", away: "Virage visiteurs" }),
  access: buildAccess({
    train: "Courtrai est un nœud ferroviaire de Flandre occidentale, bien relié à Gand, Bruges et Lille.",
    station: "Courtrai (Kortrijk) — temps de marche vers le stade à confirmer",
    transit: "Réseau De Lijn depuis la gare. Lignes exactes à confirmer.",
    car: "Accès autoroutier simple (E17 / E403) et abords moins saturés que dans les grandes villes.",
    bike: "Ville cyclable, trajets courts. Stationnement vélo à confirmer.",
  }),
  ticketing: { ...defaultTicketing("https://www.kvk.be") },
  rules: defaultRules(),
  beforeMatch: { intro: "Courtrai a un centre-ville agréable et compact : l'avant-match s'y organise facilement avant de rejoindre le stade.", places: [], timing: v("1 h avant le coup d'envoi suffit dans un stade de cette taille.", { label: "Observation éditoriale Stadia Belgica", tier: 4 }, LAST_AUDIT) },
  afterMatch: { intro: "Sortie rapide : c'est l'un des avantages des petites enceintes.", tips: ["Retour vers la gare sans difficulté particulière.", "Le centre reste ouvert en soirée.", "Vérifier les liaisons vers Lille si vous venez de France."], exits: tbc<string[]>() },
  anecdotes: [
    { hook: "Le stade est nommé d'après une bataille de 1302", body: "La bataille des Éperons d'or (Guldensporenslag) s'est déroulée à Courtrai le 11 juillet 1302. La date est devenue la fête de la Communauté flamande.", source: WIKI, socialReady: true },
    { hook: "Moins de 10 000 places : vous entendez les joueurs parler", body: "Avec environ 9 400 places, le Guldensporenstadion offre une proximité que les grands stades ont perdue.", source: WIKI, socialReady: true },
  ],
  gallery: [],
  videos: [],
  matchdayTemplate: defaultMatchday(),
  services: ["Buvettes en tribunes", "Boutique officielle (horaires à confirmer)", "Sanitaires par tribune"],
  accessibility: tbc<string[]>("Places PMR : à confirmer auprès du club"),
  lastVerified: LAST_AUDIT,
  sources: [PRO_LEAGUE, STADIUMDB, WIKI, clubSite("https://www.kvk.be")],
};

export default stadium;
