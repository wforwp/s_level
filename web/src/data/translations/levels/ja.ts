import type { LevelRule } from "@/data/levels";

export const levelTranslationsJa: Record<
  string,
  Pick<LevelRule, "title" | "summary" | "description">
> = {
  "Lv. 1": {
    title: "性欲ほぼゼロ型",
    summary: "[ただの飾り状態？]",
    description:
      "性が自分ごとになりにくく、刺激への関心が低いタイプ。楽しみの幅を自ら狭めがちです。",
  },
  "Lv. 2": {
    title: "目覚め始めの小悪魔型",
    summary: "[表向きは控えめ、内面は好奇心]",
    description:
      "外面は穏やかでも、内側では欲求が育ち始めています。きっかけがあると変化が早い傾向です。",
  },
  "Lv. 3": {
    title: "快楽依存傾向型",
    summary: "[より強い刺激を求める]",
    description:
      "反復により基準刺激では満足しづらく、より強い新規刺激を求めやすい状態です。",
  },
  "Lv. 4": {
    title: "本能先行型",
    summary: "[理性より衝動]",
    description: "衝動の影響が強く、状況判断より欲求が先に立ちやすいタイプです。",
  },
  "Lv. 5": {
    title: "羞恥低下・解放型",
    summary: "[躊躇なく快楽へ]",
    description:
      "羞恥や抑制より快楽を優先しやすく、欲求が出ると行動のブレーキが弱まります。",
  },
  "Lv. 6": {
    title: "戻りにくい逸脱型",
    summary: "[リセット困難]",
    description:
      "行動パターンが固定化し、刺激のエスカレートが起こりやすい段階です。",
  },
  "Lv. 7": {
    title: "全面委譲型",
    summary: "[自尊心を手放しやすい]",
    description:
      "即時的な満足を優先し、自己価値の軸が外部の性的承認に強く依存しやすい状態です。",
  },
};
