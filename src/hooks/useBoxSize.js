import { useEffect, useRef, useState } from 'react'
import { useIsMounted } from 'hooks'

const initialSize = {
    width: undefined,
    height: undefined,
}

export function useBoxSize(
    options,
) {
    const { ref, box = 'content-box' } = options
    const [{ width, height }, setSize] = useState(initialSize)
    const isMounted = useIsMounted()
    const previousSize = useRef({ ...initialSize })
    const onResize = useRef(undefined)
    onResize.current = options.onResize

    useEffect(() => {
        if (!ref.current) return

        if (typeof window === 'undefined' || !('ResizeObserver' in window)) return

        const observer = new ResizeObserver(([entry]) => {
            const boxProp =
                box === 'border-box'
                    ? 'borderBoxSize'
                    : box === 'device-pixel-content-box'
                        ? 'devicePixelContentBoxSize'
                        : 'contentBoxSize'

            const newWidth = extractSize(entry, boxProp, 'inlineSize')
            const newHeight = extractSize(entry, boxProp, 'blockSize')

            const hasChanged =
                previousSize.current.width !== newWidth ||
                previousSize.current.height !== newHeight

            if (hasChanged) {
                const newSize = { width: newWidth, height: newHeight }
                previousSize.current.width = newWidth
                previousSize.current.height = newHeight

                if (onResize.current) {
                    onResize.current(newSize)
                } else {
                    if (isMounted()) {
                        setSize(newSize)
                    }
                }
            }
        })

        observer.observe(ref.current, { box })

        return () => {
            observer.disconnect()
        }
    }, [box, ref, isMounted])

    return { width, height }
}

function extractSize(
    entry,
    box,
    sizeType,
) {
    if (!entry[box]) {
        if (box === 'contentBoxSize') {
            return entry.contentRect[sizeType === 'inlineSize' ? 'width' : 'height']
        }
        return undefined
    }

    return Array.isArray(entry[box])
        ? entry[box][0][sizeType]
        : (entry[box][sizeType])
}