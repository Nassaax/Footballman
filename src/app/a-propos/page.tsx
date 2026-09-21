import type { Metadata } from "next";
import { SectionHeading } from "@/components/Section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Méthode, sources et fiabilité",
  description:
    "Comment nous vérifions les informations sur les stades belges : hiérarchie des sources, dates de vérification, droits des images.",
  alternates: { canonical: "/a-propos" },
};

const tiers = [
  { n: 1, label: "Site officiel du club", detail: "Billetterie, règlement d'ordre intérieur, plan du stade, informations jour de match." },
  { n: 2, label: "Pro League", detail: "Composition du championnat, calendrier, affluences officielles." },
  { n: 3, label: "Autorités locales", detail: "Circulation, stationnement, périmètres de sécurité, travaux." },
  { n: 4, label: "Opérateurs de transport et bases documentaires", detail: "SNCB, De Lijn, TEC, STIB-MIVB ; bases de données de stades pour l'historique et les capacités." },
];

export default function AboutPage() {
  return (
    <section className="shell" style={{ paddingTop: "4rem", paddingBottom: "5rem" }}>
      <SectionHeading
        eyebrow="Méthode"
        title="Rien d'inventé. Jamais."
        lede="Ce site prépare des déplacements réels. Une information fausse sur un parking ou une règle d'accès a un coût concret pour le lecteur. Notre méthode est donc explicite."
      />

      <div style={{ marginTop: "3rem", display: "grid", gap: "2.5rem", maxWidth: "70ch" }}>
        <div>
          <h2 className="display" style={{ fontSize: "1.5rem" }}>Hiérarchie des sources</h2>
          <ol style={{ marginTop: "1.25rem", display: "grid", gap: "0.875rem" }}>
            {tiers.map((t) => (
              <li key={t.n} className="card" style={{ padding: "1.125rem", display: "grid", gridTemplateColumns: "2rem 1fr", gap: "0.875rem" }}>
                <span className="display" style={{ color: "var(--color-accent)" }}>{t.n}</span>
                <div>
                  <p style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{t.label}</p>
                  <p style={{ color: "var(--color-muted)", fontSize: "0.9375rem", marginTop: 2 }}>{t.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="display" style={{ fontSize: "1.5rem" }}>« Information à confirmer »</h2>
          <p style={{ color: "var(--color-muted)", marginTop: "0.875rem" }}>
            Quand une donnée n'a pas été vérifiée auprès d'une source fiable, nous l'écrivons. Nous ne
            comblons pas les trous d'une fiche avec des estimations plausibles : une fiche incomplète
            est honnête, une fiche inventée est dangereuse. Chaque donnée vérifiée affiche sa source et
            sa date de contrôle.
          </p>
        </div>

        <div>
          <h2 className="display" style={{ fontSize: "1.5rem" }}>Tarifs et billetterie</h2>
          <p style={{ color: "var(--color-muted)", marginTop: "0.875rem" }}>
            Nous ne publions jamais un prix que nous n'avons pas vérifié, et la plupart des tarifs
            varient selon la rencontre. Nous renvoyons systématiquement vers la billetterie officielle
            du club. Nous ne revendons pas de billets.
          </p>
        </div>

        <div>
          <h2 className="display" style={{ fontSize: "1.5rem" }}>Images et vidéos</h2>
          <p style={{ color: "var(--color-muted)", marginTop: "0.875rem" }}>
            Aucun logo, photo ou vidéo protégé n'est publié sans vérification de licence. Tant qu'un
            visuel dont les droits sont validés n'est pas disponible, chaque stade est représenté par
            une composition graphique originale générée à partir des couleurs du club. Notre base de
            données stocke pour chaque média sa source, sa licence, son copyright et son crédit.
          </p>
        </div>

        <div>
          <h2 className="display" style={{ fontSize: "1.5rem" }}>Indépendance</h2>
          <p style={{ color: "var(--color-muted)", marginTop: "0.875rem" }}>
            {site.name} est un projet indépendant, sans affiliation officielle avec la Pro League ni
            avec les clubs. Les contenus commerciaux — emplacements partenaires, liens affiliés — sont
            identifiés comme tels et ne modifient jamais une information pratique.
          </p>
        </div>

        <div>
          <h2 className="display" style={{ fontSize: "1.5rem" }}>Une erreur ? Une précision ?</h2>
          <p style={{ color: "var(--color-muted)", marginTop: "0.875rem" }}>
            Les clubs et les supporters connaissent leur stade mieux que nous. Les corrections
            documentées sont intégrées et datées.
          </p>
        </div>
      </div>
    </section>
  );
}
