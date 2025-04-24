/**
 * Check if an object is a React ref.
 * @param {any} obj - The object to check.
 * @returns {boolean} - True if the object is a React ref, false otherwise.
 */
export const isRef = (obj) => {
    return (
        obj !== null &&
        typeof obj === 'object' &&
        'current' in obj &&
        (obj.current === null || typeof obj.current !== 'function')
    );
};
