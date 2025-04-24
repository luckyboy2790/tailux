// Import Dependencies
import PropTypes from "prop-types";
import { forwardRef } from "react";
import clsx from "clsx";

// ----------------------------------------------------------------------

function createTableTagComponent({
  className: defaultClassName,
  component: defaultComponent,
}) {
  const Component = forwardRef((props, ref) => {
    const { component, className, children, ...rest } = props;

    const Component = component || defaultComponent;

    return (
      <Component
        className={clsx(defaultClassName, className)}
        ref={ref}
        {...rest}
      >
        {children}
      </Component>
    );
  });

  Component.displayName = defaultComponent;

  Component.propTypes = {
    component: PropTypes.elementType,
    className: PropTypes.string,
    children: PropTypes.node,
  };

  return Component;
}

export const TBody = createTableTagComponent({
  className: "table-tbody group/tbody",
  component: "tbody",
});

export const THead = createTableTagComponent({
  className: "table-thead group/thead",
  component: "thead",
});

export const TFoot = createTableTagComponent({
  className: "table-tfoot group/tfoot",
  component: "tfoot",
});

export const Tr = createTableTagComponent({
  className: "table-tr group/tr",
  component: "tr",
});

export const Th = createTableTagComponent({
  className: "table-th group/th",
  component: "th",
});

export const Td = createTableTagComponent({
  className: "table-td group/td",
  component: "td",
});
