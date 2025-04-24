import { useRef } from 'react'

import { useIsomorphicEffect, useUnmount } from 'hooks'

export function useDocumentTitle(
    title,
    options = {},
) {
    const { preserveTitleOnUnmount = true } = options
    const defaultTitle = useRef(null)

    useIsomorphicEffect(() => {
        defaultTitle.current = window.document.title
    }, [])

    useIsomorphicEffect(() => {
        window.document.title = title
    }, [title])

    useUnmount(() => {
        if (!preserveTitleOnUnmount && defaultTitle.current) {
            window.document.title = defaultTitle.current
        }
    })
}
