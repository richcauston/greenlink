"use client";

import { useState } from "react";

interface NotificationSetupProps {
  courseName?: string;
  courseId?: string;
  onClose?: () => void;
}

export default function NotificationSetup({ courseName, onClose }: NotificationSetupProps) {
  const [type, setType] = useState<"any_opening" | "specific_time" | "price_drop">("any_opening");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
        <svg className="w-8 h-8 text-emerald-600 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <p className="text-emerald-800 font-medium">Alert set!</p>
        <p className="text-emerald-600 text-sm">
          We&apos;ll notify you when {courseName || "a matching tee time"} becomes available.
        </p>
        {onClose && (
          <button onClick={onClose} className="mt-2 text-sm text-emerald-600 underline">
            Close
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        Set Alert {courseName && `for ${courseName}`}
      </h3>

      <div className="space-y-2 mb-4">
        {[
          { value: "any_opening" as const, label: "Any opening becomes available" },
          { value: "specific_time" as const, label: "Specific time slot opens up" },
          { value: "price_drop" as const, label: "Price drops below a threshold" },
        ].map((option) => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="alert-type"
              checked={type === option.value}
              onChange={() => setType(option.value)}
              className="w-4 h-4 text-emerald-600"
            />
            <span className="text-sm text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm text-gray-600">Notify via:</span>
        <label className="flex items-center gap-1 text-sm">
          <input type="checkbox" defaultChecked className="w-3.5 h-3.5 text-emerald-600 rounded" />
          Email
        </label>
        <label className="flex items-center gap-1 text-sm">
          <input type="checkbox" defaultChecked className="w-3.5 h-3.5 text-emerald-600 rounded" />
          SMS
        </label>
        <label className="flex items-center gap-1 text-sm">
          <input type="checkbox" className="w-3.5 h-3.5 text-emerald-600 rounded" />
          Push
        </label>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setSubmitted(true)}
          className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
        >
          Set Alert
        </button>
        {onClose && (
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
