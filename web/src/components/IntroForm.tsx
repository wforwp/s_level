"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/I18nProvider";
import { dictionaries, supportedLanguages, type Language } from "@/lib/i18n";
import { saveProfile } from "@/lib/storage";

export default function IntroForm() {
  const router = useRouter();
  const { t, language, setLanguage } = useI18n();
  const [age, setAge] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedAge = Number(age);

    if (!nickname.trim()) {
      setError(t.nicknameError);
      return;
    }
    if (!Number.isInteger(parsedAge) || parsedAge < 19 || parsedAge > 99) {
      setError(t.ageError);
      return;
    }

    saveProfile({
      age: parsedAge,
      nickname: nickname.trim(),
    });

    router.push("/test");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-zinc-900">{t.introTitle}</h1>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value as Language)}
          className="rounded-lg border border-zinc-300 bg-white px-2 py-1.5 text-xs text-zinc-700"
          aria-label={t.changeLanguageButton}
        >
          {supportedLanguages.map((lang) => (
            <option key={lang} value={lang}>
              {dictionaries[lang].languageName}
            </option>
          ))}
        </select>
      </div>
      <p className="whitespace-pre-line rounded-lg bg-zinc-100 px-3 py-2 text-xs leading-5 text-zinc-700">
        {t.introNotice}
      </p>
      <p className="text-sm text-zinc-600">{t.introDescription}</p>

      <div className="space-y-2">
        <label htmlFor="nickname" className="text-sm font-medium text-zinc-800">
          {t.nicknameLabel}
        </label>
        <input
          id="nickname"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          placeholder={t.nicknamePlaceholder}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="age" className="text-sm font-medium text-zinc-800">
          {t.ageLabel}
        </label>
        <input
          id="age"
          type="number"
          min={19}
          max={99}
          value={age}
          onChange={e => setAge(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          placeholder={t.agePlaceholder}
        />
      </div>

      <p className={`min-h-5 text-sm ${error ? "text-red-600" : "text-transparent"}`}>
        {error || "."}
      </p>

      <button
        type="submit"
        className="w-full rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white"
      >
        {t.startTestButton}
      </button>
    </form>
  );
}
