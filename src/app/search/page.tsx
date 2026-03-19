"use client";

import { useSearchParams } from "next/navigation";
import { useState, useMemo, Suspense } from "react";
import SearchBar from "@/components/SearchBar";
import CourseCard from "@/components/CourseCard";
import FilterSidebar from "@/components/FilterSidebar";
import NotificationSetup from "@/components/NotificationSetup";
import { courses } from "@/data/courses";
import { searchTeeTimes } from "@/data/tee-times";
import { Amenity } from "@/types";
import { getNext7Days } from "@/lib/utils";

function SearchContent() {
  const searchParams = useSearchParams();
  const days = getNext7Days();

  const date = searchParams.get("date") || days[0].value;
  const timeOfDay = searchParams.get("time") || "any";
  const location = searchParams.get("location") || "All Provinces";
  const players = parseInt(searchParams.get("players") || "2");

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300]);
  const [minRating, setMinRating] = useState(0);
  const [amenityFilters, setAmenityFilters] = useState<Amenity[]>([]);
  const [sortBy, setSortBy] = useState("availability");
  const [showAlert, setShowAlert] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => {
    const searchResults = searchTeeTimes({ date, timeOfDay, location, players });

    return searchResults
      .map(({ courseId, teeTimes }) => ({
        course: courses.find((c) => c.id === courseId)!,
        teeTimes,
      }))
      .filter(({ course, teeTimes }) => {
        if (!course) return false;
        const avgPrice = teeTimes.reduce((sum, tt) => sum + tt.price, 0) / teeTimes.length;
        if (avgPrice < priceRange[0] || avgPrice > priceRange[1]) return false;
        if (course.rating < minRating) return false;
        if (amenityFilters.length > 0 && !amenityFilters.every((a) => course.amenities.includes(a))) return false;
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price_low":
            return a.course.priceRange[0] - b.course.priceRange[0];
          case "price_high":
            return b.course.priceRange[1] - a.course.priceRange[1];
          case "rating":
            return b.course.rating - a.course.rating;
          default:
            return b.teeTimes.length - a.teeTimes.length;
        }
      });
  }, [date, timeOfDay, location, players, priceRange, minRating, amenityFilters, sortBy]);

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar
            variant="compact"
            initialDate={date}
            initialTime={timeOfDay}
            initialLocation={location}
            initialPlayers={players}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Results header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {results.length} {results.length === 1 ? "Course" : "Courses"} Available
            </h1>
            <p className="text-gray-500 dark:text-slate-400 text-sm">
              Showing tee times for {players} {players === 1 ? "player" : "players"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filters
            </button>
            <button
              onClick={() => setShowAlert(!showAlert)}
              className="flex items-center gap-1 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 hover:bg-emerald-100"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Set Alert
            </button>
          </div>
        </div>

        {showAlert && (
          <div className="mb-6 max-w-md">
            <NotificationSetup onClose={() => setShowAlert(false)} />
          </div>
        )}

        <div className="flex gap-6">
          {/* Sidebar */}
          <div className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-64 shrink-0`}>
            <FilterSidebar
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              minRating={minRating}
              onRatingChange={setMinRating}
              amenities={amenityFilters}
              onAmenitiesChange={setAmenityFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          {/* Results */}
          <div className="flex-1">
            {results.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-12 text-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No tee times found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filters, or set an alert to get notified when times open up.</p>
                <button
                  onClick={() => setShowAlert(true)}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Set Alert
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {results.map(({ course, teeTimes }) => (
                  <CourseCard key={course.id} course={course} teeTimes={teeTimes} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="bg-gray-50 dark:bg-slate-900 min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading search results...</div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
