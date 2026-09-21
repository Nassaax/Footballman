import Link from "next/link";
import { Wordmark } from "./Logo";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="hairline" style={{ marginTop: "1rem" }}>
      <div className="shell" style={{ paddingBlock: "3rem" }}>
        <div className="grid-two" style={{ alignItems: "start" }}>
          <div>
            <Wordmark size={26} />
            <p className="lede" style={{ marginTop: "1rem", fontSize: "0.95rem" }}>
              {site.principle}
            </p>
            <p style={{ marginTop: "1rem", fontSize: "0.8125rem", color: "var(--color-muted)" }}>
              {site.seasonNote}
            </p>
          </div>

          <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
            <nav aria-label="Explorer" style={{ display: "grid", gap: "0.5rem" }}>
              <span className="eyebrow">Explorer</span>
              <Link href="/stades" style={{ fontSize: "0.9rem" }}>Tous les stades</Link>
              <Link href="/carte" style={{ fontSize: "0.9rem" }}>Carte de Belgique</Link>
              <Link href="/recherche" style={{ fontSize: "0.9rem" }}>Recherche</Link>
              <Link href="/favoris" style={{ fontSize: "0.9rem" }}>Mes favoris</Link>
            </nav>
            <nav aria-label="Le projet" style={{ display: "grid", gap: "0.5rem" }}>
              <span className="eyebrow">Le projet</span>
              <Link href="/a-propos" style={{ fontSize: "0.9rem" }}>Méthode et sources</Link>
              <Link href="/clubs" style={{ fontSize: "0.9rem" }}>Espace clubs</Link>
              <Link href="/partenaires" style={{ fontSize: "0.9rem" }}>Partenaires</Link>
              <Link href="/admin" style={{ fontSize: "0.9rem" }}>Administration</Link>
            </nav>
          </div>
        </div>

        <p
          className="hairline"
          style={{ marginTop: "2.5rem", paddingTop: "1.25rem", fontSize: "0.75rem", color: "var(--color-muted)" }}
        >
          Site indépendant, sans affiliation officielle avec la Pro League ni avec les clubs cités.
          Les noms et marques appartiennent à leurs détenteurs respectifs. Les informations pratiques
          sont datées et sourcées : vérifiez toujours auprès du club avant de vous déplacer.
        </p>
      </div>
    </footer>
  );
}
