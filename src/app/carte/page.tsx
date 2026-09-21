import type { Metadata } from "next";
import { getAllStadiumsWithClubs } from "@/lib/content";
import { BelgiumMap } from "@/components/BelgiumMap";
import { SectionHeading } from "@/components/Section";
import { PartnerSlot } from "@/components/PartnerSlot";

export const metadata: Metadata = {
  title: "Carte des stades de football belges",
  description:
    "Tous les stades de Jupiler Pro League sur une carte interactive : Bruges, Gand, Genk, Anvers, Bruxelles, Liège, Charleroi et les autres.",
  alternates: { canonical: "/carte" },
};

export default function MapPage() {
  const markers = getAllStadiumsWithClubs().map(({ stadium, club, coTenants }) => ({
    stadium,
    club,
    coTenants,
  }));

  return (
    <section className="shell" style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
      <SectionHeading
        eyebrow="Géographie"
        title="Explorez la Belgique du football."
        lede="Dix-sept enceintes sur 30 000 km². Zoomez, déplacez-vous, ouvrez une fiche."
      />
      <div style={{ marginTop: "2.5rem" }}>
        <BelgiumMap markers={markers} />
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <PartnerSlot slot="map-sidebar" />
      </div>
    </section>
  );
}
