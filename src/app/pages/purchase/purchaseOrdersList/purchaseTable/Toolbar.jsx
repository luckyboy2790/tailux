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
import { useAuthContext } from "app/contexts/auth/context";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export function Toolbar({
  table,
  onDateRangeChange,
  companyId,
  setCompanyId,
  supplierId,
  setSupplierId,
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
              companyId={companyId}
              setCompanyId={setCompanyId}
              supplierId={supplierId}
              setSupplierId={setSupplierId}
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
            />
          </div>

          <TableConfig table={table} />
        </div>
      )}
    </div>
  );
}

function SearchInput({ table }) {
  return (
    <Input
      value={table.getState().globalFilter}
      onChange={(e) => table.setGlobalFilter(e.target.value)}
      prefix={<MagnifyingGlassIcon className="size-4" />}
      classNames={{
        input: "ring-primary-500/50 h-8 text-xs focus:ring-3",
        root: "shrink-0",
      }}
      placeholder="Search ID, Customer..."
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
}) {
  const isFiltered = table.getState().columnFilters.length > 0;

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
          label: "All Companies",
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
  }, []);

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
          label: "All Suppliers",
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
  }, []);

  return (
    <>
      {table.getColumn("timestamp") && (
        <DateFilter
          onChange={onDateRangeChange}
          title="Purchase Date Range"
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
        value={supplierId || ""}
        data={supplier}
        onChange={(e) => {
          setSupplierId(e.target.value);
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
