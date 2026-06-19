import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StoryReveal, StoryStagger } from "./StoryReveal";

describe("StoryReveal", () => {
  it("renders children", () => {
    render(<StoryReveal>Story content</StoryReveal>);
    expect(screen.getByText("Story content")).toBeInTheDocument();
  });
});

describe("StoryStagger", () => {
  it("renders staggered children", () => {
    render(
      <StoryStagger as="ul">
        <li>One</li>
        <li>Two</li>
      </StoryStagger>
    );
    expect(screen.getByText("One")).toBeInTheDocument();
    expect(screen.getByText("Two")).toBeInTheDocument();
  });
});
