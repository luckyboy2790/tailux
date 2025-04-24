import { useEffect, useMemo, useRef } from 'react'
import debounce from "lodash/debounce";

import { useUnmount } from './useUnmount'

export function useDebounceCallback(
    func,
    delay = 500,
    options,
) {
    const debouncedFunc = useRef()

    useUnmount(() => {
        if (debouncedFunc.current) {
            debouncedFunc.current.cancel()
        }
    })

    const debounced = useMemo(() => {
        const debouncedFuncInstance = debounce(func, delay, options)

        const wrappedFunc = (...args) => {
            return debouncedFuncInstance(...args)
        }

        wrappedFunc.cancel = () => {
            debouncedFuncInstance.cancel()
        }

        wrappedFunc.isPending = () => {
            return !!debouncedFunc.current
        }

        wrappedFunc.flush = () => {
            return debouncedFuncInstance.flush()
        }

        return wrappedFunc
    }, [func, delay, options])

    // Update the debounced function ref whenever func, wait, or options change
    useEffect(() => {
        debouncedFunc.current = debounce(func, delay, options)
    }, [func, delay, options])

    return debounced
}