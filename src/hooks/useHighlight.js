import { useMemo } from "react"

const escapeRegexp = (term) =>
    term.replace(/[|\\{}()[\]^$+*?.-]/g, (char) => `\\${char}`)

function buildRegex(query) {
    const _query = query
        .filter((text) => text.trim().length !== 0)
        .map((text) => escapeRegexp(text.trim()))
    if (!_query.length) {
        return null
    }

    return new RegExp(`(${_query.join("|")})`, "ig")
}

export function highlightWords({ text, query }) {
    const regex = buildRegex(Array.isArray(query) ? query : [query])
    if (!regex) {
        return [{ text, match: false }]
    }
    const result = text.split(regex).filter(Boolean)
    return result.map((str) => ({ text: str, match: regex.test(str) }))
}

export function useHighlight(props) {
    const { text, query } = props
    return useMemo(() => highlightWords({ text, query }), [text, query])
}
