// Import Dependencies
import { forwardRef } from "react";
import PropTypes from "prop-types";

// Local Imports
import { Box } from "components/ui";

import { AccordionItemContextProvider } from "./AccordionItem.context";
import { useAccordionContext } from "./Accordion.context";

const AccordionItem = forwardRef((props, ref) => {
  const { children, className, value, ...rest } = props;
  const ctx = useAccordionContext();
  const isActive = ctx.isItemActive(value);

  return (
    <AccordionItemContextProvider value={{ value }}>
      <Box
        ref={ref}
        data-state={isActive ? "open" : null}
        className={
          typeof className === "function"
            ? className({ open: isActive })
            : className
        }
        {...rest}
      >
        {typeof children === "function"
          ? children({ open: isActive })
          : children}
      </Box>
    </AccordionItemContextProvider>
  );
});

AccordionItem.displayName = "AccordionItem";

AccordionItem.propTypes = {
  children: PropTypes.any,
  className: PropTypes.any,
  value: PropTypes.string,
};

export { AccordionItem };
