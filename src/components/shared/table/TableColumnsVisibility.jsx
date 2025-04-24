// Import Dependencies
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import PropTypes from "prop-types";

// Local Imports
import { Button, Checkbox } from "components/ui";

// ----------------------------------------------------------------------

export function TableColumnVisibility({ table, description, header }) {
  return (
    <Popover className="relative w-full">
      <PopoverButton
        isIcon
        variant="flat"
        className="size-8 rounded-full"
        as={Button}
      >
        <ViewColumnsIcon className="size-5" />
      </PopoverButton>
      <Transition
        as={Fragment}
        enter="transition ease-out"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <PopoverPanel
          anchor={{ to: "bottom end", gap: 8 }}
          className="absolute w-60 z-100 rounded-md border border-gray-300 bg-white shadow-lg shadow-gray-200/50 outline-hidden ring-primary-500/50 focus-visible:outline-hidden focus-visible:ring-3 dark:border-dark-500 dark:bg-dark-750 dark:shadow-none"
        >
          <div className="p-4">
            <h3 className="-mt-1 text-base font-medium tracking-wide text-gray-800 dark:text-dark-100">
              {header}
            </h3>
            <p className="mt-1 text-xs-plus opacity-80">{description}</p>
            <div className="mt-4 flex flex-col space-y-4 text-gray-600 dark:text-dark-100">
              {table.getAllLeafColumns().map((column) => (
                <Checkbox
                  key={column.id}
                  label={column?.columnDef?.header || column.id}
                  checked={column.getIsVisible()}
                  onChange={column.getToggleVisibilityHandler()}
                />
              ))}
            </div>
          </div>
          <Button
            variant="flat"
            className="h-9 w-full rounded-t-none border-t border-gray-300 text-xs-plus leading-none dark:border-dark-500"
            onClick={() => table.resetColumnVisibility()}
          >
            Show All
          </Button>
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}

TableColumnVisibility.propTypes = {
  table: PropTypes.object,
  description: PropTypes.string,
  header: PropTypes.string,
};
