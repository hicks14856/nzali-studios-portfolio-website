import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InkReveal } from "./InkReveal";

describe("InkReveal", () => {
  it("renders children", () => {
    render(<InkReveal>Ink content</InkReveal>);
    expect(screen.getByText("Ink content")).toBeInTheDocument();
  });
});
