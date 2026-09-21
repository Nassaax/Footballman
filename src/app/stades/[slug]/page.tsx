import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStadiumBySlug, getStadiums } from "@/lib/content";
import { StadiumImage } from "@/components/StadiumVisual";
import { SectionHeading } from "@/components/Section";
import { Timeline } from "@/components/Timeline";
import { SectionsPlan } from "@/components/SectionsPlan";
import { AccessSection } from "@/components/AccessSection";
import { TicketingSection } from "@/components/TicketingSection";
import { RulesSection } from "@/components/RulesSection";
import { Anecdotes } from "@/components/Anecdotes";
import { VideoStrip } from "@/components/VideoStrip";
import { MatchdayPlanner } from "@/components/MatchdayPlanner";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ShareBar } from "@/components/ShareBar";
import { FactList, FactValue } from "@/components/FactValue";
import { PartnerSlot } from "@/components/PartnerSlot";
import { SupportBlock } from "@/components/SupportBlock";
import { StadiumSubNav } from "@/components/StadiumSubNav";
import { StadiumPhotos } from "@/components/StadiumPhotos";
import { StadiumHeroMedia } from "@/components/StadiumHeroMedia";
import { breadcrumbJsonLd, canonical, stadiumJsonLd, stadiumMetadata } from "@/lib/seo";
import { formatDate, formatNumber } from "@/lib/format";

export function generateStaticParams() {
  return getStadiums().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getStadiumBySlug(slug);
  if (!data) return {};
  return stadiumMetadata(data.stadium, data.club);
}

const anchors = [
  { id: "histoire", label: "Histoire" },
  { id: "ferveur", label: "Ferveur" },
  { id: "photos", label: "Photos" },
  { id: "tribunes", label: "Tribunes" },
  { id: "venir", label: "Comment venir" },
  { id: "billetterie", label: "Billetterie" },
  { id: "regles", label: "Règles" },
  { id: "avant-apres", label: "Avant / après" },
  { id: "jour-de-match", label: "Jour de match" },
  { id: "anecdotes", label: "Anecdotes" },
];

export default async function StadiumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getStadiumBySlug(slug);
  if (!data) notFound();

  const { stadium, club, coTenants } = data;
  const url = canonical(`/stades/${stadium.slug}`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stadiumJsonLd(stadium, club)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Accueil", path: "/" },
              { name: "Stades", path: "/stades" },
              { name: stadium.name, path: `/stades/${stadium.slug}` },
            ]),
          ),
        }}
      />

      {/* ------------------------------------------------------------- HERO */}
      <section style={{ position: "relative", minHeight: "min(82svh, 720px)", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        <StadiumHeroMedia stadiumId={stadium.id} stadiumName={stadium.name}>
          <StadiumImage stadium={stadium} club={club} variant="hero" className="stadium-visual" />
        </StadiumHeroMedia>

        <div className="shell rise" style={{ position: "relative", paddingBottom: "3rem", paddingTop: "6rem" }}>
          <p className="eyebrow" style={{ color: "rgba(255,255,255,.78)" }}>
            {stadium.city} · {club.name}
            {coTenants.length > 0 ? ` & ${coTenants.map((c) => c.name).join(", ")}` : ""}
          </p>
          <h1 className="display" style={{ color: "#fff", fontSize: "clamp(2.25rem, 9vw, 5rem)", marginTop: "0.875rem" }}>
            {stadium.name}
          </h1>
          <p style={{ color: "rgba(255,255,255,.9)", fontSize: "clamp(1rem, 3vw, 1.25rem)", marginTop: "1rem", maxWidth: "46ch", textWrap: "pretty" }}>
            {stadium.tagline}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "1.75rem" }}>
            <Link href="#histoire" className="btn" style={{ background: "#fff", color: "#111" }}>
              Découvrir le stade
            </Link>
            <FavoriteButton id={club.id} label={club.name} onDark />
          </div>
        </div>
      </section>

      <StadiumSubNav anchors={anchors} />

      {/* ---------------------------------------------------------- REPÈRES */}
      <section className="shell" style={{ paddingBlock: "2.5rem" }}>
        <dl className="grid-three">
          {[
            {
              label: "Capacité",
              node: <FactValue fact={stadium.capacity} render={(v) => `${formatNumber(v)} places`} />,
            },
            { label: "Ouverture", node: <FactValue fact={stadium.openingYear} /> },
            { label: "Adresse", node: <FactValue fact={stadium.address} /> },
          ].map((item) => (
            <div key={item.label} className="card" style={{ padding: "1.25rem" }}>
              <dt className="eyebrow">{item.label}</dt>
              <dd style={{ marginTop: "0.5rem", fontSize: "0.9375rem" }}>{item.node}</dd>
            </div>
          ))}
        </dl>

        <p className="lede" style={{ marginTop: "2.5rem" }}>{stadium.description}</p>
        <p style={{ marginTop: "1.25rem", color: "var(--color-muted)", maxWidth: "62ch", fontSize: "0.9375rem" }}>
          <strong style={{ color: "var(--color-text)" }}>Architecture. </strong>
          {stadium.architecture}
        </p>
      </section>

      {/* -------------------------------------------------------- HISTOIRE */}
      <section className="section hairline">
        <div className="shell">
          <SectionHeading id="histoire" eyebrow="Section 1" title="L'histoire" lede={`Ce que le ${stadium.name} a traversé, dans l'ordre. Les dates non vérifiées ne sont pas publiées.`} />
          <Timeline events={stadium.history} />
        </div>
      </section>

      {/* --------------------------------------------------------- FERVEUR */}
      <section className="section hairline">
        <div className="shell">
          <SectionHeading id="ferveur" eyebrow="Section 2" title="La ferveur" lede={stadium.fervour.intro} />

          <div className="grid-two" style={{ marginTop: "2.5rem", alignItems: "start" }}>
            <div style={{ display: "grid", gap: "1rem" }}>
              <div className="card" style={{ padding: "1.5rem" }}>
                <p className="eyebrow">Traditions</p>
                <ul style={{ marginTop: "0.75rem", display: "grid", gap: "0.5rem", paddingLeft: "1.1rem", listStyle: "disc" }}>
                  {stadium.fervour.traditions.map((t) => (
                    <li key={t} style={{ fontSize: "0.9375rem" }}>{t}</li>
                  ))}
                </ul>
              </div>
              <div className="card" style={{ padding: "1.5rem" }}>
                <p className="eyebrow">Groupes de supporters</p>
                <div style={{ marginTop: "0.75rem" }}>
                  <FactList fact={stadium.fervour.supporterGroups} />
                </div>
              </div>
              <div className="card" style={{ padding: "1.5rem" }}>
                <p className="eyebrow">Affluence</p>
                <div style={{ marginTop: "0.75rem" }}>
                  <FactValue fact={stadium.fervour.attendance} />
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gap: "1rem" }}>
              <div className="card" style={{ padding: "1.5rem" }}>
                <p className="eyebrow">Rivalités</p>
                <div style={{ marginTop: "1rem", display: "grid", gap: "1.25rem" }}>
                  {stadium.fervour.rivalries.map((r) => (
                    <div key={r.opponent}>
                      <p style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                        {r.name ? `${r.name} — ` : ""}
                        {r.opponent}
                      </p>
                      <p style={{ color: "var(--color-muted)", fontSize: "0.9375rem", marginTop: 2 }}>{r.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ padding: "1.5rem" }}>
                <p className="eyebrow">Grandes soirées</p>
                <div style={{ marginTop: "1rem", display: "grid", gap: "1rem" }}>
                  {stadium.fervour.greatNights.map((n) => (
                    <div key={n.title}>
                      <p style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{n.title}</p>
                      <p style={{ fontSize: "0.75rem", color: "var(--color-muted)" }}>{n.date}</p>
                      <p style={{ color: "var(--color-muted)", fontSize: "0.9375rem", marginTop: 4 }}>{n.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ VIVEZ LE STADE */}
      <section className="section hairline">
        <div className="shell">
          <SectionHeading eyebrow="Vivez le stade" title="En vidéo, à la verticale." lede="Format mobile, pensé pour être regardé comme on regarde tout le reste : debout, une main." />
          <VideoStrip videos={stadium.videos} stadiumName={stadium.name} />
        </div>
      </section>

      {/* ---------------------------------------------------------- PHOTOS */}
      <section className="section hairline">
        <div className="shell">
          <SectionHeading
            id="photos"
            eyebrow="La galerie des supporters"
            title={`Le ${stadium.name} vu par ceux qui y vont`}
            lede="Nous ne republions aucune photo dont nous n'avons pas les droits. Cette galerie est construite par les supporters : ajoutez la vôtre, elle est relue puis publiée avec votre crédit."
          />
          <StadiumPhotos stadiumId={stadium.id} stadiumName={stadium.name} />
        </div>
      </section>

      {/* -------------------------------------------------------- TRIBUNES */}
      <section className="section hairline">
        <div className="shell">
          <SectionHeading
            id="tribunes"
            eyebrow="Section 3"
            title="Les tribunes"
            lede="Choisissez une tribune sur le plan : nous décrivons son ambiance, son public et sa visibilité. Pas de notes arbitraires, uniquement du descriptif."
          />
          <SectionsPlan sections={stadium.sections} club={club} />
        </div>
      </section>

      {/* ----------------------------------------------------- COMMENT VENIR */}
      <section className="section hairline">
        <div className="shell">
          <SectionHeading
            id="venir"
            eyebrow="Section 4"
            title="Comment venir"
            lede="Chaque stade a un mode d'accès qui fonctionne mieux que les autres. Les informations qui dépendent du jour du match sont signalées comme telles."
          />
          <AccessSection access={stadium.access} />
          <div style={{ marginTop: "1.5rem" }}>
            <PartnerSlot slot="stadium-access" stadiumId={stadium.id} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ BILLETTERIE */}
      <section className="section hairline">
        <div className="shell">
          <SectionHeading id="billetterie" eyebrow="Section 5" title="Comment obtenir une place ?" />
          <TicketingSection ticketing={stadium.ticketing} clubName={club.name} stadiumId={stadium.id} />
          <div style={{ marginTop: "1.5rem" }}>
            <PartnerSlot slot="stadium-tickets" stadiumId={stadium.id} />
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- RÈGLES */}
      <section className="section hairline">
        <div className="shell">
          <SectionHeading
            id="regles"
            eyebrow="Section 6"
            title="Ce que vous pouvez / ne pouvez pas faire"
            lede="Le cadre général est fixé par la loi football belge ; chaque club ajoute son règlement d'ordre intérieur. Quand nous n'avons pas vérifié un point auprès du club, nous l'indiquons."
          />
          <RulesSection rules={stadium.rules} />
        </div>
      </section>

      {/* --------------------------------------------------- AVANT / APRÈS */}
      <section className="section hairline">
        <div className="shell">
          <SectionHeading id="avant-apres" eyebrow="Section 7" title="Avant et après le match" />

          <div className="grid-two" style={{ marginTop: "2.5rem", alignItems: "start" }}>
            <div>
              <h3 className="display" style={{ fontSize: "1.25rem" }}>Avant le match</h3>
              <p style={{ color: "var(--color-muted)", marginTop: "0.75rem", fontSize: "0.9375rem" }}>
                {stadium.beforeMatch.intro}
              </p>
              <div style={{ marginTop: "1.25rem" }}>
                <p className="eyebrow">Quand arriver</p>
                <div style={{ marginTop: "0.375rem" }}>
                  <FactValue fact={stadium.beforeMatch.timing} />
                </div>
              </div>

              {stadium.beforeMatch.places.length > 0 ? (
                <ul style={{ marginTop: "1.25rem", display: "grid", gap: "0.75rem" }}>
                  {stadium.beforeMatch.places.map((p) => (
                    <li key={p.name} className="card" style={{ padding: "1rem" }}>
                      <p style={{ fontWeight: 600, fontSize: "0.9375rem" }}>{p.name}</p>
                      <p style={{ color: "var(--color-muted)", fontSize: "0.875rem", marginTop: 2 }}>{p.description}</p>
                      {p.sponsored ? <span className="chip" style={{ marginTop: 8 }}>contenu partenaire</span> : null}
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ marginTop: "1.25rem", fontSize: "0.875rem", color: "var(--color-muted)", fontStyle: "italic" }}>
                  Nous ne listons pas d'établissements que nous n'avons pas vérifiés sur place. Cette
                  sélection arrive stade par stade.
                </p>
              )}

              <div style={{ marginTop: "1.5rem" }}>
                <PartnerSlot slot="stadium-before-match" stadiumId={stadium.id} />
              </div>
            </div>

            <div>
              <h3 className="display" style={{ fontSize: "1.25rem" }}>Après le match</h3>
              <p style={{ color: "var(--color-muted)", marginTop: "0.75rem", fontSize: "0.9375rem" }}>
                {stadium.afterMatch.intro}
              </p>
              <ul style={{ marginTop: "1.25rem", display: "grid", gap: "0.5rem", paddingLeft: "1.1rem", listStyle: "disc" }}>
                {stadium.afterMatch.tips.map((t) => (
                  <li key={t} style={{ fontSize: "0.9375rem" }}>{t}</li>
                ))}
              </ul>
              <div style={{ marginTop: "1.25rem" }}>
                <p className="eyebrow">Sorties</p>
                <div style={{ marginTop: "0.375rem" }}>
                  <FactList fact={stadium.afterMatch.exits} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- JOUR DE MATCH */}
      <section className="section hairline">
        <div className="shell">
          <SectionHeading
            id="jour-de-match"
            eyebrow="Section 8"
            title="Votre jour de match"
            lede="Indiquez l'heure du coup d'envoi et votre tribune : le déroulé se recalcule."
          />
          <MatchdayPlanner stadium={stadium} sections={stadium.sections} />
        </div>
      </section>

      {/* ------------------------------------------------------- ANECDOTES */}
      <section className="section hairline">
        <div className="shell">
          <SectionHeading
            id="anecdotes"
            eyebrow="Section 9"
            title="Vous ne saviez probablement pas que…"
            lede="Des histoires courtes, vérifiables, faites pour être racontées."
          />
          <Anecdotes anecdotes={stadium.anecdotes} />
        </div>
      </section>

      {/* ----------------------------------------------- PARTAGE ET SOURCES */}
      <section className="section hairline">
        <div className="shell">
          <ShareBar url={url} title={`${stadium.name} — ${club.name}`} />

          <div style={{ marginTop: "2.5rem" }}>
            <SupportBlock context={`stade:${stadium.slug}`} />
          </div>

          <div className="card" style={{ marginTop: "2.5rem", padding: "1.5rem" }}>
            <p className="eyebrow">Sources et vérification</p>
            <p style={{ fontSize: "0.875rem", marginTop: "0.625rem", color: "var(--color-muted)" }}>
              Dernière vérification de cette fiche : {formatDate(stadium.lastVerified)}.
            </p>
            <ul style={{ marginTop: "0.875rem", display: "grid", gap: "0.375rem" }}>
              {stadium.sources.map((s) => (
                <li key={`${s.label}-${s.url ?? ""}`} style={{ fontSize: "0.8125rem" }}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noopener noreferrer nofollow" className="link-underline">
                      {s.label}
                    </a>
                  ) : (
                    s.label
                  )}
                  {s.tier ? <span style={{ color: "var(--color-muted)" }}> · niveau {s.tier}</span> : null}
                </li>
              ))}
            </ul>
            {club.officialWebsite ? (
              <a href={club.officialWebsite} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ marginTop: "1.25rem" }}>
                Site officiel de {club.name}
              </a>
            ) : null}
          </div>

          <p style={{ marginTop: "2rem" }}>
            <Link href="/stades" className="link-underline">← Tous les stades</Link>
          </p>
        </div>
      </section>
    </>
  );
}
