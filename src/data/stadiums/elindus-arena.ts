import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite } from "../sources";
import { buildAccess, classicSections, defaultMatchday, defaultRules, defaultTicketing } from "../stadiumBase";

const stadium: Stadium = {
  id: "elindus-arena",
  slug: "elindus-arena",
  name: "Elindus Arena",
  formerNames: ["Regenboogstadion"],
  clubId: "sv-zulte-waregem",
  city: "Waregem",
  address: tbc<string>("Adresse exacte à confirmer auprès du club"),
  latitude: 50.8836,
  longitude: 3.4283,
  capacity: v(12414, WIKI, LAST_AUDIT),
  openingYear: tbc<number>("Site du Regenboogstadion, transformé par phases — dates à confirmer"),
  tagline: "Le stade de l'Arc-en-ciel : une petite ville flamande qui a gagné la Coupe de Belgique.",
  description:
    "Waregem est une petite ville de Flandre occidentale, connue pour son hippodrome et pour Essevee. Le Regenboogstadion — le stade de l'Arc-en-ciel — a vu le club passer d'une fusion administrative en 2001 à des titres nationaux et des campagnes européennes. C'est l'un des meilleurs exemples belges de ce qu'un club de ville moyenne peut accomplir avec un public dense et une gestion patiente.",
  architecture:
    "Enceinte rénovée par phases, à quatre tribunes couvertes et proches du terrain. La configuration est compacte et l'acoustique correcte pour sa capacité. Les abords sont périurbains, avec un accès routier direct.",
  history: [
    { year: 2001, title: "Naissance de Zulte Waregem", description: "Le club naît de la fusion entre Zultse VV et KSV Waregem, héritant du stade de Waregem.", source: WIKI },
    { year: 2006, title: "La Coupe de Belgique et l'Europe", description: "Le club remporte un trophée national et découvre les compétitions européennes. Détails à confirmer avant publication comme faits.", source: WIKI },
    { year: 2010, title: "Rénovations du stade", description: "Le Regenboogstadion est modernisé par phases et prend un nom commercial. Dates à confirmer.", source: WIKI },
  ],
  fervour: {
    intro:
      "Essevee a un public fidèle et bruyant pour la taille de la ville, avec une identité rouge et vert immédiatement reconnaissable. Le derby de Flandre occidentale contre Courtrai est le sommet de la saison.",
    supporterGroups: tbc<string[]>("Groupes de supporters : à documenter avec le club"),
    chants: tbc<string[]>("Répertoire des chants : à documenter"),
    traditions: ["Le rouge et vert, combinaison unique dans le championnat.", "Un lien fort avec la culture locale de Flandre occidentale."],
    rivalries: [{ opponent: "KV Kortrijk", name: "Le derby de Flandre occidentale", description: "L'affiche régionale de référence pour les deux clubs." }],
    greatNights: [{ date: "Information à confirmer", title: "Les soirées européennes d'Essevee", description: "Documentation en cours avant publication comme faits." }],
    attendance: tbc<string>("Affluence moyenne : à publier depuis les chiffres officiels Pro League"),
    quotes: [],
  },
  sections: classicSections({ main: "Tribune principale", opposite: "Tribune latérale opposée", home: "Virage des supporters", away: "Secteur visiteurs" }),
  access: buildAccess({
    train: "Waregem est desservie sur l'axe Gand-Courtrai, avec une marche vers le stade.",
    station: "Waregem — temps de marche vers le stade à confirmer",
    transit: "Réseau De Lijn depuis la gare. Lignes exactes à confirmer.",
    car: "Accès autoroutier direct (E17), abords dégagés : la voiture est une option confortable ici.",
    bike: "Région plate et cyclable.",
  }),
  ticketing: { ...defaultTicketing("https://www.essevee.be") },
  rules: defaultRules(),
  beforeMatch: { intro: "Waregem est petite : l'avant-match se fait dans le centre ou aux abords immédiats du stade, sans complication.", places: [], timing: v("1 h avant le coup d'envoi suffit.", { label: "Observation éditoriale Stadia Belgica", tier: 4 }, LAST_AUDIT) },
  afterMatch: { intro: "Sortie rapide et retour simple, que ce soit en voiture ou par le train vers Gand et Courtrai.", tips: ["Vérifier les derniers trains vers Gand et Courtrai."], exits: tbc<string[]>() },
  anecdotes: [
    { hook: "Le stade s'appelle le stade de l'Arc-en-ciel", body: "Regenboogstadion : le nom historique fait référence au quartier et reste largement utilisé malgré le naming commercial.", source: WIKI, socialReady: true },
    { hook: "Une ville de moins de 40 000 habitants avec un palmarès national", body: "Zulte Waregem a remporté des trophées nationaux et joué l'Europe, ce qui est rare pour une commune de cette taille.", source: WIKI, socialReady: true },
  ],
  gallery: [],
  videos: [],
  matchdayTemplate: defaultMatchday(),
  services: ["Buvettes", "Boutique officielle (horaires à confirmer)", "Sanitaires"],
  accessibility: tbc<string[]>("Places PMR : à confirmer auprès du club"),
  lastVerified: LAST_AUDIT,
  sources: [PRO_LEAGUE, STADIUMDB, WIKI, clubSite("https://www.essevee.be")],
};

export default stadium;
