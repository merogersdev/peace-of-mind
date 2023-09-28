import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "./Header";

describe(Header, () => {
  it("Correctly renders title", () => {
    const { container } = render(<Header title="Title" />);
    const titleSpan = container.getElementsByTagName("span")[0];
    expect(titleSpan.textContent).toBe("Title");
  });
});
