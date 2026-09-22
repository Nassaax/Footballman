/**
 * Capture de vraies pages du site pour servir de fond aux visuels sociaux.
 *
 * Les polices sont injectées depuis node_modules : le serveur local n'atteint
 * pas Google Fonts, et sans cela les captures montreraient une typographie de
 * repli qui n'est pas celle du site en production.
 */
import { chromium } from "playwright";
import { readFileSync, mkdirSync } from "node:fs";

const OUT = process.argv[2];
const BASE = "http://127.0.0.1:3100";
mkdirSync(OUT, { recursive: true });

const font = (p) => readFileSync(`node_modules/@fontsource/${p}`).toString("base64");
const FONT_CSS = `
@font-face{font-family:Archivo;src:url(data:font/woff2;base64,${font("archivo/files/archivo-latin-900-normal.woff2")}) format('woff2');font-weight:900}
@font-face{font-family:Archivo;src:url(data:font/woff2;base64,${font("archivo/files/archivo-latin-800-normal.woff2")}) format('woff2');font-weight:800}
@font-face{font-family:Archivo;src:url(data:font/woff2;base64,${font("archivo/files/archivo-latin-700-normal.woff2")}) format('woff2');font-weight:700}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${font("inter/files/inter-latin-400-normal.woff2")}) format('woff2');font-weight:400}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${font("inter/files/inter-latin-600-normal.woff2")}) format('woff2');font-weight:600}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${font("inter/files/inter-latin-500-normal.woff2")}) format('woff2');font-weight:500}
`;

/** Fausse galerie : le stockage réel est vide, mais le composant doit être montré rempli. */
const fakePhoto = (label, c1, c2) =>
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="800" height="600" fill="url(#g)"/><text x="40" y="556" font-family="sans-serif" font-size="30" fill="rgba(255,255,255,.85)">${label}</text></svg>`,
  );

const photos = [
  { id: "1", stadiumId: "stade-maurice-dufrasne", url: fakePhoto("Tribune 3", "#6d0f1c", "#e4002b"), pathname: "", caption: "Le virage avant l'entrée des joueurs", author: "Nicolas D.", license: "site-only", submittedAt: "", bytes: 0 },
  { id: "2", stadiumId: "stade-maurice-dufrasne", url: fakePhoto("Quais de Meuse", "#16242c", "#5b7684"), pathname: "", caption: "L'approche par les quais", author: "Emma V.", license: "cc-by", submittedAt: "", bytes: 0 },
  { id: "3", stadiumId: "stade-maurice-dufrasne", url: fakePhoto("Avant-match", "#2a1a12", "#b8622c"), pathname: "", caption: "Une heure avant le coup d'envoi", author: "Sofiane B.", license: "cc-by", submittedAt: "", bytes: 0 },
];

const shots = [
  { file: "bg-home", path: "/", scroll: null, theme: "dark" },
  { file: "bg-stades", path: "/stades", scroll: 520, theme: "dark" },
  { file: "bg-fiche", path: "/stades/stade-maurice-dufrasne", scroll: null, theme: "dark" },
  { file: "bg-tribunes", path: "/stades/stade-maurice-dufrasne", anchor: "tribunes", theme: "light" },
  { file: "bg-acces", path: "/stades/cegeka-arena", anchor: "venir", theme: "light" },
  { file: "bg-photos", path: "/stades/stade-maurice-dufrasne", anchor: "photos", theme: "dark" },
  { file: "bg-jour", path: "/stades/lotto-park", anchor: "jour-de-match", theme: "light" },
  // Fonds assortis aux clubs cités dans les carrousels « derbys ».
  { file: "bg-breydel", path: "/stades/jan-breydel", scroll: null, theme: "dark" },
  { file: "bg-breydel-tribunes", path: "/stades/jan-breydel", anchor: "tribunes", theme: "light" },
  { file: "bg-breydel-acces", path: "/stades/jan-breydel", anchor: "venir", theme: "light" },
  { file: "bg-sclessin-acces", path: "/stades/stade-maurice-dufrasne", anchor: "venir", theme: "light" },
  { file: "bg-marien", path: "/stades/stade-joseph-marien", scroll: null, theme: "dark" },
];

const browser = await chromium.launch();

for (const shot of shots) {
  const ctx = await browser.newContext({
    viewport: { width: 1080, height: 1920 },
    colorScheme: shot.theme === "dark" ? "dark" : "light",
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.route("**/api/photos**", (r) => r.fulfill({ json: { photos, storageReady: true } }));
  await page.goto(`${BASE}${shot.path}`, { waitUntil: "domcontentloaded" });
  await page.addStyleTag({ content: FONT_CSS });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(900);

  if (shot.anchor) {
    await page.evaluate(
      (a) => document.getElementById(a)?.scrollIntoView({ behavior: "instant", block: "start" }),
      shot.anchor,
    );
    await page.waitForTimeout(500);
  } else if (shot.scroll) {
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), shot.scroll);
    await page.waitForTimeout(400);
  }

  // Les barres collantes datent la capture : on les retire pour un fond propre.
  await page.evaluate(() => {
    document.querySelectorAll("header, nav").forEach((el) => {
      const s = getComputedStyle(el);
      if (s.position === "sticky" || s.position === "fixed") el.style.visibility = "hidden";
    });
  });
  await page.waitForTimeout(150);

  await page.screenshot({ path: `${OUT}/${shot.file}.png` });
  await ctx.close();
}

await browser.close();
console.log(`${shots.length} fonds capturés dans ${OUT}`);
