"use client";

import { useState } from "react";

const templates = [
  {
    id: "course-cold",
    title: "Cold Outreach to Golf Course Managers",
    subject: "Helping [Course Name] fill more tee times — at no cost",
    body: `Hi [Contact Name],

I'm reaching out because I'm building GreenLink, a tee time search platform designed specifically for Canadian golfers — and I think [Course Name] would be a great fit as a launch partner.

Here's the concept: golfers subscribe to GreenLink to search for available tee times across multiple courses in their area, set alerts for cancellations, and book instantly. Think of it like an Airbnb for golf tee times.

The key difference from other platforms: we never take a cut of your booking fees. GreenLink makes money from golfer subscriptions — your revenue stays 100% yours.

What we offer courses:
- Free exposure to thousands of golfers actively searching for tee times
- Real-time sync with your existing booking system (Lightspeed, Chrono Golf, etc.)
- Demand analytics showing when golfers search for your course
- Zero setup fees, zero booking fees, zero catch

We're inviting a limited number of courses to join as launch partners, and I'd love to include [Course Name]. Would you have 15 minutes this week for a quick call?

You can also learn more at [Your GreenLink URL]/for-courses

Looking forward to connecting,
[Your Name]
[Your Phone]`,
  },
  {
    id: "booking-system",
    title: "Partnership Outreach to Booking System Providers",
    subject: "API partnership inquiry — GreenLink tee time aggregator",
    body: `Hi [Contact Name / Partnership Team],

I'm the founder of GreenLink, a subscription-based tee time search platform launching in Canada. We're building the go-to destination for golfers to find and book tee times across multiple courses.

I'm reaching out to explore a partnership with [Lightspeed Golf / Chrono Golf]. Specifically, we'd like to integrate with your platform via API so that courses using your system can have their tee times automatically listed on GreenLink.

About GreenLink:
- Subscription model for golfers ($7.99/mo) — we do not charge courses or take booking fees
- Focused on the Canadian market (Ontario, BC, Alberta, Quebec to start)
- Features include real-time tee time search, cancellation alerts, and price drop notifications
- Currently onboarding launch partner courses

What we're looking for:
- API access to read tee time availability from partner courses
- Ability to deep-link or redirect bookings back to your platform
- Technical documentation for integration

This would be a win for your existing customers — more visibility and bookings at no additional cost to them.

Would you be open to a conversation about how we might work together? Happy to share our technical specs and business plan.

Best regards,
[Your Name]
[Your Email]
[Your Phone]`,
  },
  {
    id: "follow-up",
    title: "Follow-Up After Initial Conversation",
    subject: "Following up — GreenLink partnership for [Course Name]",
    body: `Hi [Contact Name],

Great speaking with you [yesterday / on Tuesday / at the event]. I really appreciated you taking the time to learn about GreenLink and share your thoughts on [specific thing they mentioned].

As discussed, here's a quick recap of how the partnership works:

1. We integrate with your booking system — your tee times appear on GreenLink automatically
2. Golfers find [Course Name] and book directly into your system
3. You keep 100% of your green fees — GreenLink charges golfers, not courses
4. You get access to our demand analytics dashboard

Next steps:
- I'll send over the technical integration details for [their booking system]
- If you could connect me with [their IT person / booking system contact], we can get the setup started
- Target launch: [timeline]

You can also share our course partner page with your team: [Your GreenLink URL]/for-courses

Let me know if you have any questions. I'm excited to have [Course Name] as one of our launch partners.

Cheers,
[Your Name]
[Your Phone]`,
  },
];

export default function OutreachPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Outreach Email Templates</h1>
          <p className="text-gray-500 dark:text-slate-400">
            Copy and customize these templates for reaching out to golf courses and booking system providers.
            Replace the [bracketed fields] with your specific details.
          </p>
        </div>

        <div className="space-y-8">
          {templates.map((template) => (
            <div key={template.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-5 border-b border-gray-200 dark:border-slate-700 flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">{template.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                    Subject: <span className="text-gray-700 dark:text-slate-300 font-medium">{template.subject}</span>
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => copyToClipboard(`Subject: ${template.subject}\n\n${template.body}`, template.id + "-all")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      copiedId === template.id + "-all"
                        ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400"
                        : "bg-emerald-600 text-white hover:bg-emerald-700"
                    }`}
                  >
                    {copiedId === template.id + "-all" ? "Copied!" : "Copy All"}
                  </button>
                </div>
              </div>
              <div className="p-5">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 dark:text-slate-300 font-sans leading-relaxed">
                  {template.body}
                </pre>
              </div>
              <div className="px-5 py-3 bg-gray-50 dark:bg-slate-700/50 flex justify-between items-center">
                <div className="flex flex-wrap gap-2">
                  {(template.body.match(/\[.*?\]/g) || [])
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .slice(0, 5)
                    .map((field) => (
                      <span key={field} className="text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                        {field}
                      </span>
                    ))}
                </div>
                <button
                  onClick={() => copyToClipboard(template.body, template.id + "-body")}
                  className={`text-sm transition-colors ${
                    copiedId === template.id + "-body"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white"
                  }`}
                >
                  {copiedId === template.id + "-body" ? "Copied!" : "Copy body only"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-6">
          <h3 className="font-semibold text-emerald-900 dark:text-emerald-300 mb-2">Tips for Outreach</h3>
          <ul className="space-y-1.5 text-sm text-emerald-800 dark:text-emerald-400">
            <li>&#8226; Personalize each email — mention something specific about the course</li>
            <li>&#8226; Keep it concise — busy course managers won&apos;t read long emails</li>
            <li>&#8226; Lead with the value to them (free exposure, no fees) not your product</li>
            <li>&#8226; Follow up within 5-7 days if you don&apos;t hear back</li>
            <li>&#8226; Attach or link to the <a href="/for-courses" className="underline font-medium">For Courses page</a> for credibility</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
