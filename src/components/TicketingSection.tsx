"use client";

import type { Ticketing } from "@/data/types";
import { FactList, FactValue } from "./FactValue";
import { track } from "@/lib/analytics";

export function TicketingSection({
  ticketing,
  clubName,
  stadiumId,
}: {
  ticketing: Ticketing;
  clubName: string;
  stadiumId: string;
}) {
  return (
    <div style={{ marginTop: "2.5rem" }}>
      {ticketing.officialUrl ? (
        <a
          href={ticketing.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
          onClick={() => track("ticketing_click", { stadiumId, clubName })}
        >
          Billetterie officielle de {clubName}
        </a>
      ) : null}

      <dl style={{ marginTop: "2rem", display: "grid", gap: "1px", background: "var(--color-line)", border: "1px solid var(--color-line)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        {[
          { label: "Compte nécessaire", node: <FactValue fact={ticketing.accountRequired} render={(v) => (v ? "Oui" : "Non")} /> },
          { label: "Billet nominatif", node: <FactValue fact={ticketing.nominative} render={(v) => (v ? "Oui" : "Non")} /> },
          { label: "Tarifs", node: <FactValue fact={ticketing.prices} /> },
          { label: "Abonnement", node: <FactValue fact={ticketing.season} /> },
          { label: "Guichet sur place", node: <FactValue fact={ticketing.boxOffice} /> },
          { label: "Supporters visiteurs", node: <FactValue fact={ticketing.awayFans} /> },
          { label: "Conditions d'achat", node: <FactList fact={ticketing.conditions} /> },
        ].map((row) => (
          <div
            key={row.label}
            style={{ background: "var(--color-surface)", padding: "1rem 1.25rem", display: "grid", gap: "0.25rem" }}
          >
            <dt className="eyebrow">{row.label}</dt>
            <dd style={{ fontSize: "0.9375rem" }}>{row.node}</dd>
          </div>
        ))}
      </dl>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-muted)", marginTop: "1rem" }}>
        Nous ne vendons pas de billets et n'affichons jamais un prix que nous n'avons pas vérifié.
        Les tarifs varient selon la rencontre : seule la billetterie officielle fait foi.
      </p>
    </div>
  );
}
