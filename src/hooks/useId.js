import { useId as useReactId } from 'react';

export function useId(staticId, suffix = '') {
    const uid = `tl-${useReactId()}-${suffix}`;

    if (typeof staticId === 'string') return staticId

    return uid;
}
