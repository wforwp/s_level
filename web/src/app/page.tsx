"use client";

import { useEffect, useRef, useState } from "react";
import IntroForm from "@/components/IntroForm";
import { useI18n } from "@/components/I18nProvider";
import { dictionaries, supportedLanguages, type Language } from "@/lib/i18n";
import { setGatePassed } from "@/lib/storage";

export default function Home() {
  const { language, setLanguage, t } = useI18n();
  const [gateOpen, setGateOpen] = useState(true);
  const didSetDefaultLanguage = useRef(false);

  useEffect(() => {
    // Always start gate with English selected by default.
    if (didSetDefaultLanguage.current) return;
    didSetDefaultLanguage.current = true;
    setLanguage("en");
  }, [setLanguage]);

  useEffect(() => {
    document.body.style.overflow = gateOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gateOpen]);

  const handleEnter = () => {
    setGatePassed();
    setGateOpen(false);
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <main className="mx-auto min-h-screen w-full max-w-md bg-zinc-50 p-4">
      <div className={gateOpen ? "pointer-events-none select-none" : ""}>
        <div className={gateOpen ? "opacity-65 blur-[1px]" : ""}>
          <div className="flex min-h-[calc(100vh-2rem)] flex-col justify-center">
            <IntroForm />
          </div>
        </div>
      </div>

      {gateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 p-4">
          <section className="w-full max-w-md space-y-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl">
            <h1 className="text-xl font-bold text-zinc-900">{t.gateTitle}</h1>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-800">{t.languageLabel}</label>
              <div className="grid grid-cols-5 gap-2">
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang as Language)}
                    className={`rounded-lg border py-2 text-xs transition ${
                      language === lang
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50"
                    }`}
                  >
                    {dictionaries[lang].languageName}
                  </button>
                ))}
              </div>
            </div>

            <p className="rounded-lg bg-zinc-100 px-3 py-2 text-sm text-zinc-700">{t.gateAdultNotice}</p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleEnter}
                className="rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                {t.adultEnterButton}
              </button>
              <button
                type="button"
                onClick={handleExit}
                className="rounded-xl border border-zinc-300 bg-white py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-100"
              >
                {t.exitButton}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
