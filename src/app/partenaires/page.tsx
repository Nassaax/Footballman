import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/Section";
import { SupportBlock } from "@/components/SupportBlock";
import { stadiumPass } from "@/lib/monetization";
import { getClubs, getStadiums } from "@/lib/content";
import { formatNumber, isVerified } from "@/lib/format";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Partenaires — devenir sponsor de l'expérience",
  description:
    "Formats publicitaires, audience visée et règles de transparence commerciale sur Stadia Belgica.",
  alternates: { canonical: "/partenaires" },
};

const formats = [
  {
    name: "Partenaire de l'expérience",
    where: "Une fiche stade, sous la section « Comment venir » ou « Avant le match »",
    what: "Un bloc éditorial sobre : nom de la marque, une ligne, un lien. Pas de bannière, pas d'animation, pas d'interstitiel.",
    fit: "Mobilité, banque, assurance, télécom, tourisme",
  },
  {
    name: "Expérience présentée par…",
    where: "En tête d'une section entière (ferveur, jour de match, tribunes)",
    what: "Association de marque sur un contenu éditorial. Le contenu reste écrit par nous, jamais par l'annonceur.",
    fit: "Marques nationales avec un discours football crédible",
  },
  {
    name: "Stade partenaire",
    where: "Une fiche stade en particulier, sur la durée",
    what: "Présence discrète sur une fiche à fort trafic local, avec les statistiques de la page.",
    fit: "Commerces, hôtels, restaurants et événements à proximité du stade",
  },
];

export default function PartnersPage() {
  const stadiums = getStadiums();
  const clubs = getClubs();
  const totalCapacity = stadiums.reduce(
    (sum, s) => sum + (isVerified(s.capacity) ? (s.capacity.value as number) : 0),
    0,
  );

  return (
    <section className="shell" style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
      <SectionHeading
        eyebrow="Média-kit"
        title="Premium, discret, et déclaré."
        lede="Nous voulons un média qui vive de son audience sans devenir un panneau publicitaire. Un seul emplacement par page, toujours au format éditorial, toujours identifié."
      />

      {/* ----------------------------------------------------- LE CONTEXTE */}
      <dl style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", marginTop: "3rem" }}>
        {[
          { k: `${clubs.length} clubs`, v: `couverts en Jupiler Pro League ${site.season}` },
          { k: `${stadiums.length} fiches`, v: "stades, chacune indexable et autonome" },
          { k: `${formatNumber(totalCapacity)}`, v: "places cumulées dans les enceintes couvertes" },
          { k: "34 journées", v: "de saison, soit un pic d'audience par week-end" },
        ].map((item) => (
          <div key={item.k}>
            <dt className="display" style={{ fontSize: "1.5rem" }}>{item.k}</dt>
            <dd style={{ fontSize: "0.8125rem", color: "var(--color-muted)", marginTop: 2 }}>{item.v}</dd>
          </div>
        ))}
      </dl>

      <p style={{ marginTop: "1.5rem", fontSize: "0.8125rem", color: "var(--color-muted)", maxWidth: "62ch" }}>
        Le site est jeune : nous ne communiquons pas de chiffres d'audience tant qu'ils ne sont pas
        mesurés sur une période significative. Nous préférons le dire que les gonfler.
      </p>

      {/* ------------------------------------------------------- LES FORMATS */}
      <div style={{ marginTop: "4rem" }}>
        <h2 className="display" style={{ fontSize: "1.75rem" }}>Les formats</h2>
        <div className="grid-three" style={{ marginTop: "1.75rem" }}>
          {formats.map((format) => (
            <article key={format.name} className="card" style={{ padding: "1.5rem" }}>
              <h3 className="display" style={{ fontSize: "1.125rem" }}>{format.name}</h3>
              <dl style={{ marginTop: "1rem", display: "grid", gap: "0.875rem" }}>
                <div>
                  <dt className="eyebrow">Où</dt>
                  <dd style={{ fontSize: "0.875rem", marginTop: 2 }}>{format.where}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Quoi</dt>
                  <dd style={{ fontSize: "0.875rem", marginTop: 2 }}>{format.what}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Pour qui</dt>
                  <dd style={{ fontSize: "0.875rem", marginTop: 2 }}>{format.fit}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>

      {/* --------------------------------------------------------- LES RÈGLES */}
      <div style={{ marginTop: "4rem" }}>
        <h2 className="display" style={{ fontSize: "1.75rem" }}>Nos règles, non négociables</h2>
        <ul style={{ marginTop: "1.5rem", display: "grid", gap: "0.75rem", maxWidth: "70ch" }}>
          {[
            "Un seul emplacement partenaire par page. Un emplacement sans annonceur n'affiche rien : pas de cadre vide.",
            "Le contenu éditorial n'est jamais écrit, relu ni validé par un annonceur.",
            "Un partenariat ne modifie jamais une information pratique : accès, tarifs, règlement restent sourcés et datés.",
            "Tout lien commercial est identifié comme tel.",
            "Pas de paris sportifs, pas de revente de billets, pas d'interstitiel, pas de contenu commercial déguisé.",
          ].map((rule) => (
            <li key={rule} className="card" style={{ padding: "0.875rem 1.125rem", fontSize: "0.9375rem" }}>
              {rule}
            </li>
          ))}
        </ul>
      </div>

      {/* ------------------------------------------------------------ LA SUITE */}
      <div style={{ marginTop: "4rem" }}>
        <h2 className="display" style={{ fontSize: "1.75rem" }}>Ce qui viendra plus tard</h2>
        <div className="grid-two" style={{ marginTop: "1.5rem", alignItems: "start" }}>
          <article className="card" style={{ padding: "1.5rem" }}>
            <h3 className="display" style={{ fontSize: "1.125rem" }}>{stadiumPass.name}</h3>
            <p style={{ color: "var(--color-muted)", fontSize: "0.9375rem", marginTop: "0.5rem" }}>
              Une offre d'abonnement est à l'étude ({stadiumPass.monthly} par mois ou{" "}
              {stadiumPass.yearly} par an) pour des guides approfondis, des itinéraires personnalisés
              et des archives. Elle n'est pas commercialisée aujourd'hui, et le site restera
              consultable sans compte.
            </p>
          </article>
          <article className="card" style={{ padding: "1.5rem" }}>
            <h3 className="display" style={{ fontSize: "1.125rem" }}>Les clubs</h3>
            <p style={{ color: "var(--color-muted)", fontSize: "0.9375rem", marginTop: "0.5rem" }}>
              Les clubs peuvent corriger leur fiche, fournir des visuels sous licence et mettre en
              avant leurs visites de stade.
            </p>
            <Link href="/clubs" className="btn btn-ghost" style={{ marginTop: "1.25rem" }}>
              Espace clubs
            </Link>
          </article>
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <SupportBlock context="partenaires" />
      </div>
    </section>
  );
}
