import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  SmoothScrollProvider,
  useLenisInstance,
} from "./SmoothScrollProvider";

function LenisProbe() {
  const lenis = useLenisInstance();
  return <div data-testid="lenis-state">{lenis ? "ready" : "idle"}</div>;
}

describe("SmoothScrollProvider", () => {
  it("renders children", () => {
    render(
      <SmoothScrollProvider>
        <p>Scroll child</p>
      </SmoothScrollProvider>
    );
    expect(screen.getByText("Scroll child")).toBeInTheDocument();
  });

  it("exposes lenis instance through context when enabled", async () => {
    render(
      <SmoothScrollProvider>
        <LenisProbe />
      </SmoothScrollProvider>
    );

    expect(await screen.findByTestId("lenis-state")).toHaveTextContent("ready");
  });

  it("skips lenis when disabled", () => {
    render(
      <SmoothScrollProvider disabled>
        <LenisProbe />
      </SmoothScrollProvider>
    );
    expect(screen.getByTestId("lenis-state")).toHaveTextContent("idle");
  });
});
