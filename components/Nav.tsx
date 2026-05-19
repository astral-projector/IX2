"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { brand } from "@/lib/brand";

interface NavProps {
  variant?: "public" | "portal";
}

export function Nav({ variant = "public" }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const publicLinks = [
    { label: "How it works", href: "/#how-it-works" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ];

  const portalLinks = [
    { label: "Opportunities", href: "/portal" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "About", href: "/#about" },
  ];

  const links = variant === "portal" ? portalLinks : publicLinks;

  return (
    <nav className="sticky top-0 z-40 bg-navy-900/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href={variant === "portal" ? "/portal" : "/"}
          className="flex items-center gap-2.5"
        >
          <Image
            src="/logo.png"
            alt={brand.fullName}
            width={36}
            height={36}
            className="rounded-sm"
            priority
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
          <span className="text-white font-semibold tracking-tight text-sm">
            {brand.name}
            <span className="text-white/40 font-normal ml-1 text-xs">
              Markets
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-sm hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}

          {variant === "portal" ? (
            <Link
              href="/portal/enquiries"
              className="ml-2 px-3 py-2 text-sm text-white/70 hover:text-white transition-colors rounded-sm hover:bg-white/5"
            >
              My Enquiries
            </Link>
          ) : (
            <Link
              href="#contact"
              className="ml-2 px-4 py-2 text-sm bg-brand-green text-white rounded-sm hover:bg-brand-green-light transition-colors font-medium"
            >
              Request access
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-900 border-t border-white/10 px-6 py-4 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm text-white/70 hover:text-white transition-colors rounded-sm"
            >
              {link.label}
            </Link>
          ))}
          {variant === "portal" ? (
            <Link
              href="/portal/enquiries"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 text-sm text-white/70 hover:text-white transition-colors rounded-sm"
            >
              My Enquiries
            </Link>
          ) : (
            <Link
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-4 py-2.5 text-sm bg-brand-green text-white rounded-sm hover:bg-brand-green-light transition-colors font-medium text-center"
            >
              Request access
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
