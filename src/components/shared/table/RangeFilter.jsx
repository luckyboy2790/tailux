// Import Dependencies
import { useEffect, useRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

// Local Imports
import { Button, Input } from "components/ui";
import { ResponsiveFilter } from "./ResponsiveFilter";

// ----------------------------------------------------------------------

export function RangeFilter({
  column,
  title,
  Icon,
  MinPrefixIcon,
  MaxPrefixIcon,
  buttonText,
}) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => column?.setFilterValue(undefined), []);

  const selectedValues = column?.getFilterValue() || [];

  return (
    <ResponsiveFilter
      buttonContent={
        <>
          {Icon && <Icon className="size-4" />}

          <span> {title}</span>

          {selectedValues && selectedValues.length > 0 && (
            <>
              <div className="h-full w-px bg-gray-300 dark:bg-dark-450" />
              <span>
                {buttonText({
                  min: selectedValues?.[0],
                  max: selectedValues?.[1],
                })}
              </span>
            </>
          )}
        </>
      }
    >
      <FilterContent {...{ column, title, MinPrefixIcon, MaxPrefixIcon }} />
    </ResponsiveFilter>
  );
}

function FilterContent({ column, title, MinPrefixIcon, MaxPrefixIcon }) {
  const selectedValues = column?.getFilterValue();
  const [min, max] = column.getFacetedMinMaxValues();
  const minInputRef = useRef();

  useEffect(() => minInputRef.current.focus(), []);

  return (
    <div className="sm:w-72">
      <div className="flex items-center justify-between bg-gray-150 px-2.5 py-2 dark:bg-dark-900">
        <p className="truncate py-1 text-start font-medium text-gray-800 dark:text-dark-50">
          {title}
        </p>
        {selectedValues && (
          <Button
            onClick={() => column?.setFilterValue(undefined)}
            className="h-7 px-3 text-xs"
          >
            Clear
          </Button>
        )}
      </div>

      <div className="flex gap-2 p-3">
        <Input
          type="number"
          ref={minInputRef}
          value={selectedValues?.[0] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old) => [e.target.value, old?.[1]])
          }
          label="Min"
          placeholder={min}
          className={clsx(MinPrefixIcon && "ltr:pl-8! rtl:pr-8!")}
          prefix={
            MinPrefixIcon && <MinPrefixIcon className="stroke-1.5 size-4.5" />
          }
        />
        <Input
          type="number"
          value={selectedValues?.[1] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old) => [old?.[0], e.target.value])
          }
          placeholder={max}
          label="Max"
          className={clsx(MaxPrefixIcon && "ltr:pl-8! rtl:pr-8!")}
          prefix={
            MaxPrefixIcon && <MaxPrefixIcon className="stroke-1.5 size-4.5" />
          }
        />
      </div>
    </div>
  );
}

RangeFilter.propTypes = {
  column: PropTypes.object,
  title: PropTypes.string,
  Icon: PropTypes.elementType,
  MinPrefixIcon: PropTypes.elementType,
  MaxPrefixIcon: PropTypes.elementType,
  buttonText: PropTypes.func,
};

FilterContent.propTypes = {
  column: PropTypes.object,
  title: PropTypes.string,
  Icon: PropTypes.elementType,
  MinPrefixIcon: PropTypes.elementType,
  MaxPrefixIcon: PropTypes.elementType,
};
