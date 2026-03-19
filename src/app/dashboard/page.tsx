"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { courses } from "@/data/courses";
import { Course } from "@/types";
import CourseCard from "@/components/CourseCard";
import SearchBar from "@/components/SearchBar";

const mockBookings = [
  {
    id: "b1",
    courseId: "glen-abbey",
    courseName: "Glen Abbey Golf Course",
    date: new Date(Date.now() + 2 * 86400000).toISOString().split("T")[0],
    time: "09:24",
    players: 4,
    totalPrice: 580,
    status: "confirmed" as const,
  },
  {
    id: "b2",
    courseId: "tobiano",
    courseName: "Tobiano Golf Course",
    date: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    time: "11:08",
    players: 2,
    totalPrice: 298,
    status: "confirmed" as const,
  },
];

const mockAlerts = [
  { id: "a1", courseId: "cabot-cliffs", courseName: "Cabot Cliffs", type: "any_opening", active: true },
  { id: "a2", courseId: "stewart-creek", courseName: "Stewart Creek Golf & Country Club", type: "price_drop", active: true },
  { id: "a3", courseId: "kananaskis", courseName: "Kananaskis Country Golf Course", type: "specific_time", active: false },
];

export default function DashboardPage() {
  const [favorites, setFavorites] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<"bookings" | "favorites" | "alerts">("bookings");

  useEffect(() => {
    const favIds: string[] = JSON.parse(localStorage.getItem("greenlink_favorites") || "[]");
    setFavorites(courses.filter((c) => favIds.includes(c.id)));
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-500 dark:text-slate-400">Welcome back! Manage your bookings, favorites, and alerts.</p>
          </div>
          <Link
            href="/search"
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
          >
            Find Tee Times
          </Link>
        </div>

        {/* Quick Search */}
        <div className="mb-8">
          <SearchBar variant="compact" />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white dark:bg-slate-800 rounded-xl shadow-md p-1 mb-6 max-w-md">
          {(["bookings", "favorites", "alerts"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? "bg-emerald-600 text-white"
                  : "text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Bookings</h2>
            {mockBookings.map((booking) => (
              <div key={booking.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-5 flex flex-col md:flex-row justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{booking.courseName}</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      {new Date(booking.date + "T12:00:00").toLocaleDateString("en-CA", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                      })} at{" "}
                      {(() => {
                        const [h, m] = booking.time.split(":");
                        const hour = parseInt(h);
                        return `${hour > 12 ? hour - 12 : hour}:${m} ${hour >= 12 ? "PM" : "AM"}`;
                      })()}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      {booking.players} players &middot; ${booking.totalPrice} CAD
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-200">
                    {booking.status}
                  </span>
                  <Link
                    href={`/course/${booking.courseId}`}
                    className="text-sm text-emerald-600 hover:underline"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === "favorites" && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Favourite Courses</h2>
            {favorites.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-12 text-center">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <p className="text-gray-500 dark:text-slate-400 mb-3">No favourite courses yet.</p>
                <Link href="/search" className="text-emerald-600 hover:underline text-sm font-medium">
                  Browse courses to add favourites
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {favorites.map((course) => (
                  <CourseCard key={course.id} course={course} showTeeTimes={false} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === "alerts" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Alerts</h2>
              <Link href="/search" className="text-sm text-emerald-600 hover:underline">
                + New Alert
              </Link>
            </div>
            <div className="space-y-3">
              {mockAlerts.map((alert) => (
                <div key={alert.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${alert.active ? "bg-emerald-100" : "bg-gray-100"}`}>
                      <svg className={`w-5 h-5 ${alert.active ? "text-emerald-600" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{alert.courseName}</p>
                      <p className="text-sm text-gray-500 dark:text-slate-400">
                        {alert.type === "any_opening" && "Any opening"}
                        {alert.type === "price_drop" && "Price drop"}
                        {alert.type === "specific_time" && "Specific time"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${alert.active ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-500 dark:text-slate-400"}`}>
                      {alert.active ? "Active" : "Paused"}
                    </span>
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Notification Preferences */}
            <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h3>
              <div className="space-y-3">
                {[
                  { label: "Email notifications", desc: "Receive alerts via email", defaultChecked: true },
                  { label: "SMS notifications", desc: "Receive alerts via text message", defaultChecked: true },
                  { label: "Push notifications", desc: "Receive alerts in your browser", defaultChecked: false },
                  { label: "Weekly digest", desc: "Summary of upcoming availability", defaultChecked: true },
                ].map((pref) => (
                  <label key={pref.label} className="flex items-center justify-between cursor-pointer">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{pref.label}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{pref.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked={pref.defaultChecked}
                      className="w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
