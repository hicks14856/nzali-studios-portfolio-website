import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { SecurityProvider, useSecurity } from "./SecurityProvider";

function SecurityConsumer() {
  const { showCopyNotice } = useSecurity();
  return (
    <button type="button" onClick={showCopyNotice}>
      Trigger notice
    </button>
  );
}

describe("SecurityProvider", () => {
  it("renders children", () => {
    render(
      <SecurityProvider>
        <p>Protected content</p>
      </SecurityProvider>
    );
    expect(screen.getByText("Protected content")).toBeInTheDocument();
  });

  it("shows copy notice when triggered", async () => {
    const user = userEvent.setup();
    render(
      <SecurityProvider>
        <SecurityConsumer />
      </SecurityProvider>
    );

    await user.click(screen.getByRole("button", { name: /trigger notice/i }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Content Copywritten © Nzali"
    );
  });

  it("throws when useSecurity is used outside provider", () => {
    expect(() => render(<SecurityConsumer />)).toThrow(
      /useSecurity must be used within SecurityProvider/i
    );
  });
});
