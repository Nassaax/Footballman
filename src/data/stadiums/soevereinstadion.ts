import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite } from "../sources";
import { buildAccess, classicSections, defaultMatchday, defaultRules, defaultTicketing } from "../stadiumBase";

const stadium: Stadium = {
  id: "soevereinstadion",
  slug: "soevereinstadion",
  name: "Soevereinstadion",
  clubId: "lommel-sk",
  city: "Lommel",
  address: tbc<string>("Adresse exacte à confirmer auprès du club"),
  latitude: 51.2239,
  longitude: 5.3216,
  capacity: v(8000, WIKI, LAST_AUDIT, "Capacité approximative à confirmer auprès du club"),
  openingYear: tbc<number>("Date d'ouverture à confirmer auprès du club"),
  tagline: "Le stade limbourgeois d'un club adossé à un réseau international.",
  description:
    "Lommel occupe une place particulière dans le paysage belge : club de Campine limbourgeoise, intégré à un réseau international de clubs, avec un projet sportif largement tourné vers la formation et la revente. Le Soevereinstadion est modeste et fonctionnel, dans une commune où le football se vit sans emphase. C'est un stade pour observer un modèle économique autant qu'un match.",
  architecture:
    "Enceinte compacte de faible capacité, modernisée pour répondre aux exigences du football professionnel. Les abords sont dégagés et l'accès à pied depuis les parkings est direct.",
  history: [
    { year: 1932, title: "Origines du club", description: "Le football professionnel à Lommel a connu plusieurs entités successives. L'histoire précise est à retracer avec le club.", source: WIKI },
    { year: 2020, title: "Intégration à un réseau international de clubs", description: "Lommel SK rejoint un groupe multi-clubs, ce qui redéfinit son modèle sportif. Détails à confirmer auprès du club.", source: WIKI },
  ],
  fervour: {
    intro:
      "L'ambiance de Lommel est locale et sans artifice : un noyau fidèle, des tribunes où l'on se connaît, et un rapport décomplexé à la faible affluence. C'est l'un des endroits les plus accessibles du championnat pour une première expérience.",
    supporterGroups: tbc<string[]>("Groupes de supporters : à documenter avec le club"),
    chants: tbc<string[]>("Répertoire des chants : à documenter"),
    traditions: ["Une expérience familiale et peu ritualisée.", "Un attachement limbourgeois marqué."],
    rivalries: [{ opponent: "KRC Genk et clubs limbourgeois", description: "Rivalités de proximité provinciale, d'intensité variable selon les divisions." }],
    greatNights: [{ date: "Information à confirmer", title: "Les montées et les grands soirs du club", description: "Documentation en cours avant publication comme faits." }],
    attendance: tbc<string>("Affluence moyenne : à publier depuis les chiffres officiels Pro League"),
    quotes: [],
  },
  sections: classicSections({ main: "Tribune principale", opposite: "Tribune latérale opposée", home: "Virage des supporters", away: "Secteur visiteurs" }),
  access: buildAccess({
    train: "Il n'y a pas de gare à Lommel : l'accès implique une correspondance en bus depuis une gare limbourgeoise.",
    station: "Pas de gare à Lommel — gare de rabattement et liaison bus à confirmer auprès de De Lijn",
    car: "La voiture est le moyen d'accès principal, avec des abords dégagés.",
    bike: "Le Limbourg possède l'un des meilleurs réseaux cyclables d'Europe : le vélo est une option réaliste localement.",
    matchdayOnly: ["Sans voiture, vérifiez les horaires de bus de retour avant de venir."],
  }),
  ticketing: { ...defaultTicketing("https://www.lommelsk.com") },
  rules: defaultRules(),
  beforeMatch: { intro: "L'avant-match est local et discret : quelques cafés, puis le stade.", places: [], timing: v("45 min à 1 h avant le coup d'envoi suffisent.", { label: "Observation éditoriale Stadia Belgica", tier: 4 }, LAST_AUDIT) },
  afterMatch: { intro: "Sortie immédiate ; la contrainte est le retour en transports en commun.", tips: ["Anticiper le retour si vous n'êtes pas motorisé."], exits: tbc<string[]>() },
  anecdotes: [
    { hook: "Un club belge dans un réseau mondial", body: "Lommel SK fait partie d'un groupe international de clubs, ce qui influence son recrutement et son projet sportif. Détails à confirmer auprès du club.", source: WIKI, socialReady: true },
    { hook: "Pas de gare, pas de problème... sauf au retour", body: "Lommel n'a pas de gare ferroviaire. C'est l'un des rares stades du championnat où venir sans voiture demande une vraie préparation.", socialReady: true },
  ],
  gallery: [],
  videos: [],
  matchdayTemplate: defaultMatchday(),
  services: ["Buvettes", "Sanitaires"],
  accessibility: tbc<string[]>("Places PMR : à confirmer auprès du club"),
  lastVerified: LAST_AUDIT,
  sources: [PRO_LEAGUE, STADIUMDB, WIKI, clubSite("https://www.lommelsk.com")],
};

export default stadium;
