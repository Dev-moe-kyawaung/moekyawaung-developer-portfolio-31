import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { copy, type Lang } from "./data";

type Theme = "void" | "lumen";
type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: typeof copy.en;
  theme: Theme;
  toggleTheme: () => void;
};

const C = createContext<Ctx | null>(null);

export function Provider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("void");

  useEffect(() => {
    document.documentElement.classList.toggle("lumen", theme === "lumen");
    document.documentElement.lang = lang === "mm" ? "my" : "en";
  }, [theme, lang]);

  const value = useMemo<Ctx>(() => ({
    lang, setLang, t: copy[lang], theme,
    toggleTheme: () => setTheme((p) => (p === "void" ? "lumen" : "void")),
  }), [lang, theme]);

  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useObs() {
  const v = useContext(C);
  if (!v) throw new Error("useObs");
  return v;
}
