import type { Language } from "@/lib/i18n";
import { questionTextEn } from "@/data/translations/questions/en";
import { questionTextEs } from "@/data/translations/questions/es";
import { questionTextFr } from "@/data/translations/questions/fr";
import { questionTextJa } from "@/data/translations/questions/ja";

export const questionTextTranslations: Record<Language, Record<string, string>> = {
  ko: {},
  en: questionTextEn,
  es: questionTextEs,
  fr: questionTextFr,
  ja: questionTextJa,
};

export const optionTextTranslations: Record<Language, Record<string, string>> = {
  ko: {},
  en: {
    예: "Yes",
    아니오: "No",
    보통이다: "Neutral",
    "경험 없음": "No experience",
    별로다: "Not much",
    좋다: "Good",
    "아주 좋다": "Very good",
    경험없음: "No experience",
    "5명 이상": "5 or more",
    "10명 이상": "10 or more",
  },
  es: {
    예: "Sí",
    아니오: "No",
    보통이다: "Normal",
    "경험 없음": "Sin experiencia",
    별로다: "No mucho",
    좋다: "Me gusta",
    "아주 좋다": "Me gusta mucho",
    경험없음: "Sin experiencia",
    "5명 이상": "5 o más",
    "10명 이상": "10 o más",
  },
  fr: {
    예: "Oui",
    아니오: "Non",
    보통이다: "Moyen",
    "경험 없음": "Aucune expérience",
    별로다: "Pas vraiment",
    좋다: "J'aime",
    "아주 좋다": "J'aime beaucoup",
    경험없음: "Aucune expérience",
    "5명 이상": "5 ou plus",
    "10명 이상": "10 ou plus",
  },
  ja: {
    예: "はい",
    아니오: "いいえ",
    보통이다: "普通",
    "경험 없음": "経験なし",
    별로다: "あまり",
    좋다: "好き",
    "아주 좋다": "とても好き",
    경험없음: "経験なし",
    "5명 이상": "5人以上",
    "10명 이상": "10人以上",
  },
};
