import type { Source } from "./types";

/**
 * Hiérarchie de sources (cf. charte éditoriale) :
 * 1. site officiel du club
 * 2. Pro League
 * 3. autorités locales
 * 4. opérateurs de transport / bases documentaires
 */

export const PRO_LEAGUE: Source = {
  label: "Pro League — clubs de Jupiler Pro League",
  url: "https://www.proleague.be/jpl-clubs",
  tier: 2,
};

export const STADIUMDB: Source = {
  label: "StadiumDB — base documentaire stades",
  url: "https://stadiumdb.com/",
  tier: 4,
};

export const WIKI: Source = {
  label: "Wikipédia (encyclopédie collaborative) — à revalider auprès du club",
  url: "https://en.wikipedia.org/wiki/List_of_football_stadiums_in_Belgium",
  tier: 4,
};

export function clubSite(url: string): Source {
  return { label: "Site officiel du club", url, tier: 1 };
}

export function operator(label: string, url: string): Source {
  return { label, url, tier: 4 };
}

/** Date de la dernière campagne de vérification documentaire. */
export const LAST_AUDIT = "2026-09-21";
