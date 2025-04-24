// Import Dependencies
import { useCallback, useEffect, useRef } from "react";

// Local Imports
import { getScrollbarWidth } from "utils/dom/getScrollbarWidth";
import {
    injectStyles,
    insertStylesToHead,
    makeStyleTag,
    removeStylesFromHead,
} from "utils/dom/injectStylesToHead";

// ----------------------------------------------------------------------

export function useLockScrollbar(
    lock,
    options = {
        disableBodyPadding: false,
    }
) {
    const scrollTop = useRef(0);

    const { disableBodyPadding } = options;

    const stylesheet = useRef(null);

    const lockScroll = useCallback(() => {
        scrollTop.current = window.scrollY;

        const styles = getLockStyles({ disableBodyPadding });

        const sheet = makeStyleTag();

        injectStyles(sheet, styles);
        insertStylesToHead(sheet);

        stylesheet.current = sheet;
    }, [disableBodyPadding]);

    const unlockScroll = useCallback(() => {
        if (!stylesheet?.current) return;
        removeStylesFromHead(stylesheet.current)
        stylesheet.current = null;
    }, []);

    useEffect(() => {
        if (lock !== undefined) {
            lock ? lockScroll() : unlockScroll()
        }

        return unlockScroll;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [lock]);

    return [lockScroll, unlockScroll];
}


export const getLockStyles = ({ disableBodyPadding }) => {
    const scrollWidth = disableBodyPadding ? null : getScrollbarWidth();

    const styles = `body {
        --scrollbar-width: ${scrollWidth}px;
        touch-action: none;
        overflow: hidden !important;
        position: relative !important;
        ${scrollWidth ? 'padding-right: var(--scrollbar-width) !important;' : ''}
        `;

    return styles;
};
