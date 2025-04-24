/**
 * Generates a random identifier string.
 *
 * @returns {string} - A random identifier string in the format 'tl-<alphanumeric>'.
 */
export function randomId() {
    // Generate a random string and ensure it's sufficiently unique by using Date.now()
    return `tl-${Math.random().toString(36).substr(2, 9)}-${Date.now().toString(36).substr(-4)}`;
}
