import type { LevelRule } from "@/data/levels";

export const levelTranslationsFr: Record<
  string,
  Pick<LevelRule, "title" | "summary" | "description">
> = {
  "Lv. 1": {
    title: "Vestige sans désir",
    summary: "[Simple accessoire ?]",
    description:
      "Vous vivez comme si le sexe ne vous concernait pas. Une grande part du plaisir de vie est mise de côté.",
  },
  "Lv. 2": {
    title: "Chatte rusée qui s'éveille",
    summary: "[Innocence affichée, désir caché]",
    description:
      "Vous paraissez sage, mais le désir est déjà actif. Dès qu'il s'exprime, la retenue baisse rapidement.",
  },
  "Lv. 3": {
    title: "Profil dépendant à la stimulation",
    summary: "[Toujours plus intense]",
    description:
      "La répétition a réduit la satisfaction de base. Vous recherchez davantage de nouveauté et d'intensité.",
  },
  "Lv. 4": {
    title: "Profil guidé par l'instinct",
    summary: "[L'impulsion prend le dessus]",
    description:
      "L'impulsion influence fortement vos choix. Les limites et le contexte peuvent devenir secondaires.",
  },
  "Lv. 5": {
    title: "Don total sans retenue",
    summary: "[Plus de gêne, seulement le plaisir]",
    description:
      "Vous cédez facilement au plaisir et la pudeur recule. L'autocontrôle diminue quand le désir monte.",
  },
  "Lv. 6": {
    title: "Profil de dérive avancée",
    summary: "[Retour difficile]",
    description:
      "Le schéma semble profondément installé, avec une tendance à l'escalade et peu de retour à la modération.",
  },
  "Lv. 7": {
    title: "Profil de soumission totale",
    summary: "[Fierté abandonnée]",
    description:
      "L'identité et la dignité cèdent souvent à la gratification immédiate. Le comportement dépend fortement de validation externe.",
  },
};
