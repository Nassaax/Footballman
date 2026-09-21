"use client";

import { useEffect, useState } from "react";
import type { Photo } from "@/lib/photos-shared";

/**
 * Le hero part du visuel généré (rendu côté serveur, donc immédiat et sans
 * décalage de mise en page) puis bascule en fondu vers une photo de la
 * communauté dès qu'il en existe une pour ce stade. La page reste statique :
 * une nouvelle photo validée apparaît sans redéploiement.
 */
export function StadiumHeroMedia({
  stadiumId,
  stadiumName,
  children,
}: {
  stadiumId: string;
  stadiumName: string;
  children: React.ReactNode;
}) {
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`/api/photos?stadium=${encodeURIComponent(stadiumId)}`);
        const data = (await response.json()) as { photos?: Photo[] };
        if (!cancelled && data.photos?.length) setPhoto(data.photos[0]);
      } catch {
        /* la plaque graphique reste affichée */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [stadiumId]);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {children}
      {photo ? (
        <>
          <img
            src={photo.url}
            alt={photo.caption || `${stadiumName} — photo de supporter`}
            className="stadium-visual"
            decoding="async"
            onLoad={() => setLoaded(true)}
            style={{
              position: "absolute",
              inset: 0,
              opacity: loaded ? 1 : 0,
              transition: "opacity .8s var(--ease-out-soft)",
            }}
          />
          {loaded ? (
            <>
              <div aria-hidden="true" className="hero-scrim" />
              <p className="hero-credit">© {photo.author}</p>
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
