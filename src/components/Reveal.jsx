import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export function Reveal({ children, delay = 0, y = 28, className = "", once = true }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Masked line-by-line reveal — the signature on-load moment. */
export function MaskLine({ children, delay = 0, className = "", innerClassName = "", as: Tag = "span" }) {
  return (
    <Tag className={`block overflow-hidden ${className}`}>
      <motion.span
        className={`block will-change-transform ${innerClassName}`}
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.9, delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}

export function SectionTag({ children, className = "" }) {
  return (
    <p className={`mono-tag flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-aqua" />
      </span>
      {children}
    </p>
  );
}