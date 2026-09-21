import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite, viaSearch } from "../sources";
import { buildAccess, classicSections, defaultMatchday, defaultRules, defaultTicketing } from "../stadiumBase";

const stadium: Stadium = {
  id: "stade-du-pays-de-charleroi",
  slug: "stade-du-pays-de-charleroi",
  name: "Stade du Pays de Charleroi",
  formerNames: ["Stade du Mambourg"],
  clubId: "sporting-charleroi",
  city: "Charleroi",
  address: v("Boulevard Zoé Drion, 6000 Charleroi", WIKI, LAST_AUDIT, "Adresse à revalider auprès du club"),
  latitude: 50.4147,
  longitude: 4.4527,
  capacity: v(15000, STADIUMDB, LAST_AUDIT, "Capacité approximative ; jauge exploitée variable"),
  openingYear: v(1939, WIKI, LAST_AUDIT, "Site historique du Mambourg ; enceinte reconstruite avant l'Euro 2000"),
  tagline: "Le Mambourg : un stade ouvrier au centre d'une ville qui ne s'excuse de rien.",
  description:
    "On dit encore « le Mambourg », jamais le nom officiel. Le stade du Sporting de Charleroi est planté en pleine ville, à quelques minutes du centre, dans un paysage marqué par l'industrie et sa reconversion. C'est un stade sans coquetterie, avec un public réputé pour son humour noir et sa fidélité inversement proportionnelle aux résultats. Les zèbres, noir et blanc, sont devenus une identité visuelle instantanément reconnaissable.",
  architecture:
    "Une enceinte rectangulaire compacte, largement reconstruite en vue de l'Euro 2000, avec des tribunes proches du terrain et une toiture basse qui contient le son. La tribune populaire est le cœur acoustique du stade. L'ensemble est urbain : pas d'esplanade, pas de parking géant, on arrive par des rues.",
  history: [
    { year: 1904, title: "Fondation du Sporting", description: "Le Royal Charleroi Sporting Club est fondé dans le bassin industriel carolorégien.", source: WIKI },
    { year: 1939, title: "Le stade du Mambourg", description: "Le club s'installe sur le site du Mambourg, qu'il n'a plus quitté depuis. Date à revalider.", source: WIKI },
    { year: 1999, title: "Reconstruction pour l'Euro 2000", description: "Le stade est reconstruit et rebaptisé Stade du Pays de Charleroi pour accueillir des rencontres du championnat d'Europe.", source: WIKI },
    { year: 2000, title: "Matchs de l'Euro 2000", description: "Charleroi accueille des matchs de la compétition. Liste exacte à confirmer.", source: WIKI },
  ],
  fervour: {
    intro:
      "Charleroi a le public le plus autodérisoire de Belgique et l'un des plus loyaux. Le stade se remplit quand l'équipe joue mal, ce qui n'est pas une évidence ailleurs. Le noir et blanc en tribunes, associé aux chants wallons, produit une ambiance très identifiable.",
    supporterGroups: tbc<string[]>("Groupes de supporters : à documenter avec le club"),
    chants: tbc<string[]>("Répertoire des chants : à documenter"),
    traditions: ["Le zèbre comme emblème total : maillots, tifos, drapeaux.", "Une culture de café avant match très dense dans le centre de Charleroi.", "Un humour de tribune assumé, souvent dirigé contre le club lui-même."],
    rivalries: [
      { opponent: "Standard de Liège", name: "Le derby wallon", description: "L'affiche la plus chaude de Wallonie, entre deux bassins industriels aux identités fortes." },
      { opponent: "RSC Anderlecht", description: "Rencontre à forte charge sociale entre Charleroi et la capitale." },
    ],
    greatNights: [{ date: "Information à confirmer", title: "Les soirées européennes du Sporting", description: "Les qualifications européennes du club ont produit des soirées mémorables au Mambourg. Documentation en cours." }],
    attendance: tbc<string>("Affluence moyenne : à publier depuis les chiffres officiels Pro League"),
    quotes: [],
  },
  sections: classicSections({ main: "Tribune principale", opposite: "Tribune latérale opposée", home: "Tribune populaire (virage)", away: "Virage opposé" }),
  access: buildAccess({
    source: viaSearch("Sporting Charleroi — informations jour de match", "https://www.sporting-charleroi.be/faq/matchday-info/"),
    train: "Charleroi-Central est proche du stade : c'est l'un des accès ferroviaires les plus pratiques du championnat.",
    station: "Charleroi-Central, puis métro ligne 4 direction Gilly",
    transit:
      "Depuis Charleroi-Central, prenez le métro léger ligne 4 en direction de Gilly et descendez à Waterloo : les stations Casernes et Waterloo sont les plus proches du stade. En bus TEC : lignes 18, 43, 50, 710, VILLE, E83 ou S63. Attention, l'arrêt Janson est fermé les jours de match.",
    car: "Accès autoroutier direct par le ring de Charleroi, mais stationnement urbain contraint aux abords immédiats.",
    parking: [
      "Parking QPark, boulevard Zoé Drion : entrée sur la gauche en venant du rond-point Marsupilami.",
    ],
    foot: "Depuis la gare et le centre-ville, l'approche à pied est réaliste et fait partie de l'expérience.",
    matchdayOnly: [
      "L'arrêt de bus Janson est fermé les jours de match : descendez plus tôt ou passez par le métro.",
      "Le centre-ville est le point de rendez-vous naturel avant le match.",
    ],
  }),
  ticketing: { ...defaultTicketing("https://www.sporting-charleroi.be") },
  rules: defaultRules(),
  beforeMatch: {
    intro: "Charleroi est l'un des rares stades belges où l'avant-match se vit vraiment en centre-ville, à pied, dans les cafés.",
    places: [],
    timing: v("1 h 30 avant, avec le trajet depuis le centre compté dans le temps.", { label: "Observation éditoriale Stadia Belgica", tier: 4 }, LAST_AUDIT),
  },
  afterMatch: {
    intro: "La proximité de la gare rend le retour simple, mais les quais se remplissent d'un coup.",
    tips: ["Laisser passer la première vague avant de rejoindre Charleroi-Central.", "Le centre reste ouvert après le match : c'est un bon après-match urbain.", "Vérifier les correspondances : Charleroi est un nœud ferroviaire, mais les dernières liaisons sont tôt."],
    exits: tbc<string[]>("Plan des sorties : voir le plan officiel du club"),
  },
  anecdotes: [
    { hook: "Personne ne dit le vrai nom du stade", body: "Officiellement Stade du Pays de Charleroi depuis la reconstruction de 1999. Dans les tribunes, c'est le Mambourg — et ça ne changera pas.", source: WIKI, socialReady: true },
    { hook: "Le stade a accueilli l'Euro 2000", body: "Charleroi a fait partie des villes hôtes du championnat d'Europe organisé par la Belgique et les Pays-Bas.", source: WIKI, socialReady: true },
    { hook: "C'est l'un des stades les plus proches d'une grande gare en Belgique", body: "Charleroi-Central est à quelques minutes du stade : venir en train est plus simple qu'en voiture.", socialReady: true },
  ],
  gallery: [],
  videos: [],
  matchdayTemplate: defaultMatchday(),
  services: ["Buvettes en tribunes", "Boutique officielle (horaires à confirmer)", "Sanitaires par tribune"],
  accessibility: tbc<string[]>("Places PMR : à confirmer auprès du club"),
  lastVerified: LAST_AUDIT,
  sources: [
    PRO_LEAGUE,
    STADIUMDB,
    WIKI,
    clubSite("https://www.sporting-charleroi.be"),
    viaSearch("Sporting Charleroi — informations jour de match", "https://www.sporting-charleroi.be/faq/matchday-info/"),
  ],
};

export default stadium;
