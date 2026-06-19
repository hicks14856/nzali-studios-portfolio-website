export const siteContent = {
  artist: {
    name: "Nzali",
    tagline: "Painter · Pencil · Presence",
    discipline: "Fine art in graphite, pigment, and shadow",
    portrait: "/images/nzali-portrait.png",
  },
  bio: {
    intro:
      "Nzali is a contemporary painter and pencil artist whose work dwells in the tension between restraint and desire — velvety blacks, whispered crimson, and lines drawn as if breathed onto paper.",
    paragraphs: [
      "Working primarily in graphite and oil, Nzali crafts compositions that feel both intimate and monumental. Each piece begins with the pencil: a single uncertain stroke that grows into architecture of flesh, fabric, and negative space.",
      "Influenced by classical figure study and contemporary narrative illustration, the work refuses easy categorization. It is erotic without spectacle, luxurious without excess — a slow unfolding for viewers who lean in.",
      "Based in studio practice, Nzali exhibits selectively and accepts private commissions by invitation.",
    ],
  },
  nav: [
    { label: "Studio", href: "/studio" },
    { label: "Stories", href: "/stories" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  catalogue: {
    title: "Catalogue",
    subtitle:
      "Twenty-four works across three chapters — sketchbook confessions, painted heat, and the hands we inherit.",
  },
  landing: {
    prelude:
      "Step inside a studio where every line remembers something — a hand, a summer, a ghost at the edge of the page.",
    invitation:
      "This is not a catalogue to skim. It is a sequence of rooms. Move through them slowly.",
  },
  stories: {
    title: "Memory Chapters",
    subtitle: "Stories kept in the line",
    intro:
      "Each chapter holds a different kind of truth — pencil confessions, painted heat, and the hands we inherit. Every work is a page someone refused to tear out.",
  },
} as const;
