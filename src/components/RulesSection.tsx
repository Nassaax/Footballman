import type { Rules } from "@/data/types";
import { FactValue } from "./FactValue";
import { formatDate } from "@/lib/format";

const statusLabel: Record<Rules["items"][number]["status"], { text: string; color: string }> = {
  allowed: { text: "Autorisé", color: "var(--color-ok)" },
  conditional: { text: "Sous conditions", color: "var(--color-warn)" },
  forbidden: { text: "Interdit", color: "var(--color-accent)" },
  unknown: { text: "À confirmer", color: "var(--color-muted)" },
};

export function RulesSection({ rules }: { rules: Rules }) {
  return (
    <div style={{ marginTop: "2.5rem" }}>
      <ul className="grid-three">
        {rules.items.map((item) => {
          const s = statusLabel[item.status];
          return (
            <li key={item.label} className="card" style={{ padding: "1.125rem" }}>
              <span aria-hidden="true" style={{ fontSize: "1.25rem" }}>{item.icon}</span>
              <p style={{ fontWeight: 600, marginTop: "0.5rem", fontSize: "0.9375rem" }}>{item.label}</p>
              <p style={{ color: s.color, fontSize: "0.8125rem", fontWeight: 600, marginTop: 2 }}>{s.text}</p>
              {item.detail ? (
                <p style={{ fontSize: "0.8125rem", color: "var(--color-muted)", marginTop: "0.5rem" }}>{item.detail}</p>
              ) : null}
            </li>
          );
        })}
      </ul>

      <div className="grid-two" style={{ marginTop: "1.5rem", gap: "1rem" }}>
        <div className="card" style={{ padding: "1.25rem" }}>
          <p className="eyebrow">Politique sacs</p>
          <div style={{ marginTop: "0.5rem" }}>
            <FactValue fact={rules.bagPolicy} />
          </div>
        </div>
        <div className="card" style={{ padding: "1.25rem" }}>
          <p className="eyebrow">Paiement dans le stade</p>
          <div style={{ marginTop: "0.5rem" }}>
            <FactValue fact={rules.cashless} render={(v) => (v ? "Sans espèces (cashless)" : "Espèces acceptées")} />
          </div>
        </div>
      </div>

      <p style={{ fontSize: "0.8125rem", color: "var(--color-muted)", marginTop: "1.25rem" }}>
        Dernière vérification de cette grille : {formatDate(rules.lastVerified)}. Le règlement d'ordre
        intérieur du club prévaut toujours ; il peut être renforcé match par match par les autorités.
      </p>
    </div>
  );
}
