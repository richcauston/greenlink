"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { PROVINCES } from "@/types";
import { getNext7Days } from "@/lib/utils";

interface SearchBarProps {
  variant?: "hero" | "compact";
  initialDate?: string;
  initialTime?: string;
  initialLocation?: string;
  initialPlayers?: number;
}

export default function SearchBar({
  variant = "hero",
  initialDate,
  initialTime,
  initialLocation,
  initialPlayers,
}: SearchBarProps) {
  const router = useRouter();
  const days = getNext7Days();

  const [date, setDate] = useState(initialDate || days[0].value);
  const [timeOfDay, setTimeOfDay] = useState(initialTime || "any");
  const [location, setLocation] = useState(initialLocation || "All Provinces");
  const [players, setPlayers] = useState(initialPlayers || 2);

  const handleSearch = () => {
    const params = new URLSearchParams({
      date,
      time: timeOfDay,
      location,
      players: players.toString(),
    });
    router.push(`/search?${params.toString()}`);
  };

  const isHero = variant === "hero";

  return (
    <div
      className={`${
        isHero
          ? "bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 md:p-8"
          : "bg-white dark:bg-slate-800 rounded-xl shadow-md p-4"
      }`}
    >
      <div className={`grid ${isHero ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" : "grid-cols-2 md:grid-cols-5 gap-3"}`}>
        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Date</label>
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-700"
          >
            {days.map((d) => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>

        {/* Time of Day */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Time</label>
          <select
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-700"
          >
            <option value="any">Any Time</option>
            <option value="early_morning">Early Morning (6-8am)</option>
            <option value="morning">Morning (8-11am)</option>
            <option value="afternoon">Afternoon (11am-3pm)</option>
            <option value="evening">Twilight (3pm+)</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-700"
          >
            {PROVINCES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Players */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Players</label>
          <select
            value={players}
            onChange={(e) => setPlayers(parseInt(e.target.value))}
            className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-3 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-700"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "Player" : "Players"}</option>
            ))}
          </select>
        </div>

        {/* Search Button - only shown in compact mode as 5th column */}
        {!isHero && (
          <div className="flex items-end col-span-2 md:col-span-1">
            <button
              onClick={handleSearch}
              className="w-full bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Search
            </button>
          </div>
        )}
      </div>

      {/* Search button for hero */}
      {isHero && (
        <button
          onClick={handleSearch}
          className="mt-4 w-full bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-semibold text-lg"
        >
          Search Tee Times
        </button>
      )}
    </div>
  );
}
