// Import Dependencies
import { forwardRef } from "react";
import PropTypes from "prop-types";

// Local Imports
import { useCollapse } from "hooks";
import { Box } from "components/ui";

// ----------------------------------------------------------------------

const Collapse = forwardRef((props, ref) => {
  const {
    children,
    in: opened,
    transitionDuration,
    transitionTimingFunction,
    min,
    style,
    onTransitionEnd,
    ...rest
  } = props;
  
  const getCollapseProps = useCollapse({
    opened,
    transitionDuration,
    transitionTimingFunction,
    min,
    onTransitionEnd,
  });

  if (transitionDuration === 0) {
    return opened ? <Box {...rest}>{children}</Box> : null;
  }

  return <Box {...getCollapseProps({ style, ref, ...rest })}>{children}</Box>;
});

Collapse.displayName = "Collapse";

Collapse.propTypes = {
  children: PropTypes.node,
  in: PropTypes.bool,
  transitionDuration: PropTypes.number,
  transitionTimingFunction: PropTypes.string,
  style: PropTypes.object,
  onTransitionEnd: PropTypes.func,
  min: PropTypes.string,
};

export { Collapse };
