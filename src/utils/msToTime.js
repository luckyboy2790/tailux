/**
 * Pads a number to two digits by adding a leading zero if necessary.
 *
 * @param {number} num - The number to pad.
 * @returns {string} - The padded number as a string.
 */
function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

/**
 * Converts milliseconds into a formatted time string (HH:MM:SS).
 *
 * @param {number} milliseconds - The time in milliseconds to convert.
 * @returns {string} - The formatted time string.
 */
export function msToTime(milliseconds) {
    if (typeof milliseconds !== 'number' || milliseconds < 0) {
        throw new Error("Input must be a non-negative number.");
    }

    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    // Get remaining seconds and minutes after dividing by 60
    seconds = seconds % 60;
    minutes = minutes % 60;

    // Format the time as HH:MM:SS
    return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`;
}
