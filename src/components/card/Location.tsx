import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { FiDownload, FiClock, FiPhone, FiMail, FiGlobe, FiMapPin, FiTool } from "react-icons/fi";
import { Reveal, SectionHeading } from "./Reveal";
import { useCompany } from "@/lib/company-store";
import { downloadFile } from "@/lib/card-utils";

export function LocationSection() {
  const { company } = useCompany();
  const address = company.headOffice.join(", ");
  const mapsUrl =
    company.mapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`;

  return (
    <section id="contact" className="px-4 py-14">
      <SectionHeading eyebrow="Contact" title="Reach our repair team" />
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-2">
        <Reveal>
          <div className="glass h-full rounded-3xl p-6">
            <div className="mb-3 flex items-center gap-2 text-primary">
              <FiClock className="h-4 w-4" />
              <span className="font-ui text-xs font-semibold uppercase tracking-[0.2em]">Working Hours</span>
            </div>
            <div className="text-sm leading-7 text-muted-foreground">
              {company.factory.map((line) => (
                <div key={line}>{line}</div>
              ))}
              <div className="mt-2 text-foreground">
                {company.mobile} / {company.altMobile}
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="glass h-full rounded-3xl p-6">
            <div className="mb-3 flex items-center gap-2 text-gold-foreground dark:text-gold">
              <FiTool className="h-4 w-4" />
              <span className="font-ui text-xs font-semibold uppercase tracking-[0.2em]">Repair Support</span>
            </div>
            <p className="text-sm leading-7 text-muted-foreground">
              Share the equipment details and our team responds with a diagnostic plan — transparent
              quotation before any repair begins.
            </p>
            <a
              href={`${company.website}/request-repair`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-2.5 font-ui text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <FiTool className="h-4 w-4" /> Submit Repair Request
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="md:col-span-2">
          <div className="glass grid grid-cols-1 gap-3 rounded-3xl p-6 md:grid-cols-2">
            <a href={`tel:${company.mobileRaw}`} className="flex items-center gap-3 whitespace-nowrap text-sm text-foreground">
              <FiPhone className="h-4 w-4 shrink-0 text-primary" /> {company.mobile}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="flex min-w-0 items-center gap-3 whitespace-nowrap text-sm text-foreground max-sm:whitespace-normal max-sm:break-words"
            >
              <FiMail className="h-4 w-4 shrink-0 text-primary" /> {company.email}
            </a>
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 items-center gap-3 whitespace-nowrap text-sm text-foreground max-sm:whitespace-normal max-sm:break-words md:col-span-2"
            >
              <FiGlobe className="h-4 w-4 shrink-0 text-primary" /> arisehealthcaresolutions.com
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.16} className="md:col-span-2">
          <div className="glass overflow-hidden rounded-3xl p-6">
            <div className="mb-3 flex items-center gap-2 text-primary">
              <FiMapPin className="h-4 w-4" />
              <span className="font-ui text-xs font-semibold uppercase tracking-[0.2em]">Our Location</span>
            </div>
            <p className="text-sm leading-7 text-foreground">{address}</p>
            <div className="relative mt-4 overflow-hidden rounded-2xl">
              <iframe
                title={`${company.name} location on Google Maps`}
                src={embedUrl}
                className="h-56 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open location in Google Maps"
                className="absolute inset-0"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function QRSection() {
  const { company } = useCompany();
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    const url = window.location.origin + "/";
    QRCode.toDataURL(url, {
      width: 640,
      margin: 1,
      color: { dark: "#218EAF", light: "#FFFFFF" },
    })
      .then(setDataUrl)
      .catch(() => setDataUrl(""));
  }, []);

  return (
    <section className="px-4 py-14">
      <SectionHeading eyebrow="Scan" title="Share this digital card" />
      <Reveal className="mx-auto max-w-sm">
        <div className="glass-strong flex flex-col items-center gap-4 rounded-3xl p-8 text-center">
          <div className="rounded-2xl bg-white p-3 gold-ring">
            {dataUrl ? (
              <img src={dataUrl} alt={`QR code linking to ${company.name} digital card`} className="h-44 w-44" />
            ) : (
              <div className="h-44 w-44 animate-pulse rounded-xl bg-muted" />
            )}
          </div>
          <p className="font-ui text-xs text-muted-foreground">
            Scan to open this card instantly on any device.
          </p>
          <button
            type="button"
            disabled={!dataUrl}
            onClick={async () => {
              const blob = await (await fetch(dataUrl)).blob();
              downloadFile(blob, "arise-healthcare-solutions-qr.png", "image/png");
            }}
            className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 font-ui text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            <FiDownload className="h-4 w-4" /> Download QR
          </button>
        </div>
      </Reveal>
    </section>
  );
}
