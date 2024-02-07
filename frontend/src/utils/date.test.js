import { describe, expect, it } from "vitest";
import formatDate from "./date";

describe("Format Dates", () => {
  it("Formats supplied date correctly", () => {
    const formattedDate = formatDate("2017-07-23", "13:10:11");
    expect(formattedDate).toMatch("07/23/2017");
  });
});
