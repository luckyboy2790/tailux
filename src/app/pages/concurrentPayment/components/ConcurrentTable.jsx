// Local Imports
import { Table, THead, TBody, Th, Tr, Td } from "components/ui";

// ----------------------------------------------------------------------

const cols = [
  "#",
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

const data = [
  {
    uid: "1",
    Date: "2025-03-06",
    "Reference No": "512514",
    Company: "Google",
    Store: "google",
    "Product(Qty)": 1,
    "Grand Total": 1,
    Paid: 1,
    Balance: 1,
    Amount: 1,
  },
  {
    uid: "1",
    Date: "2025-03-06",
    "Reference No": "512514",
    Company: "Google",
    Store: "google",
    "Product(Qty)": 1,
    "Grand Total": 1,
    Paid: 1,
    Balance: 1,
    Amount: 1,
  },
  {
    uid: "1",
    Date: "2025-03-06",
    "Reference No": "512514",
    Company: "Google",
    Store: "google",
    "Product(Qty)": 1,
    "Grand Total": 1,
    Paid: 1,
    Balance: 1,
    Amount: 1,
  },
];

export function ConcurrentTable() {
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
          {data.map((tr) => (
            <Tr
              key={tr.uid}
              className="dark:border-b-dark-500 border-y border-transparent border-b-gray-200"
            >
              <Td>{tr.uid}</Td>
              <Td>{tr.Date}</Td>
              <Td>{tr["Reference No"]}</Td>
              <Td>{tr.Company}</Td>
              <Td>{tr.Store}</Td>
              <Td>{tr["Product(Qty)"]}</Td>
              <Td>{tr["Grand Total"]}</Td>
              <Td>{tr.Paid}</Td>
              <Td>{tr.Balance}</Td>
              <Td>{tr.Amount}</Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </div>
  );
}
