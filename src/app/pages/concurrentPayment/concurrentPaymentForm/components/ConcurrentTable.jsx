// Local Imports
import { useLocaleContext } from "app/contexts/locale/context";
import { Table, THead, TBody, Th, Tr, Td, Input } from "components/ui";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------

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

const EditableInput = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue || 1);
  }, [initialValue]);

  return (
    <Input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      type="number"
      className="w-30"
    />
  );
};

export function ConcurrentTable({ tableData }) {
  const { locale } = useLocaleContext();

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
          {tableData.map((tr) => (
            <Tr
              key={tr.id}
              className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200"
            >
              <Td>
                {dayjs(tr?.timestamp).locale(locale).format("DD MMM YYYY")}
              </Td>
              <Td>{tr?.reference_no}</Td>
              <Td>{tr.company_name}</Td>
              <Td>{tr.store_name}</Td>
              <Td>
                {
                  <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
                    {tr?.orders
                      ?.map(
                        (order) => `${order.product.name}(${order.quantity})`,
                      )
                      .join(", ")}
                  </p>
                }
              </Td>
              <Td>
                {tr?.grand_total.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Td>
              <Td>
                {tr?.paid_amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Td>
              <Td>
                {
                  <p
                    className={`${tr?.grand_total < tr?.paid_amount ? "dark:text-red-500" : "dark:text-dark-100"} text-gray-800`}
                  >
                    $
                    {(
                      Number(tr?.grand_total || 0) -
                      Number(tr?.paid_amount || 0)
                    ).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                }
              </Td>
              <Td>
                <EditableInput
                  initialValue={
                    Number(tr?.grand_total || 0) - Number(tr?.paid_amount || 0)
                  }
                />
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
