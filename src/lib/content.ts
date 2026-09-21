import { clubs as baseClubs } from "@/data/clubs";
import { stadiums as baseStadiums } from "@/data/stadiums";
import type { Club, Stadium, StadiumWithClub } from "@/data/types";
import { merge, readOverrides } from "./overrides";

/**
 * Couche d'accès au contenu.
 *
 * Aujourd'hui : données typées versionnées dans le dépôt (rapide, indexable,
 * zéro dépendance, zéro coût). Demain : il suffit de réimplémenter ces
 * fonctions au-dessus de Supabase ou d'un CMS headless — aucune page ni aucun
 * composant n'importe `@/data/*` directement.
 */

const overrides = readOverrides();

const clubs: Club[] = baseClubs.map((club) => merge(club, overrides.clubs[club.id]));
const stadiums: Stadium[] = baseStadiums.map((stadium) =>
  merge(stadium, overrides.stadiums[stadium.id]),
);

const clubById = new Map(clubs.map((c) => [c.id, c]));
const clubBySlug = new Map(clubs.map((c) => [c.slug, c]));
const stadiumBySlug = new Map(stadiums.map((s) => [s.slug, s]));

export function getClubs(): Club[] {
  return clubs;
}

export function getStadiums(): Stadium[] {
  return stadiums;
}

/** Le club « hôte principal » d'un stade. */
export function hostClub(stadium: Stadium): Club {
  const club = clubById.get(stadium.clubId);
  if (!club) throw new Error(`Club introuvable pour le stade ${stadium.id}`);
  return club;
}

export function coTenants(stadium: Stadium): Club[] {
  return (stadium.coTenantClubIds ?? [])
    .map((id) => clubById.get(id))
    .filter((c): c is Club => Boolean(c));
}

export function getStadiumBySlug(slug: string): StadiumWithClub | null {
  const stadium = stadiumBySlug.get(slug);
  if (!stadium) return null;
  return { stadium, club: hostClub(stadium), coTenants: coTenants(stadium) };
}

export function getStadiumForClubSlug(slug: string): StadiumWithClub | null {
  const club = clubBySlug.get(slug);
  if (!club) return null;
  const stadium = stadiums.find((s) => s.id === club.stadiumId);
  if (!stadium) return null;
  return { stadium, club, coTenants: coTenants(stadium) };
}

/** Un item par club (18) : c'est la grille éditoriale de la page d'accueil. */
export function getClubCards() {
  return clubs.map((club) => {
    const stadium = stadiums.find((s) => s.id === club.stadiumId);
    if (!stadium) throw new Error(`Stade introuvable pour le club ${club.id}`);
    return { club, stadium };
  });
}

export function getAllStadiumsWithClubs(): StadiumWithClub[] {
  return stadiums.map((stadium) => ({
    stadium,
    club: hostClub(stadium),
    coTenants: coTenants(stadium),
  }));
}
