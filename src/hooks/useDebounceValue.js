import { useRef, useState } from 'react'

import { useDebounceCallback } from './useDebounceCallback'

export function useDebounceValue(
    initialValue,
    delay,
    options,
) {
    const eq = options?.equalityFn ?? ((left, right) => left === right)
    const unwrappedInitialValue =
        initialValue instanceof Function ? initialValue() : initialValue
    const [debouncedValue, setDebouncedValue] = useState(unwrappedInitialValue)
    const previousValueRef = useRef(unwrappedInitialValue)

    const updateDebouncedValue = useDebounceCallback(
        setDebouncedValue,
        delay,
        options,
    )

    // Update the debounced value if the initial value changes
    if (!eq(previousValueRef.current, unwrappedInitialValue)) {
        updateDebouncedValue(unwrappedInitialValue)
        previousValueRef.current = unwrappedInitialValue
    }

    return [debouncedValue, updateDebouncedValue]
}