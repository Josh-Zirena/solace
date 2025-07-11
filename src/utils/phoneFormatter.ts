export function formatPhoneDisplay(phoneNumber: string): string {
  if (!phoneNumber) return '';
  
  const digits = phoneNumber.replace(/\D/g, '');
  
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  
  if (digits.length > 10) {
    const countryCode = digits.slice(0, digits.length - 10);
    const number = digits.slice(-10);
    return `+${countryCode} (${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;
  }
  
  return phoneNumber;
}

export function formatPhoneTel(phoneNumber: string): string {
  if (!phoneNumber) return '';
  
  const digits = phoneNumber.replace(/\D/g, '');
  
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  
  return `+${digits}`;
}

export function isValidPhoneNumber(phoneNumber: string): boolean {
  if (!phoneNumber) return false;
  const digits = phoneNumber.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 15;
}