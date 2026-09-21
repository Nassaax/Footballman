"use client";

import { useMemo, useState } from "react";
import type { Stadium, StadiumSection } from "@/data/types";
import { track } from "@/lib/analytics";

/**
 * « Votre jour de match » : le déroulé type du stade, recalé sur l'heure du coup
 * d'envoi choisie par l'utilisateur. Version V1 volontairement simple, mais la
 * structure accepte déjà un match réel (date + heure) et une tribune.
 */
function shiftTime(kickoff: string, offset: string): string {
  const match = /^([+-])(\d+)\s*h\s*(\d+)?$/.exec(offset.trim());
  const [h, m] = kickoff.split(":").map(Number);
  if (!match || Number.isNaN(h) || Number.isNaN(m)) return "";
  const sign = match[1] === "-" ? -1 : 1;
  const minutes = h * 60 + m + sign * (Number(match[2]) * 60 + Number(match[3] ?? 0));
  const wrapped = ((minutes % 1440) + 1440) % 1440;
  return `${String(Math.floor(wrapped / 60)).padStart(2, "0")}:${String(wrapped % 60).padStart(2, "0")}`;
}

export function MatchdayPlanner({
  stadium,
  sections,
}: {
  stadium: Stadium;
  sections: StadiumSection[];
}) {
  const [kickoff, setKickoff] = useState("20:45");
  const [sectionId, setSectionId] = useState(sections[0]?.id ?? "");

  const steps = useMemo(
    () =>
      stadium.matchdayTemplate.map((step) => ({
        ...step,
        time: shiftTime(kickoff, step.offset),
      })),
    [kickoff, stadium.matchdayTemplate],
  );

  const section = sections.find((s) => s.id === sectionId);

  return (
    <div style={{ marginTop: "2.5rem" }}>
      <div className="card" style={{ padding: "1.25rem", display: "flex", flexWrap: "wrap", gap: "1.25rem", alignItems: "flex-end" }}>
        <label style={{ display: "grid", gap: "0.375rem" }}>
          <span className="eyebrow">Coup d'envoi</span>
          <input
            type="time"
            value={kickoff}
            onChange={(e) => {
              setKickoff(e.target.value || "20:45");
              track("matchday_build", { stadiumId: stadium.id });
            }}
            style={{
              minHeight: 44,
              padding: "0 0.75rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-line)",
              background: "var(--color-bg)",
              color: "var(--color-text)",
              fontSize: "1rem",
            }}
          />
        </label>

        <label style={{ display: "grid", gap: "0.375rem", flex: 1, minWidth: 220 }}>
          <span className="eyebrow">Votre tribune</span>
          <select
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
            style={{
              minHeight: 44,
              padding: "0 0.75rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-line)",
              background: "var(--color-bg)",
              color: "var(--color-text)",
              fontSize: "1rem",
            }}
          >
            {sections.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </label>
      </div>

      <ol style={{ marginTop: "1.5rem", display: "grid", gap: "1px", background: "var(--color-line)", border: "1px solid var(--color-line)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
        {steps.map((step) => (
          <li
            key={step.offset}
            style={{ background: "var(--color-surface)", padding: "1rem 1.25rem", display: "grid", gridTemplateColumns: "4.5rem 1fr", gap: "1rem" }}
          >
            <span className="display" style={{ fontSize: "1rem", color: step.time ? "var(--color-accent)" : "var(--color-muted)" }}>
              {step.time || step.offset}
            </span>
            <div>
              <p style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{step.label}</p>
              {step.detail ? (
                <p style={{ color: "var(--color-muted)", fontSize: "0.875rem", marginTop: 2 }}>{step.detail}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      {section ? (
        <p style={{ fontSize: "0.875rem", color: "var(--color-muted)", marginTop: "1rem" }}>
          Pour la {section.name} : {section.atmosphere.toLowerCase()} Vérifiez votre porte d'entrée sur
          votre billet — elle dépend de votre bloc.
        </p>
      ) : null}
    </div>
  );
}
