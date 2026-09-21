import { ImageResponse } from "next/og";
import { getStadiumBySlug, getStadiums } from "@/lib/content";
import { formatNumber, isVerified } from "@/lib/format";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Fiche stade Stadia Belgica";

export function generateStaticParams() {
  return getStadiums().map((s) => ({ slug: s.slug }));
}

/** Image de partage générée : stade, club, ville, capacité, marque. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getStadiumBySlug(slug);

  if (!data) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0c0e10",
            color: "#f1eee8",
            fontSize: 64,
            fontWeight: 800,
          }}
        >
          {site.name}
        </div>
      ),
      size,
    );
  }

  const { stadium, club } = data;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: club.colors.primary,
          color: "#fff",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10,12,14,0.5)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -120,
            top: 90,
            width: 520,
            height: 450,
            borderRadius: 200,
            border: "3px solid rgba(255,255,255,0.22)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div style={{ fontSize: 24, letterSpacing: 6, textTransform: "uppercase", opacity: 0.8, display: "flex" }}>
            {stadium.city} · {club.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "relative", gap: 20 }}>
          <div style={{ fontSize: 86, fontWeight: 800, lineHeight: 1, letterSpacing: -2, display: "flex" }}>
            {stadium.name}
          </div>
          <div style={{ fontSize: 30, opacity: 0.9, maxWidth: 900, display: "flex" }}>
            {stadium.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", gap: 28, opacity: 0.85 }}>
            {isVerified(stadium.capacity) ? (
              <span>{formatNumber(stadium.capacity.value as number)} places</span>
            ) : (
              <span>Capacité à confirmer</span>
            )}
            <span>·</span>
            <span>Jupiler Pro League {site.season}</span>
          </div>
          <div style={{ display: "flex", fontWeight: 800, letterSpacing: -0.5 }}>{site.name}</div>
        </div>
      </div>
    ),
    size,
  );
}
