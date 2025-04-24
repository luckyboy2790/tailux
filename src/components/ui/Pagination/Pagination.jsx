// Import Dependencies
import PropTypes from "prop-types";
import clsx from "clsx";

// Local Imports
import { PaginationProvider } from "./Pagination.context";
import { usePagination } from "./usePagination";

// ----------------------------------------------------------------------

function createEventHandler(parentEventHandler, eventHandler) {
  return (event) => {
    parentEventHandler?.(event);
    eventHandler?.(event);
  };
}

export function Pagination(props) {
  const {
    total,
    value,
    defaultValue,
    onChange,
    disabled,
    getItemProps,
    className,
    classNames = {},
    siblings = 1,
    boundaries = 1,
    children,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
  } = props;

  const { range, setPage, next, previous, active, first, last } = usePagination(
    {
      page: value,
      initialPage: defaultValue,
      onChange,
      total,
      siblings,
      boundaries,
    },
  );

  const handleNextPage = createEventHandler(onNextPage, next);
  const handlePreviousPage = createEventHandler(onPreviousPage, previous);
  const handleFirstPage = createEventHandler(onFirstPage, first);
  const handleLastPage = createEventHandler(onLastPage, last);

  if (total <= 0) {
    return null;
  }

  return (
    <PaginationProvider
      value={{
        total,
        range,
        active,
        disabled,
        classNames,
        onChange: setPage,
        onNext: handleNextPage,
        onPrevious: handlePreviousPage,
        onFirst: handleFirstPage,
        onLast: handleLastPage,
        getItemProps,
      }}
    >
      <div
        className={clsx(
          "pagination hide-scrollbar max-w-full overflow-x-auto",
          className,
          classNames?.root,
        )}
      >
        {children}
      </div>
    </PaginationProvider>
  );
}

Pagination.propTypes = {
  total: PropTypes.number,
  value: PropTypes.number,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  getItemProps: PropTypes.func,
  className: PropTypes.string,
  classNames: PropTypes.object,
  siblings: PropTypes.number,
  boundaries: PropTypes.number,
  children: PropTypes.node,
  onNextPage: PropTypes.func,
  onPreviousPage: PropTypes.func,
  onFirstPage: PropTypes.func,
  onLastPage: PropTypes.func,
};
