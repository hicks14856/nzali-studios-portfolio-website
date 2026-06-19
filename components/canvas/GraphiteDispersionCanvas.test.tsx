import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GraphiteDispersionCanvas } from "./GraphiteDispersionCanvas";

describe("GraphiteDispersionCanvas", () => {
  it("renders a WebGL canvas wrapper", () => {
    render(<GraphiteDispersionCanvas progress={0.5} className="test-canvas" />);
    expect(screen.getByTestId("r3f-canvas")).toHaveClass("test-canvas");
  });
});
