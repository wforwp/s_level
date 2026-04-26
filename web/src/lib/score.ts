import { getLevelRules } from "@/data/levels";
import { pageOrder, questionsByPage, type Question } from "@/data/questions";
import type { Language } from "@/lib/i18n";

export type AnswerValue = number | string[];
export type AnswerMap = Record<string, AnswerValue>;

const BASE_MAX_SCORE = 274;
const questionWeightMap: Record<string, number> = {
  // page 1
  "p1-q1": 1.05,
  "p1-q2": 0.95,
  "p1-q3": 0.95,
  "p1-q4": 0.95,
  "p1-q5": 1.0,
  "p1-q6": 1.05,
  "p1-q7": 1.15,
  "p1-q8": 1.15,
  // page 2
  "p2-q1": 1.1,
  "p2-q2": 1.2,
  "p2-q3": 1.25,
  "p2-q4": 1.0,
  "p2-q5": 1.05,
  "p2-q6": 1.15,
  "p2-q7": 1.15,
  "p2-q8": 1.2,
  // page 3
  "p3-q1": 1.15,
  "p3-q2": 1.2,
  "p3-q3": 1.25,
  "p3-q4": 1.35,
  "p3-q5": 1.2,
  "p3-q6": 1.2,
  "p3-q7": 1.35,
  "p3-q8": 1.35,
  // page 4
  "p4-q1": 1.2,
  "p4-q2": 1.35,
  "p4-q3": 1.3,
  "p4-q4": 1.35,
  "p4-q5": 1.25,
  "p4-q6": 1.4,
  "p4-q7": 1.45,
  "p4-q8": 1.3,
  // page 5
  "p5-q1": 1.2,
  "p5-q2": 1.15,
  "p5-q3": 1.3,
  "p5-q4": 1.35,
  "p5-q5": 1.45,
  "p5-q6": 1.55,
  "p5-q7": 1.5,
  "p5-q8": 1.35,
  // page 6
  "p6-q1": 1.25,
  "p6-q2": 1.35,
  "p6-q3": 1.15,
  "p6-q4": 1.35,
  "p6-q5": 1.55,
  "p6-q6": 1.6,
};

function getQuestionWeight(questionId: string): number {
  return questionWeightMap[questionId] ?? 1;
}

function getQuestionBaseScore(question: Question, answerValue: AnswerValue | undefined): number {
  if (typeof answerValue === "number") {
    return answerValue;
  }
  if (Array.isArray(answerValue)) {
    if (question.inputType === "rank") {
      return answerValue.slice(0, 5).reduce((sum, _id, index) => {
        return sum + (5 - index);
      }, 0);
    }

    const selectedSet = new Set(answerValue);
    return question.options.reduce((sum, option) => {
      return selectedSet.has(option.id) ? sum + option.score : sum;
    }, 0);
  }
  return 0;
}

function getQuestionMaxBaseScore(question: Question): number {
  if (question.inputType === "rank") return 15;
  return question.options.reduce((max, option) => Math.max(max, option.score), 0) *
    (question.inputType === "multi" ? question.options.length : 1);
}

export function calculateTotalScore(answerMap: AnswerMap): number {
  let weightedTotal = 0;
  let weightedMax = 0;

  pageOrder.forEach((page) => {
    questionsByPage[page].forEach((question) => {
      const weight = getQuestionWeight(question.id);
      const baseScore = getQuestionBaseScore(question, answerMap[question.id]);
      const maxBaseScore = getQuestionMaxBaseScore(question);
      weightedTotal += baseScore * weight;
      weightedMax += maxBaseScore * weight;
    });
  });

  if (weightedMax <= 0) return 0;

  const normalized = Math.round((weightedTotal / weightedMax) * BASE_MAX_SCORE);
  return Math.max(0, Math.min(BASE_MAX_SCORE, normalized));
}

export function getLevelByScore(score: number, language: Language = "ko") {
  const levelRules = getLevelRules(language);
  return (
    levelRules.find((rule) => score >= rule.min && score <= rule.max) ??
    levelRules[levelRules.length - 1]
  );
}
