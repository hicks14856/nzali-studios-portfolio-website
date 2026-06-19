export type ArtworkChapter = "sketchbook" | "pigment" | "heritage";

export type ArtworkFrame = "paper" | "polaroid" | "canvas" | "notebook";

export type Artwork = {
  id: string;
  src: string;
  title: string;
  medium: string;
  story: string;
  memory: string;
  chapter: ArtworkChapter;
  frame: ArtworkFrame;
  /** Subtle scrapbook rotation in degrees */
  tilt?: number;
  featured?: boolean;
  spotlight?: boolean;
};

export const artworkChapters: Record<
  ArtworkChapter,
  { title: string; subtitle: string; epigraph: string }
> = {
  sketchbook: {
    title: "Pages Turned",
    subtitle: "Graphite confessions from old notebooks",
    epigraph:
      "Some memories arrive as pencil lines — unfinished, honest, still breathing on the page.",
  },
  pigment: {
    title: "Colour & Heat",
    subtitle: "Pigment, summer skin, and late-night rooms",
    epigraph:
      "When the pencil could no longer hold the feeling, colour took over — loud, tender, unapologetic.",
  },
  heritage: {
    title: "What We Carry",
    subtitle: "Hands that reach backward and forward",
    epigraph:
      "We inherit more than faces. We inherit the gesture of holding on.",
  },
};

export const artworks: Artwork[] = [
  {
    id: "release",
    src: "/artworks/release.png",
    title: "Release",
    medium: "Graphite on paper",
    story:
      "Head thrown back, eyes lifted toward something unseen — a moment of surrender caught mid-breath, as if the body remembered a song the mind had forgotten.",
    memory: "The summer you finally stopped looking down.",
    chapter: "sketchbook",
    frame: "paper",
    tilt: -1.5,
    featured: true,
    spotlight: true,
  },
  {
    id: "third-eye-dream",
    src: "/artworks/third-eye-dream.png",
    title: "Third Eye Dream",
    medium: "Graphite & charcoal",
    story:
      "An eye wide with seeing, crowned by a butterfly and framed in feathers — the kind of dream you wake from still tasting.",
    memory: "You knew something before you had words for it.",
    chapter: "sketchbook",
    frame: "paper",
    tilt: 1,
  },
  {
    id: "bottled-memory",
    src: "/artworks/bottled-memory.png",
    title: "Bottled Memory",
    medium: "Graphite on paper",
    story:
      "A woman suspended in glass, hair drifting like seaweed — feelings preserved too long, waiting for someone to uncork them.",
    memory: "Some nights you still hear the cork pop.",
    chapter: "sketchbook",
    frame: "paper",
    tilt: -0.75,
  },
  {
    id: "smoke-kiss",
    src: "/artworks/smoke-kiss.png",
    title: "Smoke Kiss",
    medium: "Graphite on lined paper",
    story:
      "On blue notebook lines, a figure exhales a ghost who leans down to kiss their forehead — grief made visible, tender as ash.",
    memory: "They visit when the room goes quiet.",
    chapter: "sketchbook",
    frame: "notebook",
    tilt: 1.25,
  },
  {
    id: "diary-page",
    src: "/artworks/diary-page.png",
    title: "Diary Page",
    medium: "Graphite collage on paper",
    story:
      "Coffee steam, chained hearts, star-filled lips — and the sentence every love leaves behind: I still remember the feeling when we kissed.",
    memory: "Found on the back of an old receipt.",
    chapter: "sketchbook",
    frame: "notebook",
    tilt: -1,
  },
  {
    id: "breaking-free",
    src: "/artworks/breaking-free.png",
    title: "Breaking Free",
    medium: "Graphite with colour pencil",
    story:
      "Chains around open palms, butterflies rising — the exact second something heavy loosens its grip and colour returns to the world.",
    memory: "The day the weight finally lifted.",
    chapter: "sketchbook",
    frame: "paper",
    tilt: 0.5,
  },
  {
    id: "quiet-hour",
    src: "/artworks/quiet-hour.png",
    title: "Quiet Hour",
    medium: "Graphite on paper",
    story:
      "A hand over the face, a green star sticker in the corner — the private hour when no one is performing, only feeling.",
    memory: "Gold stars for surviving hard days.",
    chapter: "sketchbook",
    frame: "polaroid",
    tilt: -1.25,
  },
  {
    id: "soft-edge",
    src: "/artworks/soft-edge.png",
    title: "Soft Edge",
    medium: "Graphite on warm paper",
    story:
      "Collarbones and a thin strap on sepia-toned paper — the beauty of an almost-glimpse, like remembering someone by the curve of their shoulder.",
    memory: "Warm light through a half-drawn curtain.",
    chapter: "sketchbook",
    frame: "paper",
    tilt: 1.5,
  },
  {
    id: "dragon-study",
    src: "/artworks/dragon-study.png",
    title: "Dragon Study",
    medium: "Graphite on paper",
    story:
      "Horns swept back, scales layered like armour — the childhood myth that never left, drawn again with an adult's patience.",
    memory: "Every sketchbook had one of these.",
    chapter: "sketchbook",
    frame: "paper",
    tilt: -0.5,
  },
  {
    id: "grid-dance",
    src: "/artworks/grid-dance.png",
    title: "Grid Dance",
    medium: "Graphite on gridded paper",
    story:
      "Two figures traced on proportion lines — a study that became a romance, the grid still visible beneath the intimacy.",
    memory: "Practice pages that became love letters.",
    chapter: "sketchbook",
    frame: "notebook",
    tilt: 0.75,
  },
  {
    id: "studio-echo",
    src: "/artworks/studio-echo.png",
    title: "Studio Echo",
    medium: "Graphite on paper",
    story:
      "Vintage microphone draped in modern headphones — where the golden age of radio meets the solitude of late-night listening.",
    memory: "Your grandmother's songs, your headphones.",
    chapter: "sketchbook",
    frame: "paper",
    tilt: -1,
  },
  {
    id: "companions",
    src: "/artworks/companions.png",
    title: "Companions",
    medium: "Graphite on paper",
    story:
      "Two parrots leaning into each other on a rough branch — quiet devotion rendered in patient cross-hatching.",
    memory: "The pair that always sat together.",
    chapter: "heritage",
    frame: "paper",
    tilt: 1,
  },
  {
    id: "companions-ii",
    src: "/artworks/companions-ii.png",
    title: "Companions II",
    medium: "Graphite on creased paper",
    story:
      "The same two birds on wrinkled paper — as if the page was folded into a pocket and carried for years.",
    memory: "Kept in the back of a drawer.",
    chapter: "heritage",
    frame: "polaroid",
    tilt: -1.5,
  },
  {
    id: "morning-hearts",
    src: "/artworks/morning-hearts.png",
    title: "Morning Hearts",
    medium: "Acrylic on panel",
    story:
      "Heart-patterned pajamas, hands clasped at the waist — the sacred ordinary of being at home in your own skin.",
    memory: "Saturday mornings in pink light.",
    chapter: "pigment",
    frame: "canvas",
    tilt: 0.5,
  },
  {
    id: "golden-shade",
    src: "/artworks/golden-shade.png",
    title: "Golden Shade",
    medium: "Acrylic on panel",
    story:
      "Orange bikini, yellow hat pulled low — sun oil catching light on brown skin, the mystery of a face hidden by summer.",
    memory: "That one trip you never photographed enough.",
    chapter: "pigment",
    frame: "canvas",
    tilt: -1,
    spotlight: true,
  },
  {
    id: "summer-daisy",
    src: "/artworks/summer-daisy.png",
    title: "Summer Daisy",
    medium: "Mixed media on panel",
    story:
      "Retro orange daisy bikini in raised twine outlines — flower power pressed into a handmade frame of crushed stone.",
    memory: "Seventies postcards in a shoebox.",
    chapter: "pigment",
    frame: "canvas",
    tilt: 1.25,
  },
  {
    id: "plaid-intimacy",
    src: "/artworks/plaid-intimacy.png",
    title: "Plaid Intimacy",
    medium: "Acrylic on panel",
    story:
      "Red plaid lingerie, body leaning forward — pin-up nostalgia rewritten with warmth, texture, and unapologetic curves.",
    memory: "Old magazines, new confidence.",
    chapter: "pigment",
    frame: "canvas",
    tilt: -0.75,
    spotlight: true,
  },
  {
    id: "lavender-confidence",
    src: "/artworks/lavender-confidence.png",
    title: "Lavender Confidence",
    medium: "Acrylic on panel",
    story:
      "Bold black lines on soft purple — a back-view silhouette that owns the room, framed in rough DIY stone.",
    memory: "The poster you hid, then hung.",
    chapter: "pigment",
    frame: "canvas",
    tilt: 1,
    spotlight: true,
  },
  {
    id: "y2k-back",
    src: "/artworks/y2k-back.png",
    title: "Y2K Back",
    medium: "Acrylic on panel",
    story:
      "Red hair, gold nails, low-rise denim — the exact silhouette of an era when getting ready was the main event.",
    memory: "Mirror checks before every night out.",
    chapter: "pigment",
    frame: "canvas",
    tilt: -1.25,
    spotlight: true,
  },
  {
    id: "green-surrender",
    src: "/artworks/green-surrender.png",
    title: "Green Surrender",
    medium: "Acrylic on panel",
    story:
      "Green skin, red lips, chain and choker — underground zine energy painted thick, raw edges and all.",
    memory: "Late-night cable, early rebellion.",
    chapter: "pigment",
    frame: "canvas",
    tilt: 0.75,
    spotlight: true,
  },
  {
    id: "crimson-appetite",
    src: "/artworks/crimson-appetite.png",
    title: "Crimson Appetite",
    medium: "Acrylic on panel",
    story:
      "Red and grey bodies in comic-book contrast — desire rendered as pop art, provocative and unflinching.",
    memory: "The comics they kept under the bed.",
    chapter: "pigment",
    frame: "canvas",
    tilt: -0.5,
    spotlight: true,
  },
  {
    id: "night-fragment",
    src: "/artworks/night-fragment.png",
    title: "Night Fragment",
    medium: "Acrylic on slate",
    story:
      "Teal strokes on black — abstract shapes like a landscape seen from a moving car at midnight, half-remembered.",
    memory: "Streetlights through a rainy window.",
    chapter: "pigment",
    frame: "canvas",
    tilt: 1.5,
    spotlight: true,
  },
  {
    id: "guiding-hand",
    src: "/artworks/guiding-hand.png",
    title: "Guiding Hand",
    medium: "Graphite on paper",
    story:
      "An adult finger and a child's pinky, framed in wildflowers — the oldest promise: I will not let you fall.",
    memory: "The hand you still reach for in dreams.",
    chapter: "heritage",
    frame: "paper",
    tilt: -1,
    featured: true,
  },
  {
    id: "rooted-hands",
    src: "/artworks/rooted-hands.png",
    title: "Rooted Hands",
    medium: "Mixed media on canvas",
    story:
      "Rope hands reaching upward as tree branches, leaves falling — roots below, growth above, all in one breath.",
    memory: "Grandmother's garden after the rain.",
    chapter: "heritage",
    frame: "canvas",
    tilt: 0.5,
  },
];

/** The eight real pieces that anchor the site — order is intentional for display. */
export const highlightArtworkIds = [
  "release",
  "lavender-confidence",
  "green-surrender",
  "plaid-intimacy",
  "crimson-appetite",
  "y2k-back",
  "night-fragment",
  "golden-shade",
] as const;

export type HighlightArtworkId = (typeof highlightArtworkIds)[number];

export const featuredArtwork =
  artworks.find((a) => a.id === "release") ?? artworks[0];

export function getArtworksByChapter(chapter: ArtworkChapter): Artwork[] {
  return artworks.filter((a) => a.chapter === chapter);
}

export function getHighlightArtworks(): Artwork[] {
  return highlightArtworkIds
    .map((id) => artworks.find((a) => a.id === id))
    .filter((a): a is Artwork => Boolean(a));
}

export function getSpotlightArtworks(): Artwork[] {
  return getHighlightArtworks();
}

export function getChapterCoverArtwork(chapter: ArtworkChapter): Artwork | undefined {
  const highlight = getHighlightArtworks().find((a) => a.chapter === chapter);
  if (highlight) return highlight;
  return getArtworksByChapter(chapter)[0];
}

export function getArtworkById(id: string): Artwork | undefined {
  return artworks.find((a) => a.id === id);
}

export function getAdjacentArtworks(id: string): {
  prev: Artwork | null;
  next: Artwork | null;
} {
  const index = artworks.findIndex((a) => a.id === id);
  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: index > 0 ? artworks[index - 1]! : null,
    next: index < artworks.length - 1 ? artworks[index + 1]! : null,
  };
}
