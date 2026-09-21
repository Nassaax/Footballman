import { NextResponse } from "next/server";
import {
  ALLOWED_TYPES,
  MAX_UPLOAD_BYTES,
  PHOTO_LICENSES,
  approvedPhotos,
  isBlobConfigured,
  submitPhoto,
  type PhotoLicense,
} from "@/lib/photos";
import { getStadiums } from "@/lib/content";

export const runtime = "nodejs";

function knownStadium(id: string): boolean {
  return getStadiums().some((s) => s.id === id);
}

/** Galerie publique d'un stade. */
export async function GET(request: Request) {
  const stadiumId = new URL(request.url).searchParams.get("stadium");
  if (!stadiumId || !knownStadium(stadiumId)) {
    return NextResponse.json({ error: "Stade inconnu." }, { status: 400 });
  }
  if (!isBlobConfigured()) {
    return NextResponse.json({ photos: [], storageReady: false });
  }

  // Une panne de stockage masque la galerie mais ne casse pas la page.
  try {
    const photos = await approvedPhotos(stadiumId);
    return NextResponse.json(
      { photos, storageReady: true },
      { headers: { "cache-control": "public, s-maxage=60, stale-while-revalidate=600" } },
    );
  } catch {
    return NextResponse.json({ photos: [], storageReady: true }, { status: 200 });
  }
}

/** Envoi d'une photo par un visiteur. Rien n'est publié sans validation. */
export async function POST(request: Request) {
  if (!isBlobConfigured()) {
    return NextResponse.json(
      { error: "L'envoi de photos n'est pas encore actif sur cet environnement." },
      { status: 503 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Requête illisible." }, { status: 400 });
  }

  const file = form.get("file");
  const stadiumId = String(form.get("stadiumId") ?? "");
  const author = String(form.get("author") ?? "").trim();
  const caption = String(form.get("caption") ?? "").trim();
  const license = String(form.get("license") ?? "") as PhotoLicense;
  const takenAt = String(form.get("takenAt") ?? "").trim();
  const contactEmail = String(form.get("contactEmail") ?? "").trim();
  const consent = form.get("consent") === "true";

  if (!knownStadium(stadiumId)) {
    return NextResponse.json({ error: "Stade inconnu." }, { status: 400 });
  }
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Aucune photo reçue." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number])) {
    return NextResponse.json(
      { error: "Format non accepté. Utilisez JPEG, PNG, WebP ou AVIF." },
      { status: 415 },
    );
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: "Photo trop lourde après compression. Réessayez avec une image plus petite." },
      { status: 413 },
    );
  }
  if (author.length < 2 || author.length > 60) {
    return NextResponse.json({ error: "Indiquez un nom ou un pseudo (2 à 60 caractères)." }, { status: 400 });
  }
  if (caption.length > 160) {
    return NextResponse.json({ error: "La légende est limitée à 160 caractères." }, { status: 400 });
  }
  if (!(license in PHOTO_LICENSES)) {
    return NextResponse.json({ error: "Licence invalide." }, { status: 400 });
  }
  if (!consent) {
    return NextResponse.json(
      { error: "Vous devez confirmer être l'auteur de la photo pour l'envoyer." },
      { status: 400 },
    );
  }

  try {
    const { id } = await submitPhoto({
      stadiumId,
      file,
      caption,
      author,
      license,
      takenAt: takenAt || undefined,
      contactEmail: contactEmail || undefined,
    });
    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "L'envoi a échoué. Réessayez dans un instant." }, { status: 500 });
  }
}
