import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";
import { NAV_LINKS } from "../data/site";
import Icon from "../lib/icons";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-[70] flex justify-center px-4">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`flex w-full max-w-5xl items-center justify-between gap-6 rounded-full py-2.5 pl-5 pr-2.5 transition-all duration-300 ${
          scrolled ? "glass-deep shadow-glass" : "glass"
        }`}
        aria-label="Main navigation"
        data-testid="navbar"
      >
        <Logo />
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive ? "bg-tint text-deep" : "text-ink/60 hover:text-deep"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Magnetic strength={0.25} className="hidden md:inline-block">
            <Link
              to="/contact"
              data-testid="nav-book-demo-button"
              className="btn-warm inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-200 hover:scale-[1.03]"
            >
              Book a Demo
              <Icon name="ArrowUpRight" className="h-4 w-4" />
            </Link>
          </Magnetic>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-deep md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            data-testid="nav-menu-toggle"
          >
            <Icon name={open ? "X" : "Menu"} className="h-5 w-5" />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="glass-deep absolute top-[72px] left-4 right-4 rounded-3xl p-4 shadow-glass md:hidden"
            data-testid="nav-mobile-menu"
          >
            {NAV_LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className="block rounded-2xl px-4 py-3 text-base font-medium text-ink/80 hover:bg-tint hover:text-deep"
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" className="btn-warm mt-2 block rounded-2xl px-4 py-3 text-center text-base font-semibold">
              Book a Demo
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}