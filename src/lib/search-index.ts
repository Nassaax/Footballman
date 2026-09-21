import { getAllStadiumsWithClubs } from "./content";
import { isVerified } from "./format";
import type { SearchEntry } from "./search-core";

/**
 * Index de recherche construit au build à partir du contenu : aucun service
 * externe, aucune requête réseau, quelques dizaines de kilo-octets.
 */
export function buildSearchIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const { stadium, club, coTenants } of getAllStadiumsWithClubs()) {
    const href = `/stades/${stadium.slug}`;
    const clubNames = [club, ...coTenants].map((c) => c.name).join(" ");

    entries.push({
      id: `stade-${stadium.id}`,
      kind: "stade",
      title: stadium.name,
      subtitle: `${clubNames} · ${stadium.city}`,
      href,
      haystack: [
        stadium.name,
        stadium.formerNames?.join(" ") ?? "",
        stadium.city,
        clubNames,
        stadium.tagline,
        stadium.description,
        stadium.architecture,
        isVerified(stadium.address) ? String(stadium.address.value) : "",
      ].join(" "),
    });

    for (const c of [club, ...coTenants]) {
      entries.push({
        id: `club-${c.id}`,
        kind: "club",
        title: c.name,
        subtitle: `${stadium.name} · ${c.city}`,
        href,
        haystack: [c.name, c.shortName, c.city, c.nicknames.join(" "), c.region].join(" "),
      });
    }

    entries.push({
      id: `ville-${stadium.id}`,
      kind: "ville",
      title: stadium.city,
      subtitle: `${stadium.name} — ${club.name}`,
      href,
      haystack: `${stadium.city} ${club.region} ${clubNames}`,
    });

    for (const section of stadium.sections) {
      entries.push({
        id: `tribune-${stadium.id}-${section.id}`,
        kind: "tribune",
        title: section.name,
        subtitle: `${stadium.name} · tribune`,
        href: `${href}#tribunes`,
        haystack: [section.name, section.description, section.atmosphere, section.audience, stadium.name].join(" "),
      });
    }

    for (const [i, a] of stadium.anecdotes.entries()) {
      entries.push({
        id: `anecdote-${stadium.id}-${i}`,
        kind: "anecdote",
        title: a.hook,
        subtitle: stadium.name,
        href: `${href}#anecdotes`,
        haystack: `${a.hook} ${a.body} ${stadium.name} ${club.name}`,
      });
    }

    for (const topic of [
      { label: "Comment venir", anchor: "venir", words: "train gare bus tram metro voiture parking velo marche acces itineraire" },
      { label: "Billetterie", anchor: "billetterie", words: "billet ticket place abonnement guichet tarif prix achat" },
      { label: "Règles d'accès", anchor: "regles", words: "regles reglement sac fumigene drapeau interdit autorise securite controle" },
      { label: "Histoire", anchor: "histoire", words: "histoire construction renovation timeline dates" },
      { label: "Ferveur", anchor: "ferveur", words: "ambiance chants tifos supporters derby rivalite affluence" },
    ]) {
      entries.push({
        id: `pratique-${stadium.id}-${topic.anchor}`,
        kind: "pratique",
        title: `${topic.label} — ${stadium.name}`,
        subtitle: `${club.name} · ${stadium.city}`,
        href: `${href}#${topic.anchor}`,
        haystack: `${topic.label} ${topic.words} ${stadium.name} ${club.name} ${stadium.city}`,
      });
    }
  }

  return entries;
}

