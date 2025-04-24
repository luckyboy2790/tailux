import isString from "lodash/isString";

const colors = {
    0: "neutral",
    1: "primary",
    2: "secondary",
    3: "info",
    4: "success",
    5: "warning",
    6: "error",
    7: "secondary",
    8: "primary",
    9: "info",
};

/**
 * Maps a text input to a color based on its first character.
 *
 * @param {string} text - The input string to determine the color.
 * @returns {string} - A color corresponding to the first character of the input string.
 * @throws {TypeError} - If the input is not a string.
 */
export function colorFromText(text) {
    if (!isString(text)) {
        throw new TypeError("Input must be a string.");
    }
    if (text.length === 0) {
        throw new Error("Input string must not be empty.");
    }

    const charCode = text.toLowerCase().charCodeAt(0);
    const lastDigit = charCode % 10; // Get the last digit more efficiently
    return colors[lastDigit];
}
