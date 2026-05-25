'use client';

import { createContext, useContext, useState, useCallback } from 'react';

export type Lang = 'EN' | 'NP';

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
}

const LangContext = createContext<LangContextValue>({ lang: 'EN', toggle: () => {} });

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('EN');
  const toggle = useCallback(() => setLang(l => l === 'EN' ? 'NP' : 'EN'), []);
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
