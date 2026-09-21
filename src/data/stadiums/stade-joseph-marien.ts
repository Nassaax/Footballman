import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite } from "../sources";
import { buildAccess, defaultMatchday, defaultRules, defaultTicketing, sections } from "../stadiumBase";

const stadium: Stadium = {
  id: "stade-joseph-marien",
  slug: "stade-joseph-marien",
  name: "Stade Joseph Marien",
  clubId: "union-saint-gilloise",
  city: "Bruxelles",
  address: v("Chaussée de Bruxelles 223, 1190 Forest (Bruxelles)", WIKI, LAST_AUDIT, "Adresse à revalider auprès du club"),
  latitude: 50.8129,
  longitude: 4.3378,
  capacity: v(9400, STADIUMDB, LAST_AUDIT, "Capacité approximative ; jauge exploitée variable selon la compétition"),
  openingYear: v(1919, WIKI, LAST_AUDIT, "Date à revalider auprès du club"),
  tagline: "Le plus beau stade de Belgique, et le plus petit à jouer l'Europe.",
  description:
    "Adossé au parc Duden, le Stade Joseph Marien est un monument. Sa tribune principale en briques, ses arbres qui surplombent les gradins, son étroitesse : c'est un stade d'avant-guerre encore en activité au plus haut niveau, ce qui n'existe presque plus en Europe. Le retour de l'Union parmi l'élite — puis en coupes d'Europe — a rendu cette contradiction spectaculaire : un club qui joue la Ligue des champions dans un stade de 9 000 places, avec des matchs européens parfois délocalisés.",
  architecture:
    "Tribune principale historique en briques, couverte, avec une charpente et une façade d'époque. Le reste de l'enceinte est adossé au relief du parc Duden : les gradins s'appuient littéralement sur la colline, avec des arbres en arrière-plan. C'est le stade le plus photographié du pays, et le plus contraint : son gabarit ne permet pas les normes UEFA les plus exigeantes. Un projet de nouveau stade fait débat à Bruxelles ; son état d'avancement est à confirmer.",
  history: [
    { year: 1897, title: "Fondation de l'Union", description: "La Royale Union Saint-Gilloise est fondée ; elle deviendra le club le plus titré de l'avant-guerre belge.", source: WIKI },
    { year: 1919, title: "Le stade du parc Duden", description: "Le club s'installe à Forest, sur le site adossé au parc Duden. Date exacte à revalider.", source: WIKI },
    { year: 1935, title: "L'invincibilité légendaire", description: "L'Union enchaîne une série record de matchs sans défaite en championnat dans les années 1930. Chiffres exacts à confirmer avant publication.", source: WIKI },
    { year: 2021, title: "Le retour dans l'élite", description: "Après des décennies dans les divisions inférieures, l'Union remonte en première division. Le Joseph Marien redevient un stade de haut niveau.", source: WIKI },
    { year: 2026, title: "Un stade trop petit pour ses ambitions", description: "Le débat sur un nouveau stade se poursuit à Bruxelles, avec une opposition locale documentée. Information à confirmer." },
  ],
  fervour: {
    intro:
      "L'ambiance de l'Union est une exception belge : un public jeune, bruxellois, bilingue, largement reconstitué depuis 2018, qui a inventé ses propres codes plutôt que d'hériter de ceux d'un virage historique. On y chante beaucoup, debout, très près du terrain.",
    supporterGroups: tbc<string[]>("Groupes de supporters : à documenter avec le club"),
    chants: tbc<string[]>("Répertoire des chants : à documenter"),
    traditions: ["Un public debout dans une tribune populaire de très faible capacité.", "Une culture d'avant-match dans le parc Duden et les cafés de Forest et Saint-Gilles.", "Un bilinguisme assumé, rare dans les tribunes belges."],
    rivalries: [
      { opponent: "RSC Anderlecht", name: "Le derby bruxellois", description: "Longtemps impossible faute de niveau commun, il est redevenu l'une des affiches les plus attendues de la saison." },
      { opponent: "Club Brugge", description: "Duel de haut de tableau né du retour de l'Union au sommet." },
    ],
    greatNights: [{ date: "Information à confirmer", title: "Les soirées européennes de l'Union", description: "Le retour de l'Union en Europe, parfois dans une enceinte délocalisée, a produit des soirées de référence. Documentation en cours." }],
    attendance: tbc<string>("Affluence moyenne : à publier depuis les chiffres officiels Pro League"),
    quotes: [],
  },
  sections: sections([
    { id: "tribune-principale", name: "Tribune principale (historique)", side: "west", description: "La tribune en briques classée dans l'imaginaire du football belge : couverte, étroite, très proche du terrain.", atmosphere: "Assise, chargée d'histoire, avec une acoustique surprenante sous la toiture.", audience: "Abonnés historiques, visiteurs venus pour l'architecture.", visibility: "Vue latérale centrale, très proche de la pelouse.", notes: "C'est la tribune à choisir pour comprendre pourquoi ce stade est unique." },
    { id: "tribune-duden", name: "Côté parc Duden", side: "east", description: "Le côté adossé au relief du parc, avec les arbres en fond d'image.", atmosphere: "Populaire.", audience: "Public mixte.", visibility: "Vue latérale.", notes: "La configuration d'accueil de ce côté varie : à confirmer match par match." },
    { id: "virage", name: "Virage des supporters", side: "north", description: "Le cœur du soutien vocal, de très faible capacité.", atmosphere: "Debout, chants continus, densité maximale.", audience: "Supporters organisés et habitués.", visibility: "Derrière le but, faible hauteur.", notes: "Les places y partent très vite." },
    { id: "visiteurs", name: "Secteur visiteurs", side: "south", description: "Parcage visiteurs, de capacité réduite compte tenu du gabarit du stade.", atmosphere: "Variable selon la rencontre.", audience: "Supporters visiteurs.", visibility: "Derrière le but.", notes: "Capacité très limitée : les clubs visiteurs reçoivent peu de places." },
  ]),
  access: buildAccess({
    train: "Bruxelles-Midi est la porte d'entrée, avec une correspondance courte vers Forest.",
    station: "Bruxelles-Midi, puis tram/bus — halte locale à confirmer",
    transit: "Le stade est desservi par le réseau STIB-MIVB (tram et bus) depuis le sud de Bruxelles. Lignes exactes à confirmer auprès de la STIB.",
    car: "Fortement déconseillée : quartier dense, stationnement réglementé, rues étroites autour du parc.",
    bike: "Accès vélo courant depuis le centre de Bruxelles. Stationnement au stade à confirmer.",
    foot: "L'approche par le parc Duden, en montée, est l'une des plus belles arrivées de stade du pays.",
    matchdayOnly: ["Certaines rencontres européennes peuvent être délocalisées dans une autre enceinte : vérifier le lieu avant de partir.", "Le nombre de places est très faible : ne comptez pas acheter un billet sur place."],
  }),
  ticketing: { ...defaultTicketing("https://www.rusg.brussels"), conditions: tbc<string[]>("Stade de très faible capacité : la demande dépasse régulièrement l'offre. Modalités à confirmer sur la billetterie officielle.") },
  rules: defaultRules(),
  beforeMatch: {
    intro: "Le parc Duden avant un match est une des images fortes du football belge : des groupes partout dans l'herbe, puis une montée collective vers les portes.",
    places: [],
    timing: v("Arriver 1 h 30 avant permet de profiter du parc et d'éviter les files d'une enceinte étroite.", { label: "Observation éditoriale Stadia Belgica", tier: 4 }, LAST_AUDIT),
  },
  afterMatch: {
    intro: "La sortie se fait par des accès étroits vers la chaussée de Bruxelles : c'est lent par construction.",
    tips: ["Redescendre par le parc plutôt que par la chaussée quand c'est autorisé.", "Saint-Gilles et Forest offrent de nombreux cafés ouverts après le match.", "Les trams vers le centre sont saturés : attendre quelques minutes change tout."],
    exits: tbc<string[]>("Plan des sorties : voir le plan officiel du club"),
  },
  anecdotes: [
    { hook: "Un club de Ligue des champions dans un stade de 9 000 places", body: "Le Joseph Marien est le plus petit stade de Jupiler Pro League. Pour ses campagnes européennes, l'Union a dû jouer certaines rencontres ailleurs faute de conformité aux normes UEFA.", source: STADIUMDB, socialReady: true },
    { hook: "Les arbres du parc font partie du décor du match", body: "Les gradins sont adossés au parc Duden : les arbres surplombent littéralement le stade, ce qui en fait l'enceinte la plus photographiée du pays.", socialReady: true },
    { hook: "L'Union était le club le plus titré de Belgique... avant la guerre", body: "Dans les années 1930, l'Union dominait le football belge avec une série d'invincibilité restée célèbre. Puis elle a disparu du haut niveau pendant des décennies.", source: WIKI, socialReady: true },
  ],
  gallery: [],
  videos: [],
  matchdayTemplate: defaultMatchday(),
  services: ["Buvettes (capacité limitée)", "Boutique officielle (horaires à confirmer)", "Sanitaires"],
  accessibility: tbc<string[]>("Stade ancien : accessibilité PMR à confirmer impérativement auprès du club avant de vous déplacer"),
  lastVerified: LAST_AUDIT,
  sources: [PRO_LEAGUE, STADIUMDB, WIKI, clubSite("https://www.rusg.brussels")],
};

export default stadium;
