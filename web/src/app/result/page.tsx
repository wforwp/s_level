"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toPng } from "html-to-image";
import { useI18n } from "@/components/I18nProvider";
import ResultCard from "@/components/ResultCard";
import ShareButtons from "@/components/ShareButtons";
import { getLevelByScore } from "@/lib/score";
import { clearTestSession, getProfile, getScore, hasGatePassed } from "@/lib/storage";

export default function ResultPage() {
  const router = useRouter();
  const { t, language } = useI18n();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!hasGatePassed()) {
      router.replace("/");
      return;
    }
    const loadedProfile = getProfile();
    const loadedScore = getScore();
    if (!loadedProfile || loadedScore === null) {
      router.replace("/intro");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(true);
  }, [router]);

  const profile = isReady ? getProfile() : null;
  const score = isReady ? getScore() : null;

  if (!isReady || !profile || score === null) return null;

  const level = getLevelByScore(score, language);

  const handleSaveImage = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 2 });
    const a = document.createElement("a");
    a.download = `test-result-${profile.nickname}.png`;
    a.href = dataUrl;
    a.click();
  };

  const handleReset = () => {
    clearTestSession();
    router.push("/intro");
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center bg-zinc-50 p-4">
      <section className="w-full">
        <h1 className="mb-1 text-xl font-bold text-zinc-900">{t.resultTitle}</h1>
        <p className="mb-4 text-sm text-zinc-600">
          {t.resultSubtitle.replace("{nickname}", profile.nickname)}
        </p>

        <div ref={cardRef}>
          <ResultCard profile={profile} score={score} level={level} />
        </div>

        <div className="mt-4">
          <ShareButtons
            onSaveImage={handleSaveImage}
            title={t.shareTitle}
            text={t.shareText
              .replace("{nickname}", profile.nickname)
              .replace("{level}", level.level)
              .replace("{title}", level.title)}
          />
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="mt-3 w-full rounded-xl border border-zinc-300 bg-white py-3 text-sm font-semibold text-zinc-800"
        >
          {t.retryTestButton}
        </button>
      </section>
    </main>
  );
}
