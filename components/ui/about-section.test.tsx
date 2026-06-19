import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { siteContent } from "@/lib/content";
import { AboutSection } from "./about-section";

describe("AboutSection", () => {
  it("renders about heading and bio content", () => {
    render(<AboutSection />);

    expect(
      screen.getByRole("heading", { name: /the hand behind the line/i })
    ).toBeInTheDocument();
    expect(screen.getByText(siteContent.bio.intro)).toBeInTheDocument();

    for (const paragraph of siteContent.bio.paragraphs) {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    }
  });
});
