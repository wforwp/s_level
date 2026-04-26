"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function IntroPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    router.replace("/");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(true);
  }, [router]);

  if (!isReady) return null;
  return null;
}
