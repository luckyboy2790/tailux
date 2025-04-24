const colors = {
    primary: 'this:primary',
    secondary: 'this:secondary',
    info: 'this:info',
    success: 'this:success',
    warning: 'this:warning',
    error: 'this:error'
};

/**
 * Returns the class name for the specified color.
 *
 * @param {string} color - The color key to look up.
 * @returns {string} - The corresponding class name for the color.
 * @throws {Error} - Throws an error if the color is not found in the color map.
 */
export function setThisClass(color) {
    // Check if the color exists in the 'colors' object and return the class name.
    const className = colors[color];
    if (!className) {
        throw new Error(`Color "${color}" not found in the color map.`);
    }
    return className;
}
