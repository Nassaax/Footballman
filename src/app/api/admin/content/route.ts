import fs from "node:fs/promises";
import { NextResponse } from "next/server";
import { OVERRIDES_PATH, readOverrides, type Overrides } from "@/lib/overrides";

/**
 * API d'administration du contenu.
 *
 * Écriture protégée par un jeton (ADMIN_TOKEN). Sans jeton configuré, l'écriture
 * est refusée — il n'y a donc pas d'endpoint ouvert par défaut. En production
 * sur un hébergement au système de fichiers éphémère, brancher un stockage
 * durable (Supabase, dépôt Git via API) à la place de fs.
 */

function authorized(request: Request): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;
  return request.headers.get("authorization") === `Bearer ${token}`;
}

export async function GET() {
  return NextResponse.json(readOverrides());
}

export async function PUT(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json(
      { error: "Écriture refusée : jeton d'administration absent ou invalide." },
      { status: 401 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide." }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Format attendu : un objet." }, { status: 400 });
  }

  const payload = body as Partial<Overrides>;
  const next: Overrides = { clubs: payload.clubs ?? {}, stadiums: payload.stadiums ?? {} };

  await fs.writeFile(OVERRIDES_PATH, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  return NextResponse.json({ ok: true, savedAt: new Date().toISOString() });
}
