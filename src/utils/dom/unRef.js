import { isRef } from "./isRef"

/**
 * Accepts either a ref object or a dom node and returns a dom node
 *
 * @param {React.RefObject<Element> | Element} target - A React ref object or a DOM node.
 * @returns {Element} - The resolved DOM node.
 */
export function unRef(target) {
    return isRef(target)
        ? target.current
        : target
}



