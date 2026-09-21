import type { Access } from "@/data/types";
import { FactList, FactValue } from "./FactValue";

const icons: Record<string, string> = {
  train: "🚆",
  transit: "🚌",
  car: "🚗",
  bike: "🚲",
  foot: "🚶",
};

export function AccessSection({ access }: { access: Access }) {
  return (
    <div style={{ marginTop: "2.5rem", display: "grid", gap: "1rem" }}>
      <article className="card" style={{ padding: "1.5rem" }}>
        <h3 style={{ fontWeight: 600 }}>{icons.train} Train</h3>
        <div style={{ marginTop: "1rem", display: "grid", gap: "0.875rem" }}>
          <FactValue fact={access.train.summary} />
          <div>
            <p className="eyebrow">Gare la plus proche</p>
            <FactValue fact={access.train.nearestStation} />
          </div>
          <div>
            <p className="eyebrow">Temps de marche</p>
            <FactValue fact={access.train.walk} />
          </div>
        </div>
      </article>

      <article className="card" style={{ padding: "1.5rem" }}>
        <h3 style={{ fontWeight: 600 }}>{icons.transit} Transports en commun</h3>
        <div style={{ marginTop: "1rem" }}>
          <FactValue fact={access.publicTransport.summary} />
          <div style={{ marginTop: "0.875rem" }}>
            <FactList fact={access.publicTransport.details} />
          </div>
        </div>
      </article>

      <article className="card" style={{ padding: "1.5rem" }}>
        <h3 style={{ fontWeight: 600 }}>{icons.car} Voiture et stationnement</h3>
        <div style={{ marginTop: "1rem", display: "grid", gap: "0.875rem" }}>
          <FactValue fact={access.car.summary} />
          <div>
            <p className="eyebrow">Où se garer</p>
            <FactList fact={access.car.parking} />
          </div>
          <div>
            <p className="eyebrow">Restrictions les jours de match</p>
            <FactValue fact={access.car.restrictions} />
          </div>
        </div>
      </article>

      <div className="grid-two" style={{ gap: "1rem" }}>
        <article className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontWeight: 600 }}>{icons.bike} Vélo</h3>
          <div style={{ marginTop: "1rem" }}>
            <FactValue fact={access.bike.summary} />
          </div>
        </article>
        <article className="card" style={{ padding: "1.5rem" }}>
          <h3 style={{ fontWeight: 600 }}>{icons.foot} À pied</h3>
          <div style={{ marginTop: "1rem" }}>
            <FactValue fact={access.foot.summary} />
          </div>
        </article>
      </div>

      {access.matchdayOnly.length > 0 ? (
        <aside
          style={{
            padding: "1.25rem 1.5rem",
            borderRadius: "var(--radius-md)",
            background: "var(--color-accent-soft)",
            border: "1px solid var(--color-line)",
          }}
        >
          <p className="eyebrow">Valable uniquement les jours de match</p>
          <ul style={{ marginTop: "0.75rem", display: "grid", gap: "0.375rem", paddingLeft: "1.1rem", listStyle: "disc" }}>
            {access.matchdayOnly.map((line) => (
              <li key={line} style={{ fontSize: "0.9375rem" }}>{line}</li>
            ))}
          </ul>
        </aside>
      ) : null}
    </div>
  );
}
