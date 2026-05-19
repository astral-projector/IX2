"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface EnquireModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  opportunityName: string;
  opportunitySlug: string;
}

export function EnquireModal({
  open,
  onOpenChange,
  opportunityName,
  opportunitySlug,
}: EnquireModalProps) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    organisation: "",
    message: "",
    interestLevel: "Exploring",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          type: "enquire",
          opportunity: opportunityName,
          slug: opportunitySlug,
        }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Enquire about this opportunity</DialogTitle>
          <DialogDescription className="text-navy-500 text-sm leading-relaxed">
            {opportunityName}
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="py-6 text-center">
            <div className="w-10 h-10 rounded-full bg-brand-green/15 flex items-center justify-center mx-auto mb-4">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M4 10l4 4 8-8"
                  stroke="#2d7a4f"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-navy-800 font-medium mb-1">Enquiry received</p>
            <p className="text-sm text-navy-500">
              Thanks — we&apos;ll be in touch to discuss this opportunity.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-medium text-navy-700"
                  htmlFor="enq-name"
                >
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  id="enq-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="h-9 px-3 border border-navy-200 rounded-sm text-sm text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-green/40 focus:border-brand-green transition-colors"
                  placeholder="Jane Smith"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-medium text-navy-700"
                  htmlFor="enq-email"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="enq-email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="h-9 px-3 border border-navy-200 rounded-sm text-sm text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-green/40 focus:border-brand-green transition-colors"
                  placeholder="jane@familyoffice.com"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium text-navy-700"
                htmlFor="enq-org"
              >
                Organisation
              </label>
              <input
                id="enq-org"
                name="organisation"
                type="text"
                value={form.organisation}
                onChange={handleChange}
                className="h-9 px-3 border border-navy-200 rounded-sm text-sm text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-green/40 focus:border-brand-green transition-colors"
                placeholder="Smith Family Office"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium text-navy-700"
                htmlFor="enq-interest"
              >
                Interest level
              </label>
              <select
                id="enq-interest"
                name="interestLevel"
                value={form.interestLevel}
                onChange={handleChange}
                className="h-9 px-3 border border-navy-200 rounded-sm text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-green/40 focus:border-brand-green transition-colors bg-white"
              >
                <option>Exploring</option>
                <option>Interested</option>
                <option>Ready to discuss</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-medium text-navy-700"
                htmlFor="enq-message"
              >
                Message
              </label>
              <textarea
                id="enq-message"
                name="message"
                rows={3}
                value={form.message}
                onChange={handleChange}
                className="px-3 py-2 border border-navy-200 rounded-sm text-sm text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-green/40 focus:border-brand-green transition-colors resize-none"
                placeholder="Any questions or context you&apos;d like to share…"
              />
            </div>
            {status === "error" && (
              <p className="text-xs text-red-600">
                Something went wrong. Please try again.
              </p>
            )}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="h-10 px-5 bg-brand-green text-white rounded-sm text-sm font-medium hover:bg-brand-green-light transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? "Sending…" : "Submit enquiry"}
            </button>
            <p className="text-xs text-navy-400 leading-relaxed">
              This does not constitute an expression of interest in any
              financial product or an offer to invest.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
