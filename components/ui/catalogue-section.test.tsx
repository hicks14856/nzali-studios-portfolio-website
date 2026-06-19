import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { artworks } from "@/lib/artworks";
import { siteContent } from "@/lib/content";
import { CatalogueSection } from "./catalogue-section";

describe("CatalogueSection", () => {
  it("renders catalogue heading and artwork titles", () => {
    render(<CatalogueSection />);

    expect(
      screen.getByRole("heading", { name: siteContent.catalogue.title })
    ).toBeInTheDocument();
    expect(screen.getByText(siteContent.catalogue.subtitle)).toBeInTheDocument();
    expect(screen.getByText(artworks[0]!.title)).toBeInTheDocument();
  });
});
