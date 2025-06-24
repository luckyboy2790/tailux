// Import Dependencies
import {
  // ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
// import { TbUpload } from "react-icons/tb";
import clsx from "clsx";
// import {
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuItems,
//   Transition,
// } from "@headlessui/react";
// import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";

// Local Imports
import { Input } from "components/ui";
import { TableConfig } from "./TableConfig";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

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
      ></div>
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
          </div>

          <TableConfig table={table} />
        </div>
      )}
    </div>
  );
}

function SearchInput({ table }) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState(
    table.getState().globalFilter || "",
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      table.setGlobalFilter(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, table]);

  return (
    <Input
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      prefix={<MagnifyingGlassIcon className="size-4" />}
      classNames={{
        input: "ring-primary-500/50 h-8 text-xs focus:ring-3",
        root: "shrink-0",
      }}
      placeholder={t("nav.search_placeholder")}
    />
  );
}

Toolbar.propTypes = {
  table: PropTypes.object.isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
};

SearchInput.propTypes = {
  table: PropTypes.object.isRequired,
};
