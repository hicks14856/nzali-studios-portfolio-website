import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { GraphiteDispersionPlane } from "./GraphiteDispersionScene";

describe("GraphiteDispersionPlane", () => {
  it("renders a mesh with shader material", () => {
    const { container } = render(
      <GraphiteDispersionPlane progress={0.25} intensity={0.8} />
    );
    expect(container.querySelector("mesh")).toBeInTheDocument();
    expect(container.querySelector("shaderMaterial")).toBeInTheDocument();
  });
});
