// Import Dependencies
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

// Local Imports
import { breakpoints } from "configs/breakpoints.config";
import { isServer } from "utils/isServer";
import { BreakpointsContext } from "./context";

// ----------------------------------------------------------------------

const initialState = { ...getBreakpoint() };

export function BreakpointProvider({ children }) {
  const [breakpointState, setBreakpointState] = useState(initialState);
  const resizeObserverRef = useRef(null);

  useEffect(() => {
    // Function to update breakpoint based on current width
    const updateBreakpoint = () => {
      const current = getBreakpoint();
      if (current.name !== breakpointState.name) {
        setBreakpointState({ ...current });
      }
    };

    if (!isServer) {
      // Initialize ResizeObserver on the document's root element
      resizeObserverRef.current = new ResizeObserver(updateBreakpoint);
      resizeObserverRef.current.observe(document.documentElement);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [breakpointState.name]);

  if (!children) {
    return null;
  }

  return (
    <BreakpointsContext value={breakpointState}>{children}</BreakpointsContext>
  );
}

function getBreakpoint() {
  if (isServer) {
    return {
      name: "",
      isXs: false,
      isSm: false,
      isMd: false,
      isLg: false,
      isXl: false,
      is2xl: false,
      smAndDown: false,
      smAndUp: false,
      mdAndDown: false,
      mdAndUp: false,
      lgAndDown: false,
      lgAndUp: false,
      xlAndDown: false,
      xlAndUp: false,
      ...breakpoints,
    };
  }

  const width = window.innerWidth;

  let name = "";

  const xs = width < breakpoints.SM;
  const sm = width < breakpoints.MD && !xs;
  const md = width < breakpoints.LG && !(sm || xs);
  const lg = width < breakpoints.XL && !(md || sm || xs);
  const xl = width < breakpoints["2XL"] && !(lg || md || sm || xs);
  const the2xl = width >= breakpoints["2XL"];

  if (xs) name = "xs";
  if (sm) name = "sm";
  if (md) name = "md";
  if (lg) name = "lg";
  if (xl) name = "xl";
  if (the2xl) name = "2xl";

  return {
    name,

    isXs: xs,
    isSm: sm,
    isMd: md,
    isLg: lg,
    isXl: xl,
    is2xl: the2xl,

    smAndDown: (xs || sm) && !(md || lg || xl || the2xl),
    smAndUp: !xs && (sm || md || lg || xl || the2xl),
    mdAndDown: (xs || sm || md) && !(lg || xl || the2xl),
    mdAndUp: !(xs || sm) && (md || lg || xl || the2xl),
    lgAndDown: (xs || sm || md || lg) && !(xl || the2xl),
    lgAndUp: !(xs || sm || md) && (lg || xl || the2xl),
    xlAndDown: (xs || sm || md || lg || xl) && !the2xl,
    xlAndUp: !(xs || sm || md || lg) && (xl || the2xl),

    ...breakpoints,
  };
}

BreakpointProvider.propTypes = {
  children: PropTypes.node,
};
