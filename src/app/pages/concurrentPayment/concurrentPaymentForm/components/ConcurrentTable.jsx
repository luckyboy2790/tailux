import { useLocaleContext } from "app/contexts/locale/context";
import {
  Table,
  THead,
  TBody,
  Th,
  Tr,
  Td,
  Input,
  Checkbox,
} from "components/ui";
import dayjs from "dayjs";

const cols = [
  "Date",
  "Reference No",
  "Company",
  "Store",
  "Product(Qty)",
  "Grand Total",
  "Paid",
  "Balance",
  "Amount",
];

import { useState } from "react";
import { useTranslation } from "react-i18next";

const EditableInput = ({ value, onChange }) => {
  const [raw, setRaw] = useState(value);
  const [focused, setFocused] = useState(false);

  const handleChange = (e) => {
    const num = e.target.value.replace(/,/g, "");
    if (!/^\d*$/.test(num)) return;
    const parsed = Number(num);
    setRaw(parsed);
    onChange(parsed);
  };

  return (
    <Input
      type="text"
      className="w-30"
      value={focused ? raw : raw.toLocaleString()}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChange={handleChange}
    />
  );
};

export function ConcurrentTable({ tableData, checkedRows, setCheckedRows }) {
  const { locale } = useLocaleContext();

  const { t } = useTranslation();

  const toggleRow = (id, amount, checked) => {
    setCheckedRows((prev) => ({
      ...prev,
      [id]: { amount, checked },
    }));
  };

  return (
    <div className="hide-scrollbar dark:border-dark-500 min-w-full overflow-x-auto rounded-lg border border-gray-200">
      <Table className="w-full text-left rtl:text-right">
        <THead>
          <Tr className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200">
            {cols.map((title, index) => (
              <Th
                key={index}
                className="dark:text-dark-100 font-semibold text-gray-800 uppercase"
              >
                {title}
              </Th>
            ))}
          </Tr>
        </THead>
        <TBody>
          {tableData.map((tr) => {
            const id = tr.id;
            const balance =
              Number(tr.grand_total || 0) - Number(tr.paid_amount || 0);
            const isChecked = checkedRows[id]?.checked || false;
            const amount = checkedRows[id]?.amount || balance;

            return (
              <Tr
                key={id}
                className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200"
              >
                <Td>
                  {dayjs(tr.timestamp).locale(locale).format("DD MMM YYYY")}
                </Td>
                <Td>{tr.reference_no}</Td>
                <Td>{tr.company_name}</Td>
                <Td>{tr.store_name}</Td>
                <Td>
                  {tr.orders
                    ?.map((o) => `${o.product.name}(${o.quantity})`)
                    .join(", ")}
                </Td>
                <Td>{tr.grand_total.toLocaleString()}</Td>
                <Td>{tr.paid_amount.toLocaleString()}</Td>
                <Td>
                  <p
                    className={`${tr.grand_total < tr.paid_amount ? "dark:text-red-500" : "dark:text-dark-100"} text-gray-800`}
                  >
                    ${balance.toLocaleString()}
                  </p>
                </Td>
                <Td>
                  <div className="flex items-center gap-3">
                    <EditableInput
                      value={amount}
                      onChange={(val) => toggleRow(id, val, isChecked)}
                    />
                    <Checkbox
                      checked={isChecked}
                      onChange={(e) => toggleRow(id, amount, e.target.checked)}
                    />
                  </div>
                </Td>
              </Tr>
            );
          })}
          <Tr className="font-semibold">
            <Td colSpan={5}>{t("nav.customer_table.total_amount")}</Td>
            <Td>
              {tableData
                .reduce((sum, row) => sum + Number(row.grand_total || 0), 0)
                .toLocaleString()}
            </Td>
            <Td>
              {tableData
                .reduce((sum, row) => sum + Number(row.paid_amount || 0), 0)
                .toLocaleString()}
            </Td>
            <Td>
              {tableData
                .reduce(
                  (sum, row) =>
                    sum +
                    (Number(row.grand_total || 0) -
                      Number(row.paid_amount || 0)),
                  0,
                )
                .toLocaleString()}
            </Td>
            <Td>
              {Object.values(checkedRows)
                .filter((r) => r.checked)
                .reduce((sum, r) => sum + Number(r.amount || 0), 0)
                .toLocaleString()}
            </Td>
          </Tr>
        </TBody>
      </Table>
    </div>
  );
}
