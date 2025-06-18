// Import Dependencies
import PropTypes from "prop-types";

// Local Imports
import {
  Pagination,
  PaginationItems,
  PaginationNext,
  PaginationPrevious,
  Select,
} from "components/ui";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

export function PaginationSection({
  table,
  total,
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
}) {
  const { t } = useTranslation();
  const { isXl, is2xl } = useBreakpointsContext();

  return (
    <div className="flex flex-col justify-between space-y-4 sm:flex-row sm:items-center sm:space-y-0">
      <div className="text-xs-plus flex items-center space-x-2">
        <span>{t("nav.pagination.show")}</span>
        <Select
          data={[10, 20, 30, 40, 50, 100, 200, 300, 400, 500]}
          value={pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
            setPageSize(Number(e.target.value));
          }}
          classNames={{
            root: "w-fit",
            select: "h-7 rounded-full py-1 text-xs ltr:pr-7! rtl:pl-7!",
          }}
        />
        <span>{t("nav.pagination.entries")}</span>
      </div>
      <div>
        <Pagination
          total={Math.ceil(total / pageSize)}
          value={pageIndex + 1}
          onChange={(page) => {
            table.setPageIndex(page - 1);
            setPageIndex(page - 1);
          }}
          siblings={isXl ? 2 : is2xl ? 3 : 1}
          boundaries={isXl ? 2 : 1}
        >
          <PaginationPrevious />
          <PaginationItems />
          <PaginationNext />
        </Pagination>
      </div>
      <div className="text-xs-plus truncate">
        {pageIndex * pageSize + 1} -{" "}
        {pageSize > total ? total : (pageIndex + 1) * pageSize}{" "}
        {t("nav.pagination.of")} {total} {t("nav.pagination.entries")}
      </div>
    </div>
  );
}

PaginationSection.propTypes = {
  table: PropTypes.object,
};
