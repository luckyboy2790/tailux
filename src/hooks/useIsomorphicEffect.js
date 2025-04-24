import { useLayoutEffect, useEffect } from 'react'
import { isServer } from 'utils/isServer'

const useIsomorphicEffect = isServer ? useEffect : useLayoutEffect

export { useIsomorphicEffect }
