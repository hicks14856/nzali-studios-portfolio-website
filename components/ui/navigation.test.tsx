import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { siteContent } from "@/lib/content";
import { Navigation } from "./navigation";

describe("Navigation", () => {
  it("renders artist name and nav links", () => {
    render(<Navigation />);

    expect(
      screen.getByRole("link", { name: siteContent.artist.name })
    ).toHaveAttribute("href", "/studio");

    for (const item of siteContent.nav) {
      expect(screen.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href
      );
    }
  });

  it("exposes primary navigation landmark", () => {
    render(<Navigation />);
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeInTheDocument();
  });
});
