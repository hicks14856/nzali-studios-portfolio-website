import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SecureImage } from "./SecureImage";

describe("SecureImage", () => {
  it("renders image and canvas elements", () => {
    render(
      <SecureImage
        src="/test-artwork.jpg"
        alt="Test artwork"
        width={400}
        height={500}
      />
    );

    expect(screen.getByAltText("Test artwork")).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: "Test artwork" })).toHaveLength(2);
  });

  it("prevents drag and context menu on the container", () => {
    const { container } = render(
      <SecureImage
        src="/test-artwork.jpg"
        alt="Protected artwork"
        width={200}
        height={200}
      />
    );

    const wrapper = container.firstElementChild as HTMLElement;
    const dragEvent = new Event("dragstart", { bubbles: true, cancelable: true });
    const contextEvent = new Event("contextmenu", {
      bubbles: true,
      cancelable: true,
    });

    wrapper.dispatchEvent(dragEvent);
    wrapper.dispatchEvent(contextEvent);

    expect(dragEvent.defaultPrevented).toBe(true);
    expect(contextEvent.defaultPrevented).toBe(true);
  });
});
