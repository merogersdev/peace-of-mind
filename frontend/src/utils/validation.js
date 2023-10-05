export default function checkString(string, minLength) {
  return string.length > minLength;
}

export function checkEmail(email) {
  return email.length > 1 && email.includes("@");
}

export function checkPassword(password) {
  return password.length > 6;
}

export function matchPasswords(password1, password2) {
  return password1 === password2;
}
