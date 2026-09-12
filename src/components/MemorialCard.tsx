import React from "react";
import { Memorial } from "../types";
import { MemorialEmblem } from "./MemorialEmblem";
import { handleImageError } from "../utils/imageFallback";

interface MemorialCardProps {
  memorial: Memorial;
  onOpenDetail: (memorial: Memorial) => void;
  onLightCandle: (id: string, e: React.MouseEvent) => void;
}

export const MemorialCard: React.FC<MemorialCardProps> = ({
  memorial,
  onOpenDetail,
  onLightCandle,
}) => {
  const rotationStyle = {
    transform: `rotate(${memorial.rotationDeg}deg)`,
  };

  return (
    <article
      style={rotationStyle}
      onClick={() => onOpenDetail(memorial)}
      className="group relative cursor-pointer break-inside-avoid mb-6 crisp-newsprint border-2 border-stone-900 p-4 shadow-[3px_3px_0px_#1A1815] hover:shadow-[5px_5px_0px_#1A1815] hover:!rotate-0 hover:-translate-y-1 transition-all duration-300 select-none"
    >
      {/* Newspaper Column Item Header */}
      <div className="border-b-2 border-stone-900 pb-2 mb-3">
        <div className="flex items-center justify-between text-[10px] font-typewriter uppercase tracking-wider text-stone-600 mb-1">
          <span>CLASSIFIED NO. {memorial.id.slice(-4).toUpperCase()}</span>
          <span className="font-bold text-red-950 bg-red-100/80 px-1.5 py-0.2 rounded border border-red-200">
            {memorial.category}
          </span>
        </div>

        {/* Newspaper Headline */}
        <h3 className="font-headline text-xl sm:text-2xl font-bold text-[#1A1815] ink-impression leading-tight group-hover:text-red-950 transition-colors uppercase tracking-tight">
          {memorial.name}
        </h3>

        <div className="flex items-center justify-between mt-1 text-[11px] font-typewriter text-stone-700">
          <span>
            {memorial.bornYear} — {memorial.departedYear}
          </span>
          <span className="italic text-stone-500 font-newspaper">
            {memorial.stats.yearsServed} yrs of duty
          </span>
        </div>
      </div>

      {/* Newspaper Halftone Photo Plate */}
      <div className="relative border border-stone-900 bg-stone-100 p-1 mb-3">
        <div className="aspect-[4/3] w-full overflow-hidden bg-stone-900 newsprint-halftone-plate">
          <img
            src={memorial.imageUrl}
            alt={memorial.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={(e) => handleImageError(e, memorial.name, memorial.category)}
            className="w-full h-full object-cover grayscale contrast-125 sepia-[0.15] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
          />
        </div>
        <div className="text-center py-1 text-[10px] font-newspaper italic text-stone-600 border-t border-stone-300 mt-1">
          Fig. {memorial.name.slice(0, 8)} — Photographic record.
        </div>
      </div>

      {/* Newspaper Column Text */}
      <div className="space-y-2.5 font-newspaper text-stone-900">
        {/* Cause of death dateline */}
        <div className="bg-[#EFE9DA] border-l-2 border-stone-900 p-2 text-xs">
          <span className="font-typewriter text-[9px] uppercase tracking-wider text-stone-600 block font-bold">
            Cause of Demise:
          </span>
          <span className="italic text-stone-900 leading-snug line-clamp-2">
            “{memorial.causeOfDeath}”
          </span>
        </div>

        {/* Obituary excerpt in column style */}
        <p className="text-xs sm:text-sm leading-relaxed newspaper-text-justify line-clamp-3 text-stone-800">
          “{memorial.obituary}”
        </p>

        {/* Column Footer with Memorial Candle Emblem */}
        <div className="pt-2.5 border-t border-stone-900/40 flex items-center justify-between text-xs">
          <button
            onClick={(e) => onLightCandle(memorial.id, e)}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-[#EAE2CE] hover:bg-[#DDD1B8] border border-stone-800 text-stone-900 rounded-xs active:scale-95 transition-all font-headline font-bold text-xs"
            title="Light memorial candle"
          >
            <MemorialEmblem size={14} glow />
            <span>{memorial.candleCount}</span>
          </button>

          <span className="font-typewriter text-[10px] text-stone-500 group-hover:text-stone-900 transition-colors uppercase">
            {memorial.comments.length} Inscriptions
          </span>
        </div>
      </div>
    </article>
  );
};
