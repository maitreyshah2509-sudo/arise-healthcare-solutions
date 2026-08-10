import { motion } from "framer-motion";
import { FiCheckCircle } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import ariseLogo from "@/assets/arise-logo.svg";
import { useCompany } from "@/lib/company-store";

export function Hero() {
  const { company } = useCompany();

  return (
    <header className="relative overflow-hidden px-4 pb-10 pt-10 sm:pt-16">
      <div className="pointer-events-none absolute inset-0 halo" aria-hidden />
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float-slow"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-40 h-64 w-64 rounded-full bg-gold/25 blur-3xl animate-float-slow"
        style={{ animationDelay: "-4s" }}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong relative mx-auto max-w-3xl overflow-hidden rounded-3xl px-6 pb-8 pt-10 text-center sm:px-10"
      >
        <div className="absolute inset-x-0 top-0 h-px shimmer-line" aria-hidden />

        <div className="mb-5 flex items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-ui text-[0.68rem] font-semibold uppercase tracking-wider text-primary">
            <FiCheckCircle className="h-3.5 w-3.5" /> Quality Tested
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-1 font-ui text-[0.68rem] font-semibold uppercase tracking-wider text-gold-foreground dark:text-gold">
            <HiSparkles className="h-3.5 w-3.5" /> Endoscopy Specialists
          </span>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-gold via-gold/30 to-primary blur-[2px]" />
            <div className="relative flex h-40 w-40 items-center justify-center overflow-hidden rounded-full bg-card ring-2 ring-background sm:h-48 sm:w-48">
              <img
                src={ariseLogo}
                alt={`${company.name} logo`}
                width={512}
                height={512}
                className="h-full w-full object-contain"
              />
            </div>
          </motion.div>
          <div>
            <h1 className="section-title text-2xl text-foreground sm:text-3xl">Arise Healthcare Solutions</h1>
            <p className="mt-2 font-ui text-xs uppercase tracking-[0.22em] text-muted-foreground">
              {company.designation}
            </p>
          </div>
        </div>
      </motion.div>
    </header>
  );
}
