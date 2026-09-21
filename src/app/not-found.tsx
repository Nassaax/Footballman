import Link from "next/link";

export default function NotFound() {
  return (
    <section className="shell" style={{ paddingTop: "6rem", paddingBottom: "6rem", textAlign: "center" }}>
      <p className="eyebrow">Erreur 404</p>
      <h1 className="display" style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)", marginTop: "1rem" }}>
        Cette tribune n'existe pas.
      </h1>
      <p className="lede" style={{ marginInline: "auto", marginTop: "1rem" }}>
        La page que vous cherchez n'est pas (ou plus) à cette adresse.
      </p>
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", marginTop: "2rem", flexWrap: "wrap" }}>
        <Link href="/stades" className="btn btn-primary">Voir les stades</Link>
        <Link href="/" className="btn btn-ghost">Retour à l'accueil</Link>
      </div>
    </section>
  );
}
