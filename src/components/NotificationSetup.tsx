"use client";

import { useState } from "react";
import { useUser } from "@/lib/user-context";
import { AlertType, ALERT_TYPE_LABELS } from "@/types";
import { getNext7Days, formatTime } from "@/lib/utils";
import UpgradePrompt from "./UpgradePrompt";

interface NotificationSetupProps {
  courseName?: string;
  courseId?: string;
  onClose?: () => void;
  onAlertSet?: () => void;
}

export default function NotificationSetup({ courseName, onClose, onAlertSet }: NotificationSetupProps) {
  const { isPro } = useUser();
  const [type, setType] = useState<AlertType>("cancellation");
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [timeWindows, setTimeWindows] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState("");
  const [channels, setChannels] = useState({ email: true, sms: true, push: false });
  const [step, setStep] = useState<"config" | "preview" | "confirmed">("config");

  const days = getNext7Days();

  if (!isPro) {
    return (
      <div>
        <UpgradePrompt compact />
        {onClose && (
          <button onClick={onClose} className="mt-2 w-full text-sm text-gray-500 dark:text-slate-400 hover:underline">
            Close
          </button>
        )}
      </div>
    );
  }

  const toggleDate = (date: string) => {
    setSelectedDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date]
    );
  };

  const toggleChannel = (ch: keyof typeof channels) => {
    setChannels((prev) => ({ ...prev, [ch]: !prev[ch] }));
  };

  // Generate a realistic notification preview
  const getPreviewMessage = () => {
    const time = timeWindows.includes("morning") ? "8:12 AM" : timeWindows.includes("afternoon") ? "1:24 PM" : "10:36 AM";
    const name = courseName || "Glen Abbey Golf Course";
    switch (type) {
      case "cancellation":
        return `Cancellation alert! ${name} — ${time} slot just freed up. 2 spots available. Book now before it's gone!`;
      case "any_opening":
        return `New tee time! ${name} has a ${time} opening tomorrow. Tap to book instantly.`;
      case "specific_time":
        return `Your preferred time is available! ${name} — ${time} slot open. This won't last long!`;
      case "price_drop":
        return `Price drop! ${name} — ${time} now $${maxPrice || "79"} (was $120). Book this deal now.`;
    }
  };

  if (step === "confirmed") {
    return (
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5">
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-lg">Alert Set!</h3>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
            We&apos;ll notify you via {[channels.sms && "SMS", channels.email && "email", channels.push && "push"].filter(Boolean).join(" & ")} when{" "}
            {type === "cancellation" ? "a cancellation happens" : type === "price_drop" ? "the price drops" : "a tee time opens up"} at{" "}
            <strong>{courseName || "your selected course"}</strong>.
          </p>
        </div>

        {/* Notification Preview */}
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
            Here&apos;s what your notification will look like:
          </p>
          {channels.sms && (
            <div className="bg-gray-100 dark:bg-slate-700 rounded-xl p-4 mb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">GL</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">GreenLink</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">SMS &middot; Just now</p>
                </div>
              </div>
              <p className="text-sm text-gray-800 dark:text-slate-200">{getPreviewMessage()}</p>
              <div className="mt-2 flex gap-2">
                <span className="text-xs bg-emerald-600 text-white px-3 py-1 rounded-full font-medium">Book Now</span>
                <span className="text-xs bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-slate-300 px-3 py-1 rounded-full">Dismiss</span>
              </div>
            </div>
          )}
          {channels.email && !channels.sms && (
            <div className="bg-gray-100 dark:bg-slate-700 rounded-xl p-4">
              <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">From: alerts@greenlink.ca</p>
              <p className="text-xs font-semibold text-gray-900 dark:text-white mb-2">
                Tee Time Alert — {courseName || "Your Course"}
              </p>
              <p className="text-sm text-gray-800 dark:text-slate-200">{getPreviewMessage()}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              onAlertSet?.();
              onClose?.();
            }}
            className="flex-1 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
          >
            Done
          </button>
          <button
            onClick={() => setStep("config")}
            className="px-4 py-2 text-sm text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white"
          >
            Edit
          </button>
        </div>
      </div>
    );
  }

  if (step === "preview") {
    return (
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5">
        <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Preview Your Alert
        </h3>

        <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3 mb-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-slate-400">Course</span>
            <span className="text-gray-900 dark:text-white font-medium">{courseName || "All Courses"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-slate-400">Alert Type</span>
            <span className="text-gray-900 dark:text-white font-medium">{ALERT_TYPE_LABELS[type]}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-slate-400">Time Window</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {timeWindows.length === 0 ? "Any Time" : timeWindows.map((tw) => {
                const labels: Record<string, string> = { early_morning: "Early Morning", morning: "Morning", afternoon: "Afternoon", evening: "Twilight" };
                return labels[tw] || tw;
              }).join(", ")}
            </span>
          </div>
          {selectedDates.length > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">Dates</span>
              <span className="text-gray-900 dark:text-white font-medium">{selectedDates.length} selected</span>
            </div>
          )}
          {type === "price_drop" && maxPrice && (
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-slate-400">Max Price</span>
              <span className="text-gray-900 dark:text-white font-medium">${maxPrice}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-slate-400">Notify Via</span>
            <span className="text-gray-900 dark:text-white font-medium">
              {[channels.sms && "SMS", channels.email && "Email", channels.push && "Push"].filter(Boolean).join(", ")}
            </span>
          </div>
        </div>

        {/* SMS Preview */}
        <p className="text-xs font-medium text-gray-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
          Notification Preview
        </p>
        <div className="bg-gray-100 dark:bg-slate-700 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">GL</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">GreenLink Alert</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">{channels.sms ? "SMS" : channels.email ? "Email" : "Push"} &middot; Just now</p>
            </div>
          </div>
          <p className="text-sm text-gray-800 dark:text-slate-200">{getPreviewMessage()}</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setStep("confirmed")}
            className="flex-1 bg-emerald-600 text-white py-2.5 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold"
          >
            Confirm Alert
          </button>
          <button
            onClick={() => setStep("config")}
            className="px-4 py-2 text-sm text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-white"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // Config step
  return (
    <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-5">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          Set Alert {courseName && <span className="text-sm font-normal text-gray-500 dark:text-slate-400">for {courseName}</span>}
        </h3>
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Alert Type */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Alert me when:</label>
        <div className="grid grid-cols-2 gap-2">
          {(["cancellation", "any_opening", "specific_time", "price_drop"] as AlertType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                type === t
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
            >
              {ALERT_TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Preferred Dates */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
          Preferred dates <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {days.map((d) => (
            <button
              key={d.value}
              onClick={() => toggleDate(d.value)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedDates.includes(d.value)
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Time Window - Multi Select */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
          Time windows <span className="text-gray-400 font-normal">(select multiple)</span>
        </label>
        <div className="flex flex-wrap gap-1.5">
          {([
            { value: "early_morning", label: "Early (6-8am)" },
            { value: "morning", label: "Morning (8-11am)" },
            { value: "afternoon", label: "Afternoon (11-3pm)" },
            { value: "evening", label: "Twilight (3pm+)" },
          ]).map((tw) => (
            <button
              key={tw.value}
              onClick={() =>
                setTimeWindows((prev) =>
                  prev.includes(tw.value) ? prev.filter((t) => t !== tw.value) : [...prev, tw.value]
                )
              }
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                timeWindows.includes(tw.value)
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600"
              }`}
            >
              {tw.label}
            </button>
          ))}
        </div>
        {timeWindows.length === 0 && (
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">No selection = any time</p>
        )}
      </div>

      {/* Price threshold for price_drop */}
      {type === "price_drop" && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
            Alert when price drops below
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">$</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="100"
              className="w-full border border-gray-300 dark:border-slate-600 rounded-lg pl-7 pr-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-slate-700"
            />
          </div>
        </div>
      )}

      {/* Notification Channels */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Notify me via:</label>
        <div className="flex gap-3">
          {([
            { key: "sms" as const, label: "SMS", icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
            { key: "email" as const, label: "Email", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
            { key: "push" as const, label: "Push", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
          ]).map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => toggleChannel(key)}
              className={`flex-1 flex flex-col items-center gap-1 p-2.5 rounded-lg text-xs font-medium transition-colors ${
                channels[key]
                  ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                  : "bg-gray-50 dark:bg-slate-700 text-gray-400 dark:text-slate-500 border border-gray-200 dark:border-slate-600"
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icon} />
              </svg>
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => setStep("preview")}
        disabled={!channels.email && !channels.sms && !channels.push}
        className="w-full bg-emerald-600 text-white py-2.5 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Preview & Set Alert
      </button>
    </div>
  );
}
