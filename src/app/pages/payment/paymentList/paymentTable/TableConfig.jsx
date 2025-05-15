// Import Dependencies
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

// Local Imports
import { TableSettings } from "components/shared/table/TableSettings";
import { ResponsiveFilter } from "components/shared/table/ResponsiveFilter";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";

// ----------------------------------------------------------------------

export function TableConfig({ table }) {
  const { smAndDown } = useBreakpointsContext();
  return (
    <ResponsiveFilter
      anchor={{ to: "bottom end", gap: 12 }}
      buttonContent={
        <>
          <ViewColumnsIcon className="size-4" />
          <span>View</span>
        </>
      }
      classNames={{
        button: "border-solid!",
      }}
    >
      {smAndDown ? (
        <div className="mx-auto flex h-12 w-full shrink-0 items-center justify-between border-b border-gray-200 px-3 dark:border-dark-500">
          <p className="truncate text-start text-base font-medium text-gray-800 dark:text-dark-50">
            Table View
          </p>
        </div>
      ) : (
        <h3 className="px-3 pt-2.5 text-sm-plus font-medium tracking-wide text-gray-800 dark:text-dark-100">
          Table View
        </h3>
      )}

      <div className="flex sm:w-64 flex-col max-sm:overflow-hidden">
        <TableSettings table={table} />
      </div>
    </ResponsiveFilter>
  );
}

TableConfig.propTypes = {
  table: PropTypes.object,
};
