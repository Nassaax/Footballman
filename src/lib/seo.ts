import type { Metadata } from "next";
import { site } from "./site";
import type { Club, Stadium } from "@/data/types";
import { isVerified } from "./format";

export function canonical(path: string): string {
  return new URL(path, site.url).toString();
}

export function baseMetadata(): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s — ${site.name}`,
    },
    description: site.description,
    applicationName: site.name,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      url: site.url,
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

/** Métadonnées d'une fiche stade, optimisées pour les requêtes locales. */
export function stadiumMetadata(stadium: Stadium, club: Club): Metadata {
  const title = `${stadium.name} (${club.name}) — visiter, accès, tribunes`;
  const description = `${stadium.tagline} Accès, parking, billetterie, tribunes et histoire du ${stadium.name} à ${stadium.city}.`;
  const path = `/stades/${stadium.slug}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    keywords: [
      `stade ${club.shortName}`,
      stadium.name,
      `comment aller au ${stadium.name}`,
      `parking ${club.shortName}`,
      `billet ${club.shortName}`,
      `visiter ${stadium.name}`,
      `tribunes ${stadium.name}`,
    ],
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical(path),
      images: [{ url: canonical(`${path}/opengraph-image`), width: 1200, height: 630, alt: stadium.name }],
    },
  };
}

/** Données structurées Schema.org pour une enceinte sportive. */
export function stadiumJsonLd(stadium: Stadium, club: Club) {
  return {
    "@context": "https://schema.org",
    "@type": "StadiumOrArena",
    name: stadium.name,
    description: stadium.tagline,
    url: canonical(`/stades/${stadium.slug}`),
    ...(isVerified(stadium.capacity) ? { maximumAttendeeCapacity: stadium.capacity.value } : {}),
    address: {
      "@type": "PostalAddress",
      addressCountry: "BE",
      addressLocality: stadium.city,
      ...(isVerified(stadium.address) ? { streetAddress: stadium.address.value } : {}),
    },
    geo: { "@type": "GeoCoordinates", latitude: stadium.latitude, longitude: stadium.longitude },
    ...(isVerified(stadium.openingYear) ? { foundingDate: String(stadium.openingYear.value) } : {}),
    containedInPlace: { "@type": "City", name: stadium.city },
    tenant: {
      "@type": "SportsTeam",
      name: club.name,
      sport: "Football",
      ...(club.officialWebsite ? { url: club.officialWebsite } : {}),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}
