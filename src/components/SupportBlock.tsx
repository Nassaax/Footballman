"use client";

import { support, supportEnabled } from "@/lib/monetization";
import { track } from "@/lib/analytics";

/**
 * Soutien volontaire. N'affiche rien tant qu'aucune destination de paiement
 * n'est configurée : pas d'appel au don sans lien valide.
 */
export function SupportBlock({ context }: { context: string }) {
  if (!supportEnabled()) return null;

  return (
    <aside
      className="card"
      style={{ padding: "1.25rem 1.5rem", display: "flex", gap: "1.25rem", alignItems: "center", flexWrap: "wrap" }}
    >
      <p style={{ flex: "1 1 320px", fontSize: "0.9375rem", color: "var(--color-muted)", margin: 0 }}>
        {support.pitch}
      </p>
      <a
        href={support.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-ghost"
        onClick={() => track("support_click", { context })}
      >
        {support.label}
      </a>
    </aside>
  );
}
