"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { BrandLoader } from "@/components/ui/brand-loader";

const STORAGE_KEY = "nzali-entered";

type ExperienceGateProps = {
  children: ReactNode;
};

export function ExperienceGate({ children }: ExperienceGateProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const entered = sessionStorage.getItem(STORAGE_KEY) === "1";
    if (!entered) {
      router.replace("/");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return <BrandLoader message="Opening the studio" />;
  }

  return children;
}

export function markExperienceEntered(): void {
  sessionStorage.setItem(STORAGE_KEY, "1");
}
