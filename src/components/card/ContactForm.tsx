import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { Reveal, SectionHeading } from "./Reveal";
import { useCompany } from "@/lib/company-store";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(20),
  email: z.string().trim().email("Enter a valid email").max(160),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  service: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(5, "Tell us a little more").max(1000),
});

export function ContactForm() {
  const { company } = useCompany();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const values = Object.fromEntries(form.entries());
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    const d = parsed.data;
    const body = encodeURIComponent(
      `Name: ${d.name}\nPhone: ${d.phone}\nEmail: ${d.email}\nCompany: ${d.company || "-"}\nService: ${
        d.service || "-"
      }\n\n${d.message}`,
    );
    window.open(`mailto:${company.email}?subject=${encodeURIComponent("Enquiry from Arise digital card")}&body=${body}`);
    toast.success("Enquiry ready to send — your mail app is opening.");
    e.currentTarget.reset();
  };

  const field =
    "w-full rounded-2xl border border-border bg-background/70 px-4 py-3 font-ui text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/25";

  return (
    <section id="enquiry" className="px-4 py-14">
      <SectionHeading eyebrow="Enquiry" title="Send an enquiry" subtitle="Share your equipment details and our team will respond within one business day." />
      <Reveal className="mx-auto max-w-2xl">
        <form onSubmit={onSubmit} className="glass grid grid-cols-1 gap-3 rounded-3xl p-6 sm:grid-cols-2 sm:p-8">
          <div>
            <input name="name" placeholder="Full name" className={field} maxLength={80} />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <input name="phone" placeholder="Phone" className={field} maxLength={20} />
            {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
          </div>
          <div>
            <input name="email" placeholder="Email" className={field} maxLength={160} />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
          <div>
            <input name="company" placeholder="Hospital / organisation" className={field} maxLength={120} />
          </div>
          <div className="sm:col-span-2">
            <select name="service" className={field} defaultValue="">
              <option value="">Service required</option>
              {company.services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <textarea name="message" rows={4} placeholder="Message" className={field} maxLength={1000} />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <motion.button
            type="submit"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="emerald-gradient sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3.5 font-ui text-sm font-semibold text-white shadow-[var(--shadow-premium)]"
          >
            <FiSend className="h-4 w-4" /> Send Enquiry
          </motion.button>
        </form>
      </Reveal>
    </section>
  );
}
