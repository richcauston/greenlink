import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { name, courseName, email, bookingSystem, message } = await req.json();

    if (!email || !email.includes("@") || !courseName) {
      return NextResponse.json({ error: "Email and course name required" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.NOTIFY_EMAIL;

    if (!apiKey || apiKey === "re_YOUR_API_KEY_HERE" || !notifyEmail) {
      console.log(`[PARTNER INQUIRY] Name: ${name}, Course: ${courseName}, Email: ${email}, System: ${bookingSystem}`);
      return NextResponse.json({ success: true, message: "Logged (Resend not configured)" });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "GreenLink Partners <onboarding@resend.dev>",
      to: notifyEmail,
      subject: `Partner Inquiry: ${courseName}`,
      html: `
        <h2>New GreenLink Partner Inquiry</h2>
        <p><strong>Contact Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Course:</strong> ${courseName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Booking System:</strong> ${bookingSystem || "Not specified"}</p>
        ${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
        <p><strong>Time:</strong> ${new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" })}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">This inquiry was sent from the GreenLink "For Courses" page.</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Partner inquiry error:", error);
    return NextResponse.json({ error: "Failed to process inquiry" }, { status: 500 });
  }
}
