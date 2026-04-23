import type { Language } from "@/lib/i18n";
import type { LevelRule } from "@/data/levels";
import { levelTranslationsEn } from "@/data/translations/levels/en";
import { levelTranslationsEs } from "@/data/translations/levels/es";
import { levelTranslationsFr } from "@/data/translations/levels/fr";
import { levelTranslationsJa } from "@/data/translations/levels/ja";
import { levelRulesKo } from "@/data/translations/levels/ko";

export { levelRulesKo };

export const levelTranslations: Record<
  Exclude<Language, "ko">,
  Record<string, Pick<LevelRule, "title" | "summary" | "description">>
> = {
  en: levelTranslationsEn,
  es: levelTranslationsEs,
  fr: levelTranslationsFr,
  ja: levelTranslationsJa,
};
