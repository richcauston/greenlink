"use client";

import Link from "next/link";
import { Course, TeeTime, AMENITY_LABELS } from "@/types";
import { formatPrice, formatTime } from "@/lib/utils";
import FavoriteButton from "./FavoriteButton";

interface CourseCardProps {
  course: Course;
  teeTimes?: TeeTime[];
  showTeeTimes?: boolean;
}

export default function CourseCard({ course, teeTimes = [], showTeeTimes = true }: CourseCardProps) {
  const displayTeeTimes = teeTimes.slice(0, 4);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={course.image}
          alt={course.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&h=500&fit=crop";
          }}
        />
        <div className="absolute top-3 right-3">
          <FavoriteButton courseId={course.id} />
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-2 py-1 rounded-md text-sm font-medium">
            {course.holes} Holes &middot; Par {course.par}
          </span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <Link href={`/course/${course.id}`} className="hover:underline">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{course.name}</h3>
          </Link>
          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap ml-2">
            {formatPrice(course.priceRange[0])}–{formatPrice(course.priceRange[1])}
          </span>
        </div>

        <p className="text-sm text-gray-500 dark:text-slate-400 mb-2">
          {course.city}, {course.province}
        </p>

        <div className="flex items-center gap-1.5 mb-3 flex-wrap">
          <span className="text-yellow-500 text-sm shrink-0">{"★".repeat(Math.floor(course.rating))}</span>
          <span className="text-sm text-gray-600 dark:text-slate-300 shrink-0">{course.rating}</span>
          <span className="text-sm text-gray-400 dark:text-slate-500 shrink-0">({course.reviewCount} reviews)</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {course.amenities.slice(0, 4).map((a) => (
            <span key={a} className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 px-2 py-0.5 rounded-full">
              {AMENITY_LABELS[a]}
            </span>
          ))}
          {course.amenities.length > 4 && (
            <span className="text-xs bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 px-2 py-0.5 rounded-full">
              +{course.amenities.length - 4} more
            </span>
          )}
        </div>

        {showTeeTimes && displayTeeTimes.length > 0 && (
          <div>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-1.5 font-medium">Available tee times:</p>
            <div className="flex flex-wrap gap-1.5">
              {displayTeeTimes.map((tt) => (
                <Link
                  key={tt.id}
                  href={`/course/${course.id}?date=${tt.date}`}
                  className="text-xs bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-md hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors border border-emerald-200 dark:border-emerald-800"
                >
                  {formatTime(tt.time)} &middot; {formatPrice(tt.price)}
                </Link>
              ))}
              {teeTimes.length > 4 && (
                <Link
                  href={`/course/${course.id}`}
                  className="text-xs text-emerald-600 dark:text-emerald-400 px-2.5 py-1 hover:underline"
                >
                  +{teeTimes.length - 4} more
                </Link>
              )}
            </div>
          </div>
        )}

        <Link
          href={`/course/${course.id}`}
          className="mt-3 block w-full text-center bg-gray-900 dark:bg-emerald-600 text-white py-2 rounded-lg hover:bg-gray-800 dark:hover:bg-emerald-700 transition-colors text-sm font-medium"
        >
          View Course & Book
        </Link>
      </div>
    </div>
  );
}
