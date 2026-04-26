"use client";

import { useI18n } from "@/components/I18nProvider";

type ShareButtonsProps = {
  onSaveImage: () => Promise<void>;
  title: string;
  text: string;
};

export default function ShareButtons({ onSaveImage, title, text }: ShareButtonsProps) {
  const { t } = useI18n();
  const shareUrl = "https://s-level-test.pages.dev/";

  const handleShare = async () => {
    const shareText = `${title}\n${text}\n${shareUrl}`;
    await navigator.clipboard.writeText(shareText);
    alert(t.shareLinkCopied);
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={onSaveImage}
        className="rounded-xl border border-zinc-300 bg-white py-3 text-sm font-semibold text-zinc-800"
      >
        {t.saveImageButton}
      </button>
      <button
        type="button"
        onClick={handleShare}
        className="rounded-xl bg-zinc-900 py-3 text-sm font-semibold text-white"
      >
        {t.shareResultButton}
      </button>
    </div>
  );
}
