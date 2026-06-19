import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ContactSection } from "./contact-section";

describe("ContactSection", () => {
  it("renders contact heading and email link", () => {
    render(<ContactSection />);

    expect(
      screen.getByRole("heading", { name: /commissions & inquiries/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "studio@nzali.art" })).toHaveAttribute(
      "href",
      "mailto:studio@nzali.art"
    );
  });
});
