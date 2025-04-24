// Import Dependencies
import PropTypes from "prop-types";
import { TbPinned, TbPinnedOff } from "react-icons/tb";

// Local Imports
import { Button, Checkbox, Switch } from "components/ui";

// ----------------------------------------------------------------------

export function TableSettings({ table }) {
  const tableSettings = table.getState().tableSettings;
  const setTableSettings = table.options.meta.setTableSettings;
  return (
    <>
      {Object.keys(tableSettings).length > 0 && (
        <div className="mb-4 mt-3 flex flex-col items-start space-y-2 px-3 text-gray-600 dark:text-dark-100">
          {Object.prototype.hasOwnProperty.call(
            tableSettings,
            "enableFullScreen",
          ) && (
            <Switch
              label="Full Screen"
              checked={tableSettings.enableFullScreen}
              onChange={(e) =>
                setTableSettings((state) => ({
                  ...state,
                  enableFullScreen: e.target.checked,
                }))
              }
              className="h-4 w-8"
            />
          )}
          {Object.prototype.hasOwnProperty.call(
            tableSettings,
            "enableRowDense",
          ) && (
            <Switch
              label="Row Dense"
              checked={tableSettings.enableRowDense}
              onChange={(e) =>
                setTableSettings((state) => ({
                  ...state,
                  enableRowDense: e.target.checked,
                }))
              }
              className="h-4 w-8"
            />
          )}
          {Object.prototype.hasOwnProperty.call(
            tableSettings,
            "enableColumnFilters",
          ) && (
            <Switch
              label="Column Filters"
              checked={tableSettings.enableColumnFilters}
              onChange={(e) => {
                setTableSettings((state) => ({
                  ...state,
                  enableColumnFilters: e.target.checked,
                }));

                table.resetColumnFilters();
              }}
              className="h-4 w-8"
            />
          )}
          {Object.prototype.hasOwnProperty.call(
            tableSettings,
            "enableSorting",
          ) && (
            <Switch
              label="Sort"
              checked={tableSettings.enableSorting}
              onChange={(e) => {
                setTableSettings((state) => ({
                  ...state,
                  enableSorting: e.target.checked,
                }));
                table.resetSorting();
              }}
              className="h-4 w-8"
            />
          )}
        </div>
      )}

      <div className="flex items-center space-x-2 px-3 ">
        <p className="text-tiny uppercase">column visibility</p>
        <hr className="flex-1 border-gray-300 dark:border-dark-500" />
      </div>

      <div className="mt-3 flex max-h-[50vh] flex-col space-y-2 overflow-y-auto overscroll-y-contain px-3 pb-3 text-gray-600 dark:text-dark-100">
        {table
          .getAllLeafColumns()
          .filter((column) => !column.columnDef?.isHiddenColumn)
          .map((column) => (
            <div
              className="flex items-center justify-between ltr:-mr-2 rtl:-ml-2"
              key={column.id}
            >
              <Checkbox
                label={column?.columnDef?.label || column.id}
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
                className="size-4.5"
              />
              {column.getCanPin() &&
                (column.getIsPinned() ? (
                  <Button
                    onClick={() => column.pin(false)}
                    variant="flat"
                    className="size-6 rounded-full"
                    isIcon
                    title="UnPin Column"
                    aria-label="UnPin Column"
                  >
                    <TbPinnedOff className="size-4" />
                  </Button>
                ) : (
                  <div className="flex">
                    <Button
                      onClick={() => {
                        column.pin("left");
                      }}
                      variant="flat"
                      className="size-6 rounded-full rtl:rotate-180"
                      isIcon
                      title="Pin Left"
                      aria-label="Pin Left"
                    >
                      <TbPinned className="size-4 rotate-90" />
                    </Button>

                    <Button
                      onClick={() => {
                        column.pin("right");
                      }}
                      variant="flat"
                      className="size-6 -rotate-90 rounded-full"
                      isIcon
                      title="Pin Right"
                      aria-label="Pin Right"
                    >
                      <TbPinned className="size-4 rtl:rotate-180" />
                    </Button>
                  </div>
                ))}
            </div>
          ))}
      </div>

      <Button
        variant="flat"
        className="h-9 w-full shrink-0 rounded-t-none border-t border-gray-300 text-xs-plus leading-none dark:border-dark-500"
        onClick={() => table.resetColumnVisibility()}
      >
        Show All Columns
      </Button>
    </>
  );
}

TableSettings.propTypes = {
  table: PropTypes.object,
};
