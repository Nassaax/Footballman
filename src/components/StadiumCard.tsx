import Link from "next/link";
import type { Club, Stadium } from "@/data/types";
import { StadiumImage } from "./StadiumVisual";
import { FavoriteButton } from "./FavoriteButton";
import { formatNumber, isVerified } from "@/lib/format";

/** Carte éditoriale d'un club / stade. `size` module la présence dans la grille. */
export function StadiumCard({
  club,
  stadium,
  size = "md",
}: {
  club: Club;
  stadium: Stadium;
  size?: "sm" | "md" | "lg";
}) {
  const height = size === "lg" ? 420 : size === "sm" ? 210 : 300;

  return (
    <article
      style={{
        position: "relative",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        background: "var(--color-surface-2)",
        border: "1px solid var(--color-line)",
      }}
    >
      <Link href={`/stades/${stadium.slug}`} style={{ display: "block", position: "relative" }}>
        <div style={{ height, overflow: "hidden" }}>
          <StadiumImage
            stadium={stadium}
            club={club}
            variant={size === "lg" ? "tile" : "card"}
            className="stadium-visual"
          />
        </div>

        <div
          style={{
            position: "absolute",
            inset: "auto 0 0 0",
            padding: size === "lg" ? "1.5rem" : "1.125rem",
            color: "#fff",
          }}
        >
          <p
            style={{
              fontSize: "0.6875rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.82,
            }}
          >
            {stadium.city}
            {isVerified(stadium.capacity) ? ` · ${formatNumber(stadium.capacity.value as number)} places` : ""}
          </p>
          <h3
            className="display"
            style={{ fontSize: size === "lg" ? "clamp(1.6rem, 4vw, 2.2rem)" : "1.3rem", marginTop: "0.35rem" }}
          >
            {stadium.name}
          </h3>
          <p style={{ fontSize: "0.875rem", opacity: 0.9, marginTop: "0.25rem" }}>{club.name}</p>
        </div>
      </Link>

      <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}>
        <FavoriteButton id={club.id} label={club.name} compact />
      </div>
    </article>
  );
}
