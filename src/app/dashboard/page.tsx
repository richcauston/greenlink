"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { courses } from "@/data/courses";
import { Course, ALERT_TYPE_LABELS } from "@/types";
import CourseCard from "@/components/CourseCard";
import SearchBar from "@/components/SearchBar";
import UpgradePrompt from "@/components/UpgradePrompt";
import AlertSimulation from "@/components/AlertSimulation";
import { useUser } from "@/lib/user-context";

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

const mockProAlerts = [
  { id: "a1", courseId: "cabot-cliffs", courseName: "Cabot Cliffs", type: "cancellation" as const, active: true, channels: "SMS & Email", created: "2 days ago" },
  { id: "a2", courseId: "stewart-creek", courseName: "Stewart Creek Golf & Country Club", type: "price_drop" as const, active: true, channels: "SMS", created: "5 days ago" },
  { id: "a3", courseId: "kananaskis", courseName: "Kananaskis Country Golf Course", type: "specific_time" as const, active: true, channels: "Email", created: "1 week ago" },
  { id: "a4", courseId: "glen-abbey", courseName: "Glen Abbey Golf Course", type: "any_opening" as const, active: false, channels: "Push", created: "2 weeks ago" },
];

const mockAlertHistory = [
  { id: "h1", time: "Today, 10:34 AM", courseName: "Cabot Cliffs", message: "8:00 AM slot opened — cancellation detected", channel: "SMS", booked: true },
  { id: "h2", time: "Yesterday, 3:12 PM", courseName: "Stewart Creek", message: "Price dropped to $89 (was $139)", channel: "Email", booked: false },
  { id: "h3", time: "Mar 16, 9:45 AM", courseName: "Kananaskis", message: "10:30 AM slot available — 3 spots", channel: "Email", booked: true },
  { id: "h4", time: "Mar 15, 7:22 AM", courseName: "Cabot Cliffs", message: "7:15 AM early morning slot opened", channel: "SMS", booked: false },
];

export default function DashboardPage() {
  const { isPro } = useUser();
  const [favorites, setFavorites] = useState<Course[]>([]);
  const [activeTab, setActiveTab] = useState<"bookings" | "favorites" | "alerts">("bookings");
  const [showSimulation, setShowSimulation] = useState(false);

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
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              {isPro && (
                <span className="px-2.5 py-0.5 bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-300 text-xs font-bold rounded-full border border-violet-300 dark:border-violet-700">
                  PRO
                </span>
              )}
            </div>
            <p className="text-gray-500 dark:text-slate-400">
              {isPro ? "Manage your bookings, alerts, and favourites." : "Welcome back! Manage your bookings and favourites."}
            </p>
          </div>
          <div className="flex gap-2">
            {isPro && (
              <button
                onClick={() => setShowSimulation(true)}
                className="bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-300 px-4 py-2.5 rounded-lg hover:bg-violet-200 dark:hover:bg-violet-900/60 transition-colors font-medium text-sm border border-violet-300 dark:border-violet-700"
              >
                Simulate Alert
              </button>
            )}
            <Link
              href="/search"
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
            >
              Find Tee Times
            </Link>
          </div>
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
              {tab === "alerts" && isPro ? "Alerts (3)" : tab}
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
                  <Link href={`/course/${booking.courseId}`} className="text-sm text-emerald-600 hover:underline">
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
            {!isPro ? (
              /* Free User — Upgrade Prompt */
              <UpgradePrompt />
            ) : (
              /* Pro User — Full Alert Management */
              <>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Alerts</h2>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      {mockProAlerts.filter((a) => a.active).length} active alerts
                    </p>
                  </div>
                  <Link
                    href="/search"
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
                  >
                    + New Alert
                  </Link>
                </div>

                {/* Active Alerts */}
                <div className="space-y-3 mb-8">
                  {mockProAlerts.map((alert) => (
                    <div key={alert.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${alert.active ? "bg-emerald-100 dark:bg-emerald-900/40" : "bg-gray-100 dark:bg-slate-700"}`}>
                          <svg className={`w-5 h-5 ${alert.active ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{alert.courseName}</p>
                          <p className="text-sm text-gray-500 dark:text-slate-400">
                            {ALERT_TYPE_LABELS[alert.type]} &middot; {alert.channels} &middot; Set {alert.created}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          alert.active
                            ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                            : "bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400"
                        }`}>
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

                {/* Alert Activity History */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Alert Activity
                  </h3>
                  <div className="space-y-4">
                    {mockAlertHistory.map((event) => (
                      <div key={event.id} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                            event.booked
                              ? "bg-emerald-100 dark:bg-emerald-900/40"
                              : "bg-gray-100 dark:bg-slate-700"
                          }`}>
                            {event.booked ? (
                              <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{event.courseName}</p>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400 rounded-full">
                              via {event.channel}
                            </span>
                            {event.booked && (
                              <span className="text-xs px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full font-medium">
                                Booked
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-slate-300">{event.message}</p>
                          <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{event.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Alert Simulation Toast */}
      {showSimulation && (
        <AlertSimulation
          courseName="Cabot Cliffs"
          courseId="cabot-cliffs"
          time="8:00 AM"
          price={165}
          onDismiss={() => setShowSimulation(false)}
        />
      )}
    </div>
  );
}
