"use client";

import { getSponsor, type SlotId } from "@/lib/monetization";
import { track } from "@/lib/analytics";

/**
 * Emplacement partenaire. Ne rend RIEN si aucun partenaire n'est configuré :
 * le site ne montre jamais un cadre publicitaire vide.
 */
export function PartnerSlot({ slot, stadiumId }: { slot: SlotId; stadiumId?: string }) {
  const sponsor = getSponsor(slot, stadiumId);
  if (!sponsor) return null;

  return (
    <aside
      className="card"
      style={{ padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "1rem" }}
    >
      <div style={{ flex: 1 }}>
        <p className="eyebrow">{sponsor.claim ?? "Partenaire de l'expérience"}</p>
        <p style={{ fontWeight: 600, marginTop: 4 }}>{sponsor.name}</p>
      </div>
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="btn btn-ghost"
        style={{ minHeight: 40 }}
        onClick={() => track("sponsor_click", { slot, sponsor: sponsor.id })}
      >
        Découvrir
      </a>
    </aside>
  );
}

/** Lien affilié, toujours explicitement identifié comme tel. */
export function AffiliateLink({
  href,
  children,
  context,
}: {
  href: string;
  children: React.ReactNode;
  context: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored nofollow"
      className="link-underline"
      onClick={() => track("affiliate_click", { context })}
    >
      {children}
      <span className="chip" style={{ marginLeft: 8, fontSize: "0.625rem" }}>
        lien affilié
      </span>
    </a>
  );
}
