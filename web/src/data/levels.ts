export type LevelRule = {
  min: number;
  max: number;
  level: string;
  title: string;
  summary: string;
  description: string;
};

import type { Language } from "@/lib/i18n";
import { levelRulesKo, levelTranslations } from "@/data/translations/levelText";

export function getLevelRules(language: Language): LevelRule[] {
  if (language === "ko") return levelRulesKo;
  return levelRulesKo.map((rule) => {
    const translated = levelTranslations[language][rule.level];
    return translated ? { ...rule, ...translated } : rule;
  });
}
