import React, { useEffect, useState } from "react";
import { Radio } from "lucide-react";
import { MemorialEmblem } from "./MemorialEmblem";

const ACTIVITIES = [
  "DISPATCH: Someone in Kyoto lit a candle of remembrance for The Old Calculator",
  "WIRE: 3 mourners currently grieving USB Cable #42 in the classifieds",
  "BULLETIN: Office Chair #17 received an honorary obituary tribute",
  "URGENT: The Left Sock remains tragically unaccounted for in laundry sector 4",
  "GAZETTE: Orphaned Tupperware Lid visited by 14 solemn observers",
  "WIRE: Moment of silence observed for The Chewed Pencil of 2023",
  'LATE BREAKING: New memorial registered for "Headphone Adapter That Lasted 11 Days"',
  "NOTICE: Final respects paid to AA Battery with 4% charge remaining",
];

export const ActivityTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ACTIVITIES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#EFE9DA] border-y border-[#1A1815]/20 py-1.5 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-stone-900 shrink-0 font-typewriter uppercase tracking-wider text-[11px] font-bold">
          <span className="inline-block w-2 h-2 rounded-full bg-red-700 animate-ping" />
          <span>Telegraph Wire</span>
          <span className="text-stone-400">|</span>
        </div>

        <div className="flex-1 mx-4 overflow-hidden text-ellipsis whitespace-nowrap">
          <div className="inline-flex items-center gap-2.5 font-newspaper text-stone-800 text-xs sm:text-sm transition-all duration-700">
            <MemorialEmblem size={14} glow />
            <span>{ACTIVITIES[currentIndex]}</span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-stone-500 font-typewriter text-[10px]">
          <span>MORSE DISPATCH</span>
          <Radio className="w-3 h-3 text-stone-400" />
        </div>
      </div>
    </div>
  );
};
