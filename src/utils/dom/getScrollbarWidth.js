import { isServer } from "utils/isServer";

export function getScrollbarWidth() {
    if (isServer) return 0;

    const paddingRight = parseInt(window.getComputedStyle(document.body).paddingRight, 10);
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    return paddingRight + scrollbarWidth;
}
