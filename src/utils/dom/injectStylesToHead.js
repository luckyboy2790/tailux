const head = document.head || document.getElementsByTagName('head')[0];

export function insertStylesToHead(tag) {
    head.appendChild(tag);
}

export function removeStylesFromHead(tag) {
    head.removeChild(tag);
}

export function injectStyles(tag, css) {
    if (tag.styleSheet) {
        tag.styleSheet.cssText = css;
    } else {
        tag.appendChild(document.createTextNode(css));
    }
}

export function makeStyleTag() {
    const tag = document.createElement('style');
    tag.type = 'text/css';
    return tag;
}
