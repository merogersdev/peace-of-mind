import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from "./Button";

describe(Button, () => {
  it("Renders button correctly", () => {
    const { container } = render(<Button text="Button" />);
    expect(container.textContent).toBe("Button");
  });
});
