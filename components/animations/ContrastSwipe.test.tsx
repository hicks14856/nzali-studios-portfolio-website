import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ContrastSwipe } from "./ContrastSwipe";

describe("ContrastSwipe", () => {
  it("renders children", () => {
    render(<ContrastSwipe>Swipe content</ContrastSwipe>);
    expect(screen.getByText("Swipe content")).toBeInTheDocument();
  });

  it("renders static content when reduced motion is preferred", () => {
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

    render(<ContrastSwipe as="section">Reduced motion</ContrastSwipe>);
    expect(screen.getByText("Reduced motion")).toBeInTheDocument();
  });
});
