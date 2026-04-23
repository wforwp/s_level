"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  type I18nDictionary,
  type Language,
  dictionaries,
  languageStorageKey,
  supportedLanguages,
} from "@/lib/i18n";

type I18nContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: I18nDictionary;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export default function I18nProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  initialLanguage: Language;
}) {
  // Keep the initial language deterministic across server/client to avoid hydration mismatch.
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    const stored = localStorage.getItem(languageStorageKey);
    const cookieMatch = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${languageStorageKey}=`))
      ?.split("=")[1];
    const preferred = stored ?? cookieMatch;
    if (preferred && supportedLanguages.includes(preferred as Language) && preferred !== language) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(preferred as Language);
      document.documentElement.lang = preferred;
      return;
    }
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem(languageStorageKey, lang);
    document.cookie = `${languageStorageKey}=${lang}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = lang;
  };

  const value = useMemo(
    () => ({
      language,
      setLanguage: handleSetLanguage,
      t: dictionaries[language],
    }),
    [language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider.");
  }
  return context;
}
