/* Recherche : partie pure, utilisable côté client (aucun accès au contenu). */

export interface SearchEntry {
  id: string;
  kind: "stade" | "club" | "ville" | "anecdote" | "tribune" | "pratique";
  title: string;
  subtitle: string;
  href: string;
  /** Texte concaténé sur lequel la recherche opère. */
  haystack: string;
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

export function searchIndex(index: SearchEntry[], query: string, limit = 24): SearchEntry[] {
  const q = normalize(query.trim());
  if (q.length < 2) return [];
  const terms = q.split(/\s+/);

  return index
    .map((entry) => {
      const hay = normalize(`${entry.title} ${entry.subtitle} ${entry.haystack}`);
      const title = normalize(entry.title);
      let score = 0;
      for (const term of terms) {
        if (!hay.includes(term)) return { entry, score: -1 };
        if (title.startsWith(term)) score += 6;
        else if (title.includes(term)) score += 4;
        else score += 1;
      }
      if (entry.kind === "stade") score += 2;
      if (entry.kind === "club") score += 1;
      return { entry, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry);
}
