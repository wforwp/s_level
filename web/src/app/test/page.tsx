"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/I18nProvider";
import ProgressBar from "@/components/ProgressBar";
import QuestionCard from "@/components/QuestionCard";
import { type Question, pageOrder, questionsByPage, totalQuestionCount } from "@/data/questions";
import { type AnswerMap, type AnswerValue, calculateTotalScore } from "@/lib/score";
import { getAnswers, getProfile, hasGatePassed, saveAnswers, saveScore } from "@/lib/storage";

export default function TestPage() {
  const router = useRouter();
  const { t } = useI18n();
  const [isReady, setIsReady] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerMap>(() => getAnswers());
  const [error, setError] = useState("");

  useEffect(() => {
    if (!hasGatePassed()) {
      router.replace("/");
      return;
    }
    const loadedProfile = getProfile();
    if (!loadedProfile) {
      router.replace("/intro");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(true);
  }, [router]);

  if (!isReady) return null;

  const currentPage = pageOrder[pageIndex];
  const currentQuestions = questionsByPage[currentPage];
  const allQuestions = pageOrder.flatMap((page) => questionsByPage[page]);

  const resolvedQuestions: Question[] = currentQuestions.map((question) => {
    if (question.inputType !== "rank" || !question.dependsOnQuestionId) {
      return question;
    }

    const sourceQuestion = allQuestions.find((q) => q.id === question.dependsOnQuestionId);
    const selectedSourceIds = answers[question.dependsOnQuestionId];
    const selectedSet = new Set(Array.isArray(selectedSourceIds) ? selectedSourceIds : []);
    const rankedOptions = (sourceQuestion?.options ?? []).filter((opt) => selectedSet.has(opt.id));

    return { ...question, options: rankedOptions };
  });

  const answeredCount = Object.keys(answers).length;
  const isCurrentPageComplete = resolvedQuestions.every((q) => {
    const value = answers[q.id];
    if (q.inputType === "rank") {
      return Array.isArray(value) && value.length > 0;
    }
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined;
  });

  const handleSelect = (questionId: string, value: AnswerValue) => {
    setError("");
    setAnswers((prev) => {
      const next = { ...prev, [questionId]: value };
      saveAnswers(next);
      return next;
    });
  };

  const handleNext = () => {
    if (!isCurrentPageComplete) {
      setError(t.answerAllError);
      return;
    }

    if (pageIndex < pageOrder.length - 1) {
      setPageIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const totalScore = calculateTotalScore(answers);
    saveScore(totalScore);
    router.push("/result");
  };

  const handlePrev = () => {
    if (pageIndex === 0) return;
    setError("");
    setPageIndex((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageTitle = `${currentPage} / ${pageOrder.length} ${t.pageText}`;

  return (
    <main className="mx-auto min-h-screen w-full max-w-md bg-zinc-50 p-4 pb-24">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-zinc-900">{t.testTitle}</h1>
        <p className="mt-1 text-sm text-zinc-600">{pageTitle}</p>
      </div>

      <ProgressBar current={answeredCount} total={totalQuestionCount} />

      <div className="mt-4 space-y-3">
        {resolvedQuestions.map((question) => {
          const questionNumber = allQuestions.findIndex((q) => q.id === question.id) + 1;
          return (
            <QuestionCard
              key={question.id}
              question={question}
              questionNumber={questionNumber > 0 ? questionNumber : undefined}
              value={answers[question.id]}
              onSelect={(value) => handleSelect(question.id, value)}
            />
          );
        })}
      </div>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

      <div className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md border-t border-zinc-200 bg-white p-3">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={pageIndex === 0}
            className="rounded-xl border border-zinc-300 bg-white py-3 text-sm font-semibold text-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {t.prevPageButton}
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white"
          >
            {pageIndex === pageOrder.length - 1 ? t.resultButton : t.nextPageButton}
          </button>
        </div>
      </div>
    </main>
  );
}
