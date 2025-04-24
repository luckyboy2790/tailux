import debounce from "lodash/debounce";
import { useCallback, useEffect, useRef, useState } from "react";

export function useDataScrollOverflow(props = {}) {
    const { isEnabled = true, overflowCheck = "vertical", offset = 0 } = props;

    const [recalcState, setRecalcState] = useState({});

    const recalculate = useCallback(() => setRecalcState({}), []);

    const ref = useRef();

    useEffect(() => {

        const el = ref?.current;

        const checkOverflow = () => {
            if (!el) return;

            // Vertical overflow
            if (overflowCheck === "vertical" || overflowCheck === "both") {
                const hasElementsAbove = el.scrollTop > offset;
                const hasElementsBelow = el.scrollTop + el.clientHeight + offset < el.scrollHeight;

                if (hasElementsAbove && hasElementsBelow) {
                    el.dataset.topBottomScroll = "true";
                    el.removeAttribute("data-top-scroll");
                    el.removeAttribute("data-bottom-scroll");
                } else {
                    el.dataset.topScroll = hasElementsAbove.toString();
                    el.dataset.bottomScroll = hasElementsBelow.toString();
                    el.removeAttribute("data-top-bottom-scroll");
                }
            }

            // Horizontal overflow
            if (overflowCheck === "horizontal" || overflowCheck === "both") {
                const hasElementsLeft = el.scrollLeft > offset;
                const hasElementsRight = el.scrollLeft + el.clientWidth + offset < el.scrollWidth;

                if (hasElementsLeft && hasElementsRight) {
                    el.dataset.leftRightScroll = "true";
                    el.removeAttribute("data-left-scroll");
                    el.removeAttribute("data-right-scroll");
                } else {
                    el.dataset.leftScroll = hasElementsLeft.toString();
                    el.dataset.rightScroll = hasElementsRight.toString();
                    el.removeAttribute("data-left-right-scroll");
                }
            }
        };

        const clearOverflow = () => {
            if (!el) return;

            el.removeAttribute("data-top-scroll");
            el.removeAttribute("data-bottom-scroll");
            el.removeAttribute("data-top-bottom-scroll");

            el.removeAttribute("data-left-scroll");
            el.removeAttribute("data-right-scroll");
            el.removeAttribute("data-left-right-scroll");
        };

        const debouncedCheckOverflow = debounce(checkOverflow, 100)

        const observer = new ResizeObserver(debouncedCheckOverflow);

        if (isEnabled) {
            // first check
            checkOverflow();

            if (el) {
                observer.observe(el);
                el.addEventListener("scroll", checkOverflow);
            }
        } else {
            clearOverflow();
        }

        return () => {
            // Cleanup listener when component unmounts
            el?.removeEventListener("scroll", checkOverflow);
            observer.disconnect();
            clearOverflow();
        };
    }, [isEnabled, overflowCheck, offset, ref, recalcState]);

    return { ref, recalculate }
}
