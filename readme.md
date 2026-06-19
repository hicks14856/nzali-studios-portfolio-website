<div align="center">

# Nzali Studio's Portfolio Website

**A private gallery of graphite, pigment, and shadow — built as slowly as the work it holds.**

*Painter · Pencil · Presence*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## The Question Behind the Site

Most artist portfolios behave like shop windows — everything visible at once, bright and eager. **Nzali's work does not ask for that kind of attention.** It asks you to lean in. To wait. To move through rooms rather than scroll past them.

This website was conceived as the digital equivalent of a **private studio viewing**: velvet walls, whispered crimson, pencil lines that feel hand-drawn even on a screen. The goal was never to catalogue art for casual browsing. It was to **preserve the intimacy of standing in front of a piece** — the pause before you speak, the grain of paper under low light, the sense that you were invited here.

---

## Artistic Thought Process

### 1. The Entry — Invitation, Not Homepage

The experience begins at a **Private Viewing** gate. A sketch-bordered access screen sits over a softly blurred artwork backdrop — not as security theatre, but as **narrative framing**. You are not landing on a marketing page; you are being admitted to a room.

> *"Enter the studio. A quiet room of graphite and shadow awaits."*

The access key is ceremonial. The moment you enter, session memory marks your passage and ambient music may begin — the site treats arrival as an event, not a click.

**Design intent:** Slow the viewer down before a single artwork appears. Respect the work by respecting the viewer's attention.

---

### 2. Colour as Emotion — The Velvet Palette

The entire visual language grows from a restrained triad:

| Token | Hex | Role |
|-------|-----|------|
| **Velvet** | `#FAF7F2` | Warm paper — the ground everything rests on |
| **Crimson** | `#8B0000` / `#7A0010` | Desire, heat, the accent of a heartbeat |
| **Graphite** | `#6B6B6B` | The pencil itself — lines, shadows, restraint |

Crimson never shouts. It appears in labels, dividers, and hover states like **wine stains on linen** — present, luxurious, controlled. The body background carries a faint radial blush, as if light fell through studio curtains.

Typography pairs **Cormorant Garamond** (classical, editorial) with **Inter** (quiet utility) and **Great Vibes** for the artist's signature — three voices: monument, whisper, hand.

---

### 3. Sketch Borders — Digital Graphite

Every frame, card, and form uses **layered pseudo-borders with SVG noise filters** to mimic uneven pencil strokes. This is not decoration; it is **material honesty**. The site refuses the crisp perfection of default UI chrome because Nzali's work lives in the imperfect line — the stroke that trembles slightly before it commits.

The `.sketch-border` system creates depth through stacked borders and filtered edges, so components feel **cut from a sketchbook**, not assembled from a component library.

---

### 4. Three Chapters of Memory

The catalogue is not a flat grid. It is organised into **three narrative chapters**, each with its own epigraph:

#### Pages Turned · *Sketchbook*
Graphite confessions from old notebooks. Unfinished, honest lines — memories that arrive as pencil before they become words.

#### Colour & Heat · *Pigment*
When feeling outgrew the pencil, colour took over. Summer skin, late-night rooms, pigment applied with unapologetic tenderness.

#### What We Carry · *Heritage*
Hands that reach backward and forward. We inherit more than faces — we inherit the gesture of holding on.

Each artwork carries a **title, medium, story, and memory** — a one-line emotional anchor ("*The summer you finally stopped looking down.*") that turns viewing into recollection.

---

### 5. Motion as Breath, Not Spectacle

Animation throughout the site follows a single rule: **move like someone exhaling**, not like a demo reel.

- **InkReveal** — text and elements emerge as if ink is still wet on the page
- **StoryReveal / SectionReveal** — staggered entrances that reward patience
- **ContrastSwipe** — section transitions that feel like turning a heavy page
- **Lenis smooth scroll** — unhurried vertical drift through the studio
- **Framer Motion springs** — organic easing tuned to feel human, not mechanical

Every animation respects `prefers-reduced-motion`. Luxury without exclusion.

---

### 6. The 3D Studio — Artworks That Float in Air

The Studio hero is not a static banner. It is a **WebGL environment** built with React Three Fiber:

- Artworks hover in three-dimensional space on textured planes with subtle shadow boards
- **Graphite mist** — hundreds of particles drift like dust in studio light
- **Sparkles** catch crimson highlights at the edges of vision
- Works rotate gently on sine waves — alive, but never dizzying

The 3D layer sits beneath film grain and radial light gradients, so the digital room feels **lit by a single window**, not a render farm.

---

### 7. The Gallery as Scrapbook

Artworks appear in contextual frames — **paper, polaroid, canvas, notebook** — each with slight rotational tilt, as if pinned to a studio wall mid-arrangement. Featured works rotate in the hero on a slow 5.2-second cycle, giving each piece time to breathe before the next arrives.

Detail pages wrap individual works in ambient canvas backdrops and immersive viewers that honour scale and negative space.

---

### 8. Sound as Atmosphere

Background music is optional and user-initiated — it begins when you **choose to enter**, not when the tab loads. Controls remain accessible but unobtrusive. The site is visual first; sound is the second room you walk into.

---

### 9. Protection as Care

Artwork images use canvas rendering and copy protection not from paranoia, but from **respect for original work**. A quiet copyright notice acknowledges that these pieces are not stock — they are someone's hand, someone's hours.

---

## Site Architecture

```
Entry (/)          → Private viewing gate
Studio (/studio)   → Immersive hero, featured works, invitation to explore
Stories (/stories) → Memory chapters with narrative grouping
Gallery (/gallery) → Full catalogue across all chapters
About (/about)     → Artist biography and heritage spotlight
Contact (/contact) → Commissions, inquiries, studio email
```

Each route inside `(experience)` shares a unified shell — navigation, grain overlay, music bootstrap, and page transitions — so movement between sections feels like **walking between rooms in the same building**, not loading new websites.

---

## Featured Works (Selection)

| Work | Medium | Chapter | Memory |
|------|--------|---------|--------|
| **Release** | Graphite on paper | Sketchbook | *The summer you finally stopped looking down.* |
| **Third Eye Dream** | Graphite & charcoal | Sketchbook | *You knew something before you had words for it.* |
| **Bottled Memory** | Graphite on paper | Sketchbook | *Some nights you still hear the cork pop.* |

Twenty-four works span the full catalogue — each with its own story, frame, and place in the chapter sequence.

---

## Technology Choices

Built with tools chosen for **craft**, not trend:

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 15** | App Router, image optimisation, production-ready deployment |
| Styling | **Tailwind CSS** | Design tokens as a living palette system |
| Motion | **Framer Motion + Lenis** | Choreographed reveals and smooth scroll |
| 3D | **Three.js + R3F + Drei** | Floating artworks and graphite particle atmospheres |
| Testing | **Vitest + Testing Library** | 34 unit tests across 18 component files |
| Deployment | **Vercel** | Edge-ready hosting aligned with Next.js |

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build

# Run test suite
npm test
```

Open [http://localhost:3000](http://localhost:3000) — enter the studio when ready.

---

## Philosophy

> *"This is not a catalogue to skim. It is a sequence of rooms. Move through them slowly."*

The website treats **time** as a design material. Scroll speed, reveal delays, chapter epigraphs, and the private entry gate all say the same thing: **the work deserves your unhurried attention**.

Nzali paints and draws in the tension between restraint and desire. This site was built in that same tension — between the precision of code and the tremor of a pencil line, between velvet quiet and crimson heat, between showing everything and letting you discover it one room at a time.

---

<div align="center">

**Nzali** · Painter & Pencil Artist  
*Fine art in graphite, pigment, and shadow*

Content © Nzali · All rights reserved

</div>
