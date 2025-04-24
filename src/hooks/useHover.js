import { useState, useRef } from "react"
import { useEventListener } from "./useEventListener"

export function useHover() {
    const [value, setValue] = useState(false)
    const ref = useRef(null);

    const handleMouseEnter = () => setValue(true)
    const handleMouseLeave = () => setValue(false)

    useEventListener('mouseenter', handleMouseEnter, ref)
    useEventListener('mouseleave', handleMouseLeave, ref)

    return [ref, value]
}

