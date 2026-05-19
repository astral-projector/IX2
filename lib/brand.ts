// Central brand configuration — swap these values post-legal review without touching components.
export const brand = {
  name: "ImpactX",
  fullName: "ImpactX Markets",
  tagline: "Trustworthy infrastructure for impact capital",
  subheadPlaceholder: "[Subhead TBC]",
  contactEmail: "hello@impactxmarkets.com", // Replace with confirmed address
  legalDisclaimer:
    "Nothing on this site constitutes financial product advice, a recommendation, or an offer to acquire a financial product. Information is provided for general informational purposes only.",
  confidentialBannerText: "Confidential — Invite Only",
  johnWestCounter: {
    start: 27,
    end: 6,
    startLabel: "deals reviewed",
    endLabel: "impact certified",
    caveat:
      "Illustrative — based on our pilot review process. Real-time figures coming soon.",
  },
};

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://impactxmarkets.com";
