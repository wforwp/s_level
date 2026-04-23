"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IntroForm from "@/components/IntroForm";
import { hasGatePassed } from "@/lib/storage";

export default function IntroPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!hasGatePassed()) {
      router.replace("/");
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(true);
  }, [router]);

  if (!isReady) return null;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center bg-zinc-50 p-4">
      <IntroForm />
    </main>
  );
}
