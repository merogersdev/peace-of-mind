import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Message from "./Message";

describe(Message, () => {
  it("Renders Info Message", () => {
    const { container } = render(<Message type="info" message="Information" />);
    expect(container.getElementsByClassName("message--info").length).toBe(1);
    expect(container.textContent).toBe("Information");
  });

  it("Renders Error Message", () => {
    const { container } = render(<Message type="error" message="Error" />);
    expect(container.getElementsByClassName("message--error").length).toBe(1);
    expect(container.textContent).toBe("Error");
  });

  it("Renders Success Message", () => {
    const { container } = render(<Message type="success" message="Success" />);
    expect(container.getElementsByClassName("message--success").length).toBe(1);
    expect(container.textContent).toBe("Success");
  });

  it("Renders Warning Message", () => {
    const { container } = render(<Message type="warning" message="Warning" />);
    expect(container.getElementsByClassName("message--warning").length).toBe(1);
    expect(container.textContent).toBe("Warning");
  });
});
