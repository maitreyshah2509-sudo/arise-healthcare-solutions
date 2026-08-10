import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { COMPANY, type CompanyData } from "@/data/company";

const STORAGE_KEY = "arise-card-data-v1";

type CompanyContextValue = {
  company: CompanyData;
  update: (patch: Partial<CompanyData>) => void;
  reset: () => void;
};

const CompanyContext = createContext<CompanyContextValue>({
  company: COMPANY,
  update: () => {},
  reset: () => {},
});

export function CompanyProvider({ children }: { children: ReactNode }) {
  const [company, setCompany] = useState<CompanyData>(COMPANY);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setCompany({ ...COMPANY, ...(JSON.parse(raw) as Partial<CompanyData>) });
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  useEffect(() => {
    const STYLE_ID = "arise-brand-theme";
    let el = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement("style");
      el.id = STYLE_ID;
      document.head.appendChild(el);
    }
    const { primary, gold } = company.theme;
    // Dark mode needs a lightened brand color, otherwise dark navy brand
    // values become invisible on the dark background.
    el.textContent = `
:root {
  --primary: ${primary};
  --primary-foreground: oklch(0.985 0.005 255);
  --gold: ${gold};
}
.dark {
  --primary: color-mix(in oklab, ${primary} 30%, white);
  --primary-foreground: oklch(0.16 0.04 263);
  --gold: color-mix(in oklab, ${gold} 88%, white);
}
`;
  }, [company.theme.primary, company.theme.gold]);


  const update = useCallback((patch: Partial<CompanyData>) => {
    setCompany((prev) => {
      const next = { ...prev, ...patch };
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore quota errors */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setCompany(COMPANY);
  }, []);

  const value = useMemo(() => ({ company, update, reset }), [company, update, reset]);

  return <CompanyContext.Provider value={value}>{children}</CompanyContext.Provider>;
}

export function useCompany() {
  return useContext(CompanyContext);
}
