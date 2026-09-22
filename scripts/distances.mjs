/**
 * Distances entre les stades des 18 clubs, à vol d'oiseau.
 *
 * Sert à sourcer les chiffres avancés dans les visuels sociaux : plutôt que
 * d'estimer « le plus long déplacement du championnat », on le calcule sur les
 * coordonnées déjà présentes dans les fiches. Le résultat est donc reproductible
 * et se met à jour tout seul si une fiche change.
 *
 * Attention : c'est une distance orthodromique, pas un trajet. Un parcours
 * routier ou ferroviaire est nécessairement plus long, et nous ne le publions
 * pas tant qu'il n'a pas été vérifié auprès d'une source de transport.
 *
 *   node scripts/distances.mjs
 */
import { readFileSync, readdirSync } from "node:fs";

const num = (s, k) => {
  const m = s.match(new RegExp(`^\\s*${k}:\\s*(-?[\\d.]+)`, "m"));
  return m ? parseFloat(m[1]) : null;
};
const str = (s, k) => {
  const m = s.match(new RegExp(`^\\s*${k}:\\s*"([^"]+)"`, "m"));
  return m ? m[1] : null;
};

const stadiums = {};
for (const f of readdirSync("src/data/stadiums").filter((f) => f.endsWith(".ts") && f !== "index.ts")) {
  const s = readFileSync(`src/data/stadiums/${f}`, "utf8");
  const id = str(s, "id");
  stadiums[id] = { id, name: str(s, "name"), lat: num(s, "latitude"), lon: num(s, "longitude") };
}

const clubs = [];
for (const block of readFileSync("src/data/clubs.ts", "utf8").split(/\n  \{/).slice(1)) {
  const id = str(block, "id");
  const stadiumId = str(block, "stadiumId");
  if (id && stadiumId) clubs.push({ id, name: str(block, "name"), stadiumId });
}

const R = 6371;
const rad = (d) => (d * Math.PI) / 180;
const haversine = (a, b) => {
  const dLat = rad(b.lat - a.lat);
  const dLon = rad(b.lon - a.lon);
  const x =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
};

const pairs = [];
for (let i = 0; i < clubs.length; i++) {
  for (let j = i + 1; j < clubs.length; j++) {
    const a = stadiums[clubs[i].stadiumId];
    const b = stadiums[clubs[j].stadiumId];
    if (a?.lat == null || b?.lat == null) {
      console.warn(`Coordonnées manquantes : ${clubs[i].name} / ${clubs[j].name}`);
      continue;
    }
    pairs.push({ a: clubs[i].name, b: clubs[j].name, km: haversine(a, b) });
  }
}

pairs.sort((x, y) => y.km - x.km);
const line = (p) => `${p.km.toFixed(1).padStart(6)} km   ${p.a} → ${p.b}`;

console.log(`${clubs.length} clubs, ${pairs.length} paires\n`);
console.log("Les plus longs déplacements :");
pairs.slice(0, 6).forEach((p) => console.log(line(p)));
console.log("\nLes plus courts :");
pairs.slice(-4).forEach((p) => console.log(line(p)));
