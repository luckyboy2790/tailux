// Import Dependencies
import {
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
  PrinterIcon,
  // MapPinIcon,
} from "@heroicons/react/24/outline";
import { TbUpload } from "react-icons/tb";
import clsx from "clsx";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
// import { TbCurrencyDollar } from "react-icons/tb";
import PropTypes from "prop-types";

// Local Imports
// import { DateFilter } from "components/shared/table/DateFilter";
// import { FacedtedFilter } from "components/shared/table/FacedtedFilter";
// import { RangeFilter } from "components/shared/table/RangeFilter";
import { Button, Input } from "components/ui";
import { TableConfig } from "./TableConfig";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
// import { orderStatusOptions } from "./data";

// ----------------------------------------------------------------------

export function Toolbar({ table }) {
  const { isXs } = useBreakpointsContext();
  const isFullScreenEnabled = table.getState().tableSettings.enableFullScreen;

  return (
    <div className="table-toolbar">
      <div
        className={clsx(
          "transition-content flex items-center justify-end gap-4",
          isFullScreenEnabled ? "px-4 sm:px-5" : "px-(--margin-x) pt-4",
        )}
      >
        {isXs ? (
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton
              as={Button}
              variant="flat"
              className="size-8 shrink-0 rounded-full p-0"
            >
              <EllipsisHorizontalIcon className="size-4.5" />
            </MenuButton>
            <Transition
              as={MenuItems}
              enter="transition ease-out"
              enterFrom="opacity-0 translate-y-2"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-2"
              className="dark:border-dark-500 dark:bg-dark-700 absolute z-100 mt-1.5 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 whitespace-nowrap shadow-lg shadow-gray-200/50 outline-hidden focus-visible:outline-hidden ltr:right-0 rtl:left-0 dark:shadow-none"
            >
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={clsx(
                      "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                      focus &&
                        "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                    )}
                  >
                    <span>New Order</span>
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={clsx(
                      "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                      focus &&
                        "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                    )}
                  >
                    <span>Share</span>
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={clsx(
                      "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                      focus &&
                        "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                    )}
                  >
                    <span>Print</span>
                  </button>
                )}
              </MenuItem>
              <hr className="border-gray-150 dark:border-dark-500 mx-3 my-1.5 h-px" />
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={clsx(
                      "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                      focus &&
                        "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                    )}
                  >
                    <span>Import Orders</span>
                  </button>
                )}
              </MenuItem>
              <hr className="border-gray-150 dark:border-dark-500 mx-3 my-1.5 h-px" />
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={clsx(
                      "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                      focus &&
                        "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                    )}
                  >
                    <span>Export as PDF</span>
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={clsx(
                      "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                      focus &&
                        "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                    )}
                  >
                    <span>Export as CSV</span>
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={clsx(
                      "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                      focus &&
                        "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                    )}
                  >
                    <span>Save Table as View</span>
                  </button>
                )}
              </MenuItem>
            </Transition>
          </Menu>
        ) : (
          <div className="flex space-x-2">
            <Button
              variant="outlined"
              className="h-8 space-x-2 rounded-md px-3 text-xs"
            >
              <PrinterIcon className="size-4" />
              <span>Print</span>
            </Button>

            <Menu
              as="div"
              className="relative inline-block text-left whitespace-nowrap"
            >
              <MenuButton
                as={Button}
                variant="outlined"
                className="h-8 space-x-2 rounded-md px-3 text-xs"
              >
                <TbUpload className="size-4" />
                <span>Export</span>
                <ChevronUpDownIcon className="size-4" />
              </MenuButton>
              <Transition
                as={MenuItems}
                enter="transition ease-out"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
                className="dark:border-dark-500 dark:bg-dark-700 absolute z-100 mt-1.5 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 outline-hidden focus-visible:outline-hidden ltr:right-0 rtl:left-0 dark:shadow-none"
              >
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={clsx(
                        "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                        focus &&
                          "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                      )}
                    >
                      <span>Export as PDF</span>
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={clsx(
                        "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                        focus &&
                          "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                      )}
                    >
                      <span>Export as CSV</span>
                    </button>
                  )}
                </MenuItem>
              </Transition>
            </Menu>

            <Menu
              as="div"
              className="relative inline-block text-left whitespace-nowrap"
            >
              <MenuButton
                as={Button}
                variant="outlined"
                className="h-8 shrink-0 rounded-md px-2.5"
              >
                <EllipsisHorizontalIcon className="size-4.5" />
              </MenuButton>
              <Transition
                as={MenuItems}
                enter="transition ease-out"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
                className="dark:border-dark-500 dark:bg-dark-700 absolute z-100 mt-1.5 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 whitespace-nowrap shadow-lg shadow-gray-200/50 outline-hidden focus-visible:outline-hidden ltr:right-0 rtl:left-0 dark:shadow-none"
              >
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={clsx(
                        "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                        focus &&
                          "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                      )}
                    >
                      <span>New Order</span>
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={clsx(
                        "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                        focus &&
                          "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                      )}
                    >
                      <span>Share Orders</span>
                    </button>
                  )}
                </MenuItem>
                <hr className="border-gray-150 dark:border-dark-500 mx-3 my-1.5 h-px" />
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={clsx(
                        "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                        focus &&
                          "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                      )}
                    >
                      <span>Import Orders</span>
                    </button>
                  )}
                </MenuItem>
                <hr className="border-gray-150 dark:border-dark-500 mx-3 my-1.5 h-px" />
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={clsx(
                        "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                        focus &&
                          "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                      )}
                    >
                      <span>Save Table as View</span>
                    </button>
                  )}
                </MenuItem>
              </Transition>
            </Menu>
          </div>
        )}
      </div>

      {isXs ? (
        <>
          <div
            className={clsx(
              "flex space-x-2 pt-4 [&_.input-root]:flex-1",
              isFullScreenEnabled ? "px-4 sm:px-5" : "px-(--margin-x)",
            )}
          >
            <SearchInput table={table} />
            <TableConfig table={table} />
          </div>
          {/* <div
            className={clsx(
              "hide-scrollbar flex shrink-0 space-x-2 overflow-x-auto pt-4 pb-1",
              isFullScreenEnabled ? "px-4 sm:px-5" : "px-(--margin-x)",
            )}
          >
            <Filters table={table} />
          </div> */}
        </>
      ) : (
        <div
          className={clsx(
            "custom-scrollbar transition-content flex justify-between space-x-4 overflow-x-auto pt-4 pb-1",
            isFullScreenEnabled ? "px-4 sm:px-5" : "px-(--margin-x)",
          )}
          style={{
            "--margin-scroll": isFullScreenEnabled
              ? "1.25rem"
              : "var(--margin-x)",
          }}
        >
          <div className="flex shrink-0 space-x-2">
            <SearchInput table={table} />
            {/* <Filters table={table} /> */}
          </div>

          <TableConfig table={table} />
        </div>
      )}
    </div>
  );
}

function SearchInput({ table }) {
  return (
    <Input
      value={table.getState().globalFilter}
      onChange={(e) => table.setGlobalFilter(e.target.value)}
      prefix={<MagnifyingGlassIcon className="size-4" />}
      classNames={{
        input: "ring-primary-500/50 h-8 text-xs focus:ring-3",
        root: "shrink-0",
      }}
      placeholder="Search ID, Customer..."
    />
  );
}

// function Filters({ table }) {
//   const isFiltered = table.getState().columnFilters.length > 0;
//   return (
//     <>
//       {table.getColumn("created_at") && (
//         <DateFilter
//           column={table.getColumn("created_at")}
//           title="Order Date Range"
//           config={{
//             maxDate: new Date().fp_incr(1),
//             mode: "range",
//           }}
//         />
//       )}

//       {table.getColumn("total") && (
//         <RangeFilter
//           column={table.getColumn("total")}
//           title="Total Amount"
//           Icon={TbCurrencyDollar}
//           MinPrefixIcon={TbCurrencyDollar}
//           MaxPrefixIcon={TbCurrencyDollar}
//           buttonText={({ min, max }) => (
//             <>
//               {min && <>From ${min}</>}
//               {min && max && " - "}
//               {max && <>To ${max}</>}
//             </>
//           )}
//         />
//       )}

//       {isFiltered && (
//         <Button
//           onClick={() => table.resetColumnFilters()}
//           className="h-8 px-2.5 text-xs whitespace-nowrap"
//         >
//           Reset Filters
//         </Button>
//       )}
//     </>
//   );
// }

Toolbar.propTypes = {
  table: PropTypes.object,
};

SearchInput.propTypes = {
  table: PropTypes.object,
};

// Filters.propTypes = {
//   table: PropTypes.object,
// };
