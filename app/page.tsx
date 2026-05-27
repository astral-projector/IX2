import Image from "next/image";
import { Nav } from "@/components/Nav";
import { JohnWestCounter } from "@/components/JohnWestCounter";
import { ContactForm } from "@/components/ContactForm";
import { brand } from "@/lib/brand";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy-900">
      <Nav variant="public" />

      {/* ── HERO ── */}
      <section className="relative bg-navy-950 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 75% 0%, rgba(0,232,144,0.07) 0%, transparent 55%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-1/2 h-full opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-48">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-light text-white leading-[1.06] tracking-tight mb-6">
              Trustworthy Infrastructure for Impact Capital
            </h1>
            <p className="text-lg text-white/55 leading-relaxed mb-10 max-w-xl">
              ImpactX brings structure, comparability, and independent
              verification to private-market impact opportunities across private
              equity, credit, real assets, and funds.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 h-12 px-8 bg-brand-green text-navy-950 rounded-sm text-sm font-semibold hover:bg-brand-green-light transition-colors"
            >
              Request access
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 7h8M8 4l3 3-3 3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── CURATION ── */}
      <section className="py-24 md:py-36 bg-navy-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-green font-medium mb-4 block">
                A higher standard
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-light text-white leading-tight mb-6">
                Surfacing investment opportunities where impact and returns
                compound together.
              </h2>
              <div className="text-white/60 leading-relaxed">
                <p>
                  Each opportunity is reviewed before listing against a defined
                  standard, including a Theory of Change, outcome KPIs, and
                  minimum assurance criteria, giving investors clearer, more
                  comparable, and more accountable impact opportunities.
                </p>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end pt-4 lg:pt-0">
              <JohnWestCounter />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE COVER ── */}
      <section className="py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest text-brand-green font-medium mb-4 block">
              What we cover
            </span>
            <h2 className="text-4xl font-display font-light text-white leading-tight mb-4">
              Impact-verified opportunities across private alternatives.
            </h2>
            <p className="text-white/55 leading-relaxed">
              We surface opportunities across private alternatives, including
              private equity, private credit, real assets, and funds, each held
              to the same verification standard before listing.
            </p>
          </div>

          {/* How we verify */}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/35 font-semibold mb-4">
              How we verify
            </p>
            <div className="grid sm:grid-cols-3 gap-3 items-stretch">
              {[
                { n: "01", label: "What we require",   heading: "Clarity at origination",    body: "Issuers commit to a Theory of Change, outcome metrics, and reporting cadence before listing." },
                { n: "02", label: "How it’s checked", heading: "Independent assurance",     body: "Impact KPIs are assured by third parties on a cadence set at raise, not retrofitted." },
                { n: "03", label: "Why it compares",   heading: "Comparable across classes", body: "A common Positive Pursuits taxonomy makes impact comparable alongside risk and return." },
              ].map(({ n, label, heading, body }) => (
                <div key={n} className="border-t-2 border-brand-green/50 pt-5 pb-6 px-1 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-brand-green/60">{n}</span>
                    <span className="text-[9px] uppercase tracking-widest text-brand-green/50 font-semibold">{label}</span>
                  </div>
                  <h3 className="text-2xl font-display font-light text-white leading-tight">{heading}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-brand-green font-medium mb-4 block">
              A broader view of value
            </span>
            <h2 className="text-4xl font-display font-light text-white leading-tight mb-8">
              Financial return is one dimension.
            </h2>
            <div className="space-y-5 text-white/60 leading-relaxed">
              <p>
                Most capital is managed to a single measure. For families
                thinking in generations, that measure is too narrow.
              </p>
              <p>
                A family&apos;s wealth is also the knowledge it carries, the
                relationships it can draw on, the institutions it builds, and the
                sense of purpose it hands down. These forms of capital compound
                or erode just as money does, and they are far harder to rebuild
                once lost. Stewardship means tending to all of them, not trading
                one against the rest.
              </p>
              <p>
                That conviction shapes what we list. The opportunities on ImpactX
                are structured so that financial return and wider value are
                accounted for together, with the same rigour, rather than treated
                as a choice between doing well and doing good.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-brand-green font-medium mb-4 block">
              About
            </span>
            <h2 className="text-4xl font-display font-light text-white leading-tight mb-6">
              Built on a research foundation.
            </h2>
            <div className="text-white/60 leading-relaxed">
              <p>
                ImpactX Markets is a research and commercialization effort under
                the Digital Finance Cooperative Research Centre (DFCRC) with the
                goal of advancing digital finance and capital markets innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        id="contact"
        className="py-24 bg-navy-900 border-t border-white/8"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-green font-medium mb-4 block">
                Contact
              </span>
              <h2 className="text-4xl font-display font-light text-white leading-tight mb-4">
                Request access to the prototype.
              </h2>
              <p className="text-white/55 leading-relaxed mb-6">
                The ImpactX Markets portal is currently in a private prototype
                phase. If you&apos;re a family-office principal, advisor, or
                wholesale investor seeking impact-structured private market
                opportunities, we&apos;d welcome a conversation.
              </p>
              <p className="text-sm text-white/35 leading-relaxed">
                Submitting this form does not create any obligation on either
                party, nor does it constitute an expression of interest in any
                financial product.
              </p>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy-950 border-t border-white/8 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <Image
                src="/logo.png"
                alt="ImpactX Markets"
                width={28}
                height={28}
                className="rounded-sm"
              />
              <span className="text-white font-semibold text-sm">
                ImpactX Markets
              </span>
            </div>
            <p className="text-xs text-white/25 max-w-sm leading-relaxed">
              {brand.legalDisclaimer}
            </p>
          </div>
          <div className="text-xs text-white/20">
            © {new Date().getFullYear()} ImpactX Markets. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
