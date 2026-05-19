"use client";

import { useState } from "react";

const inputClass =
  "h-10 px-3 bg-white/5 border border-white/15 rounded-sm text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-green/40 focus:border-brand-green/60 transition-colors";

const labelClass = "text-sm font-medium text-white/70";

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    organisation: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", organisation: "", message: "" });
    }, 800);
  };

  if (status === "success") {
    return (
      <div className={`bg-brand-green/10 border border-brand-green/20 rounded-sm p-8 text-center ${className}`}>
        <div className="w-10 h-10 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-4">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10l4 4 8-8" stroke="#00e890" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="text-white font-semibold mb-2">Request received</h3>
        <p className="text-white/55 text-sm">
          Thank you — a member of our team will be in touch with next steps. We aim to respond within two business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 ${className}`}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="name">
            Full name <span className="text-brand-green">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Jane Smith"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="email">
            Email address <span className="text-brand-green">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            placeholder="jane@familyoffice.com"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="organisation">
          Organisation
        </label>
        <input
          id="organisation"
          name="organisation"
          type="text"
          value={form.organisation}
          onChange={handleChange}
          className={inputClass}
          placeholder="Smith Family Office"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          className="px-3 py-2.5 bg-white/5 border border-white/15 rounded-sm text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-green/40 focus:border-brand-green/60 transition-colors resize-none"
          placeholder="Tell us about your interest in impact investing…"
        />
      </div>
      <button
        type="submit"
        disabled={status === "submitting"}
        className="h-11 px-6 bg-brand-green text-navy-950 rounded-sm text-sm font-semibold hover:bg-brand-green-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed self-start"
      >
        {status === "submitting" ? "Sending…" : "Request access"}
      </button>
      <p className="text-xs text-white/30 leading-relaxed">
        Your information will only be used to facilitate your access request. ImpactX Markets does not share personal information with third parties.
      </p>
    </form>
  );
}
