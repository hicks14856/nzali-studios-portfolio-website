export type SectionAtmosphereId =
  | "studio-dawn"
  | "chapter-parchment"
  | "gallery-hall"
  | "crimson-close";

export type SectionAtmosphere = {
  id: SectionAtmosphereId;
  /** Transparent tint overlays — artwork backdrop shows through */
  background: string;
};

export const sectionAtmospheres: Record<SectionAtmosphereId, SectionAtmosphere> = {
  "studio-dawn": {
    id: "studio-dawn",
    background: `
      radial-gradient(ellipse 90% 70% at 50% -5%, rgba(122, 0, 16, 0.07) 0%, transparent 58%),
      radial-gradient(ellipse 70% 55% at 85% 40%, rgba(237, 231, 220, 0.28) 0%, transparent 62%)
    `,
  },
  "chapter-parchment": {
    id: "chapter-parchment",
    background: `
      radial-gradient(ellipse 80% 60% at 20% 20%, rgba(139, 0, 0, 0.05) 0%, transparent 55%),
      radial-gradient(ellipse 90% 70% at 80% 75%, rgba(226, 217, 204, 0.25) 0%, transparent 60%)
    `,
  },
  "gallery-hall": {
    id: "gallery-hall",
    background: `
      radial-gradient(ellipse 75% 55% at 50% 15%, rgba(107, 107, 107, 0.06) 0%, transparent 58%),
      radial-gradient(ellipse 100% 80% at 50% 100%, rgba(122, 0, 16, 0.05) 0%, transparent 55%)
    `,
  },
  "crimson-close": {
    id: "crimson-close",
    background: `
      radial-gradient(ellipse 70% 50% at 50% 0%, rgba(122, 0, 16, 0.08) 0%, transparent 62%),
      radial-gradient(ellipse 90% 70% at 50% 100%, rgba(74, 4, 4, 0.05) 0%, transparent 58%)
    `,
  },
};
