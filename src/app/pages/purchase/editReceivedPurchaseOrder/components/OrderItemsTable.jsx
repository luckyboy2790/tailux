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
  Card,
  Input,
  Table,
  THead,
  TBody,
  Th,
  Tr,
  Td,
  Checkbox,
} from "components/ui";
import { DatePicker } from "components/shared/form/Datepicker";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { Combobox } from "components/shared/form/Combobox";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

const EditableNumberInput = ({
  getValue,
  row: { index },
  column: { id },
  table,
  row,
}) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue ?? 0);
  }, [initialValue]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      max={row?.original?.balance || 0}
      min={0}
      onBlur={onBlur}
      type="number"
    />
  );
};

const EditableInput = ({ getValue, row: { index }, column: { id }, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  useEffect(() => {
    setValue(initialValue ?? 0);
  }, [initialValue]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
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
  const [value, setValue] = useState(null);
  const [products, setProducts] = useState([]);

  const onBlur = () => {
    table.options.meta?.updateData(index, id, value?.value || "");
  };

  const { t } = useTranslation();

  useEffect(() => {
    setValue(
      products.find((p) => p.value === initialValue) || {
        value: initialValue || "",
        label: initialValue || "",
      },
    );
  }, [initialValue, products]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${API_URL}/api/category/get_all_categories`,
      );
      const result = await response.json();

      const categoryData = [
        {
          key: -1,
          value: "",
          label: "",
          disabled: false,
        },
        ...(Array.isArray(result?.data) ? result.data : []).map(
          (item, key) => ({
            key,
            value: item?.id,
            label: item?.name,
            disabled: false,
          }),
        ),
      ];

      setProducts(categoryData);
    };

    fetchData();
  }, [t]);

  return (
    <Combobox
      data={products}
      value={value}
      onChange={(selected) => setValue(selected)}
      onBlur={onBlur}
      placeholder={t("nav.select.select_category")}
      displayField="label"
      searchFields={["label"]}
      error={value?.value === ""}
      className="min-w-[180px]"
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
        accessorKey: "checked",
        id: "checked",
        header: "#",
        cell: ({ row, table }) => (
          <Checkbox
            checked={row.original.checked || false}
            onChange={(e) =>
              table.options.meta?.updateData(
                row.index,
                "checked",
                e.target.checked,
              )
            }
          />
        ),
      },
      {
        accessorKey: "product_name",
        id: "product_name",
        header: t("nav.purchase.product_name"),
      },
      {
        accessorKey: "product_cost",
        id: "product_cost",
        header: t("nav.purchase.product_cost"),
        cell: ({ row }) => (
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span>{Number(row.getValue("product_cost")).toLocaleString()}</span>
          </div>
        ),
      },
      {
        accessorKey: "discount",
        id: "discount",
        header: t("nav.purchase.discount"),
      },
      {
        accessorKey: "quantity",
        id: "quantity",
        header: t("nav.purchase.quantity"),
        cell: ({ row }) => (
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span>{Number(row.getValue("quantity")).toLocaleString()}</span>
          </div>
        ),
      },
      {
        accessorKey: "receive_quantity",
        id: "receive_quantity",
        header: t("nav.purchase.receive_quantity"),
        cell: ({ row }) => (
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span>
              {Number(row.getValue("receive_quantity")).toLocaleString()}
            </span>
          </div>
        ),
      },
      {
        accessorKey: "balance",
        id: "balance",
        header: t("nav.purchase.balance"),
        cell: ({ row }) => (
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span>{Number(row.getValue("balance")).toLocaleString()}</span>
          </div>
        ),
      },
      {
        accessorKey: "receive",
        id: "receive",
        header: t("nav.purchase.receive"),
        cell: EditableNumberInput,
      },
      {
        accessorKey: "category",
        id: "category",
        header: t("nav.purchase.category"),
      },
      {
        accessorKey: "sub_total",
        id: "sub_total",
        header: t("nav.purchase.sub_total"),
        cell: ({ row }) => {
          const cost = Number(row.getValue("product_cost")) || 0;
          const qty = Number(row.getValue("receive")) || 0;
          const rawDiscount = row.getValue("discount");

          let discountAmount = 0;

          if (
            typeof rawDiscount === "string" &&
            rawDiscount.trim().endsWith("%")
          ) {
            const percent = parseFloat(rawDiscount.trim().replace("%", ""));
            if (!isNaN(percent)) {
              discountAmount = (cost * percent) / 100;
            }
          } else {
            const flat = Number(rawDiscount);
            if (!isNaN(flat)) {
              discountAmount = flat;
            }
          }

          const subTotal = (cost - discountAmount).toFixed() * qty;

          return (
            <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse">
              <span>{Number(subTotal).toLocaleString()}</span>
            </div>
          );
        },
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

EditableNumberInput.propTypes = {
  getValue: PropTypes.func,
  row: PropTypes.object,
  column: PropTypes.object,
  table: PropTypes.object,
};

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
