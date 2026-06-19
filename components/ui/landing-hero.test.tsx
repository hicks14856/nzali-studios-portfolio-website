import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { siteContent } from "@/lib/content";
import { LandingHero } from "./landing-hero";

describe("LandingHero", () => {
  it("renders hero heading and artist content", () => {
    render(<LandingHero />);

    expect(
      screen.getByRole("heading", { level: 1, name: siteContent.artist.name })
    ).toBeInTheDocument();
    expect(screen.getByText(siteContent.artist.tagline)).toBeInTheDocument();
    expect(screen.getByText(siteContent.artist.discipline)).toBeInTheDocument();
  });

  it("links to the gallery page", () => {
    render(<LandingHero />);
    expect(screen.getByRole("link", { name: /enter the gallery/i })).toHaveAttribute(
      "href",
      "/gallery"
    );
  });
});
