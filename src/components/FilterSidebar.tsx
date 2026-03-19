"use client";

import { Amenity, AMENITY_LABELS } from "@/types";

interface FilterSidebarProps {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  amenities: Amenity[];
  onAmenitiesChange: (amenities: Amenity[]) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const ALL_AMENITIES: Amenity[] = [
  "driving_range",
  "cart_included",
  "walking_allowed",
  "restaurant",
  "pro_shop",
  "lessons",
];

export default function FilterSidebar({
  priceRange,
  onPriceChange,
  minRating,
  onRatingChange,
  amenities,
  onAmenitiesChange,
  sortBy,
  onSortChange,
}: FilterSidebarProps) {
  const toggleAmenity = (amenity: Amenity) => {
    if (amenities.includes(amenity)) {
      onAmenitiesChange(amenities.filter((a) => a !== amenity));
    } else {
      onAmenitiesChange([...amenities, amenity]);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-5 space-y-6">
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Sort By</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-slate-700"
        >
          <option value="availability">Most Available</option>
          <option value="price_low">Price: Low to High</option>
          <option value="price_high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Price Range</h3>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => onPriceChange([parseInt(e.target.value) || 0, priceRange[1]])}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white dark:bg-slate-700"
            placeholder="Min"
          />
          <span className="text-gray-400">–</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value) || 300])}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm text-gray-900 dark:text-white dark:bg-slate-700"
            placeholder="Max"
          />
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Minimum Rating</h3>
        <div className="flex flex-wrap gap-1.5">
          {[0, 3, 3.5, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => onRatingChange(r)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                minRating === r
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 dark:bg-slate-600 text-gray-600 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-500"
              }`}
            >
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Amenities</h3>
        <div className="space-y-2">
          {ALL_AMENITIES.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={amenities.includes(amenity)}
                onChange={() => toggleAmenity(amenity)}
                className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
              />
              <span className="text-sm text-gray-700 dark:text-slate-300">{AMENITY_LABELS[amenity]}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          onPriceChange([0, 300]);
          onRatingChange(0);
          onAmenitiesChange([]);
          onSortChange("availability");
        }}
        className="w-full text-sm text-emerald-600 hover:text-emerald-700 font-medium"
      >
        Clear All Filters
      </button>
    </div>
  );
}
