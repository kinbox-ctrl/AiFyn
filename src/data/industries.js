import MEDIA from "../config/media";

export const INDUSTRIES = [
  {
    slug: "schools-campuses",
    name: "Schools & Campuses",
    tagline: "Safer gates, calmer corridors.",
    icon: "GraduationCap",
    media: MEDIA.campus,
    bullets: [
      "24/7 perimeter security across campus",
      "Smart gate control with plate logging",
      "Instant alerts to wardens and admin",
    ],
    capabilities: ["intrusion-perimeter", "face-recognition-attendance", "vehicle-anpr", "footfall-crowd-analytics"],
  },
  {
    slug: "pharma",
    name: "Pharma",
    tagline: "Clean rooms, cleaner records.",
    icon: "Pill",
    media: MEDIA.pharma,
    bullets: [
      "PPE compliance in clean zones",
      "Batch & product quality on the line",
      "Gowning and glass-zone checks",
    ],
    capabilities: ["ppe-safety", "quality-checks", "hygiene-monitoring", "intrusion-perimeter"],
  },
  {
    slug: "construction",
    name: "Construction",
    tagline: "Every worker home, every machine accounted for.",
    icon: "HardHat",
    media: MEDIA.construction,
    bullets: [
      "Theft prevention for plant & materials",
      "Site safety: helmets, harnesses, zones",
      "After-hours intrusion coverage",
    ],
    capabilities: ["intrusion-perimeter", "ppe-safety", "theft-loss-prevention", "vehicle-anpr"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    tagline: "Consistency, frame by frame.",
    icon: "Factory",
    media: MEDIA.manufacturing,
    bullets: [
      "Product consistency, checked on the line",
      "Line-stop and spill detection",
      "Worker safety in machine zones",
    ],
    capabilities: ["quality-checks", "ppe-safety", "footfall-crowd-analytics", "fire-smoke"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    tagline: "Discreet eyes, warm welcomes.",
    icon: "ConciergeBell",
    media: MEDIA.street,
    bullets: [
      "Live footfall counts by zone",
      "Queue and lobby flow insights",
      "Discreet, guest-friendly monitoring",
    ],
    capabilities: ["footfall-crowd-analytics", "face-recognition-attendance", "fire-smoke"],
  },
  {
    slug: "food-beverage",
    name: "Food & Beverage",
    tagline: "Standards on every shift.",
    icon: "UtensilsCrossed",
    media: MEDIA.kitchen,
    bullets: [
      "Hygiene standards on every shift",
      "Hairnet, glove and cap checks",
      "Cold-room and prep-zone watches",
    ],
    capabilities: ["hygiene-monitoring", "fire-smoke", "quality-checks"],
  },
  {
    slug: "logistics",
    name: "Logistics",
    tagline: "Safer fleets, faster docks.",
    icon: "Truck",
    media: MEDIA.highway,
    bullets: [
      "Driver behaviour & safety scoring",
      "Yard and dock intrusion alerts",
      "Loading-zone throughput visibility",
    ],
    capabilities: ["driver-behaviour", "vehicle-anpr", "intrusion-perimeter", "theft-loss-prevention"],
  },
];

export const getIndustry = (slug) => INDUSTRIES.find((i) => i.slug === slug);