// Import Dependencies
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import PropTypes from "prop-types";

// Local Imports
// import { DateFilter } from "components/shared/table/DateFilter";
import { Button, Input } from "components/ui";
import { TableConfig } from "./TableConfig";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { useTranslation } from "react-i18next";
import { useDisclosure } from "hooks";
import { UserModal } from "components/shared/UserModal";
import { useEffect, useState } from "react";
// import { useEffect, useState } from "react";

// const API_URL = import.meta.env.VITE_API_BASE_URL;

export function Toolbar({ table }) {
  const { isXs } = useBreakpointsContext();
  const isFullScreenEnabled = table.getState().tableSettings.enableFullScreen;
  const { t } = useTranslation();

  const [isOpen, { open, close }] = useDisclosure(false);

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
                    onClick={open}
                  >
                    <span>{t("nav.user.add_user")}</span>
                  </button>
                )}
              </MenuItem>
            </Transition>
          </Menu>
        ) : (
          <div className="flex space-x-2">
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
                      onClick={open}
                    >
                      <span>{t("nav.user.add_user")}</span>
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

      <UserModal
        type={"add"}
        row={{ refetch: table.options.meta.refetch }}
        isOpen={isOpen}
        close={close}
      />
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
