import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SketchBorder, SketchFilters } from "./sketch-border";

describe("SketchBorder", () => {
  it("renders children with default sketch border classes", () => {
    render(<SketchBorder>Border content</SketchBorder>);
    const element = screen.getByText("Border content");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("sketch-border");
  });

  it("applies heavy variant class", () => {
    render(<SketchBorder variant="heavy">Heavy</SketchBorder>);
    expect(screen.getByText("Heavy")).toHaveClass("sketch-border-heavy");
  });

  it("renders as a custom semantic element", () => {
    render(
      <SketchBorder as="article" variant="crimson">
        Article
      </SketchBorder>
    );
    expect(screen.getByText("Article").closest("article")).toBeInTheDocument();
  });
});

describe("SketchFilters", () => {
  it("renders hidden SVG filter definitions", () => {
    const { container } = render(<SketchFilters />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("#pencil-roughness")).toBeInTheDocument();
    expect(container.querySelector("#pencil-roughness-light")).toBeInTheDocument();
  });
});
