"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { searchIndex, type SearchEntry } from "@/lib/search-core";
import { track } from "@/lib/analytics";

const suggestions = ["Liège", "Bruges", "parking", "derby", "billet", "tribune", "Sclessin"];

export function SearchClient({ index }: { index: SearchEntry[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchIndex(index, query), [index, query]);

  return (
    <div>
      <label>
        <span className="sr-only">Rechercher</span>
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length > 2) track("search", { q: e.target.value.slice(0, 40) });
          }}
          placeholder="Club, stade, ville, anecdote…"
          style={{
            width: "100%",
            minHeight: 56,
            padding: "0 1.25rem",
            borderRadius: 999,
            border: "1px solid var(--color-line)",
            background: "var(--color-surface)",
            color: "var(--color-text)",
            fontSize: "1.0625rem",
          }}
        />
      </label>

      {query.trim().length < 2 ? (
        <div style={{ marginTop: "1.25rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {suggestions.map((s) => (
            <button key={s} type="button" className="chip" style={{ cursor: "pointer" }} onClick={() => setQuery(s)}>
              {s}
            </button>
          ))}
        </div>
      ) : results.length === 0 ? (
        <p className="card" style={{ marginTop: "2rem", padding: "2rem", textAlign: "center" }}>
          Aucun résultat pour « {query} ».
        </p>
      ) : (
        <ul
          style={{
            marginTop: "1.5rem",
            display: "grid",
            gap: "1px",
            background: "var(--color-line)",
            border: "1px solid var(--color-line)",
            borderRadius: "var(--radius-md)",
            overflow: "hidden",
          }}
        >
          {results.map((r) => (
            <li key={r.id} style={{ background: "var(--color-surface)" }}>
              <Link
                href={r.href}
                style={{ display: "flex", gap: "1rem", alignItems: "center", padding: "0.875rem 1.125rem" }}
              >
                <span className="chip" style={{ textTransform: "capitalize" }}>{r.kind}</span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontWeight: 600, fontSize: "0.9375rem" }}>{r.title}</span>
                  <span style={{ display: "block", fontSize: "0.8125rem", color: "var(--color-muted)" }}>{r.subtitle}</span>
                </span>
                <span aria-hidden="true" style={{ marginLeft: "auto", color: "var(--color-muted)" }}>→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
