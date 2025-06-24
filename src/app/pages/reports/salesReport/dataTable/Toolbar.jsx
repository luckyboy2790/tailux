// Import Dependencies
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import PropTypes from "prop-types";

// Local Imports
import { DateFilter } from "components/shared/table/DateFilter";
import { Button, Input, Select } from "components/ui";
import { TableConfig } from "./TableConfig";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "app/contexts/auth/context";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export function Toolbar({
  table,
  onDateRangeChange,
  startDate,
  endDate,
  companyId,
  setCompanyId,
  customerId,
  setCustomerId,
}) {
  const { isXs } = useBreakpointsContext();
  const isFullScreenEnabled = table.getState().tableSettings.enableFullScreen;

  return (
    <div className="table-toolbar">
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
              startDate={startDate}
              endDate={endDate}
              companyId={companyId}
              setCompanyId={setCompanyId}
              customerId={customerId}
              setCustomerId={setCustomerId}
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
              startDate={startDate}
              endDate={endDate}
              companyId={companyId}
              setCompanyId={setCompanyId}
              customerId={customerId}
              setCustomerId={setCustomerId}
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

function Filters({
  table,
  onDateRangeChange,
  startDate,
  endDate,
  companyId,
  setCompanyId,
  customerId,
  setCustomerId,
}) {
  const { t } = useTranslation();

  const isFiltered = table.getState().columnFilters.length > 0;

  const [company, setCompany] = useState([]);

  const [customer, setCustomer] = useState([]);

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
          label: t("nav.select.select_company"),
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
      const customerResponse = await fetch(
        `${API_URL}/api/customer/get_all_customers`,
      );

      const customerResult = await customerResponse.json();

      const customerData = [
        {
          key: -1,
          value: "",
          label: t("nav.select.select_customer"),
          disabled: false,
        },
        ...(Array.isArray(customerResult?.data) ? customerResult.data : []).map(
          (item, key) => ({
            key,
            value: item?.id,
            label: item?.company,
            disabled: false,
          }),
        ),
      ];

      setCustomer(customerData);
    };

    fetchData();
  }, [t]);

  return (
    <>
      {table.getColumn("timestamp") && (
        <DateFilter
          onChange={onDateRangeChange}
          value={[startDate, endDate]}
          title={t("nav.sale.sale_date_range")}
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
          className="h-8 min-w-30 py-1 text-xs"
        />
      )}

      <Select
        value={customerId || ""}
        data={customer}
        onChange={(e) => {
          setCustomerId(e.target.value);
        }}
        className="h-8 min-w-30 py-1 text-xs"
      />

      {isFiltered && (
        <Button
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2.5 text-xs whitespace-nowrap"
        >
          Reset Filters
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
