import {
  getLocalizedOptionText,
  getLocalizedQuestionText,
  type Question,
} from "@/data/questions";
import { useI18n } from "@/components/I18nProvider";
import type { AnswerValue } from "@/lib/score";

type QuestionCardProps = {
  question: Question;
  value?: AnswerValue;
  onSelect: (value: AnswerValue) => void;
  questionNumber?: number;
};

const FIVE_LIKERT_LABELS = [
  "경험 없음",
  "별로다",
  "보통이다",
  "좋다",
  "아주 좋다",
];

export default function QuestionCard({
  question,
  value,
  onSelect,
  questionNumber,
}: QuestionCardProps) {
  const { t, language } = useI18n();

  if (question.inputType === "rank") {
    const rankedIds = Array.isArray(value) ? value : [];

    const toggleRankOption = (optionId: string) => {
      if (rankedIds.includes(optionId)) {
        onSelect(rankedIds.filter(id => id !== optionId));
        return;
      }
      if (rankedIds.length >= 5) {
        return;
      }
      onSelect([...rankedIds, optionId]);
    };

    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <p className="mb-2 text-base font-semibold text-zinc-900">
          {questionNumber ? `${questionNumber}. ` : ""}
          {getLocalizedQuestionText(question.text, language)}
        </p>
        <p className="mb-3 text-xs text-zinc-500">
          {t.rankHint}
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {question.options.map(option => {
            const rankIndex = rankedIds.indexOf(option.id);
            const checked = rankIndex !== -1;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleRankOption(option.id)}
                className={`rounded-xl border px-3 py-3 text-center text-sm transition ${
                  checked
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-300 bg-white text-zinc-800"
                }`}
              >
                {checked ? `${rankIndex + 1}${t.rankUnit} · ` : ""}
                {getLocalizedOptionText(option.text, language)}
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  if (question.inputType === "multi") {
    const selectedIds = Array.isArray(value) ? value : [];

    const toggleOption = (optionId: string) => {
      const next = selectedIds.includes(optionId)
        ? selectedIds.filter(id => id !== optionId)
        : [...selectedIds, optionId];
      onSelect(next);
    };

    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <p className="mb-2 text-base font-semibold text-zinc-900">
          {questionNumber ? `${questionNumber}. ` : ""}
          {getLocalizedQuestionText(question.text, language)}
        </p>
        <p className="mb-3 text-xs text-zinc-500">{t.multiHint}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {question.options.map(option => {
            const checked = selectedIds.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleOption(option.id)}
                className={`rounded-xl border px-3 py-3 text-center text-sm transition ${
                  checked
                    ? "border-zinc-900 bg-zinc-900 text-white"
                    : "border-zinc-300 bg-white text-zinc-800"
                }`}
              >
                {getLocalizedOptionText(option.text, language)}
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  if (question.inputType === "select") {
    const selectedIndex =
      typeof value === "number"
        ? question.options.findIndex((option) => option.score === value)
        : -1;
    const sliderIndex = selectedIndex >= 0 ? selectedIndex : 0;
    const selectedLabel =
      selectedIndex >= 0
        ? getLocalizedOptionText(question.options[selectedIndex].text, language)
        : t.selectAgePlaceholder;

    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <p className="mb-4 text-base font-semibold text-zinc-900">
          {questionNumber ? `${questionNumber}. ` : ""}
          {getLocalizedQuestionText(question.text, language)}
        </p>
        <p className="mb-3 rounded-lg bg-zinc-100 px-3 py-2 text-center text-sm font-semibold text-zinc-800">
          {selectedLabel}
        </p>
        <input
          type="range"
          min={0}
          max={question.options.length - 1}
          step={1}
          value={sliderIndex}
          onChange={(event) => {
            const option = question.options[Number(event.target.value)];
            if (option) onSelect(option.score);
          }}
          className="h-9 w-full accent-zinc-900"
        />
        <div className="mt-2 flex justify-between text-xs text-zinc-500">
          <span>{getLocalizedOptionText(question.options[0].text, language)}</span>
          <span>
            {getLocalizedOptionText(
              question.options[question.options.length - 1].text,
              language,
            )}
          </span>
        </div>
      </section>
    );
  }

  const isFiveLikert =
    question.options.length === 5 &&
    question.options.every(
      (option, index) => option.text === FIVE_LIKERT_LABELS[index],
    );
  const isFiveChoice = question.options.length === 5;
  const isKoreanLikert = isFiveLikert && language === "ko";

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <p className="mb-4 text-base font-semibold text-zinc-900">
        {questionNumber ? `${questionNumber}. ` : ""}
        {getLocalizedQuestionText(question.text, language)}
      </p>
      <div
        className={
          isFiveLikert
            ? "flex gap-2"
            : isFiveChoice
              ? "flex flex-nowrap justify-center gap-2 overflow-x-auto pb-1"
              : "flex flex-wrap justify-center gap-2"
        }
      >
        {question.options.map(option => {
          const checked = typeof value === "number" && value === option.score;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.score)}
              className={`rounded-xl border px-3 py-3 text-center text-sm transition ${
                checked
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-300 bg-white text-zinc-800"
              } ${
                isFiveLikert
                  ? isKoreanLikert
                    ? "min-w-0 flex-1 basis-0 px-1 py-2 text-[11px] leading-tight tracking-tight whitespace-nowrap min-h-[40px] sm:text-xs"
                    : "min-w-0 flex-1 basis-0 px-1 py-2 text-[10px] leading-tight tracking-tight min-h-[40px] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden break-words [overflow-wrap:anywhere] sm:text-xs"
                  : isFiveChoice
                    ? "shrink-0 px-2 py-2 min-h-[40px] [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden break-words [overflow-wrap:anywhere]"
                    : "min-w-[88px]"
              }`}
            >
              {getLocalizedOptionText(option.text, language)}
            </button>
          );
        })}
      </div>
    </section>
  );
}
