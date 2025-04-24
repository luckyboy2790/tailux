function getPreviousIndex(current, elements, loop) {
    for (let i = current - 1; i >= 0; i -= 1) {
        if (!elements[i].disabled) {
            return i;
        }
    }

    if (loop) {
        for (let i = elements.length - 1; i > -1; i -= 1) {
            if (!elements[i].disabled) {
                return i;
            }
        }
    }

    return current;
}

function getNextIndex(current, elements, loop) {
    for (let i = current + 1; i < elements.length; i += 1) {
        if (!elements[i].disabled) {
            return i;
        }
    }

    if (loop) {
        for (let i = 0; i < elements.length; i += 1) {
            if (!elements[i].disabled) {
                return i;
            }
        }
    }

    return current;
}

function findElementAncestor(element, selector) {
    let _element = element;
    while ((_element = _element.parentElement) && !_element.matches(selector));
    return _element;
}

/** Validates that target element is on the same level as sibling, used to filter out children that have the same sibling selector */
function onSameLevel(
    target,
    sibling,
    parentSelector
) {
    return (
        findElementAncestor(target, parentSelector) === findElementAncestor(sibling, parentSelector)
    );
}

/**
 * Creates a scoped keydown handler for navigating or interacting with elements
 * within a specified parent container based on keyboard input.
 *
 * @param {Object} options - Configuration options for the keydown handler.
 * @param {string} options.parentSelector - The CSS selector for the parent container.
 * @param {string} options.siblingSelector - The CSS selector for sibling elements to navigate between.
 * @param {function} options.onKeyDown - A callback function that will be called for every keydown event.
 * @param {boolean} [options.loop=true] - Whether navigation should loop around when reaching the first or last element.
 * @param {boolean} [options.activateOnFocus=false] - Whether to activate elements (e.g., simulate a click) when they are focused.
 * @param {string} [options.dir=document.documentElement.dir] - The text direction ('ltr' or 'rtl') to determine navigation behavior.
 * @param {string} [options.orientation] - The navigation orientation ('horizontal', 'vertical').
 * 
 * @returns {function(KeyboardEvent): void} A keydown event handler function.
 */
export function createScopedKeydownHandler({
    parentSelector,
    siblingSelector,
    onKeyDown,
    loop = true,
    activateOnFocus = false,
    dir = document.documentElement.dir,
    orientation,
}) {
    return (event) => {
        onKeyDown?.(event);

        const elements = Array.from(
            findElementAncestor(event.currentTarget, parentSelector)?.querySelectorAll(
                siblingSelector
            ) || []
        ).filter((node) => onSameLevel(event.currentTarget, node, parentSelector));

        const current = elements.findIndex((el) => event.currentTarget === el);
        const _nextIndex = getNextIndex(current, elements, loop);
        const _previousIndex = getPreviousIndex(current, elements, loop);
        const nextIndex = dir === 'rtl' ? _previousIndex : _nextIndex;
        const previousIndex = dir === 'rtl' ? _nextIndex : _previousIndex;

        switch (event.key) {
            case 'ArrowRight': {
                if (orientation === 'horizontal') {
                    event.stopPropagation();
                    event.preventDefault();
                    elements[nextIndex].focus();
                    activateOnFocus && elements[nextIndex].click();
                }
                break;
            }

            case 'ArrowLeft': {
                if (orientation === 'horizontal') {
                    event.stopPropagation();
                    event.preventDefault();
                    elements[previousIndex].focus();
                    activateOnFocus && elements[previousIndex].click();
                }
                break;
            }

            case 'ArrowUp': {
                if (orientation === 'vertical') {
                    event.stopPropagation();
                    event.preventDefault();
                    elements[_previousIndex].focus();
                    activateOnFocus && elements[_previousIndex].click();
                }
                break;
            }

            case 'ArrowDown': {
                if (orientation === 'vertical') {
                    event.stopPropagation();
                    event.preventDefault();
                    elements[_nextIndex].focus();
                    activateOnFocus && elements[_nextIndex].click();
                }

                break;
            }

            case 'Home': {
                event.stopPropagation();
                event.preventDefault();
                !elements[0].disabled && elements[0].focus();
                break;
            }

            case 'End': {
                event.stopPropagation();
                event.preventDefault();
                const last = elements.length - 1;
                !elements[last].disabled && elements[last].focus();
                break;
            }
        }
    };
}
