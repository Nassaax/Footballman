import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite, viaSearch } from "../sources";
import { buildAccess, classicSections, defaultMatchday, defaultRules, defaultTicketing } from "../stadiumBase";

const stadium: Stadium = {
  id: "freethiel",
  slug: "freethiel",
  name: "Freethielstadion",
  clubId: "sk-beveren",
  city: "Beveren",
  address: v(
    "Stadionplein 1, 9120 Beveren-Waas",
    viaSearch("SK Beveren — stationnement", "https://www.skbeveren.be/parkeren/"),
    LAST_AUDIT,
  ),
  latitude: 51.2088,
  longitude: 4.2589,
  capacity: v(8190, WIKI, LAST_AUDIT, "Capacité approximative à confirmer auprès du club"),
  openingYear: tbc<number>("Date d'ouverture à confirmer auprès du club"),
  tagline: "Le Freethiel : un stade qui a connu la coupe d'Europe, puis la chute, puis le retour.",
  description:
    "Le Freethiel raconte une trajectoire typiquement belge : un club du pays de Waes qui a joué les premiers rôles et connu l'Europe dans les années 1970-1980, avant une longue période de difficultés et de refondations. Le stade, lui, est resté. Aujourd'hui, SK Beveren y fait remonter le club vers l'élite avec une base locale très attachée à cette mémoire.",
  architecture:
    "Enceinte compacte de quatre tribunes, marquée par son âge et par des rénovations partielles. Le terrain est proche des gradins. L'implantation est périurbaine, dans une commune bien desservie par l'axe Anvers-Gand.",
  history: [
    { year: 1970, title: "Les grandes années", description: "Le club de Beveren s'installe parmi les meilleurs du pays et découvre les compétitions européennes. Détails et palmarès à confirmer avant publication comme faits.", source: WIKI },
    { year: 2010, title: "Refondations successives", description: "Le football professionnel à Beveren a connu plusieurs entités et changements de nom. Histoire précise à retracer avec le club.", source: WIKI },
  ],
  fervour: {
    intro:
      "La ferveur du Freethiel repose sur la mémoire : beaucoup de supporters ont connu l'époque européenne et la transmettent. L'ambiance est celle d'un club de commune flamande, familiale et constante.",
    supporterGroups: tbc<string[]>("Groupes de supporters : à documenter avec le club"),
    chants: tbc<string[]>("Répertoire des chants : à documenter"),
    traditions: ["Une mémoire très vive des années européennes du club.", "Un public de proximité du pays de Waes."],
    rivalries: [{ opponent: "Clubs du pays de Waes et de Flandre orientale", description: "Rivalités régionales, d'intensité variable selon les divisions." }],
    greatNights: [{ date: "Information à confirmer", title: "Les soirées européennes du Freethiel", description: "Documentation en cours avant publication comme faits." }],
    attendance: tbc<string>("Affluence moyenne : à publier depuis les chiffres officiels Pro League"),
    quotes: [],
  },
  sections: classicSections({ main: "Tribune principale", opposite: "Tribune latérale opposée", home: "Virage des supporters", away: "Secteur visiteurs" }),
  access: buildAccess({
    source: viaSearch("SK Beveren — stationnement", "https://www.skbeveren.be/parkeren/"),
    train:
      "Beveren est sur l'axe Anvers-Gand. La gare est à une dizaine de minutes à pied des abords du stade : c'est l'accès le plus simple.",
    station: "Beveren, à environ 10 minutes à pied",
    walk: "Environ 10 minutes depuis la gare de Beveren.",
    car:
      "Accès autoroutier direct, mais le stationnement du stade est payant et segmenté par zone, avec des tarifs qui varient fortement d'un parking à l'autre.",
    parking: [
      "Parking P1 : 50 € par match.",
      "Parking Bosdam : 20 € par match, à 7 minutes à pied du stade.",
      "Parking P5, au bout du Meerminnendam : 10 € par match.",
    ],
    bike: "Commune plate et cyclable : le club recommande explicitement de venir à pied ou à vélo quand c'est possible.",
    matchdayOnly: [
      "Les tarifs de parking varient du simple au quintuple selon la zone : vérifiez avant de vous garer.",
    ],
  }),
  ticketing: { ...defaultTicketing("https://www.skbeveren.be") },
  rules: defaultRules(),
  beforeMatch: { intro: "L'avant-match est local : cafés de Beveren, puis le stade à quelques minutes.", places: [], timing: v("1 h avant le coup d'envoi suffit.", { label: "Observation éditoriale Stadia Belgica", tier: 4 }, LAST_AUDIT) },
  afterMatch: { intro: "Sortie rapide et retour ferroviaire simple vers Anvers ou Gand.", tips: ["Vérifier les derniers trains vers Anvers et Gand."], exits: tbc<string[]>() },
  anecdotes: [
    { hook: "Ce stade a vu jouer la coupe d'Europe", body: "Beveren a été un club majeur du football belge avant de disparaître du haut niveau. Le stade a conservé cette mémoire.", source: WIKI, socialReady: true },
    { hook: "Le club a changé de nom plusieurs fois, le stade jamais", body: "Les refondations successives du football professionnel à Beveren n'ont jamais touché au Freethiel.", socialReady: true },
  ],
  gallery: [],
  videos: [],
  matchdayTemplate: defaultMatchday(),
  services: ["Buvettes", "Sanitaires"],
  accessibility: tbc<string[]>("Places PMR : à confirmer auprès du club"),
  lastVerified: LAST_AUDIT,
  sources: [
    PRO_LEAGUE,
    STADIUMDB,
    WIKI,
    clubSite("https://www.skbeveren.be"),
    viaSearch("SK Beveren — stationnement", "https://www.skbeveren.be/parkeren/"),
    viaSearch("SK Beveren — plan de mobilité et parking vélo", "https://www.skbeveren.be/mobiliteit/mobiliteitsplan-fietsenparking/"),
  ],
};

export default stadium;
