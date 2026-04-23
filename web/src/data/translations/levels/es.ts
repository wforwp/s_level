import type { LevelRule } from "@/data/levels";

export const levelTranslationsEs: Record<
  string,
  Pick<LevelRule, "title" | "summary" | "description">
> = {
  "Lv. 1": {
    title: "Reliquia sin deseo",
    summary: "[¿Solo un adorno?]",
    description:
      "Vives como si el sexo no fuera contigo. Has renunciado por cuenta propia a gran parte del placer y todo se vuelve monótono.",
  },
  "Lv. 2": {
    title: "Gata astuta despierta",
    summary: "[Inocencia por fuera, deseo por dentro]",
    description:
      "Pareces prudente, pero el deseo ya está activo. Cuando empieza a salir, el autocontrol cae rápido.",
  },
  "Lv. 3": {
    title: "Tipo dependiente del placer",
    summary: "[Siempre buscando estímulos más fuertes]",
    description:
      "La estimulación repetida reduce tu satisfacción base. Tiendes a perseguir intensidad y novedad.",
  },
  "Lv. 4": {
    title: "Tipo guiado por el instinto",
    summary: "[Menos razón, más impulso]",
    description:
      "Tus decisiones están muy influidas por el impulso. El contexto y los límites se difuminan con facilidad.",
  },
  "Lv. 5": {
    title: "Entrega sin vergüenza",
    summary: "[Te entregas sin reservas]",
    description:
      "Superas la vergüenza y te dejas llevar por el placer. El autocontrol baja cuando aparece el deseo.",
  },
  "Lv. 6": {
    title: "Tipo de deterioro irreversible",
    summary: "[Sin botón de reinicio]",
    description:
      "El patrón parece muy arraigado y volver a la moderación se vuelve difícil. La escalada ya es tu tendencia.",
  },
  "Lv. 7": {
    title: "Tipo de sumisión total",
    summary: "[Orgullo completamente abandonado]",
    description:
      "La identidad y la dignidad se cambian por gratificación inmediata. Tu conducta gira en torno a validación sexual externa.",
  },
};
