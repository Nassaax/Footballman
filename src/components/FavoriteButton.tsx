"use client";

import { useFavorites } from "@/lib/favorites";

export function FavoriteButton({
  id,
  label,
  compact = false,
  onDark = false,
}: {
  id: string;
  label: string;
  compact?: boolean;
  /** Variante claire pour les fonds photographiques sombres. */
  onDark?: boolean;
}) {
  const { has, toggle, ready } = useFavorites();
  const active = ready && has(id);

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={active}
      aria-label={active ? `Retirer ${label} des favoris` : `Ajouter ${label} aux favoris`}
      className={compact ? undefined : "btn btn-ghost"}
      style={
        compact
          ? {
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 38,
              height: 38,
              borderRadius: 999,
              border: "1px solid color-mix(in srgb, #fff 40%, transparent)",
              background: "color-mix(in srgb, #000 35%, transparent)",
              backdropFilter: "blur(6px)",
              color: active ? "#ff6b6b" : "#fff",
              cursor: "pointer",
            }
          : onDark
            ? {
                color: active ? "#ff8a8a" : "#fff",
                borderColor: "rgba(255,255,255,.45)",
                background: "transparent",
              }
            : { color: active ? "var(--color-accent)" : undefined }
      }
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 20s-7-4.4-7-9.1A3.9 3.9 0 0 1 12 8.4 3.9 3.9 0 0 1 19 10.9C19 15.6 12 20 12 20Z" strokeLinejoin="round" />
      </svg>
      {compact ? null : <span>{active ? "Dans mes favoris" : "Ajouter aux favoris"}</span>}
    </button>
  );
}
