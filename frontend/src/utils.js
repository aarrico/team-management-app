const phoneNumberRegexPattern =
  /^(\+1\s?)?(\(?\d{3}\)?[-\s]?)(\d{3})[-\s]?(\d{4})$/;

const emailRegexPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const TEAM_API_URL = 'http://localhost:8000/api/team/';

function isPhoneNumberValid(number) {
  return phoneNumberRegexPattern.test(number);
}

function isEmailValid(email) {
  return emailRegexPattern.test(email);
}

function formatPhoneNumber(number) {
  const stripped = number.replace(/\D/g, '');
  const match = stripped.match(phoneNumberRegexPattern);
  if (match) {
    const [, , areaCode, prefix, line] = match;
    return `${areaCode}-${prefix}-${line}`;
  }

  return undefined;
}

export { isPhoneNumberValid, formatPhoneNumber, isEmailValid, TEAM_API_URL };
