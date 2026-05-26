import type { Metadata } from "next";
import { positivePursuits } from "@/lib/taxonomy";

export const metadata: Metadata = {
  title: "Positive Pursuits — Learn",
  robots: { index: false, follow: false },
};

export default function PositivePursuitsPage() {
  const available = positivePursuits.filter((pp) => pp.available);
  const notAvailable = positivePursuits.filter((pp) => !pp.available);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-widest text-brand-green font-semibold mb-3">Learn</p>
        <h1 className="text-3xl font-display font-light text-white mb-4">Positive Pursuits</h1>
        <p className="text-white/60 leading-relaxed mb-3">
          The <strong className="text-white/80">Future-Fit Business Benchmark</strong> (FFBB) defines 24 Positive Pursuits
          — specific ways a business or fund can create measurable positive outcomes for people and planet, beyond simply
          reducing harm.
        </p>
        <p className="text-white/60 leading-relaxed mb-3">
          Unlike ESG ratings, which primarily assess how well a company manages its negative impacts, Positive Pursuits
          are forward-looking: they describe an active contribution toward a future-fit world. Each PP is tied to a
          specific, independently verifiable claim about the positive difference a product, service, or investment makes.
        </p>
        <p className="text-white/60 leading-relaxed">
          On ImpactX Markets, every listed opportunity declares a primary Positive Pursuit as part of its impact
          thesis. This pursuit is assessed at listing and tracked against outcome KPIs on an ongoing basis.
        </p>
        <a
          href="https://benchmark.futurefitbusiness.org/pp.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 mt-4 text-sm text-brand-green/70 hover:text-brand-green underline underline-offset-2 transition-colors"
        >
          Full framework reference — futurefitbusiness.org
        </a>
      </div>

      {/* PPs present in listed opportunities */}
      <div className="mb-8">
        <h2 className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-4">
          Present in listed opportunities
        </h2>
        <div className="flex flex-col gap-2">
          {available.map((pp) => (
            <div
              key={pp.code}
              className="flex items-start gap-4 px-4 py-3.5 rounded-sm border border-brand-green/20 bg-brand-green/[0.04]"
            >
              <span className="font-mono text-xs font-bold text-brand-green shrink-0 mt-0.5 w-8">{pp.code}</span>
              <span className="text-sm text-white/75">{pp.label}</span>
              <span className="ml-auto text-[9px] font-semibold px-1.5 py-0.5 rounded-sm bg-brand-green/15 text-brand-green border border-brand-green/25 shrink-0 self-start">
                Listed
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Full framework reference */}
      <div>
        <h2 className="text-xs uppercase tracking-widest text-white/40 font-semibold mb-4">
          Full framework
        </h2>
        <div className="flex flex-col gap-1.5">
          {notAvailable.map((pp) => (
            <div
              key={pp.code}
              className="flex items-start gap-4 px-4 py-3 rounded-sm border border-white/6 bg-white/[0.02]"
            >
              <span className="font-mono text-xs font-semibold text-white/30 shrink-0 mt-0.5 w-8">{pp.code}</span>
              <span className="text-sm text-white/45">{pp.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
