import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMoon, FiSun, FiUserPlus } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { useCompany } from "@/lib/company-store";
import { saveContact } from "@/lib/card-utils";

export function FloatingBar() {
  const { company } = useCompany();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("arise-theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("arise-theme", next ? "dark" : "light");
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={toggle}
        aria-label="Toggle dark mode"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="glass fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full text-foreground"
      >
        {dark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
      </motion.button>

      <motion.nav
        initial={{ y: 90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 bottom-4 z-50 px-4"
        aria-label="Primary contact actions"
      >
        <div className="glass-strong mx-auto flex max-w-md items-center gap-2 rounded-full p-2">
          <a
            href={`tel:${company.mobileRaw}`}
            className="emerald-gradient flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 font-ui text-sm font-semibold text-white"
          >
            <FiPhone className="h-4 w-4" /> Call
          </a>
          <a
            href={`https://wa.me/${company.mobileRaw.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gold px-4 py-3 font-ui text-sm font-semibold text-white dark:text-gold-foreground"
          >
            <FaWhatsapp className="h-4 w-4" /> WhatsApp
          </a>
          <button
            type="button"
            onClick={() => saveContact(company)}
            aria-label="Save contact"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
          >
            <FiUserPlus className="h-4 w-4" />
          </button>
        </div>
      </motion.nav>
    </>
  );
}
