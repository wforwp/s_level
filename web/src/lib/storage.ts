import type { AnswerMap } from "@/lib/score";

export type UserProfile = {
  age: number;
  nickname: string;
};

const PROFILE_KEY = "test_user_profile";
const ANSWERS_KEY = "test_answers";
const SCORE_KEY = "test_total_score";
const GATE_PASSED_KEY = "test_gate_passed";

function isBrowser() {
  return typeof window !== "undefined";
}

export function saveProfile(profile: UserProfile) {
  if (!isBrowser()) return;
  sessionStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function setGatePassed() {
  if (!isBrowser()) return;
  sessionStorage.setItem(GATE_PASSED_KEY, "1");
}

export function hasGatePassed(): boolean {
  if (!isBrowser()) return false;
  return sessionStorage.getItem(GATE_PASSED_KEY) === "1";
}

export function getProfile(): UserProfile | null {
  if (!isBrowser()) return null;
  const raw = sessionStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function saveAnswers(answers: AnswerMap) {
  if (!isBrowser()) return;
  sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
}

export function getAnswers(): AnswerMap {
  if (!isBrowser()) return {};
  const raw = sessionStorage.getItem(ANSWERS_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as AnswerMap;
  } catch {
    return {};
  }
}

export function saveScore(score: number) {
  if (!isBrowser()) return;
  sessionStorage.setItem(SCORE_KEY, String(score));
}

export function getScore(): number | null {
  if (!isBrowser()) return null;
  const raw = sessionStorage.getItem(SCORE_KEY);
  if (!raw) return null;
  const parsed = Number(raw);
  return Number.isNaN(parsed) ? null : parsed;
}

export function clearTestSession() {
  if (!isBrowser()) return;
  sessionStorage.removeItem(GATE_PASSED_KEY);
  sessionStorage.removeItem(PROFILE_KEY);
  sessionStorage.removeItem(ANSWERS_KEY);
  sessionStorage.removeItem(SCORE_KEY);
}
