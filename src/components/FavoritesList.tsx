"use client";

import Link from "next/link";
import type { Club, Stadium } from "@/data/types";
import { useFavorites } from "@/lib/favorites";
import { StadiumCard } from "./StadiumCard";

export function FavoritesList({ cards }: { cards: { club: Club; stadium: Stadium }[] }) {
  const { ids, ready } = useFavorites();

  if (!ready) {
    return <p style={{ color: "var(--color-muted)" }}>Chargement…</p>;
  }

  const favorites = cards.filter((c) => ids.includes(c.club.id));

  if (favorites.length === 0) {
    return (
      <div className="card" style={{ padding: "2.5rem", textAlign: "center" }}>
        <p style={{ fontWeight: 600 }}>Aucun favori pour l'instant.</p>
        <p style={{ color: "var(--color-muted)", fontSize: "0.9375rem", marginTop: "0.5rem" }}>
          Touchez le cœur sur une fiche stade pour l'ajouter ici.
        </p>
        <Link href="/stades" className="btn btn-primary" style={{ marginTop: "1.5rem" }}>
          Parcourir les stades
        </Link>
      </div>
    );
  }

  return (
    <div className="grid-stadiums">
      {favorites.map((c) => (
        <StadiumCard key={c.club.id} club={c.club} stadium={c.stadium} />
      ))}
    </div>
  );
}
