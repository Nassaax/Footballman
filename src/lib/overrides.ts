import fs from "node:fs";
import path from "node:path";
import type { Club, Stadium } from "@/data/types";

/**
 * CMS léger de la V1.
 *
 * Les corrections saisies dans /admin sont écrites dans content/overrides.json
 * et fusionnées par-dessus les données du dépôt. Aucune base de données n'est
 * nécessaire, le contenu reste versionnable et le site reste entièrement
 * statique. Le jour où l'édition simultanée devient un besoin, il suffit de
 * remplacer la lecture de ce fichier par un appel Supabase : le reste du code
 * ne change pas.
 */

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends (infer U)[] ? U[] : T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export interface Overrides {
  clubs: Record<string, DeepPartial<Club>>;
  stadiums: Record<string, DeepPartial<Stadium>>;
}

export const OVERRIDES_PATH = path.join(process.cwd(), "content", "overrides.json");

const empty: Overrides = { clubs: {}, stadiums: {} };

export function readOverrides(): Overrides {
  try {
    const raw = fs.readFileSync(OVERRIDES_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<Overrides>;
    return { clubs: parsed.clubs ?? {}, stadiums: parsed.stadiums ?? {} };
  } catch {
    return empty;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Fusion profonde : un tableau fourni remplace intégralement l'original. */
export function merge<T>(base: T, patch: unknown): T {
  if (patch === undefined) return base;
  if (!isPlainObject(base) || !isPlainObject(patch)) return patch as T;

  const out: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(patch)) {
    out[key] = isPlainObject(value) ? merge((base as Record<string, unknown>)[key], value) : value;
  }
  return out as T;
}
