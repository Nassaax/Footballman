import type { Metadata } from "next";
import { buildSearchIndex } from "@/lib/search-index";
import { SearchClient } from "@/components/SearchClient";
import { SectionHeading } from "@/components/Section";

export const metadata: Metadata = {
  title: "Recherche",
  description: "Cherchez un club, un stade, une ville, un événement ou une anecdote.",
  alternates: { canonical: "/recherche" },
};

export default function SearchPage() {
  return (
    <section className="shell" style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
      <SectionHeading
        eyebrow="Recherche"
        title="Que cherchez-vous ?"
        lede="Un club, un stade, une ville, une tribune, une anecdote. Essayez « Liège », « parking », « derby »."
      />
      <div style={{ marginTop: "2rem" }}>
        <SearchClient index={buildSearchIndex()} />
      </div>
    </section>
  );
}
