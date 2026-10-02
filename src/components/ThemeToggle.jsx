import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../lib/theme";
import Icon from "../lib/icons";

export default function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-deep transition-colors hover:bg-tint ${className}`}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      data-testid="theme-toggle"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.2 }}
          className="flex"
        >
          <Icon name={theme === "dark" ? "Sun" : "Moon"} className="h-5 w-5" />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
