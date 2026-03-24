"use client";

import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";
import type { SubmitEvent } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { createPortal } from "react-dom";

import type { SocialLink } from "@/data/cvData";
import hiAnimation from "@/public/hiAnimation.json";

import { GlassCard } from "@/components/glass-card";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/cn";

type ContactSectionProps = {
  email: string;
  phone: string;
  location: string;
  socials: ReadonlyArray<SocialLink>;
};

function readableEmail(emailHref: string) {
  return emailHref.replace("mailto:", "");
}

function getSocialIcon(label: string) {
  const normalized = label.toLowerCase();
  if (normalized.includes("github")) return FaGithub;
  if (normalized.includes("linkedin")) return FaLinkedinIn;
  return null;
}

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ToastState = {
  message: string;
  tone: "success" | "error";
} | null;

const initialFormState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactSection({
  email,
  phone,
  location,
  socials,
}: ContactSectionProps) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<ToastState>({
    message: "asdasd",
    tone: "success",
  });
  const [isClient, setIsClient] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsClient(true);

    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }
    };
  }, []);

  function showToast(message: string, tone: "success" | "error") {
    setToast({ message, tone });

    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }

    toastTimeoutRef.current = setTimeout(() => {
      setToast(null);
    }, 5000);
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload: { message?: string } = await response.json();

      if (!response.ok) {
        showToast(payload.message ?? "Failed to send message.", "error");
        return;
      }

      showToast(payload.message ?? "Message sent successfully.", "success");
      setForm(initialFormState);
    } catch {
      showToast("Something went wrong while sending your message.", "error");
    } finally {
      setIsSending(false);
    }
  }

  function updateField<K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  const toastUi = (
    <div
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed top-24 right-4 z-200 w-[min(20rem,calc(100%-2rem))] transition-all duration-300",
        toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
      )}
    >
      <div
        className={cn(
          "rounded-xl border px-4 py-3 text-sm font-medium shadow-2xl backdrop-blur-xl",
          toast?.tone === "success"
            ? "border-emerald-300/45 bg-emerald-500/15 text-emerald-100"
            : "border-rose-300/45 bg-rose-500/15 text-rose-100",
        )}
      >
        {toast?.message}
      </div>
    </div>
  );

  return (
    <section id="contact" className="anchor-offset section-screen">
      <div className="section-content">
        <SectionHeading
          label="Contact"
          title="Let's Build Something Impactful"
          description="Open to product collaborations, frontend architecture work, and full stack engineering opportunities."
        />
        <GlassCard className="overflow-hidden">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-2xl border border-brand-200/20 bg-black/30 p-4 sm:p-5">
              <div className="relative mb-5 h-44 overflow-hidden">
                <Lottie
                  animationData={hiAnimation}
                  loop
                  autoplay
                  className="h-full w-full"
                />
              </div>
              <h3 className="font-heading text-2xl font-semibold text-brand-100">
                Direct Reach
              </h3>
              <div className="mt-4 space-y-2 text-sm text-brand-200/85 sm:text-base">
                <p>
                  <span className="text-brand-200/70">Email:</span>{" "}
                  <a
                    href={email}
                    className="text-brand-100 underline-offset-4 hover:underline"
                  >
                    {readableEmail(email)}
                  </a>
                </p>
                <p>
                  <span className="text-brand-200/70">Phone:</span> {phone}
                </p>
                <p>
                  <span className="text-brand-200/70">Location:</span>{" "}
                  {location}
                </p>
              </div>
              <h3 className="mt-6 font-heading text-xl font-semibold text-brand-100">
                Profiles
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {socials.map((social) => {
                  const Icon = getSocialIcon(social.label);
                  if (!Icon) return null;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-200/30 bg-brand-700/20 text-brand-100 transition hover:-translate-y-0.5 hover:border-brand-200/60 hover:bg-brand-700/35"
                    >
                      <Icon size={"1rem"} />
                    </a>
                  );
                })}
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid gap-3 rounded-2xl border border-brand-200/20 bg-black/30 p-4 sm:p-5"
            >
              <h3 className="font-heading text-2xl font-semibold text-brand-100">
                Send a Message
              </h3>
              <label className="text-xs font-semibold tracking-wide text-brand-200/80 uppercase">
                Name
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className="mt-1 w-full rounded-xl border border-brand-200/20 bg-brand-950/70 px-3 py-2 text-sm text-brand-100 outline-none transition focus:border-brand-500/80"
                />
              </label>
              <label className="text-xs font-semibold tracking-wide text-brand-200/80 uppercase">
                Email
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className="mt-1 w-full rounded-xl border border-brand-200/20 bg-brand-950/70 px-3 py-2 text-sm text-brand-100 outline-none transition focus:border-brand-500/80"
                />
              </label>
              <label className="text-xs font-semibold tracking-wide text-brand-200/80 uppercase">
                Subject
                <input
                  type="text"
                  required
                  placeholder="How can I help?"
                  value={form.subject}
                  onChange={(event) =>
                    updateField("subject", event.target.value)
                  }
                  className="mt-1 w-full rounded-xl border border-brand-200/20 bg-brand-950/70 px-3 py-2 text-sm text-brand-100 outline-none transition focus:border-brand-500/80"
                />
              </label>
              <label className="text-xs font-semibold tracking-wide text-brand-200/80 uppercase">
                Message
                <textarea
                  required
                  rows={4}
                  placeholder="Write your message here..."
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  className="mt-1 w-full resize-none rounded-xl border border-brand-200/20 bg-brand-950/70 px-3 py-2 text-sm text-brand-100 outline-none transition focus:border-brand-500/80"
                />
              </label>
              <button
                type="submit"
                disabled={isSending}
                className="mt-2 inline-flex items-center justify-center rounded-xl border border-brand-200/35 bg-brand-700/35 px-4 py-2 text-sm font-semibold text-brand-100 transition hover:scale-[1.01] hover:bg-brand-700/55 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </GlassCard>
      </div>
      {isClient ? createPortal(toastUi, document.body) : null}
    </section>
  );
}
