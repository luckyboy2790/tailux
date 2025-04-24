// Import Dependencies
import { useEffect } from "react";
import { CalendarIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import dayjs from "dayjs";
import PropTypes from "prop-types";

// Local Imports
import { Button } from "components/ui";
import { useLocaleContext } from "app/contexts/locale/context";
import { DatePicker } from "../form/Datepicker";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { ResponsiveFilter } from "./ResponsiveFilter";

// ----------------------------------------------------------------------

export function DateFilter({ column, title, config }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => column?.setFilterValue(undefined), []);
  const { smAndDown } = useBreakpointsContext();
  const selectedValues = column?.getFilterValue();
  const { locale } = useLocaleContext();

  return (
    <ResponsiveFilter
      buttonContent={
        <>
          <CalendarIcon className="size-4" />
          <span> {title}</span>

          {selectedValues && (
            <>
              <div className="h-full w-px bg-gray-300 dark:bg-dark-450" />
              <span>
                {dayjs(selectedValues[0]).locale(locale).format("DD MMM YYYY")}{" "}
                -{" "}
                {dayjs(selectedValues[1]).locale(locale).format("DD MMM YYYY")}
              </span>
            </>
          )}
        </>
      }
    >
      <div
        className={clsx(
          "mx-auto flex w-full items-center justify-between",
          smAndDown
            ? "mb-2 mt-1 h-10 w-full max-w-xs border-b border-gray-200 py-3 dark:border-dark-500"
            : "bg-gray-150 px-2.5 py-2 dark:bg-dark-900",
        )}
      >
        <p className="truncate text-start text-base font-medium text-gray-800 dark:text-dark-50 sm:py-1 sm:text-sm">
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

      <div className="max-sm:mx-auto max-sm:[&_.is-calendar]:w-80 max-sm:[&_.is-calendar]:max-w-none">
        <DatePicker
          isCalendar
          value={selectedValues ?? ""}
          readOnly
          onChange={(date) => {
            if (date.length === 0) {
              column.setFilterValue([null, null]);
            }
            if (date.length === 2) {
              column.setFilterValue([date[0].getTime(), date[1].getTime()]);
            }
          }}
          options={config}
        />
      </div>
    </ResponsiveFilter>
  );
}

DateFilter.propTypes = {
  column: PropTypes.object,
  config: PropTypes.object,
  title: PropTypes.string,
};
