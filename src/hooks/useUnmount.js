// Import Dependencies
import { useEffect, useRef } from 'react'

// ----------------------------------------------------------------------

export function useUnmount(func) {
    const funcRef = useRef(func)

    funcRef.current = func

    useEffect(
        () => () => {
            funcRef.current()
        },
        [],
    )
}
