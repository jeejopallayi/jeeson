"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  eventType: z.string().min(1, "Please select an event type"),
  date: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (!recaptchaSiteKey) return;
    if (document.querySelector("#recaptcha-script")) return;

    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
    script.async = true;
    script.defer = true;
    script.id = "recaptcha-script";
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const getRecaptchaToken = () =>
    new Promise<string | null>((resolve, reject) => {
      if (!recaptchaSiteKey) {
        resolve(null);
        return;
      }

      const grecaptcha = (window as any).grecaptcha;
      if (!grecaptcha) {
        reject(new Error("reCAPTCHA not loaded yet. Please try again."));
        return;
      }

      grecaptcha.ready(() => {
        grecaptcha
          .execute(recaptchaSiteKey, { action: "contact" })
          .then((token: string) => resolve(token))
          .catch((err: unknown) =>
            reject(err instanceof Error ? err : new Error("Failed to execute reCAPTCHA"))
          );
      });
    });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const recaptchaToken = await getRecaptchaToken();

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });

      const raw = await response.text();
      let result: { error?: string; success?: boolean } = {};

      try {
        result = raw ? JSON.parse(raw) : {};
      } catch (parseError) {
        console.error("Failed to parse response JSON:", parseError, raw);
        result = { error: raw || "Unexpected server response" };
      }

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      alert(error instanceof Error ? error.message : "Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Section className="pt-32 pb-12 bg-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-400">
            Book Jeeson Franz for your next event.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <p className="text-gray-400 mb-8">
                For bookings, collaborations, and inquiries, please reach out via phone, email, or the contact form.
              </p>
              
              <div className="space-y-6">
                <Card className="flex items-center gap-4 p-4 border-none bg-secondary/30">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href="tel:+917012694870" className="text-lg font-bold hover:text-primary transition-colors">+91 7012 69 4870</a>
                  </div>
                </Card>

                <Card className="flex items-center gap-4 p-4 border-none bg-secondary/30">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href="mailto:jeesonfranz@gmail.com" className="text-lg font-bold hover:text-primary transition-colors">jeesonfranz@gmail.com</a>
                  </div>
                </Card>

                <Card className="flex items-center gap-4 p-4 border-none bg-secondary/30">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-lg font-bold">Bangalore, India</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-white/10">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.886539092!2d77.49085516328125!3d12.953959988118836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1703000000000!5m2!1sen!2sin" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               />
            </div>
          </div>

          {/* Contact Form */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <input
                    {...register("name")}
                    className={cn(
                      "flex h-10 w-full rounded-md border border-white/10 bg-black px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
                      errors.name && "border-red-500 focus-visible:ring-red-500"
                    )}
                    placeholder="Your Name"
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  <input
                    {...register("phone")}
                    className={cn(
                      "flex h-10 w-full rounded-md border border-white/10 bg-black px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
                      errors.phone && "border-red-500 focus-visible:ring-red-500"
                    )}
                    placeholder="+91..."
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                  {...register("email")}
                  type="email"
                  className={cn(
                    "flex h-10 w-full rounded-md border border-white/10 bg-black px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
                    errors.email && "border-red-500 focus-visible:ring-red-500"
                  )}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <label htmlFor="eventType" className="text-sm font-medium">Event Type</label>
                    <select
                      {...register("eventType")}
                      className={cn(
                        "flex h-10 w-full rounded-md border border-white/10 bg-black px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
                        errors.eventType && "border-red-500 focus-visible:ring-red-500"
                      )}
                    >
                      <option value="">Select Type</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="wedding">Wedding</option>
                      <option value="private">Private Party</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.eventType && <p className="text-xs text-red-500">{errors.eventType.message}</p>}
                 </div>
                 <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium">Event Date (Optional)</label>
                    <input
                      {...register("date")}
                      type="date"
                      className="flex h-10 w-full rounded-md border border-white/10 bg-black px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 [color-scheme:dark]"
                    />
                 </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea
                  {...register("message")}
                  className={cn(
                    "flex min-h-[120px] w-full rounded-md border border-white/10 bg-black px-3 py-2 text-sm placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
                    errors.message && "border-red-500 focus-visible:ring-red-500"
                  )}
                  placeholder="Tell me about your event..."
                />
                {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Send Message
                  </>
                )}
              </Button>
              
              {isSuccess && (
                <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 rounded-md text-sm text-center">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </form>
          </Card>
        </div>
      </Section>
    </>
  );
}
