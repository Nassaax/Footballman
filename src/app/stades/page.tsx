import type { Metadata } from "next";
import { getClubCards } from "@/lib/content";
import { SectionHeading } from "@/components/Section";
import { StadiumsExplorer } from "@/components/StadiumsExplorer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Les 18 stades de la Jupiler Pro League",
  description:
    "Tous les stades du championnat belge : capacité, ville, histoire, accès, tribunes et billetterie. Préparez votre visite.",
  alternates: { canonical: "/stades" },
};

export default function StadiumsPage() {
  return (
    <>
      <section className="shell" style={{ paddingTop: "4rem", paddingBottom: "1.5rem" }}>
        <SectionHeading
          eyebrow={`Saison ${site.season}`}
          title="Les stades du football belge."
          lede="Dix-huit clubs, dix-sept enceintes. Filtrez par région, triez par capacité, ou cherchez directement votre club."
        />
      </section>

      <section className="shell" style={{ paddingBottom: "5rem" }}>
        <StadiumsExplorer cards={getClubCards()} />
      </section>
    </>
  );
}
