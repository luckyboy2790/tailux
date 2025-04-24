// Import Dependencies
import { useCallback } from 'react';

// Local Imports
import { assignRef } from 'utils/dom/assignRef';

// ----------------------------------------------------------------------

function mergeRefs(...refs) {
    return (node) => {
        refs.forEach((ref) => assignRef(ref, node));
    };
}

function useMergedRef(...refs) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(mergeRefs(...refs), refs);
}

export { assignRef, mergeRefs, useMergedRef }
