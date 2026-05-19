// Future-Fit Positive Pursuits (PP01–PP26) and UN SDGs with keyword mappings

export interface PositivePursuit {
  code: string;
  label: string;
  keywords: string[];
}

export interface SDG {
  number: number;
  label: string;
  shortLabel: string;
  keywords: string[];
}

export const positivePursuits: PositivePursuit[] = [
  { code: "PP01", label: "People are nourished", keywords: ["food", "nutrition", "hunger", "nourished", "agriculture", "farming"] },
  { code: "PP02", label: "People are healthy", keywords: ["health", "healthcare", "medical", "wellbeing", "wellness"] },
  { code: "PP03", label: "People are well-informed", keywords: ["information", "media", "data", "transparency", "informed"] },
  { code: "PP04", label: "People have access to energy", keywords: ["energy access", "electricity", "power access"] },
  { code: "PP05", label: "People have access to financial tools", keywords: ["financial inclusion", "fintech", "banking", "microfinance"] },
  { code: "PP06", label: "People have access to water and sanitation", keywords: ["water access", "sanitation", "clean water", "drinking water"] },
  { code: "PP07", label: "Greenhouse gases are removed", keywords: ["greenhouse", "emissions", "carbon", "methane", "co2", "climate", "net zero", "decarbonisation", "sequestration", "offset"] },
  { code: "PP08", label: "Natural resources are kept in use", keywords: ["circular", "recycling", "waste", "resources", "materials", "reuse"] },
  { code: "PP09", label: "Clean water is made available", keywords: ["water quality", "clean water", "water treatment", "rivers", "waterways"] },
  { code: "PP10", label: "People are educated", keywords: ["education", "learning", "skills", "training", "school"] },
  { code: "PP11", label: "Clean energy is used", keywords: ["clean energy", "renewable", "solar", "wind", "battery", "ev", "electric vehicle", "electrification", "zero emission"] },
  { code: "PP12", label: "People have access to mobility", keywords: ["transport", "mobility", "transit", "logistics", "freight", "trucking"] },
  { code: "PP13", label: "Ecosystems are restored", keywords: ["ecosystem", "biodiversity", "nature", "restoration", "habitat", "wetlands", "rivers", "basin", "environmental flows", "conservation"] },
  { code: "PP14", label: "Communities are thriving", keywords: ["community", "social", "inclusion", "affordable", "housing", "homelessness"] },
  { code: "PP15", label: "People have decent work", keywords: ["employment", "jobs", "work", "labour", "wages"] },
  { code: "PP16", label: "People are safe from harm", keywords: ["safety", "harm", "vulnerable", "housing security", "domestic", "women", "shelter", "homelessness"] },
  { code: "PP17", label: "People are represented", keywords: ["governance", "representation", "democracy", "accountability"] },
  { code: "PP18", label: "People live peacefully", keywords: ["peace", "conflict", "violence", "justice"] },
  { code: "PP19", label: "Civic institutions are effective", keywords: ["institutions", "governance", "policy", "regulation"] },
  { code: "PP20", label: "Business models are ethical", keywords: ["ethics", "governance", "compliance", "integrity"] },
  { code: "PP21", label: "Employees are fulfilled", keywords: ["employees", "workforce", "culture", "wellbeing at work"] },
  { code: "PP22", label: "Communities are served", keywords: ["community benefit", "local", "regional", "social enterprise"] },
  { code: "PP23", label: "The biosphere is protected", keywords: ["biosphere", "ocean", "marine", "land", "biodiversity", "species"] },
  { code: "PP24", label: "Resources are used responsibly", keywords: ["resource efficiency", "sustainable use", "extraction", "mining"] },
  { code: "PP25", label: "Products are safe and healthy", keywords: ["product safety", "health products", "food safety"] },
  { code: "PP26", label: "Supply chains are transparent", keywords: ["supply chain", "traceability", "provenance", "sourcing"] },
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
