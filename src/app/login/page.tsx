"use client";

import { useState } from "react";
import Link from "next/link";

export default function WaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center px-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">You&apos;re on the List!</h2>
          <p className="text-gray-500 dark:text-slate-400 mb-6">
            Thanks{name ? `, ${name}` : ""}! We&apos;ll let you know as soon as GreenLink launches in your area.
            You&apos;ll be among the first to find and book tee times across Canada.
          </p>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 mb-6">
            <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">
              Know a golf course that should partner with us?
            </p>
            <Link href="/for-courses" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
              Send them our partner page &rarr;
            </Link>
          </div>
          <Link
            href="/"
            className="inline-block w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-6">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            Green<span className="text-emerald-600 dark:text-emerald-400">Link</span>
          </span>
          <p className="text-gray-500 dark:text-slate-400 mt-2">
            The easiest way to find and book tee times across Canada.
          </p>
        </div>

        {/* Waitlist count */}
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 mb-6 text-center">
          <p className="text-sm text-emerald-800 dark:text-emerald-300 font-medium">
            Join <strong>847 golfers</strong> already on the waitlist
          </p>
        </div>

        {/* What you get */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Get Early Access</h2>
          <ul className="space-y-2">
            {[
              "Search tee times across hundreds of Canadian courses",
              "Instant alerts when your favourite courses have openings",
              "Book cancellation slots before anyone else",
              "Exclusive founding member pricing",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-600 dark:text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Name <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white dark:bg-slate-700 dark:text-white"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Joining..." : "Join the Waitlist"}
          </button>
        </form>

        <p className="text-xs text-gray-400 dark:text-slate-500 text-center mt-4">
          No spam, ever. We&apos;ll only email you about the launch.
        </p>

        {/* Course partner CTA */}
        <div className="border-t border-gray-200 dark:border-slate-700 mt-6 pt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-slate-400">Are you a golf course?</p>
          <Link href="/for-courses" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
            Learn about partnering with GreenLink &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
