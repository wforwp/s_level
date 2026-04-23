"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "@/components/I18nProvider";
import { dictionaries, supportedLanguages, type Language } from "@/lib/i18n";
import { setGatePassed } from "@/lib/storage";

export default function Home() {
  const router = useRouter();
  const { language, setLanguage, t } = useI18n();

  const handleEnter = () => {
    setGatePassed();
    router.push("/intro");
  };

  const handleExit = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center bg-zinc-50 p-4">
      <section className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
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
    </main>
  );
}
