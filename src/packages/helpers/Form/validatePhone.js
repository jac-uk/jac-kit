/*eslint func-style: ["error", "declaration"]*/
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export {
  isValidUKMobile
};

function isValidUKMobile(number, countryCode = 'GB') {
  // Ensure the number starts with a local prefix (like '0' for the UK)
  if (!number.startsWith('0')) {
    return false;
  }
  const phoneNumber = parsePhoneNumberFromString(number, countryCode);
  return phoneNumber && phoneNumber.isValid() && phoneNumber.getType() === 'MOBILE';
}
