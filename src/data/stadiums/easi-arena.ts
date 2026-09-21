import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite } from "../sources";
import { buildAccess, classicSections, defaultMatchday, defaultRules, defaultTicketing } from "../stadiumBase";

const stadium: Stadium = {
  id: "easi-arena",
  slug: "easi-arena",
  name: "Easi Arena",
  formerNames: ["Stade du Tivoli"],
  clubId: "raal-la-louviere",
  city: "La Louvière",
  address: tbc<string>("Adresse exacte à confirmer auprès du club"),
  latitude: 50.48,
  longitude: 4.185,
  capacity: v(8050, WIKI, LAST_AUDIT, "Capacité approximative à confirmer auprès du club"),
  openingYear: tbc<number>("Historique du site et date d'ouverture à confirmer auprès du club"),
  tagline: "Le retour du football à La Louvière : un club refondé par ses supporters.",
  description:
    "La Louvière est l'une des histoires les plus intéressantes du football belge récent. Après la disparition des entités précédentes, la RAAL a été reconstruite depuis le bas, portée par un public qui remplissait les tribunes bien avant que le club n'atteigne l'élite. Le stade, dans le bassin industriel du Centre, est le théâtre d'une ferveur disproportionnée par rapport à sa capacité.",
  architecture:
    "Enceinte compacte modernisée pour accompagner la montée du club vers le football professionnel. La faible capacité, combinée à un public très dense, produit une acoustique nettement supérieure à ce que la taille laisse supposer. État exact des tribunes et phases de travaux à confirmer auprès du club.",
  history: [
    { year: 2020, title: "La construction d'un nouveau club", description: "La RAAL La Louvière poursuit son ascension depuis les divisions inférieures, avec des affluences exceptionnelles pour son niveau. Dates précises à confirmer auprès du club.", source: WIKI },
    { year: 2025, title: "La montée en Jupiler Pro League", description: "Le club rejoint l'élite du football belge. Détails à confirmer.", source: WIKI },
  ],
  fervour: {
    intro:
      "Ce que la RAAL a réussi est rare : mobiliser des milliers de personnes dans des divisions amateurs. Le public louviérois a porté la reconstruction du club, et l'ambiance au stade reste celle d'un mouvement populaire plutôt que d'un produit sportif.",
    supporterGroups: tbc<string[]>("Groupes de supporters : à documenter avec le club"),
    chants: tbc<string[]>("Répertoire des chants : à documenter"),
    traditions: ["Une identité « Loups » omniprésente.", "Un attachement au bassin du Centre et à son histoire industrielle.", "Des affluences très élevées relativement à la capacité disponible."],
    rivalries: [
      { opponent: "Sporting Charleroi", description: "Rivalité de proximité entre deux villes du bassin industriel wallon." },
      { opponent: "Standard de Liège", description: "Affiche wallonne à forte charge symbolique." },
    ],
    greatNights: [{ date: "Information à confirmer", title: "Les montées successives", description: "Chaque montée a été célébrée comme un titre. Documentation en cours." }],
    attendance: tbc<string>("Affluence moyenne : à publier depuis les chiffres officiels Pro League"),
    quotes: [],
  },
  sections: classicSections({ main: "Tribune principale", opposite: "Tribune latérale opposée", home: "Virage des supporters", away: "Secteur visiteurs" }),
  access: buildAccess({
    train: "La Louvière est reliée au réseau ferré wallon ; la halte la plus proche du stade est à confirmer.",
    station: "La Louvière — halte la plus proche et temps de marche à confirmer",
    transit: "Réseau TEC. Lignes desservant le stade les jours de match à confirmer auprès du TEC.",
    car: "Accès autoroutier wallon (E19 / E42). Stationnement aux abords à confirmer auprès du club.",
    matchdayOnly: ["Stade de faible capacité avec forte demande : n'y allez pas sans billet."],
  }),
  ticketing: { ...defaultTicketing("https://www.raal.be"), conditions: tbc<string[]>("Forte demande relative à la capacité : réservation anticipée vivement conseillée. Modalités à confirmer.") },
  rules: defaultRules(),
  beforeMatch: { intro: "L'avant-match se vit dans les cafés du quartier et du centre de La Louvière, avec une ambiance de bassin populaire.", places: [], timing: v("1 h 15 avant le coup d'envoi pour absorber les files d'une petite enceinte.", { label: "Observation éditoriale Stadia Belgica", tier: 4 }, LAST_AUDIT) },
  afterMatch: { intro: "Sortie rapide côté stade, retour ferroviaire à vérifier en soirée.", tips: ["Vérifier les derniers trains wallons : les fréquences tombent tôt.", "Le centre de La Louvière reste actif après les matchs à forte affluence."], exits: tbc<string[]>() },
  anecdotes: [
    { hook: "Un club reconstruit par son public", body: "La RAAL est remontée depuis les séries inférieures avec des affluences que certains clubs de première division n'atteignent pas. Chiffres exacts à confirmer.", socialReady: true },
    { hook: "Le stade s'appelait le Tivoli", body: "Le nom historique du site est resté dans l'usage local malgré le naming commercial actuel.", source: WIKI, socialReady: true },
  ],
  gallery: [],
  videos: [],
  matchdayTemplate: defaultMatchday(),
  services: ["Buvettes", "Boutique officielle (horaires à confirmer)", "Sanitaires"],
  accessibility: tbc<string[]>("Places PMR : à confirmer auprès du club"),
  lastVerified: LAST_AUDIT,
  sources: [PRO_LEAGUE, STADIUMDB, WIKI, clubSite("https://www.raal.be")],
};

export default stadium;
