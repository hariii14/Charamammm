import React from "react";
import { FilterSection } from "../types";
import { Plus } from "lucide-react";
import { MemorialEmblem } from "./MemorialEmblem";

interface NavbarProps {
  activeSection: FilterSection;
  onSelectSection: (section: FilterSection) => void;
  onOpenCreate: () => void;
  totalMemorials: number;
  totalCandles: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onSelectSection,
  onOpenCreate,
  totalMemorials,
  totalCandles,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#F7F3E8]/95 backdrop-blur-sm border-b-2 border-[#1A1815] transition-all shadow-xs">
      {/* Top Gazette Infobar */}
      <div className="border-b border-[#1A1815]/20 bg-[#EDE7D6]/80 text-[11px] font-typewriter text-stone-700 py-1 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold uppercase tracking-wider text-stone-900">
              Late City Edition
            </span>
            <span className="text-stone-400">|</span>
            <span>Vol. CXLIV — No. 42</span>
            <span className="text-stone-400 hidden sm:inline">|</span>
            <span className="hidden sm:inline">Weather: Overcast & Melancholy</span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span>{totalMemorials} OBITUARIES INSCRIBED</span>
            <span className="text-stone-400">/</span>
            <span>{totalCandles} TRIBUTES RECORDED</span>
            <span className="text-stone-400">/</span>
            <span className="font-bold text-red-900">PRICE: ONE TEAR</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Masthead Logo */}
          <div
            onClick={() => onSelectSection("all")}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-full border-2 border-[#1A1815] bg-[#EAE3CE] flex items-center justify-center text-[#1A1815] shadow-xs group-hover:bg-[#DFD6BD] transition-colors">
              <MemorialEmblem size={22} glow />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-gothic text-3xl sm:text-4xl lg:text-5xl text-[#1A1815] tracking-wide leading-none font-bold">
                  Charamam
                </span>
                <span className="text-[10px] font-typewriter uppercase tracking-widest text-stone-500 hidden sm:inline border-l border-stone-400 pl-2">
                  THE OBJECT FUNERAL GAZETTE
                </span>
              </div>
              <p className="font-newspaper text-xs text-stone-600 italic tracking-tight hidden sm:block">
                The Daily Journal of Broken, Abandoned, and Deceased Possessions
              </p>
            </div>
          </div>

          {/* Navigation tabs styled as newspaper section headers */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 border-x border-[#1A1815]/20 px-3 py-1">
            {(
              [
                { id: "all", label: "Front Page" },
                { id: "recent", label: "Late Departures" },
                { id: "mourned", label: "Public Mourning" },
                { id: "questionable", label: "Bizarre Demises" },
                { id: "forgotten", label: "Forgotten Ledger" },
              ] as const
            ).map((tab) => {
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectSection(tab.id)}
                  className={`px-3 py-1 text-xs tracking-wider uppercase transition-all font-headline ${
                    isActive
                      ? "bg-[#1A1815] text-[#F7F3E8] font-bold shadow-xs"
                      : "text-stone-800 hover:text-black hover:bg-[#EAE3CE]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Create CTA Button styled as classified insertion */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCreate}
              className="group relative inline-flex items-center gap-2 px-4 py-2 sm:px-4 sm:py-2.5 bg-[#1A1815] text-[#F7F3E8] border-2 border-[#1A1815] hover:bg-stone-900 active:scale-95 transition-all shadow-xs font-headline text-xs sm:text-sm font-bold tracking-wide"
            >
              <Plus className="w-4 h-4 text-red-400 group-hover:rotate-90 transition-transform duration-300" />
              <span>Submit Obituary</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-start overflow-x-auto py-2 border-t border-[#1A1815]/15 gap-1 scrollbar-none">
          {(
            [
              { id: "all", label: "Front Page" },
              { id: "recent", label: "Late Departures" },
              { id: "mourned", label: "Public Mourning" },
              { id: "questionable", label: "Bizarre Demises" },
              { id: "forgotten", label: "Forgotten Ledger" },
            ] as const
          ).map((tab) => {
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectSection(tab.id)}
                className={`px-2.5 py-1 text-xs uppercase tracking-wider whitespace-nowrap transition-all font-headline ${
                  isActive
                    ? "bg-[#1A1815] text-[#F7F3E8] font-bold"
                    : "text-stone-700 hover:bg-[#EAE3CE]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
