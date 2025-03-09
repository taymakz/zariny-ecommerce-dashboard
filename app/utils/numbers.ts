/**
 * Calculate the discount percentage based on the original price and discount amount.
 *
 * @param originalPrice - The original price of the item
 * @param discount - The discount amount applied
 * @returns The percentage of the discount, rounded-md down to the nearest whole number
 */
export function calcDiffPercentage(originalPrice: number, discount: number) {
  return Math.floor(((originalPrice - discount) / originalPrice) * 100)
}

/**
 * Round a number to the specified number of decimal places.
 *
 * Example:
 * Input: (3.14159, 2)
 * Output: 3.14
 *
 * @param num - The input number
 * @param decimals - The number of decimal places to round to (default: 2)
 * @returns The number rounded-md to the specified decimal places
 */
export function roundToDecimals(num: number, decimals = 2): number {
  const factor = 10 ** decimals
  return Math.round(num * factor) / factor
}
/**
 * Format a number with commas as thousands separators.
 *
 * Example:
 * Input: 1234567
 * Output: "1,234,567"
 *
 * @param num - The input number
 * @returns The formatted number as a string
 */
export function splitNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
/**
 * Generate a random number between a specified range.
 *
 * Example:
 * Input: (1, 10)
 * Output: 5 (random number within the range 1 to 10)
 *
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns A random number between min and max
 */
export function getRandomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export default function formatSize(sizeInBytes: number): string {
  if (sizeInBytes === 0)
    return '0 B'

  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(sizeInBytes) / Math.log(1024))
  const size = sizeInBytes / 1024 ** i

  // Round the size to two decimal places
  const formattedSize = size.toFixed(2)

  // Return the formatted string
  return `${formattedSize} ${units[i]}`
}
