/**
 * Génère les visuels des carrousels TikTok en 1080 × 1920.
 *
 * Les fonds sont de vraies captures du site (scripts/captures.mjs) : on montre
 * le produit plutôt qu'une illustration. Un voile dégradé garantit le contraste
 * du texte par-dessus. Polices embarquées en base64, aucun accès réseau requis.
 *
 *   node scripts/captures.mjs  <dossier-fonds>
 *   node scripts/carrousels.mjs <dossier-sortie> <dossier-fonds>
 */
import { chromium } from "playwright";
import { readFileSync, mkdirSync } from "node:fs";

const OUT = process.argv[2];
const BG = process.argv[3];
mkdirSync(OUT, { recursive: true });

const font = (p) => readFileSync(`node_modules/@fontsource/${p}`).toString("base64");
const ARCHIVO_900 = font("archivo/files/archivo-latin-900-normal.woff2");
const ARCHIVO_700 = font("archivo/files/archivo-latin-700-normal.woff2");
const INTER_400 = font("inter/files/inter-latin-400-normal.woff2");
const INTER_600 = font("inter/files/inter-latin-600-normal.woff2");

const bgCache = new Map();
const bg = (name) => {
  if (!bgCache.has(name)) {
    bgCache.set(name, readFileSync(`${BG}/${name}.png`).toString("base64"));
  }
  return `data:image/png;base64,${bgCache.get(name)}`;
};

const INK = "#0B0D0F";
const BONE = "#F7F4EF";
const TERRA = "#C2502A";

const wordmark = () => `
<div class="mark">
  <svg width="44" height="44" viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="${BONE}"/>
    <path d="M6 23.5V17c0-5.52 4.48-10 10-10s10 4.48 10 10v6.5" fill="none" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M11 23.5v-6a5 5 0 0 1 10 0v6" fill="none" stroke="${TERRA}" stroke-width="2.4" stroke-linecap="round"/>
    <rect x="6" y="24.6" width="20" height="2.4" rx="1.2" fill="${INK}"/>
  </svg>
  <span>STADIA <b>BELGICA</b></span>
</div>`;

/**
 * @param background  nom de la capture servant de fond
 * @param blur        adoucit le fond quand le texte est dense
 * @param anchor      "bottom" pose le bloc en bas (le fond respire en haut)
 */
function page(body, { background, blur = 3, anchor = "bottom", swipe = true, mark = true } = {}) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Archivo;src:url(data:font/woff2;base64,${ARCHIVO_900}) format('woff2');font-weight:900}
@font-face{font-family:Archivo;src:url(data:font/woff2;base64,${ARCHIVO_700}) format('woff2');font-weight:700}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER_400}) format('woff2');font-weight:400}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER_600}) format('woff2');font-weight:600}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1920px;background:${INK};color:${BONE};font-family:Inter,sans-serif;overflow:hidden;position:relative}
.shot{position:absolute;inset:0;width:1080px;height:1920px;object-fit:cover;${blur ? `filter:blur(${blur}px) saturate(1.05);transform:scale(1.06);` : ""}}
.scrim{position:absolute;inset:0;background:
  linear-gradient(to bottom, rgba(11,13,15,.58) 0%, rgba(11,13,15,.22) 20%, rgba(11,13,15,.58) 44%, rgba(11,13,15,.93) 60%, rgba(11,13,15,.99) 74%, #0B0D0F 100%);}
.wrap{position:absolute;inset:0;padding:200px 92px 470px;display:flex;flex-direction:column;justify-content:${
    anchor === "bottom" ? "flex-end" : "center"
  };z-index:2}
.eyebrow{font-family:Archivo;font-weight:700;font-size:27px;letter-spacing:.2em;text-transform:uppercase;color:rgba(247,244,239,.72)}
h1{font-family:Archivo;font-weight:900;letter-spacing:-.035em;line-height:.94;font-size:124px;margin-top:26px;text-shadow:0 4px 40px rgba(0,0,0,.5)}
h1.sm{font-size:100px}
h1.xs{font-size:80px;line-height:1.02}
.lede{font-size:40px;line-height:1.36;margin-top:34px;color:rgba(247,244,239,.86);max-width:22ch}
.kicker{font-family:Archivo;font-weight:900;font-size:44px;line-height:1.2;margin-top:30px;color:${TERRA};letter-spacing:-.02em}
.accent{color:${TERRA}}
.bar{width:132px;height:9px;background:${TERRA};border-radius:99px;margin-bottom:22px}
.list{margin-top:44px;display:flex;flex-direction:column;gap:22px}
.row{display:flex;gap:22px;align-items:baseline;font-size:37px;line-height:1.26;text-shadow:0 2px 20px rgba(0,0,0,.55)}
.row i{font-family:Archivo;font-weight:900;font-style:normal;font-size:26px;color:${TERRA};min-width:44px}
.mark{position:absolute;left:92px;bottom:405px;display:flex;align-items:center;gap:20px;font-family:Archivo;font-weight:700;font-size:31px;letter-spacing:.06em;color:${BONE};z-index:3}
.mark b{font-weight:900;color:${TERRA}}
.swipe{position:absolute;right:92px;bottom:410px;font-family:Archivo;font-weight:700;font-size:26px;letter-spacing:.14em;text-transform:uppercase;color:rgba(247,244,239,.5);z-index:3}
.sig{font-family:Archivo;font-weight:900;font-size:112px;letter-spacing:-.03em;line-height:.94;text-shadow:0 4px 40px rgba(0,0,0,.5)}
.sig .b{color:${TERRA}}
.grain{position:absolute;inset:0;opacity:.05;mix-blend-mode:overlay;z-index:1}
</style></head><body>
<img class="shot" src="${bg(background)}" alt="">
<div class="scrim"></div>
<svg class="grain" aria-hidden="true"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter><rect width="1080" height="1920" filter="url(#n)"/></svg>
${body}
${mark ? wordmark() : ""}
${swipe ? '<div class="swipe">Glisse →</div>' : ""}
</body></html>`;
}

const slides = [];
const add = (file, html) => slides.push({ file, html });

/* ===== Carrousel 1 — le concept ======================================== */

add(
  "c1-1",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Jupiler Pro League</p>
      <h1>18 clubs.<br>17 stades.<br><span class="accent">0 guide.</span></h1>
      <p class="lede">Jusqu'ici, le plan c'était : demander à ton oncle.</p>
    </div>`,
    { background: "bg-fiche", blur: 5 },
  ),
);

add(
  "c1-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Donc on s'y est collé</p>
      <h1 class="sm">Les 17,<br>un par un.</h1>
      <div class="list">
        <div class="row"><i>01</i><span>L'histoire et les grandes soirées</span></div>
        <div class="row"><i>02</i><span>Les tribunes, une par une</span></div>
        <div class="row"><i>03</i><span>Comment y aller pour de vrai</span></div>
        <div class="row"><i>04</i><span>Billetterie, règles, avant-match</span></div>
      </div>
      <p class="kicker">Oui, même Lommel.</p>
    </div>`,
    { background: "bg-stades", blur: 3 },
  ),
);

add(
  "c1-3",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">De Sclessin au Kuipje</p>
      <p class="sig" style="margin-top:20px">STADIA<br><span class="b">BELGICA</span></p>
      <p class="lede" style="margin-top:40px">Le stade, c'est pas que les 90 minutes.</p>
    </div>`,
    { background: "bg-home", blur: 4, swipe: false, mark: false },
  ),
);

/* ===== Carrousel 2 — les galères de déplacement ======================== */

add(
  "c2-1",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Samedi · Sclessin</p>
      <h1 class="sm">Tu comptes<br>prendre<br>le train ?</h1>
      <p class="kicker">Courageux.</p>
    </div>`,
    { background: "bg-fiche", blur: 5 },
  ),
);

add(
  "c2-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Petit détail</p>
      <h1 class="xs">Il ne s'arrête<br>pas le<br>week-end.</h1>
      <div class="list">
        <div class="row"><i>↳</i><span><b>Genk, Bruges, Anvers</b> : parkings réservés aux abonnés.</span></div>
        <div class="row"><i>↳</i><span><b>Gand</b> : dernière navette 30 min avant.</span></div>
        <div class="row"><i>↳</i><span><b>Charleroi</b> : l'arrêt Janson est fermé.</span></div>
      </div>
      <p class="kicker">Bon courage à pied.</p>
    </div>`,
    { background: "bg-acces", blur: 4 },
  ),
);

add(
  "c2-3",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Les 17 stades, passés au peigne</p>
      <h1 class="sm">Tout est<br>noté.<br><span class="accent">Avant que<br>tu partes.</span></h1>
      <p class="lede" style="margin-top:36px">STADIA BELGICA</p>
    </div>`,
    { background: "bg-jour", blur: 3, swipe: false, mark: false },
  ),
);

/* ===== Carrousel 3 — on n'invente rien ================================= */

add(
  "c3-1",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Soyons clairs</p>
      <h1 class="sm">On ne sait<br>pas tout.</h1>
      <p class="kicker">Et on va pas faire semblant.</p>
    </div>`,
    { background: "bg-tribunes", blur: 3 },
  ),
);

add(
  "c3-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Sur le site, ça donne ça</p>
      <h1 class="xs">Quand on sait<br>pas, on<br>l'écrit.</h1>
      <p class="lede">Contrairement à ton pote qui « connaît un raccourci ».</p>
    </div>`,
    { background: "bg-acces", blur: 5 },
  ),
);

add(
  "c3-3",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Notre seule règle</p>
      <h1 class="xs">Un parking<br>inventé,<br>c'est ton<br><span class="accent">samedi foutu.</span></h1>
      <p class="lede" style="margin-top:34px">STADIA BELGICA</p>
    </div>`,
    { background: "bg-fiche", blur: 5, swipe: false, mark: false },
  ),
);

/* ===== Carrousel 4 — appel aux photos ================================== */

add(
  "c4-1",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Petit aveu</p>
      <h1 class="sm">Un site sur<br>les stades.<br><span class="accent">Sans photos<br>de stades.</span></h1>
      <p class="kicker">On a un souci, là.</p>
    </div>`,
    { background: "bg-photos", blur: 3 },
  ),
);

add(
  "c4-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Le problème : les droits</p>
      <h1 class="xs">La solution,<br>c'est toi.</h1>
      <p class="lede">Ton téléphone est plein de photos floues du virage. C'est exactement ce qu'il nous faut.</p>
    </div>`,
    { background: "bg-photos", blur: 3 },
  ),
);

add(
  "c4-3",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Ton virage · ton tifo · ta frite d'avant-match</p>
      <h1 class="sm">Envoie<br>ta photo.</h1>
      <p class="lede">Ton nom en crédit, juste en dessous.</p>
      <p class="lede" style="margin-top:22px">STADIA BELGICA</p>
    </div>`,
    { background: "bg-stades", blur: 4, swipe: false, mark: false },
  ),
);

/* ===== Carrousel 5 — le vide belge ===================================== */

add(
  "c5-1",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Avant de se lancer</p>
      <h1 class="xs">On a cherché<br>un guide des<br>stades belges.</h1>
      <p class="kicker">Sérieusement cherché.</p>
    </div>`,
    { background: "bg-stades", blur: 5 },
  ),
);

add(
  "c5-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Voilà ce qu'on a trouvé</p>
      <h1 class="xs">Pas grand-<br>chose.</h1>
      <div class="list">
        <div class="row"><i>↳</i><span>Des tableaux de capacités.</span></div>
        <div class="row"><i>↳</i><span>Des fiches sur des sites <b>français</b>.</span></div>
        <div class="row"><i>↳</i><span>Le plus complet ? Sur un <b>site de paris</b>.</span></div>
      </div>
      <p class="kicker">Pour nos propres stades.</p>
    </div>`,
    { background: "bg-acces", blur: 5 },
  ),
);

add(
  "c5-3",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Donc on s'en est chargés</p>
      <h1 class="sm">Belge.<br>Indépendant.<br><span class="accent">Sans paris.</span></h1>
      <p class="lede" style="margin-top:34px">STADIA BELGICA</p>
    </div>`,
    { background: "bg-home", blur: 4, swipe: false, mark: false },
  ),
);

/* ===== Carrousel 6 — la comparaison qui fait mal ======================= */

add(
  "c6-1",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">En Angleterre</p>
      <h1 class="xs">Chaque stade<br>a son guide.<br>Depuis 20 ans.</h1>
      <p class="lede">Quelle tribune, quel pub, quel train. Tout y est.</p>
    </div>`,
    { background: "bg-tribunes", blur: 5 },
  ),
);

add(
  "c6-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">En Belgique</p>
      <h1 class="sm">Essaie de<br>trouver le<br>parking<br>de Genk.</h1>
      <p class="kicker">On attend.</p>
    </div>`,
    { background: "bg-acces", blur: 5 },
  ),
);

add(
  "c6-3",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Spoiler</p>
      <h1 class="xs">Il est réservé<br>aux abonnés.</h1>
      <p class="lede">Tu l'aurais su. Sur Stadia Belgica.</p>
      <p class="lede" style="margin-top:22px">Les 17 stades. Un par un.</p>
    </div>`,
    { background: "bg-fiche", blur: 5, swipe: false, mark: false },
  ),
);

/* ===== Carrousel 7 — un truc belge ===================================== */

add(
  "c7-1",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Soyons honnêtes</p>
      <h1 class="xs">Le foot, c'est<br>un des rares<br>trucs qui<br>nous réunit.</h1>
      <p class="kicker">Alors autant bien le faire.</p>
    </div>`,
    { background: "bg-home", blur: 4 },
  ),
);

add(
  "c7-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Flandre · Bruxelles · Wallonie</p>
      <h1 class="sm">17 stades.<br>Même<br>traitement.</h1>
      <p class="lede">Le Kuipje a droit aux mêmes pages que le Jan Breydel. C'était la règle dès le départ.</p>
    </div>`,
    { background: "bg-stades", blur: 3 },
  ),
);

add(
  "c7-3",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Fait ici, pour ici</p>
      <p class="sig" style="margin-top:20px">STADIA<br><span class="b">BELGICA</span></p>
      <p class="lede" style="margin-top:36px">Le stade, c'est pas que les 90 minutes.</p>
    </div>`,
    { background: "bg-photos", blur: 4, swipe: false, mark: false },
  ),
);

/* ===== Carrousel 8 — la météo, évidemment ============================== */

add(
  "c8-1",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Prévisions pour samedi</p>
      <h1 class="sm">Pluie.</h1>
      <p class="kicker">On sait. On est en Belgique.</p>
    </div>`,
    { background: "bg-fiche", blur: 5 },
  ),
);

add(
  "c8-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Le conseil qui sert</p>
      <h1 class="xs">Prends une<br>veste, pas un<br>parapluie.</h1>
      <p class="lede">Plusieurs stades les refusent à l'entrée. Tu le découvriras au tourniquet, sous la pluie, avec 400 personnes derrière toi.</p>
    </div>`,
    { background: "bg-acces", blur: 5 },
  ),
);

add(
  "c8-3",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Sur chaque fiche stade</p>
      <h1 class="sm">Sacs. Photos.<br>Drapeaux.<br><span class="accent">Parapluies.</span></h1>
      <p class="lede" style="margin-top:32px">Ce qui passe et ce qui passe pas. Stade par stade.</p>
      <p class="lede" style="margin-top:20px">STADIA BELGICA</p>
    </div>`,
    { background: "bg-tribunes", blur: 4, swipe: false, mark: false },
  ),
);

/* ===== Carrousel 9 — les noms de stades ================================= */

add(
  "c9-1",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Question piège</p>
      <h1 class="sm">Il s'appelle<br>comment,<br>le stade<br>de Genk ?</h1>
      <p class="kicker">Réfléchis bien.</p>
    </div>`,
    { background: "bg-stades", blur: 5 },
  ),
);

add(
  "c9-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Réponse</p>
      <h1 class="xs">Ça dépend<br>de l'année.</h1>
      <div class="list">
        <div class="row"><i>↳</i><span>Fenixstadion, puis Luminus Arena, puis <b>Cegeka Arena</b>.</span></div>
        <div class="row"><i>↳</i><span>Ghelamco Arena → <b>Planet Group Arena</b>.</span></div>
        <div class="row"><i>↳</i><span>Vanden Stock → <b>Lotto Park</b>.</span></div>
      </div>
      <p class="kicker">Même pelouse, nouveau logo.</p>
    </div>`,
    { background: "bg-acces", blur: 5 },
  ),
);

add(
  "c9-3",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Donc on note les deux</p>
      <h1 class="xs">Le nouveau<br>nom. Et celui<br>de ton oncle.</h1>
      <p class="lede">Parce qu'il dira « le Fenix » jusqu'à la fin des temps. Et il n'a pas tort.</p>
    </div>`,
    { background: "bg-home", blur: 4, swipe: false, mark: false },
  ),
);

/* ===== Carrousel 10 — se garer, sport national ========================= */

add(
  "c10-1",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Discipline olympique</p>
      <h1 class="sm">Se garer<br>en Belgique.</h1>
      <p class="kicker">Niveau : expert.</p>
    </div>`,
    { background: "bg-acces", blur: 5 },
  ),
);

add(
  "c10-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Tour de Belgique du parking</p>
      <h1 class="xs">Le palmarès.</h1>
      <div class="list">
        <div class="row"><i>↳</i><span><b>Genk</b> : abonnés uniquement.</span></div>
        <div class="row"><i>↳</i><span><b>Bruges</b> : abonnés uniquement.</span></div>
        <div class="row"><i>↳</i><span><b>Anvers</b> : abonnés uniquement.</span></div>
        <div class="row"><i>↳</i><span><b>Beveren</b> : 50 € la place.</span></div>
      </div>
      <p class="kicker">Allez, bonne chance.</p>
    </div>`,
    { background: "bg-stades", blur: 4 },
  ),
);

add(
  "c10-3",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">La bonne nouvelle</p>
      <h1 class="xs">Les solutions<br>de repli sont<br>notées aussi.</h1>
      <p class="lede">Thor Park à Genk, Bosdam à Beveren, le P+R à Anvers. Avant de partir, pas en tournant depuis vingt minutes.</p>
      <p class="lede" style="margin-top:20px">STADIA BELGICA</p>
    </div>`,
    { background: "bg-jour", blur: 4, swipe: false, mark: false },
  ),
);

/* ===== Carrousel 11 — l'avant-match ==================================== */

add(
  "c11-1",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">L'avant-match belge</p>
      <h1 class="sm">Une frite.<br>Une Jupiler.<br>Un pote qui<br>refait la<br>compo.</h1>
    </div>`,
    { background: "bg-photos", blur: 4 },
  ),
);

add(
  "c11-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Ce qu'on peut faire pour toi</p>
      <h1 class="xs">Deux sur trois.</h1>
      <p class="lede">Où aller, quand arriver, combien de temps il te reste avant le coup d'envoi. Stade par stade.</p>
      <p class="kicker">Pour le pote, on ne peut rien.</p>
    </div>`,
    { background: "bg-jour", blur: 4 },
  ),
);

add(
  "c11-3",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Ton virage · ta frite · ton samedi</p>
      <p class="sig" style="margin-top:20px">STADIA<br><span class="b">BELGICA</span></p>
      <p class="lede" style="margin-top:36px">Le stade, c'est pas que les 90 minutes.</p>
    </div>`,
    { background: "bg-home", blur: 4, swipe: false, mark: false },
  ),
);

/* ===== Carrousel 12 — le derby de Bruges ================================ */

add(
  "c12-1",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Derby de Bruges · Brugse derby</p>
      <h1 class="sm">Le seul derby<br>où personne<br><span class="accent">ne se déplace.</span></h1>
      <p class="lede">Club et Cercle jouent au Jan Breydel. Les deux. Tout le temps.</p>
    </div>`,
    { background: "bg-breydel", blur: 5 },
  ),
);

add(
  "c12-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">29 042 places · le plus grand du pays</p>
      <h1 class="xs">Même stade.<br>Même buvette.<br>Même parking plein.</h1>
      <div class="list">
        <div class="row"><i>→</i><span>Pas de car, pas d'autoroute, pas de retard</span></div>
        <div class="row"><i>→</i><span>Tu changes de vestiaire et de virage</span></div>
        <div class="row"><i>→</i><span>Et les deux équipes jouent « à domicile »</span></div>
      </div>
      <p class="kicker">Unique en Belgique.</p>
    </div>`,
    { background: "bg-breydel-tribunes", blur: 5 },
  ),
);

add(
  "c12-3",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Olympialaan 74, Sint-Andries</p>
      <h1 class="sm">Bleu ou vert,<br>c'est la même<br>adresse.</h1>
      <p class="lede">On ne choisit pas ton camp. On t'explique juste comment arriver.</p>
    </div>`,
    { background: "bg-breydel-acces", blur: 4, swipe: false },
  ),
);

/* ===== Carrousel 13 — le Clasico ======================================== */

add(
  "c13-1",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Clasico belge</p>
      <h1 class="sm">Sclessin, 1909.<br>Le parc Astrid,<br>1917.</h1>
      <p class="lede">Du football sur ces deux sites depuis plus d'un siècle. La rivalité a eu le temps de mûrir.</p>
    </div>`,
    { background: "bg-fiche", blur: 5 },
  ),
);

add(
  "c13-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Ce que personne ne te dit</p>
      <h1 class="xs">27 670 places.<br>Et un arrêt de train<br>fermé le week-end.</h1>
      <div class="list">
        <div class="row"><i>→</i><span>L'arrêt SNCB de Sclessin n'est pas desservi le week-end</span></div>
        <div class="row"><i>→</i><span>La station de tram ferme 1 h 30 avant le coup d'envoi</span></div>
        <div class="row"><i>→</i><span>Les parkings du stade : abonnés uniquement</span></div>
      </div>
      <p class="kicker">On te le dit avant. Pas après.</p>
    </div>`,
    { background: "bg-sclessin-acces", blur: 5 },
  ),
);

add(
  "c13-3",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Métro 5 · Saint-Guidon · P+R Ceria 3 €</p>
      <h1 class="sm">On ne choisit<br>pas ton camp.<br><span class="accent">On choisit ton parking.</span></h1>
      <p class="lede">Les deux fiches sont en ligne. Avec la même rigueur, promis.</p>
    </div>`,
    { background: "bg-jour", blur: 4, swipe: false },
  ),
);

/* ===== Carrousel 14 — les autres derbys ================================= */

add(
  "c14-1",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Jupiler Pro League</p>
      <h1 class="sm">Tout le monde<br>parle du Clasico.</h1>
      <p class="lede">Il y en a cinq autres. Et ils font autant de bruit.</p>
    </div>`,
    { background: "bg-stades", blur: 4 },
  ),
);

add(
  "c14-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Les affiches qui structurent une saison</p>
      <h1 class="xs">Les cinq autres.</h1>
      <div class="list">
        <div class="row"><i>01</i><span>Limbourgeois — Genk · STVV</span></div>
        <div class="row"><i>02</i><span>Wallon — Standard · Charleroi</span></div>
        <div class="row"><i>03</i><span>Bruxellois — Anderlecht · Union</span></div>
        <div class="row"><i>04</i><span>Flandre occidentale — Courtrai · Zulte Waregem</span></div>
        <div class="row"><i>05</i><span>Flandrien — Club Brugge · La Gantoise</span></div>
      </div>
      <p class="kicker">Anvers, on t'attend. Avec le Beerschot.</p>
    </div>`,
    { background: "bg-tribunes", blur: 5 },
  ),
);

add(
  "c14-3",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Derby bruxellois · stade Joseph Marien</p>
      <h1 class="xs">9 400 places.<br>Pour toute<br>une ville.</h1>
      <p class="lede">Le parcage visiteurs du Marien est minuscule. Le billet aussi, du coup.</p>
      <p class="kicker">Les 17 stades sont documentés. Même les petits.</p>
    </div>`,
    { background: "bg-marien", blur: 4, swipe: false },
  ),
);

/** Colonne de chiffres alignée à droite : sans largeur fixe, les décimales dansent. */
const KM = "min-width:152px;text-align:right;font-size:36px";

/* ===== Carrousel 15 — le plus long déplacement ==========================
 * Les distances sont calculées par haversine sur les coordonnées des fiches
 * (scratchpad/dist.mjs) : ce sont nos propres données, pas une estimation.
 * D'où la mention « à vol d'oiseau » sur le visuel — un trajet routier ou
 * ferroviaire serait plus long, et nous ne l'avons pas vérifié.
 */

add(
  "c15-1",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Le plus long déplacement du championnat</p>
      <h1>178 km.</h1>
      <p class="lede">Bruges → Sclessin. À vol d'oiseau, entre les deux stades les plus éloignés des 18 clubs.</p>
      <p class="kicker">Et c'est la version optimiste : l'oiseau ne prend pas l'E40.</p>
    </div>`,
    { background: "bg-fiche", blur: 5 },
  ),
);

add(
  "c15-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Et le plus court ? Zéro.</p>
      <h1 class="xs">Le même<br>championnat.</h1>
      <div class="list">
        <div class="row"><i style="${KM}">178,0</i><span>km — Bruges · Sclessin</span></div>
        <div class="row"><i style="${KM}">14,8</i><span>km — Courtrai · Zulte Waregem</span></div>
        <div class="row"><i style="${KM}">3,6</i><span>km — Union · Anderlecht</span></div>
        <div class="row"><i style="${KM}">0,0</i><span>km — Club Brugge · Cercle Brugge</span></div>
      </div>
      <p class="kicker">Les Brugeois ne sortent même pas du parking.</p>
    </div>`,
    { background: "bg-breydel", blur: 5 },
  ),
);

add(
  "c15-3",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">18 clubs · 17 stades · un seul pays</p>
      <h1 class="sm">Du plat pays<br>au bord de<br>la Meuse.</h1>
      <p class="lede">178 km d'écart entre les deux extrêmes. On a documenté les deux bouts. Et les quinze autres aussi.</p>
    </div>`,
    { background: "bg-stades", blur: 4, swipe: false },
  ),
);

/* ----------------------------------------------------------------- rendu */

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();

for (const { file, html } of slides) {
  await p.setContent(html, { waitUntil: "load" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(160);
  await p.screenshot({ path: `${OUT}/${file}.png` });
}

await browser.close();
console.log(`${slides.length} visuels générés dans ${OUT}`);
