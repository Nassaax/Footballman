/* Types et constantes des photos, partagés entre le serveur et le navigateur. */

export const MAX_UPLOAD_BYTES = 4 * 1024 * 1024;

export const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"] as const;

/** Licences proposées au contributeur, de la plus ouverte à la plus restreinte. */
export const PHOTO_LICENSES = {
  "cc-by": "CC BY 4.0 — réutilisable par tous, avec crédit",
  "site-only": "Utilisation réservée à Stadia Belgica, avec crédit",
} as const;

export type PhotoLicense = keyof typeof PHOTO_LICENSES;

export interface Photo {
  id: string;
  stadiumId: string;
  url: string;
  pathname: string;
  /** Légende courte fournie par le contributeur. */
  caption: string;
  /** Nom ou pseudo affiché comme crédit. */
  author: string;
  license: PhotoLicense;
  /** Date de prise de vue si elle est fournie, sinon date d'envoi. */
  takenAt?: string;
  submittedAt: string;
  approvedAt?: string;
  width?: number;
  height?: number;
  bytes: number;
}

export interface PendingPhoto extends Photo {
  /** Conservé pour recontacter l'auteur, jamais affiché publiquement. */
  contactEmail?: string;
}
