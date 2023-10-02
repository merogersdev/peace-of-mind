import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "./Header";

describe(Header, () => {
  it("Correctly renders title", () => {
    render(<Header title="Title" />);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});
