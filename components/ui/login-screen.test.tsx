import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { LoginScreen } from "./login-screen";

describe("LoginScreen", () => {
  it("renders login form with access key field", () => {
    render(<LoginScreen onEnter={vi.fn()} />);

    expect(
      screen.getByRole("main", { name: /private gallery access/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/access key/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /enter gallery/i })
    ).toBeInTheDocument();
  });

  it("calls onEnter when the form is submitted", async () => {
    const user = userEvent.setup();
    const onEnter = vi.fn();
    render(<LoginScreen onEnter={onEnter} />);

    await user.type(screen.getByLabelText(/access key/i), "secret");
    await user.click(screen.getByRole("button", { name: /enter gallery/i }));

    expect(onEnter).toHaveBeenCalledTimes(1);
  });
});
