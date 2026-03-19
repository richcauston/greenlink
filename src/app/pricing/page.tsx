import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Get started with basic tee time search",
    features: [
      "Search available tee times",
      "View up to 5 results per search",
      "Basic course information",
      "Community support",
    ],
    notIncluded: [
      "Unlimited search results",
      "Real-time alerts & notifications",
      "Favourite courses",
      "Priority booking",
      "Booking history",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "GreenLink Pro",
    price: "$7.99",
    period: "/month CAD",
    description: "Everything you need to never miss a tee time",
    features: [
      "Unlimited tee time search",
      "All search results & filters",
      "Real-time SMS & email alerts",
      "Favourite courses with notifications",
      "Priority booking access",
      "Full booking history",
      "Price drop alerts",
      "Waitlist notifications",
      "Dedicated support",
    ],
    notIncluded: [],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "GreenLink Pro Annual",
    price: "$69.99",
    period: "/year CAD",
    description: "Save 27% with annual billing",
    features: [
      "Everything in Pro",
      "2 months free",
      "Early access to new features",
      "Exclusive partner course deals",
    ],
    notIncluded: [],
    cta: "Start Free Trial",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes! GreenLink Pro comes with a 14-day free trial. No credit card required to start.",
  },
  {
    q: "What happens to my bookings if I cancel?",
    a: "Your existing bookings remain confirmed even if you cancel your subscription. You just won't be able to make new bookings through the platform.",
  },
  {
    q: "Do I get charged during the off-season?",
    a: "Your subscription stays active year-round at the same low rate. Many golfers find value in setting up alerts early for the spring season.",
  },
  {
    q: "How do the alerts work?",
    a: "Set alerts for specific courses, time slots, or price thresholds. When a matching tee time becomes available, you'll get an instant notification via your preferred method (SMS, email, or push).",
  },
];

export default function PricingPage() {
  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white dark:text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-500 dark:text-slate-400 max-w-2xl mx-auto">
            One low subscription fee. No booking fees, no hidden charges. Just easy access to tee times across Canada.
          </p>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white dark:bg-slate-800 rounded-2xl shadow-md p-6 flex flex-col ${
                plan.highlighted ? "ring-2 ring-emerald-600 shadow-lg relative" : ""
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{plan.name}</h3>
                <p className="text-gray-500 dark:text-slate-400 text-sm mb-4">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                  {plan.period && <span className="text-gray-500 dark:text-slate-400 ml-1">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <svg className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span className="text-gray-400">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/login"
                className={`w-full py-3 rounded-xl text-center font-semibold transition-colors ${
                  plan.highlighted
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-600"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.q} className="bg-white dark:bg-slate-800 rounded-xl shadow-md group">
              <summary className="px-6 py-4 cursor-pointer font-medium text-gray-900 dark:text-white flex justify-between items-center list-none">
                {faq.q}
                <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-gray-600 dark:text-slate-300 text-sm">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-emerald-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-3">Ready to Find Your Next Tee Time?</h2>
          <p className="text-emerald-100 text-lg mb-6 max-w-xl mx-auto">
            Join thousands of Canadian golfers who never miss a tee time. Start your 14-day free trial today.
          </p>
          <Link
            href="/login"
            className="inline-block bg-white text-emerald-700 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}
