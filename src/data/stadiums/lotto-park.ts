import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite } from "../sources";
import { buildAccess, classicSections, defaultMatchday, defaultRules, defaultTicketing } from "../stadiumBase";

const stadium: Stadium = {
  id: "lotto-park",
  slug: "lotto-park",
  name: "Lotto Park",
  formerNames: ["Stade Constant Vanden Stock", "Stade Émile Versé"],
  clubId: "rsc-anderlecht",
  city: "Bruxelles",
  address: v("Avenue Théo Verbeeck 2, 1070 Anderlecht", WIKI, LAST_AUDIT, "Adresse à revalider auprès du club"),
  latitude: 50.8342,
  longitude: 4.2986,
  capacity: v(22500, STADIUMDB, LAST_AUDIT, "Capacité approximative ; jauge exploitée variable selon la rencontre"),
  openingYear: v(1917, WIKI, LAST_AUDIT, "Football sur le site du parc Astrid depuis 1917 ; enceinte largement reconstruite dans les années 1980"),
  tagline: "Un stade urbain posé dans un parc bruxellois, au cœur du club le plus titré de Belgique.",
  description:
    "Le Lotto Park est un cas rare : un grand stade de première division enclavé dans un quartier dense de Bruxelles, adossé au parc Astrid, accessible en métro. Il n'a ni parking-océan, ni esplanade géante : on y arrive à pied, par des rues de maisons. Cette contrainte urbaine est devenue son identité. Les tribunes sont hautes, rapprochées, et l'on entend le quartier autant que le stade.",
  architecture:
    "Une enceinte fermée à quatre tribunes couvertes, reconstruite par étapes dans les années 1980, avec des tribunes latérales à deux anneaux. L'impression dominante est celle d'un stade compact et vertical, très différent des arènes périphériques construites depuis. Les projets d'extension ou de reconstruction évoqués depuis plusieurs années sont à confirmer auprès du club.",
  history: [
    { year: 1917, title: "Le football arrive au parc Astrid", description: "Le Sporting s'installe sur le site qu'il n'a plus quitté depuis.", source: WIKI },
    { year: 1960, title: "Les débuts européens", description: "Anderlecht devient le premier club belge habitué des compétitions continentales. Le stade se transforme au rythme de ces campagnes.", source: WIKI },
    { year: 1983, title: "Reconstruction et nouveau nom", description: "L'enceinte est profondément reconstruite et prend le nom de Constant Vanden Stock. Détail des phases de travaux à confirmer.", source: WIKI },
    { year: 2018, title: "Le stade devient le Lotto Park", description: "Un accord de naming rebaptise l'enceinte. Le nom précédent reste très utilisé par les supporters.", source: WIKI },
    { year: 2026, title: "Question ouverte sur l'avenir du site", description: "Rénovation lourde ou nouveau stade : le débat reste ouvert. Information à confirmer." },
  ],
  fervour: {
    intro:
      "Anderlecht porte le poids d'être le club le plus titré du pays : le public y est exigeant, prompt à applaudir comme à siffler. Le mauve est partout, et les grands soirs européens transforment un stade réputé bourgeois en chaudron.",
    supporterGroups: tbc<string[]>("Groupes de supporters et implantation en tribunes : à documenter avec le club"),
    chants: tbc<string[]>("Répertoire des chants : à documenter"),
    traditions: [
      "Une sortie des joueurs très ritualisée, préparée par le virage.",
      "Le mauve et blanc comme code vestimentaire quasi total dans les tribunes populaires.",
      "Un public familial dans les tribunes latérales, très présent dès l'après-midi dans le parc.",
    ],
    rivalries: [
      { opponent: "Standard de Liège", name: "Le Clasico belge", description: "L'affiche de référence du football belge : Bruxelles contre Liège, avec une charge symbolique qui dépasse largement le sportif." },
      { opponent: "Club Brugge", name: "Le topper", description: "Le duel des deux clubs les plus titrés de l'ère moderne, souvent décisif pour le titre." },
      { opponent: "Royale Union Saint-Gilloise", name: "Le derby bruxellois", description: "Longtemps impossible faute de niveau commun, redevenu réalité avec le retour de l'Union en D1." },
    ],
    greatNights: [{ date: "Information à confirmer", title: "Les finales européennes des années 1970-1980", description: "Anderlecht a remporté des trophées européens durant cette période. Chaque match est documenté avant publication comme fait." }],
    attendance: tbc<string>("Affluence moyenne : à publier depuis les chiffres officiels Pro League"),
    quotes: [],
  },
  sections: classicSections({ main: "Tribune 1 (latérale principale)", opposite: "Tribune 2 (latérale)", home: "Tribune 3 (virage)", away: "Tribune 4 (virage)" }),
  access: buildAccess({
    train: "Bruxelles-Midi puis métro : c'est l'itinéraire le plus fiable pour venir de province.",
    station: "Bruxelles-Midi (correspondance métro) — halte locale à confirmer",
    transit: "Le stade est desservi par le métro bruxellois, à l'ouest de la ligne. C'est le point fort du Lotto Park : on y vient sans voiture.",
    car: "Déconseillée. Le stade est enclavé dans un tissu résidentiel dense, avec stationnement très contraint et circulation filtrée les jours de match.",
    foot: "Depuis la station de métro, l'approche se fait à pied par le parc et les rues du quartier : quelques minutes, dans un flux de supporters.",
    matchdayOnly: ["Stationnement riverain fortement contraint : le quartier est en zone réglementée.", "Les flux piétons sont canalisés vers des portes précises selon la tribune."],
  }),
  ticketing: { ...defaultTicketing("https://www.rsca.be") },
  rules: defaultRules(),
  beforeMatch: {
    intro: "L'avant-match se vit dans le parc Astrid et les cafés des rues adjacentes. Contrairement à beaucoup de stades belges, tout est accessible à pied.",
    places: [],
    timing: v("1 h 30 avant le coup d'envoi permet de profiter du parc sans stress aux contrôles.", { label: "Observation éditoriale Stadia Belgica", tier: 4 }, LAST_AUDIT),
  },
  afterMatch: {
    intro: "La sortie se fait vers le métro, qui absorbe l'essentiel du flux — avec des quais très chargés dans les 20 premières minutes.",
    tips: ["Laisser passer la première vague avant de descendre vers le métro.", "Vérifier l'heure du dernier train depuis Bruxelles-Midi avant le match.", "Le retour à pied vers le centre est long : ce n'est pas une option réaliste."],
    exits: tbc<string[]>("Plan des sorties par tribune : voir le plan officiel du club"),
  },
  anecdotes: [
    { hook: "Le stade a changé trois fois de nom, jamais de lieu", body: "Émile Versé, puis Constant Vanden Stock, puis Lotto Park : trois noms pour la même pelouse, occupée sans interruption depuis 1917.", source: WIKI, socialReady: true },
    { hook: "C'est l'un des rares grands stades d'Europe où l'on arrive par un parc", body: "Le Lotto Park est adossé au parc Astrid. L'approche se fait sous les arbres, pas sur un parking.", socialReady: true },
    { hook: "Sa capacité est limitée par le quartier, pas par le club", body: "Le stade est entouré de maisons. Toute extension bute sur l'urbanisme bruxellois : c'est la raison principale des projets de reconstruction évoqués depuis des années.", socialReady: true },
  ],
  gallery: [],
  videos: [],
  matchdayTemplate: defaultMatchday(),
  services: ["Buvettes en tribunes", "Boutique officielle (horaires à confirmer)", "Sanitaires par tribune"],
  accessibility: tbc<string[]>("Places PMR et services associés : à confirmer auprès du service supporters"),
  lastVerified: LAST_AUDIT,
  sources: [PRO_LEAGUE, STADIUMDB, WIKI, clubSite("https://www.rsca.be")],
};

export default stadium;
