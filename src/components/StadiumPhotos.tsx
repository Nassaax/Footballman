"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { PHOTO_LICENSES, type Photo, type PhotoLicense } from "@/lib/photos-shared";
import { formatBytes, prepareImage } from "@/lib/image-client";
import { track } from "@/lib/analytics";

type Status = "idle" | "preparing" | "sending" | "sent" | "error";

/**
 * Galerie communautaire d'un stade.
 *
 * Les photos sont chargées côté client : la page reste entièrement statique
 * (donc rapide et indexable) tout en affichant un contenu qui évolue sans
 * redéploiement.
 */
export function StadiumPhotos({
  stadiumId,
  stadiumName,
}: {
  stadiumId: string;
  stadiumName: string;
}) {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [storageReady, setStorageReady] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  const load = useCallback(async () => {
    try {
      const response = await fetch(`/api/photos?stadium=${encodeURIComponent(stadiumId)}`);
      const data = (await response.json()) as { photos?: Photo[]; storageReady?: boolean };
      setPhotos(data.photos ?? []);
      setStorageReady(data.storageReady !== false);
    } catch {
      setPhotos([]);
    }
  }, [stadiumId]);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div style={{ marginTop: "2.5rem" }}>
      {photos === null ? (
        <p style={{ color: "var(--color-muted)", fontSize: "0.9375rem" }}>Chargement des photos…</p>
      ) : photos.length === 0 ? (
        <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
          <p style={{ fontWeight: 600 }}>Aucune photo du {stadiumName} pour l'instant.</p>
          <p style={{ color: "var(--color-muted)", fontSize: "0.9375rem", marginTop: "0.5rem", maxWidth: "52ch", marginInline: "auto" }}>
            Nous ne republions pas de photos dont nous n'avons pas les droits. Celles que vous voyez
            ici viennent des supporters eux-mêmes. Si vous êtes déjà allé au stade, la vôtre sera
            peut-être la première.
          </p>
        </div>
      ) : (
        <ul className="photo-grid">
          {photos.map((photo) => (
            <li key={photo.id} className="card" style={{ overflow: "hidden", padding: 0 }}>
              <img
                src={photo.url}
                alt={photo.caption || `${stadiumName} — photo de supporter`}
                loading="lazy"
                decoding="async"
                className="photo-grid-image"
              />
              <div style={{ padding: "0.875rem 1rem" }}>
                {photo.caption ? (
                  <p style={{ fontSize: "0.875rem" }}>{photo.caption}</p>
                ) : null}
                <p style={{ fontSize: "0.6875rem", color: "var(--color-muted)", marginTop: photo.caption ? 6 : 0 }}>
                  © {photo.author} · {PHOTO_LICENSES[photo.license]}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {storageReady ? (
        <div style={{ marginTop: "1.5rem" }}>
          {formOpen ? (
            <ContributionForm
              stadiumId={stadiumId}
              stadiumName={stadiumName}
              onClose={() => setFormOpen(false)}
            />
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setFormOpen(true);
                track("photo_form_open", { stadiumId });
              }}
            >
              Ajouter votre photo
            </button>
          )}
        </div>
      ) : (
        <p style={{ marginTop: "1.5rem", fontSize: "0.875rem", color: "var(--color-muted)" }}>
          L'envoi de photos n'est pas actif sur cet environnement.
        </p>
      )}
    </div>
  );
}

function ContributionForm({
  stadiumId,
  stadiumName,
  onClose,
}: {
  stadiumId: string;
  stadiumName: string;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ url: string; label: string } | null>(null);
  const preparedRef = useRef<File | null>(null);

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview.url);
  }, [preview]);

  const onPick = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setStatus("preparing");
    setMessage(null);
    try {
      const prepared = await prepareImage(file);
      preparedRef.current = prepared.file;
      setPreview({
        url: URL.createObjectURL(prepared.file),
        label: `${formatBytes(prepared.originalBytes)} → ${formatBytes(prepared.file.size)}`,
      });
      setStatus("idle");
    } catch {
      setStatus("error");
      setMessage("Cette image n'a pas pu être lue. Essayez-en une autre.");
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const file = preparedRef.current;
    if (!file) {
      setStatus("error");
      setMessage("Choisissez d'abord une photo.");
      return;
    }

    const form = new FormData(event.currentTarget);
    form.set("file", file);
    form.set("stadiumId", stadiumId);
    form.set("consent", form.get("consent") ? "true" : "false");

    setStatus("sending");
    setMessage(null);

    try {
      const response = await fetch("/api/photos", { method: "POST", body: form });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "L'envoi a échoué.");
        return;
      }
      setStatus("sent");
      track("photo_submitted", { stadiumId });
    } catch {
      setStatus("error");
      setMessage("Le serveur n'a pas répondu. Réessayez.");
    }
  };

  if (status === "sent") {
    return (
      <div className="card" style={{ padding: "1.75rem" }}>
        <p style={{ fontWeight: 600 }}>Merci — votre photo est bien arrivée.</p>
        <p style={{ color: "var(--color-muted)", fontSize: "0.9375rem", marginTop: "0.5rem", maxWidth: "56ch" }}>
          Elle est relue avant publication : nous vérifions qu'elle montre bien le {stadiumName} et
          qu'elle ne pose pas de problème de droits. Si elle est retenue, elle apparaîtra sur cette
          page avec votre crédit.
        </p>
        <button type="button" className="btn btn-ghost" style={{ marginTop: "1.25rem" }} onClick={onClose}>
          Fermer
        </button>
      </div>
    );
  }

  return (
    <form className="card" style={{ padding: "1.75rem", display: "grid", gap: "1.25rem" }} onSubmit={onSubmit}>
      <div>
        <h3 className="display" style={{ fontSize: "1.25rem" }}>Votre photo du {stadiumName}</h3>
        <p style={{ color: "var(--color-muted)", fontSize: "0.9375rem", marginTop: "0.5rem", maxWidth: "58ch" }}>
          Une vue des tribunes, de l'avant-match, du quartier, d'un tifo. Elle est redimensionnée sur
          votre appareil avant l'envoi, puis relue avant d'être publiée.
        </p>
      </div>

      <label style={{ display: "grid", gap: "0.5rem" }}>
        <span className="eyebrow">Photo *</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/avif"
          required
          onChange={onPick}
          className="file-field"
        />
        {status === "preparing" ? (
          <span style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>Préparation de l'image…</span>
        ) : null}
        {preview ? (
          <span style={{ display: "grid", gap: "0.5rem", marginTop: "0.25rem" }}>
            <img
              src={preview.url}
              alt="Aperçu de la photo sélectionnée"
              style={{ maxHeight: 200, width: "auto", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-line)" }}
            />
            <span style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>
              Compressée pour l'envoi : {preview.label}
            </span>
          </span>
        ) : null}
      </label>

      <div className="grid-two" style={{ gap: "1rem" }}>
        <label style={{ display: "grid", gap: "0.375rem" }}>
          <span className="eyebrow">Votre nom ou pseudo *</span>
          <input name="author" required minLength={2} maxLength={60} style={fieldStyle} placeholder="Affiché comme crédit" />
        </label>
        <label style={{ display: "grid", gap: "0.375rem" }}>
          <span className="eyebrow">Date de la photo</span>
          <input name="takenAt" type="date" style={fieldStyle} />
        </label>
      </div>

      <label style={{ display: "grid", gap: "0.375rem" }}>
        <span className="eyebrow">Légende</span>
        <input name="caption" maxLength={160} style={fieldStyle} placeholder="Ex. : le virage avant le coup d'envoi" />
      </label>

      <label style={{ display: "grid", gap: "0.375rem" }}>
        <span className="eyebrow">Licence *</span>
        <select name="license" required defaultValue="site-only" style={fieldStyle}>
          {(Object.keys(PHOTO_LICENSES) as PhotoLicense[]).map((key) => (
            <option key={key} value={key}>{PHOTO_LICENSES[key]}</option>
          ))}
        </select>
      </label>

      <label style={{ display: "grid", gap: "0.375rem" }}>
        <span className="eyebrow">E-mail (facultatif)</span>
        <input name="contactEmail" type="email" style={fieldStyle} placeholder="Pour vous recontacter si besoin" />
        <span style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>
          Jamais affiché, jamais transmis à un tiers.
        </span>
      </label>

      <label style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", fontSize: "0.875rem" }}>
        <input type="checkbox" name="consent" required style={{ marginTop: 3, width: 18, height: 18 }} />
        <span>
          Je confirme avoir pris cette photo moi-même et autoriser sa publication sur Stadia Belgica
          selon la licence choisie. Je peux demander son retrait à tout moment. *
        </span>
      </label>

      {message ? (
        <p style={{ fontSize: "0.875rem", color: "var(--color-accent)" }}>{message}</p>
      ) : null}

      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <button type="submit" className="btn btn-primary" disabled={status === "sending" || status === "preparing"}>
          {status === "sending" ? "Envoi…" : "Envoyer la photo"}
        </button>
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Annuler
        </button>
      </div>
    </form>
  );
}

const fieldStyle: React.CSSProperties = {
  minHeight: 44,
  padding: "0 0.75rem",
  borderRadius: "var(--radius-sm)",
  border: "1px solid var(--color-line)",
  background: "var(--color-bg)",
  color: "var(--color-text)",
  fontSize: "0.9375rem",
  width: "100%",
};
