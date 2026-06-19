"use client";

import { PageTransition } from "@/components/layout/page-transition";

export default function ExperienceTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageTransition>{children}</PageTransition>;
}
