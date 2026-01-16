import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  eventType: z.string().min(1, "Please select an event type"),
  date: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  recaptchaToken: z.string().min(1, "reCAPTCHA token is required").optional(),
});

const rateLimitMap = new Map();

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY || process.env.NEXT_PUBLIC_RESEND_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Resend(apiKey);
}

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0] : "unknown";
  return ip;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 5;

  const record = rateLimitMap.get(key);

  if (!record) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    setTimeout(() => rateLimitMap.delete(key), windowMs);
    return true;
  }

  if (now > record.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const rateLimitKey = getRateLimitKey(req);

    if (!checkRateLimit(rateLimitKey)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validationResult = contactSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: validationResult.error },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;

    let verification: any = null;
    if (recaptchaSecret && data.recaptchaToken) {
      try {
        const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: recaptchaSecret,
            response: data.recaptchaToken,
            remoteip: rateLimitKey,
          }),
          cache: "no-store",
        });
        verification = await verifyResponse.json();
      } catch (err) {
        console.error("reCAPTCHA verification request failed", err);
        return NextResponse.json(
          { error: "Unable to verify reCAPTCHA right now. Please try again." },
          { status: 502 }
        );
      }

      const score = typeof verification?.score === "number" ? verification.score : 0;
      if (!verification?.success || score < 0.5) {
        return NextResponse.json(
          { error: "reCAPTCHA verification failed" },
          { status: 400 }
        );
      }
    } else {
      console.warn("Skipping reCAPTCHA verification (missing key or token)");
    }

    const yourEmail = process.env.YOUR_EMAIL || "jeesonfranz@gmail.com";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #4a90d9; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Event Type:</strong> ${data.eventType}</p>
          ${data.date ? `<p><strong>Event Date:</strong> ${data.date}</p>` : ""}
        </div>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px;">
          <p style="margin: 0 0 10px 0; font-weight: bold;">Message:</p>
          <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
        </div>
        
        <p style="color: #666; font-size: 12px; margin-top: 30px;">
          This message was sent from the contact form on jeeson.in
        </p>
      </div>
    `;

    const resend = getResendClient();
    if (!resend) {
      console.error("Email sending error: RESEND_API_KEY is not configured on the server.");
      return NextResponse.json(
        { error: "Email service not configured. Please set RESEND_API_KEY." },
        { status: 500 }
      );
    }

    const { data: emailData, error } = await resend.emails.send({
      from: "Jeeson Franz Website <onboarding@resend.dev>",
      to: yourEmail,
      subject: `New Booking Inquiry from ${data.name}`,
      html: emailHtml,
      replyTo: data.email,
    });

    if (error) {
      console.error("Email sending error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: emailData?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    const message =
      error instanceof Error ? error.message : typeof error === "string" ? error : "Unexpected server error";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
