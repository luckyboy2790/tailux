// Import Dependencies
import { PlusIcon } from "@heroicons/react/24/outline";
import { FaTimes } from "react-icons/fa";
import { rankItem } from "@tanstack/match-sorter-utils";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

// Local Imports
// import { getMultipleRandom } from "utils/getMultipleRandom";
import { useSkipper } from "utils/react-table/useSkipper";
// import { fakeData } from "./fakeData";
import {
  Button,
  Card,
  Input,
  Table,
  THead,
  TBody,
  Th,
  Tr,
  Td,
  Select,
} from "components/ui";
import { DatePicker } from "components/shared/form/Datepicker";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const users = [
  {
    product_name: "",
    expiry_date: "",
    product_cost: "",
    quantity: "",
  },
];

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const EditableInput = ({ getValue, row: { index }, column: { id }, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue || 1);
  }, [initialValue]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      type="number"
    />
  );
};

const EditableSelect = ({
  getValue,
  row: { index },
  column: { id },
  table,
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue || "Apple");

  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue || "Apple");
  }, [initialValue]);

  return (
    <Select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      data={["Apple1111111", "Orange111111", "Potato111111", "Tomato1111111"]}
    />
  );
};

const EditableDatePicker = ({
  getValue,
  row: { index },
  column: { id },
  table,
}) => {
  const { t } = useTranslation();

  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <DatePicker
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={t("nav.purchase.purchase_date_placeholder")}
      onBlur={onBlur}
    />
  );
};

export function OrderItemsTable() {
  const { t } = useTranslation();

  const defaultColumns = useMemo(
    () => [
      {
        accessorKey: "product_name",
        id: "product_name",
        header: t("nav.purchase.product_name"),
        cell: EditableSelect,
      },
      {
        accessorKey: "expiry_date",
        id: "expiry_date",
        header: t("nav.purchase.expiry_date"),
        cell: EditableDatePicker,
      },
      {
        accessorKey: "product_cost",
        id: "product_cost",
        header: t("nav.purchase.product_cost"),
        cell: EditableInput,
      },
      {
        accessorKey: "quantity",
        id: "quantity",
        header: t("nav.purchase.quantity"),
        cell: EditableInput,
      },
      {
        accessorKey: "sub_total",
        id: "sub_total",
        header: t("nav.purchase.sub_total"),
        cell: () => {
          return (
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
              <span>1</span>
            </div>
          );
        },
      },
      {
        accessorKey: "action",
        id: "action",
        header: "",
        cell: ({ row, table }) => {
          return (
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
              <Button
                variant="flat"
                onClick={() => {
                  table.options.meta?.removeRow(row.index);
                }}
              >
                <FaTimes className="size-4.5" />
              </Button>
            </div>
          );
        },
      },
    ],
    [t],
  );

  const [data, setData] = useState([...users]);
  const columns = useMemo(() => [...defaultColumns], [t]);

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const deferredGlobalFilter = useDeferredValue(globalFilter);

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter: deferredGlobalFilter,
    },
    meta: {
      updateData: (rowIndex, columnId, value) => {
        skipAutoResetPageIndex();
        setData((old) =>
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
      removeRow: (rowIndex) => {
        setData((old) => old.filter((_, index) => index !== rowIndex));
      },
    },

    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    globalFilterFn: fuzzyFilter,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    autoResetPageIndex,
  });

  return (
    <div>
      <div className="flex items-center justify-end">
        <div className="flex">
          <Button
            color="primary"
            className="rounded-full"
            onClick={() => {
              setData((old) => [
                ...old,
                {
                  product_name: "",
                  expiry_date: "",
                  product_cost: "",
                  quantity: "",
                },
              ]);
            }}
          >
            <PlusIcon className="size-4.5" />
          </Button>
        </div>
      </div>
      <Card className="mt-3">
        <div className="min-w-full overflow-x-auto">
          <Table hoverable className="w-full text-left rtl:text-right">
            <THead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th
                      key={header.id}
                      className="dark:bg-dark-800 dark:text-dark-100 bg-gray-200 font-semibold text-gray-800 uppercase first:ltr:rounded-tl-lg last:ltr:rounded-tr-lg first:rtl:rounded-tr-lg last:rtl:rounded-tl-lg"
                    >
                      {header.column.getCanSort() ? (
                        <div
                          className="flex cursor-pointer items-center space-x-2 select-none"
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
              {table.getRowModel().rows.map((row) => (
                <Tr
                  key={row.id}
                  className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200 last:border-none"
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  ))}
                </Tr>
              ))}
            </TBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

EditableInput.propTypes = {
  getValue: PropTypes.func,
  row: PropTypes.object,
  column: PropTypes.object,
  table: PropTypes.object,
};

EditableSelect.propTypes = {
  getValue: PropTypes.func,
  row: PropTypes.object,
  column: PropTypes.object,
  table: PropTypes.object,
};

EditableDatePicker.propTypes = {
  getValue: PropTypes.func,
  row: PropTypes.object,
  column: PropTypes.object,
  table: PropTypes.object,
};
