"use client";

import type { ReactNode } from "react";
import { BackgroundMusicProvider } from "@/components/audio/background-music-provider";
import { SecurityProvider } from "@/components/security";

type ClientProvidersProps = {
  children: ReactNode;
};

export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <SecurityProvider>
      <BackgroundMusicProvider>{children}</BackgroundMusicProvider>
    </SecurityProvider>
  );
}
