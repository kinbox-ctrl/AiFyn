import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

export default function Counter({ to, suffix = "", prefix = "", className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (x) => setV(Math.round(x)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {v}
      {suffix}
    </span>
  );
}