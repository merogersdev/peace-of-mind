import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from "./Button";

describe(Button, () => {
  it("Renders button correctly", async () => {
    render(<Button text="Button" />);
    expect(screen.getByText("Button")).toBeInTheDocument();
  });
});
