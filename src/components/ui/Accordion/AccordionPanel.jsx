// Import Dependencies
import PropTypes from "prop-types";
import { forwardRef } from "react";

// Local Imports
import { Collapse } from "components/ui";

import { useAccordionContext } from "./Accordion.context";
import { useAccordionItemContext } from "./AccordionItem.context";

// ----------------------------------------------------------------------

const AccordionPanel = forwardRef((props, ref) => {
  const { children, className, collapseProps, ...rest } = props;
  const ctx = useAccordionContext();
  const { value } = useAccordionItemContext();

  const isActive = ctx.isItemActive(value);

  return (
    <Collapse
      {...collapseProps}
      ref={ref}
      in={ctx.isItemActive(value)}
      transitionDuration={ctx.transitionDuration}
      role="panel"
      id={`${ctx.panelId}-${value}`}
      aria-labelledby={`${ctx.buttonId}-${value}`}
    >
      <div
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
      </div>
    </Collapse>
  );
});

AccordionPanel.displayName = "AccordionPanel";

AccordionPanel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  collapseProps: PropTypes.object,
};

export { AccordionPanel };
