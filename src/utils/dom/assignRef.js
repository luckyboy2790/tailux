export function assignRef(ref, value) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (typeof ref === 'object' && ref !== null && 'current' in ref) {
        ref.current = value;
    }
}
