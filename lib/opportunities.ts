export type Opportunity = {
  slug: string;
  heroImage?: string;
  status: "live" | "coming-soon";
  issuer: string;
  projectName: string;
  subtitle: string;
  sector:
    | "nature-based"
    | "social-housing"
    | "energy-transport"
    | "agritech"
    | "advanced-materials";
  geography: string;
  type: "fund" | "direct-equity";
  assetClass: string;
  stage: string;
  issueSize: { amount: number; currency: "AUD" | "USD" };
  targetNetReturns: string | null;
  expectedLiquidity: string | null;
  distributionFrequency: string | null;
  expectedMaturity: string | null;
  closeDate: string | null;
  minimumInvestable: { amount: number; currency: "AUD" | "USD" } | null;
  capitalRequirement: string;
  useOfProceeds: string;
  investmentHighlights: string[];
  primaryPositivePursuit: { code: string; label: string };
  secondaryPositivePursuit?: { code: string; label: string };
  sdgAlignment?: string[];
  theoryOfChange: {
    input: string;
    output: string;
    outcome: string;
    impact: string;
  };
  outcomeKpis: Array<{
    label: string;
    value: string | null;
    unit: string;
    cadence: "annual" | "bi-annual" | "quarterly";
  }>;
  reportingCadence: "annual" | "bi-annual";
  assuranceProvider: string | null;
  avatarInitials: string;
  heroPalette: {
    base: string;
    baseDark: string;
    accent: string;
    overlay: string;
  };
  investmentTypeLabel: string;
  tags: string[];
  impactIntensity: "High" | "Moderate" | "Exploratory" | null;
  // Semantic keyword tags for conversational search
  searchKeywords?: string[];
};

export const opportunities: Opportunity[] = [
  {
    slug: "kilter-rural-mdb-balanced-water-fund",
    status: "live",
    issuer: "Kilter Rural",
    projectName: "Murray-Darling Basin Balanced Water Fund",
    subtitle:
      "A professionally managed fund restoring environmental water flows across Australia's most significant agricultural basin.",
    sector: "nature-based",
    geography: "Australia — Murray-Darling Basin",
    type: "fund",
    assetClass: "Open-Ended",
    stage: "Open",
    issueSize: { amount: 50, currency: "AUD" },
    targetNetReturns: "7–9% p.a. (net)",
    expectedLiquidity: "Annual redemption window",
    distributionFrequency: "Annual",
    expectedMaturity: "Open-ended",
    closeDate: "2026-12-31",
    minimumInvestable: { amount: 100000, currency: "AUD" },
    capitalRequirement:
      "The Murray-Darling Basin Balanced Water Fund is an open-ended impact investment fund managed by Kilter Rural, one of Australia's leading water entitlement specialists. The fund acquires diversified water entitlements and integrated farmland across the Murray-Darling Basin, generating financial returns through agricultural operations and water trading, alongside verified environmental outcomes through structured donations of water to the Murray-Darling Basin Authority.",
    useOfProceeds:
      "The fund offers investors exposure to a real asset class with established income streams and a structured environmental mandate. Through a formal lease-back arrangement with the Murray-Darling Basin Authority, the fund commits to donating environmental water allocations that contribute to the restoration of ecological flows in the Basin's most degraded river systems. Impact outcomes are independently assured by RMCG, a specialist natural resource management consultancy.",
    investmentHighlights: [
      "Dual revenue streams: agricultural income + water trading",
      "Environmental water donations underpinned by a formal lease-back arrangement with Murray-Darling Basin Authority",
      "Independently assured impact reporting via RMCG (natural resource management consultants)",
      "AFSL-licensed manager with established track record in water entitlement management",
      "Aligns with Australia's $13bn Basin Plan environmental outcomes",
    ],
    primaryPositivePursuit: {
      code: "PP13",
      label: "Ecosystems are restored",
    },
    secondaryPositivePursuit: {
      code: "PP03",
      label: "Others contribute less to water stress",
    },
    sdgAlignment: ["SDG 6", "SDG 13", "SDG 15"],
    theoryOfChange: {
      input:
        "Capital raised acquires water entitlements and agricultural land in the Murray-Darling Basin.",
      output:
        "Environmental water allocations are donated to the Murray-Darling Basin Authority for environmental flows. Agricultural operations generate revenue to sustain ongoing entitlement donations.",
      outcome:
        "Verified increase in environmental water flows: 2,000 ML per annum donated to environmental purposes. Measurable improvement in riparian ecosystem health across targeted reaches.",
      impact:
        "Restoration of ecological function in degraded river reaches — supporting native fish populations, waterbird habitats, and floodplain vegetation consistent with Australia's Basin Plan long-term environmental objectives.",
    },
    outcomeKpis: [
      {
        label: "Water donated to environmental flows",
        value: "2,000",
        unit: "ML per annum",
        cadence: "annual",
      },
      {
        label: "Farmland under biodiversity-compatible management",
        value: "3,200",
        unit: "hectares",
        cadence: "annual",
      },
      {
        label: "Environmental water entitlements held",
        value: null,
        unit: "ML (reported at portfolio level)",
        cadence: "annual",
      },
    ],
    reportingCadence: "annual",
    assuranceProvider: "RMCG (Natural Resource Management Consultants)",
    avatarInitials: "KR",
    heroPalette: {
      base: "#1a3a2a",
      baseDark: "#0f2218",
      accent: "#4caf82",
      overlay: "rgba(26,58,42,0.82)",
    },
    heroImage: "https://images.unsplash.com/photo-1500258571355-332da5cb07aa?auto=format&fit=crop&w=1920&q=80",
    investmentTypeLabel: "Open-ended Fund",
    tags: ["Nature-Based", "Environmental Flows", "Water"],
    impactIntensity: "High",
    searchKeywords: [
      "water",
      "ecosystems",
      "biodiversity",
      "nature",
      "basin",
      "agriculture",
      "environmental flows",
      "Murray-Darling",
    ],
  },
  {
    slug: "net-wilton-project",
    status: "live",
    issuer: "New Energy Transport",
    projectName: "Series A Equity Raise",
    subtitle:
      "Australia's first purpose-built zero-emission heavy freight hub — electrifying long-haul transport at scale.",
    sector: "energy-transport",
    geography: "Australia — Wilton, NSW",
    type: "direct-equity",
    assetClass: "Private Equity",
    stage: "Series A",
    issueSize: { amount: 35, currency: "AUD" },
    targetNetReturns: null,
    expectedLiquidity: "Strategic exit or IPO",
    distributionFrequency: null,
    expectedMaturity: "5–7 years",
    closeDate: "2026-12-31",
    minimumInvestable: { amount: 100000, currency: "AUD" },
    capitalRequirement:
      "New Energy Transport (NET) is developing Australia's first purpose-built zero-emission heavy freight hub at Wilton, New South Wales. The Series A raise will fund the construction of the Wilton charging depot and maintenance facilities, along with the acquisition of a commercial fleet of battery-electric heavy vehicles to operate on contracted freight routes.",
    useOfProceeds:
      "The opportunity targets the hard-to-abate heavy freight sector, which accounts for a disproportionate share of transport-related emissions in Australia. NET's asset-backed model combines long-term freight contracts with major logistics partners, federal ARENA infrastructure grant support, and a proprietary fleet management platform designed to optimise charge scheduling and route efficiency. Wilton represents the first site in a planned national network of zero-emission freight hubs.",
    investmentHighlights: [
      "First-mover position in Australian zero-emission heavy freight",
      "Long-term freight agreements with major logistics partners (undisclosed, under NDA)",
      "Federal ARENA grant funding secured for charging infrastructure",
      "Proprietary fleet management software optimising charge scheduling and route efficiency",
      "Scalable hub model — Wilton as first of planned national network",
    ],
    primaryPositivePursuit: {
      code: "PP06",
      label: "Others generate fewer greenhouse gas emissions",
    },
    secondaryPositivePursuit: {
      code: "PP01",
      label: "Others depend less on non-renewable energy",
    },
    sdgAlignment: ["SDG 7", "SDG 9", "SDG 13"],
    theoryOfChange: {
      input:
        "Equity capital funds construction of a zero-emission heavy freight hub and acquisition of BEV prime movers.",
      output:
        "Heavy freight tonne-kilometres shifted from diesel to battery-electric drive. Renewable energy consumed per kilometre tracked and reported.",
      outcome:
        "Verified reduction in Scope 1 transport emissions per tonne-kilometre across the contracted freight network relative to diesel baseline.",
      impact:
        "Structural decarbonisation of a historically hard-to-abate transport segment, demonstrating commercial viability of zero-emission heavy freight at scale in Australia.",
    },
    outcomeKpis: [
      {
        label: "CO₂e avoided versus diesel baseline",
        value: null,
        unit: "tCO₂e per annum (reported at fleet level)",
        cadence: "annual",
      },
      {
        label: "Zero-emission freight tonne-kilometres",
        value: null,
        unit: "tonne-km per annum",
        cadence: "annual",
      },
      {
        label: "Renewable energy share of depot consumption",
        value: null,
        unit: "% (target: 100%)",
        cadence: "annual",
      },
    ],
    reportingCadence: "annual",
    assuranceProvider: null,
    avatarInitials: "NE",
    heroPalette: {
      base: "#162535",
      baseDark: "#0f1a26",
      accent: "#5aacda",
      overlay: "rgba(22,37,53,0.85)",
    },
    heroImage: "https://images.unsplash.com/photo-1592805144716-feeccccef5ac?auto=format&fit=crop&w=1920&q=80",
    investmentTypeLabel: "Series A",
    tags: ["Zero-Emission Transport", "Climate", "Infrastructure"],
    impactIntensity: "High",
    searchKeywords: [
      "EV",
      "electric vehicles",
      "freight",
      "transport",
      "decarbonisation",
      "zero-emission",
      "trucks",
      "energy",
      "logistics",
    ],
  },
  {
    slug: "number8bio-series-a",
    status: "coming-soon",
    issuer: "Number8Bio",
    projectName: "Series A Equity Raise",
    subtitle:
      "Proprietary biological feed supplement that measurably reduces enteric methane emissions from ruminant livestock.",
    sector: "agritech",
    geography: "Australia / New Zealand",
    type: "direct-equity",
    assetClass: "Private Equity",
    stage: "Series A",
    issueSize: { amount: 12, currency: "AUD" },
    targetNetReturns: null,
    expectedLiquidity: null,
    distributionFrequency: null,
    expectedMaturity: "5–8 years",
    closeDate: "2026-12-31",
    minimumInvestable: { amount: 100000, currency: "AUD" },
    capitalRequirement:
      "Number8Bio is commercialising a proprietary biological feed supplement that measurably reduces enteric methane emissions from ruminant livestock. Developed from AgResearch NZ origins, the formulation has demonstrated methane reduction efficacy in peer-reviewed trials and is progressing toward Australasian regulatory approval. The Series A raise will fund the completion of clinical trials, regulatory approvals, and initial commercial-scale production.",
    useOfProceeds:
      "The addressable market spans over 26 million cattle and 70 million sheep in Australia alone, with strong strategic interest from major pastoral operators. Number8Bio's intellectual property is protected via patent filings across Australia, New Zealand, and the United States. The company's technology directly addresses one of the most significant and underserved sources of agricultural greenhouse gas emissions globally.",
    investmentHighlights: [
      "Proprietary biological formulation with peer-reviewed methane reduction efficacy",
      "Addressable market: 26m+ cattle and 70m+ sheep in Australia alone",
      "Strategic interest from several major pastoral operators",
      "IP protection via patent filings in AU, NZ, US",
      "Founder team includes AgResearch NZ alumni",
    ],
    primaryPositivePursuit: {
      code: "PP06",
      label: "Others generate fewer greenhouse gas emissions",
    },
    sdgAlignment: ["SDG 2", "SDG 13"],
    theoryOfChange: {
      input:
        "Series A capital funds clinical trials and regulatory approval for a biological methane-reducing feed supplement for ruminant livestock.",
      output:
        "Feed supplement commercially adopted by pastoral operators. Methane reduction per head per day measured under real-world conditions.",
      outcome:
        "Verified reduction in enteric methane emissions per animal across adopting farms, measured against un-supplemented baseline.",
      impact:
        "Material reduction in agricultural methane emissions from Australian and New Zealand pastoral sectors — one of the highest per-capita sources of agricultural GHG globally.",
    },
    outcomeKpis: [
      {
        label: "Enteric methane reduction per animal per day",
        value: null,
        unit: "% vs. baseline (final KPIs to be confirmed at listing)",
        cadence: "annual",
      },
      {
        label: "Livestock under supplementation",
        value: null,
        unit: "head (reported at commercial-stage launch)",
        cadence: "annual",
      },
    ],
    reportingCadence: "annual",
    assuranceProvider: null,
    avatarInitials: "N8",
    heroPalette: {
      base: "#1a3a2a",
      baseDark: "#0f2218",
      accent: "#4caf82",
      overlay: "rgba(26,58,42,0.82)",
    },
    heroImage: "https://images.unsplash.com/photo-1500595046743-cd271d694e30?auto=format&fit=crop&w=1920&q=80",
    investmentTypeLabel: "Series A",
    tags: ["Agritech", "Climate", "Agriculture"],
    impactIntensity: "Moderate",
    searchKeywords: [
      "methane",
      "livestock",
      "agritech",
      "agriculture",
      "feed",
      "ruminant",
      "cattle",
      "sheep",
      "emissions",
      "pastoral",
    ],
  },
  {
    slug: "sicona-series-b",
    status: "coming-soon",
    issuer: "Sicona Battery Technologies",
    projectName: "Series B Equity Raise",
    subtitle:
      "High-energy-density silicon anode materials enabling the next generation of lithium-ion batteries for EVs and grid storage.",
    sector: "advanced-materials",
    geography: "Australia (Sydney / Wollongong)",
    type: "direct-equity",
    assetClass: "Private Equity",
    stage: "Series B",
    issueSize: { amount: 30, currency: "AUD" },
    targetNetReturns: null,
    expectedLiquidity: null,
    distributionFrequency: null,
    expectedMaturity: "5–7 years",
    closeDate: "2026-12-31",
    minimumInvestable: { amount: 100000, currency: "AUD" },
    capitalRequirement:
      "Sicona Battery Technologies is scaling the production of its breakthrough silicon composite anode material, developed from foundational research at the University of New South Wales (UNSW). Silicon anodes significantly outperform conventional graphite anodes in energy density, and Sicona's composite formulation has achieved over 800 Wh/L — a step-change that enables longer-range electric vehicles and more cost-effective grid storage. The Series B raise will fund pilot-plant scale-up and entry into supply agreements with battery cell manufacturers.",
    useOfProceeds:
      "Sicona has received CSIRO co-investment and letters of intent from two Tier-1 battery cell manufacturers. The company's Australian-origin IP and silicon feedstock provide a critical-minerals angle, reducing supply chain exposure to offshore processing. As battery technology becomes central to the energy transition, Sicona's position in the upstream materials supply chain represents a strategic enabling-technology investment.",
    investmentHighlights: [
      "Breakthrough silicon composite anode achieving >800 Wh/L energy density",
      "Australian-origin IP, developed from UNSW research",
      "Letters of intent from two Tier-1 battery cell manufacturers (undisclosed)",
      "CSIRO co-investment confirmed",
      "Critical minerals angle: Australian silicon feedstock reduces supply chain exposure",
    ],
    primaryPositivePursuit: {
      code: "PP01",
      label: "Others depend less on non-renewable energy",
    },
    secondaryPositivePursuit: {
      code: "PP06",
      label: "Others generate fewer greenhouse gas emissions",
    },
    sdgAlignment: ["SDG 7", "SDG 9", "SDG 12"],
    theoryOfChange: {
      input:
        "Series B capital scales production of silicon composite anode materials for lithium-ion batteries.",
      output:
        "Qualified anode materials supplied to battery cell manufacturers, enabling higher energy density EV and grid storage batteries.",
      outcome:
        "Increased energy density and reduced cost per kWh of batteries incorporating Sicona anode materials, supporting accelerated EV adoption and grid storage deployment.",
      impact:
        "Enabling infrastructure for large-scale electrification — reducing lifecycle emissions of transport and energy systems that adopt Sicona-enabled battery technology.",
    },
    outcomeKpis: [
      {
        label: "Anode material production capacity",
        value: null,
        unit: "tonnes per annum (reported at commercial-stage launch)",
        cadence: "annual",
      },
      {
        label: "Energy density of qualified anode",
        value: null,
        unit: "Wh/L (final KPIs to be confirmed at listing)",
        cadence: "annual",
      },
    ],
    reportingCadence: "annual",
    assuranceProvider: null,
    avatarInitials: "SI",
    heroPalette: {
      base: "#162535",
      baseDark: "#0f1a26",
      accent: "#5aacda",
      overlay: "rgba(22,37,53,0.85)",
    },
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80",
    investmentTypeLabel: "Series B",
    tags: ["Advanced Materials", "Clean Energy", "Climate"],
    impactIntensity: "Moderate",
    searchKeywords: [
      "battery",
      "anode",
      "silicon",
      "EV",
      "energy storage",
      "advanced materials",
      "lithium-ion",
      "grid storage",
    ],
  },
  {
    slug: "sva-older-womens-housing-fund",
    status: "coming-soon",
    issuer: "Social Ventures Australia",
    projectName: "Older Women's Housing Fund",
    subtitle:
      "Affordable housing fund targeting the fastest-growing cohort of at-risk Australians — women over 55 experiencing housing insecurity.",
    sector: "social-housing",
    geography: "Australia (metro + peri-urban)",
    type: "fund",
    assetClass: "Private Credit",
    stage: "Pre-launch",
    issueSize: { amount: 40, currency: "AUD" },
    targetNetReturns: null,
    expectedLiquidity: null,
    distributionFrequency: "Semi-annual",
    expectedMaturity: "7–10 years",
    closeDate: "2026-12-31",
    minimumInvestable: { amount: 100000, currency: "AUD" },
    capitalRequirement:
      "Social Ventures Australia (SVA) is establishing a dedicated impact fund to address the acute shortage of affordable housing for women over 55 experiencing or at risk of housing insecurity. This cohort represents the fastest-growing segment of homelessness in Australia, driven by relationship breakdown, superannuation inequality, and limited access to social housing. The fund will acquire and develop affordable rental housing stock structured to deliver below-market rents to eligible tenants while generating a risk-adjusted return for investors.",
    useOfProceeds:
      "SVA brings an established track record in social-outcomes-linked investment structures and will measure tenancy stability, housing stress reduction, and community integration using an independent outcomes framework developed with ARTD Consultants. The fund is in discussions with state government co-funders and is aligned with the National Housing Finance and Investment Corporation (NHFIC) framework. Impact KPIs will be independently assured on a bi-annual basis.",
    investmentHighlights: [
      "Addresses the fastest-growing homelessness cohort in Australia: women 55+",
      "SVA's track record in social-outcomes-linked investment structures",
      "State government co-funding in discussions (undisclosed jurisdictions)",
      "National Housing Finance and Investment Corporation (NHFIC) alignment",
      "Independent social-outcomes measurement by ARTD Consultants",
    ],
    primaryPositivePursuit: {
      code: "PP16",
      label: "Health and safety are universally assured",
    },
    secondaryPositivePursuit: {
      code: "PP17",
      label: "People's capabilities are strengthened",
    },
    sdgAlignment: ["SDG 1", "SDG 10", "SDG 11"],
    theoryOfChange: {
      input:
        "Capital acquires and develops affordable rental housing stock for women over 55 experiencing or at risk of housing insecurity.",
      output:
        "Affordable tenancies created below market-rate rents. Tenants receive wrap-around support services (community services partners to be confirmed).",
      outcome:
        "Measurable reduction in housing stress and homelessness risk among tenants. Sustained tenancy stability tracked over minimum 2-year periods.",
      impact:
        "Structural improvement in housing security outcomes for a systematically underserved demographic — reducing downstream health, justice, and welfare system costs.",
    },
    outcomeKpis: [
      {
        label: "Affordable tenancies created",
        value: null,
        unit: "dwellings (final KPIs to be confirmed at listing)",
        cadence: "annual",
      },
      {
        label: "Tenancy stability rate",
        value: null,
        unit: "% sustained over 24 months",
        cadence: "bi-annual",
      },
    ],
    reportingCadence: "bi-annual",
    assuranceProvider: null,
    avatarInitials: "SV",
    heroPalette: {
      base: "#2e2412",
      baseDark: "#1e1808",
      accent: "#d4a45a",
      overlay: "rgba(46,36,18,0.85)",
    },
    heroImage: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1920&q=80",
    investmentTypeLabel: "Fund",
    tags: ["Social Housing", "Community", "Inclusion"],
    impactIntensity: "High",
    searchKeywords: [
      "housing",
      "homelessness",
      "social",
      "affordable housing",
      "women",
      "community",
      "welfare",
    ],
  },
];

export function getOpportunity(slug: string): Opportunity | undefined {
  return opportunities.find((o) => o.slug === slug);
}

export function formatCurrency(
  amount: number,
  currency: "AUD" | "USD"
): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(amount % 1000 === 0 ? 0 : 1)}bn ${currency}`;
  }
  return `$${amount}m ${currency}`;
}

// For raw dollar amounts (minimumInvestable etc.) stored as actual numbers, not millions
export function formatMinInvestment(
  amount: number,
  currency: "AUD" | "USD"
): string {
  return `${currency} ${amount.toLocaleString("en-AU")}`;
}

export const sectorLabels: Record<Opportunity["sector"], string> = {
  "nature-based": "Nature-Based",
  "social-housing": "Social Housing",
  "energy-transport": "Energy & Transport",
  agritech: "Agritech",
  "advanced-materials": "Advanced Materials",
};

export const sectorColors: Record<Opportunity["sector"], string> = {
  "nature-based": "#1a3a2a",
  "social-housing": "#2e2412",
  "energy-transport": "#162535",
  agritech: "#1a3a2a",
  "advanced-materials": "#162535",
};

// Three-category palette: green (nature/agri), blue (energy/climate), red (social)
export type CategoryPalette = {
  base: string;
  baseDark: string;
  accent: string;
  overlay: string;
};

export const categoryPalettes: Record<Opportunity["sector"], CategoryPalette> = {
  "nature-based":      { base: "#1a3a2a", baseDark: "#0f2218", accent: "#4caf82", overlay: "rgba(26,58,42,0.82)" },
  agritech:            { base: "#1a3a2a", baseDark: "#0f2218", accent: "#4caf82", overlay: "rgba(26,58,42,0.82)" },
  "energy-transport":  { base: "#162535", baseDark: "#0f1a26", accent: "#5b8fb5", overlay: "rgba(22,37,53,0.85)" },
  "advanced-materials":{ base: "#162535", baseDark: "#0f1a26", accent: "#5b8fb5", overlay: "rgba(22,37,53,0.85)" },
  "social-housing":    { base: "#2a1d14", baseDark: "#1c1410", accent: "#c07a52", overlay: "rgba(42,29,20,0.85)" },
};
