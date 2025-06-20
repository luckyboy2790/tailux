// Import Dependencies
import {
  ChevronUpDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { TbUpload } from "react-icons/tb";
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
import { DateFilter } from "components/shared/table/DateFilter";
import { Button, Input, Select } from "components/ui";
import { TableConfig } from "./TableConfig";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Combobox } from "components/shared/form/Combobox";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { useAuthContext } from "app/contexts/auth/context";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export function Toolbar({
  table,
  onDateRangeChange,
  startDate,
  endDate,
  companyId,
  setCompanyId,
  supplierId,
  setSupplierId,
}) {
  const { isXs } = useBreakpointsContext();
  const isFullScreenEnabled = table.getState().tableSettings.enableFullScreen;

  const [cookies] = useCookies(["authToken"]);

  const token = cookies.authToken;

  const navigate = useNavigate();

  const { t } = useTranslation();

  const exportTableToExcel = async () => {
    const response = await fetch(`${API_URL}/api/purchase/get_all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();

    const purchases = result || [];

    const data = purchases.map((p, index) => {
      let status = "paid";
      if (p.paid_amount === 0) {
        status = "partial";
      } else if (p.paid_amount < p.total_amount) {
        status = "pending";
      }

      return {
        No: index + 1,
        Date: dayjs(p.timestamp).format("YYYY-MM-DD"),
        Reference_No: p.reference_no,
        Supplier: p.supplier_company || "",
        Grand_Total: p.total_amount,
        Paid_Amount: p.paid_amount,
        Balance: p.total_amount - p.paid_amount,
        Order_Status: status,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchases");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "PurchaseReport.xlsx");
  };

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
                    onClick={() => {
                      navigate("/purchase/add");
                    }}
                  >
                    <span>{t("nav.purchase.add_purchase")}</span>
                  </button>
                )}
              </MenuItem>
              <hr className="border-gray-150 dark:border-dark-500 mx-3 my-1.5 h-px" />
              <MenuItem>
                {({ focus }) => (
                  <button
                    className={clsx(
                      "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                      focus &&
                        "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                    )}
                    onClick={() => exportTableToExcel()}
                  >
                    <span>{t("nav.export.export_excel")}</span>
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
                className="h-8 space-x-2 rounded-md px-3 text-xs"
              >
                <TbUpload className="size-4" />
                <span>{t("nav.export.export")}</span>
                <ChevronUpDownIcon className="size-4" />
              </MenuButton>
              <Transition
                as={MenuItems}
                enter="transition ease-out"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
                className="dark:border-dark-500 dark:bg-dark-700 absolute z-100 mt-1.5 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 outline-hidden focus-visible:outline-hidden ltr:right-0 rtl:left-0 dark:shadow-none"
              >
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={clsx(
                        "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                        focus &&
                          "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                      )}
                      onClick={() => exportTableToExcel()}
                    >
                      <span>{t("nav.export.export_excel")}</span>
                    </button>
                  )}
                </MenuItem>
              </Transition>
            </Menu>

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
                      onClick={() => {
                        navigate("/purchase/add");
                      }}
                    >
                      <span>{t("nav.purchase.add_purchase")}</span>
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
          <div
            className={clsx(
              "hide-scrollbar flex shrink-0 space-x-2 overflow-x-auto pt-4 pb-1",
              isFullScreenEnabled ? "px-4 sm:px-5" : "px-(--margin-x)",
            )}
          >
            <Filters
              table={table}
              onDateRangeChange={onDateRangeChange}
              companyId={companyId}
              setCompanyId={setCompanyId}
              supplierId={supplierId}
              setSupplierId={setSupplierId}
              startDate={startDate}
              endDate={endDate}
            />
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
            <Filters
              table={table}
              onDateRangeChange={onDateRangeChange}
              companyId={companyId}
              setCompanyId={setCompanyId}
              supplierId={supplierId}
              setSupplierId={setSupplierId}
              startDate={startDate}
              endDate={endDate}
            />
          </div>

          <TableConfig table={table} />
        </div>
      )}
    </div>
  );
}

function SearchInput({ table }) {
  const { t } = useTranslation();

  return (
    <Input
      value={table.getState().globalFilter}
      onChange={(e) => table.setGlobalFilter(e.target.value)}
      prefix={<MagnifyingGlassIcon className="size-4" />}
      classNames={{
        input: "ring-primary-500/50 h-8 text-xs focus:ring-3",
        root: "shrink-0",
      }}
      placeholder={t("nav.search_placeholder")}
    />
  );
}

function Filters({
  table,
  onDateRangeChange,
  companyId,
  setCompanyId,
  supplierId,
  setSupplierId,
  startDate,
  endDate,
}) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const { t } = useTranslation();

  const [company, setCompany] = useState([]);

  const [supplier, setSupplier] = useState([]);

  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const companyResponse = await fetch(
        `${API_URL}/api/company/get_all_company`,
      );

      const companyResult = await companyResponse.json();

      const companyData = [
        {
          key: -1,
          value: "",
          label: t("nav.all_companies"),
          disabled: false,
        },
        ...(Array.isArray(companyResult?.data) ? companyResult.data : []).map(
          (item, key) => ({
            key,
            value: item?.id,
            label: item?.name,
            disabled: false,
          }),
        ),
      ];

      setCompany(companyData);
    };

    fetchData();
  }, [t]);

  useEffect(() => {
    const fetchData = async () => {
      const supplierResponse = await fetch(
        `${API_URL}/api/supplier/get_all_suppliers`,
      );

      const supplierResult = await supplierResponse.json();

      const supplierData = [
        {
          key: -1,
          value: "",
          label: "",
          disabled: false,
        },
        ...(Array.isArray(supplierResult?.data) ? supplierResult.data : []).map(
          (item, key) => ({
            key,
            value: item?.id,
            label: item?.name,
            disabled: false,
          }),
        ),
      ];

      setSupplier(supplierData);
    };

    fetchData();
  }, [t]);

  return (
    <>
      {table.getColumn("timestamp") && (
        <DateFilter
          onChange={onDateRangeChange}
          value={[startDate, endDate]}
          title={t("nav.purchase.purchase_date_range")}
          config={{
            mode: "range",
          }}
        />
      )}

      {user.role === "admin" && (
        <Select
          value={companyId || ""}
          data={company}
          onChange={(e) => {
            setCompanyId(e.target.value);
          }}
          placeholder={t("nav.all_companies")}
          className="h-8 min-w-30 py-1 text-xs"
        />
      )}

      <Combobox
        data={supplier}
        value={supplier.find((s) => s.value === supplierId) || null}
        onChange={(selected) => setSupplierId(selected?.value || "")}
        placeholder={t("nav.all_suppliers")}
        displayField="label"
        searchFields={["label"]}
        className="h-8 min-w-70 text-xs"
      />

      {isFiltered && (
        <Button
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2.5 text-xs whitespace-nowrap"
        >
          {t("nav.reset_filters")}
        </Button>
      )}
    </>
  );
}

Toolbar.propTypes = {
  table: PropTypes.object.isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
};

SearchInput.propTypes = {
  table: PropTypes.object.isRequired,
};

Filters.propTypes = {
  table: PropTypes.object.isRequired,
  onDateRangeChange: PropTypes.func.isRequired,
};
