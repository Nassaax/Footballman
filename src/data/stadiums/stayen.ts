import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite, viaSearch } from "../sources";
import { buildAccess, classicSections, defaultMatchday, defaultRules, defaultTicketing } from "../stadiumBase";

const stadium: Stadium = {
  id: "stayen",
  slug: "stayen",
  name: "Stayen",
  clubId: "stvv",
  city: "Saint-Trond",
  address: v(
    "Tiensesteenweg 168, 3800 Saint-Trond",
    viaSearch("STVV — accessibilité", "https://www.stvv.com/en/stadium/accessibility"),
    LAST_AUDIT,
  ),
  latitude: 50.8078,
  longitude: 5.1747,
  capacity: v(14600, WIKI, LAST_AUDIT, "Capacité approximative à confirmer auprès du club"),
  openingYear: tbc<number>("Site historique, transformé en complexe multifonctionnel — dates à confirmer"),
  tagline: "Le stade-complexe : hôtel, bureaux, commerces et football dans le même bâtiment.",
  description:
    "Stayen est l'expérience la plus atypique du championnat belge. Le stade de STVV n'est pas seulement un stade : c'est un complexe intégrant hôtel, bureaux et surfaces commerciales autour de la pelouse. Le projet était visionnaire pour la Belgique des années 2000 ; il reste unique. Sur le terrain, les Canaris entretiennent une identité limbourgeoise forte, jaune et bleu, et un lien assumé avec le football japonais depuis le rachat du club.",
  architecture:
    "Un complexe multifonctionnel où les tribunes sont adossées à des bâtiments : hôtel, bureaux et commerces occupent les volumes périphériques. Vue de l'extérieur, l'enceinte ressemble davantage à un immeuble urbain qu'à un stade. À l'intérieur, la configuration reste celle d'un stade de football classique, couvert et compact.",
  history: [
    { year: 1924, title: "Fondation du club", description: "Le Sint-Truidense VV est fondé en Limbourg.", source: WIKI },
    { year: 2010, title: "Le complexe Stayen", description: "Le stade est transformé en complexe multifonctionnel intégrant hôtel, bureaux et commerces. Dates et phases à confirmer.", source: WIKI },
    { year: 2017, title: "Rachat par un actionnariat japonais", description: "Le club passe sous contrôle d'un groupe japonais, ce qui influence son recrutement et sa visibilité internationale. Détails à confirmer.", source: WIKI },
  ],
  fervour: {
    intro:
      "STVV a l'un des publics les plus constants du Limbourg pour une ville de cette taille. Le jaune et bleu des Canaris est partout, et les derbys limbourgeois contre Genk sont les rendez-vous de la saison.",
    supporterGroups: tbc<string[]>("Groupes de supporters : à documenter avec le club"),
    chants: tbc<string[]>("Répertoire des chants : à documenter"),
    traditions: ["L'identité Canaris (De Kanaries) dans toute l'imagerie du club.", "Une présence japonaise visible depuis le changement d'actionnariat.", "Un derby limbourgeois qui structure la saison."],
    rivalries: [{ opponent: "KRC Genk", name: "Le derby limbourgeois", description: "Le rendez-vous majeur de la province, entre la ville minière et la ville de fruitiers." }],
    greatNights: [{ date: "Information à confirmer", title: "Les derbys et les qualifications européennes", description: "Documentation en cours avant publication comme faits." }],
    attendance: tbc<string>("Affluence moyenne : à publier depuis les chiffres officiels Pro League"),
    quotes: [],
  },
  sections: classicSections({ main: "Tribune principale", opposite: "Tribune latérale opposée", home: "Virage des supporters", away: "Secteur visiteurs" }),
  access: buildAccess({
    source: viaSearch("STVV — accessibilité", "https://www.stvv.com/en/stadium/accessibility"),
    train:
      "C'est l'un des meilleurs accès ferroviaires du championnat : la gare de Saint-Trond est à environ 5 minutes à pied du stade, avec au moins un train par heure depuis Bruxelles et Gand.",
    station: "Saint-Trond (Sint-Truiden), à environ 5 minutes à pied",
    walk: "Environ 5 minutes depuis la gare de Saint-Trond.",
    car:
      "Accès autoroutier limbourgeois, mais attention : la Tiensesteenweg est fermée à la circulation de deux heures avant le match jusqu'à une heure après.",
    parking: [
      "Zone gratuite le long de la Zoutleeuwsesteenweg, en sens unique à partir de 2 heures avant le coup d'envoi.",
      "Parking payant Gazo : environ 1 € de l'heure, à quelque 500 mètres du stade.",
      "Parking de la gare SNCB, à proximité immédiate.",
    ],
    bike: "Région fruitière plate et très cyclable ; un vaste parking vélo souterrain est aménagé sous Stayen.",
    matchdayOnly: [
      "La Tiensesteenweg est fermée de 2 heures avant à 1 heure après la rencontre.",
      "Les affluences record de ces dernières saisons saturent les abords : arrivez tôt ou venez en train.",
    ],
  }),
  ticketing: { ...defaultTicketing("https://www.stvv.com") },
  rules: defaultRules(),
  beforeMatch: { intro: "Le complexe lui-même offre des services avant le match, ce qui est unique en Belgique. Le centre de Saint-Trond, avec sa grande place, est une alternative.", places: [], timing: v("1 h avant le coup d'envoi suffit grâce aux services intégrés au complexe.", { label: "Observation éditoriale Stadia Belgica", tier: 4 }, LAST_AUDIT) },
  afterMatch: { intro: "Sortie fluide ; le complexe permet de prolonger sur place, ce qui est rare.", tips: ["Vérifier les derniers trains via Landen.", "Le centre de Saint-Trond est à distance de marche raisonnable."], exits: tbc<string[]>() },
  anecdotes: [
    { hook: "Vous pouvez dormir dans le stade", body: "Stayen intègre un hôtel dans son enceinte : certaines chambres donnent sur la pelouse. C'est unique en Belgique.", source: WIKI, socialReady: true },
    { hook: "Un club belge avec un actionnariat japonais", body: "STVV appartient à un groupe japonais depuis 2017, ce qui lui donne une visibilité inhabituelle en Asie.", source: WIKI, socialReady: true },
    { hook: "Le stade est aussi un immeuble de bureaux", body: "Autour des tribunes : bureaux, commerces, hôtel. Le modèle a été conçu pour financer le football par l'immobilier.", source: WIKI, socialReady: true },
  ],
  gallery: [],
  videos: [],
  matchdayTemplate: defaultMatchday(),
  services: ["Buvettes en tribunes", "Hôtel intégré au complexe", "Commerces et bureaux", "Boutique officielle (horaires à confirmer)"],
  accessibility: tbc<string[]>("Places PMR : à confirmer auprès du club"),
  lastVerified: LAST_AUDIT,
  sources: [
    PRO_LEAGUE,
    STADIUMDB,
    WIKI,
    clubSite("https://www.stvv.com"),
    viaSearch("STVV — accessibilité", "https://www.stvv.com/en/stadium/accessibility"),
  ],
};

export default stadium;
