import React, { useState } from "react";
import { Memorial } from "../types";
import { X, Send, Share2, Award } from "lucide-react";
import { MemorialEmblem } from "./MemorialEmblem";
import { handleImageError } from "../utils/imageFallback";

interface MemorialDetailModalProps {
  memorial: Memorial | null;
  onClose: () => void;
  onLightCandle: (id: string, e: React.MouseEvent) => void;
  onAddComment: (id: string, text: string, author: string) => void;
}

export const MemorialDetailModal: React.FC<MemorialDetailModalProps> = ({
  memorial,
  onClose,
  onLightCandle,
  onAddComment,
}) => {
  const [commentText, setCommentText] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [justLitCandle, setJustLitCandle] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  if (!memorial) return null;

  const handleCandleClick = (e: React.MouseEvent) => {
    onLightCandle(memorial.id, e);
    setJustLitCandle(true);
    setTimeout(() => setJustLitCandle(false), 1200);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(memorial.id, commentText.trim(), authorName.trim() || "Anonymous Mourner");
    setCommentText("");
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl crisp-newsprint border-4 border-[#1A1815] shadow-[10px_10px_0px_#1A1815] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Newspaper Archival Dossier Masthead */}
        <div className="bg-[#EFE8D8] border-b-2 border-stone-900 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-typewriter text-xs uppercase tracking-widest text-stone-900 font-bold">
              Archival Memorial Broadside • Dossier #{memorial.id}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-stone-800 hover:text-black rounded hover:bg-stone-200 text-xs flex items-center gap-1 font-newspaper"
              title="Copy citation"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {copiedNotification ? "Link Copied!" : "Cite Entry"}
              </span>
            </button>
            <button
              onClick={onClose}
              className="p-1 text-stone-800 hover:text-black rounded hover:bg-stone-200"
              aria-label="Close dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Scroll Area */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Photograph & Archival Mounting */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative bg-stone-100 p-3 sm:p-4 border-2 border-stone-900 shadow-xs">
                {/* Vintage photo corners */}
                <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-stone-900" />
                <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-stone-900" />
                <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-stone-900" />
                <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-stone-900" />

                <div className="overflow-hidden bg-stone-200 border border-stone-400 newsprint-halftone-plate">
                  <img
                    src={memorial.imageUrl}
                    alt={memorial.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(e, memorial.name, memorial.category)}
                    className="w-full h-auto object-cover max-h-[380px] grayscale contrast-125 sepia-[0.15]"
                  />
                </div>

                <div className="mt-3 text-center border-t border-stone-400 pt-2">
                  <p className="font-headline text-2xl font-bold uppercase text-stone-900">
                    {memorial.name}
                  </p>
                  <p className="font-typewriter text-xs text-stone-600 tracking-wider">
                    {memorial.bornYear} — {memorial.departedYear}
                  </p>
                </div>
              </div>

              {/* Humorous Object Statistics Box in Newspaper Table Style */}
              <div className="bg-[#EFE8D8] border-2 border-stone-900 p-4 shadow-xs">
                <div className="flex items-center gap-2 border-b border-stone-900 pb-1.5 mb-2.5">
                  <Award className="w-4 h-4 text-stone-900" />
                  <h4 className="font-typewriter text-xs uppercase tracking-widest text-stone-900 font-bold">
                    Official Object Ledger & Statistics
                  </h4>
                </div>
                <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs font-newspaper">
                  <div>
                    <dt className="text-stone-600 font-typewriter text-[10px] uppercase">
                      Years Served
                    </dt>
                    <dd className="font-bold text-stone-900">{memorial.stats.yearsServed}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-600 font-typewriter text-[10px] uppercase">
                      Known Owners
                    </dt>
                    <dd className="font-bold text-stone-900">{memorial.stats.knownOwners}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-600 font-typewriter text-[10px] uppercase">
                      Major Incidents
                    </dt>
                    <dd className="font-bold text-stone-900">{memorial.stats.majorIncidents}</dd>
                  </div>
                  <div>
                    <dt className="text-stone-600 font-typewriter text-[10px] uppercase">
                      Successful Repairs
                    </dt>
                    <dd className="font-bold text-stone-900">{memorial.stats.successfulRepairs}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-stone-600 font-typewriter text-[10px] uppercase">
                      Last Known Location
                    </dt>
                    <dd className="font-bold text-stone-900 italic">
                      {memorial.stats.lastKnownLocation}
                    </dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-stone-600 font-typewriter text-[10px] uppercase">
                      Historical Importance
                    </dt>
                    <dd className="font-bold text-stone-900">
                      {memorial.stats.historicalImportance}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Right Column: Inscription, Columns & Tributes */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-typewriter text-xs text-red-950 bg-red-100 border border-red-300 px-2 py-0.5 font-bold uppercase">
                    {memorial.category}
                  </span>
                  <span className="font-typewriter text-xs text-stone-600">
                    Departed in Year {memorial.departedYear}
                  </span>
                </div>
                <h1 className="font-headline text-3xl sm:text-5xl font-black text-[#1A1815] uppercase tracking-tight mb-2">
                  {memorial.name}
                </h1>
                <div className="w-full h-0.5 bg-[#1A1815] mb-4" />
              </div>

              {/* Cause of death inscription */}
              <div className="bg-[#EFE8D8] border-l-4 border-stone-900 p-3 sm:p-4">
                <span className="font-typewriter text-[10px] text-stone-600 uppercase tracking-widest block font-bold mb-1">
                  CAUSE OF DEMISE:
                </span>
                <p className="font-headline text-lg sm:text-xl text-stone-950 font-bold italic leading-snug">
                  “{memorial.causeOfDeath}”
                </p>
              </div>

              {/* Inscribed Obituary in newspaper format */}
              <div>
                <span className="font-typewriter text-[10px] text-stone-600 uppercase tracking-widest block font-bold mb-2">
                  OFFICIAL INSCRIBED OBITUARY:
                </span>
                <div className="bg-[#FDFBF7] border-2 border-stone-900 p-5 sm:p-6 relative">
                  <p className="font-newspaper text-base sm:text-lg text-stone-900 leading-relaxed newspaper-text-justify">
                    {memorial.obituary}
                  </p>
                  {memorial.story && (
                    <div className="mt-4 pt-4 border-t border-stone-300">
                      <span className="font-typewriter text-[10px] text-stone-600 uppercase tracking-wider block mb-1">
                        Eyewitness Chronicle / Final Story:
                      </span>
                      <p className="font-newspaper text-stone-800 text-sm leading-relaxed italic">
                        {memorial.story}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Candle Lighting Section with MemorialEmblem */}
              <div className="bg-[#EFE9DA] border-2 border-stone-900 p-4 sm:p-6 text-center space-y-3 shadow-xs">
                <div className="flex items-center justify-center gap-2">
                  <MemorialEmblem size={20} glow />
                  <h4 className="font-headline text-base font-bold text-stone-900 uppercase tracking-wider">
                    Light a Candle in Remembrance
                  </h4>
                  <MemorialEmblem size={20} glow />
                </div>
                <p className="font-newspaper text-xs sm:text-sm text-stone-700 max-w-md mx-auto">
                  {memorial.candleCount} solemn visitors have paid tribute to this fallen artifact.
                </p>
                <div className="pt-1">
                  <button
                    onClick={handleCandleClick}
                    className={`inline-flex items-center gap-2.5 px-6 py-3 bg-[#1A1815] text-[#F7F3E8] hover:bg-stone-800 active:scale-95 transition-all font-headline text-sm font-bold shadow-xs ${
                      justLitCandle ? "ring-4 ring-red-400/50 scale-105" : ""
                    }`}
                  >
                    <MemorialEmblem size={18} glow />
                    <span>Light Memorial Candle</span>
                    <span className="bg-stone-800 text-white px-2 py-0.5 rounded font-mono text-xs">
                      {memorial.candleCount}
                    </span>
                  </button>
                </div>
                {justLitCandle && (
                  <p className="text-xs font-newspaper text-red-900 font-bold italic animate-in fade-in">
                    The flame flickers in perpetual memory across the digital broadside.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Book of Condolences / Column Registry */}
          <div className="pt-6 border-t-4 border-stone-900 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-stone-900 pb-2">
              <h3 className="font-headline text-lg sm:text-xl font-bold uppercase text-[#1A1815]">
                Book of Condolences ({memorial.comments.length})
              </h3>
              <span className="font-typewriter text-xs text-stone-600">
                Official Public Registry
              </span>
            </div>

            {/* Post a condolence form */}
            <form
              onSubmit={handleSubmitComment}
              className="bg-[#EFE8D8] p-4 border-2 border-stone-900 space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Your Name / Title (e.g., Grieving Custodian)"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="sm:col-span-1 px-3 py-2 bg-[#FDFBF7] border border-stone-400 text-xs font-newspaper rounded-none focus:outline-none focus:border-stone-900"
                />
                <input
                  type="text"
                  placeholder="Leave a short condolence (e.g., 'F', 'Gone too soon', 'Never worked when needed')..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="sm:col-span-2 px-3 py-2 bg-[#FDFBF7] border border-stone-400 text-xs font-newspaper rounded-none focus:outline-none focus:border-stone-900"
                />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  {[
                    "Gone too soon.",
                    "Thank you for your service.",
                    "F.",
                    "Never worked anyway.",
                  ].map((quick) => (
                    <button
                      key={quick}
                      type="button"
                      onClick={() => setCommentText(quick)}
                      className="text-[11px] font-typewriter text-stone-700 bg-white hover:bg-stone-100 border border-stone-400 px-2 py-0.5 transition-colors hidden sm:inline-block"
                    >
                      + {quick}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-stone-900 text-stone-100 text-xs font-headline font-bold disabled:opacity-50 hover:bg-black transition-all ml-auto"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Inscribe Condolence</span>
                </button>
              </div>
            </form>

            {/* List of comments formatted like classified tributes */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
              {memorial.comments.length === 0 ? (
                <p className="font-newspaper text-sm italic text-stone-600 text-center py-4">
                  No condolences inscribed yet. Be the first to register your sorrow.
                </p>
              ) : (
                memorial.comments.map((comm) => (
                  <div
                    key={comm.id}
                    className="p-3 bg-[#FDFBF7] border border-stone-400 flex items-start justify-between gap-4"
                  >
                    <div>
                      <span className="font-typewriter text-xs font-bold uppercase text-stone-900">
                        {comm.author}:
                      </span>
                      <p className="font-newspaper text-sm text-stone-800 mt-0.5 italic">
                        “{comm.text}”
                      </p>
                    </div>
                    <span className="font-typewriter text-[10px] text-stone-500 shrink-0">
                      {comm.createdAt}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#EFE8D8] border-t-2 border-stone-900 px-6 py-3 flex items-center justify-between">
          <span className="font-typewriter text-[11px] text-stone-600 italic">
            Certified Broadsheet Dossier • Registered for posterity.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-stone-900 text-stone-100 text-xs font-headline uppercase font-bold hover:bg-black transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
