"use client";

import { useCallback, useEffect, useState } from "react";
import { PHOTO_LICENSES, type PendingPhoto } from "@/lib/photos-shared";

type Auth = "empty" | "checking" | "ok" | "rejected" | "unreachable";

/** File de modération : rien n'est publié tant qu'une photo n'est pas validée ici. */
export function PhotoModeration({ token }: { token: string }) {
  const [photos, setPhotos] = useState<PendingPhoto[] | null>(null);
  const [auth, setAuth] = useState<Auth>("empty");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) {
      setPhotos(null);
      setAuth("empty");
      setStatus(null);
      return;
    }
    setAuth("checking");
    setStatus(null);
    try {
      const response = await fetch("/api/admin/photos", {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = (await response.json()) as { photos?: PendingPhoto[]; error?: string };
      if (!response.ok) {
        setPhotos(null);
        setAuth("rejected");
        return;
      }
      setPhotos(data.photos ?? []);
      setAuth("ok");
    } catch {
      setAuth("unreachable");
    }
  }, [token]);

  // Le jeton est collé d'un coup ou tapé : on attend une pause avant d'interroger
  // le serveur, sinon chaque caractère déclenche une requête et un refus.
  useEffect(() => {
    if (!token) {
      void load();
      return;
    }
    const timer = window.setTimeout(() => void load(), 400);
    return () => window.clearTimeout(timer);
  }, [token, load]);

  const act = async (photo: PendingPhoto, action: "approve" | "reject") => {
    setBusy(photo.id);
    try {
      const response = await fetch("/api/admin/photos", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({ action, stadiumId: photo.stadiumId, id: photo.id }),
      });
      const data = (await response.json()) as { error?: string };
      setStatus(
        response.ok
          ? action === "approve"
            ? "Photo publiée."
            : "Photo refusée et supprimée."
          : (data.error ?? "Action impossible."),
      );
      if (response.ok) setPhotos((prev) => prev?.filter((p) => p.id !== photo.id) ?? null);
    } catch {
      setStatus("Le serveur n'a pas répondu.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="card" style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
        <h2 className="display" style={{ fontSize: "1.25rem" }}>Photos en attente</h2>
        <button type="button" className="btn btn-ghost" style={{ minHeight: 36 }} onClick={() => void load()}>
          Rafraîchir
        </button>
        {status ? <span style={{ fontSize: "0.875rem", color: "var(--color-muted)" }}>{status}</span> : null}
      </div>

      <AuthBadge auth={auth} count={photos?.length ?? 0} />

      {auth !== "ok" ? null : photos === null ? null : photos.length === 0 ? (
        <p style={{ marginTop: "1rem", color: "var(--color-muted)", fontSize: "0.9375rem" }}>
          Aucune contribution en attente.
        </p>
      ) : (
        <ul style={{ marginTop: "1.25rem", display: "grid", gap: "1rem" }}>
          {photos.map((photo) => (
            <li
              key={photo.id}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(140px, 220px) 1fr",
                gap: "1.25rem",
                border: "1px solid var(--color-line)",
                borderRadius: "var(--radius-sm)",
                padding: "1rem",
                alignItems: "start",
              }}
            >
              <a href={photo.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={photo.url}
                  alt={photo.caption || "Contribution en attente"}
                  style={{ width: "100%", borderRadius: "var(--radius-xs)", display: "block" }}
                />
              </a>

              <div>
                <p style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{photo.stadiumId}</p>
                {photo.caption ? (
                  <p style={{ fontSize: "0.875rem", marginTop: 4 }}>{photo.caption}</p>
                ) : null}
                <p style={{ fontSize: "0.75rem", color: "var(--color-muted)", marginTop: 6 }}>
                  {photo.author} · {PHOTO_LICENSES[photo.license]}
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>
                  Envoyée le {new Date(photo.submittedAt).toLocaleString("fr-BE")}
                  {photo.takenAt ? ` · prise le ${photo.takenAt}` : ""}
                </p>
                {photo.contactEmail ? (
                  <p style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>
                    Contact : {photo.contactEmail}
                  </p>
                ) : null}

                <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ minHeight: 38 }}
                    disabled={busy === photo.id}
                    onClick={() => void act(photo, "approve")}
                  >
                    Publier
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    style={{ minHeight: 38 }}
                    disabled={busy === photo.id}
                    onClick={() => void act(photo, "reject")}
                  >
                    Refuser
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p style={{ marginTop: "1.25rem", fontSize: "0.75rem", color: "var(--color-muted)" }}>
        Refuser supprime définitivement l'image du stockage. Publier l'ajoute à la galerie du stade
        avec le crédit de son auteur.
      </p>
    </div>
  );
}

/**
 * Retour de connexion explicite.
 *
 * Sans ce signal, un jeton valide et un jeton refusé produisent le même écran
 * tant qu'aucune photo n'est en attente : impossible de savoir si l'on est
 * connecté.
 */
function AuthBadge({ auth, count }: { auth: Auth; count: number }) {
  const messages: Record<Auth, { text: string; color: string }> = {
    empty: {
      text: "Collez votre jeton dans le champ ci-dessus pour voir les contributions.",
      color: "var(--color-muted)",
    },
    checking: { text: "Vérification du jeton…", color: "var(--color-muted)" },
    ok: {
      text:
        count === 0
          ? "Jeton accepté — aucune photo en attente pour le moment."
          : `Jeton accepté — ${count} photo${count > 1 ? "s" : ""} en attente.`,
      color: "var(--color-ok)",
    },
    rejected: {
      text: "Jeton refusé. Vérifiez qu'il est collé en entier, sans espace avant ou après.",
      color: "var(--color-accent)",
    },
    unreachable: { text: "Le serveur n'a pas répondu. Réessayez.", color: "var(--color-accent)" },
  };

  const { text, color } = messages[auth];

  return (
    <p style={{ marginTop: "0.875rem", fontSize: "0.875rem", color, fontWeight: auth === "ok" ? 600 : 400 }}>
      {text}
    </p>
  );
}
