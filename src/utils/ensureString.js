/**
 * Ensures the input is a string. If the input is `null` or `undefined`, returns an empty string.
 *
 * @param {any} val - The value to ensure as a string.
 * @returns {string} - The input value as a string, or an empty string if the input is `null` or `undefined`.
 */
export const ensureString = (val) => (val == null ? "" : String(val));
