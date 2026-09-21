import type { Metadata } from "next";
import { SectionHeading } from "@/components/Section";
import { clubOffer } from "@/lib/monetization";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Espace clubs",
  description: "Comment les clubs de Jupiler Pro League peuvent enrichir et corriger leur fiche stade.",
  alternates: { canonical: "/clubs" },
};

export default function ClubsPage() {
  return (
    <section className="shell" style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
      <SectionHeading eyebrow="Pour les clubs" title={clubOffer.title} lede={clubOffer.pitch} />

      <div className="grid-two" style={{ marginTop: "3rem", alignItems: "start" }}>
        <ul style={{ display: "grid", gap: "0.875rem" }}>
          {[
            "Corriger et compléter les informations pratiques de votre fiche.",
            "Fournir des visuels officiels avec leur licence d'utilisation.",
            "Mettre en avant vos visites de stade et vos offres d'expérience.",
            "Relayer vos informations officielles jour de match.",
            "Ajouter vos contenus vidéo dans la section « Vivez le stade ».",
          ].map((line) => (
            <li key={line} className="card" style={{ padding: "1rem 1.25rem", fontSize: "0.9375rem" }}>
              {line}
            </li>
          ))}
        </ul>

        <div className="card" style={{ padding: "1.75rem" }}>
          <p className="eyebrow">Fonctionnement</p>
          <p style={{ marginTop: "0.75rem", fontSize: "0.9375rem", color: "var(--color-muted)" }}>
            Chaque fiche stade repose sur une structure de données ouverte : chaque champ porte sa
            source et sa date de vérification. Une information fournie par le club est étiquetée comme
            source officielle — le niveau de fiabilité le plus élevé de notre hiérarchie.
          </p>
          <p style={{ marginTop: "1.25rem", fontSize: "0.9375rem" }}>
            Les demandes se font par écrit, depuis une adresse officielle du club. Chaque correction est
            tracée et datée sur la fiche concernée.
          </p>
          <p style={{ marginTop: "1.25rem", fontSize: "0.8125rem", color: "var(--color-muted)" }}>
            {site.name} reste éditorialement indépendant : un partenariat ne modifie ni le ton ni le
            contenu d'une fiche.
          </p>
        </div>
      </div>
    </section>
  );
}
