import { NextResponse } from "next/server";
import {
  approvePhoto,
  isBlobConfigured,
  pendingPhotos,
  rejectPhoto,
  unpublishPhoto,
} from "@/lib/photos";

export const runtime = "nodejs";

/**
 * Modération des photos. Protégée par ADMIN_TOKEN : sans jeton configuré côté
 * serveur, aucune de ces opérations n'est possible.
 */
function authorized(request: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  return request.headers.get("authorization") === `Bearer ${token}`;
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Jeton d'administration absent ou invalide." }, { status: 401 });
  }
  if (!isBlobConfigured()) {
    return NextResponse.json({ photos: [], storageReady: false });
  }
  return NextResponse.json({ photos: await pendingPhotos(), storageReady: true });
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Jeton d'administration absent ou invalide." }, { status: 401 });
  }

  let body: { action?: string; stadiumId?: string; id?: string };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  const { action, stadiumId, id } = body;
  if (!stadiumId || !id) {
    return NextResponse.json({ error: "stadiumId et id sont requis." }, { status: 400 });
  }

  if (action === "approve") {
    const photo = await approvePhoto(stadiumId, id);
    return photo
      ? NextResponse.json({ ok: true, photo })
      : NextResponse.json({ error: "Contribution introuvable." }, { status: 404 });
  }

  if (action === "reject") {
    const done = await rejectPhoto(stadiumId, id);
    return done
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ error: "Contribution introuvable." }, { status: 404 });
  }

  if (action === "unpublish") {
    const done = await unpublishPhoto(stadiumId, id);
    return done
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ error: "Photo introuvable dans l'index." }, { status: 404 });
  }

  return NextResponse.json({ error: "Action inconnue." }, { status: 400 });
}
