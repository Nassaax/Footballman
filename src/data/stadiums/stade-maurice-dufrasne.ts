import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite, viaSearch } from "../sources";
import { defaultAccess, defaultMatchday, defaultRules, defaultTicketing } from "../stadiumBase";

const access = defaultAccess();

const MOBILITY = viaSearch("Standard de Liège — page mobilité", "https://standard.be/fr/mobility");
const TEC = viaSearch("TEC — P+R de Sclessin", "https://www.letec.be/View/PR_in_Luik_-_Standard/4587");

access.train.summary = v(
  "Le train reste le moyen le plus simple d'arriver dans le secteur, mais attention : la halte de Sclessin n'est pas desservie tous les jours. Pour un match du week-end, il faut passer par Liège-Guillemins puis le tram.",
  MOBILITY,
  LAST_AUDIT,
);
access.train.nearestStation = v(
  "Halte de Sclessin, à environ 15 minutes à pied du stade. Elle n'est desservie qu'en semaine : ce train ne circule pas le week-end.",
  MOBILITY,
  LAST_AUDIT,
  "Vérifiez systématiquement les horaires SNCB du jour de votre match",
);
access.train.walk = v("Environ 15 minutes depuis la halte de Sclessin.", MOBILITY, LAST_AUDIT);

access.publicTransport.summary = v(
  "Depuis Liège-Guillemins, le tram dessert Sclessin et dépose à quelques minutes à pied du stade. Point essentiel : la station Standard n'est plus desservie dans l'heure et demie qui précède le coup d'envoi, pour la gestion des flux de supporters.",
  MOBILITY,
  LAST_AUDIT,
);
access.publicTransport.details = v(
  [
    "Tram depuis Liège-Guillemins en direction de Sclessin.",
    "La station Standard ferme 1 h 30 avant le coup d'envoi : descendez à la station précédente et terminez à pied.",
    "Après la rencontre, le TEC affrète des bus au départ du pont d'Ougrée vers Ougrée-Haut, les quais, le pont de Fragnée, la place Général Leman, Guillemins et le centre-ville.",
  ],
  MOBILITY,
  LAST_AUDIT,
  "Tarif des navettes retour relevé à 2,60 € — à reconfirmer auprès du TEC",
);

access.car.summary = v(
  "Sclessin est enclavé entre la Meuse, la voie ferrée et un tissu industriel : la circulation sature dans les deux heures qui précèdent le coup d'envoi. Les parkings relais connectés au tram sont la meilleure option — mais ils sont réservés aux abonnés du club les jours de match.",
  MOBILITY,
  LAST_AUDIT,
);
access.car.parking = v(
  [
    "P+R de Sclessin (N63) : 665 places, dont 14 réservées aux personnes à mobilité réduite, connecté au tram.",
    "P+R de Bressoux (E25) : 771 places, dont 15 réservées aux personnes à mobilité réduite, connecté au tram.",
  ],
  TEC,
  LAST_AUDIT,
  "Les jours de match, ces P+R sont réservés aux abonnés du Standard",
);
access.car.restrictions = v(
  "Périmètre filtré autour du stade avant et après la rencontre, et accès aux P+R restreint aux abonnés les jours de match.",
  MOBILITY,
  LAST_AUDIT,
  "Détail des rues fermées : à confirmer auprès de la Ville de Liège",
);

access.bike.summary = tbc<string>("Stationnement vélo sécurisé : à confirmer auprès du club");
access.foot.summary = v(
  "Depuis le centre de Liège, l'approche se fait par les quais de Meuse. Le stade apparaît tard : il est encastré dans le quartier, pas posé dessus.",
  WIKI,
  LAST_AUDIT,
);
access.matchdayOnly = [
  "La halte SNCB de Sclessin n'est pas desservie le week-end : passez par Liège-Guillemins et le tram.",
  "La station de tram Standard ferme 1 h 30 avant le coup d'envoi.",
  "Les parkings relais sont réservés aux abonnés du club les jours de match.",
  "Le périmètre autour du stade est filtré avant et après la rencontre.",
];

const stadium: Stadium = {
  id: "stade-maurice-dufrasne",
  slug: "stade-maurice-dufrasne",
  name: "Stade Maurice-Dufrasne",
  formerNames: ["Stade de Sclessin"],
  clubId: "standard-de-liege",
  city: "Liège",
  address: v("Rue de la Centrale 2, 4000 Liège", WIKI, LAST_AUDIT, "Adresse à revalider auprès du club"),
  latitude: 50.6097,
  longitude: 5.5436,
  capacity: v(27670, STADIUMDB, LAST_AUDIT, "Capacité totale ; la jauge exploitée varie selon la rencontre"),
  openingYear: v(1909, WIKI, LAST_AUDIT, "Le site accueille du football depuis 1909 ; l'enceinte actuelle résulte de transformations successives"),
  tagline: "L'Enfer de Sclessin : le stade belge où le bruit fait partie du terrain.",
  description:
    "Sclessin n'est pas un stade que l'on visite, c'est un stade qui vous tombe dessus. Coincé entre la Meuse, une voie ferrée et l'héritage industriel de la vallée liégeoise, le Stade Maurice-Dufrasne n'a jamais eu la place de s'étaler. Résultat : quatre tribunes serrées, très proches de la pelouse, et une acoustique qui transforme 25 000 personnes en mur sonore. C'est le stade le plus intimidant du football belge, et probablement celui dont l'identité est la plus indissociable de sa ville.",
  architecture:
    "Une enceinte fermée, compacte, sans vide entre les tribunes. La verticalité des virages et la faible distance au terrain créent un effet de caisse de résonance. L'ensemble porte les traces de plusieurs générations de travaux : ce n'est pas une architecture unifiée, c'est une stratification. Une refonte complète du site est évoquée de longue date ; l'état d'avancement du projet est à confirmer auprès du club et des autorités.",
  history: [
    {
      year: 1909,
      title: "Le football arrive à Sclessin",
      description:
        "Le Standard s'installe dans le quartier industriel de Sclessin, au sud de Liège. Le site ne quittera plus jamais le club.",
      source: WIKI,
    },
    {
      year: 1958,
      title: "Le stade prend le nom de Maurice Dufrasne",
      description:
        "L'enceinte est rebaptisée en hommage à Maurice Dufrasne, figure dirigeante du club. Le nom officiel n'a jamais remplacé « Sclessin » dans l'usage populaire.",
      source: WIKI,
    },
    {
      year: 1970,
      title: "Les grandes années européennes",
      description:
        "Le Standard devient un habitué des soirées européennes. Sclessin se construit une réputation de forteresse dont les adversaires parlent encore.",
    },
    {
      year: 2000,
      title: "Mises aux normes successives",
      description:
        "Comme tous les stades belges, Sclessin passe par une série de rénovations imposées par les normes de sécurité et les exigences des compétitions européennes. Détail des phases de travaux à confirmer.",
      source: WIKI,
    },
    {
      year: 2026,
      title: "Un stade sous pression",
      description:
        "Le débat sur l'avenir du site — rénovation lourde ou nouvelle enceinte — reste ouvert. Information à confirmer auprès du club.",
    },
  ],
  fervour: {
    intro:
      "Sclessin est un stade où l'ambiance ne s'allume pas au premier but : elle est là avant, pendant, après. Le public liégeois entretient un rapport frontal, exigeant, presque syndical avec son équipe. On y chante fort, on y siffle fort, et on ne cache rien.",
    supporterGroups: tbc<string[]>("Groupes de supporters actifs et leur implantation en tribunes : à documenter avec le club et les groupes eux-mêmes"),
    chants: tbc<string[]>("Répertoire des chants : à documenter, en respectant les droits des auteurs le cas échéant"),
    traditions: [
      "Une entrée des joueurs très sonore, préparée par les virages.",
      "Un usage massif du rouge : écharpes, drapeaux, bâches sur toute la hauteur des tribunes.",
      "Une tradition de tifos dans les grands rendez-vous, portée par les groupes du virage.",
    ],
    rivalries: [
      {
        opponent: "RSC Anderlecht",
        name: "Le Clasico belge",
        description:
          "L'affiche la plus lourde du football belge. Deux villes, deux histoires, deux publics qui ne s'aiment pas. À Sclessin, c'est la rencontre qui fait le plus de bruit de l'année.",
      },
      {
        opponent: "Sporting Charleroi",
        name: "Le derby wallon",
        description:
          "Un derby de proximité entre deux bassins industriels wallons, avec une charge sociale et régionale très forte.",
      },
    ],
    greatNights: [
      {
        date: "Information à confirmer",
        title: "Les nuits européennes de Sclessin",
        description:
          "Plusieurs générations de supporters datent leur attachement au club d'une soirée européenne précise. Nous documentons ces matchs un par un, avec sources, avant de les publier comme faits.",
      },
    ],
    attendance: tbc<string>("Affluence moyenne : à publier uniquement à partir des chiffres officiels Pro League"),
    quotes: [],
  },
  sections: [
    {
      id: "t3",
      name: "Tribune 3",
      description:
        "Le virage historique du Standard, cœur du soutien vocal et visuel. C'est de là que partent les chants et les tifos.",
      entrance: tbc<string>("Numéros de portes : à confirmer sur le plan officiel du club"),
      atmosphere: "Très intense, debout une grande partie du match, chants continus.",
      audience: "Groupes de supporters organisés et public habitué du virage.",
      visibility: "Vue de derrière le but, hauteur progressive ; l'ambiance prime sur la lecture tactique.",
      accessibility: tbc<string>("Accès PMR dans cette tribune : à confirmer auprès du club"),
      services: ["Buvettes", "Sanitaires"],
      layout: { side: "north" },
      notes: "Déconseillée si vous cherchez une place assise calme avec de jeunes enfants.",
    },
    {
      id: "t1",
      name: "Tribune 1",
      description: "Tribune latérale principale, face aux caméras, avec la meilleure lecture du jeu.",
      entrance: tbc<string>(),
      atmosphere: "Assise, plus posée, mais loin d'être silencieuse les soirs de gala.",
      audience: "Abonnés de longue date, familles, invités.",
      visibility: "Vue latérale centrale : la meilleure du stade pour suivre les mouvements collectifs.",
      accessibility: tbc<string>(),
      services: ["Buvettes", "Sanitaires"],
      layout: { side: "west" },
    },
    {
      id: "t2",
      name: "Tribune 2",
      description: "Tribune latérale opposée, populaire et bruyante, en relais du virage.",
      entrance: tbc<string>(),
      atmosphere: "Populaire, très réactive.",
      audience: "Public mixte, abonnés et places à l'unité.",
      visibility: "Vue latérale.",
      accessibility: tbc<string>(),
      services: ["Buvettes", "Sanitaires"],
      layout: { side: "east" },
    },
    {
      id: "t4",
      name: "Tribune 4",
      description: "Virage opposé, qui accueille notamment le parcage visiteurs selon la configuration retenue.",
      entrance: tbc<string>(),
      atmosphere: "Variable selon la rencontre et la configuration.",
      audience: "Public local et supporters visiteurs dans un secteur dédié.",
      visibility: "Vue derrière le but.",
      accessibility: tbc<string>(),
      services: ["Buvettes", "Sanitaires"],
      layout: { side: "south" },
      notes: "La configuration exacte du parcage visiteurs est à confirmer pour chaque match.",
    },
  ],
  access,
  ticketing: {
    ...defaultTicketing("https://www.standard.be"),
    prices: tbc<string>("Tarif variable selon la rencontre et la catégorie de match"),
    awayFans: tbc<string>("Les supporters visiteurs passent généralement par leur propre club : à confirmer au cas par cas"),
  },
  rules: defaultRules(),
  beforeMatch: {
    intro:
      "L'avant-match liégeois ne se joue pas dans un mall : il se joue dans les cafés du quartier et sur les quais. C'est une des approches les plus authentiques du pays — et l'une des plus denses.",
    places: [],
    timing: v(
      "Comptez au minimum 1 h 30 avant le coup d'envoi pour vivre l'avant-match sans courir.",
      { label: "Recommandation éditoriale Stadia Belgica", tier: 4 },
      LAST_AUDIT,
    ),
  },
  afterMatch: {
    intro:
      "La sortie de Sclessin est un exercice de patience : le quartier est étroit et les flux se concentrent sur peu d'axes.",
    tips: [
      "Attendre 10 à 15 minutes en tribune évite l'essentiel de la compression aux sorties.",
      "Vers Liège-Guillemins, privilégier la marche le long de la Meuse plutôt que le premier bus.",
      "Vérifier l'heure du dernier train avant le match, pas après.",
    ],
    exits: tbc<string[]>("Plan des sorties par tribune : à confirmer sur le plan officiel du club"),
  },
  anecdotes: [
    {
      hook: "Le vrai nom du stade n'est pas celui que tout le monde utilise",
      body: "Officiellement, c'est le Stade Maurice-Dufrasne. Dans la vie réelle, personne ne dit ça : on dit Sclessin, du nom du quartier. Peu de stades en Europe ont un surnom aussi total qu'il efface le nom gravé sur les documents officiels.",
      source: WIKI,
      socialReady: true,
    },
    {
      hook: "Le stade est plus vieux que la plupart des clubs qu'il reçoit",
      body: "Le football se joue sur ce site depuis 1909. Sclessin a traversé l'industrialisation de la vallée de la Meuse, sa désindustrialisation, et il est toujours là, au même endroit.",
      source: WIKI,
      socialReady: true,
    },
    {
      hook: "Sa réputation vient de sa géométrie, pas de sa taille",
      body: "Sclessin n'est pas le plus grand stade de Belgique. Mais ses tribunes sont proches, hautes et fermées : le son ne s'échappe pas. C'est de l'acoustique, pas du folklore.",
      socialReady: true,
    },
  ],
  gallery: [],
  videos: [],
  matchdayTemplate: defaultMatchday(),
  services: [
    "Buvettes en tribunes",
    "Boutique officielle (horaires à confirmer)",
    "Sanitaires par tribune",
  ],
  accessibility: tbc<string[]>("Places PMR, accompagnateur, audiodescription : à confirmer auprès du service supporters du club"),
  lastVerified: LAST_AUDIT,
  sources: [PRO_LEAGUE, STADIUMDB, WIKI, clubSite("https://www.standard.be"), MOBILITY, TEC],
};

export default stadium;
