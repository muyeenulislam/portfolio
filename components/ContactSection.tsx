"use client";

import Image from "next/image";
import { useState } from "react";
import type { FormEvent } from "react";

import type { SocialLink } from "@/data/cvData";

import { GlassCard } from "@/components/GlassCard";
import { SectionReveal } from "@/components/SectionReveal";
import { SectionHeading } from "@/components/SectionHeading";

type ContactSectionProps = {
  email: string;
  phone: string;
  location: string;
  contactVisual: string;
  socials: ReadonlyArray<SocialLink>;
};

function readableEmail(emailHref: string) {
  return emailHref.replace("mailto:", "");
}

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

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
  contactVisual,
  socials,
}: ContactSectionProps) {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    setStatus(null);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload: { message?: string } = await response.json();

      if (!response.ok) {
        setStatus(payload.message ?? "Failed to send message.");
        return;
      }

      setStatus(payload.message ?? "Message sent successfully.");
      setForm(initialFormState);
    } catch {
      setStatus("Something went wrong while sending your message.");
    } finally {
      setIsSending(false);
    }
  }

  function updateField<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  return (
    <section id="contact" className="anchor-offset section-screen">
      <div className="section-content">
        <SectionHeading
          label="Contact"
          title="Let&apos;s Build Something Impactful"
          description="Open to product collaborations, frontend architecture work, and full stack engineering opportunities."
        />
        <SectionReveal>
          <GlassCard className="card-hover overflow-hidden">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="relative overflow-hidden rounded-2xl border border-brand-200/20 bg-black/30 p-4 sm:p-5">
                <div className="relative mb-5 h-44 overflow-hidden rounded-xl">
                  <Image
                    src={contactVisual}
                    alt="Contact visual"
                    fill
                    className="object-cover transition duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-brand-100">Direct Reach</h3>
                <div className="mt-4 space-y-2 text-sm text-brand-200/85 sm:text-base">
                  <p>
                    <span className="text-brand-200/70">Email:</span>{" "}
                    <a href={email} className="text-brand-100 underline-offset-4 hover:underline">
                      {readableEmail(email)}
                    </a>
                  </p>
                  <p>
                    <span className="text-brand-200/70">Phone:</span> {phone}
                  </p>
                  <p>
                    <span className="text-brand-200/70">Location:</span> {location}
                  </p>
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold text-brand-100">Profiles</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-brand-200/30 bg-brand-700/20 px-4 py-2 text-sm text-brand-100 transition hover:-translate-y-0.5 hover:border-brand-200/60 hover:bg-brand-700/35"
                    >
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>

              <form
                onSubmit={handleSubmit}
                className="grid gap-3 rounded-2xl border border-brand-200/20 bg-black/30 p-4 sm:p-5"
              >
                <h3 className="font-heading text-2xl font-semibold text-brand-100">Send a Message</h3>
                <label className="text-xs font-semibold tracking-wide text-brand-200/80 uppercase">
                  Name
                  <input
                    type="text"
                    required
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
                    value={form.subject}
                    onChange={(event) => updateField("subject", event.target.value)}
                    className="mt-1 w-full rounded-xl border border-brand-200/20 bg-brand-950/70 px-3 py-2 text-sm text-brand-100 outline-none transition focus:border-brand-500/80"
                  />
                </label>
                <label className="text-xs font-semibold tracking-wide text-brand-200/80 uppercase">
                  Message
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(event) => updateField("message", event.target.value)}
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
                {status ? <p className="text-sm text-brand-100/90">{status}</p> : null}
              </form>
            </div>
          </GlassCard>
        </SectionReveal>
      </div>
    </section>
  );
}
