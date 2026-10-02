import MEDIA from "../config/media";

// 10 AiFyn capabilities. `boxes` are % coordinates for the AI overlay motif.
const box = (x, y, w, h, label, conf, tone = "teal") => ({ x, y, w, h, label, conf, tone });

export const CAPABILITIES = [
  {
    slug: "intrusion-perimeter",
    name: "Intrusion & Perimeter",
    short: "Zones no one should cross, watched every second.",
    icon: "Fence",
    span: "md:col-span-4",
    media: MEDIA.parking,
    boxes: [box(18, 38, 22, 40, "PERSON", "0.96", "warm"), box(62, 30, 26, 48, "ZONE-A", "0.91")],
    bullets: [
      "Virtual fences around yards, gates and restricted floors",
      "Human vs. vehicle vs. animal classification — no false alarms",
      "Sub-second alerts to WhatsApp, app and dashboard",
    ],
  },
  {
    slug: "theft-loss-prevention",
    name: "Theft & Loss Prevention",
    short: "Catch lifted stock and till-side losses before they leave.",
    icon: "PackageSearch",
    span: "md:col-span-2",
    media: MEDIA.warehouse,
    boxes: [box(30, 30, 28, 52, "CARRY-OBJ", "0.88", "warm")],
    bullets: [
      "After-hours movement in stock and cash zones",
      "Loitering and concealment behaviour flagged live",
      "Incident clips auto-saved with camera, time and confidence",
    ],
  },
  {
    slug: "ppe-safety",
    name: "PPE & Safety",
    short: "Helmets, vests and protocols — enforced on every frame.",
    icon: "HardHat",
    span: "md:col-span-2",
    media: MEDIA.workers,
    boxes: [box(14, 22, 20, 55, "HELMET", "0.97"), box(48, 30, 24, 50, "VEST", "0.94", "warm")],
    bullets: [
      "Helmet, vest, gloves and goggles detection by zone",
      "Machine-zone and harness checks for work at height",
      "Shift-wise compliance scores per line or crew",
    ],
  },
  {
    slug: "face-recognition-attendance",
    name: "Face Recognition & Attendance",
    short: "Known faces in, contactless attendance out.",
    icon: "ScanFace",
    span: "md:col-span-2",
    media: MEDIA.cctv,
    boxes: [box(34, 26, 22, 30, "EMP-0142", "0.99", "warm")],
    bullets: [
      "Contactless check-in for staff and visitors",
      "Watchlists for banned persons or VIP guests",
      "Opt-in enrolment with full data-privacy controls",
    ],
  },
  {
    slug: "vehicle-anpr",
    name: "Vehicle / ANPR",
    short: "Every plate logged at every gate, automatically.",
    icon: "CarFront",
    span: "md:col-span-2",
    media: MEDIA.highway,
    boxes: [box(20, 52, 34, 22, "MH-12-AB-3456", "0.98", "warm")],
    bullets: [
      "Number-plate recognition at gates, docks and ramps",
      "Allow / deny lists with instant barrier decisions",
      "Speed and route insights across your yard",
    ],
  },
  {
    slug: "footfall-crowd-analytics",
    name: "Footfall & Crowd Analytics",
    short: "Count, flow and density — live and historic.",
    icon: "Users",
    span: "md:col-span-3",
    media: MEDIA.crowd,
    boxes: [box(12, 30, 18, 46, "PERSON", "0.95"), box(58, 34, 20, 44, "COUNT 34", "—")],
    bullets: [
      "Entries, exits, dwell time and heatmaps per zone",
      "Crowd-density alerts before bottlenecks form",
      "Footfall trends by hour, day and campaign",
    ],
  },
  {
    slug: "fire-smoke",
    name: "Fire & Smoke",
    short: "Flames and smoke flagged before sprinklers wake.",
    icon: "Flame",
    span: "md:col-span-3",
    media: MEDIA.kitchenFire,
    boxes: [box(40, 34, 26, 34, "SMOKE", "0.89", "warm")],
    bullets: [
      "Visual smoke and open-flame detection, seconds faster than heat sensors",
      "Zone-specific alerts to fire wardens",
      "Works alongside — never replaces — existing fire systems",
    ],
  },
  {
    slug: "hygiene-monitoring",
    name: "Hygiene Monitoring",
    short: "Standards you can see, on every shift.",
    icon: "Droplets",
    span: "md:col-span-2",
    media: MEDIA.kitchen,
    boxes: [box(26, 28, 24, 48, "GLOVE", "0.92"), box(60, 40, 20, 34, "CAP", "0.90", "warm")],
    bullets: [
      "Hairnet, glove and cap compliance in food zones",
      "Pest-activity and spill detection out of hours",
      "Clean-in-progress and handwash event logging",
    ],
  },
  {
    slug: "driver-behaviour",
    name: "Driver Behaviour",
    short: "Fatigue, speed and phone use, caught early.",
    icon: "Gauge",
    span: "md:col-span-2",
    media: MEDIA.highwayAerial,
    boxes: [box(30, 36, 26, 40, "DRIVER", "0.93", "warm")],
    bullets: [
      "Phone use, seatbelt and fatigue detection in cabs",
      "Harsh braking and over-speed events scored per trip",
      "Fleet safety leaderboards and coaching clips",
    ],
  },
  {
    slug: "quality-checks",
    name: "Quality Checks",
    short: "Defects spotted on the line, in real time.",
    icon: "BadgeCheck",
    span: "md:col-span-2",
    media: MEDIA.pharmaQc,
    boxes: [box(34, 30, 28, 42, "DEFECT", "0.87", "warm")],
    bullets: [
      "Surface, seal and label defect detection at line speed",
      "Batch-level image evidence for every rejection",
      "Consistency scores across shifts and machines",
    ],
  },
];

export const getCapability = (slug) => CAPABILITIES.find((c) => c.slug === slug);