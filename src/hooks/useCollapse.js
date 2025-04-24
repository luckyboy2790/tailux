// Import Dependencies
import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';

// Local Imports
import { mergeRefs, useDidUpdate } from 'hooks';

// ----------------------------------------------------------------------

function getAutoHeightDuration(height) {
    if (!height || typeof height === 'string') {
        return 0;
    }
    const constant = height / 36;
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}

export function getElementHeight(el) {
    return el?.current ? el.current.scrollHeight : 'auto';
}

const raf = typeof window !== 'undefined' && window.requestAnimationFrame;

export function useCollapse({
    transitionDuration,
    transitionTimingFunction = "cubic-bezier(0.4, 0.0, 0.2, 1)",
    onTransitionEnd = () => { },
    opened,
    min = '0px'
}) {
    const el = useRef(null);
    const collapsedHeight = min;
    const collapsedStyles = {
        display: min === "0px" ? 'none' : null,
        height: collapsedHeight,
        overflow: 'hidden',
    };
    const [styles, setStylesRaw] = useState(opened ? {} : collapsedStyles);

    const setStyles = (newStyles) => {
        flushSync(() => setStylesRaw(newStyles));
    };

    const mergeStyles = (newStyles) => {
        setStyles((oldStyles) => ({ ...oldStyles, ...newStyles }));
    };

    function getTransitionStyles(height) {
        const _duration = transitionDuration || Math.min(getAutoHeightDuration(height), 500);
        return {
            transition: `height ${_duration}ms ${transitionTimingFunction}`,
        };
    }

    useDidUpdate(() => {
        if (opened) {
            raf(() => {
                mergeStyles({ willChange: 'height', display: 'block', overflow: 'hidden' });
                raf(() => {
                    const height = getElementHeight(el);
                    mergeStyles({ ...getTransitionStyles(height), height });
                });
            });
        } else {
            raf(() => {
                const height = getElementHeight(el);
                mergeStyles({ ...getTransitionStyles(height), willChange: 'height', height });
                raf(() => mergeStyles({ height: collapsedHeight, overflow: 'hidden' }));
            });
        }
    }, [opened]);

    const handleTransitionEnd = (e) => {
        if (e.target !== el.current || e.propertyName !== 'height') {
            return;
        }

        if (opened) {
            const height = getElementHeight(el);

            if (height === styles.height) {
                setStyles({});
            } else {
                mergeStyles({ height });
            }

            onTransitionEnd();
        } else if (styles.height === collapsedHeight) {
            setStyles(collapsedStyles);
            onTransitionEnd();
        }
    };

    function getCollapseProps({ style = {}, refKey = 'ref', ...rest } = {}) {
        const theirRef = rest[refKey];
        return {
            'aria-hidden': !opened,
            ...rest,
            [refKey]: mergeRefs(el, theirRef),
            onTransitionEnd: handleTransitionEnd,
            style: { boxSizing: 'border-box', ...style, ...styles },
        };
    }

    return getCollapseProps;
}
