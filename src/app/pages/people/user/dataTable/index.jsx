import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

import { Table, Card, THead, TBody, Th, Tr, Td, Skeleton } from "components/ui";
import { TableSortIcon } from "components/shared/table/TableSortIcon";
import { Page } from "components/shared/Page";
import { useLockScrollbar, useDidUpdate, useLocalStorage } from "hooks";
import { fuzzyFilter } from "utils/react-table/fuzzyFilter";
import { useSkipper } from "utils/react-table/useSkipper";
import { Toolbar } from "./Toolbar";
import { getColumns } from "./columns";
import { PaginationSection } from "components/shared/table/PaginationSection";
import { useThemeContext } from "app/contexts/theme/context";
import { getUserAgentBrowser } from "utils/dom/getUserAgentBrowser";
import { statusFilter } from "utils/react-table/statusFilter";
import FileNotFound from "assets/emptyIcon";
import { useTranslation } from "react-i18next";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const isSafari = getUserAgentBrowser() === "Safari";

export default function PurchaseTable() {
  const { cardSkin } = useThemeContext();

  const { t } = useTranslation();

  const columns = getColumns(t);

  const [orders, setOrders] = useState([]);

  const [tableSettings, setTableSettings] = useState({
    enableFullScreen: false,
    enableRowDense: false,
  });

  const [filters, setFilters] = useLocalStorage("userTableFilters", {
    pageIndex: 0,
    pageSize: 10,
    globalFilter: "",
  });

  const [totalCount, setTotalCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(filters.pageIndex);
  const [pageSize, setPageSize] = useState(filters.pageSize);

  const [isLoading, setIsLoading] = useState(true);

  const [globalFilter, setGlobalFilter] = useState(filters.globalFilter);

  const [sorting, setSorting] = useState([]);

  const [columnVisibility, setColumnVisibility] = useLocalStorage(
    "column-visibility-orders-1",
    {},
  );

  const [columnPinning, setColumnPinning] = useLocalStorage(
    "column-pinning-orders-1",
    {},
  );

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  useEffect(() => {
    setFilters({
      pageIndex,
      pageSize,
      globalFilter,
    });
  }, [setFilters, pageIndex, pageSize, globalFilter]);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);

      const queryString = new URLSearchParams({
        keyword: globalFilter,
        page: (pageIndex + 1).toString(),
        per_page: pageSize.toString(),
      }).toString();

      const response = await fetch(
        `${API_URL}/api/users/search?${queryString}`,
      );

      const result = await response.json();

      setOrders(result.data.data);
      setTotalCount(result.data.total);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [globalFilter, pageIndex, pageSize]);

  const table = useReactTable({
    data: orders,
    columns: columns,
    state: {
      sorting,
      columnVisibility,
      columnPinning,
      tableSettings,
    },
    meta: {
      updateData: (rowIndex, columnId, value) => {
        skipAutoResetPageIndex();
        setOrders((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
      deleteRow: (row) => {
        skipAutoResetPageIndex();
        setOrders((old) =>
          old.filter((oldRow) => oldRow.order_id !== row.original.order_id),
        );
      },
      deleteRows: (rows) => {
        skipAutoResetPageIndex();
        const rowIds = rows.map((row) => row.original.order_id);
        setOrders((old) => old.filter((row) => !rowIds.includes(row.order_id)));
      },
      setTableSettings,
      refetch: fetchData,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
      status: statusFilter,
    },
    enableSorting: tableSettings.enableSorting,
    enableColumnFilters: tableSettings.enableColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: (value) => {
      setGlobalFilter(value);
      setPageIndex(0);
    },
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,

    autoResetPageIndex,
  });

  useDidUpdate(() => table.resetRowSelection(), [orders]);

  useLockScrollbar(tableSettings.enableFullScreen);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Page title="Orders Datatable v1">
      <div className="transition-content w-full pb-5">
        <div
          className={clsx(
            "flex h-full w-full flex-col",
            tableSettings.enableFullScreen &&
              "dark:bg-dark-900 fixed inset-0 z-61 bg-white pt-3",
          )}
        >
          <Toolbar table={table} />
          <div
            className={clsx(
              "transition-content flex grow flex-col pt-3",
              tableSettings.enableFullScreen
                ? "overflow-hidden"
                : "px-(--margin-x)",
            )}
          >
            <Card
              className={clsx(
                "relative flex grow flex-col",
                tableSettings.enableFullScreen && "overflow-hidden",
              )}
            >
              <div className="table-wrapper min-w-full grow overflow-x-auto">
                <Table
                  hoverable
                  dense={tableSettings.enableRowDense}
                  sticky={tableSettings.enableFullScreen}
                  className="w-full text-left rtl:text-right"
                >
                  <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <Tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <Th
                            key={header.id}
                            className={clsx(
                              "dark:bg-dark-800 dark:text-dark-100 bg-gray-200 font-semibold text-gray-800 uppercase first:ltr:rounded-tl-lg last:ltr:rounded-tr-lg first:rtl:rounded-tr-lg last:rtl:rounded-tl-lg",
                              header.column.getCanPin() && [
                                header.column.getIsPinned() === "left" &&
                                  "sticky z-2 ltr:left-0 rtl:right-0",
                                header.column.getIsPinned() === "right" &&
                                  "sticky z-2 ltr:right-0 rtl:left-0",
                              ],
                            )}
                          >
                            {header.column.getCanSort() ? (
                              <div
                                className="flex cursor-pointer items-center space-x-3 select-none"
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                <span className="flex-1">
                                  {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                      )}
                                </span>
                                <TableSortIcon
                                  sorted={header.column.getIsSorted()}
                                />
                              </div>
                            ) : header.isPlaceholder ? null : (
                              flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )
                            )}
                          </Th>
                        ))}
                      </Tr>
                    ))}
                  </THead>
                  <TBody>
                    {isLoading ? (
                      <>
                        <Tr
                          className={clsx(
                            "dark:border-b-dark-500 relative border-y border-transparent border-b-gray-200",
                          )}
                        >
                          {new Array(columns.length)
                            .fill(null)
                            .map((_, index) => (
                              <Td
                                key={index}
                                className={clsx(
                                  "relative bg-white",
                                  cardSkin === "shadow-sm"
                                    ? "dark:bg-dark-700"
                                    : "dark:bg-dark-900",
                                )}
                              >
                                <Skeleton className="size-7 w-full rounded-lg" />
                              </Td>
                            ))}
                        </Tr>
                        <Tr
                          className={clsx(
                            "dark:border-b-dark-500 relative border-y border-transparent border-b-gray-200",
                          )}
                        >
                          {new Array(columns.length)
                            .fill(null)
                            .map((_, index) => (
                              <Td
                                key={index}
                                className={clsx(
                                  "relative bg-white",
                                  cardSkin === "shadow-sm"
                                    ? "dark:bg-dark-700"
                                    : "dark:bg-dark-900",
                                )}
                              >
                                <Skeleton className="size-7 w-full rounded-lg" />
                              </Td>
                            ))}
                        </Tr>
                        <Tr
                          className={clsx(
                            "dark:border-b-dark-500 relative border-y border-transparent border-b-gray-200",
                          )}
                        >
                          {new Array(columns.length)
                            .fill(null)
                            .map((_, index) => (
                              <Td
                                key={index}
                                className={clsx(
                                  "relative bg-white",
                                  cardSkin === "shadow-sm"
                                    ? "dark:bg-dark-700"
                                    : "dark:bg-dark-900",
                                )}
                              >
                                <Skeleton className="size-7 w-full rounded-lg" />
                              </Td>
                            ))}
                        </Tr>
                      </>
                    ) : (
                      table.getRowModel().rows.map((row) => {
                        return (
                          <Tr
                            key={row.id}
                            className={clsx(
                              "dark:border-b-dark-500 relative border-y border-transparent border-b-gray-200",
                              row.getIsSelected() &&
                                !isSafari &&
                                "row-selected after:bg-primary-500/10 ltr:after:border-l-primary-500 rtl:after:border-r-primary-500 after:pointer-events-none after:absolute after:inset-0 after:z-2 after:h-full after:w-full after:border-3 after:border-transparent",
                            )}
                          >
                            {/* first row is a normal row */}
                            {row.getVisibleCells().map((cell) => {
                              return (
                                <Td
                                  key={cell.id}
                                  className={clsx(
                                    "relative",
                                    cell.column.getCanPin() && [
                                      cell.column.getIsPinned() === "left" &&
                                        "sticky z-2 ltr:left-0 rtl:right-0",
                                      cell.column.getIsPinned() === "right" &&
                                        "sticky z-2 ltr:right-0 rtl:left-0",
                                    ],
                                  )}
                                >
                                  {cell.column.getIsPinned() && (
                                    <div
                                      className={clsx(
                                        "dark:border-dark-500 pointer-events-none absolute inset-0 border-gray-200",
                                        cell.column.getIsPinned() === "left"
                                          ? "ltr:border-r rtl:border-l"
                                          : "ltr:border-l rtl:border-r",
                                      )}
                                    ></div>
                                  )}
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                  )}
                                </Td>
                              );
                            })}
                          </Tr>
                        );
                      })
                    )}
                  </TBody>
                </Table>
              </div>
              {!isLoading && table.getCoreRowModel().rows.length > 0 && (
                <div
                  className={clsx(
                    "px-4 pb-4 sm:px-5 sm:pt-4",
                    tableSettings.enableFullScreen &&
                      "dark:bg-dark-800 bg-gray-50",
                    !(
                      table.getIsSomeRowsSelected() ||
                      table.getIsAllRowsSelected()
                    ) && "pt-4",
                  )}
                >
                  <PaginationSection
                    table={table}
                    total={totalCount}
                    pageIndex={pageIndex}
                    setPageIndex={setPageIndex}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                  />
                </div>
              )}

              {!isLoading && table.getCoreRowModel().rows.length <= 0 && (
                <div className="flex h-60 w-full flex-col items-center justify-center text-gray-500">
                  <FileNotFound />
                  <p className="text-lg font-medium">No results found</p>
                  <p className="text-sm text-gray-400">
                    Try changing filters or search terms
                  </p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </Page>
  );
}
