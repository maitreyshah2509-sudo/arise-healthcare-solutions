import { FiStar, FiAward } from "react-icons/fi";
import { Reveal, SectionHeading } from "./Reveal";
import { useCompany } from "@/lib/company-store";

export function Testimonials() {
  const { company } = useCompany();
  return (
    <section className="px-4 py-14">
      <SectionHeading eyebrow="Testimonials" title="Trusted by growing businesses" />
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
        {company.testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.08}>
            <figure className="glass flex h-full flex-col rounded-3xl p-6">
              <div className="mb-3 flex gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <FiStar key={s} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-6 text-muted-foreground">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-4 border-t border-border pt-3">
                <p className="font-ui text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.1} className="mx-auto mt-6 max-w-md">
        <div className="glass flex items-center justify-center gap-3 rounded-2xl px-5 py-4 text-center">
          <span className="section-title text-2xl text-foreground">5.0</span>
          <div className="text-left">
            <div className="flex gap-0.5 text-gold">
              {Array.from({ length: 5 }).map((_, s) => (
                <FiStar key={s} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <p className="font-ui text-[0.7rem] text-muted-foreground">Google Reviews rating</p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Certificates() {
  const { company } = useCompany();
  return (
    <section className="px-4 py-14">
      <SectionHeading eyebrow="Quality lab" title="Diagnostic lab & quality testing" />
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
        {company.certificates.map((cert, i) => (
          <Reveal key={cert.title} delay={i * 0.06}>
            <div className="glass flex h-full flex-col items-center gap-3 rounded-3xl p-5 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold-foreground dark:text-gold">
                <FiAward className="h-5 w-5" />
              </span>
              <p className="section-title text-sm text-foreground">{cert.title}</p>
              <p className="font-ui text-[0.7rem] leading-4 text-muted-foreground">{cert.issuer}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
