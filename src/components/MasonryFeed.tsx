import React from "react";
import { Memorial } from "../types";
import { MemorialCard } from "./MemorialCard";

interface MasonryFeedProps {
  memorials: Memorial[];
  onOpenDetail: (memorial: Memorial) => void;
  onLightCandle: (id: string, e: React.MouseEvent) => void;
}

export const MasonryFeed: React.FC<MasonryFeedProps> = ({
  memorials,
  onOpenDetail,
  onLightCandle,
}) => {
  if (memorials.length === 0) {
    return (
      <div className="py-16 text-center max-w-lg mx-auto border-4 border-stone-900 bg-[#FDFBF7] p-8 my-12 shadow-[6px_6px_0px_#1A1815]">
        <div className="font-typewriter text-xs uppercase tracking-widest text-red-950 font-bold mb-2">
          ★ EDITOR'S BULLETIN ★
        </div>
        <h3 className="font-headline text-2xl sm:text-3xl font-black text-stone-900 mb-2 uppercase">
          No Deceased Objects Cataloged
        </h3>
        <p className="font-newspaper italic text-stone-700 text-sm sm:text-base leading-relaxed">
          Perhaps they remain amongst the living. Or lie undiscovered beneath an armchair,
          stubbornly postponing their formal interment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Broadsheet Section Header */}
      <div className="border-t-4 border-b-2 border-stone-900 py-1 flex items-center justify-between font-typewriter text-xs uppercase tracking-wider text-stone-700 mb-6">
        <span>Broadsheet Obituary Columns</span>
        <span className="font-headline italic normal-case text-stone-900 font-bold">
          “Every object has its day; then its drawer.”
        </span>
        <span>Columns 1 through 4</span>
      </div>

      {/* Newspaper Multi-Column Masonry Flow */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 [column-fill:_balance]">
        {memorials.map((memorial) => (
          <MemorialCard
            key={memorial.id}
            memorial={memorial}
            onOpenDetail={onOpenDetail}
            onLightCandle={onLightCandle}
          />
        ))}
      </div>
    </div>
  );
};
