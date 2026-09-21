import Link from "next/link";
import { getClubCards, getStadiums } from "@/lib/content";
import { StadiumCard } from "@/components/StadiumCard";
import { StadiumVisual } from "@/components/StadiumVisual";
import { SectionHeading } from "@/components/Section";
import { PartnerSlot } from "@/components/PartnerSlot";
import { site } from "@/lib/site";
import { clubById } from "@/data/clubs";
import { formatNumber, isVerified } from "@/lib/format";

const steps = [
  { n: "01", title: "Préparez votre billet", text: "La billetterie officielle du club est la seule source fiable pour les disponibilités, les conditions et les tarifs." },
  { n: "02", title: "Choisissez votre transport", text: "Train, transports en commun, voiture, vélo : chaque stade a un mode d'accès qui fonctionne mieux que les autres." },
  { n: "03", title: "Arrivez tôt", text: "Une heure trente avant le coup d'envoi : c'est le moment où le quartier devient le stade." },
  { n: "04", title: "Trouvez votre entrée", text: "Votre porte dépend de votre tribune. Repérez-la avant d'arriver, pas devant les tourniquets." },
  { n: "05", title: "Passez les contrôles", text: "Billet, puis palpation de sécurité. Sacs limités, fumigènes interdits partout." },
  { n: "06", title: "Rejoignez votre tribune", text: "Bloc, rang, siège. Repérez aussi les sanitaires et la buvette la plus proche." },
  { n: "07", title: "Vivez l'avant-match", text: "Échauffement, chants, tifos : le spectacle commence bien avant le coup d'envoi." },
  { n: "08", title: "Puis le match", text: "Et la sortie : attendre dix minutes en tribune fait souvent gagner vingt minutes dehors." },
];

export default function HomePage() {
  const cards = getClubCards();
  const stadiums = getStadiums();
  const hero = cards.find((c) => c.stadium.slug === "stade-maurice-dufrasne") ?? cards[0];
  const totalCapacity = stadiums.reduce(
    (sum, s) => sum + (isVerified(s.capacity) ? (s.capacity.value as number) : 0),
    0,
  );

  return (
    <>
      {/* ------------------------------------------------------------- HERO */}
      <section style={{ position: "relative", minHeight: "min(88svh, 780px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <StadiumVisual
            stadium={hero.stadium}
            club={hero.club}
            variant="hero"
            className="stadium-visual"
          />
        </div>

        <div className="shell rise" style={{ position: "relative", paddingBottom: "3.5rem", paddingTop: "6rem" }}>
          <p className="eyebrow" style={{ color: "rgba(255,255,255,.78)" }}>
            Jupiler Pro League · Saison {site.season}
          </p>
          <h1
            className="display"
            style={{ color: "#fff", fontSize: "clamp(2.75rem, 11vw, 6.5rem)", marginTop: "1rem", maxWidth: "16ch" }}
          >
            Entrez dans le stade.
          </h1>
          <p style={{ color: "rgba(255,255,255,.88)", fontSize: "clamp(1rem, 3.2vw, 1.375rem)", marginTop: "1.25rem", maxWidth: "48ch", textWrap: "pretty" }}>
            Découvrez l'histoire, la ferveur et l'expérience des stades du football belge.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2rem" }}>
            <Link href="/stades" className="btn" style={{ background: "#fff", color: "#111" }}>
              Explorer les stades
            </Link>
            <Link
              href="#mon-club"
              className="btn"
              style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,.45)" }}
            >
              Choisir mon club
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- REPÈRES */}
      <section className="shell" style={{ paddingBlock: "2.5rem" }}>
        <dl style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem" }}>
          {[
            { k: "18 clubs", v: "en Jupiler Pro League 2026-2027" },
            { k: "17 enceintes", v: "le Jan Breydel est partagé par deux clubs" },
            { k: `${formatNumber(totalCapacity)} places`, v: "de capacité cumulée vérifiée" },
            { k: "34 journées", v: "sans play-offs cette saison" },
          ].map((item) => (
            <div key={item.k}>
              <dt className="display" style={{ fontSize: "1.5rem" }}>{item.k}</dt>
              <dd style={{ fontSize: "0.8125rem", color: "var(--color-muted)", marginTop: 2 }}>{item.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* -------------------------------------------------------- LES STADES */}
      <section className="section hairline" id="mon-club">
        <div className="shell">
          <SectionHeading
            eyebrow="Les stades"
            title="Dix-sept enceintes, dix-huit histoires."
            lede="Du plus grand stade du pays à une enceinte de village adossée à un parc : le football belge tient dans un rayon de 200 kilomètres, et ne se ressemble jamais d'une ville à l'autre."
          />
        </div>

        {/* Mobile : défilement horizontal. Desktop : mosaïque. */}
        <div className="only-mobile" style={{ marginTop: "2rem" }}>
          <div className="rail">
            {cards.map(({ club, stadium }) => (
              <div key={club.id} style={{ width: "78vw", maxWidth: 320 }}>
                <StadiumCard club={club} stadium={stadium} size="sm" />
              </div>
            ))}
          </div>
        </div>

        <div className="shell only-desktop" style={{ marginTop: "2.5rem" }}>
          <div className="grid-stadiums">
            {cards.map(({ club, stadium }, i) => (
              <div
                key={club.id}
                style={i % 7 === 0 ? { gridColumn: "span 2" } : undefined}
              >
                <StadiumCard club={club} stadium={stadium} size={i % 7 === 0 ? "lg" : "md"} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- LA CARTE */}
      <section className="section hairline">
        <div className="shell">
          <div className="grid-two" style={{ alignItems: "center" }}>
            <div>
              <SectionHeading
                eyebrow="Géographie"
                title="Explorez la Belgique du football."
                lede="Tous les stades sur une carte interactive : zoomez, déplacez-vous, ouvrez une fiche. De Bruges à Liège, de Genk à La Louvière."
              />
              <Link href="/carte" className="btn btn-primary" style={{ marginTop: "1.75rem" }}>
                Ouvrir la carte
              </Link>
            </div>

            <ul style={{ display: "grid", gap: "0.5rem" }}>
              {["Flandre", "Bruxelles", "Wallonie"].map((region) => {
                const list = stadiums.filter((s) => clubById.get(s.clubId)?.region === region);
                return (
                  <li key={region} className="card" style={{ padding: "1rem 1.25rem" }}>
                    <p className="eyebrow">{region}</p>
                    <p style={{ marginTop: "0.5rem", fontSize: "0.9375rem" }}>
                      {list.map((s) => s.city).join(" · ")}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ PREMIÈRE VISITE */}
      <section className="section hairline">
        <div className="shell">
          <SectionHeading
            eyebrow="Votre première visite"
            title="Vous allez au stade pour la première fois ?"
            lede="Huit étapes, dans l'ordre. C'est tout ce qu'il faut savoir pour que la journée se passe bien."
          />

          <ol
            style={{
              marginTop: "2.5rem",
              display: "grid",
              gap: "1px",
              background: "var(--color-line)",
              border: "1px solid var(--color-line)",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
            }}
          >
            {steps.map((step) => (
              <li
                key={step.n}
                style={{
                  background: "var(--color-surface)",
                  padding: "1.25rem 1.375rem",
                  display: "grid",
                  gridTemplateColumns: "2.5rem 1fr",
                  gap: "1rem",
                  alignItems: "baseline",
                }}
              >
                <span className="display" style={{ color: "var(--color-accent)", fontSize: "1rem" }}>
                  {step.n}
                </span>
                <div>
                  <p style={{ fontWeight: 600 }}>{step.title}</p>
                  <p style={{ color: "var(--color-muted)", fontSize: "0.9375rem", marginTop: 2 }}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div style={{ marginTop: "1.5rem" }}>
            <PartnerSlot slot="home-experience" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- MÉTHODE */}
      <section className="section hairline">
        <div className="shell">
          <div className="grid-two">
            <SectionHeading
              eyebrow="Notre méthode"
              title="Rien d'inventé. Jamais."
              lede="Une information pratique qui change — un tarif, un parking, une règle d'accès — est datée et sourcée. Quand nous ne savons pas, nous écrivons « Information à confirmer » plutôt que de remplir une fiche."
            />
            <ul style={{ display: "grid", gap: "0.75rem", alignSelf: "center" }}>
              {[
                "Priorité aux sites officiels des clubs, puis à la Pro League.",
                "Chaque donnée sensible affiche sa source et sa date de vérification.",
                "Aucune photo protégée n'est publiée sans licence vérifiée.",
                "Les liens commerciaux sont identifiés comme tels.",
              ].map((line) => (
                <li key={line} className="card" style={{ padding: "0.875rem 1.125rem", fontSize: "0.9375rem" }}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <Link href="/a-propos" className="btn btn-ghost" style={{ marginTop: "2rem" }}>
            Lire notre méthode
          </Link>
        </div>
      </section>
    </>
  );
}
