import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite, viaSearch } from "../sources";
import { buildAccess, classicSections, defaultMatchday, defaultRules, defaultTicketing } from "../stadiumBase";

const stadium: Stadium = {
  id: "bosuilstadion",
  slug: "bosuilstadion",
  name: "Bosuilstadion",
  clubId: "royal-antwerp",
  city: "Anvers",
  address: v("Oude Bosuilbaan 54, 2100 Deurne (Anvers)", WIKI, LAST_AUDIT, "Adresse à revalider auprès du club"),
  latitude: 51.2308,
  longitude: 4.4728,
  capacity: v(21000, STADIUMDB, LAST_AUDIT, "Capacité approximative après rénovation par phases"),
  openingYear: v(1923, WIKI, LAST_AUDIT, "Le site accueille le football depuis 1923 ; tribunes reconstruites par étapes"),
  tagline: "Le stade du matricule n°1 : le plus vieux club de Belgique, dans son propre quartier d'Anvers.",
  description:
    "Le Bosuil est le stade du Royal Antwerp FC, matricule n°1 du football belge. C'est un lieu qui ne ressemble à aucun autre dans le pays : une enceinte de quartier, à Deurne, où chaque tribune raconte une époque différente de rénovation. Le club a passé des années hors de l'élite ; son retour a rempli le stade et remis le Bosuil sur la carte européenne. L'ambiance y est brute, très anversoise, et volontiers provocatrice.",
  architecture:
    "Une enceinte hétérogène, reconstruite tribune par tribune : les nouvelles structures côtoient des éléments plus anciens. Ce patchwork est exactement ce qui fait son caractère. Les tribunes sont proches du terrain et le stade est inséré dans un tissu résidentiel — on ne le découvre qu'au dernier moment en arrivant.",
  history: [
    { year: 1880, title: "Fondation du club", description: "Le Royal Antwerp FC est le plus ancien club de football de Belgique : il porte le matricule n°1.", source: WIKI },
    { year: 1923, title: "Installation au Bosuil", description: "Le club s'installe à Deurne, sur le site qu'il occupe depuis.", source: WIKI },
    { year: 1993, title: "La finale européenne", description: "L'Antwerp atteint une finale de Coupe des coupes d'Europe. Détails à confirmer avant publication comme faits.", source: WIKI },
    { year: 2017, title: "Retour dans l'élite et rénovations", description: "Après une longue absence, le club remonte en première division ; le stade est rénové par phases pour répondre aux normes.", source: WIKI },
  ],
  fervour: {
    intro:
      "Anvers ne fait rien à moitié. Le public du Bosuil combine une fidélité forgée dans les années de galère et une arrogance assumée de grande ville portuaire. Le retour du club dans l'élite a produit l'une des ambiances les plus denses du championnat.",
    supporterGroups: tbc<string[]>("Groupes de supporters : à documenter avec le club"),
    chants: tbc<string[]>("Répertoire des chants : à documenter"),
    traditions: ["Une identité « The Great Old » revendiquée partout dans le stade.", "Un attachement territorial très marqué à Anvers et à Deurne.", "Un virage dense, utilisant largement le rouge et blanc."],
    rivalries: [
      { opponent: "Beerschot", name: "Le derby anversois", description: "La rivalité historique de la ville. Sa tenue dépend du niveau respectif des clubs : à confirmer saison par saison." },
      { opponent: "Club Brugge", description: "Affiche de haut de tableau devenue régulière depuis le retour de l'Antwerp dans l'élite." },
    ],
    greatNights: [{ date: "Information à confirmer", title: "Le retour de l'Europe au Bosuil", description: "Les premières soirées européennes après des décennies d'absence ont marqué une génération. Documentation en cours." }],
    attendance: tbc<string>("Affluence moyenne : à publier depuis les chiffres officiels Pro League"),
    quotes: [],
  },
  sections: classicSections({ main: "Tribune principale", opposite: "Tribune latérale opposée", home: "Tribune 2 (virage)", away: "Tribune 4 (virage)" }),
  access: buildAccess({
    source: viaSearch("Royal Antwerp FC — Bosuilstadion", "https://www.royalantwerpfc.be/club/bosuilstadion"),
    train: "Anvers-Central est le point d'entrée logique ; le stade se trouve à Deurne, hors du centre, avec une correspondance en tram.",
    station: "Anvers-Central (Antwerpen-Centraal), puis tram 5",
    transit:
      "Le tram 5 est la liaison de référence : arrêts « Deurne - Antwerp Stadion » et « Deurne - Hermans », et 20 minutes jusqu'au centre-ville. Le bus 19 s'arrête à « Deurne - Bosuilplein ». En replis : tram 10 à Venneborgplein (10 min à pied), tram 8 à Wim Saerensplein (12 à 15 min), tram 15 à Bischoppenhoflaan (15 min), bus 40 à Venneborgplein.",
    car:
      "Déconseillée en approche directe : le stade est dans un quartier résidentiel dense et sa capacité de stationnement est très limitée. Sur site, le parking est réservé aux abonnés qui ont pris l'option.",
    parking: [
      "Parking du stade : réservé aux abonnés ayant souscrit une place.",
      "Parking Gosselin (entrée par la Belcrownlaan) : places supplémentaires du club, à distance de marche.",
      "P+R Bosuil (angle Alfons Schneiderlaan / Vic Meesstraat) : 123 places, à 200 mètres de l'arrêt de tram « Deurne Antwerp Stadion ». Réservé aux supporters les jours de match.",
    ],
    bike: "Anvers est très cyclable et le vélo est un usage courant pour rejoindre le Bosuil.",
    matchdayOnly: [
      "Le P+R Bosuil bascule en usage réservé aux supporters les jours de match.",
      "Le quartier est en stationnement réglementé : la voiture est rarement une bonne idée.",
      "Les trams vers le centre sont saturés après le coup de sifflet final.",
    ],
  }),
  ticketing: { ...defaultTicketing("https://www.royalantwerpfootballclub.be") },
  rules: defaultRules(),
  beforeMatch: {
    intro: "L'avant-match du Bosuil est un avant-match de quartier : cafés de Deurne, trottoirs, et un flux qui monte lentement. Le centre d'Anvers offre une alternative plus urbaine, à distance.",
    places: [],
    timing: v("1 h 30 avant le coup d'envoi, avec le trajet depuis le centre compté séparément.", { label: "Observation éditoriale Stadia Belgica", tier: 4 }, LAST_AUDIT),
  },
  afterMatch: {
    intro: "La sortie se fait par des rues étroites vers les arrêts de tram : c'est lent, mais le quartier reste vivant.",
    tips: ["Marcher quelques arrêts vers le centre plutôt que prendre le premier tram.", "Anvers offre l'un des meilleurs après-matchs urbains de Belgique.", "Vérifier le dernier train depuis Anvers-Central."],
    exits: tbc<string[]>("Plan des sorties : voir le plan officiel du club"),
  },
  anecdotes: [
    { hook: "C'est le stade du club n°1 de Belgique — littéralement", body: "Le Royal Antwerp FC porte le matricule n°1 de la fédération belge : c'est le plus ancien club du pays, fondé en 1880.", source: WIKI, socialReady: true },
    { hook: "Chaque tribune du Bosuil date d'une époque différente", body: "Le stade n'a jamais été reconstruit d'un seul coup. Il a été rénové tribune par tribune, ce qui donne une enceinte visuellement disparate — et unique.", socialReady: true },
    { hook: "Le club a joué en deuxième division pendant des années", body: "L'Antwerp a passé une longue période hors de l'élite avant son retour en 2017. Le Bosuil s'est rempli à nouveau en quelques mois.", source: WIKI, socialReady: true },
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
    clubSite("https://www.royalantwerpfootballclub.be"),
    viaSearch("Royal Antwerp FC — Bosuilstadion", "https://www.royalantwerpfc.be/club/bosuilstadion"),
    viaSearch("Ville d'Anvers — P+R Bosuil", "https://www.antwerpen.be/info/5772532a4b1798c272282cac/p-r-bosuil"),
  ],
};

export default stadium;
