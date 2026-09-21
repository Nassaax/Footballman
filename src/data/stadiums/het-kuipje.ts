import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite, viaSearch } from "../sources";
import { buildAccess, classicSections, defaultMatchday, defaultRules, defaultTicketing } from "../stadiumBase";

const stadium: Stadium = {
  id: "het-kuipje",
  slug: "het-kuipje",
  name: "Het Kuipje",
  clubId: "kvc-westerlo",
  city: "Westerlo",
  address: v(
    "De Merodedreef 189, 2260 Westerlo",
    viaSearch("KVC Westerlo — contact", "https://kvcwesterlo.be/kvc-westerlo-enallemaalsamen/contact/"),
    LAST_AUDIT,
  ),
  latitude: 51.0888,
  longitude: 4.9195,
  capacity: v(8035, WIKI, LAST_AUDIT),
  openingYear: tbc<number>("Date d'ouverture à confirmer auprès du club"),
  tagline: "Le plus petit des grands stades : un club de village en première division.",
  description:
    "Westerlo est une commune de Campine, pas une ville. Et pourtant son club joue régulièrement en première division, dans un stade surnommé « Het Kuipje » — la petite cuve. Tout y est à échelle réduite : la capacité, les distances, les abords. C'est l'un des rares endroits du football professionnel européen où l'on ressent encore une atmosphère de club de village, avec des adversaires qui jouent la Ligue des champions trois jours plus tard.",
  architecture:
    "Une enceinte compacte de quatre tribunes basses, modernisée par étapes pour répondre aux normes de la première division. Le terrain est très proche des gradins. L'implantation est rurale : le stade est entouré de verdure et de zones résidentielles basses.",
  history: [
    { year: 1933, title: "Fondation du club", description: "Le KVC Westerlo est fondé en Campine anversoise.", source: WIKI },
    { year: 2000, title: "Les années en première division", description: "Le club s'installe durablement dans l'élite malgré la taille de sa commune. Périodes exactes à confirmer.", source: WIKI },
  ],
  fervour: {
    intro:
      "La ferveur de Westerlo est celle d'une communauté : on vient en famille, on connaît le personnel du club, et le jaune et bleu est un code local. L'ambiance n'est pas celle d'un chaudron, c'est celle d'un village qui reçoit.",
    supporterGroups: tbc<string[]>("Groupes de supporters : à documenter avec le club"),
    chants: tbc<string[]>("Répertoire des chants : à documenter"),
    traditions: ["Le surnom « De Kemphanen » (les coqs de combat) présent dans toute l'iconographie.", "Une expérience très familiale et accessible.", "Un avant-match qui se joue dans les cafés du village."],
    rivalries: [{ opponent: "Clubs de Campine et d'Anvers", description: "Rivalités de proximité régionales, variables selon les divisions : à confirmer." }],
    greatNights: [{ date: "Information à confirmer", title: "Les soirs où Westerlo a battu les grands", description: "L'histoire du club est faite de coups réalisés à domicile contre des adversaires bien plus riches. Documentation en cours." }],
    attendance: tbc<string>("Affluence moyenne : à publier depuis les chiffres officiels Pro League"),
    quotes: [],
  },
  sections: classicSections({ main: "Tribune principale", opposite: "Tribune latérale opposée", home: "Virage des supporters", away: "Secteur visiteurs" }),
  access: buildAccess({
    source: viaSearch("KVC Westerlo — questions fréquentes", "https://kvcwesterlo.be/frequentlyaskedquestions/"),
    train:
      "Aucune liaison ferroviaire directe : depuis la halte de Westerlo, il reste environ 3 kilomètres jusqu'au stade, à faire en bus ou en taxi.",
    station: "Westerlo, à environ 3 km du stade",
    transit:
      "Le stade est sur la De Merodedreef, à environ 1,8 kilomètre à l'est du centre de Westerlo. Plusieurs arrêts de bus jalonnent l'axe, et la marche depuis le centre prend moins d'un quart d'heure.",
    car: "La voiture est ici le moyen de transport principal, ce qui est rare dans le championnat. Mais le stade ne dispose que d'un seul parking sur site : la capacité est limitée.",
    parking: [
      "Parking 6 : 5 € les jours de match.",
      "Capacité limitée sur site : prévoyez de vous rabattre sur le quartier résidentiel voisin et de finir à pied.",
    ],
    bike: "La Campine est très cyclable et le vélo est un usage local courant.",
    matchdayOnly: [
      "Sans voiture, vérifiez impérativement les horaires de bus de retour : ils sont rares en soirée.",
      "Le parking du stade se remplit vite : arriver tôt évite de chercher une place dans les rues voisines.",
    ],
  }),
  ticketing: { ...defaultTicketing("https://www.kvcwesterlo.be") },
  rules: defaultRules(),
  beforeMatch: { intro: "L'avant-match se passe dans les cafés du village, à quelques minutes du stade. C'est simple, et c'est le charme de l'endroit.", places: [], timing: v("1 h avant le coup d'envoi suffit largement.", { label: "Observation éditoriale Stadia Belgica", tier: 4 }, LAST_AUDIT) },
  afterMatch: { intro: "Sortie rapide, mais retour en transports en commun compliqué en soirée.", tips: ["Prévoir votre retour avant de venir si vous n'êtes pas en voiture.", "Les cafés du village restent ouverts après la rencontre."], exits: tbc<string[]>() },
  anecdotes: [
    { hook: "Le nom du stade veut dire « la petite cuve »", body: "Het Kuipje est un clin d'œil au surnom du stade de Feyenoord, De Kuip (la cuve). Westerlo, avec 8 000 places, assume le diminutif.", source: WIKI, socialReady: true },
    { hook: "Une commune de village en première division", body: "Westerlo est l'une des plus petites entités à disputer régulièrement l'élite belge. La capacité du stade dépasse une part importante de la population locale.", socialReady: true },
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
    clubSite("https://www.kvcwesterlo.be"),
    viaSearch("KVC Westerlo — questions fréquentes", "https://kvcwesterlo.be/frequentlyaskedquestions/"),
  ],
};

export default stadium;
