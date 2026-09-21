import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite, viaSearch } from "../sources";
import { buildAccess, classicSections, defaultMatchday, defaultRules, defaultTicketing } from "../stadiumBase";

const stadium: Stadium = {
  id: "cegeka-arena",
  slug: "cegeka-arena",
  name: "Cegeka Arena",
  formerNames: ["Fenixstadion", "Luminus Arena"],
  clubId: "krc-genk",
  city: "Genk",
  address: v("Stadionplein 4, 3600 Genk", WIKI, LAST_AUDIT, "Adresse à revalider auprès du club"),
  latitude: 50.9989,
  longitude: 5.535,
  capacity: v(24956, WIKI, LAST_AUDIT),
  openingYear: v(1999, WIKI, LAST_AUDIT, "Enceinte agrandie par étapes depuis son ouverture"),
  tagline: "L'arène bleue du Limbourg, née d'un bassin minier et d'un club sans passé bourgeois.",
  description:
    "Genk est une ville jeune, construite autour du charbon et de l'immigration. Son club l'est aussi : né d'une fusion en 1988, il n'a pas de mythologie centenaire — il a une ambition. La Cegeka Arena traduit ça : une enceinte moderne, agrandie par paliers, qui affiche la deuxième plus grande capacité du championnat sans être dans une grande ville. Quand le virage se met en bleu, l'effet est massif.",
  architecture:
    "Un stade fonctionnel des années 1990, agrandi par ajouts successifs plutôt que par reconstruction : la géométrie n'est pas parfaitement homogène, mais les tribunes sont proches et couvertes. L'ensemble est intégré dans un complexe sportif, avec des abords dégagés — très différent de l'enclavement urbain d'Anderlecht ou de Sclessin.",
  history: [
    { year: 1988, title: "Naissance du club", description: "KRC Genk naît d'une fusion de clubs limbourgeois. Le club moderne est plus jeune que la plupart de ses adversaires.", source: WIKI },
    { year: 1999, title: "Ouverture du stade", description: "Le club s'installe dans sa nouvelle enceinte, alors appelée Fenixstadion — en référence au passé minier de la région.", source: WIKI },
    { year: 2010, title: "Agrandissements", description: "La capacité est augmentée par phases pour accompagner les campagnes européennes du club. Détail des phases à confirmer.", source: WIKI },
    { year: 2020, title: "Changements de naming", description: "Luminus Arena, puis Cegeka Arena : le nom commercial évolue au fil des partenariats.", source: WIKI },
  ],
  fervour: {
    intro:
      "Genk a construit une ferveur sans héritage : pas de mythologie ancienne, mais un attachement territorial très fort au Limbourg et à son histoire minière. Le bleu est total, et le stade est l'un des plus bruyants du pays lors des grands rendez-vous européens.",
    supporterGroups: tbc<string[]>("Groupes de supporters : à documenter avec le club"),
    chants: tbc<string[]>("Répertoire des chants : à documenter"),
    traditions: ["Le bleu intégral en tribunes, d'où le surnom « De Smurfen ».", "Une référence assumée au passé minier de la région dans l'iconographie du club.", "Une forte proportion de familles et de jeunes dans les tribunes latérales."],
    rivalries: [
      { opponent: "STVV", name: "Le derby limbourgeois", description: "Le duel de référence de la province, entre Genk et Saint-Trond." },
      { opponent: "Standard de Liège", description: "Rencontre entre deux bassins industriels voisins, de part et d'autre de la frontière linguistique." },
    ],
    greatNights: [{ date: "Information à confirmer", title: "Les campagnes de Ligue des champions", description: "Genk a disputé plusieurs phases de groupes européennes. Chaque soirée est documentée avant publication." }],
    attendance: tbc<string>("Affluence moyenne : à publier depuis les chiffres officiels Pro League"),
    quotes: [],
  },
  sections: classicSections({ main: "Tribune principale", opposite: "Tribune latérale opposée", home: "Virage des supporters", away: "Virage opposé" }),
  access: buildAccess({
    source: viaSearch("KRC Genk — accessibilité", "https://www.krcgenk.be/nl/faq/bereikbaarheid"),
    train: "Genk est relié au réseau ferré, mais la gare n'est pas adjacente au stade : une liaison bus est nécessaire.",
    station: "Genk, puis bus De Lijn ligne 3",
    transit:
      "Le bus De Lijn ligne 3 dessert le stade, avec un arrêt à une centaine de mètres de l'entrée.",
    car:
      "C'est un stade conçu pour la voiture — mais avec une nuance de taille : les places des parkings du stade sont réservées aux membres Blauw-Wit abonnés, pas au public. Sans abonnement parking, il faut se rabattre sur le Thor Park ou le stationnement libre autorisé dans le quartier.",
    parking: [
      "Parkings du stade : environ 500 places, réservées aux membres Blauw-Wit avec abonnement parking.",
      "Thor Park : zone de stationnement gratuite, à 5 minutes à pied du stade.",
      "Stationnement libre aux emplacements autorisés aux abords du stade.",
    ],
    bike: "Le Limbourg est très équipé en infrastructures cyclables ; un parking vélo couvert se trouve à l'arrière du stade.",
    matchdayOnly: [
      "Sans abonnement parking, ne comptez pas entrer sur les parkings du stade : visez le Thor Park.",
      "Les zones gratuites se remplissent tôt pour les grandes affiches.",
    ],
  }),
  ticketing: { ...defaultTicketing("https://www.krcgenk.be") },
  rules: defaultRules(),
  beforeMatch: {
    intro: "L'avant-match se concentre autour du complexe sportif plutôt qu'en centre-ville : c'est une expérience de type arena, pas de quartier.",
    places: [],
    timing: v("1 h 15 à 1 h 30 avant le coup d'envoi suffisent grâce aux abords dégagés.", { label: "Observation éditoriale Stadia Belgica", tier: 4 }, LAST_AUDIT),
  },
  afterMatch: {
    intro: "La sortie est fluide à pied, plus lente en voiture : les parkings se vident par un nombre limité d'axes.",
    tips: ["Se garer en périphérie du complexe pour sortir plus vite.", "Vérifier les liaisons de retour vers la gare : elles s'arrêtent tôt en soirée.", "Les abords restent animés après les grandes soirées européennes."],
    exits: tbc<string[]>("Plan des sorties : voir le plan officiel du club"),
  },
  anecdotes: [
    { hook: "Le stade s'appelait Fenixstadion — en référence aux mines", body: "Le premier nom du stade évoquait le phénix : la renaissance d'une région après la fermeture des charbonnages limbourgeois.", source: WIKI, socialReady: true },
    { hook: "C'est le deuxième plus grand stade du championnat", body: "Avec près de 25 000 places, la Cegeka Arena devance Bruxelles et Liège. Pour une ville de la taille de Genk, c'est un rapport population/capacité inhabituel en Belgique.", source: WIKI, socialReady: true },
    { hook: "Le club est plus jeune que son propre public", body: "KRC Genk est né d'une fusion en 1988. Beaucoup de supporters dans les tribunes sont plus âgés que le club qu'ils soutiennent.", source: WIKI, socialReady: true },
  ],
  gallery: [],
  videos: [],
  matchdayTemplate: defaultMatchday(),
  services: ["Buvettes en tribunes", "Boutique officielle (horaires à confirmer)", "Parkings sur site", "Sanitaires par tribune"],
  accessibility: tbc<string[]>("Places PMR : à confirmer auprès du club"),
  lastVerified: LAST_AUDIT,
  sources: [
    PRO_LEAGUE,
    STADIUMDB,
    WIKI,
    clubSite("https://www.krcgenk.be"),
    viaSearch("KRC Genk — accessibilité", "https://www.krcgenk.be/nl/faq/bereikbaarheid"),
    viaSearch("KRC Genk — stationnement autour de la Cegeka Arena", "https://www.krcgenk.be/nl/club/cegeka-arena/parkeren-rondom-cegeka-arena"),
  ],
};

export default stadium;
