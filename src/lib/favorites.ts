"use client";

import { useCallback, useEffect, useState } from "react";
import { track } from "./analytics";

const KEY = "stadia.favorites.v1";

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/**
 * Favoris stockés côté navigateur : aucun compte requis pour consulter le site.
 * La structure est prête à être synchronisée plus tard avec un compte utilisateur.
 */
export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIds(read());
    setReady(true);
    const sync = (e: StorageEvent) => {
      if (e.key === KEY) setIds(read());
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const persist = useCallback((next: string[]) => {
    setIds(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* mode privé ou stockage bloqué : les favoris restent en mémoire */
    }
  }, []);

  const toggle = useCallback(
    (id: string) => {
      const has = ids.includes(id);
      persist(has ? ids.filter((x) => x !== id) : [...ids, id]);
      track(has ? "favorite_remove" : "favorite_add", { id });
    },
    [ids, persist],
  );

  return { ids, ready, toggle, has: (id: string) => ids.includes(id) };
}
