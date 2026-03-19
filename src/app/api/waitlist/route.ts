import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { name, email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.NOTIFY_EMAIL;

    if (!apiKey || apiKey === "re_YOUR_API_KEY_HERE" || !notifyEmail) {
      // No Resend configured — log to console instead
      console.log(`[WAITLIST SIGNUP] Name: ${name || "N/A"}, Email: ${email}`);
      return NextResponse.json({ success: true, message: "Logged (Resend not configured)" });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "GreenLink Waitlist <onboarding@resend.dev>",
      to: notifyEmail,
      subject: `New Waitlist Signup: ${email}`,
      html: `
        <h2>New GreenLink Waitlist Signup</h2>
        <p><strong>Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" })}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">This notification was sent from your GreenLink waitlist form.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ error: "Failed to process signup" }, { status: 500 });
  }
}
