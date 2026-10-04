// Site-wide editable content. Swap stats, logos, contact details here.
export const BRAND = {
  name: "AiFyn",
  tagline: "Ai For Your Needs",
  coreLine: "Your cameras see everything. AiFyn understands it.",
  url: (import.meta.env.VITE_SITE_URL || (typeof window !== "undefined" ? window.location.origin : "")).replace(/\/$/, ""),
};

export const CONTACT = {
  email: "hello@aifyn.in",
  phone: "+91-9355570800",
  phoneHref: "tel:+919355570800",
  whatsapp: "https://wa.me/919355570800?text=Hi%20AiFyn%20—%20I%27d%20like%20to%20book%20a%20live%20demo.",
  cities: ["Delhi", "Gurugram", "Noida", "Goa", "Yamunanagar"],
  offices: [
    { label: "Corporate office", address: "Nukleus Coworking & Managed Offices, Plot No 29, Sector 142, Noida, Uttar Pradesh - 201305" },
    { label: "Regd. office", address: "#14, Raghunath Puri, Yamunanagar, Haryana - 135001" },
  ],
};

export const NAV_LINKS = [
  { label: "Solutions", to: "/solutions" },
  { label: "Industries", to: "/industries" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const STATS = [
  { value: "<1s", label: "alert time", animated: false },
  { value: "24/7", label: "coverage", animated: false },
  { value: "90", suffix: "%", prefix: "up to ", label: "less manual monitoring", animated: true },
];

export const DIFFERENTIATORS = [
  { icon: "Video", title: "Works on existing cameras", body: "No rip-and-replace. AiFyn plugs into the CCTV you already own — analogue or IP." },
  { icon: "Cpu", title: "Edge + cloud", body: "On-device inference for instant alerts, cloud layer for trends and reports." },
  { icon: "ShieldCheck", title: "Secure & private", body: "Encrypted in transit and at rest. Face and plate data stay under your control." },
  { icon: "Zap", title: "Fast deployment", body: "From site survey to live alerts in days, not quarters." },
];

// PLACEHOLDER client logos — replace with real marks in /src/data/site.js
export const CLIENT_LOGOS = [
  "NORTHSTAR GROUP", "VELOCITY LOGISTICS", "MEDIRA LABS", "OAKRIDGE SCHOOLS",
  "CIVIC MALL", "PRIME FOODS", "APEX AUTOMOTIVE", "HARBOUR HOTELS",
];

export const SOCIALS = [
  { label: "LinkedIn", href: "#", icon: "Linkedin" },
  { label: "X", href: "#", icon: "Twitter" },
  { label: "YouTube", href: "#", icon: "Youtube" },
  { label: "Instagram", href: "#", icon: "Instagram" },
];

export const INDUSTRY_OPTIONS = [
  "Schools & Campuses", "Pharma", "Construction", "Manufacturing",
  "Hospitality", "Food & Beverage", "Logistics", "Other",
];

export const CAMERA_OPTIONS = ["1–10", "11–50", "51–200", "200+"];