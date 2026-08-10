import type { CompanyData } from "@/data/company";

export function buildVCard(c: CompanyData) {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:;;;;",
    `FN:${c.name}`,
    `ORG:${c.name}`,
    `TITLE:${c.designation}`,
    `TEL;TYPE=WORK,VOICE:${c.mobileRaw}`,
    `TEL;TYPE=WORK,VOICE:${c.altMobile.replace(/\D/g, "")}`,
    `EMAIL;TYPE=WORK:${c.email}`,
    `URL:${c.website}`,
    `NOTE:${c.tagline}`,
    "END:VCARD",
  ].join("\r\n");
}

export function downloadFile(content: string | Blob, filename: string, type = "text/plain") {
  const blob = typeof content === "string" ? new Blob([content], { type }) : content;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 2000);
}

export function saveContact(c: CompanyData) {
  const vcard = buildVCard(c);
  const filename = "arise-healthcare-solutions.vcf";
  const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
  const isAppleMobile =
    typeof navigator !== "undefined" &&
    (/iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && (navigator as unknown as { maxTouchPoints: number }).maxTouchPoints > 1));
  const isAndroid = /Android/i.test(ua);

  // Mobile browsers ignore/mishandle blob downloads for vCards. Navigating to a
  // real URL served as text/vcard lets the OS hand the card to Contacts:
  // iOS opens the native "Add Contact" sheet, Android downloads it with an
  // "Open with Contacts" action.
  if (isAppleMobile) {
    window.location.href = "/api/public/contact.vcf";
    return "opened" as const;
  }

  if (isAndroid) {
    window.location.href = "/api/public/contact.vcf";
    return "android" as const;
  }

  downloadFile(vcard, filename, "text/vcard;charset=utf-8");
  return "downloaded" as const;
}


export async function shareCard(c: CompanyData) {
  const url = typeof window !== "undefined" ? window.location.href : c.website;
  const data = { title: c.name, text: `${c.name} — ${c.designation}`, url };
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share(data);
      return "shared" as const;
    } catch {
      return "cancelled" as const;
    }
  }
  await navigator.clipboard.writeText(url);
  return "copied" as const;
}
