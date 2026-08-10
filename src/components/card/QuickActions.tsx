import { motion } from "framer-motion";
import { toast } from "sonner";
import {
  FiPhone,
  FiMail,
  FiGlobe,
  FiShare2,
  FiTool,
  FiUserPlus,
  FiEdit3,
  FiPackage,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";
import { useCompany } from "@/lib/company-store";
import { saveContact, shareCard } from "@/lib/card-utils";

type Action = { label: string; icon: React.ElementType; onClick: () => void; accent?: boolean };

export function QuickActions() {
  const { company } = useCompany();

  const go = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  const actions: Action[] = [
    { label: "Call Now", icon: FiPhone, onClick: () => go(`tel:${company.mobileRaw}`), accent: true },
    {
      label: "WhatsApp",
      icon: FaWhatsapp,
      onClick: () =>
        go(
          `https://wa.me/${company.mobileRaw.replace(/\D/g, "")}?text=${encodeURIComponent(
            "Hello Arise team, I would like to know about medical equipment repair.",
          )}`,
        ),
      accent: true,
    },
    { label: "Email", icon: FiMail, onClick: () => go(`mailto:${company.email}`) },
    { label: "Website", icon: FiGlobe, onClick: () => go(company.website) },
    {
      label: "Request Repair",
      icon: FiTool,
      onClick: () => go(`${company.website}/request-repair`),
      accent: true,
    },
    {
      label: "Equipment Range",
      icon: FiPackage,
      onClick: () => go(`${company.website}/equipments`),
    },
    {
      label: "Save Contact",
      icon: FiUserPlus,
      onClick: () => {
        const result = saveContact(company);
        toast.success(
          result === "opened"
            ? "Opening contact card…"
            : result === "android"
              ? "Open the downloaded card to add the contact"
              : "Contact card saved to your downloads",
        );
      },
    },
    {
      label: "Share Card",
      icon: FiShare2,
      onClick: async () => {
        const result = await shareCard(company);
        if (result === "copied") toast.success("Card link copied to clipboard");
      },
    },
    {
      label: "Send Enquiry",
      icon: FiEdit3,
      onClick: () => document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth" }),
      accent: true,
    },
  ];

  return (
    <section className="px-4" aria-label="Quick actions">
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {actions.map((action, i) => (
          <motion.button
            key={action.label}
            type="button"
            onClick={action.onClick}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.96 }}
            className="glass group flex flex-col items-center gap-2 rounded-2xl px-3 py-4 transition-colors hover:border-gold/60"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold-foreground dark:text-gold">
              <action.icon className="h-[1.15rem] w-[1.15rem]" />
            </span>
            <span className="font-ui text-[0.72rem] font-medium leading-tight text-foreground">
              {action.label}
            </span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
