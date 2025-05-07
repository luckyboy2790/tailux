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
import { useState } from "react";

// ----------------------------------------------------------------------

export function DateFilter({ onChange, title, config }) {
  const { smAndDown } = useBreakpointsContext();
  const { locale } = useLocaleContext();

  const [selectedDates, setSelectedDates] = useState([null, null]);

  const handleDateChange = (date) => {
    if (date.length === 0) {
      setSelectedDates([null, null]);
      onChange?.(["", ""]);
    }
    if (date.length === 2) {
      const startDate = dayjs(date[0]).format("YYYY-MM-DD");
      const endDate = dayjs(date[1]).format("YYYY-MM-DD");
      setSelectedDates([date[0], date[1]]);
      onChange?.([startDate, endDate]);
    }
  };

  return (
    <ResponsiveFilter
      buttonContent={
        <>
          <CalendarIcon className="size-4" />
          <span> {title}</span>

          {selectedDates[0] && selectedDates[1] && (
            <>
              <div className="dark:bg-dark-450 h-full w-px bg-gray-300" />
              <span>
                {dayjs(selectedDates[0]).locale(locale).format("DD MMM YYYY")} -{" "}
                {dayjs(selectedDates[1]).locale(locale).format("DD MMM YYYY")}
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
            ? "dark:border-dark-500 mt-1 mb-2 h-10 w-full max-w-xs border-b border-gray-200 py-3"
            : "bg-gray-150 dark:bg-dark-900 px-2.5 py-2",
        )}
      >
        <p className="dark:text-dark-50 truncate text-start text-base font-medium text-gray-800 sm:py-1 sm:text-sm">
          {title}
        </p>
        {selectedDates[0] && selectedDates[1] && (
          <Button
            onClick={() => {
              setSelectedDates([null, null]);
              onChange?.(["", ""]);
            }}
            className="h-7 px-3 text-xs"
          >
            Clear
          </Button>
        )}
      </div>

      <div className="max-sm:mx-auto max-sm:[&_.is-calendar]:w-80 max-sm:[&_.is-calendar]:max-w-none">
        <DatePicker
          isCalendar
          value={selectedDates ?? ""}
          readOnly
          onChange={handleDateChange}
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
  onChange: PropTypes.func, // add this
};
