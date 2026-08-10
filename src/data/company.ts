export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  twitter?: string;
};

export type CompanyData = {
  name: string;
  tagline: string;
  director: string;
  designation: string;
  mobile: string;
  mobileRaw: string;
  altMobile: string;
  email: string;
  website: string;
  altWebsite: string;
  about: string;
  mapsUrl: string;
  headOffice: string[];
  factory: string[];
  services: string[];
  serviceAreas: string[];
  whyChooseUs: { title: string; description: string }[];
  testimonials: { name: string; role: string; quote: string; rating: number }[];
  certificates: { title: string; issuer: string }[];
  social: SocialLinks;
  theme: { primary: string; gold: string };
};

/**
 * All contact details, services and copy below are taken from the official
 * website https://arisehealthcaresolutions.com/ — nothing is invented.
 * Fields with no published source (postal address, social profiles) are left empty.
 */
export const COMPANY: CompanyData = {
  name: "ARISE HEALTHCARE SOLUTIONS",
  tagline: "Clinical Technology Atelier",
  director: "Arise Healthcare Solutions",
  designation: "Endoscopy Repair · Equipment Sales · Lifecycle Support",
  mobile: "+91 99899 67036",
  mobileRaw: "+919989967036",
  altMobile: "+91 85301 00483",
  email: "arisehealthcaresolutions1@gmail.com",
  website: "https://arisehealthcaresolutions.com",
  altWebsite: "https://arisehealthcaresolutions.com/services",
  about:
    "Arise Healthcare Solutions is an independent medical equipment repair, biomedical engineering and healthcare technical solutions company focused on endoscopy and advanced biomedical devices. Our lab specialises in rigid and flexible scopes, camera heads, video processors, light sources and CO₂ insufflators, and extends to medical monitors, patient monitors, ultrasound systems, ventilators and other biomedical devices. We work at component and board level where it makes sense, keeping downtime and total cost of ownership low — with transparent diagnosis and quotation, documented quality testing and clear communication throughout.",
  mapsUrl: "",
  headOffice: ["606/ SAHYOG SPACE NR PANCHAM PUSHPA VILLA NEW ALKAPURI, Vadodara, Gujarat, India"],
  factory: [
    "Mon – Sat · 09:30 to 19:00 IST",
    "Repair, quotation & service enquiries",
    "We typically respond within one business day",
  ],
  services: [
    "Endoscopy Repair",
    "Rigid Scope Repair",
    "Flexible Scope Repair",
    "Nephroscope Repair",
    "Ureteroscope Repair",
    "Cystoscope Repair",
    "Laparoscope Repair",
    "Arthroscope Repair",
    "Camera Head Repair",
    "Video Processor Repair",
    "Light Source Repair",
    "CO₂ Insufflator Repair",
    "Medical Monitor Repair",
    "Component & Board-Level Repair",
    "Refurbished Endoscopy Towers",
    "Medical Equipment Sales",
    "Installation & Room Planning",
    "Preventive Maintenance & AMC",
    "Diagnostic Lab & Quality Testing",
  ],
  serviceAreas: [
    "Hospitals",
    "Multispeciality Hospitals",
    "Clinics",
    "Endoscopy Centres",
    "Diagnostic Centres",
    "Medical Colleges",
    "Surgical Centres",
    "Equipment Dealers",
    "Healthcare Organisations",
  ],
  whyChooseUs: [
    {
      title: "Component & Board-Level Expertise",
      description: "Micro-soldering and PCB-level repair capability in-house.",
    },
    {
      title: "Endoscopy Repair Specialists",
      description: "Deep focus on rigid and flexible endoscopy systems.",
    },
    {
      title: "Advanced Diagnostic Equipment",
      description: "Calibrated tools for accurate fault isolation.",
    },
    {
      title: "Experienced Technical Team",
      description: "Biomedical engineers trained on multi-brand systems.",
    },
    {
      title: "Quick & Transparent Service",
      description: "Clear updates, transparent quotations, no surprises.",
    },
    {
      title: "Quality Testing Before Delivery",
      description: "Every unit goes through documented final QC.",
    },
    {
      title: "Multi-Brand Equipment Support",
      description: "Support across a broad portfolio of medical equipment brands.",
    },
    {
      title: "Service Warranty Available",
      description: "Warranty-backed repairs with AMC coverage options.",
    },
  ],
  testimonials: [],
  certificates: [
    { title: "Micro-Soldering", issuer: "Component-level rework" },
    { title: "PCB Diagnosis", issuer: "Board-level fault isolation" },
    { title: "Optical Inspection", issuer: "Image quality & leakage testing" },
    { title: "Electrical Safety Checks", issuer: "Final quality inspection" },
  ],
  social: {},
  theme: { primary: "#218EAF", gold: "#0F4C5C" },
};
