import { type Stadium, tbc, v } from "../types";
import { LAST_AUDIT, PRO_LEAGUE, STADIUMDB, WIKI, clubSite, viaSearch } from "../sources";
import { buildAccess, classicSections, defaultMatchday, defaultRules, defaultTicketing } from "../stadiumBase";

const stadium: Stadium = {
  id: "planet-group-arena",
  slug: "planet-group-arena",
  name: "Planet Group Arena",
  formerNames: ["Ghelamco Arena", "Arteveldestadion (nom de projet)"],
  clubId: "kaa-gent",
  city: "Gand",
  address: v("Ottergemsesteenweg Zuid 808, 9000 Gand", WIKI, LAST_AUDIT, "Adresse à revalider auprès du club"),
  latitude: 51.0203,
  longitude: 3.7156,
  capacity: v(20185, WIKI, LAST_AUDIT),
  openingYear: v(2013, WIKI, LAST_AUDIT, "Inauguré le 17 juillet 2013 — premier stade de football entièrement neuf en Belgique depuis 1974"),
  tagline: "Le premier stade belge vraiment moderne : net, sonore, et assumé.",
  description:
    "La Planet Group Arena a marqué une rupture. En 2013, KAA Gent quitte le Jules Ottenstadion, enclavé en ville, pour une enceinte neuve au sud de Gand, près du ring. Le contraste est total : sightlines parfaites, toiture continue, accès routier direct. On y perd le charme du vieux stade de quartier, on y gagne un vrai bâtiment de spectacle — et une acoustique redoutable quand le virage se met en marche.",
  architecture:
    "Un stade à l'anglaise : quatre tribunes continues, pas de piste, angles fermés, toiture en porte-à-faux qui rabat le son vers la pelouse. La structure est lisible de l'extérieur, avec une façade qui ne cherche pas l'effet monumental. C'est le modèle qui a servi de référence à tous les projets belges suivants.",
  history: [
    { year: 2013, date: "17 juillet 2013", title: "Inauguration", description: "KAA Gent quitte le Jules Ottenstadion pour sa nouvelle enceinte au sud de la ville. C'est le premier stade de football entièrement neuf construit en Belgique depuis 1974.", source: WIKI },
    { year: 2015, title: "Le titre et l'Europe", description: "Le club vit sa période la plus faste dans son nouveau stade, avec une campagne européenne de référence. Détails à confirmer avant publication comme faits.", source: WIKI },
    { year: 2020, title: "Changements de naming", description: "L'enceinte change de nom commercial au fil des partenariats. Le nom actuel est Planet Group Arena.", source: WIKI },
  ],
  fervour: {
    intro:
      "Gand a transféré sa ferveur d'un vieux stade de quartier vers une arène moderne sans la perdre — ce qui est rare. Les Buffalo's ont une identité visuelle très forte, un virage structuré, et un rapport presque tribal au surnom du club.",
    supporterGroups: tbc<string[]>("Groupes de supporters : à documenter avec le club"),
    chants: tbc<string[]>("Répertoire des chants : à documenter"),
    traditions: ["L'identité « Buffalo's », déclinée dans toute l'imagerie du club et des tribunes.", "Un virage qui utilise massivement le bleu et blanc en tifos.", "Une culture d'avant-match qui s'est reconstruite autour du nouveau site."],
    rivalries: [
      { opponent: "Club Brugge", name: "Le derby flandrien", description: "Duel entre deux grandes villes flamandes, avec une rivalité sportive montée en intensité depuis les années 2010." },
      { opponent: "Cercle Brugge", description: "Rencontre régionale de Flandre occidentale et orientale." },
    ],
    greatNights: [{ date: "Information à confirmer", title: "Les soirées de Ligue des champions", description: "La campagne européenne du club après son titre a produit des soirées de référence dans ce stade. Documentation en cours." }],
    attendance: tbc<string>("Affluence moyenne : à publier depuis les chiffres officiels Pro League"),
    quotes: [],
  },
  sections: classicSections({ main: "Tribune principale (latérale)", opposite: "Tribune latérale opposée", home: "Virage nord", away: "Virage sud" }),
  access: buildAccess({
    source: viaSearch("KAA Gent — navettes et parkings", "https://www.kaagent.be/nl/stadion/pendelbussen"),
    train: "Gand-Saint-Pierre est l'une des gares les mieux reliées du pays ; le stade se trouve au sud, hors du centre.",
    station: "Gand-Saint-Pierre (Gent-Sint-Pieters), puis bus 65 ou 67",
    transit:
      "Les lignes 65 et 67 relient Gand-Saint-Pierre au stade, avec un arrêt devant l'enceinte ; la ligne 8 dessert également le secteur, et l'arrêt de tram Gent UZ est à une dizaine de minutes à pied. Attention : depuis la refonte des horaires De Lijn début 2024, l'offre régulière ne suffit plus les jours de match — le club affrète ses propres navettes.",
    car: "C'est l'un des stades belges les plus simples d'accès en voiture : il est implanté à proximité immédiate du ring de Gand, via E17 et E40, avec du stationnement payant à proximité.",
    bike:
      "Gand est une ville très cyclable et l'accès à vélo est un usage courant : environ 3 500 places vélo gratuites devant le stade, sur le site Brico, et 500 mètres plus loin sur l'Ottergemsesteenweg Zuid.",
    matchdayOnly: [
      "Navettes du club entre Gent-Zuid et le stade, en continu à partir de 2 heures avant le coup d'envoi.",
      "Dernier départ de la navette depuis Gent-Zuid : 30 minutes avant le coup d'envoi.",
      "Les sorties du ring saturent dans l'heure qui précède le coup d'envoi.",
    ],
  }),
  ticketing: { ...defaultTicketing("https://www.kaagent.be") },
  rules: defaultRules(),
  beforeMatch: {
    intro: "Le stade est hors du centre : l'avant-match se joue soit dans Gand (superbe, mais à 20-30 minutes), soit dans les abords immédiats, plus fonctionnels.",
    places: [],
    timing: v("Si vous venez pour la ville, prévoyez l'après-midi à Gand et le déplacement 2 h avant le coup d'envoi.", { label: "Observation éditoriale Stadia Belgica", tier: 4 }, LAST_AUDIT),
  },
  afterMatch: {
    intro: "La sortie est rapide côté routier, plus lente côté transports en commun vers Gand-Saint-Pierre.",
    tips: ["Le retour vers le centre est le vrai goulet : anticiper plutôt que suivre le flux.", "Gand reste très vivante en soirée : c'est l'un des meilleurs après-matchs du pays.", "Vérifier le dernier train, notamment pour les matchs du dimanche soir."],
    exits: tbc<string[]>("Plan des sorties : voir le plan officiel du club"),
  },
  anecdotes: [
    { hook: "C'était le premier stade belge entièrement neuf depuis 1974", body: "Entre 1974 et 2013, la Belgique n'a pas construit un seul nouveau stade de football de première division. La Planet Group Arena a mis fin à presque quarante ans d'attente.", source: WIKI, socialReady: true },
    { hook: "Le club s'appelle Gent, les supporters s'appellent les Buffalo's", body: "Le surnom vient d'une histoire liée au passage du spectacle de Buffalo Bill à Gand. L'origine exacte fait l'objet de plusieurs versions : nous la documentons avant de la publier comme un fait.", socialReady: true },
    { hook: "Le stade a déjà changé de nom plusieurs fois sans bouger d'un mètre", body: "Ghelamco Arena, puis Planet Group Arena : les contrats de naming se succèdent, l'adresse reste la même.", source: WIKI, socialReady: true },
  ],
  gallery: [],
  videos: [],
  matchdayTemplate: defaultMatchday(),
  services: ["Buvettes en tribunes", "Boutique officielle (horaires à confirmer)", "Espaces business", "Sanitaires par tribune"],
  accessibility: tbc<string[]>("Places PMR : à confirmer auprès du club (stade récent, équipements a priori aux normes)"),
  lastVerified: LAST_AUDIT,
  sources: [
    PRO_LEAGUE,
    STADIUMDB,
    WIKI,
    clubSite("https://www.kaagent.be"),
    viaSearch("KAA Gent — navettes jour de match", "https://www.kaagent.be/nl/stadion/pendelbussen"),
    viaSearch("KAA Gent — parkings et covoiturage", "https://www.kaagent.be/nl/stadion/parkings-carpool"),
  ],
};

export default stadium;
