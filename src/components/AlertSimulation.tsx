"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface AlertSimulationProps {
  courseName: string;
  courseId: string;
  time?: string;
  price?: number;
  onDismiss: () => void;
}

export default function AlertSimulation({ courseName, courseId, time = "8:12 AM", price = 89, onDismiss }: AlertSimulationProps) {
  const [visible, setVisible] = useState(false);
  const [stage, setStage] = useState<"incoming" | "shown">("incoming");

  useEffect(() => {
    // Slight delay for dramatic effect
    const t1 = setTimeout(() => setVisible(true), 300);
    const t2 = setTimeout(() => setStage("shown"), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full animate-slide-in">
      {stage === "incoming" ? (
        <div className="bg-emerald-600 text-white rounded-xl p-4 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-2 border-white/50 border-t-white rounded-full animate-spin" />
            <span className="text-sm font-medium">Checking for tee times...</span>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 px-4 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <span className="text-white text-sm font-semibold">GreenLink Alert</span>
            </div>
            <button onClick={onDismiss} className="text-white/70 hover:text-white">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              Tee time just opened up!
            </p>
            <p className="text-sm text-gray-600 dark:text-slate-300 mb-3">
              <strong>{courseName}</strong> — {time} slot available at ${price}/player.
              Someone just cancelled!
            </p>
            <div className="flex gap-2">
              <Link
                href={`/course/${courseId}`}
                className="flex-1 bg-emerald-600 text-white text-center py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
              >
                Book Now
              </Link>
              <button
                onClick={onDismiss}
                className="px-4 py-2 text-sm text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white rounded-lg bg-gray-100 dark:bg-slate-700"
              >
                Later
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-4 py-2 bg-gray-50 dark:bg-slate-700/50 text-xs text-gray-400 dark:text-slate-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Alert triggered 12 seconds ago &middot; via SMS & Email
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}
