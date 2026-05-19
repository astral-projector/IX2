import { Nav } from "@/components/Nav";
import { JohnWestCounter } from "@/components/JohnWestCounter";
import { ContactForm } from "@/components/ContactForm";
import { brand } from "@/lib/brand";

const fourCapitals = [
  {
    name: "Financial capital",
    icon: "◈",
    example: "Returns that endure across generations",
    color: "#1a2640",
  },
  {
    name: "Human capital",
    icon: "◉",
    example: "Health, wellbeing, and knowledge of family members",
    color: "#2d7a4f",
  },
  {
    name: "Social capital",
    icon: "◎",
    example: "Relationships, community, and governance",
    color: "#374d76",
  },
  {
    name: "Intellectual capital",
    icon: "◇",
    example: "Wisdom, stories, and shared values",
    color: "#4a618f",
  },
  {
    name: "Spiritual capital",
    icon: "◯",
    example: "Purpose, legacy, and meaning beyond wealth",
    color: "#263859",
  },
];

const valueProps = [
  {
    heading: "Clarity at origination",
    body: "Theory of Change commitments and KPIs are embedded in capital documents before a dollar moves — not added after.",
  },
  {
    heading: "Verification over time",
    body: "Independent third-party assurance of impact KPIs is agreed at the point of raise and reported at each cadence.",
  },
  {
    heading: "Comparability across opportunities",
    body: "Every opportunity on the platform uses the same Positive Pursuits taxonomy, making like-for-like assessment possible.",
  },
  {
    heading: "Access without friction",
    body: "Introductions to impact-certified issuers, structured for family-office engagement — no intermediaries, no noise.",
  },
];

const howItWorksSteps = [
  {
    number: "01",
    title: "Choose a Positive Pursuit",
    body: "Issuers select at least one Positive Pursuit from 26 impact categories — for example, PP07 (greenhouse gases removed) or PP16 (people are healthy and safe from harm). The Positive Pursuits framework provides a consistent taxonomy across all opportunities on the platform.",
  },
  {
    number: "02",
    title: "Commit to a specific metric, KPI and cadence",
    body: "A Theory of Change exercise during onboarding assigns the issuer's chosen Positive Pursuit to a measurable Outcome — for example, 1 MtCO₂e sequestered per annum. The KPI, unit, and reporting cadence are agreed before listing.",
  },
  {
    number: "03",
    title: "Agree to minimum assurance criteria",
    body: "Issuers commit in Investor Agreements to how the KPI will be measured and assured by an independent third party, plus regular reporting of Positive Pursuits and Break-Even attestations to ImpactX.",
  },
];

const workedExample = {
  input:
    "Capital raised acquires water entitlements and agricultural land in the Murray-Darling Basin.",
  output:
    "Environmental water allocations donated to the Murray-Darling Basin Authority. Agricultural operations sustain ongoing entitlement donations.",
  outcome:
    "Verified increase in environmental water flows: 2,000 ML per annum donated to environmental purposes.",
  impact:
    "Restoration of ecological function in degraded river reaches — supporting native fish populations, waterbird habitats, and floodplain vegetation.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Nav variant="public" />

      {/* ── 1. HERO ── */}
      <section className="relative bg-navy-900 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 0%, rgba(45,122,79,0.15) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-44">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-brand-green/30 bg-brand-green/10">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
              <span className="text-xs text-brand-green font-medium uppercase tracking-wider">
                Private markets · Impact certified
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-light text-white leading-tight tracking-tight mb-6">
              {brand.tagline}
            </h1>
            <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-lg">
              {brand.subheadPlaceholder}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 h-12 px-8 bg-brand-green text-white rounded-sm text-sm font-medium hover:bg-brand-green-light transition-colors"
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
        <div
          className="absolute bottom-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </section>

      {/* Legal disclaimer strip */}
      <div className="bg-navy-950 px-6 py-3">
        <p className="text-center text-xs text-white/30 max-w-4xl mx-auto leading-relaxed">
          {brand.legalDisclaimer}
        </p>
      </div>

      {/* ── 2. THE TRUST GAP ── */}
      <section className="py-24 md:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-green font-medium mb-4 block">
                The curation challenge
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-light text-navy-900 leading-tight mb-6">
                Most deals don&apos;t make it through.
                <br />
                <em className="not-italic text-navy-400">
                  That&apos;s the point.
                </em>
              </h2>
              <div className="space-y-4 text-navy-600 leading-relaxed">
                <p>
                  <strong className="text-navy-800 font-medium">
                    Australian families are increasingly seeking impact
                    investments
                  </strong>{" "}
                  — but what they&apos;re finding is a market where claims
                  outpace evidence. Many families tell us the hardest part
                  isn&apos;t wanting to invest for impact; it&apos;s knowing
                  which opportunities are real.
                </p>
                <p>
                  Australia&apos;s responsible investment market is sized at
                  over $100 billion — but the overwhelming majority is screen
                  funds, not structured impact. The difference matters: a screen
                  excludes harm; impact investing verifies that something
                  measurably positive is happening.
                </p>
                <p>
                  What we&apos;re hearing from families is consistent: they want
                  impact they can point to, structured in a way they can defend
                  to their advisors and their children. That requires
                  infrastructure, not aspiration.
                </p>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end pt-4 lg:pt-0">
              <JohnWestCounter />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FOUR CAPITALS ── */}
      <section className="py-24 bg-navy-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-12">
            <span className="text-xs uppercase tracking-widest text-brand-green font-medium mb-4 block">
              How families think about capital
            </span>
            <h2 className="text-4xl font-display font-light text-navy-900 leading-tight mb-4">
              Wealth is not one thing.
            </h2>
            <p className="text-navy-600 leading-relaxed">
              Jay Hughes Jr.&apos;s four-capitals framework — extended by many
              family offices to include a fifth — recognises that a
              family&apos;s full wealth spans dimensions that financial returns
              alone cannot capture. Impact investing, done rigorously, can
              contribute across all five.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {fourCapitals.map((capital) => (
              <div
                key={capital.name}
                className="bg-white rounded-sm p-5 border border-navy-100 hover:border-navy-200 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-sm flex items-center justify-center mb-3 text-white font-display text-lg"
                  style={{ backgroundColor: capital.color }}
                >
                  {capital.icon}
                </div>
                <h3 className="font-semibold text-navy-900 text-sm mb-1.5 leading-snug">
                  {capital.name}
                </h3>
                <p className="text-xs text-navy-500 leading-relaxed">
                  {capital.example}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-navy-400">
            Framework adapted from Jay E. Hughes Jr.,{" "}
            <em>Family Wealth: Keeping It in the Family</em>. Spiritual capital
            added by subsequent practitioners.
          </p>
        </div>
      </section>

      {/* ── 4. WHAT WE DO ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-12">
            <span className="text-xs uppercase tracking-widest text-brand-green font-medium mb-4 block">
              What we do
            </span>
            <h2 className="text-4xl font-display font-light text-navy-900 leading-tight">
              Infrastructure for the whole lifecycle.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-navy-100 border border-navy-100 rounded-sm overflow-hidden">
            {valueProps.map((vp, i) => (
              <div
                key={i}
                className="bg-white p-8 hover:bg-navy-50 transition-colors"
              >
                <div className="w-6 h-0.5 bg-brand-green mb-5" />
                <h3 className="font-semibold text-navy-900 mb-3 leading-snug">
                  {vp.heading}
                </h3>
                <p className="text-sm text-navy-500 leading-relaxed">
                  {vp.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <span className="text-xs uppercase tracking-widest text-brand-green font-medium mb-4 block">
              How it works
            </span>
            <h2 className="text-4xl font-display font-light text-white leading-tight mb-4">
              Three steps to impact integrity.
            </h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Every opportunity listed on ImpactX Markets completes the same
              structured process before it reaches investors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {howItWorksSteps.map((step) => (
              <div
                key={step.number}
                className="bg-white/5 border border-white/10 rounded-sm p-7 hover:bg-white/8 transition-colors"
              >
                <div className="text-5xl font-display font-light text-white/15 mb-4 leading-none">
                  {step.number}
                </div>
                <h3 className="font-semibold text-white mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-white/55 leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-white/35 mb-14 max-w-lg">
            A Break-Even analysis is completed during onboarding to ensure the
            issuer is not negating their Positive Pursuits elsewhere in their
            operations.
          </p>

          {/* Worked example */}
          <div className="border border-brand-green/20 rounded-sm overflow-hidden">
            <div className="bg-brand-green/10 border-b border-brand-green/20 px-7 py-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-brand-green/20 flex items-center justify-center text-xs font-bold text-brand-green">
                KR
              </div>
              <div>
                <div className="text-xs text-brand-green font-medium uppercase tracking-wider">
                  Worked example — PP13
                </div>
                <div className="text-sm text-white font-medium">
                  Kilter Rural — Murray-Darling Basin Balanced Water Fund
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              {(["input", "output", "outcome", "impact"] as const).map(
                (key) => (
                  <div key={key} className="px-6 py-6">
                    <div className="text-xs uppercase tracking-widest text-brand-green/70 font-medium mb-2">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {workedExample[key]}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. ABOUT ── */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-green font-medium mb-4 block">
                About
              </span>
              <h2 className="text-4xl font-display font-light text-navy-900 leading-tight mb-6">
                Built on a research foundation.
              </h2>
              <div className="space-y-4 text-navy-600 leading-relaxed">
                <p>
                  ImpactX Markets was developed in partnership with the Digital
                  Finance Cooperative Research Centre (DFCRC) — Australia&apos;s
                  federally funded research consortium advancing innovation in
                  digital finance and capital markets.
                </p>
                <p>
                  The platform&apos;s Positive Pursuits taxonomy, Theory of
                  Change methodology, and minimum assurance standards were
                  developed through that research collaboration, grounding the
                  platform in rigour rather than marketing.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-navy-100 rounded-sm p-6">
                <div className="text-xs uppercase tracking-widest text-navy-400 font-medium mb-4">
                  Built in partnership with
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-10 px-4 bg-navy-100 rounded-sm flex items-center text-sm font-semibold text-navy-700">
                    DFCRC
                  </div>
                  <span className="text-xs text-navy-400">
                    Digital Finance Cooperative Research Centre
                  </span>
                </div>
              </div>

              <div className="border border-navy-100 rounded-sm p-6">
                <div className="text-xs uppercase tracking-widest text-navy-400 font-medium mb-4">
                  Team
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-navy-100 border border-navy-200" />
                      <div className="h-2 w-16 bg-navy-100 rounded" />
                      <div className="h-1.5 w-12 bg-navy-50 rounded" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-navy-400 mt-4 text-center">
                  Team profiles coming soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CONTACT ── */}
      <section
        id="contact"
        className="py-24 bg-navy-50 border-t border-navy-100"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <span className="text-xs uppercase tracking-widest text-brand-green font-medium mb-4 block">
                Contact
              </span>
              <h2 className="text-4xl font-display font-light text-navy-900 leading-tight mb-4">
                Request access to the prototype.
              </h2>
              <p className="text-navy-600 leading-relaxed mb-6">
                The ImpactX Markets portal is currently in a private prototype
                phase. If you&apos;re a family-office principal, advisor, or
                wholesale investor with an interest in impact-certified private
                markets, we&apos;d welcome a conversation.
              </p>
              <p className="text-sm text-navy-500 leading-relaxed">
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
      <footer className="bg-navy-900 border-t border-white/10 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-sm bg-brand-green flex items-center justify-center">
                <span className="text-white font-display font-semibold text-xs leading-none">
                  IX
                </span>
              </div>
              <span className="text-white font-semibold text-sm">
                ImpactX Markets
              </span>
            </div>
            <p className="text-xs text-white/30 max-w-sm leading-relaxed">
              {brand.legalDisclaimer}
            </p>
          </div>
          <div className="text-xs text-white/25">
            © {new Date().getFullYear()} ImpactX Markets. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
