import React from "react";
import { Memorial } from "../types";
import { Eye } from "lucide-react";
import { MemorialEmblem } from "./MemorialEmblem";
import { handleImageError } from "../utils/imageFallback";

interface ObjectOfTheDayProps {
  memorial: Memorial;
  onOpenDetail: (memorial: Memorial) => void;
  onLightCandle: (id: string, e: React.MouseEvent) => void;
}

export const ObjectOfTheDay: React.FC<ObjectOfTheDayProps> = ({
  memorial,
  onOpenDetail,
  onLightCandle,
}) => {
  return (
    <article className="my-8 sm:my-12">
      <div className="relative border-4 border-[#1A1815] crisp-newsprint p-5 sm:p-8 shadow-[6px_6px_0px_#1A1815]">
        {/* Newspaper Masthead Banner */}
        <div className="border-b-2 border-stone-900 pb-3 mb-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs font-typewriter">
            <div className="flex items-center gap-2">
              <span className="bg-[#1A1815] text-[#F7F3E8] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest">
                Lead Column
              </span>
              <span className="text-stone-700 font-bold uppercase tracking-wider">
                The Daily Obituary Broadside
              </span>
            </div>
            <div className="text-stone-500 uppercase tracking-widest text-[11px]">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* Newspaper Headline Hierarchy */}
        <div className="text-center mb-6 max-w-4xl mx-auto">
          <p className="font-typewriter text-xs uppercase tracking-[0.25em] text-red-900 font-bold mb-1.5">
            ★ OBJECT OF THE DAY ★
          </p>
          <h2 className="font-headline text-3xl sm:text-5xl lg:text-6xl font-black text-[#1A1815] ink-impression tracking-tight leading-tight uppercase">
            {memorial.name}
          </h2>
          <p className="font-newspaper text-base sm:text-lg italic text-stone-700 mt-2">
            Departed After An Unheralded Term of Duty ({memorial.bornYear} — {memorial.departedYear}
            )
          </p>
          <div className="w-full h-px bg-stone-900 mt-4" />
          <div className="w-full h-0.5 bg-stone-900 mt-1" />
        </div>

        {/* Newspaper Multi-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Column 1: Archival Photographic Plate */}
          <div className="lg:col-span-5">
            <div
              onClick={() => onOpenDetail(memorial)}
              className="cursor-pointer border-2 border-stone-900 p-2 bg-[#F4EFE6] shadow-xs group"
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-stone-800 bg-stone-900 newsprint-halftone-plate">
                <img
                  src={memorial.imageUrl}
                  alt={memorial.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, memorial.name, memorial.category)}
                  className="w-full h-full object-cover grayscale contrast-125 sepia-[0.2] group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-2 left-2 bg-[#1A1815] text-[#F7F3E8] px-2 py-0.5 text-[9px] font-mono uppercase">
                  Exhibit A
                </div>
              </div>
              <div className="p-2 text-center">
                <p className="font-newspaper text-xs text-stone-800 italic leading-snug">
                  Photograph 1. — The remains of {memorial.name}, captured shortly following
                  catastrophic cessation.
                </p>
                <div className="mt-1 text-[10px] font-typewriter text-stone-500 uppercase tracking-wider">
                  CLASSIFICATION: {memorial.category} • STATUS: DECEASED
                </div>
              </div>
            </div>

            {/* Official Ledger Box */}
            <div className="mt-4 border border-stone-800 p-3 bg-[#EFE9DA] text-xs font-newspaper">
              <div className="font-typewriter text-[10px] uppercase tracking-wider text-stone-600 font-bold border-b border-stone-400 pb-1 mb-2">
                Certified Coroner Findings
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-600">Years of Service:</span>
                  <span className="font-bold">{memorial.stats.yearsServed} yrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Documented Incidents:</span>
                  <span className="font-bold">{memorial.stats.majorIncidents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Attempted Repairs:</span>
                  <span className="font-bold">{memorial.stats.successfulRepairs} successful</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Last Resting Coordinates:</span>
                  <span className="font-bold italic">{memorial.stats.lastKnownLocation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Broadsheet Editorial Columns */}
          <div className="lg:col-span-7 flex flex-col justify-between h-full">
            <div>
              {/* Dateline & Cause of Death */}
              <div className="border-l-4 border-stone-900 pl-4 py-2 my-2 bg-[#EFE8D8]/70">
                <span className="font-typewriter text-[11px] font-bold uppercase tracking-widest text-red-900 block mb-1">
                  OFFICIAL CAUSE OF DEMISE:
                </span>
                <p className="font-headline text-lg sm:text-xl font-bold italic text-stone-950">
                  “{memorial.causeOfDeath}”
                </p>
              </div>

              {/* Newspaper Body Text formatted in columns */}
              <div className="columns-1 sm:columns-2 gap-6 newspaper-col-rule newspaper-text-justify my-4 text-stone-900 font-newspaper text-sm sm:text-base leading-relaxed">
                <p className="newspaper-drop-cap mb-3">
                  <span className="font-typewriter text-xs font-bold uppercase tracking-widest mr-1">
                    SPECIAL DISPATCH —
                  </span>
                  {memorial.obituary}
                </p>
                {memorial.story && (
                  <p className="italic text-stone-700 text-xs sm:text-sm border-t border-stone-300 pt-2 mt-2">
                    “{memorial.story}”
                  </p>
                )}
                <p className="mt-3 text-xs text-stone-600 border-t border-dashed border-stone-400 pt-2">
                  Survived by a drawer of unrelated cables, tangled ribbons, and the faint scent of
                  buyer's remorse.
                </p>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="pt-4 border-t-2 border-stone-900 flex flex-wrap items-center justify-between gap-3 mt-4">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={(e) => onLightCandle(memorial.id, e)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#EAE2CE] border-2 border-stone-900 text-stone-950 hover:bg-[#DDD2BA] active:scale-95 transition-all font-headline font-bold text-xs sm:text-sm shadow-xs"
                >
                  <MemorialEmblem size={17} glow />
                  <span>Light Memorial Candle</span>
                  <span className="bg-stone-900 text-white px-2 py-0.5 rounded-full text-xs font-mono ml-1">
                    {memorial.candleCount}
                  </span>
                </button>

                <button
                  onClick={() => onOpenDetail(memorial)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#1A1815] text-[#F7F3E8] hover:bg-stone-800 active:scale-95 transition-all font-headline text-xs sm:text-sm font-bold shadow-xs"
                >
                  <Eye className="w-4 h-4" />
                  <span>Inspect Full Dossier</span>
                </button>
              </div>

              <span className="font-typewriter text-[11px] text-stone-600 italic">
                {memorial.candleCount} mourners have paused in recognition
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
