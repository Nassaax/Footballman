"use client";

import { useCallback, useEffect, useState } from "react";
import { PHOTO_LICENSES, type PendingPhoto } from "@/lib/photos-shared";

/** File de modération : rien n'est publié tant qu'une photo n'est pas validée ici. */
export function PhotoModeration({ token }: { token: string }) {
  const [photos, setPhotos] = useState<PendingPhoto[] | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!token) {
      setPhotos(null);
      setStatus("Saisissez le jeton d'administration pour voir les contributions.");
      return;
    }
    setStatus(null);
    try {
      const response = await fetch("/api/admin/photos", {
        headers: { authorization: `Bearer ${token}` },
      });
      const data = (await response.json()) as { photos?: PendingPhoto[]; error?: string };
      if (!response.ok) {
        setPhotos(null);
        setStatus(data.error ?? "Lecture impossible.");
        return;
      }
      setPhotos(data.photos ?? []);
    } catch {
      setStatus("Le serveur n'a pas répondu.");
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

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

      {photos === null ? null : photos.length === 0 ? (
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
