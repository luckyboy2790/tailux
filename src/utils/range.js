/**
 * Generates an array of numbers from start to end with a given step size.
 *
 * @param {number} start - The starting number.
 * @param {number} end - The ending number.
 * @param {number} [step=1] - The step size between numbers.
 * @returns {number[]} - An array containing numbers from start to end.
 */
export function range(start, end, step = 1) {
    if (typeof start !== 'number' || typeof end !== 'number' || typeof step !== 'number') {
        throw new TypeError("Start, end, and step must be numbers.");
    }

    const result = [];
    for (let i = start; step > 0 ? i <= end : i >= end; i += step) {
        result.push(i);
    }
    return result;
}
