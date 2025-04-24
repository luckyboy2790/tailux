import { unRef } from "./unRef";

// Constants for animation durations
const TRANSITION_DURATION = 500; // in ms
const FLASH_DURATION = 100; // in ms

/**
 * Triggers a flash animation on an element, temporarily changing its background color.
 * 
 * @param {HTMLElement | Ref<HTMLElement>} el - The element or a reactive reference to the element to apply the flash effect.
 */
export function triggerPostMoveFlash(el) {
    const element = unRef(el);

    // Validate the element
    if (!(element instanceof HTMLElement)) {
        console.error("Invalid element provided to triggerPostMoveFlash. Expected an HTMLElement Or RefObject but received:", element);
        return;
    }


    // Store the original background color
    const originalBackground = window.getComputedStyle(element).backgroundColor;

    // Add transition for smooth animation
    element.style.transition = `background-color ${TRANSITION_DURATION}ms ease-out`;

    // Apply the flash color
    element.style.backgroundColor = `rgb(var(--colors-primary-500) / 0.8)`;

    // Reset to the original color after the flash duration
    setTimeout(() => {
        element.style.backgroundColor = originalBackground;

        // Clean up transition after it completes
        setTimeout(() => {
            element.style.transition = '';
        }, TRANSITION_DURATION);
    }, FLASH_DURATION);
}
