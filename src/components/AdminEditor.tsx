"use client";

import { useState } from "react";
import type { Overrides } from "@/lib/overrides";
import { PhotoModeration } from "./PhotoModeration";

type Ref = { id: string; name: string; slug?: string };

const stadiumFields = [
  { path: "name", label: "Nom du stade", kind: "text" },
  { path: "tagline", label: "Accroche (1 phrase)", kind: "textarea" },
  { path: "description", label: "Description", kind: "textarea" },
  { path: "architecture", label: "Architecture", kind: "textarea" },
  { path: "address.value", label: "Adresse (valeur vérifiée)", kind: "text" },
  { path: "capacity.value", label: "Capacité (nombre)", kind: "number" },
  { path: "openingYear.value", label: "Année d'ouverture (nombre)", kind: "number" },
  { path: "lastVerified", label: "Dernière vérification (AAAA-MM-JJ)", kind: "text" },
] as const;

function setPath(target: Record<string, unknown>, path: string, value: unknown) {
  const keys = path.split(".");
  let node = target;
  for (const key of keys.slice(0, -1)) {
    if (typeof node[key] !== "object" || node[key] === null) node[key] = {};
    node = node[key] as Record<string, unknown>;
  }
  const last = keys[keys.length - 1];
  if (value === "" || value === undefined) delete node[last];
  else node[last] = value;
}

function getPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((node, key) => {
    if (typeof node !== "object" || node === null) return undefined;
    return (node as Record<string, unknown>)[key];
  }, source);
}

/**
 * Éditeur d'administration. Les champs vides ne sont pas écrits : seule une
 * valeur saisie devient une correction. Quand on modifie la valeur d'un fait, on
 * doit aussi renseigner sa source et sa date — sinon la donnée resterait
 * affichée comme non vérifiée.
 */
export function AdminEditor({
  stadiums,
  clubs,
  overrides,
}: {
  stadiums: Ref[];
  clubs: Ref[];
  overrides: Overrides;
}) {
  const [token, setToken] = useState("");
  const [stadiumId, setStadiumId] = useState(stadiums[0]?.id ?? "");
  const [draft, setDraft] = useState<Overrides>(overrides);
  const [status, setStatus] = useState<string | null>(null);
  const [raw, setRaw] = useState(JSON.stringify(overrides, null, 2));
  const [mode, setMode] = useState<"form" | "json">("form");

  const current = (draft.stadiums[stadiumId] ?? {}) as Record<string, unknown>;

  const updateField = (path: string, value: unknown) => {
    setDraft((prev) => {
      const next: Overrides = {
        clubs: { ...prev.clubs },
        stadiums: { ...prev.stadiums },
      };
      const patch = { ...((next.stadiums[stadiumId] ?? {}) as Record<string, unknown>) };
      setPath(patch, path, value);
      next.stadiums[stadiumId] = patch;
      setRaw(JSON.stringify(next, null, 2));
      return next;
    });
  };

  const save = async () => {
    setStatus("Enregistrement…");
    let payload: Overrides = draft;

    if (mode === "json") {
      try {
        payload = JSON.parse(raw) as Overrides;
      } catch {
        setStatus("JSON invalide : rien n'a été enregistré.");
        return;
      }
    }

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string };
      setStatus(
        response.ok
          ? "Enregistré. Relancez le build (ou rechargez en développement) pour voir le résultat."
          : (data.error ?? "Échec de l'enregistrement."),
      );
      if (response.ok) setDraft(payload);
    } catch {
      setStatus("Le serveur n'a pas répondu.");
    }
  };

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <div className="card" style={{ padding: "1.25rem", display: "grid", gap: "0.75rem" }}>
        <label style={{ display: "grid", gap: "0.375rem" }}>
          <span className="eyebrow">Jeton d'administration (ADMIN_TOKEN)</span>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Nécessaire pour enregistrer"
            style={inputStyle}
          />
        </label>
        <p style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>
          Sans jeton configuré côté serveur, l'écriture est refusée : il n'existe aucun point d'entrée
          ouvert. {clubs.length} clubs et {stadiums.length} stades sont éditables.
        </p>
      </div>

      <PhotoModeration token={token} />

      <div style={{ display: "flex", gap: "0.5rem" }}>
        {(["form", "json"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            style={{
              minHeight: 38,
              padding: "0 0.875rem",
              borderRadius: 999,
              cursor: "pointer",
              fontSize: "0.8125rem",
              fontWeight: 600,
              border: "1px solid var(--color-line)",
              background: mode === m ? "var(--color-text)" : "transparent",
              color: mode === m ? "var(--color-bg)" : "var(--color-muted)",
            }}
          >
            {m === "form" ? "Formulaire" : "JSON complet"}
          </button>
        ))}
      </div>

      {mode === "form" ? (
        <div className="card" style={{ padding: "1.5rem", display: "grid", gap: "1.25rem" }}>
          <label style={{ display: "grid", gap: "0.375rem" }}>
            <span className="eyebrow">Stade</span>
            <select value={stadiumId} onChange={(e) => setStadiumId(e.target.value)} style={inputStyle}>
              {stadiums.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </label>

          {stadiumFields.map((field) => {
            const value = getPath(current, field.path);
            return (
              <label key={field.path} style={{ display: "grid", gap: "0.375rem" }}>
                <span className="eyebrow">{field.label}</span>
                {field.kind === "textarea" ? (
                  <textarea
                    rows={4}
                    value={typeof value === "string" ? value : ""}
                    onChange={(e) => updateField(field.path, e.target.value)}
                    placeholder="Laisser vide pour conserver la valeur du dépôt"
                    style={{ ...inputStyle, minHeight: 96, padding: "0.625rem 0.75rem", lineHeight: 1.5 }}
                  />
                ) : (
                  <input
                    type={field.kind === "number" ? "number" : "text"}
                    value={value === undefined || value === null ? "" : String(value)}
                    onChange={(e) =>
                      updateField(
                        field.path,
                        field.kind === "number"
                          ? e.target.value === ""
                            ? ""
                            : Number(e.target.value)
                          : e.target.value,
                      )
                    }
                    placeholder="Laisser vide pour conserver la valeur du dépôt"
                    style={inputStyle}
                  />
                )}
              </label>
            );
          })}

          <p style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>
            Pour qu'une valeur modifiée s'affiche comme vérifiée, renseignez également son statut, sa
            source et sa date via l'onglet JSON (par exemple
            <code> stadiums.lotto-park.capacity = &#123; value, status: &quot;verified&quot;, source, lastVerified &#125;</code>).
          </p>
        </div>
      ) : (
        <div className="card" style={{ padding: "1.5rem" }}>
          <label style={{ display: "grid", gap: "0.375rem" }}>
            <span className="eyebrow">content/overrides.json</span>
            <textarea
              rows={22}
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              spellCheck={false}
              style={{
                ...inputStyle,
                minHeight: 420,
                padding: "0.75rem",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "0.8125rem",
                lineHeight: 1.6,
              }}
            />
          </label>
        </div>
      )}

      <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
        <button type="button" className="btn btn-primary" onClick={save}>
          Enregistrer
        </button>
        {status ? <p style={{ fontSize: "0.875rem", color: "var(--color-muted)" }}>{status}</p> : null}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  minHeight: 44,
  padding: "0 0.75rem",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--color-line)",
  background: "var(--color-bg)",
  color: "var(--color-text)",
  fontSize: "0.9375rem",
};
