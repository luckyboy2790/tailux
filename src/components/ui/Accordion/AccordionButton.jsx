// Import Dependencies
import { forwardRef } from "react";
import PropTypes from "prop-types";

// Local Imports
import { createScopedKeydownHandler } from "utils/dom/createScopedKeydownHandler";

import { useAccordionContext } from "./Accordion.context";
import { useAccordionItemContext } from "./AccordionItem.context";

const AccordionButton = forwardRef((props, ref) => {
  const {
    children,
    disabled,
    onKeyDown,
    component,
    onClick,
    className,
    ...rest
  } = props;

  const Component = component || "button";
  const ctx = useAccordionContext();
  const { value } = useAccordionItemContext();

  const isActive = ctx.isItemActive(value);

  return (
    <Component
      {...rest}
      ref={ref}
      data-accordion-control
      disabled={disabled}
      className={
        typeof className === "function"
          ? className({ open: isActive })
          : className
      }
      onClick={(event) => {
        onClick?.(event);
        ctx.onChange(value);
      }}
      type="button"
      aria-expanded={isActive}
      aria-controls={`${ctx.panelId}-${value}`}
      id={`${ctx.buttonId}-${value}`}
      onKeyDown={createScopedKeydownHandler({
        siblingSelector: "[data-accordion-control]",
        parentSelector: "[data-accordion]",
        activateOnFocus: false,
        loop: ctx.loop,
        orientation: "vertical",
        onKeyDown,
      })}
    >
      {typeof children === "function" ? children({ open: isActive }) : children}
    </Component>
  );
});

AccordionButton.displayName = "AccordionButton";

AccordionButton.propTypes = {
  className: PropTypes.any,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  onKeyDown: PropTypes.func,
  component: PropTypes.elementType,
  onClick: PropTypes.func,
};

export { AccordionButton };
