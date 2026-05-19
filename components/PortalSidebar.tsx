"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Briefcase,
  BarChart3,
  FolderOpen,
  FileText,
  MessageSquare,
  Settings,
} from "lucide-react";
import { brand } from "@/lib/brand";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
}

const sections: { heading: string; items: NavItem[] }[] = [
  {
    heading: "Explore",
    items: [
      { label: "Dashboard", href: "/portal/dashboard", icon: LayoutDashboard },
      { label: "Opportunities", href: "/portal", icon: Search, badge: "5" },
    ],
  },
  {
    heading: "Portfolio",
    items: [
      { label: "Current Investments", href: "/portal/investments", icon: Briefcase },
      { label: "Portfolio Impact", href: "/portal/impact", icon: BarChart3 },
    ],
  },
  {
    heading: "Resources",
    items: [
      { label: "Data Room", href: "/portal/data-room", icon: FolderOpen },
      { label: "Impact Reports", href: "/portal/reports", icon: FileText },
    ],
  },
  {
    heading: "Account",
    items: [
      { label: "My Enquiries", href: "/portal/enquiries", icon: MessageSquare },
      { label: "Settings", href: "/portal/settings", icon: Settings },
    ],
  },
];

export function PortalSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/portal") return pathname === "/portal";
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-navy-950 border-r border-white/8 min-h-full">
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-white/8 shrink-0">
        <Link href="/portal" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt={brand.fullName}
            width={28}
            height={28}
            className="rounded-sm"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="text-white font-semibold text-sm tracking-tight">
            {brand.name}
            <span className="text-white/35 font-normal ml-1 text-xs">
              Markets
            </span>
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto space-y-5">
        {sections.map((section) => (
          <div key={section.heading}>
            <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-white/25">
              {section.heading}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 px-2 py-2 rounded-sm text-sm transition-colors group",
                        active
                          ? "bg-brand-green/10 text-white border-l-2 border-brand-green pl-[6px]"
                          : "text-white/45 hover:text-white/80 hover:bg-white/5 border-l-2 border-transparent pl-[6px]"
                      )}
                    >
                      <item.icon
                        size={15}
                        className={cn(
                          "shrink-0 transition-colors",
                          active ? "text-brand-green" : "text-white/35 group-hover:text-white/60"
                        )}
                      />
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-full tabular-nums",
                            active
                              ? "bg-brand-green/20 text-brand-green"
                              : "bg-white/8 text-white/30"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-white/8 shrink-0">
        <p className="text-[10px] text-white/20 leading-relaxed">
          Prototype · Not for distribution
        </p>
      </div>
    </aside>
  );
}
