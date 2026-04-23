type ProgressBarProps = {
  current: number;
  total: number;
};

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.min(100, Math.max(0, Math.round((current / total) * 100)));

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between text-sm text-zinc-600">
        <span>
          {current}/{total}
        </span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-zinc-200">
        <div
          className="h-2 rounded-full bg-zinc-900 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
