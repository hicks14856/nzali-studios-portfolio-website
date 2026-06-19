import { ExperienceGate } from "@/components/layout/experience-gate";
import { SiteShell } from "@/components/layout/site-shell";

export default function ExperienceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ExperienceGate>
      <SiteShell>{children}</SiteShell>
    </ExperienceGate>
  );
}
