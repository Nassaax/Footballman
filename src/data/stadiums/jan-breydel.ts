import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite, viaSearch } from "../sources";
import { buildAccess, classicSections, defaultMatchday, defaultRules, defaultTicketing } from "../stadiumBase";

const stadium: Stadium = {
  id: "jan-breydel",
  slug: "jan-breydel",
  name: "Jan Breydelstadion",
  formerNames: ["Olympiastadion"],
  clubId: "club-brugge",
  coTenantClubIds: ["cercle-brugge"],
  city: "Bruges",
  address: v("Olympialaan 74, 8200 Sint-Andries (Bruges)", WIKI, LAST_AUDIT, "Adresse à revalider auprès des clubs"),
  latitude: 51.1933,
  longitude: 3.1806,
  capacity: v(29042, STADIUMDB, LAST_AUDIT, "Plus grande capacité de Jupiler Pro League"),
  openingYear: v(1975, WIKI, LAST_AUDIT, "Ouvert sous le nom d'Olympiastadion ; rénové en profondeur avant l'Euro 2000"),
  tagline: "Le plus grand stade du championnat belge, et le seul partagé par deux clubs rivaux.",
  description:
    "Le Jan Breydelstadion est une anomalie fascinante : deux clubs de première division, rivaux historiques de la même ville, jouent dans la même enceinte. Un week-end, les tribunes sont bleu et noir ; le suivant, vert et noir. Le stade, lui, ne change pas : une grande cuvette symétrique en périphérie de Bruges, avec une capacité qui reste la plus élevée du pays.",
  architecture:
    "Une enceinte olympique classique des années 1970, rendue entièrement assise et couverte lors de la modernisation menée avant l'Euro 2000. Quatre tribunes continues, géométrie régulière, piste technique supprimée : le résultat est une cuvette lisible, efficace, sans effet spectaculaire. Le projet de nouveau stade pour le Club Brugge est un feuilleton administratif de longue date : état d'avancement à confirmer.",
  history: [
    { year: 1975, title: "Ouverture de l'Olympiastadion", description: "Bruges se dote d'une grande enceinte moderne en périphérie, partagée dès l'origine par les deux clubs de la ville.", source: WIKI },
    { year: 1998, title: "Rénovation avant l'Euro 2000", description: "Le stade est modernisé pour accueillir la compétition et rebaptisé Jan Breydelstadion.", source: WIKI },
    { year: 2000, title: "Matchs de l'Euro 2000", description: "Le stade accueille des rencontres du championnat d'Europe organisé par la Belgique et les Pays-Bas. Liste des matchs à confirmer.", source: WIKI },
    { year: 2026, title: "Toujours deux clubs, toujours un stade", description: "Le projet de nouvelle enceinte pour le Club Brugge reste en discussion. Information à confirmer." },
  ],
  fervour: {
    intro:
      "Ici, la ferveur a deux visages. Le Club Brugge remplit le stade avec le public le plus nombreux du pays et une culture de virage très structurée. Cercle Brugge y joue le rôle inverse : club de la même ville, public plus réduit, identité construite en opposition. Voir les deux ambiances dans la même enceinte est une expérience unique en Belgique.",
    supporterGroups: tbc<string[]>("Groupes de supporters des deux clubs : à documenter"),
    chants: tbc<string[]>("Répertoires distincts pour Club et Cercle : à documenter"),
    traditions: ["Le stade change entièrement de couleurs d'un week-end à l'autre.", "Le Club Brugge y affiche régulièrement les affluences les plus élevées du championnat.", "Les deux clubs ont leurs propres virages et leurs propres rituels d'entrée."],
    rivalries: [
      { opponent: "Cercle Brugge", name: "Le derby de Bruges (Brugse derby)", description: "Un derby joué dans le stade des deux équipes : il n'y a pas de déplacement, seulement un changement de vestiaire et de virage." },
      { opponent: "RSC Anderlecht", name: "Le topper", description: "L'affiche entre les deux clubs les plus titrés de l'ère moderne." },
      { opponent: "KAA Gent", name: "Le derby flandrien", description: "Duel régional entre deux grandes villes de Flandre orientale et occidentale." },
    ],
    greatNights: [{ date: "Information à confirmer", title: "Les grandes soirées de Ligue des champions", description: "Les qualifications européennes du Club Brugge ont produit plusieurs nuits de référence. Documentation en cours avant publication." }],
    attendance: tbc<string>("Affluences des deux clubs : à publier depuis les chiffres officiels Pro League"),
    quotes: [],
  },
  sections: classicSections({ main: "Hoofdtribune (latérale principale)", opposite: "Tribune latérale opposée", home: "Noordtribune (virage)", away: "Zuidtribune (virage)" }),
  access: buildAccess({
    source: viaSearch("Club Brugge — en route vers le Jan Breydel", "https://www.clubbrugge.be/en/onderweg-jan-breydel"),
    train:
      "Bruges est très bien reliée par le rail. Le stade se trouve en périphérie ouest, à environ 4 kilomètres de la gare : comptez une correspondance en bus, ou un vélo partagé loué directement à la gare.",
    station: "Bruges (Brugge), puis bus 30 ou 3 — environ 4 km du stade",
    transit:
      "Le bus 30 relie la gare et le centre à l'arrêt « Sint-Andries Kerk », à moins de 5 minutes à pied du stade : toutes les 10 minutes en semaine et le samedi, tous les quarts d'heure le dimanche. Les supporters visiteurs empruntent plutôt le bus 3 depuis la gare jusqu'à « Sint-Michiels Vogelzang », à une dizaine de minutes à pied.",
    car:
      "Le stade est en périphérie, avec un accès routier plus simple que la plupart des enceintes belges. Mais les parkings qui entourent l'enceinte (nord, est, ouest, sud) sont réservés aux détenteurs d'un laissez-passer du club, et la Gistelsesteenweg sature les jours de match. Les transports en commun sont souvent plus rapides que la voiture.",
    parking: [
      "Parkings nord, est, ouest et sud : accessibles uniquement avec un laissez-passer valide du club.",
      "Le P+R Jan Breydel de l'Olympialaan (100 places) ne fonctionne pas en Park & Ride les jours de match du Club ou du Cercle.",
    ],
    bike:
      "Bruges est une ville cyclable et l'approche à vélo est courante. Des vélos partagés se louent à la gare, à environ 4 kilomètres du stade.",
    matchdayOnly: [
      "La configuration des virages diffère selon que le match est organisé par le Club ou par le Cercle.",
      "Les parkings du stade ne sont pas ouverts au public : sans laissez-passer, privilégiez le bus.",
      "La Gistelsesteenweg est régulièrement saturée avant le coup d'envoi.",
    ],
  }),
  ticketing: { ...defaultTicketing("https://www.clubbrugge.be"), conditions: tbc<string[]>("Attention : la billetterie dépend du club organisateur (Club Brugge ou Cercle Brugge), pas du stade.") },
  rules: defaultRules(),
  beforeMatch: {
    intro: "Deux avant-matchs possibles dans la même ville : le centre historique de Bruges, à distance, et les abords immédiats du stade, plus fonctionnels.",
    places: [],
    timing: v("Prévoir 2 h si vous partez du centre de Bruges : le trajet et les contrôles s'additionnent.", { label: "Observation éditoriale Stadia Belgica", tier: 4 }, LAST_AUDIT),
  },
  afterMatch: {
    intro: "La sortie est plus fluide que dans les stades urbains, mais le retour vers la gare de Bruges concentre le flux.",
    tips: ["Le retour en bus vers la gare sature : marcher un arrêt en amont aide.", "Le centre de Bruges reste animé après le match, contrairement aux abords du stade.", "Vérifier le dernier train : Bruges est une ville de fin de ligne pour beaucoup de liaisons."],
    exits: tbc<string[]>("Plan des sorties : voir le plan officiel du club organisateur"),
  },
  anecdotes: [
    { hook: "Deux clubs de D1, un seul stade : c'est unique en Belgique", body: "Club Brugge et Cercle Brugge partagent le Jan Breydel. Quand ils s'affrontent, le derby se joue à domicile pour les deux équipes.", source: WIKI, socialReady: true },
    { hook: "C'est le plus grand stade du championnat", body: "Avec environ 29 000 places, le Jan Breydel dépasse toutes les autres enceintes de Jupiler Pro League — y compris celles de Bruxelles et de Liège.", source: STADIUMDB, socialReady: true },
    { hook: "Il s'appelait Olympiastadion avant d'accueillir un Euro", body: "Le stade a été rebaptisé Jan Breydel lors de la rénovation précédant l'Euro 2000, du nom d'une figure de l'histoire flamande médiévale.", source: WIKI, socialReady: true },
  ],
  gallery: [],
  videos: [],
  matchdayTemplate: defaultMatchday(),
  services: ["Buvettes en tribunes", "Boutiques des deux clubs (horaires à confirmer)", "Sanitaires par tribune"],
  accessibility: tbc<string[]>("Places PMR : à confirmer auprès du club organisateur"),
  lastVerified: LAST_AUDIT,
  sources: [
    PRO_LEAGUE,
    STADIUMDB,
    WIKI,
    clubSite("https://www.clubbrugge.be"),
    clubSite("https://www.cerclebrugge.be"),
    viaSearch("Club Brugge — en route vers le Jan Breydel", "https://www.clubbrugge.be/en/onderweg-jan-breydel"),
    viaSearch("Cercle Brugge — accessibilité du Jan Breydel", "https://cerclebrugge.be/stadium/Routes-accessibility/bereikbaarheidjanbreydel"),
  ],
};

export default stadium;
