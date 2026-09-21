import type { Metadata } from "next";
import { SectionHeading } from "@/components/Section";
import { stadiumPass } from "@/lib/monetization";

export const metadata: Metadata = {
  title: "Partenaires et transparence commerciale",
  description:
    "Comment la publicité, le sponsoring et l'affiliation fonctionnent sur Stadia Belgica, et ce que nous refusons.",
  alternates: { canonical: "/partenaires" },
};

export default function PartnersPage() {
  return (
    <section className="shell" style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
      <SectionHeading
        eyebrow="Modèle économique"
        title="Premium, discret, et déclaré."
        lede="Nous voulons un média qui vive de son audience sans devenir un panneau publicitaire. Voici exactement comment."
      />

      <div style={{ marginTop: "3rem", display: "grid", gap: "1rem" }}>
        {[
          {
            title: "Emplacements partenaires",
            body: "Un nombre limité d'emplacements, intégrés sous la mention « Partenaire de l'expérience ». Un emplacement sans partenaire n'affiche rien : pas de cadre vide, pas de remplissage.",
          },
          {
            title: "Sponsoring de sections",
            body: "Certaines expériences peuvent être présentées par une marque (« Expérience présentée par… »). Le contenu éditorial n'est jamais écrit par le sponsor.",
          },
          {
            title: "Liens affiliés",
            body: "Billets, hébergement, transport, expériences : quand un lien nous rémunère, il porte la mention « lien affilié ». Un lien affilié ne remplace jamais un lien officiel.",
          },
          {
            title: stadiumPass.name,
            body: `Une offre d'abonnement est à l'étude (${stadiumPass.monthly} par mois ou ${stadiumPass.yearly} par an) pour des guides approfondis, des itinéraires personnalisés et des archives. Elle n'est pas commercialisée aujourd'hui.`,
          },
          {
            title: "Ce que nous ne ferons pas",
            body: "Pas de paris sportifs, pas de revente de billets, pas d'interstitiels, pas de contenu commercial déguisé en information pratique.",
          },
        ].map((block) => (
          <article key={block.title} className="card" style={{ padding: "1.5rem", maxWidth: "70ch" }}>
            <h2 className="display" style={{ fontSize: "1.1875rem" }}>{block.title}</h2>
            <p style={{ color: "var(--color-muted)", fontSize: "0.9375rem", marginTop: "0.5rem" }}>{block.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
