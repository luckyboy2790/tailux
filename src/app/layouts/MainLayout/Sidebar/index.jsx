// Import Dependencies
import { useMemo, useState } from "react";
import { useLocation } from "react-router";

// Local Imports
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { useSidebarContext } from "app/contexts/sidebar/context";
import { useNavigation } from "app/navigation";
import { useDidUpdate } from "hooks";
import { isRouteActive } from "utils/isRouteActive";
import { MainPanel } from "./MainPanel";
import { PrimePanel } from "./PrimePanel";

// ----------------------------------------------------------------------

export function Sidebar() {
  const { pathname } = useLocation();
  const { name, lgAndDown } = useBreakpointsContext();
  const { isExpanded, close } = useSidebarContext();

  const navigation = useNavigation();

  const initialSegment = useMemo(
    () => navigation.find((item) => isRouteActive(item.path, pathname)),
    [navigation, pathname],
  );

  const [activeSegmentPath, setActiveSegmentPath] = useState(
    initialSegment?.path,
  );

  const currentSegment = useMemo(() => {
    return navigation.find((item) => item.path === activeSegmentPath);
  }, [activeSegmentPath, navigation]);

  useDidUpdate(() => {
    const activePath = navigation.find((item) =>
      isRouteActive(item.path, pathname),
    )?.path;

    if (!isRouteActive(activeSegmentPath, pathname)) {
      setActiveSegmentPath(activePath);
    }
  }, [pathname]);

  useDidUpdate(() => {
    if (lgAndDown && isExpanded) close();
  }, [name]);

  return (
    <div className="dark">
      <MainPanel
        nav={navigation}
        activeSegment={activeSegmentPath}
        setActiveSegment={setActiveSegmentPath}
      />
      <PrimePanel
        close={close}
        currentSegment={currentSegment}
        pathname={pathname}
      />
    </div>
  );
}
