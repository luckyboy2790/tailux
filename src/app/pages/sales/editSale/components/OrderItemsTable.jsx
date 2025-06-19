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
import { useSkipper } from "utils/react-table/useSkipper";
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
import dayjs from "dayjs";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

const EditableInput = ({ getValue, row: { index }, column: { id }, table }) => {
  const initialValue = getValue();
  const safeInitialValue = initialValue ?? "";

  const [value, setValue] = useState(safeInitialValue);

  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue ?? 1);
  }, [initialValue]);

  return (
    <Input
      value={value.toLocaleString()}
      onChange={(e) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, "");
        setValue(rawValue ? Number(rawValue) : 1);
      }}
      onBlur={onBlur}
      type="text"
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
  const [products, setProducts] = useState([]);

  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/api/product/get_products`);
      const result = await response.json();

      const productData = [
        { key: -1, value: "", label: "Select supplier", disabled: false },
        ...(Array.isArray(result?.data) ? result.data : []).map(
          (item, key) => ({
            key,
            value: item?.id,
            label: item?.name,
            disabled: false,
          }),
        ),
      ];

      setProducts(productData);
    };

    fetchData();
  }, []);

  return (
    <Select
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
      data={products}
      required={value === ""}
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
  const [value, setValue] = useState(initialValue || "");

  useEffect(() => {
    setValue(initialValue || "");
  }, [initialValue]);

  const handleChange = (val) => {
    const formatted = dayjs(val).format("YYYY-MM-DD");
    setValue(formatted);
    table.options.meta?.updateData(index, id, formatted);
  };

  return (
    <DatePicker
      value={value}
      onChange={handleChange}
      placeholder={t("nav.purchase.purchase_date_placeholder")}
    />
  );
};

export function OrderItemsTable({ orders, setOrders }) {
  const { t } = useTranslation();

  const defaultColumns = useMemo(
    () => [
      {
        accessorKey: "product_name",
        id: "product_name",
        header: t("nav.sale.product_name"),
        cell: EditableSelect,
      },
      {
        accessorKey: "product_price",
        id: "product_price",
        header: t("nav.sale.product_price"),
        cell: EditableInput,
      },
      {
        accessorKey: "quantity",
        id: "quantity",
        header: t("nav.sale.quantity"),
        cell: EditableInput,
      },
      {
        accessorKey: "sub_total",
        id: "sub_total",
        header: t("nav.sale.sub_total"),
        cell: ({ row }) => {
          const cost = Number(row.getValue("product_price")) || 0;
          const qty = Number(row.getValue("quantity")) || 0;
          return (
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
              <span>{(cost * qty).toLocaleString()}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "action",
        id: "action",
        header: "",
        cell: ({ row, table }) => (
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
        ),
      },
    ],
    [t],
  );

  const data = orders;
  const setData = setOrders;
  const columns = useMemo(() => [...defaultColumns], [defaultColumns]);

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
          old.map((row, index) =>
            index === rowIndex ? { ...row, [columnId]: value } : row,
          ),
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
        <Button
          color="primary"
          className="rounded-full"
          onClick={() => {
            setData((old) => [
              ...old,
              {
                product_name: "",
                expiry_date: "",
                product_cost: 0,
                quantity: 0,
              },
            ]);
          }}
        >
          <PlusIcon className="size-4.5" />
        </Button>
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
                      className="dark:bg-dark-800 dark:text-dark-100 bg-gray-200 font-semibold text-gray-800 uppercase"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </THead>
            <TBody>
              {table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
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
