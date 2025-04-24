// Local Imports
import { forwardRef } from "react";
import PropTypes from "prop-types";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";

// Import Dependencies
import { usePaginationContext } from "./Pagination.context";
import { PaginationControl } from "./PaginationControl";

// ----------------------------------------------------------------------

function createEdgeComponent({ icon, type, action }) {
  const Component = forwardRef(({ Icon = icon, ...props }, ref) => {
    const ctx = usePaginationContext();
    const disabled =
      type === "next" ? ctx.active === ctx.total : ctx.active === 1;

    return (
      <PaginationControl
        disabled={ctx.disabled || disabled}
        ref={ref}
        onClick={ctx[action]}
        className={clsx("pagination-control-icon", ctx.classNames?.controlIcon)}
        {...props}
      >
        <Icon
          className={clsx("pagination-icon rtl:rotate-180", ctx.classNames?.icon)}
        />
      </PaginationControl>
    );
  });

  Component.displayName = "Pagination" + type;

  Component.propTypes = {
    Icon: PropTypes.elementType,
  };

  return Component;
}

export const PaginationNext = createEdgeComponent({
  icon: ChevronRightIcon,
  type: "next",
  action: "onNext",
});

export const PaginationPrevious = createEdgeComponent({
  icon: ChevronLeftIcon,
  type: "previous",
  action: "onPrevious",
});

export const PaginationFirst = createEdgeComponent({
  icon: ChevronDoubleLeftIcon,
  type: "previous",
  action: "onFirst",
});

export const PaginationLast = createEdgeComponent({
  icon: ChevronDoubleRightIcon,
  type: "next",
  action: "onLast",
});
