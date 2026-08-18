import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { FiMapPin } from "react-icons/fi";
import { useCompany } from "@/lib/company-store";

export function SocialLinks() {
  const { company } = useCompany();
  const links = [
    { key: "facebook", url: company.social.facebook, Icon: FaFacebookF },
    { key: "instagram", url: company.social.instagram, Icon: FaInstagram },
    { key: "linkedin", url: company.social.linkedin, Icon: FaLinkedinIn },
    { key: "youtube", url: company.social.youtube, Icon: FaYoutube },
    { key: "twitter", url: company.social.twitter, Icon: FaXTwitter },
  ].filter((l) => Boolean(l.url));

  if (links.length === 0) return null;

  return (
    <div className="flex justify-center gap-3">
      {links.map(({ key, url, Icon }) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={key}
          className="glass flex h-11 w-11 items-center justify-center rounded-full text-foreground transition hover:-translate-y-1"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

export function Footer() {
  const { company } = useCompany();
  return (
    <footer className="relative mt-8 overflow-hidden px-4 pb-28 pt-14">
      <div className="pointer-events-none absolute inset-0 halo" aria-hidden />
      <div className="glass-strong relative mx-auto max-w-4xl rounded-3xl p-8 text-center">
        <img
          src="/assets/branding/arise-logo-transparent.png"
          alt={`${company.name} logo`}
          width={995}
          height={1153}
          loading="lazy"
          className="mx-auto h-24 w-24 object-contain sm:h-28 sm:w-28"
        />
        <p className="mt-3 font-ui text-xs uppercase tracking-[0.22em] text-gold">{company.tagline}</p>

        <div className="mt-8 grid grid-cols-1 gap-6 text-left sm:grid-cols-2">
          <div>
            <p className="font-ui text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Working Hours
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground">{company.factory.join(" · ")}</p>
          </div>
          <div>
            <p className="font-ui text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Repair Enquiries
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground">
              Endoscopy, camera heads, processors, light sources, insufflators & monitors
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-1 text-sm text-muted-foreground">
          <p>
            {company.mobile} / {company.altMobile}
          </p>
          <p>{company.email}</p>
          <p className="flex items-start justify-center gap-2">
            <FiMapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{company.headOffice.join(", ")}</span>
          </p>
          <p>
            <a className="hover:text-primary" href={company.website} target="_blank" rel="noopener noreferrer">
              arisehealthcaresolutions.com
            </a>
            {" · "}
            <a className="hover:text-primary" href={company.altWebsite} target="_blank" rel="noopener noreferrer">
              Services
            </a>
          </p>
        </div>

        <div className="mt-8">
          <SocialLinks />
        </div>

        <p className="mt-8 font-ui text-xs text-muted-foreground">
          Copyright © 2026 {company.name}. All rights reserved.
        </p>
        <p className="mt-2 font-ui text-[0.7rem] leading-5 text-muted-foreground">
          Arise Healthcare Solutions is an independent repair service. Original manufacturer
          trademarks belong to their respective owners.
        </p>
      </div>
    </footer>
  );
}
