// Import Dependencies
import { Outlet } from "react-router";
import { useState } from "react";

// Local Imports
import { useSidebarContext } from "app/contexts/sidebar/context";
import { useThemeContext } from "app/contexts/theme/context";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { useIsomorphicEffect } from "hooks";

// ----------------------------------------------------------------------

const dataset = document?.body?.dataset;

export function AppLayout() {
  const { themeLayout } = useThemeContext();
  const { close, open } = useSidebarContext();
  const { lgAndDown, xlAndUp } = useBreakpointsContext();
  const [isMounted, setIsMounted] = useState(false);

  useIsomorphicEffect(() => {
    if (xlAndUp) open();
    return () => {
      if (lgAndDown) close();
    };
  }, [close, lgAndDown, open, xlAndUp]);

  useIsomorphicEffect(() => {
    dataset.layout = "main-layout";

    // Fix flicker layout
    queueMicrotask(() => {
      dataset.layout = "main-layout";
    });

    return () => {
      if (dataset) {
        dataset.layout = themeLayout;
      }
    };
  }, [themeLayout]);

  useIsomorphicEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <Outlet />;
}
