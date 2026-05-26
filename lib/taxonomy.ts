// Future-Fit Positive Pursuits (PP01–PP26) and UN SDGs with keyword mappings

export interface PositivePursuit {
  code: string;
  label: string;
  available: boolean; // true = present in at least one listed opportunity
  keywords: string[];
}

export interface SDG {
  number: number;
  label: string;
  shortLabel: string;
  keywords: string[];
}

// All 24 Future-Fit Business Benchmark Positive Pursuits (PP01–PP24).
// The 6 codes present in current listed opportunities are marked available: true.
export const positivePursuits: PositivePursuit[] = [
  // Energy
  { code: "PP01", label: "Others depend less on non-renewable energy",          available: true,  keywords: ["renewable", "solar", "wind", "battery", "ev", "electric vehicle", "electrification", "zero emission", "clean energy"] },
  { code: "PP02", label: "More people have access to energy",                   available: false, keywords: ["energy access", "electricity access", "power"] },
  // Water
  { code: "PP03", label: "Others contribute less to water stress",              available: true,  keywords: ["water stress", "water entitlement", "water allocation", "irrigation", "basin", "murray-darling"] },
  { code: "PP04", label: "More people have access to clean water",              available: false, keywords: ["drinking water", "clean water access", "water supply", "sanitation"] },
  // Natural Resources
  { code: "PP05", label: "Others depend less on inadequately-managed natural resources", available: false, keywords: ["natural resources", "sustainable sourcing", "raw materials", "extraction"] },
  // Atmosphere
  { code: "PP06", label: "Others generate fewer greenhouse gas emissions",      available: true,  keywords: ["greenhouse", "emissions", "carbon", "methane", "co2", "climate", "net zero", "decarbonisation", "livestock", "freight"] },
  { code: "PP07", label: "Greenhouse gases are removed from the atmosphere",    available: false, keywords: ["carbon removal", "carbon capture", "sequestration", "ccs", "direct air capture"] },
  { code: "PP08", label: "Others generate fewer harmful emissions",             available: false, keywords: ["pollution", "air quality", "toxic", "harmful emissions"] },
  { code: "PP09", label: "Harmful emissions are removed from the environment",  available: false, keywords: ["remediation", "cleanup", "pollution removal"] },
  // Waste
  { code: "PP10", label: "Others generate less waste",                          available: false, keywords: ["waste reduction", "circular economy", "less waste"] },
  { code: "PP11", label: "Waste is reclaimed and repurposed",                   available: false, keywords: ["recycling", "waste reuse", "repurpose", "circular"] },
  // Ecosystems
  { code: "PP12", label: "Others cause less ecosystem degradation",             available: false, keywords: ["ecosystem protection", "deforestation", "habitat loss", "land use"] },
  { code: "PP13", label: "Ecosystems are restored",                             available: true,  keywords: ["ecosystem", "biodiversity", "nature", "restoration", "habitat", "wetlands", "rivers", "environmental flows", "conservation"] },
  // Social & Cultural Value
  { code: "PP14", label: "Others cause less damage to areas of high social or cultural value", available: false, keywords: ["cultural heritage", "indigenous", "social impact", "community damage"] },
  { code: "PP15", label: "Areas of high social or cultural value are restored", available: false, keywords: ["heritage restoration", "cultural restoration", "community rebuilding"] },
  // Health & Safety
  { code: "PP16", label: "Health and safety are universally assured",           available: true,  keywords: ["housing", "homelessness", "shelter", "safety", "harm", "vulnerable", "housing security", "women"] },
  // People
  { code: "PP17", label: "People's capabilities are strengthened",              available: true,  keywords: ["capability", "skills", "education", "community", "inclusion", "social support", "tenancy"] },
  { code: "PP18", label: "More people have access to economic opportunity",     available: false, keywords: ["economic opportunity", "financial inclusion", "employment", "microfinance", "livelihoods"] },
  { code: "PP19", label: "Individual freedoms are upheld for more people",      available: false, keywords: ["rights", "freedoms", "civil rights", "justice", "democracy"] },
  // Society & Systems
  { code: "PP20", label: "Social cohesion is strengthened",                     available: false, keywords: ["social cohesion", "community", "trust", "inclusion"] },
  { code: "PP21", label: "Infrastructure is strengthened in pursuit of future-fitness", available: false, keywords: ["infrastructure", "resilience", "systems", "future-fit"] },
  { code: "PP22", label: "Governance is strengthened in pursuit of future-fitness", available: false, keywords: ["governance", "accountability", "policy", "regulation"] },
  { code: "PP23", label: "Market mechanisms are strengthened in pursuit of future-fitness", available: false, keywords: ["market mechanisms", "incentives", "pricing", "standards"] },
  { code: "PP24", label: "Social norms increasingly support the pursuit of future-fitness", available: false, keywords: ["behaviour change", "culture", "awareness", "education", "norms"] },
];

export const sdgs: SDG[] = [
  { number: 1,  label: "No Poverty",                       shortLabel: "No Poverty",           keywords: ["poverty", "financial inclusion", "economic"] },
  { number: 2,  label: "Zero Hunger",                      shortLabel: "Zero Hunger",           keywords: ["hunger", "food", "agriculture", "nutrition", "farming"] },
  { number: 3,  label: "Good Health & Well-Being",         shortLabel: "Good Health",           keywords: ["health", "wellbeing", "healthcare", "medical"] },
  { number: 4,  label: "Quality Education",                shortLabel: "Education",             keywords: ["education", "learning", "school", "skills"] },
  { number: 5,  label: "Gender Equality",                  shortLabel: "Gender Equality",       keywords: ["gender", "women", "equality", "female"] },
  { number: 6,  label: "Clean Water & Sanitation",         shortLabel: "Clean Water",           keywords: ["water", "sanitation", "clean water", "basin", "river"] },
  { number: 7,  label: "Affordable & Clean Energy",        shortLabel: "Clean Energy",          keywords: ["energy", "renewable", "solar", "wind", "clean energy", "electricity", "ev", "battery"] },
  { number: 8,  label: "Decent Work & Economic Growth",    shortLabel: "Decent Work",           keywords: ["jobs", "employment", "economic", "growth", "work"] },
  { number: 9,  label: "Industry, Innovation & Infrastructure", shortLabel: "Innovation",      keywords: ["innovation", "infrastructure", "industry", "technology", "manufacturing"] },
  { number: 10, label: "Reduced Inequalities",             shortLabel: "Reduced Inequalities",  keywords: ["inequality", "inclusion", "vulnerable", "disadvantaged"] },
  { number: 11, label: "Sustainable Cities & Communities", shortLabel: "Sustainable Cities",    keywords: ["housing", "community", "cities", "urban", "affordable housing", "homelessness"] },
  { number: 12, label: "Responsible Consumption & Production", shortLabel: "Responsible Consumption", keywords: ["circular", "waste", "recycling", "sustainable production"] },
  { number: 13, label: "Climate Action",                   shortLabel: "Climate Action",        keywords: ["climate", "carbon", "emissions", "greenhouse", "co2", "methane", "net zero", "decarbonisation"] },
  { number: 14, label: "Life Below Water",                 shortLabel: "Life Below Water",      keywords: ["ocean", "marine", "sea", "fish", "aquatic"] },
  { number: 15, label: "Life on Land",                     shortLabel: "Life on Land",          keywords: ["biodiversity", "ecosystem", "nature", "land", "forest", "habitat", "wildlife", "restoration", "wetlands"] },
  { number: 16, label: "Peace, Justice & Strong Institutions", shortLabel: "Peace & Justice",  keywords: ["peace", "justice", "governance", "institutions"] },
  { number: 17, label: "Partnerships for the Goals",       shortLabel: "Partnerships",          keywords: ["partnership", "collaboration", "investment", "finance"] },
];

// Match a search query to relevant PPs and SDGs
export function matchTaxonomy(query: string): {
  pps: string[];   // PP codes e.g. ["PP07", "PP13"]
  sdgs: number[];  // SDG numbers e.g. [13, 15]
} {
  const lower = query.toLowerCase().trim();
  if (!lower || lower.length < 2) return { pps: [], sdgs: [] };

  const matchedPPs = positivePursuits
    .filter((pp) => pp.keywords.some((k) => lower.includes(k) || k.includes(lower)))
    .map((pp) => pp.code);

  const matchedSDGs = sdgs
    .filter((sdg) => sdg.keywords.some((k) => lower.includes(k) || k.includes(lower)))
    .map((sdg) => sdg.number);

  return { pps: matchedPPs, sdgs: matchedSDGs };
}

// Filter opportunities by selected PPs and SDGs
export function matchesActiveTaxonomy(
  opp: { primaryPositivePursuit: { code: string }; secondaryPositivePursuit?: { code: string }; sdgAlignment?: string[] },
  activePPs: string[],
  activeSDGs: number[]
): boolean {
  if (activePPs.length === 0 && activeSDGs.length === 0) return true;

  const oppPPs = [
    opp.primaryPositivePursuit.code,
    opp.secondaryPositivePursuit?.code,
  ].filter(Boolean) as string[];

  const oppSDGs = (opp.sdgAlignment ?? []).map((s) => parseInt(s.replace("SDG ", "")));

  const ppMatch = activePPs.length === 0 || activePPs.some((p) => oppPPs.includes(p));
  const sdgMatch = activeSDGs.length === 0 || activeSDGs.some((n) => oppSDGs.includes(n));

  return ppMatch && sdgMatch;
}
