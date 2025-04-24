// Import Dependencies
import { useState } from 'react'

// Local Imports
import { isServer } from 'utils/isServer'
import { useIsomorphicEffect } from './useIsomorphicEffect'

// ----------------------------------------------------------------------

export function useMediaQuery(
    query,
    {
        defaultValue = false,
        initializeWithValue = true,
    } = {},
) {
    const getMatches = (query) => {
        if (isServer) {
            return defaultValue
        }
        return window.matchMedia(query).matches
    }

    const [matches, setMatches] = useState(() => {
        if (initializeWithValue) {
            return getMatches(query)
        }
        return defaultValue
    })

    // Handles the change event of the media query.
    function handleChange() {
        setMatches(getMatches(query))
    }

    useIsomorphicEffect(() => {
        const matchMedia = window.matchMedia(query)

        // Triggered at the first client-side load and if query changes
        handleChange()

        // Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
        if (matchMedia.addListener) {
            matchMedia.addListener(handleChange)
        } else {
            matchMedia.addEventListener('change', handleChange)
        }

        return () => {
            if (matchMedia.removeListener) {
                matchMedia.removeListener(handleChange)
            } else {
                matchMedia.removeEventListener('change', handleChange)
            }
        }
    }, [query])

    return matches
}
