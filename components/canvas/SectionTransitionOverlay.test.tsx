import { createRef } from "react";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("framer-motion", async () => {
  const actual = await vi.importActual<typeof import("framer-motion")>("framer-motion");
  return {
    ...actual,
    useScroll: () => ({
      scrollYProgress: {
        get: () => 0,
        on: () => () => undefined,
      },
    }),
    useSpring: (value: unknown) => value,
    useTransform: (_input: unknown, _range: unknown, output: unknown) => ({
      get: () => (Array.isArray(output) ? output[0] : 0),
      on: () => () => undefined,
    }),
  };
});

import { SectionTransitionOverlay } from "./SectionTransitionOverlay";

describe("SectionTransitionOverlay", () => {
  it("renders overlay container for hero and about refs", () => {
    const heroRef = createRef<HTMLElement>();
    const aboutRef = createRef<HTMLElement>();

    const { container } = render(
      <>
        <section ref={heroRef}>Hero</section>
        <section ref={aboutRef}>About</section>
        <SectionTransitionOverlay heroRef={heroRef} aboutRef={aboutRef} />
      </>
    );

    const overlay = container.querySelector("[aria-hidden='true'].fixed");
    expect(overlay).toBeInTheDocument();
  });

  it("returns null on minimal capability devices", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes("prefers-reduced-motion"),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const heroRef = createRef<HTMLElement>();
    const aboutRef = createRef<HTMLElement>();

    const { container } = render(
      <>
        <section ref={heroRef}>Hero</section>
        <section ref={aboutRef}>About</section>
        <SectionTransitionOverlay heroRef={heroRef} aboutRef={aboutRef} />
      </>
    );

    expect(container.querySelector("[aria-hidden='true'].fixed")).toBeNull();
  });
});
