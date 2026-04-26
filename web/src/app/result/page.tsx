"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toPng } from "html-to-image";
import { useI18n } from "@/components/I18nProvider";
import ResultCard from "@/components/ResultCard";
import ShareButtons from "@/components/ShareButtons";
import { getLevelByScore } from "@/lib/score";
import { emitResultSnapshot } from "@/lib/signals/emitResultSnapshot";
import { clearTestSession, getAnswers, getProfile, getScore, hasGatePassed } from "@/lib/storage";

export default function ResultPage() {
  const router = useRouter();
  const { t, language } = useI18n();
  const cardRef = useRef<HTMLDivElement>(null);
  const didEmitSnapshot = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!hasGatePassed()) {
      router.replace("/");
      return;
    }
    const loadedProfile = getProfile();
    const loadedScore = getScore();
    if (!loadedProfile || loadedScore === null) {
      router.replace("/");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(true);
  }, [router]);

  const profile = isReady ? getProfile() : null;
  const score = isReady ? getScore() : null;
  const level = score !== null ? getLevelByScore(score, language) : null;
  const summaryPlain = level ? level.summary.replace(/^\[(.*)\]$/, "$1") : "";
  const copyTitle = "<걸레 등급 테스트 결과>";
  const copyBody =
    profile && level
      ? `${profile.nickname}님은 ${level.title}네요.\n\n(${summaryPlain}) ${level.description}`
      : "";

  useEffect(() => {
    if (!isReady || !profile || score === null || !level || didEmitSnapshot.current) return;
    const answers = getAnswers();
    didEmitSnapshot.current = true;
    void emitResultSnapshot({
      nickname: profile.nickname,
      age: profile.age,
      score,
      level: level.level,
      levelTitle: level.title,
      levelSummary: summaryPlain,
      locale: language,
      answers,
    });
  }, [isReady, language, level, profile, score, summaryPlain]);

  if (!isReady || !profile || score === null || !level) return null;

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
    router.push("/");
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center bg-zinc-50 p-4">
      <section className="w-full">
        <h1 className="mb-1 text-xl font-bold text-zinc-900">{t.resultTitle}</h1>

        <div ref={cardRef} className="mt-4">
          <ResultCard profile={profile} score={score} level={level} />
        </div>

        <div className="mt-4">
          <ShareButtons
            onSaveImage={handleSaveImage}
            title={copyTitle}
            text={copyBody}
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
