import type { MetadataRoute } from "next";
import { getStadiums } from "@/lib/content";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages = ["", "/stades", "/carte", "/recherche", "/a-propos", "/clubs", "/partenaires"].map(
    (path) => ({
      url: new URL(path || "/", site.url).toString(),
      lastModified: now,
      changeFrequency: (path === "" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: path === "" ? 1 : 0.7,
    }),
  );

  const stadiumPages = getStadiums().map((stadium) => ({
    url: new URL(`/stades/${stadium.slug}`, site.url).toString(),
    lastModified: new Date(stadium.lastVerified),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...stadiumPages];
}
