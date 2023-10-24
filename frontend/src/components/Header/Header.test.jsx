import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "./Header";
import { UserProvider } from "../../context/UserContext";

describe(Header, () => {
  it("Correctly renders title", () => {
    render(
      <UserProvider>
        <Router>
          <Header title="Title" />
        </Router>
      </UserProvider>
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});
