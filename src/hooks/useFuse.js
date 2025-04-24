import Fuse from 'fuse.js';
import { useMemo, useState, useDeferredValue } from 'react';

export function useFuse(list, options) {
    // defining our query state in there directly
    const [query, setQuery] = useState('');
    const defferedQuery = useDeferredValue(query)

    // removing custom options from Fuse options object
    // NOTE: `limit` is actually a `fuse.search` option, but we merge all options for convenience
    const { limit, matchAllOnEmptyQuery, ...fuseOptions } = options;

    // let's memoize the fuse instance for performances
    const fuse = useMemo(
        () => new Fuse(list, fuseOptions),
        [list, fuseOptions]
    );

    // memoize results whenever the query or options change
    const result = useMemo(
        // if query is empty and `matchAllOnEmptyQuery` is `true` then return all list
        // NOTE: we remap the results to match the return structure of `fuse.search()`
        () => !defferedQuery && matchAllOnEmptyQuery
            ? fuse.getIndex().docs.slice(0, limit).map((item, refIndex) => ({ item, refIndex }))
            : fuse.search(defferedQuery.toString().trim(), { limit }),
        [fuse, limit, matchAllOnEmptyQuery, defferedQuery]
    );

    const loading = defferedQuery !== query

    return {
        result,
        query: defferedQuery,
        loading,
        setQuery,
    };
}
