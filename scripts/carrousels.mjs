/**
 * Génère les visuels des carrousels TikTok en 1080 × 1920.
 *
 * On réutilise l'identité du site (Archivo + Inter, encre, os, terracotta) et
 * la plaque géométrique de StadiumVisual, pour que les publications et le site
 * se ressemblent. Les polices sont embarquées en base64 : aucun accès réseau
 * n'est nécessaire au rendu.
 */
import { chromium } from "playwright";
import { readFileSync, mkdirSync } from "node:fs";

const OUT = process.argv[2];
mkdirSync(OUT, { recursive: true });

const font = (p) => readFileSync(`node_modules/@fontsource/${p}`).toString("base64");
const ARCHIVO_900 = font("archivo/files/archivo-latin-900-normal.woff2");
const ARCHIVO_700 = font("archivo/files/archivo-latin-700-normal.woff2");
const INTER_400 = font("inter/files/inter-latin-400-normal.woff2");
const INTER_600 = font("inter/files/inter-latin-600-normal.woff2");

const INK = "#0B0D0F";
const BONE = "#F7F4EF";
const TERRA = "#C2502A";
const GOLD = "#C9A227";

/** La cuvette du stade, reprise du site, en filigrane. */
const bowl = (opacity = 0.22, rotate = -4) => `
<svg class="bowl" viewBox="0 0 1080 1920" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <g transform="rotate(${rotate} 540 960)" opacity="${opacity}">
    ${[0, 1, 2, 3, 4]
      .map((r) => {
        const g = r * 110;
        return `<rect x="${250 - g}" y="${760 - g * 0.62}" width="${580 + g * 2}" height="${
          400 + g * 1.24
        }" rx="${120 + g}" fill="none" stroke="#fff" stroke-width="${r === 0 ? 3 : 1.6}" opacity="${
          0.55 - r * 0.09
        }"/>`;
      })
      .join("")}
    <rect x="378" y="838" width="324" height="244" rx="8" fill="none" stroke="#fff" stroke-width="2" opacity="0.5"/>
    <line x1="540" y1="838" x2="540" y2="1082" stroke="#fff" stroke-width="1.6" opacity="0.42"/>
    <circle cx="540" cy="960" r="46" fill="none" stroke="#fff" stroke-width="1.6" opacity="0.42"/>
  </g>
</svg>`;

const wordmark = (color) => `
<div class="mark" style="color:${color}">
  <svg width="44" height="44" viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="currentColor"/>
    <path d="M6 23.5V17c0-5.52 4.48-10 10-10s10 4.48 10 10v6.5" fill="none" stroke="${
      color === BONE ? INK : BONE
    }" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M11 23.5v-6a5 5 0 0 1 10 0v6" fill="none" stroke="${TERRA}" stroke-width="2.4" stroke-linecap="round"/>
    <rect x="6" y="24.6" width="20" height="2.4" rx="1.2" fill="${color === BONE ? INK : BONE}"/>
  </svg>
  <span>STADIA <b>BELGICA</b></span>
</div>`;

function page(body, { dark = true, accentBar = true } = {}) {
  const bg = dark ? INK : BONE;
  const fg = dark ? BONE : INK;
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Archivo;src:url(data:font/woff2;base64,${ARCHIVO_900}) format('woff2');font-weight:900}
@font-face{font-family:Archivo;src:url(data:font/woff2;base64,${ARCHIVO_700}) format('woff2');font-weight:700}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER_400}) format('woff2');font-weight:400}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${INTER_600}) format('woff2');font-weight:600}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1920px;background:${bg};color:${fg};font-family:Inter,sans-serif;overflow:hidden;position:relative}
.bowl{position:absolute;inset:0;width:1080px;height:1920px}
.grain{position:absolute;inset:0;opacity:.05;mix-blend-mode:overlay}
.wrap{position:absolute;inset:0;padding:190px 96px 500px;display:flex;flex-direction:column;justify-content:center;z-index:2}
.eyebrow{font-family:Archivo;font-weight:700;font-size:26px;letter-spacing:.22em;text-transform:uppercase;color:${
    dark ? "rgba(247,244,239,.6)" : "rgba(11,13,15,.55)"
  }}
h1{font-family:Archivo;font-weight:900;letter-spacing:-.035em;line-height:.93;font-size:118px;margin-top:34px}
h1.sm{font-size:92px;line-height:1.0}
h1.xs{font-size:74px;line-height:1.06}
.lede{font-size:38px;line-height:1.42;margin-top:40px;color:${
    dark ? "rgba(247,244,239,.78)" : "rgba(11,13,15,.72)"
  };max-width:24ch}
.accent{color:${TERRA}}
.bar{width:132px;height:9px;background:${TERRA};border-radius:99px;margin-bottom:8px}
.spacer{display:none}
.list{margin-top:56px;display:flex;flex-direction:column;gap:26px}
.row{display:flex;gap:26px;align-items:baseline;font-size:40px;line-height:1.25}
.row i{font-family:Archivo;font-weight:900;font-style:normal;font-size:28px;color:${TERRA};min-width:52px}
.card{border:2px solid ${dark ? "rgba(247,244,239,.16)" : "rgba(11,13,15,.14)"};border-radius:26px;padding:42px 44px;margin-top:44px}
.card .k{font-family:Archivo;font-weight:700;font-size:22px;letter-spacing:.2em;text-transform:uppercase;color:${
    dark ? "rgba(247,244,239,.5)" : "rgba(11,13,15,.45)"
  }}
.card .v{font-size:40px;margin-top:16px;line-height:1.3}
.card .tbc{font-style:italic;color:${dark ? "rgba(247,244,239,.55)" : "rgba(11,13,15,.5)"}}
.mark{position:absolute;left:96px;bottom:410px;display:flex;align-items:center;gap:20px;font-family:Archivo;font-weight:700;font-size:30px;letter-spacing:.06em;z-index:3}
.mark b{font-weight:900;color:${TERRA}}
.swipe{position:absolute;right:96px;bottom:415px;font-family:Archivo;font-weight:700;font-size:26px;letter-spacing:.14em;text-transform:uppercase;color:${
    dark ? "rgba(247,244,239,.45)" : "rgba(11,13,15,.4)"
  };z-index:3}
.big{font-family:Archivo;font-weight:900;font-size:150px;letter-spacing:-.04em;line-height:.9}
.sig{font-family:Archivo;font-weight:900;font-size:104px;letter-spacing:-.03em;line-height:.95}
.sig .b{color:${TERRA}}
.gold{color:${GOLD}}
</style></head><body>
${accentBar ? "" : ""}
${body}
<svg class="grain" aria-hidden="true"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="3"/><feColorMatrix type="saturate" values="0"/></filter><rect width="1080" height="1920" filter="url(#n)"/></svg>
</body></html>`;
}

/* ------------------------------------------------------------- contenus */

const slides = [];
const add = (file, html) => slides.push({ file, html });

/* --- Carrousel 1 : le concept ------------------------------------------ */

add(
  "c1-1",
  page(
    `${bowl(0.2, -5)}
    <div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Jupiler Pro League</p>
      <h1>18 clubs.<br>17 stades.<br><span class="accent">Aucun guide.</span></h1>
      <p class="lede">Va comprendre.</p>
      <div class="spacer"></div>
    </div>
    ${wordmark(BONE)}
    <div class="swipe">Glisse →</div>`,
  ),
);

add(
  "c1-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Donc on s'y est collé</p>
      <h1 class="sm">Stade par<br>stade.</h1>
      <div class="list">
        <div class="row"><i>01</i><span>Son histoire, ses grandes soirées</span></div>
        <div class="row"><i>02</i><span>Ses tribunes, une par une</span></div>
        <div class="row"><i>03</i><span>Comment y aller vraiment</span></div>
        <div class="row"><i>04</i><span>Billetterie, règles, avant-match</span></div>
      </div>
      <div class="spacer"></div>
    </div>
    ${wordmark(INK)}
    <div class="swipe">Glisse →</div>`,
    { dark: false },
  ),
);

add(
  "c1-3",
  page(
    `${bowl(0.26, 3)}
    <div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">De Sclessin au Kuipje</p>
      <p class="sig" style="margin-top:38px">STADIA<br><span class="b">BELGICA</span></p>
      <p class="lede" style="margin-top:52px">Le stade n'est pas seulement l'endroit où se joue le match. C'est une expérience.</p>
      <div class="spacer"></div>
    </div>`,
  ),
);

/* --- Carrousel 2 : à quoi ça sert vraiment ----------------------------- */

add(
  "c2-1",
  page(
    `${bowl(0.18, 6)}
    <div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Samedi, Sclessin</p>
      <h1 class="sm">Tu comptes<br>prendre<br>le train ?</h1>
      <p class="lede">Mauvaise nouvelle : la halte de Sclessin ne circule pas le week-end.</p>
      <div class="spacer"></div>
    </div>
    ${wordmark(BONE)}
    <div class="swipe">Glisse →</div>`,
  ),
);

add(
  "c2-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Et il y en a d'autres</p>
      <h1 class="xs">Le genre de<br>truc qu'on<br>apprend<br>sur place.</h1>
      <div class="list">
        <div class="row"><i>↳</i><span><b>Genk, Bruges, Anvers</b> : les parkings du stade sont réservés aux abonnés.</span></div>
        <div class="row"><i>↳</i><span><b>Gand</b> : dernière navette 30 min avant le coup d'envoi.</span></div>
        <div class="row"><i>↳</i><span><b>Charleroi</b> : l'arrêt Janson est fermé les jours de match.</span></div>
      </div>
      <div class="spacer"></div>
    </div>
    ${wordmark(INK)}
    <div class="swipe">Glisse →</div>`,
    { dark: false },
  ),
);

add(
  "c2-3",
  page(
    `${bowl(0.26, -3)}
    <div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Pour les 17 stades</p>
      <h1 class="sm">Tout est<br>noté.<br><span class="accent">Stade par<br>stade.</span></h1>
      <p class="lede" style="margin-top:46px">STADIA BELGICA</p>
      <div class="spacer"></div>
    </div>`,
  ),
);

/* --- Carrousel 3 : la ligne éditoriale ---------------------------------- */

add(
  "c3-1",
  page(
    `${bowl(0.16, 5)}
    <div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Soyons clairs</p>
      <h1 class="sm">On ne sait<br>pas tout.</h1>
      <p class="lede">Et on ne va pas faire semblant.</p>
      <div class="spacer"></div>
    </div>
    ${wordmark(BONE)}
    <div class="swipe">Glisse →</div>`,
  ),
);

add(
  "c3-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Sur le site, ça donne ça</p>
      <h1 class="xs">Quand on ne<br>sait pas,<br>on l'écrit.</h1>
      <div class="card">
        <p class="k">Accès PMR</p>
        <p class="v tbc">Information à confirmer</p>
      </div>
      <div class="card">
        <p class="k">Capacité</p>
        <p class="v">27 670 places</p>
        <p class="k" style="margin-top:18px;text-transform:none;letter-spacing:0;font-family:Inter;font-weight:400;font-size:24px">Source citée · vérifié le 21 septembre 2026</p>
      </div>
      <div class="spacer"></div>
    </div>
    ${wordmark(INK)}
    <div class="swipe">Glisse →</div>`,
    { dark: false },
  ),
);

add(
  "c3-3",
  page(
    `${bowl(0.26, 2)}
    <div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Notre règle</p>
      <h1 class="sm">Un parking<br>inventé, c'est<br><span class="accent">ton samedi<br>gâché.</span></h1>
      <p class="lede" style="margin-top:46px">STADIA BELGICA</p>
      <div class="spacer"></div>
    </div>`,
  ),
);

/* --- Carrousel 4 : les photos des supporters ---------------------------- */

add(
  "c4-1",
  page(
    `${bowl(0.18, -6)}
    <div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Petit aveu</p>
      <h1 class="sm">On n'a pas<br>une seule<br>photo.</h1>
      <p class="lede">Pas une. Sur aucun des 17 stades.</p>
      <div class="spacer"></div>
    </div>
    ${wordmark(BONE)}
    <div class="swipe">Glisse →</div>`,
  ),
);

add(
  "c4-2",
  page(
    `<div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Ce n'est pas un oubli</p>
      <h1 class="xs">Les photos<br>des stades,<br>elles sont<br>à toi.</h1>
      <p class="lede" style="margin-top:44px">On ne republie rien dont on n'a pas les droits. Du coup la galerie de chaque stade se remplit avec les tiennes — ton nom en crédit, juste en dessous.</p>
      <div class="spacer"></div>
    </div>
    ${wordmark(INK)}
    <div class="swipe">Glisse →</div>`,
    { dark: false },
  ),
);

add(
  "c4-3",
  page(
    `${bowl(0.26, 4)}
    <div class="wrap">
      <div class="bar"></div>
      <p class="eyebrow">Ton virage, ton tifo, ton avant-match</p>
      <h1 class="sm">Envoie<br>ta photo.</h1>
      <p class="lede" style="margin-top:46px">STADIA BELGICA</p>
      <div class="spacer"></div>
    </div>`,
  ),
);

/* ----------------------------------------------------------------- rendu */

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
const p = await ctx.newPage();

for (const { file, html } of slides) {
  await p.setContent(html, { waitUntil: "load" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(120);
  await p.screenshot({ path: `${OUT}/${file}.png` });
}

await browser.close();
console.log(`${slides.length} visuels générés dans ${OUT}`);
