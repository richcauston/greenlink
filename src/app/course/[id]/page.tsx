"use client";

import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import { courses } from "@/data/courses";
import { getTeeTimesForCourse } from "@/data/tee-times";
import { AMENITY_LABELS, TeeTime } from "@/types";
import { formatDate, formatPrice, getNext7Days } from "@/lib/utils";
import TeeTimeSlot from "@/components/TeeTimeSlot";
import BookingModal from "@/components/BookingModal";
import FavoriteButton from "@/components/FavoriteButton";
import NotificationSetup from "@/components/NotificationSetup";
import Link from "next/link";

export default function CourseDetailPage() {
  const params = useParams();
  const course = courses.find((c) => c.id === params.id);
  const days = getNext7Days();

  const [selectedDate, setSelectedDate] = useState(days[0].value);
  const [bookingTeeTime, setBookingTeeTime] = useState<TeeTime | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const teeTimes = useMemo(() => {
    if (!course) return [];
    return getTeeTimesForCourse(course.id, selectedDate);
  }, [course, selectedDate]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h1>
          <Link href="/search" className="text-emerald-600 hover:underline">Back to Search</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* Hero */}
      <div className="relative h-64 md:h-80">
        <img
          src={course.image}
          alt={course.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1920&h=600&fit=crop";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-7xl mx-auto flex justify-between items-end">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{course.name}</h1>
              <p className="text-white/80">
                {course.city}, {course.province} &middot; {course.holes} Holes &middot; Par {course.par}
              </p>
            </div>
            <FavoriteButton courseId={course.id} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course info */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">{"★".repeat(Math.floor(course.rating))}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{course.rating}</span>
                  <span className="text-gray-400">({course.reviewCount} reviews)</span>
                </div>
                <span className="text-emerald-600 font-semibold">
                  {formatPrice(course.priceRange[0])}–{formatPrice(course.priceRange[1])}
                </span>
                <span className="text-gray-400">{course.yards.toLocaleString()} yards</span>
              </div>

              <p className="text-gray-600 dark:text-slate-300 mb-4">{course.description}</p>

              <div className="flex flex-wrap gap-2">
                {course.amenities.map((a) => (
                  <span key={a} className="text-sm bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                    {AMENITY_LABELS[a]}
                  </span>
                ))}
              </div>
            </div>

            {/* Tee times */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Available Tee Times</h2>

              {/* Date selector */}
              <div className="flex gap-2 overflow-x-auto pb-4 mb-4">
                {days.map((day) => (
                  <button
                    key={day.value}
                    onClick={() => setSelectedDate(day.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      selectedDate === day.value
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>

              <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
                {formatDate(selectedDate)} &middot; {teeTimes.length} tee times available
              </p>

              {teeTimes.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-slate-400 mb-3">No tee times available for this date.</p>
                  <button
                    onClick={() => setShowNotification(true)}
                    className="text-emerald-600 hover:underline text-sm font-medium"
                  >
                    Set an alert for openings
                  </button>
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {teeTimes.map((tt) => (
                    <TeeTimeSlot key={tt.id} teeTime={tt} onBook={setBookingTeeTime} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Course Details</h3>
              <dl className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-slate-400">Address</dt>
                  <dd className="text-gray-900 text-right">{course.address}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-slate-400">Phone</dt>
                  <dd className="text-gray-900 dark:text-white">{course.phone}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-slate-400">Holes</dt>
                  <dd className="text-gray-900 dark:text-white">{course.holes}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-slate-400">Par</dt>
                  <dd className="text-gray-900 dark:text-white">{course.par}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-slate-400">Yards</dt>
                  <dd className="text-gray-900 dark:text-white">{course.yards.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500 dark:text-slate-400">Booking System</dt>
                  <dd className="text-gray-900 dark:text-white">{course.bookingSystem}</dd>
                </div>
              </dl>
            </div>

            {/* Notification setup */}
            {showNotification ? (
              <NotificationSetup
                courseName={course.name}
                courseId={course.id}
                onClose={() => setShowNotification(false)}
              />
            ) : (
              <button
                onClick={() => setShowNotification(true)}
                className="w-full bg-white rounded-xl shadow-md p-4 text-left hover:shadow-lg transition-shadow flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Set Alerts</p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">Get notified when tee times open up</p>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingTeeTime && (
        <BookingModal
          teeTime={bookingTeeTime}
          course={course}
          onClose={() => setBookingTeeTime(null)}
        />
      )}
    </div>
  );
}
