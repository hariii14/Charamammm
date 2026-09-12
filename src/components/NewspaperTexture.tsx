import React from "react";

interface NewspaperTextureProps {
  intensity?: "crisp" | "vintage" | "heavy";
}

export const NewspaperTexture: React.FC<NewspaperTextureProps> = ({ intensity = "crisp" }) => {
  // Set opacity based on intensity
  const grainOpacity =
    intensity === "heavy"
      ? "opacity-[0.28]"
      : intensity === "vintage"
        ? "opacity-[0.22]"
        : "opacity-[0.18]";
  const linesOpacity =
    intensity === "heavy"
      ? "opacity-[0.10]"
      : intensity === "vintage"
        ? "opacity-[0.07]"
        : "opacity-[0.05]";

  return (
    <div
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* 1. Microscopic Wood Pulp Grain (High-Frequency SVG Noise) */}
      <svg className="absolute inset-0 w-full h-full w-full h-full opacity-0 pointer-events-none">
        <defs>
          <filter id="crisp-newsprint-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.82"
              numOctaves="4"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.12   0 0 0 0 0.10   0 0 0 0 0.08   0 0 0 0.45 0"
              result="coloredNoise"
            />
            <feBlend mode="multiply" in="SourceGraphic" in2="coloredNoise" />
          </filter>

          {/* Paper fiber stippling pattern */}
          <pattern id="newsprint-fibers" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* Fine wood pulp specks and cellulose flecks */}
            <circle cx="15" cy="22" r="0.6" fill="#423425" opacity="0.35" />
            <circle cx="85" cy="45" r="0.75" fill="#36291C" opacity="0.4" />
            <circle cx="42" cy="98" r="0.5" fill="#544331" opacity="0.3" />
            <circle cx="108" cy="12" r="0.65" fill="#2E2216" opacity="0.45" />
            <circle cx="68" cy="74" r="0.8" fill="#3D3022" opacity="0.35" />
            <circle cx="28" cy="62" r="0.55" fill="#4B3C2C" opacity="0.3" />
            <circle cx="95" cy="110" r="0.7" fill="#332619" opacity="0.4" />
            {/* Cellulose micro fibers */}
            <path
              d="M 12 18 Q 18 20 24 17"
              stroke="#403223"
              strokeWidth="0.45"
              fill="none"
              opacity="0.25"
            />
            <path
              d="M 72 85 Q 77 92 85 89"
              stroke="#3A2C1E"
              strokeWidth="0.4"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M 45 42 Q 52 38 60 44"
              stroke="#4D3D2B"
              strokeWidth="0.5"
              fill="none"
              opacity="0.2"
            />
          </pattern>
        </defs>
      </svg>

      {/* 2. Fullscreen SVG Noise Texture Rect (Pure Vector, Crisp at any zoom/Retina) */}
      <div
        className={`absolute inset-0 w-full h-full mix-blend-multiply ${grainOpacity}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.22'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
      />

      {/* 3. Secondary Micro-Fiber Speckling Pattern */}
      <svg className="absolute inset-0 w-full h-full mix-blend-multiply opacity-75">
        <rect width="100%" height="100%" fill="url(#newsprint-fibers)" />
      </svg>

      {/* 4. Rotary Cylinder Press Horizontal Micro-Grain (Scanline Fibers) */}
      <div
        className={`absolute inset-0 w-full h-full mix-blend-multiply ${linesOpacity}`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 1.5px, rgba(40, 32, 22, 0.35) 1.5px, rgba(40, 32, 22, 0.35) 2px)",
          backgroundSize: "100% 2px",
        }}
      />

      {/* 5. Aged Broadsheet Peripheral Vignette (Subtle oxidation along borders) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-multiply opacity-25"
        style={{
          boxShadow:
            "inset 0 0 120px rgba(110, 85, 45, 0.45), inset 0 0 35px rgba(60, 45, 25, 0.3)",
        }}
      />

      {/* 6. Subtle Horizontal Paper Fold / Centerfold Crease */}
      <div className="absolute top-[48vh] left-0 right-0 h-1 pointer-events-none opacity-20 mix-blend-multiply">
        <div className="h-[1px] bg-stone-900/30 w-full shadow-[0_1px_2px_rgba(255,255,255,0.4)]" />
      </div>
    </div>
  );
};
