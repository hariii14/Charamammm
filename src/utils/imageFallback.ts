/**
 * Bulletproof Fallback Image generator for Charamam.
 * Returns an inline SVG data-URL formatted as an authentic 19th-century newspaper letterpress engraving.
 * This guarantees that even without an internet connection or if an image URL returns 404 / CORS error,
 * the memorial plate will render a crisp, thematic vintage newspaper archival plate.
 */

export const getFallbackEngraving = (
  name: string = "OBJECT",
  category: string = "Household",
): string => {
  const safeName = name
    .slice(0, 24)
    .toUpperCase()
    .replace(/[<>&"]/g, "");
  const safeCategory = category.toUpperCase().replace(/[<>&"]/g, "");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
    <defs>
      <pattern id="hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="8" stroke="#3D3226" stroke-width="0.75" opacity="0.35" />
      </pattern>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.15  0 0 0 0 0.1  0 0 0 0.2 0" />
        <feBlend mode="multiply" in="SourceGraphic" />
      </filter>
    </defs>
    
    <!-- Background Paper Plate -->
    <rect width="100%" height="100%" fill="#F3ECE0" />
    <rect width="100%" height="100%" fill="url(#hatch)" opacity="0.4" />
    
    <!-- Double Archival Frame -->
    <rect x="18" y="18" width="564" height="414" fill="none" stroke="#221C16" stroke-width="2.5" />
    <rect x="25" y="25" width="550" height="400" fill="none" stroke="#221C16" stroke-width="0.8" stroke-dasharray="4 2" />
    
    <!-- Corner Ornaments -->
    <path d="M 28 42 L 42 28 M 28 28 L 52 28 M 28 28 L 28 52" stroke="#221C16" stroke-width="1.5" fill="none" />
    <path d="M 572 42 L 558 28 M 572 28 L 548 28 M 572 28 L 572 52" stroke="#221C16" stroke-width="1.5" fill="none" />
    <path d="M 28 408 L 42 422 M 28 422 L 52 422 M 28 422 L 28 398" stroke="#221C16" stroke-width="1.5" fill="none" />
    <path d="M 572 408 L 558 422 M 572 422 L 548 422 M 572 422 L 572 398" stroke="#221C16" stroke-width="1.5" fill="none" />
    
    <!-- Central Tombstone Emblem & Silhouette -->
    <g transform="translate(300, 185)">
      <!-- Candle / Urn Archival Engraving -->
      <path d="M -35 45 C -35 0, 35 0, 35 45 Z" fill="#2E2419" opacity="0.8" />
      <rect x="-18" y="-35" width="36" height="80" fill="#E8DEC9" stroke="#221C16" stroke-width="2" />
      <path d="M -18 -35 Q 0 -55 0 -70 Q 0 -55 18 -35 Z" fill="#D97706" stroke="#92400E" stroke-width="1.5" />
      <!-- Flame glow -->
      <circle cx="0" cy="-50" r="14" fill="#FEF3C7" opacity="0.6" />
      
      <!-- Laurel Sprigs -->
      <path d="M -65 25 C -75 -15 -45 -55 -25 -65" fill="none" stroke="#2E2419" stroke-width="1.5" stroke-dasharray="3 3" />
      <path d="M 65 25 C 75 -15 45 -55 25 -65" fill="none" stroke="#2E2419" stroke-width="1.5" stroke-dasharray="3 3" />
    </g>
    
    <!-- Engraved Typographic Header -->
    <text x="300" y="72" font-family="Georgia, serif" font-size="14" font-weight="bold" fill="#78350F" text-anchor="middle" letter-spacing="4">
      ★ CHARAMAM ARCHIVES ★
    </text>
    <text x="300" y="105" font-family="'Times New Roman', serif" font-size="22" font-weight="900" fill="#1C1814" text-anchor="middle" letter-spacing="2">
      ${safeName}
    </text>
    <line x1="160" y1="118" x2="440" y2="118" stroke="#221C16" stroke-width="1.2" />
    <line x1="200" y1="122" x2="400" y2="122" stroke="#221C16" stroke-width="0.6" />
    
    <!-- Subtitle Banner -->
    <rect x="180" y="325" width="240" height="28" fill="#221C16" />
    <text x="300" y="344" font-family="'Courier New', monospace" font-size="12" font-weight="bold" fill="#F3ECE0" text-anchor="middle" letter-spacing="2">
      DEPARTMENT OF ${safeCategory}
    </text>
    
    <text x="300" y="380" font-family="Georgia, serif" font-style="italic" font-size="13" fill="#574836" text-anchor="middle">
      "Departed from mortal utility — Inscribed in memory"
    </text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

/**
 * Handle image error and gracefully fallback to the engraved SVG archival plate
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  name: string = "OBJECT",
  category: string = "Household",
) => {
  const target = e.currentTarget;
  const fallback = getFallbackEngraving(name, category);
  if (target.src !== fallback) {
    target.onerror = null; // Prevent infinite loops
    target.src = fallback;
  }
};
