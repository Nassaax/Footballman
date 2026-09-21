import type { Club, Stadium } from "@/data/types";

/**
 * Visuel généré pour chaque stade.
 *
 * Aucune photographie de club n'est téléchargée ni utilisée sans vérification
 * des droits (cf. charte). En attendant des visuels dont la licence est
 * validée, chaque fiche reçoit une plaque graphique déterministe construite à
 * partir des couleurs du club et de la géométrie de l'enceinte : c'est léger
 * (SVG inline, aucune requête réseau) et cela reste parfaitement cohérent
 * visuellement d'un stade à l'autre.
 *
 * Dès qu'une image libre de droits est renseignée dans `stadium.gallery` avec
 * `usable: true`, le composant `StadiumImage` l'affiche à la place.
 */

function hash(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function StadiumVisual({
  stadium,
  club,
  variant = "card",
  className,
}: {
  stadium: Stadium;
  club: Club;
  variant?: "card" | "hero" | "tile";
  className?: string;
}) {
  const seed = hash(stadium.id);
  const rotation = ((seed % 14) - 7) * 0.9;
  const offset = (seed % 5) - 2;
  const beams = 2 + (seed % 3);
  const primary = club.colors.primary;
  const secondary = club.colors.secondary;
  const id = `sv-${stadium.id}-${variant}`;

  const height = variant === "hero" ? 760 : variant === "tile" ? 600 : 500;

  return (
    <svg
      viewBox={`0 0 800 ${height}`}
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={`Représentation graphique du ${stadium.name}`}
    >
      <defs>
        <clipPath id={`${id}-clip`}>
          <rect width="800" height={height} />
        </clipPath>
        <filter id={`${id}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <linearGradient id={`${id}-scrim`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0.42" />
          <stop offset="45%" stopColor="#000" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.82" />
        </linearGradient>
      </defs>

      <g clipPath={`url(#${id}-clip)`}>
        <rect width="800" height={height} fill={primary} />
        <rect width="800" height={height} fill="#0b0d0f" opacity="0.34" />

        {/* faisceaux de projecteurs */}
        {Array.from({ length: beams }).map((_, i) => {
          const x = 90 + i * (620 / beams) + offset * 6;
          return (
            <polygon
              key={i}
              points={`${x},0 ${x + 60},0 ${x + 260},${height} ${x + 40},${height}`}
              fill="#fff"
              opacity={0.045 + (i % 2) * 0.02}
            />
          );
        })}

        {/* la cuvette : anneaux concentriques */}
        <g transform={`rotate(${rotation} 400 ${height / 2})`}>
          {[0, 1, 2, 3].map((ring) => {
            const grow = ring * 62;
            return (
              <rect
                key={ring}
                x={190 - grow}
                y={height / 2 - 112 - grow * 0.62}
                width={420 + grow * 2}
                height={224 + grow * 1.24}
                rx={70 + grow}
                fill="none"
                stroke="#fff"
                strokeWidth={ring === 0 ? 2.5 : 1.2}
                opacity={0.3 - ring * 0.06}
              />
            );
          })}

          {/* la pelouse */}
          <rect
            x="278"
            y={height / 2 - 76}
            width="244"
            height="152"
            rx="6"
            fill={secondary}
            opacity="0.16"
          />
          <rect
            x="278"
            y={height / 2 - 76}
            width="244"
            height="152"
            rx="6"
            fill="none"
            stroke="#fff"
            strokeWidth="1.4"
            opacity="0.5"
          />
          <line
            x1="400"
            y1={height / 2 - 76}
            x2="400"
            y2={height / 2 + 76}
            stroke="#fff"
            strokeWidth="1.2"
            opacity="0.42"
          />
          <circle cx="400" cy={height / 2} r="30" fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.42" />
          <circle cx="400" cy={height / 2} r="2.5" fill="#fff" opacity="0.6" />
        </g>

        <rect width="800" height={height} fill={`url(#${id}-scrim)`} />
        <rect width="800" height={height} filter={`url(#${id}-grain)`} opacity="0.055" />
      </g>
    </svg>
  );
}

/** Affiche une photographie uniquement si sa licence l'autorise. */
export function StadiumImage({
  stadium,
  club,
  variant = "card",
  className,
}: {
  stadium: Stadium;
  club: Club;
  variant?: "card" | "hero" | "tile";
  className?: string;
}) {
  const photo = stadium.gallery.find((img) => img.usable && img.src);
  if (!photo?.src) {
    return <StadiumVisual stadium={stadium} club={club} variant={variant} className={className} />;
  }
  return (
    <img
      src={photo.src}
      alt={photo.alt}
      loading={variant === "hero" ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
