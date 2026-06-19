import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionContainer } from "./section-container";

describe("SectionContainer", () => {
  it("renders a section with children", () => {
    render(
      <SectionContainer id="test-section" labelledBy="heading-id">
        <h2 id="heading-id">Section title</h2>
      </SectionContainer>
    );

    const section = screen.getByRole("region", { name: /section title/i });
    expect(section).toHaveAttribute("id", "test-section");
    expect(screen.getByRole("heading", { name: "Section title" })).toBeInTheDocument();
  });

  it("supports aria-label when labelledBy is not provided", () => {
    render(
      <SectionContainer ariaLabel="Custom section">
        <p>Content</p>
      </SectionContainer>
    );
    expect(screen.getByLabelText("Custom section")).toBeInTheDocument();
  });
});
