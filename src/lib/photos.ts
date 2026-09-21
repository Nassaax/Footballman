import { del, list, put } from "@vercel/blob";
import type { PendingPhoto, Photo, PhotoLicense } from "./photos-shared";

export * from "./photos-shared";

/**
 * Photos contribuées par les visiteurs.
 *
 * Stockage : Vercel Blob (le jeton BLOB_READ_WRITE_TOKEN est injecté par la
 * plateforme). Aucune base de données n'est nécessaire :
 *
 *   photos/<stadiumId>/<photoId>.<ext>   l'image elle-même
 *   meta/pending/<stadiumId>/<id>.json   une contribution en attente
 *   index/<stadiumId>.json               la liste publiée, lue par la galerie
 *
 * L'index par stade permet à la page publique de ne faire qu'une seule lecture
 * réseau au lieu d'une par photo.
 *
 * Rien n'est publié sans validation humaine : une photo envoyée existe à une
 * URL non devinable mais n'apparaît sur le site qu'une fois entrée dans l'index.
 */

/**
 * Un stockage injoignable ne doit pas laisser la requête pendre : sans borne,
 * la fonction serverless tourne jusqu'à son timeout et le contributeur reste
 * sans réponse.
 */
const UPLOAD_TIMEOUT_MS = 20_000;

function metaPath(stadiumId: string, id: string) {
  return `meta/pending/${stadiumId}/${id}.json`;
}

function indexPath(stadiumId: string) {
  return `index/${stadiumId}.json`;
}

async function putJson(pathname: string, value: unknown) {
  await put(pathname, new Blob([JSON.stringify(value)], { type: "application/json" }), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
    abortSignal: AbortSignal.timeout(UPLOAD_TIMEOUT_MS),
  });
}

async function readJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(UPLOAD_TIMEOUT_MS),
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ public */

/** Photos publiées d'un stade, les plus récentes d'abord. */
export async function approvedPhotos(stadiumId: string): Promise<Photo[]> {
  const { blobs } = await list({ prefix: indexPath(stadiumId), limit: 1 });
  if (blobs.length === 0) return [];
  const photos = await readJson<Photo[]>(blobs[0].url);
  return photos ?? [];
}

/* --------------------------------------------------------- contributions */

export async function submitPhoto(input: {
  stadiumId: string;
  file: File;
  caption: string;
  author: string;
  license: PhotoLicense;
  takenAt?: string;
  contactEmail?: string;
}): Promise<{ id: string }> {
  const id = crypto.randomUUID();
  const extension = input.file.type.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";

  const blob = await put(
    `photos/${input.stadiumId}/${id}.${extension}`,
    input.file,
    {
      access: "public",
      contentType: input.file.type,
      addRandomSuffix: true,
      cacheControlMaxAge: 31536000,
      abortSignal: AbortSignal.timeout(UPLOAD_TIMEOUT_MS),
    },
  );

  const pending: PendingPhoto = {
    id,
    stadiumId: input.stadiumId,
    url: blob.url,
    pathname: blob.pathname,
    caption: input.caption,
    author: input.author,
    license: input.license,
    takenAt: input.takenAt,
    submittedAt: new Date().toISOString(),
    bytes: input.file.size,
    contactEmail: input.contactEmail,
  };

  await putJson(metaPath(input.stadiumId, id), pending);
  return { id };
}

/* ------------------------------------------------------------ modération */

export async function pendingPhotos(): Promise<PendingPhoto[]> {
  const { blobs } = await list({ prefix: "meta/pending/", limit: 200 });
  const entries = await Promise.all(blobs.map((b) => readJson<PendingPhoto>(b.url)));
  return entries
    .filter((entry): entry is PendingPhoto => entry !== null)
    .sort((a, b) => a.submittedAt.localeCompare(b.submittedAt));
}

async function findPending(stadiumId: string, id: string): Promise<PendingPhoto | null> {
  const { blobs } = await list({ prefix: metaPath(stadiumId, id), limit: 1 });
  if (blobs.length === 0) return null;
  return readJson<PendingPhoto>(blobs[0].url);
}

/** Publie une photo : elle entre dans l'index public du stade. */
export async function approvePhoto(stadiumId: string, id: string): Promise<Photo | null> {
  const pending = await findPending(stadiumId, id);
  if (!pending) return null;

  const { contactEmail: _contactEmail, ...photo } = pending;
  const published: Photo = { ...photo, approvedAt: new Date().toISOString() };

  const current = await approvedPhotos(stadiumId);
  const next = [published, ...current.filter((p) => p.id !== id)];

  await putJson(indexPath(stadiumId), next);
  await deletePending(stadiumId, id);
  return published;
}

/** Refuse une photo : l'image et ses métadonnées sont supprimées. */
export async function rejectPhoto(stadiumId: string, id: string): Promise<boolean> {
  const pending = await findPending(stadiumId, id);
  if (!pending) return false;
  await del(pending.url);
  await deletePending(stadiumId, id);
  return true;
}

/** Retire une photo déjà publiée (droit de retrait du contributeur). */
export async function unpublishPhoto(stadiumId: string, id: string): Promise<boolean> {
  const current = await approvedPhotos(stadiumId);
  const photo = current.find((p) => p.id === id);
  if (!photo) return false;
  await putJson(indexPath(stadiumId), current.filter((p) => p.id !== id));
  await del(photo.url);
  return true;
}

async function deletePending(stadiumId: string, id: string) {
  const { blobs } = await list({ prefix: metaPath(stadiumId, id), limit: 1 });
  if (blobs.length > 0) await del(blobs[0].url);
}

export function isBlobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}
