/**
 * Capitalize the first letter of a string.
 *
 * @param str - The input string
 * @returns The string with the first letter capitalized
 */
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Capitalize the first letter of each word in a string.
 *
 * Example:
 * Input: "hello world"
 * Output: "Hello World"
 *
 * @param str - The input string
 * @returns The string with each word's first letter capitalized
 */
export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, char => char.toUpperCase())
}

/**
 * Truncate a string to the specified length, adding ellipsis if necessary.
 *
 * Example:
 * Input: ("hello world", 5)
 * Output: "hello..."
 *
 * @param str - The input string
 * @param length - The maximum length of the string
 * @returns The truncated string with ellipsis if it exceeds the specified length
 */
export function truncateString(str: string, length: number): string {
  return str.length > length ? `${str.slice(0, length)}...` : str
}

/**
 * Convert a string to kebab-case.
 *
 * Example:
 * Input: "Hello World"
 * Output: "hello-world"
 *
 * @param str - The input string
 * @returns The string converted to kebab-case
 */
export function toSlug(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}

export function isPersian(char: string) {
  const persianRegex = /^[\u0600-\u06FF]/ // Persian/Arabic Unicode range
  return persianRegex.test(char)
}
