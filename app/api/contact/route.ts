import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, organisation, message, type, opportunity, interestLevel } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "hello@impactxmarkets.com";

    if (!resendApiKey) {
      // Fallback: log in dev; return success so the UI works during development
      console.log("[Contact form submission]", { name, email, organisation, message, type, opportunity, interestLevel });
      return NextResponse.json({ ok: true });
    }

    const subject =
      type === "enquire"
        ? `Opportunity enquiry: ${opportunity ?? "Unknown"} — ${name}`
        : `Access request: ${name}${organisation ? ` (${organisation})` : ""}`;

    const textBody = [
      `Type: ${type === "enquire" ? "Opportunity Enquiry" : "Access Request"}`,
      opportunity ? `Opportunity: ${opportunity}` : null,
      `Name: ${name}`,
      `Email: ${email}`,
      organisation ? `Organisation: ${organisation}` : null,
      interestLevel ? `Interest level: ${interestLevel}` : null,
      message ? `\nMessage:\n${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "ImpactX Markets <noreply@impactxmarkets.com>",
        to: [toEmail],
        reply_to: email,
        subject,
        text: textBody,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("[Resend error]", err);
      return NextResponse.json({ error: "Failed to send." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[Contact route error]", err);
    return NextResponse.json({ error: "Internal error." }, { status: 500 });
  }
}
