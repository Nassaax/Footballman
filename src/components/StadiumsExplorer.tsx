"use client";

import { useMemo, useState } from "react";
import type { Club, Stadium } from "@/data/types";
import { StadiumCard } from "./StadiumCard";
import { formatNumber, isVerified } from "@/lib/format";

type Card = { club: Club; stadium: Stadium };

const regions = ["Toutes", "Flandre", "Bruxelles", "Wallonie"] as const;
const sorts = [
  { id: "alpha", label: "A → Z" },
  { id: "capacity", label: "Capacité" },
  { id: "city", label: "Ville" },
] as const;

export function StadiumsExplorer({ cards }: { cards: Card[] }) {
  const [region, setRegion] = useState<(typeof regions)[number]>("Toutes");
  const [sort, setSort] = useState<(typeof sorts)[number]["id"]>("alpha");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cards
      .filter((c) => (region === "Toutes" ? true : c.club.region === region))
      .filter((c) =>
        q.length === 0
          ? true
          : `${c.club.name} ${c.club.shortName} ${c.stadium.name} ${c.stadium.city}`
              .toLowerCase()
              .includes(q),
      )
      .sort((a, b) => {
        if (sort === "capacity") {
          const av = isVerified(a.stadium.capacity) ? (a.stadium.capacity.value as number) : 0;
          const bv = isVerified(b.stadium.capacity) ? (b.stadium.capacity.value as number) : 0;
          return bv - av;
        }
        if (sort === "city") return a.stadium.city.localeCompare(b.stadium.city, "fr");
        return a.club.name.localeCompare(b.club.name, "fr");
      });
  }, [cards, region, sort, query]);

  // Un stade partagé (Jan Breydel) ne doit être compté qu'une fois.
  const total = [...new Map(visible.map((c) => [c.stadium.id, c.stadium])).values()].reduce(
    (sum, s) => sum + (isVerified(s.capacity) ? (s.capacity.value as number) : 0),
    0,
  );

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
        <label style={{ flex: "1 1 220px", minWidth: 200 }}>
          <span className="sr-only">Filtrer par club, stade ou ville</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Club, stade, ville…"
            style={{
              width: "100%",
              minHeight: 46,
              padding: "0 1rem",
              borderRadius: 999,
              border: "1px solid var(--color-line)",
              background: "var(--color-surface)",
              color: "var(--color-text)",
              fontSize: "0.9375rem",
            }}
          />
        </label>

        <div role="group" aria-label="Région" style={{ display: "flex", gap: "0.375rem", flexWrap: "wrap" }}>
          {regions.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              aria-pressed={region === r}
              style={{
                minHeight: 38,
                padding: "0 0.875rem",
                borderRadius: 999,
                fontSize: "0.8125rem",
                fontWeight: 600,
                cursor: "pointer",
                border: "1px solid var(--color-line)",
                background: region === r ? "var(--color-text)" : "transparent",
                color: region === r ? "var(--color-bg)" : "var(--color-muted)",
              }}
            >
              {r}
            </button>
          ))}
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span className="eyebrow">Trier</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            style={{
              minHeight: 38,
              padding: "0 0.625rem",
              borderRadius: 999,
              border: "1px solid var(--color-line)",
              background: "var(--color-surface)",
              color: "var(--color-text)",
              fontSize: "0.8125rem",
            }}
          >
            {sorts.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </label>
      </div>

      <p style={{ marginTop: "1rem", fontSize: "0.8125rem", color: "var(--color-muted)" }}>
        {visible.length} club{visible.length > 1 ? "s" : ""}
        {total > 0 ? ` · ${formatNumber(total)} places cumulées` : ""}
      </p>

      {visible.length === 0 ? (
        <p className="card" style={{ marginTop: "2rem", padding: "2rem", textAlign: "center" }}>
          Aucun résultat. Essayez « Liège », « Bruges » ou « Anderlecht ».
        </p>
      ) : (
        <div className="grid-stadiums" style={{ marginTop: "1.5rem" }}>
          {visible.map((c) => (
            <StadiumCard key={c.club.id} club={c.club} stadium={c.stadium} />
          ))}
        </div>
      )}
    </div>
  );
}
