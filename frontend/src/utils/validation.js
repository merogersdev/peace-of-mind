export default function checkString(string, minLength) {
  return string.length > minLength;
}

export function checkEmail(email) {
  return email.length > 1 && email.includes("@");
}

export function checkPassword(password) {
  return password.length > 6;
}
