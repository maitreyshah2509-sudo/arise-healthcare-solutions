import { motion } from "framer-motion";
import {
  FiActivity,
  FiLayers,
  FiTrendingUp,
  FiSmartphone,
  FiMessageCircle,
  FiShield,
  FiLifeBuoy,
  FiUsers,
  FiCpu,
} from "react-icons/fi";
import { Reveal, SectionHeading } from "./Reveal";
import { useCompany } from "@/lib/company-store";

export function About() {
  const { company } = useCompany();
  return (
    <section id="about" className="px-4 py-14">
      <SectionHeading eyebrow="About" title="An independent repair partner for healthcare" />
      <Reveal className="mx-auto max-w-3xl">
        <div className="glass rounded-3xl p-6 sm:p-8">
          <p className="text-sm leading-7 text-muted-foreground sm:text-base">{company.about}</p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            {[
              { value: "Endoscopy", label: "Core Specialisation" },
              { value: "Board-Level", label: "Repair Capability" },
              { value: "AMC", label: "Lifecycle Support" },

            ].map((stat) => (
              <div key={stat.label} className="flex min-w-0 flex-col justify-center rounded-2xl bg-primary/5 px-2 py-4">
                <p className="section-title break-words text-[clamp(0.9375rem,0.75rem+1.1vw,1.5rem)] leading-tight text-primary">
                  {stat.value}
                </p>
                <p className="mt-1 text-center font-ui text-[0.65rem] uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Services() {
  const { company } = useCompany();
  return (
    <section id="services" className="px-4 py-14">
      <SectionHeading
        eyebrow="Services"
        title="Repair & technical services"
        subtitle="Endoscopy repair, equipment sales, installation and lifecycle support."
      />
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {company.services.map((service, i) => (
          <motion.div
            key={service}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
            whileHover={{ y: -3 }}
            className="glass flex items-center gap-3 rounded-2xl px-4 py-3.5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold-foreground dark:text-gold">
              <FiActivity className="h-4 w-4" />
            </span>
            <span className="font-ui text-sm font-medium text-foreground">{service}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  const { company } = useCompany();
  const icons = [
    FiLayers,
    FiTrendingUp,
    FiSmartphone,
    FiMessageCircle,
    FiShield,
    FiLifeBuoy,
    FiUsers,
    FiCpu,
  ];
  return (
    <section className="px-4 py-14">
      <SectionHeading eyebrow="Why choose us" title="Why healthcare teams choose Arise" />
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
        {company.whyChooseUs.map((item, i) => {
          const Icon = icons[i % icons.length];
          return (
          <Reveal key={item.title} delay={(i % 4) * 0.06}>
            <div className="glass h-full rounded-3xl p-5">
              <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold-foreground dark:text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="section-title text-lg text-foreground">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </div>
          </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export function ServiceAreas() {
  const { company } = useCompany();
  return (
    <section className="px-4 py-14">
      <SectionHeading eyebrow="Industries" title="Who we serve" />
      <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
        {company.serviceAreas.map((area, i) => (
          <Reveal key={area} delay={i * 0.06}>
            <span className="glass inline-flex rounded-full px-5 py-2.5 font-ui text-sm font-medium text-foreground">
              {area}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
