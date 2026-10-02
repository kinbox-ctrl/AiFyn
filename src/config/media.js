// ─── AiFyn media slots ─────────────────────────────────────────────────────
// ONE config file for every video/poster slot on the site.
// • Videos live in  /public/videos/  and posters in /public/posters/.
// • Drop your own AI-generated or real demo footage in using the exact names
//   in `video:` below and the loops light up automatically — the poster plus
//   the animated AI overlay layer always render, so a missing video file
//   gracefully shows a designed static frame instead.
export const MEDIA = {
  hero:          { label: "Hero — bright factory floor",  video: "/videos/hero.mp4",                    poster: "/posters/hero.jpg" },
  parking:       { label: "Perimeter parking",            video: "/videos/capability-intrusion.mp4",    poster: "/posters/parking.jpg" },
  warehouse:     { label: "Warehouse interior",           video: "/videos/capability-theft.mp4",        poster: "/posters/warehouse.jpg" },
  workers:       { label: "Workers on site",              video: "/videos/capability-ppe.mp4",          poster: "/posters/construction-2.jpg" },
  cctv:          { label: "CCTV cameras",                 video: "/videos/capability-face.mp4",         poster: "/posters/cctv.jpg" },
  highway:       { label: "Highway traffic",              video: "/videos/capability-anpr.mp4",         poster: "/posters/highway.jpg" },
  crowd:         { label: "Street footfall",              video: "/videos/capability-footfall.mp4",     poster: "/posters/crowd.jpg" },
  kitchenFire:   { label: "Kitchen line",                 video: "/videos/capability-fire.mp4",         poster: "/posters/kitchen-2.jpg" },
  kitchen:       { label: "Commercial kitchen",           video: "/videos/capability-hygiene.mp4",      poster: "/posters/kitchen.jpg" },
  highwayAerial: { label: "Aerial highway",               video: "/videos/capability-driver.mp4",       poster: "/posters/highway-2.jpg" },
  pharmaQc:      { label: "Quality inspection",           video: "/videos/capability-quality.mp4",      poster: "/posters/pharma-2.jpg" },
  campus:        { label: "School campus",                video: "/videos/industry-schools.mp4",        poster: "/posters/campus.jpg" },
  pharma:        { label: "Pharma cleanroom",             video: "/videos/industry-pharma.mp4",         poster: "/posters/pharma.jpg" },
  construction:  { label: "Construction site",            video: "/videos/industry-construction.mp4",   poster: "/posters/construction.jpg" },
  manufacturing: { label: "Manufacturing floor",          video: "/videos/industry-manufacturing.mp4",  poster: "/posters/hero.jpg" },
  street:        { label: "City street",                  video: "/videos/industry-hospitality.mp4",    poster: "/posters/crowd-2.jpg" },
  ctaLoop:       { label: "CTA aurora loop",              video: "/videos/cta-loop.mp4",                poster: "/posters/hero.jpg" },
};

export default MEDIA;