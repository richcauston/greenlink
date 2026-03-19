"use client";

import Link from "next/link";

interface UpgradePromptProps {
  feature?: string;
  compact?: boolean;
}

export default function UpgradePrompt({ feature = "alerts", compact = false }: UpgradePromptProps) {
  if (compact) {
    return (
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="font-semibold text-gray-900 dark:text-white text-sm">Pro Feature</span>
        </div>
        <p className="text-xs text-gray-600 dark:text-slate-400 mb-3">
          Upgrade to set unlimited {feature} and never miss a tee time.
        </p>
        <Link
          href="/pricing"
          className="inline-block bg-emerald-600 text-white px-4 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
        >
          Upgrade to Pro
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl flex items-center justify-center shrink-0">
          <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            Unlock Tee Time Alerts with Pro
          </h3>
          <p className="text-gray-600 dark:text-slate-300 text-sm mb-4">
            Get instant notifications when tee times open up at your favourite courses.
            Set alerts for cancellations, specific time slots, or price drops.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {[
              { icon: "bell", text: "Cancellation alerts" },
              { icon: "clock", text: "Specific time notifications" },
              { icon: "dollar", text: "Price drop alerts" },
              { icon: "zap", text: "Notified in under 60 seconds" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-gray-700 dark:text-slate-300">{item.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/pricing"
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors font-semibold text-sm"
            >
              Get Pro — $7.99/mo
            </Link>
            <span className="text-xs text-gray-500 dark:text-slate-400">14-day free trial. Cancel anytime.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
