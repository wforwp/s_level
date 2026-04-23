"use client";

import type { UserProfile } from "@/lib/storage";
import type { LevelRule } from "@/data/levels";
import { useI18n } from "@/components/I18nProvider";

type ResultCardProps = {
  profile: UserProfile;
  score: number;
  level: LevelRule;
};

export default function ResultCard({ profile, score, level }: ResultCardProps) {
  const { t } = useI18n();
  const levelScale = ["Lv. 1", "Lv. 2", "Lv. 3", "Lv. 4", "Lv. 5", "Lv. 6", "Lv. 7"];
  const levelIndex = Math.max(0, levelScale.indexOf(level.level));
  const meterPosition = (levelIndex / (levelScale.length - 1)) * 100;

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-700 p-6 text-white">
      <p className="text-sm opacity-80">{t.resultSubtitle.replace("{nickname}", profile.nickname)}</p>
      <p className="mt-3 text-3xl font-extrabold">{level.level}</p>
      <p className="mt-1 text-lg font-semibold">{level.title}</p>
      <div className="mt-4">
        <div className="relative">
          <div
            className="h-3 w-full rounded-full"
            style={{
              background:
                "linear-gradient(to right, rgb(34 197 94), rgb(163 230 53), rgb(250 204 21), rgb(249 115 22), rgb(239 68 68))",
            }}
          />
          <div
            className="absolute -top-1 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-white bg-zinc-900 shadow"
            style={{ left: `${meterPosition}%` }}
          />
        </div>
        <div className="mt-2 grid grid-cols-7 text-center text-[10px] font-medium text-white/80 sm:text-xs">
          {levelScale.map(levelLabel => (
            <span key={levelLabel}>{levelLabel.replace(". ", "")}</span>
          ))}
        </div>
      </div>
      <p className="mt-2 text-sm font-medium opacity-90">{level.summary}</p>
      <p className="mt-4 text-sm leading-6 opacity-90">{level.description}</p>
      <div className="mt-5 rounded-xl bg-white/10 p-3">
        <p className="text-xs opacity-80">{t.totalScore}</p>
        <p className="text-2xl font-bold">
          {score}
          {t.pointUnit}
        </p>
      </div>
    </div>
  );
}
