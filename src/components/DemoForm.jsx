import { useState } from "react";
import { motion } from "framer-motion";
import { submitLead } from "../lib/api";
import { INDUSTRY_OPTIONS, CAMERA_OPTIONS } from "../data/site";
import Icon from "../lib/icons";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/;
const PHONE_RE = /^\+?[0-9][0-9\s\-()]{7,16}$/;

const inputCls = (err) =>
  `w-full rounded-xl border bg-white/80 px-4 py-3 text-sm text-ink placeholder:text-ink/35 transition focus:outline-none focus:ring-2 ${
    err ? "border-coral focus:ring-coral/25" : "border-deep/15 focus:border-aqua focus:ring-aqua/25"
  }`;

function Field({ label, err, children, id }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-deep/80">
        {label}
      </label>
      {children}
      {err && (
        <p role="alert" className="mt-1 text-xs font-medium text-coral" data-testid={`${id}-error`}>
          {err}
        </p>
      )}
    </div>
  );
}

export default function DemoForm({ sourcePage }) {
  const [data, setData] = useState({
    name: "", company: "", industry: "", cameras: "", phone: "+91 ", email: "", city: "", message: "", website: "",
  });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | done | fail

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = "Please tell us your name.";
    if (!data.company.trim()) e.company = "Company is required.";
    if (!data.industry) e.industry = "Pick an industry.";
    if (!data.cameras) e.cameras = "Pick a range.";
    if (!PHONE_RE.test(data.phone.trim())) e.phone = "Enter a valid phone number.";
    if (!EMAIL_RE.test(data.email.trim())) e.email = "Enter a valid email.";
    if (!data.city.trim()) e.city = "City is required.";
    return e;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setState("sending");
    try {
      await submitLead({ ...data, sourcePage: sourcePage || window.location.pathname });
      setState("done");
    } catch (err) {
      setState(err?.response?.status === 429 ? "rate" : "fail");
    }
  };

  if (state === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center rounded-2xl bg-white/70 px-6 py-12 text-center"
        data-testid="lead-success"
      >
        <svg viewBox="0 0 52 52" className="h-16 w-16">
          <motion.circle cx="26" cy="26" r="24" fill="none" stroke="#0FB5AE" strokeWidth="2.5"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, ease: "easeOut" }} />
          <motion.path d="M15 27l7 7 15-16" fill="none" stroke="#FE9937" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }} />
        </svg>
        <h3 className="mt-5 font-display text-xl font-bold text-deep">
          Thanks, {data.name.trim().split(" ")[0]}!
        </h3>
        <p className="mt-2 max-w-xs text-sm text-ink/60">
          Thanks, the AiFyn team will contact you within 24 hours.
        </p>
        <button
          onClick={() => { setState("idle"); setData({ name: "", company: "", industry: "", cameras: "", phone: "+91 ", email: "", city: "", message: "", website: "" }); }}
          className="mt-6 text-xs font-semibold text-aqua hover:text-deep"
          data-testid="lead-book-another"
        >
          Book another demo →
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate data-testid="lead-form">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="lead-name" label="Name *" err={errors.name}>
          <input id="lead-name" data-testid="lead-name-input" className={inputCls(errors.name)} value={data.name}
            onChange={set("name")} placeholder="Aarav Sharma" autoComplete="name" />
        </Field>
        <Field id="lead-company" label="Company *" err={errors.company}>
          <input id="lead-company" data-testid="lead-company-input" className={inputCls(errors.company)} value={data.company}
            onChange={set("company")} placeholder="Acme Industries" autoComplete="organization" />
        </Field>
        <Field id="lead-industry" label="Industry *" err={errors.industry}>
          <select id="lead-industry" data-testid="lead-industry-select" className={inputCls(errors.industry)} value={data.industry} onChange={set("industry")}>
            <option value="" disabled>Select industry</option>
            {INDUSTRY_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="lead-cameras" label="No. of cameras *" err={errors.cameras}>
          <select id="lead-cameras" data-testid="lead-cameras-select" className={inputCls(errors.cameras)} value={data.cameras} onChange={set("cameras")}>
            <option value="" disabled>Select range</option>
            {CAMERA_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>
        <Field id="lead-phone" label="Phone *" err={errors.phone}>
          <input id="lead-phone" data-testid="lead-phone-input" type="tel" className={inputCls(errors.phone)} value={data.phone}
            onChange={set("phone")} placeholder="+91 98765 43210" autoComplete="tel" />
        </Field>
        <Field id="lead-email" label="Email *" err={errors.email}>
          <input id="lead-email" data-testid="lead-email-input" type="email" className={inputCls(errors.email)} value={data.email}
            onChange={set("email")} placeholder="you@company.com" autoComplete="email" />
        </Field>
        <Field id="lead-city" label="City *" err={errors.city}>
          <input id="lead-city" data-testid="lead-city-input" className={inputCls(errors.city)} value={data.city}
            onChange={set("city")} placeholder="Gurugram" autoComplete="address-level2" />
        </Field>
        <Field id="lead-message" label="Message (optional)" err={null}>
          <input id="lead-message" data-testid="lead-message-input" className={inputCls(null)} value={data.message}
            onChange={set("message")} placeholder="What would you like AiFyn to watch?" />
        </Field>
      </div>

      {/* honeypot — invisible to humans */}
      <input
        type="text" name="website" value={data.website} onChange={set("website")} tabIndex={-1}
        autoComplete="off" aria-hidden="true" className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {state === "fail" && (
        <p role="alert" className="mt-4 rounded-xl bg-coral/10 px-4 py-3 text-sm text-coral" data-testid="lead-error">
          Something went wrong — please try again or email us directly.
        </p>
      )}
      {state === "rate" && (
        <p role="alert" className="mt-4 rounded-xl bg-coral/10 px-4 py-3 text-sm text-coral" data-testid="lead-rate-error">
          Too many submissions from your network. Please try again in an hour.
        </p>
      )}

      <motion.button
        type="submit"
        disabled={state === "sending"}
        whileHover={{ scale: state === "sending" ? 1 : 1.02 }}
        whileTap={{ scale: state === "sending" ? 1 : 0.98 }}
        className="btn-warm mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-bold tracking-wide disabled:opacity-60"
        data-testid="lead-submit-button"
      >
        {state === "sending" ? (
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Booking…
          </span>
        ) : (
          <>Book a Live Demo <Icon name="ArrowRight" className="h-4 w-4" /></>
        )}
      </motion.button>
      <p className="mt-3 text-center text-[11px] text-ink/40">
        No spam, ever. We reply within 24 hours on working days.
      </p>
    </form>
  );
}