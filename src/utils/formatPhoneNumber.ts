import { parsePhoneNumberFromString } from 'libphonenumber-js';

function formatPhoneNumber (phoneNumber: string, country: any = 'SY') {{
  if (!phoneNumber) return '';
  const phone = parsePhoneNumberFromString(phoneNumber, country)
  return phone ? phone.formatInternational() : phoneNumber;
}}

export default formatPhoneNumber;