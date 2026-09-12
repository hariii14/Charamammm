import React, { useState, useEffect, useMemo } from "react";
import { Memorial, Category, FilterSection, TributeComment } from "./types";
import { INITIAL_MEMORIALS } from "./data/mockMemorials";
import { Navbar } from "./components/Navbar";
import { ActivityTicker } from "./components/ActivityTicker";
import { ObjectOfTheDay } from "./components/ObjectOfTheDay";
import { SearchBarAndFilters } from "./components/SearchBarAndFilters";
import { MasonryFeed } from "./components/MasonryFeed";
import { MemorialDetailModal } from "./components/MemorialDetailModal";
import { CreateMemorialModal } from "./components/CreateMemorialModal";
import { CursorMotionGradient } from "./components/CursorMotionGradient";
import { NewspaperTexture } from "./components/NewspaperTexture";
import { MemorialEmblem } from "./components/MemorialEmblem";
import { Plus, Newspaper } from "lucide-react";
import { getFallbackEngraving } from "./utils/imageFallback";

const STORAGE_KEY = "charamam_memorials_v4";
const OLD_STORAGE_KEY = "object_funeral_memorials_v2";

export const App: React.FC = () => {
  // Memorials state with localStorage persistence & automatic image sanitation
  const [memorials, setMemorials] = useState<Memorial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(OLD_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Sanitize any previously saved memorials that might have old 404 Unsplash links
          return parsed.map((item: Memorial) => {
            let img = item.imageUrl;
            if (!img || img.includes("photo-1582966770650-801137a0af76")) {
              img =
                "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80";
            } else if (img.includes("photo-1584990347449-399066606399")) {
              img =
                "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80";
            }
            return {
              ...item,
              imageUrl: img || getFallbackEngraving(item.name, item.category),
            };
          });
        }
      }
    } catch (e) {
      console.warn("Failed to parse saved memorials:", e);
    }
    return INITIAL_MEMORIALS;
  });

  // Navigation and filter state
  const [activeSection, setActiveSection] = useState<FilterSection>("all");
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals state
  const [selectedMemorial, setSelectedMemorial] = useState<Memorial | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  // Crisp newspaper texture intensity
  const [paperGrade, setPaperGrade] = useState<"crisp" | "vintage" | "heavy">("crisp");

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memorials));
    } catch (e) {
      console.error("Error saving memorials to localStorage:", e);
    }
  }, [memorials]);

  // Total stats
  const totalCandles = useMemo(() => {
    return memorials.reduce((acc, curr) => acc + (curr.candleCount || 0), 0);
  }, [memorials]);

  // The featured "Object of the Day"
  const objectOfTheDay = useMemo(() => {
    return memorials.find((m) => m.isObjectOfTheDay) || memorials[0];
  }, [memorials]);

  // Lighting a candle handler
  const handleLightCandle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMemorials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, candleCount: m.candleCount + 1 } : m)),
    );

    if (selectedMemorial && selectedMemorial.id === id) {
      setSelectedMemorial((prev) => (prev ? { ...prev, candleCount: prev.candleCount + 1 } : null));
    }
  };

  // Adding a condolence/comment
  const handleAddComment = (memorialId: string, text: string, author: string) => {
    const newComment: TributeComment = {
      id: `tribute-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      author,
      text,
      createdAt: "Just now",
    };

    setMemorials((prev) =>
      prev.map((m) => {
        if (m.id === memorialId) {
          return {
            ...m,
            comments: [newComment, ...m.comments],
          };
        }
        return m;
      }),
    );

    if (selectedMemorial && selectedMemorial.id === memorialId) {
      setSelectedMemorial((prev) =>
        prev ? { ...prev, comments: [newComment, ...prev.comments] } : null,
      );
    }
  };

  // Add newly created memorial
  const handleSaveMemorial = (newMemorial: Memorial) => {
    setMemorials((prev) => [newMemorial, ...prev]);
    setSelectedMemorial(newMemorial);
  };

  // Filtering based on search query, category, and section
  const filteredMemorials = useMemo(() => {
    return memorials.filter((m) => {
      // 1. Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = m.name.toLowerCase().includes(query);
        const matchesCause = m.causeOfDeath.toLowerCase().includes(query);
        const matchesObit = m.obituary.toLowerCase().includes(query);
        const matchesCat = m.category.toLowerCase().includes(query);
        if (!matchesName && !matchesCause && !matchesObit && !matchesCat) {
          return false;
        }
      }

      // 2. Category filter
      if (selectedCategory !== "All" && m.category !== selectedCategory) {
        return false;
      }

      // 3. Section filter
      if (activeSection === "recent") {
        return true;
      }
      if (activeSection === "mourned") {
        return m.candleCount >= 100;
      }
      if (activeSection === "questionable") {
        const triggers = [
          "mysterious",
          "moment",
          "stroke",
          "toddler",
          "drain",
          "angle",
          "scratched",
        ];
        const text = `${m.causeOfDeath} ${m.obituary}`.toLowerCase();
        return triggers.some((t) => text.includes(t));
      }
      if (activeSection === "forgotten") {
        return m.candleCount < 100;
      }

      return true;
    });
  }, [memorials, searchQuery, selectedCategory, activeSection]);

  return (
    <div className="min-h-screen flex flex-col font-newspaper bg-[#F7F3E8] text-[#1A1815] relative overflow-x-hidden">
      {/* Authentic Crisp Newsprint Texture Overlay */}
      <NewspaperTexture intensity={paperGrade} />

      {/* Interactive Cursor Movement: Motion Blur & Light Red Gradient */}
      <CursorMotionGradient />

      {/* Broadsheet Masthead Navbar */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        onOpenCreate={() => setIsCreateOpen(true)}
        totalMemorials={memorials.length}
        totalCandles={totalCandles}
      />

      {/* Breaking News Telegraph Wire Dispatch */}
      <ActivityTicker />

      {/* Main Newspaper Broadside Layout */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 relative z-10">
        {/* Broadsheet Banner & Sub-headline */}
        <section className="text-center py-4 sm:py-8 max-w-4xl mx-auto border-b-2 border-stone-900 pb-8 mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-12 bg-stone-900" />
            <span className="font-typewriter text-[11px] uppercase tracking-[0.25em] text-stone-700 font-bold">
              EST. MMXXIV • INDEPENDENT REPOSITORY OF DEPARTED GOODS
            </span>
            <span className="h-px w-12 bg-stone-900" />
          </div>

          <h1 className="font-headline text-4xl sm:text-6xl lg:text-7xl font-black text-[#1A1815] tracking-tight uppercase leading-none mb-3">
            “Where Useless Things Become Legends.”
          </h1>

          <p className="font-newspaper text-lg sm:text-2xl text-stone-800 italic max-w-2xl mx-auto leading-relaxed">
            The social chronicle honoring commodities that once meant absolutely nothing to anyone.
          </p>

          <div className="flex items-center justify-center gap-4 mt-5 text-xs font-typewriter uppercase tracking-wider text-stone-600">
            <span>Special Broadsheet Edition</span>
            <span>•</span>
            <span>Price: One Solemn Nod</span>
            <span>•</span>
            <span>All Columns Uncensored</span>
          </div>
        </section>

        {/* Featured Newspaper Front Page: Object of the Day */}
        {activeSection === "all" &&
          !searchQuery &&
          selectedCategory === "All" &&
          objectOfTheDay && (
            <ObjectOfTheDay
              memorial={objectOfTheDay}
              onOpenDetail={(m) => setSelectedMemorial(m)}
              onLightCandle={handleLightCandle}
            />
          )}

        {/* Section Heading & Breadcrumb in Broadsheet Style */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-4 border-b-2 border-stone-900 pb-2 gap-2">
          <div>
            <h2 className="font-headline text-xl sm:text-2xl font-black uppercase text-[#1A1815] tracking-wide">
              {activeSection === "all" && "The Archival Registry & Classified Column"}
              {activeSection === "recent" && "Recently Departed Commodities"}
              {activeSection === "mourned" && "Most Mourned Artifacts (100+ Candles)"}
              {activeSection === "questionable" && "Questionable & Bizarre Demises"}
              {activeSection === "forgotten" && "Forgotten Souls Awaiting Recognition"}
            </h2>
            <p className="font-typewriter text-xs text-stone-600">
              Displaying {filteredMemorials.length} cataloged obituaries in this broadside
            </p>
          </div>
        </div>

        {/* Search and Category Filter System */}
        <SearchBarAndFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Masonry Newspaper Columns Feed */}
        <MasonryFeed
          memorials={filteredMemorials}
          onOpenDetail={(m) => setSelectedMemorial(m)}
          onLightCandle={handleLightCandle}
        />
      </main>

      {/* Floating Create Button for mobile */}
      <div className="fixed bottom-5 right-5 z-30 sm:hidden">
        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 px-4 py-3 bg-[#1A1815] text-[#F7F3E8] shadow-[4px_4px_0px_#1A1815] border-2 border-stone-900 active:scale-95 font-headline font-bold text-xs uppercase"
        >
          <MemorialEmblem size={15} glow />
          <span>Inter An Object</span>
        </button>
      </div>

      {/* Solemn Broadsheet Editorial Footer */}
      <footer className="border-t-4 border-stone-900 bg-[#EFE8D8] py-8 px-4 text-center font-typewriter text-xs text-stone-700 space-y-2 mt-16 relative z-10">
        <div className="flex items-center justify-center gap-2">
          <MemorialEmblem size={16} glow />
          <span className="font-headline font-bold text-stone-950 tracking-wider text-sm uppercase">
            CHARAMAM • THE OBJECT FUNERAL SERVICE & GAZETTE™
          </span>
          <MemorialEmblem size={16} glow />
        </div>
        <p className="font-newspaper italic text-stone-700 max-w-md mx-auto text-sm">
          “They served without fanfare. They ceased without ceremony. Recorded forever in Charamam.”
        </p>

        {/* Tactile Newsprint Crispness / Grade Switcher */}
        <div className="pt-2 pb-1 flex flex-wrap items-center justify-center gap-2 text-[11px] font-typewriter">
          <span className="text-stone-600 uppercase tracking-wider flex items-center gap-1">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Newsprint Texture:</span>
          </span>
          <div className="inline-flex border border-stone-700 bg-[#FAF6ED] p-0.5">
            <button
              onClick={() => setPaperGrade("crisp")}
              className={`px-2.5 py-0.5 uppercase transition-all ${
                paperGrade === "crisp"
                  ? "bg-stone-900 text-stone-100 font-bold"
                  : "text-stone-700 hover:text-black"
              }`}
            >
              Crisp (Standard 45gsm)
            </button>
            <button
              onClick={() => setPaperGrade("vintage")}
              className={`px-2.5 py-0.5 uppercase transition-all ${
                paperGrade === "vintage"
                  ? "bg-stone-900 text-stone-100 font-bold"
                  : "text-stone-700 hover:text-black"
              }`}
            >
              Aged Broadsheet
            </button>
            <button
              onClick={() => setPaperGrade("heavy")}
              className={`px-2.5 py-0.5 uppercase transition-all ${
                paperGrade === "heavy"
                  ? "bg-stone-900 text-stone-100 font-bold"
                  : "text-stone-700 hover:text-black"
              }`}
            >
              Heavy Woodpulp
            </button>
          </div>
        </div>

        <p className="text-[11px] text-stone-500">
          All photographic plates and obituaries preserved in perpetuity. No manufacturer's warranty
          was honored in the publication of this gazette.
        </p>
      </footer>

      {/* Detail Dossier Modal */}
      <MemorialDetailModal
        memorial={selectedMemorial}
        onClose={() => setSelectedMemorial(null)}
        onLightCandle={handleLightCandle}
        onAddComment={handleAddComment}
      />

      {/* Create Registration Modal */}
      <CreateMemorialModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSaveMemorial={handleSaveMemorial}
      />
    </div>
  );
};

export default App;
