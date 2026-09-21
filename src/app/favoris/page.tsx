import type { Metadata } from "next";
import { getClubCards } from "@/lib/content";
import { FavoritesList } from "@/components/FavoritesList";
import { SectionHeading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Mes stades favoris",
  description: "Vos stades sauvegardés, sans inscription.",
  alternates: { canonical: "/favoris" },
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return (
    <section className="shell" style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
      <SectionHeading
        eyebrow="Favoris"
        title="Vos stades."
        lede="Sauvegardés sur votre appareil, sans compte et sans inscription."
      />
      <div style={{ marginTop: "2.5rem" }}>
        <FavoritesList cards={getClubCards()} />
      </div>
    </section>
  );
}
