import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import checkString, {
  checkEmail,
  checkPassword,
  matchPasswords,
} from "./validation";

describe("Email Validation Check", () => {
  it("Returns true on correct email", () => {
    const emailValidation = checkEmail("test@test.com");
    expect(emailValidation).toEqual(true);
  });
  it("Returns false on malformed email", () => {
    const emailValidation = checkEmail("test.com");
    expect(emailValidation).toEqual(false);
  });
});

describe("Password Validation Check", () => {
  it("Returns true on correct password", () => {
    const passwordValidation = checkPassword("1234567890");
    expect(passwordValidation).toEqual(true);
  });
  it("Returns false on short password", () => {
    const passwordValidation = checkPassword("abc");
    expect(passwordValidation).toEqual(false);
  });
});

describe("String Validation Check", () => {
  it("Returns true on positive string length", () => {
    const stringValidation = checkString("string", 1);
    expect(stringValidation).toEqual(true);
  });
  it("Returns false if string is blank", () => {
    const stringValidation = checkString("", 1);
    expect(stringValidation).toEqual(false);
  });
});

describe("Password Match Check", () => {
  it("Returns true if passwords match", () => {
    const passwordMatch = matchPasswords("password", "password");
    expect(passwordMatch).toEqual(true);
  });
  it("Returns false if passwords do not match", () => {
    const passwordMatch = matchPasswords("password", "drowssap");
    expect(passwordMatch).toEqual(false);
  });
});
