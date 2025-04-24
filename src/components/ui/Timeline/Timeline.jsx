// Import Dependencies
import PropTypes from "prop-types";
import clsx from "clsx";

// Local Imports
import { TimelineContext } from "./context";

// ----------------------------------------------------------------------

const Timeline = (props) => {
  const {
    className,
    pointSize = "0.75rem",
    lineWidth = "1px",
    variant = "filled",
    lineSpace,
    style,
    children,
  } = props;

  return (
    <TimelineContext value={{ variant }}>
      <div
        className={clsx(
          "timeline flex flex-col",
          lineSpace && "line-space",
          className,
        )}
        style={{
          "--timeline-point-size": pointSize,
          "--timeline-line-width": lineWidth,
          "--timeline-line-space": lineSpace,
          ...style,
        }}
      >
        {children}
      </div>
    </TimelineContext>
  );
};

Timeline.displayName = "Timeline";

Timeline.propTypes = {
  className: PropTypes.string,
  pointSize: PropTypes.string,
  lineWidth: PropTypes.string,
  style: PropTypes.object,
  lineSpace: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(["filled", "outlined"]),
};

export { Timeline };
