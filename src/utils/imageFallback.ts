import type { SyntheticEvent } from "react";

const PLACEHOLDER_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#e5e7eb"/>
      <text x="50%" y="50%" font-family="system-ui, sans-serif" font-size="20" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">🍽️ Image unavailable</text>
    </svg>
  `);

export function handleImageError(e: SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.src !== PLACEHOLDER_SRC) {
    img.src = PLACEHOLDER_SRC;
  }
}
