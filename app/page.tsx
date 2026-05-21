import Image from "next/image";
import { Nav } from "@/components/Nav";
import { JohnWestCounter } from "@/components/JohnWestCounter";
import { ContactForm } from "@/components/ContactForm";
import { brand } from "@/lib/brand";

const fiveCapitals = [
  {
    name: "Financial capital",
    icon: "◈",
    example: "Durable returns across market cycles and generations",
    color: "#1e3a5f",
  },
  {
    name: "Human capital",
    icon: "◉",
    example: "Health, knowledge, and capability over time",
    color: "#1a2d4a",
  },
  {
    name: "Social capital",
    icon: "◎",
    example: "Relationships, reputation, and community standing",
    color: "#1e3050",
  },
  {
    name: "Intellectual capital",
    icon: "◇",
    example: "Values, wisdom, and long-term purpose",
    color: "#1a2848",
  },
  {
    name: "Spiritual capital",
    icon: "◯",
    example: "Meaning, legacy, and a sense of wider purpose",
    color: "#18243f",
  },
];

const valueProps = [
  {
    heading: "Clarity at origination",
    body: "Every issuer commits to a defined Theory of Change, specific outcome metrics, and a reporting cadence before listing. Investors see the impact thesis in structural terms, not just narrative.",
  },
  {
    heading: "Verification over time",
    body: "Impact KPIs are independently assured by third parties on a cadence agreed in investor documents. The assurance framework is set at raise, not retrofitted after the fact.",
  },
  {
    heading: "Comparable across asset classes",
    body: "A common Positive Pursuits taxonomy makes it possible to compare private equity, credit, real assets, and funds on impact terms alongside risk and return.",
  },
  {
    heading: "Lower friction for issuers",
    body: "ImpactX is designed to make structuring an impact thesis practical, without requiring a large dedicated team or significant additional reporting infrastructure.",
  },
];

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
                From a broader market to a certified shortlist.
              </h2>
              <div className="text-white/60 leading-relaxed space-y-3">
                <p>
                  ImpactX reviews opportunities against a defined impact
                  standard, including Theory of Change, outcome KPIs, and
                  minimum assurance criteria.
                </p>
                <p>
                  Only opportunities that meet the standard are surfaced as
                  Impact Certified.
                </p>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end pt-4 lg:pt-0">
              <JohnWestCounter />
            </div>
          </div>
        </div>
      </section>

      {/* ── FIVE CAPITALS ── */}
      <section className="py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-12">
            <span className="text-xs uppercase tracking-widest text-brand-green font-medium mb-4 block">
              A broader view of value
            </span>
            <h2 className="text-4xl font-display font-light text-white leading-tight mb-4">
              Return is one dimension.
            </h2>
            <p className="text-white/55 leading-relaxed">
              The{" "}
              <a
                href="https://jehjf.org/wp-content/uploads/2023/06/Five-Capitals-One-Page-JEHJF.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 underline underline-offset-2 hover:text-white/90 transition-colors"
              >
                five-capitals framework
              </a>{" "}
              offers a way to think about wealth beyond financial capital alone.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {fiveCapitals.map((capital) => (
              <div
                key={capital.name}
                className="rounded-sm p-5 border border-white/8 hover:border-white/15 transition-colors"
                style={{ backgroundColor: capital.color + "60" }}
              >
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center mb-3 font-display text-lg border border-white/10"
                  style={{ backgroundColor: capital.color, color: "#e8edf5" }}
                >
                  {capital.icon}
                </div>
                <h3 className="font-semibold text-white text-sm mb-1.5 leading-snug">
                  {capital.name}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  {capital.example}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-white/30">
            Reference: Jay E. Hughes Jr.,{" "}
            <em>Family Wealth: Keeping It in the Family</em>.
          </p>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-12">
            <span className="text-xs uppercase tracking-widest text-brand-green font-medium mb-4 block">
              What we offer
            </span>
            <h2 className="text-4xl font-display font-light text-white leading-tight">
              From impact claims to impact confidence.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8 border border-white/8 rounded-sm overflow-hidden">
            {valueProps.map((vp, i) => (
              <div
                key={i}
                className="bg-navy-900 p-8 hover:bg-navy-800 transition-colors"
              >
                <div className="w-6 h-0.5 bg-brand-green mb-5" />
                <h3 className="font-semibold text-white mb-3 leading-snug">
                  {vp.heading}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  {vp.body}
                </p>
              </div>
            ))}
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
            <div className="space-y-4 text-white/60 leading-relaxed">
              <p>
                ImpactX Markets was developed in partnership with the Digital
                Finance Cooperative Research Centre (DFCRC), an independent
                research consortium advancing digital finance and capital markets
                innovation.
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
