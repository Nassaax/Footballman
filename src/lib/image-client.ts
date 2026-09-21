"use client";

/**
 * Redimensionne et recompresse une photo dans le navigateur avant l'envoi.
 *
 * Une photo de téléphone pèse souvent 5 à 12 Mo, ce qui dépasse la limite de
 * corps de requête des fonctions serveur et coûterait cher en stockage. On la
 * ramène à une taille d'affichage web avant qu'elle ne quitte l'appareil, ce
 * qui rend l'envoi possible en 4G et réduit la facture.
 */

const MAX_DIMENSION = 2200;
const QUALITY = 0.82;

export interface PreparedImage {
  file: File;
  width: number;
  height: number;
  originalBytes: number;
}

export async function prepareImage(input: File): Promise<PreparedImage> {
  const bitmap = await createImageBitmap(input).catch(() => null);

  // Navigateur sans createImageBitmap ou fichier illisible : on renvoie l'original.
  if (!bitmap) {
    return { file: input, width: 0, height: 0, originalBytes: input.size };
  }

  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) {
    bitmap.close();
    return { file: input, width: bitmap.width, height: bitmap.height, originalBytes: input.size };
  }

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", QUALITY),
  );

  if (!blob) {
    return { file: input, width, height, originalBytes: input.size };
  }

  const name = input.name.replace(/\.[^.]+$/, "") || "photo";
  return {
    file: new File([blob], `${name}.jpg`, { type: "image/jpeg" }),
    width,
    height,
    originalBytes: input.size,
  };
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}
