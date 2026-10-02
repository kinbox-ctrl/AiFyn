import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const SIZE = 30;
// arrow tip sits at (46.5, 17.5) in the 64 viewBox (before mirroring) — shift it onto the centre when idle
const TIP_SHIFT = 14.5;
const SPRING = { type: "spring", stiffness: 320, damping: 22 };

/**
 * Brand cursor — the logo, deconstructed. Idle: the mark's arrow leads and its
 * rounded-square frame trails behind. Over anything clickable the two snap
 * together into the full AiFyn mark.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hot, setHot] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 55, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 900, damping: 55, mass: 0.4 });
  const fx = useSpring(x, { stiffness: 160, damping: 20, mass: 0.6 });
  const fy = useSpring(y, { stiffness: 160, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.body.classList.add("custom-cursor");
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); };
    const over = (e) => {
      const t = e.target;
      setHot(!!(t && t.closest && t.closest("a,button,[role='button'],input,select,textarea,label,[data-cursor]")));
    };
    const press = () => setDown(true);
    const release = () => setDown(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", press, { passive: true });
    window.addEventListener("mouseup", release, { passive: true });
    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", press);
      window.removeEventListener("mouseup", release);
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      {/* trailing frame — the mark's rounded square, lagging behind the arrow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0"
        style={{ x: fx, y: fy, zIndex: 9998 }}
      >
        <motion.div
          style={{
            width: SIZE,
            height: SIZE,
            marginLeft: -SIZE / 2,
            marginTop: -SIZE / 2,
            borderRadius: SIZE * 0.22,
            border: "1.5px solid #FE7A59",
          }}
          animate={{ opacity: hot ? 0 : 0.55, scale: hot ? 0.6 : down ? 0.8 : 1, rotate: hot ? 0 : 8 }}
          transition={SPRING}
        />
      </motion.div>

      {/* arrow — becomes the full mark on hover */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        style={{ x: sx, y: sy }}
      >
        <motion.svg
          viewBox="0 0 64 64"
          width={SIZE}
          height={SIZE}
          style={{ display: "block", marginLeft: -SIZE / 2, marginTop: -SIZE / 2, overflow: "visible" }}
          animate={{ scale: down ? 0.85 : hot ? 1.25 : 1 }}
          transition={SPRING}
        >
          <defs>
            <linearGradient id="aifyn-cursor-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FE7A59" />
              <stop offset="1" stopColor="#FE9937" />
            </linearGradient>
            <linearGradient id="aifyn-cursor-arrow" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#FEC437" />
              <stop offset="1" stopColor="#FFD447" />
            </linearGradient>
            <clipPath id="aifyn-cursor-clip">
              <rect width="64" height="64" rx="14" />
            </clipPath>
          </defs>
          {/* mirrored mark — arrow points up-left like a native pointer */}
          <g transform="translate(64 0) scale(-1 1)">
            <motion.rect
              width="64"
              height="64"
              rx="14"
              fill="url(#aifyn-cursor-bg)"
              initial={false}
              animate={{ opacity: hot ? 1 : 0, scale: hot ? 1 : 0.4 }}
              transition={SPRING}
            />
            <g clipPath="url(#aifyn-cursor-clip)">
              <motion.g
                fill="none"
                strokeWidth="9.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={false}
                animate={{ x: hot ? 0 : -TIP_SHIFT, y: hot ? 0 : TIP_SHIFT }}
                transition={SPRING}
              >
                {["url(#aifyn-cursor-bg)", "url(#aifyn-cursor-arrow)"].map((stroke, i) => (
                  <motion.g
                    key={stroke}
                    stroke={stroke}
                    initial={false}
                    animate={{ opacity: (i === 1) === hot ? 1 : 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <motion.path
                      initial={false}
                      animate={{ d: hot ? "M46.5 17.5 L-4 68" : "M46.5 17.5 L22 42" }}
                      transition={SPRING}
                    />
                    <path d="M23 17.5 H46.5 V41" />
                  </motion.g>
                ))}
              </motion.g>
            </g>
          </g>
        </motion.svg>
      </motion.div>
    </>
  );
}
