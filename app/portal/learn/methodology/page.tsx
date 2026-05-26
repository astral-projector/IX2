import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology — Learn",
  robots: { index: false, follow: false },
};

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-widest text-brand-green font-semibold mb-3">Learn</p>
        <h1 className="text-3xl font-display font-light text-white mb-4">Impact Methodology</h1>
        <p className="text-white/60 leading-relaxed">
          ImpactX Markets applies a structured methodology to assess, certify, and track the impact claims of
          each listed opportunity. This page explains the key elements of that methodology.
        </p>
      </div>

      <div className="space-y-10">

        {/* Impact Certification */}
        <section>
          <h2 className="text-white font-semibold mb-3">Impact Certification</h2>
          <p className="text-white/60 leading-relaxed">
            Before listing, each issuer must articulate a complete Theory of Change — mapping capital deployment
            through outputs and outcomes to intended long-run impact. The Theory of Change must be tied to specific,
            measurable Outcome KPIs drawn from the Future-Fit Business Benchmark Positive Pursuits framework.
            Listings that cannot demonstrate this causal chain are not accepted onto the platform.
          </p>
        </section>

        {/* Independent Assurance */}
        <section>
          <h2 className="text-white font-semibold mb-3">Independent Assurance</h2>
          <p className="text-white/60 leading-relaxed">
            Outcome KPIs for live opportunities are independently assured by a third-party specialist agreed at
            listing. The assurance provider reviews reported KPI data against the agreed measurement methodology
            on the cadence specified in the investor documents (annual or bi-annual). Assurance reports are made
            available to verified enquirers via the Impact Room.
          </p>
          <p className="text-white/60 leading-relaxed mt-3">
            Independent assurance is a condition of continued listing. Issuers that fail to provide assured
            reporting within the agreed timeframe are flagged for review.
          </p>
        </section>

        {/* Break Even Attestation */}
        <section>
          <div className="flex items-center gap-2.5 mb-3">
            <h2 className="text-white font-semibold">Break Even Attestation</h2>
            <span className="text-[10px] uppercase tracking-wider text-brand-green border border-brand-green/30 bg-brand-green/10 px-2 py-0.5 rounded-sm font-semibold">
              Key concept
            </span>
          </div>
          <p className="text-white/60 leading-relaxed">
            A Break Even Attestation is a structured declaration by an issuer that their operations have
            reached — or are on a credible pathway to — the minimum standard of impact required for the
            declared Positive Pursuit to hold. It is not a claim of perfection, but of sufficiency: that
            the business is operating above the threshold at which its contribution becomes net positive.
          </p>
          <p className="text-white/60 leading-relaxed mt-3">
            The concept is drawn from the Future-Fit Business Benchmark, which defines a &quot;break-even
            point&quot; for each Positive Pursuit — the conditions under which a company&apos;s positive
            contribution outweighs any residual negative footprint associated with delivering it. For example,
            a zero-emission freight operator must demonstrate that the lifecycle emissions from manufacturing,
            charging, and operating its fleet are lower than the diesel baseline it displaces.
          </p>
          <p className="text-white/60 leading-relaxed mt-3">
            On ImpactX Markets, Break Even Attestations are reviewed by the platform&apos;s impact committee
            at listing and updated annually. They are made available to verified enquirers via the Impact Room.
          </p>
        </section>

        {/* Reporting */}
        <section>
          <h2 className="text-white font-semibold mb-3">Reporting Cadence</h2>
          <p className="text-white/60 leading-relaxed">
            Impact reporting cadence — annual or bi-annual — is set in investor documents at raise. This
            cadence applies to both the Outcome KPI report and any associated independent assurance. The
            platform publishes a summary of each report to the Impact Room within 30 days of delivery.
          </p>
        </section>

        {/* Disclaimer */}
        <div className="border-t border-white/8 pt-6">
          <p className="text-xs text-white/30 leading-relaxed">
            The methodology described here applies to the ImpactX Markets prototype. It is subject to revision
            as the platform develops. Nothing on this page constitutes financial advice or a guarantee of impact
            outcomes. Impact claims are made by issuers and reviewed by the platform; they do not represent
            an endorsement by ImpactX Markets of any particular investment.
          </p>
        </div>
      </div>
    </div>
  );
}
