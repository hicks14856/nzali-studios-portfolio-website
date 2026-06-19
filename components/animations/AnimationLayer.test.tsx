import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AnimationLayer } from "./AnimationLayer";

describe("AnimationLayer", () => {
  it("renders children without overlay when refs are missing", () => {
    render(
      <AnimationLayer>
        <p>Animated page</p>
      </AnimationLayer>
    );
    expect(screen.getByText("Animated page")).toBeInTheDocument();
  });

  it("renders section transition overlay when refs are provided", () => {
    const heroRef = createRef<HTMLElement>();
    const aboutRef = createRef<HTMLElement>();

    render(
      <>
        <section ref={heroRef}>Hero</section>
        <section ref={aboutRef}>About</section>
        <AnimationLayer heroRef={heroRef} aboutRef={aboutRef}>
          <p>Animated page</p>
        </AnimationLayer>
      </>
    );

    expect(screen.getByText("Animated page")).toBeInTheDocument();
  });
});
