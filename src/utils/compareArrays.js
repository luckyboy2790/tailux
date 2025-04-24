/**
 * Compares two arrays deeply to check if they are identical.
 *
 * @param {Array} a - The first array to compare.
 * @param {Array} b - The second array to compare.
 * @returns {boolean} - True if the arrays are identical, false otherwise.
 * @throws {TypeError} - If either argument is not an array.
 */
export const compareArrays = (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) {
      throw new TypeError("Both arguments must be arrays.");
  }

  if (a.length !== b.length) return false;

  return a.every((element, index) => {
      const otherElement = b[index];

      // Recursively compare nested arrays
      if (Array.isArray(element) && Array.isArray(otherElement)) {
          return compareArrays(element, otherElement);
      }

      // Direct comparison for primitive values
      return element === otherElement;
  });
};
