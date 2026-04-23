import { getLevelRules } from "@/data/levels";
import { pageOrder, questionsByPage } from "@/data/questions";
import type { Language } from "@/lib/i18n";

export type AnswerValue = number | string[];
export type AnswerMap = Record<string, AnswerValue>;

export function calculateTotalScore(answerMap: AnswerMap): number {
  return pageOrder.reduce((total, page) => {
    return (
      total +
      questionsByPage[page].reduce((pageTotal, question) => {
        const answerValue = answerMap[question.id];
        if (typeof answerValue === "number") {
          return pageTotal + answerValue;
        }
        if (Array.isArray(answerValue)) {
          if (question.inputType === "rank") {
            const rankScore = answerValue.slice(0, 5).reduce((sum, _id, index) => {
              return sum + (5 - index);
            }, 0);
            return pageTotal + rankScore;
          }

          const selectedSet = new Set(answerValue);
          const multiScore = question.options.reduce((sum, option) => {
            return selectedSet.has(option.id) ? sum + option.score : sum;
          }, 0);
          return pageTotal + multiScore;
        }
        return pageTotal;
      }, 0)
    );
  }, 0);
}

export function getLevelByScore(score: number, language: Language = "ko") {
  const levelRules = getLevelRules(language);
  return (
    levelRules.find((rule) => score >= rule.min && score <= rule.max) ??
    levelRules[levelRules.length - 1]
  );
}
