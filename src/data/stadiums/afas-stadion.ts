import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite, viaSearch } from "../sources";
import { buildAccess, classicSections, defaultMatchday, defaultRules, defaultTicketing } from "../stadiumBase";

const stadium: Stadium = {
  id: "afas-stadion",
  slug: "afas-stadion",
  name: "AFAS Stadion Achter de Kazerne",
  formerNames: ["Achter de Kazerne"],
  clubId: "kv-mechelen",
  city: "Malines",
  address: v(
    "Kleine Nieuwedijkstraat 53, 2800 Malines",
    viaSearch("KV Mechelen — stade", "https://kvmechelen.be/club/stadion/"),
    LAST_AUDIT,
  ),
  latitude: 51.0233,
  longitude: 4.4849,
  capacity: v(16672, WIKI, LAST_AUDIT),
  openingYear: tbc<number>("Le site est historique ; l'enceinte actuelle résulte d'une reconstruction par phases — dates à confirmer"),
  tagline: "Achter de Kazerne : un stade de centre-ville reconstruit sans quitter son quartier.",
  description:
    "Malines a réussi ce que beaucoup de clubs belges ont raté : moderniser son stade sans déménager en périphérie. Achter de Kazerne — « derrière la caserne » — reste à quelques minutes à pied du centre historique. Le résultat est une enceinte contemporaine, propre, mais toujours accessible à pied depuis la Grand-Place. Malinwa y entretient une ferveur jaune et rouge sans équivalent pour une ville de cette taille.",
  architecture:
    "Une enceinte reconstruite tribune par tribune, aujourd'hui homogène et entièrement couverte, avec des angles fermés. Les tribunes sont proches du terrain et le son est bien contenu. L'insertion urbaine est la vraie réussite du projet : le stade est dans la ville, pas à côté.",
  history: [
    { year: 1904, title: "Fondation du club", description: "Le KV Mechelen est fondé ; son histoire est marquée par des sommets européens et des chutes administratives.", source: WIKI },
    { year: 1988, title: "La Coupe des vainqueurs de coupe", description: "Le KV Mechelen remporte un trophée européen — le sommet absolu de son histoire. Détails à confirmer avant publication comme faits.", source: WIKI },
    { year: 2000, title: "Reconstruction par phases", description: "Le stade est modernisé progressivement tout en restant sur son site historique. Phases et dates à confirmer.", source: WIKI },
  ],
  fervour: {
    intro:
      "Malinwa est un club de ville moyenne avec une ferveur de grand club. Le public est nombreux, bruyant, et entretient une mémoire très vive des années 1980. Le jaune et rouge sature les tribunes.",
    supporterGroups: tbc<string[]>("Groupes de supporters : à documenter avec le club"),
    chants: tbc<string[]>("Répertoire des chants : à documenter"),
    traditions: ["Une mémoire européenne très présente dans l'iconographie du stade.", "Un avant-match en centre-ville, à pied.", "Un virage très coloré, jaune et rouge."],
    rivalries: [
      { opponent: "Royal Antwerp FC", description: "Rivalité régionale anversoise, avec une charge historique forte." },
      { opponent: "Lierse / clubs voisins", description: "Rivalités de proximité dont la tenue dépend des divisions respectives : à confirmer saison par saison." },
    ],
    greatNights: [{ date: "Information à confirmer", title: "La campagne européenne de 1988", description: "Le parcours européen victorieux du club reste la référence absolue. Documentation match par match en cours." }],
    attendance: tbc<string>("Affluence moyenne : à publier depuis les chiffres officiels Pro League"),
    quotes: [],
  },
  sections: classicSections({ main: "Tribune principale", opposite: "Tribune latérale opposée", home: "Virage des supporters", away: "Virage opposé" }),
  access: buildAccess({
    source: viaSearch("KV Mechelen — accès au stade", "https://kvmechelen.be/club/stadion/auto/"),
    train:
      "Malines est sur l'axe Bruxelles-Anvers, l'un des mieux desservis du pays. Descendez de préférence à Mechelen-Nekkerspoel : le stade est à environ un kilomètre à pied, contre une dizaine de minutes à vélo depuis la gare principale.",
    station: "Mechelen-Nekkerspoel (environ 1 km à pied) ou Malines centre",
    transit: "Réseau De Lijn depuis la gare et le centre. Lignes exactes à confirmer auprès de De Lijn.",
    car:
      "Accès autoroutier simple, mais le quartier se ferme avant la rencontre : le Kerkhoflei et la Kleine Nieuwedijkstraat côté Caputsteenweg sont barrés dès 1 h 30 avant le coup d'envoi. Le club organise du stationnement gratuit avec navettes.",
    parking: [
      "Stationnement gratuit avec navettes gratuites vers le stade, de 1 h 30 avant à 1 h 30 après la rencontre.",
      "Kerkhoflei et Kleine Nieuwedijkstraat (côté Caputsteenweg) fermés dès 1 h 30 avant le match.",
    ],
    foot: "Le stade est accessible à pied depuis le centre historique : c'est l'un des rares du championnat dans ce cas.",
    bike:
      "Malines est compacte et très cyclable : abris vélo gratuits et gardés au Lyceum et dans la Malinwastraat, environ 3 000 places au total.",
    matchdayOnly: [
      "Rues fermées autour du stade à partir de 1 h 30 avant le coup d'envoi.",
      "Les navettes depuis les parkings gratuits fonctionnent jusqu'à 1 h 30 après la rencontre.",
    ],
  }),
  ticketing: { ...defaultTicketing("https://www.kvmechelen.be") },
  rules: defaultRules(),
  beforeMatch: { intro: "Le centre de Malines, l'un des plus beaux de Flandre, sert d'avant-match. Grand-Place puis marche vers le stade.", places: [], timing: v("1 h 15 à 1 h 30 avant le coup d'envoi suffisent depuis le centre.", { label: "Observation éditoriale Stadia Belgica", tier: 4 }, LAST_AUDIT) },
  afterMatch: { intro: "Retour à pied vers le centre et la gare : c'est l'un des après-matchs les plus simples du championnat.", tips: ["Le centre-ville reste animé après la rencontre.", "La gare est proche : pas besoin de partir avant la fin.", "Vérifier tout de même le dernier train vers Bruxelles ou Anvers."], exits: tbc<string[]>() },
  anecdotes: [
    { hook: "Le nom du stade signifie « derrière la caserne »", body: "Achter de Kazerne désigne littéralement l'emplacement historique du terrain, derrière une caserne militaire de Malines.", source: WIKI, socialReady: true },
    { hook: "Ce club a gagné une coupe d'Europe", body: "Le KV Mechelen a remporté un trophée européen en 1988. Peu de clubs de cette taille peuvent en dire autant en Europe.", source: WIKI, socialReady: true },
    { hook: "Le stade a été reconstruit sans jamais déménager", body: "Contrairement à Gand ou Genk, Malines a modernisé son enceinte sur place, tribune par tribune, en restant à pied du centre.", socialReady: true },
  ],
  gallery: [],
  videos: [],
  matchdayTemplate: defaultMatchday(),
  services: ["Buvettes en tribunes", "Boutique officielle (horaires à confirmer)", "Espaces business", "Sanitaires par tribune"],
  accessibility: tbc<string[]>("Places PMR : à confirmer auprès du club"),
  lastVerified: LAST_AUDIT,
  sources: [
    PRO_LEAGUE,
    STADIUMDB,
    WIKI,
    clubSite("https://www.kvmechelen.be"),
    viaSearch("KV Mechelen — accès en voiture", "https://kvmechelen.be/club/stadion/auto/"),
    viaSearch("KV Mechelen — accès à vélo", "https://kvmechelen.be/club/stadion/fiets/"),
  ],
};

export default stadium;
