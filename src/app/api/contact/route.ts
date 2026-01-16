import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  eventType: z.string().min(1, "Please select an event type"),
  date: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  recaptchaToken: z.string().min(1, "reCAPTCHA token is required"),
});

const resend = new Resend(process.env.RESEND_API_KEY);

const rateLimitMap = new Map();

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
    if (!recaptchaSecret) {
      console.warn("Missing RECAPTCHA_SECRET_KEY environment variable");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

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

    const verification = await verifyResponse.json();
    const score = typeof verification.score === "number" ? verification.score : 0;

    if (!verification.success || score < 0.5) {
      return NextResponse.json(
        { error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
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
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: emailData?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
