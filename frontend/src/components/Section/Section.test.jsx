import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Section from "./Section";

describe(Section, () => {
  it("Renders Normal Section", () => {
    const { container } = render(<Section />);
    expect(container.getElementsByClassName("section").length).toBe(1);
  });

  it("Renders Mini Section", () => {
    const { container } = render(<Section mini />);
    expect(container.getElementsByClassName("section--mini").length).toBe(1);
  });
});
