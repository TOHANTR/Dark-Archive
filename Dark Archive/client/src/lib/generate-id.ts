/**
 * Generates a random ID with the specified length
 * @param length Length of the ID to generate
 * @returns Random ID as a string
 */
export function generateRandomId(length: number): string {
  const digits = '0123456789';
  let result = '';
  
  // Ensure first digit is not 0
  result += digits.charAt(Math.floor(Math.random() * 9) + 1);
  
  // Generate remaining digits
  for (let i = 1; i < length; i++) {
    result += digits.charAt(Math.floor(Math.random() * 10));
  }
  
  return result;
}
