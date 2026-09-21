"use client";

import { useState } from "react";
import type { Club, StadiumSection } from "@/data/types";
import { FactValue } from "./FactValue";

const positions: Record<StadiumSection["layout"]["side"], React.CSSProperties> = {
  north: { top: "6%", left: "18%", right: "18%", height: "18%" },
  south: { bottom: "6%", left: "18%", right: "18%", height: "18%" },
  west: { left: "5%", top: "26%", bottom: "26%", width: "20%" },
  east: { right: "5%", top: "26%", bottom: "26%", width: "20%" },
};

/** Plan schématique cliquable. Aucune note arbitraire : uniquement du descriptif. */
export function SectionsPlan({
  sections,
  club,
}: {
  sections: StadiumSection[];
  club: Club;
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const active = sections.find((s) => s.id === activeId) ?? sections[0];

  return (
    <div className="grid-two" style={{ marginTop: "2.5rem", alignItems: "start" }}>
      <div
        style={{
          position: "relative",
          aspectRatio: "4 / 3",
          background: "var(--color-surface-2)",
          border: "1px solid var(--color-line)",
          borderRadius: "var(--radius-md)",
        }}
      >
        {/* pelouse */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "28% 27%",
            border: "1.5px solid var(--color-line)",
            borderRadius: 4,
            display: "grid",
            placeItems: "center",
          }}
        >
          <div style={{ width: "28%", aspectRatio: "1", borderRadius: "50%", border: "1.5px solid var(--color-line)" }} />
        </div>

        {sections.map((section) => {
          const isActive = section.id === active?.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveId(section.id)}
              aria-pressed={isActive}
              style={{
                position: "absolute",
                ...positions[section.layout.side],
                borderRadius: 8,
                border: `1px solid ${isActive ? club.colors.primary : "var(--color-line)"}`,
                background: isActive ? club.colors.primary : "var(--color-surface)",
                color: isActive ? "#fff" : "var(--color-text)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                padding: "0.25rem",
                cursor: "pointer",
                lineHeight: 1.2,
                transition: "background-color .2s, border-color .2s, color .2s",
              }}
            >
              {section.name}
            </button>
          );
        })}
      </div>

      {active ? (
        <div className="card" style={{ padding: "1.5rem" }}>
          <h3 className="display" style={{ fontSize: "1.375rem" }}>{active.name}</h3>
          <p style={{ color: "var(--color-muted)", marginTop: "0.625rem", fontSize: "0.9375rem" }}>
            {active.description}
          </p>

          <dl style={{ marginTop: "1.5rem", display: "grid", gap: "1rem" }}>
            {[
              { label: "Ambiance", value: active.atmosphere },
              { label: "Public habituel", value: active.audience },
              { label: "Visibilité", value: active.visibility },
            ].map((row) => (
              <div key={row.label}>
                <dt className="eyebrow">{row.label}</dt>
                <dd style={{ fontSize: "0.9375rem", marginTop: 3 }}>{row.value}</dd>
              </div>
            ))}
            <div>
              <dt className="eyebrow">Entrée</dt>
              <dd style={{ fontSize: "0.9375rem", marginTop: 3 }}>
                <FactValue fact={active.entrance} />
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Accessibilité PMR</dt>
              <dd style={{ fontSize: "0.9375rem", marginTop: 3 }}>
                <FactValue fact={active.accessibility} />
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Services</dt>
              <dd style={{ fontSize: "0.9375rem", marginTop: 3 }}>{active.services.join(" · ")}</dd>
            </div>
          </dl>

          {active.notes ? (
            <p
              style={{
                marginTop: "1.25rem",
                padding: "0.75rem 0.875rem",
                background: "var(--color-accent-soft)",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.875rem",
              }}
            >
              {active.notes}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
