import { motion } from "framer-motion";
import { CONTACT } from "../data/site";
import Icon from "../lib/icons";

export default function WhatsAppButton() {
  return (
    <motion.a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with AiFyn on WhatsApp"
      data-testid="whatsapp-float-button"
      className="fixed bottom-5 right-5 z-[60] flex h-13 w-13 items-center justify-center rounded-full shadow-glass"
      style={{ height: 52, width: 52, background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)" }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 18 }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-20" />
      <Icon name="MessageCircle" className="h-6 w-6 text-white" />
    </motion.a>
  );
}