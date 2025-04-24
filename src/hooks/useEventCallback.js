import { useCallback, useRef } from 'react'

import { useIsomorphicEffect } from './useIsomorphicEffect'

export function useEventCallback(
    fn,
) {
    const ref = useRef(() => {
        throw new Error('Cannot call an event handler while rendering.')
    })

    useIsomorphicEffect(() => {
        ref.current = fn
    }, [fn])

    return useCallback((...args) => ref.current?.(...args), [ref])
}
