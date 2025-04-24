/**
 * Converts a string into a URL-friendly slug.
 *
 * @param {string} str - The input string to be converted to a slug.
 * @returns {string} - The resulting slug.
 */
export function stringToSlug(str) {
    if (typeof str !== 'string') {
        throw new TypeError('Input must be a string.');
    }

    // Trim, convert to lowercase, and remove accents
    str = str.trim().toLowerCase();

    // Normalize accents using a built-in method for better performance and support
    str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    // Replace special characters and spaces with dashes
    str = str.replace(/[^a-z0-9 -]/g, '')  // Remove invalid characters
             .replace(/\s+/g, '-')        // Replace spaces with dashes
             .replace(/-+/g, '-');        // Collapse consecutive dashes

    return str;
}
