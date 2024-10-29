/*eslint func-style: ["error", "declaration"]*/
import { parsePhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js';

export {
  isValidInternationalMobile
};

function isValidInternationalMobile(number) {
  if (!number.startsWith('+')) {
    return false;
  }
  const phoneNumber = parsePhoneNumberFromString(number);
  return (
    phoneNumber &&
    phoneNumber.isValid() &&
    phoneNumber.getType() === 'MOBILE'
  );
}
