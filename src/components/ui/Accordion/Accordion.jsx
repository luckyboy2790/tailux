// Import Dependencies
import PropTypes from "prop-types";
import { forwardRef } from "react";

// Local imports
import { Box } from "components/ui";
import { AccordionProvider } from "./AccordionProvider";

// ----------------------------------------------------------------------

const Accordion = forwardRef((props, ref) => {
  const {
    id,
    children,
    multiple = false,
    value,
    defaultValue,
    onChange,
    transitionDuration,
    loop,
    ...rest
  } = props;

  return (
    <AccordionProvider
      id={id}
      multiple={multiple}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      transitionDuration={transitionDuration}
      loop={loop}
    >
      <Box {...rest} data-accordion ref={ref}>
        {children}
      </Box>
    </AccordionProvider>
  );
});

Accordion.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
  multiple: PropTypes.bool,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  transitionDuration: PropTypes.number,
  loop: PropTypes.bool,
  className: PropTypes.string,
};

Accordion.displayName = "Accordion";

export { Accordion };
