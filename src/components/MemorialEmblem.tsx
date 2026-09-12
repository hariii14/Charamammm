import React from "react";

interface MemorialEmblemProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

/**
 * Elegant antique newspaper-engraving style memorial candle emblem.
 * Replaces generic fire emojis with a dignified archival tribute symbol.
 */
export const MemorialEmblem: React.FC<MemorialEmblemProps> = ({
  className = "w-4 h-4 text-stone-900 inline-block",
  size = 18,
  glow = false,
}) => {
  return (
    <span
      className={`relative inline-flex items-center justify-center align-middle ${className}`}
      style={{ width: size, height: size }}
      title="Solemn Memorial Candle"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-full h-full"
      >
        {/* Candle Flame / Tear of light */}
        <path
          d="M12 2C10.5 4.5 9 6.5 9 8.5C9 10.4 10.3 12 12 12C13.7 12 15 10.4 15 8.5C15 6.5 13.5 4.5 12 2Z"
          fill={glow ? "rgba(220, 38, 38, 0.35)" : "currentColor"}
          stroke="currentColor"
          strokeWidth="1.5"
          className="transition-colors duration-300"
        />
        {/* Wick */}
        <line x1="12" y1="12" x2="12" y2="13.5" stroke="currentColor" strokeWidth="1.5" />
        {/* Wax Pillar */}
        <path
          d="M8.5 13.5H15.5V20.5C15.5 21.0523 15.0523 21.5 14.5 21.5H9.5C8.94772 21.5 8.5 21.0523 8.5 20.5V13.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Wax Drip Accent */}
        <path d="M10.5 13.5V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        {/* Saucer / Brass Candle Stand Base */}
        <path d="M6 22H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      {glow && (
        <span className="absolute -top-1 w-2.5 h-2.5 rounded-full bg-red-600/30 blur-[2px] animate-pulse pointer-events-none" />
      )}
    </span>
  );
};
