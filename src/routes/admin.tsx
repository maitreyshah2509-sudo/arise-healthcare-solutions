import { createFileRoute, Link } from "@tanstack/react-router";
import { Toaster, toast } from "sonner";
import { CompanyProvider, useCompany } from "@/lib/company-store";
import type { CompanyData, SocialLinks } from "@/data/company";
import { useState } from "react";

const TITLE = "Card Admin — Arise Healthcare Solutions";
const DESCRIPTION =
  "Edit company details, services, contact information, social links, testimonials, certificates and theme colours for the Arise Healthcare Solutions digital business card.";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/admin" },
    ],
    links: [{ rel: "canonical", href: "/admin" }],
  }),
});

function AdminPage() {
  return (
    <CompanyProvider>
      <AdminForm />
      <Toaster position="top-center" richColors />
    </CompanyProvider>
  );
}

const field =
  "w-full rounded-xl border border-border bg-background px-3 py-2.5 font-ui text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function AdminForm() {
  const { company, update, reset } = useCompany();
  const [activeTab, setActiveTab] = useState("basics");

  const setText = (key: keyof CompanyData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    update({ [key]: e.target.value } as Partial<CompanyData>);

  const setList =
    (key: "services" | "serviceAreas" | "headOffice" | "factory") =>
    (e: React.ChangeEvent<HTMLTextAreaElement>) =>
      update({ [key]: e.target.value.split("\n").filter(Boolean) } as Partial<CompanyData>);

  const setSocial = (key: keyof SocialLinks) => (e: React.ChangeEvent<HTMLInputElement>) =>
    update({ social: { ...company.social, [key]: e.target.value } });

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(company, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${company.name.toLowerCase().replace(/\s+/g, "-")}-card-data.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Card data exported");
  };

  const importJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string) as Partial<CompanyData>;
        update(data);
        toast.success("Card data imported");
      } catch {
        toast.error("Invalid JSON file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const tabs = [
    { id: "basics", label: "Basics" },
    { id: "contact", label: "Contact" },
    { id: "content", label: "Content" },
    { id: "trust", label: "Trust" },
    { id: "theme", label: "Theme" },
  ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="section-title text-3xl text-foreground">Card Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Customize every detail. Changes save to this device instantly.
          </p>
        </div>
        <Link to="/" className="rounded-xl bg-primary px-4 py-2 font-ui text-sm text-primary-foreground">
          View card
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-full px-3.5 py-1.5 font-ui text-xs font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-background text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="glass space-y-8 rounded-3xl p-6 sm:p-8">
        {activeTab === "basics" && (
          <Group title="Company details">
            <Row label="Company name">
              <input className={field} value={company.name} onChange={setText("name")} />
            </Row>
            <Row label="Tagline">
              <input className={field} value={company.tagline} onChange={setText("tagline")} />
            </Row>
            <Row label="Director / representative">
              <input className={field} value={company.director} onChange={setText("director")} />
            </Row>
            <Row label="Designation">
              <input className={field} value={company.designation} onChange={setText("designation")} />
            </Row>
            <Row label="About">
              <textarea rows={6} className={field} value={company.about} onChange={setText("about")} />
            </Row>
          </Group>
        )}

        {activeTab === "contact" && (
          <Group title="Contact information">
            <Row label="Mobile (display)">
              <input className={field} value={company.mobile} onChange={setText("mobile")} />
            </Row>
            <Row label="Mobile (dial / WhatsApp, with country code)">
              <input className={field} value={company.mobileRaw} onChange={setText("mobileRaw")} />
            </Row>
            <Row label="Alternate mobile">
              <input className={field} value={company.altMobile} onChange={setText("altMobile")} />
            </Row>
            <Row label="Email">
              <input className={field} value={company.email} onChange={setText("email")} />
            </Row>
            <Row label="Website">
              <input className={field} value={company.website} onChange={setText("website")} />
            </Row>
            <Row label="Alternate website">
              <input className={field} value={company.altWebsite} onChange={setText("altWebsite")} />
            </Row>
            <Row label="Google Maps link">
              <input className={field} value={company.mapsUrl} onChange={setText("mapsUrl")} />
            </Row>
            <Row label="Head office (one line per row)">
              <textarea rows={5} className={field} value={company.headOffice.join("\n")} onChange={setList("headOffice")} />
            </Row>
            <Row label="Factory / availability (one line per row)">
              <textarea rows={4} className={field} value={company.factory.join("\n")} onChange={setList("factory")} />
            </Row>
            <Group title="Social media (leave blank to hide)">
              <div className="grid gap-4 sm:grid-cols-2">
                {(["facebook", "instagram", "linkedin", "youtube", "twitter"] as const).map((key) => (
                  <Row key={key} label={key[0].toUpperCase() + key.slice(1)}>
                    <input className={field} value={company.social[key] ?? ""} onChange={setSocial(key)} />
                  </Row>
                ))}
              </div>
            </Group>
          </Group>
        )}

        {activeTab === "content" && (
          <Group title="Services & coverage">
            <Row label="Services (one per line)">
              <textarea rows={10} className={field} value={company.services.join("\n")} onChange={setList("services")} />
            </Row>
            <Row label="Service areas (one per line)">
              <textarea rows={4} className={field} value={company.serviceAreas.join("\n")} onChange={setList("serviceAreas")} />
            </Row>
            <Group title="Why choose us">
              {company.whyChooseUs.map((item, index) => (
                <div key={index} className="rounded-2xl border border-border p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-ui text-xs font-medium text-muted-foreground">Point {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const next = company.whyChooseUs.filter((_, i) => i !== index);
                        update({ whyChooseUs: next });
                      }}
                      className="font-ui text-xs text-destructive hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="space-y-3">
                    <input
                      className={field}
                      value={item.title}
                      onChange={(e) => {
                        const next = [...company.whyChooseUs];
                        next[index] = { ...item, title: e.target.value };
                        update({ whyChooseUs: next });
                      }}
                      placeholder="Title"
                    />
                    <textarea
                      rows={2}
                      className={field}
                      value={item.description}
                      onChange={(e) => {
                        const next = [...company.whyChooseUs];
                        next[index] = { ...item, description: e.target.value };
                        update({ whyChooseUs: next });
                      }}
                      placeholder="Description"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => update({ whyChooseUs: [...company.whyChooseUs, { title: "", description: "" }] })}
                className="rounded-xl border border-border px-4 py-2 font-ui text-sm text-foreground"
              >
                + Add reason
              </button>
            </Group>
          </Group>
        )}

        {activeTab === "trust" && (
          <Group title="Testimonials">
            {company.testimonials.map((item, index) => (
              <div key={index} className="rounded-2xl border border-border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-ui text-xs font-medium text-muted-foreground">Testimonial {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const next = company.testimonials.filter((_, i) => i !== index);
                      update({ testimonials: next });
                    }}
                    className="font-ui text-xs text-destructive hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      className={field}
                      value={item.name}
                      onChange={(e) => {
                        const next = [...company.testimonials];
                        next[index] = { ...item, name: e.target.value };
                        update({ testimonials: next });
                      }}
                      placeholder="Name"
                    />
                    <input
                      className={field}
                      value={item.role}
                      onChange={(e) => {
                        const next = [...company.testimonials];
                        next[index] = { ...item, role: e.target.value };
                        update({ testimonials: next });
                      }}
                      placeholder="Role / company"
                    />
                  </div>
                  <textarea
                    rows={3}
                    className={field}
                    value={item.quote}
                    onChange={(e) => {
                      const next = [...company.testimonials];
                      next[index] = { ...item, quote: e.target.value };
                      update({ testimonials: next });
                    }}
                    placeholder="Quote"
                  />
                  <input
                    type="number"
                    min={1}
                    max={5}
                    className={field}
                    value={item.rating}
                    onChange={(e) => {
                      const next = [...company.testimonials];
                      next[index] = { ...item, rating: Number(e.target.value) };
                      update({ testimonials: next });
                    }}
                    placeholder="Rating 1-5"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                update({ testimonials: [...company.testimonials, { name: "", role: "", quote: "", rating: 5 }] })
              }
              className="rounded-xl border border-border px-4 py-2 font-ui text-sm text-foreground"
            >
              + Add testimonial
            </button>

            <Group title="Certificates">
              {company.certificates.map((item, index) => (
                <div key={index} className="rounded-2xl border border-border p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-ui text-xs font-medium text-muted-foreground">Certificate {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const next = company.certificates.filter((_, i) => i !== index);
                        update({ certificates: next });
                      }}
                      className="font-ui text-xs text-destructive hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      className={field}
                      value={item.title}
                      onChange={(e) => {
                        const next = [...company.certificates];
                        next[index] = { ...item, title: e.target.value };
                        update({ certificates: next });
                      }}
                      placeholder="Title"
                    />
                    <input
                      className={field}
                      value={item.issuer}
                      onChange={(e) => {
                        const next = [...company.certificates];
                        next[index] = { ...item, issuer: e.target.value };
                        update({ certificates: next });
                      }}
                      placeholder="Issuer"
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => update({ certificates: [...company.certificates, { title: "", issuer: "" }] })}
                className="rounded-xl border border-border px-4 py-2 font-ui text-sm text-foreground"
              >
                + Add certificate
              </button>
            </Group>
          </Group>
        )}

        {activeTab === "theme" && (
          <Group title="Theme colours">
            <Row label="Primary">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  className="h-11 w-16 rounded-xl border border-border bg-background"
                  value={company.theme.primary}
                  onChange={(e) => update({ theme: { ...company.theme, primary: e.target.value } })}
                />
                <input className={field} value={company.theme.primary} readOnly />
              </div>
            </Row>
            <Row label="Accent">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  className="h-11 w-16 rounded-xl border border-border bg-background"
                  value={company.theme.gold}
                  onChange={(e) => update({ theme: { ...company.theme, gold: e.target.value } })}
                />
                <input className={field} value={company.theme.gold} readOnly />
              </div>
            </Row>
            <Group title="Backup & restore">
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={exportJson} className="rounded-xl bg-primary px-4 py-2.5 font-ui text-sm text-primary-foreground">
                  Export data
                </button>
                <label className="rounded-xl border border-border px-4 py-2.5 font-ui text-sm text-foreground hover:bg-accent cursor-pointer">
                  Import data
                  <input type="file" accept="application/json" className="hidden" onChange={importJson} />
                </label>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Export saves your customizations as a JSON file you can import later or move to another device.
              </p>
            </Group>
          </Group>
        )}

        <div className="flex flex-wrap gap-3 pt-4">
          <button
            type="button"
            onClick={() => {
              reset();
              toast.success("Reset to default content");
            }}
            className="rounded-xl border border-border px-4 py-2.5 font-ui text-sm text-foreground"
          >
            Reset to defaults
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 font-ui text-sm text-primary-foreground"
          >
            View updated card
          </Link>
        </div>
      </div>
    </main>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-ui text-xs font-semibold uppercase tracking-[0.2em] text-gold">{title}</h2>
      {children}
    </section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-ui text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
