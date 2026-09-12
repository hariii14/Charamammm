import React from "react";
import { Category } from "../types";
import { Search, X } from "lucide-react";

interface SearchBarAndFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: Category;
  onSelectCategory: (category: Category) => void;
}

const CATEGORIES: Category[] = [
  "All",
  "Electronics",
  "Stationery",
  "Clothing",
  "Furniture",
  "Toys",
  "Household",
  "Miscellaneous",
];

export const SearchBarAndFilters: React.FC<SearchBarAndFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full mb-8 sm:mb-10 space-y-4">
      {/* Search Input styled like broadsheet query box */}
      <div className="relative max-w-2xl mx-auto">
        <div className="relative flex items-center border-2 border-stone-900 bg-[#FAF6ED] shadow-[3px_3px_0px_#1A1815]">
          <Search className="absolute left-3.5 w-4 h-4 text-stone-700 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search the obituary archives… (e.g., USB, broken, pencil, lost)"
            className="w-full pl-10 pr-10 py-3 bg-transparent text-sm sm:text-base font-newspaper text-stone-950 placeholder:text-stone-500 placeholder:italic focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 text-stone-500 hover:text-stone-900 p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex items-center justify-between text-[10px] font-typewriter text-stone-600 px-1 mt-1.5">
          <span>CLASSIFIED INDEX SEARCH</span>
          <span>QUERY COVERS DEMISES, TITLES & BACKSTORIES</span>
        </div>
      </div>

      {/* Category Pills styled as newspaper index tags */}
      <div className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 pt-1">
        {CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`px-3 py-1 text-xs font-headline uppercase tracking-wider transition-all border ${
                isSelected
                  ? "bg-[#1A1815] text-[#F7F3E8] border-[#1A1815] font-bold shadow-xs"
                  : "bg-[#EFE9DA] text-stone-800 border-stone-400 hover:border-stone-900 hover:bg-[#E3DCC9]"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
};
