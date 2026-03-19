"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForCoursesPage() {
  const [form, setForm] = useState({ name: "", courseName: "", email: "", bookingSystem: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/partner-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1920&h=800&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-block bg-emerald-600/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium mb-4 border border-emerald-600/30">
              For Golf Courses
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Fill Your Tee Sheet.
              <br />
              <span className="text-emerald-400">Zero Booking Fees.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              GreenLink sends golfers directly to your course at no cost. We charge golfers a small
              subscription — not you. More rounds booked, more revenue for your course.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#partner-form" className="bg-emerald-600 text-white px-8 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-semibold">
                Become a Partner
              </a>
              <a href="#how-it-works" className="bg-white/10 text-white px-8 py-3 rounded-xl hover:bg-white/20 transition-colors font-medium border border-white/20">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Why Courses Partner With Us</h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
            GreenLink is built to help courses, not take from them.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "No Booking Fees",
                desc: "We never take a cut of your green fees. Golfers pay us a subscription — your revenue stays yours.",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Free Exposure",
                desc: "Your course appears in front of thousands of golfers actively searching for tee times in your area.",
                icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
              },
              {
                title: "Demand Analytics",
                desc: "See when golfers are searching for your course, what times are most popular, and where demand is unmet.",
                icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-md">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-slate-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">How It Works for Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Connect", desc: "Link your existing booking system (Lightspeed Golf, Chrono Golf, or others). We integrate seamlessly with your current setup." },
              { step: "2", title: "List", desc: "Your available tee times appear automatically on GreenLink. No manual entry needed — we sync in real-time with your tee sheet." },
              { step: "3", title: "Fill", desc: "Golfers find your course, book directly, and you get paid in full. We handle the discovery — you handle the golf." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-slate-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "500+", label: "Courses Invited" },
              { value: "100K+", label: "Golfers Searching" },
              { value: "$0", label: "Cost to Courses" },
              { value: "60s", label: "Avg. Alert Speed" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold">{stat.value}</p>
                <p className="text-emerald-100 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">What Course Operators Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "GreenLink helped us fill midweek slots we were struggling with. The best part? It costs us nothing.",
                name: "Sarah M.",
                role: "General Manager",
                course: "Lakeview Golf Club, ON",
              },
              {
                quote: "The demand analytics alone are worth it. We now know exactly when golfers are searching for us.",
                name: "David K.",
                role: "Director of Golf",
                course: "Mountain Ridge Golf, BC",
              },
              {
                quote: "Unlike other platforms, GreenLink doesn't take a cut. Our revenue stays our revenue. Simple as that.",
                name: "Jean-Pierre L.",
                role: "Owner",
                course: "Club de Golf Tremblant, QC",
              },
            ].map((t) => (
              <div key={t.name} className="bg-white dark:bg-slate-700 rounded-xl p-6 shadow-md">
                <div className="flex gap-1 text-emerald-500 mb-3">
                  {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                </div>
                <p className="text-gray-600 dark:text-slate-300 text-sm mb-4 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500 dark:text-slate-400">{t.role} — {t.course}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 dark:text-slate-500 mt-6">
            * Testimonials are illustrative examples for the prototype.
          </p>
        </div>
      </section>

      {/* Compatible Systems */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Works With Your Booking System</h2>
          <p className="text-gray-500 dark:text-slate-400 mb-8">We integrate with the platforms you already use.</p>
          <div className="flex flex-wrap justify-center gap-6">
            {["Lightspeed Golf", "Chrono Golf", "foreUP", "Club Prophet", "Jonas Club", "Custom/Other"].map((system) => (
              <div key={system} className="bg-gray-100 dark:bg-slate-800 px-6 py-3 rounded-xl text-gray-700 dark:text-slate-300 font-medium text-sm border border-gray-200 dark:border-slate-700">
                {system}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Form */}
      <section id="partner-form" className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Become a Partner</h2>
          <p className="text-center text-gray-500 dark:text-slate-400 mb-8">
            Fill out the form below and we&apos;ll be in touch within 24 hours.
          </p>

          {submitted ? (
            <div className="bg-white dark:bg-slate-700 rounded-2xl shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Thanks for Your Interest!</h3>
              <p className="text-gray-500 dark:text-slate-400">
                We&apos;ve received your inquiry for <strong>{form.courseName}</strong> and will be in touch within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-700 rounded-2xl shadow-md p-6 md:p-8 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Smith"
                    className="w-full border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-2.5 bg-white dark:bg-slate-600 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                    Course Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.courseName}
                    onChange={(e) => setForm({ ...form, courseName: e.target.value })}
                    placeholder="Pine Valley Golf Club"
                    required
                    className="w-full border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-2.5 bg-white dark:bg-slate-600 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="manager@golfcourse.ca"
                  required
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-2.5 bg-white dark:bg-slate-600 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Current Booking System</label>
                <select
                  value={form.bookingSystem}
                  onChange={(e) => setForm({ ...form, bookingSystem: e.target.value })}
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-2.5 bg-white dark:bg-slate-600 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select...</option>
                  <option value="Lightspeed Golf">Lightspeed Golf</option>
                  <option value="Chrono Golf">Chrono Golf</option>
                  <option value="foreUP">foreUP</option>
                  <option value="Club Prophet">Club Prophet</option>
                  <option value="Jonas Club">Jonas Club Software</option>
                  <option value="Other">Other / Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Message (optional)</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your course..."
                  rows={3}
                  className="w-full border border-gray-300 dark:border-slate-600 rounded-xl px-4 py-2.5 bg-white dark:bg-slate-600 dark:text-white focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 text-white py-3 rounded-xl hover:bg-emerald-700 transition-colors font-semibold disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Partner Inquiry"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "Does it cost anything for my course?", a: "No. GreenLink is completely free for courses. We make money from golfer subscriptions, not booking fees. Your revenue stays 100% yours." },
              { q: "How does integration work?", a: "We connect to your existing booking system (Lightspeed, Chrono Golf, etc.) via their API. Your tee times sync automatically — no manual entry needed." },
              { q: "Will this affect my existing booking flow?", a: "Not at all. Golfers who find you through GreenLink book directly into your system. It's just another channel sending you customers." },
              { q: "What if I use a custom booking system?", a: "We can work with custom setups too. Reach out through the form above and we'll discuss integration options for your specific system." },
              { q: "Can I control which tee times appear?", a: "Yes. You'll have a partner dashboard where you can manage visibility, set blackout times, and control what's listed." },
            ].map((faq) => (
              <details key={faq.q} className="bg-white dark:bg-slate-800 rounded-xl shadow-md group">
                <summary className="px-6 py-4 cursor-pointer font-medium text-gray-900 dark:text-white flex justify-between items-center list-none">
                  {faq.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-gray-600 dark:text-slate-300 text-sm">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
