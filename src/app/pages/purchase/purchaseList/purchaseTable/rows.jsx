// Import Dependencies
import dayjs from "dayjs";
import PropTypes from "prop-types";
// import clsx from "clsx";
import {
  Listbox,
  ListboxButton,
  // ListboxOption,
  // ListboxOptions,
  // Transition,
} from "@headlessui/react";
// import { CheckIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

// Local Imports
import { Highlight } from "components/shared/Highlight";
import { Badge, Tag } from "components/ui";
import { useLocaleContext } from "app/contexts/locale/context";
import { ensureString } from "utils/ensureString";
import { getOrderStatusOptions } from "./data";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { ClockIcon } from "@heroicons/react/24/outline";

// ----------------------------------------------------------------------

export function OrderIdCell({ getValue }) {
  return (
    <span className="text-primary-600 dark:text-primary-400 font-medium">
      {getValue()}
    </span>
  );
}

export function DateCell({ getValue, row }) {
  const { locale } = useLocaleContext();
  const timestapms = getValue();
  const date = dayjs(timestapms).locale(locale).format("DD MMM YYYY");
  const time = dayjs(timestapms).locale(locale).format("hh:mm A");
  return (
    <>
      <p
        className={clsx(
          "font-medium",
          row.original?.status === 0 && "text-red-700",
        )}
      >
        {date}
      </p>
      <p
        className={clsx(
          "mt-0.5 text-xs text-gray-400",
          row.original?.status === 0 ? "text-red-700" : "dark:text-dark-300",
        )}
      >
        {time}
      </p>
    </>
  );
}

export function CustomerCell({ getValue, column, table, row }) {
  const globalQuery = ensureString(table.getState().globalFilter);
  const columnQuery = ensureString(column.getFilterValue());

  const name = getValue();

  return (
    <div className="flex items-center space-x-4">
      <span
        className={clsx(
          "font-medium text-gray-800",
          row.original?.status === 0 ? "text-red-600" : "dark:text-dark-100",
        )}
      >
        <Highlight query={[globalQuery, columnQuery]}>{name || ""}</Highlight>
      </span>
    </div>
  );
}

export function TotalCell({ getValue, row }) {
  const value = Number(getValue());

  return (
    <p
      className={clsx(
        "text-sm-plus",
        row.original?.status === 0 ? "text-red-600" : "dark:text-dark-100",
      )}
    >
      {`${value < 0 ? "-" : ""}$${Math.abs(Number(value)).toLocaleString()}`}
    </p>
  );
}

export function ProfitCell({ getValue, row }) {
  const value = Number(getValue());

  return (
    <div className="flex items-center space-x-2">
      <p
        className={clsx(
          "text-gray-800",
          row.original?.status === 0 ? "text-red-600" : "dark:text-dark-100",
        )}
      >
        ${!isNaN(value) ? Number(value).toLocaleString() : "0"}
      </p>
      <Badge className="rounded-full" color="success" variant="soft">
        {Math.round(
          (Number(row.original?.paid_amount) /
            Number(row.original?.grand_total)) *
            100,
        )}
        %
      </Badge>
    </div>
  );
}

export function OrderStatusCell({ getValue, row, column, table }) {
  const val = getValue();

  const { t } = useTranslation();
  const orderStatusOptions = getOrderStatusOptions(t);

  let purchaseStatus;

  if (val?.paid_amount < val?.grand_total) {
    purchaseStatus = "pending";
  } else if (val?.paid_amount === 0) {
    purchaseStatus = "partial";
  } else {
    purchaseStatus = "paid";
  }

  const option = orderStatusOptions.find(
    (item) => item.value === purchaseStatus,
  );

  const handleChangeStatus = (status) => {
    table.options.meta?.updateData(row.index, column.id, status);
    toast.success(`Order status updated to ${option.label}`);
  };

  return (
    <div className="flex flex-col gap-1">
      <Listbox onChange={handleChangeStatus} value={val}>
        <ListboxButton
          as={Tag}
          component="button"
          color={option.color}
          className="cursor-pointer gap-1.5"
        >
          {option.icon && <option.icon className="h-4 w-4" />}

          <span>{option.label}</span>
        </ListboxButton>
      </Listbox>

      {row.original?.payments.filter((i) => i.status === 0).length > 0 && (
        <Listbox onChange={handleChangeStatus} value={val}>
          <ListboxButton
            as={Tag}
            component="button"
            color="warning"
            className="cursor-pointer gap-1.5"
          >
            <ClockIcon className="h-4 w-4" />

            <span>{t("nav.purchase.p_payment")}</span>
          </ListboxButton>
        </Listbox>
      )}

      {row.original?.preturns.filter((i) => i.status === 0).length > 0 && (
        <Listbox onChange={handleChangeStatus} value={val}>
          <ListboxButton
            as={Tag}
            component="button"
            color="warning"
            className="cursor-pointer gap-1.5"
          >
            <ClockIcon className="h-4 w-4" />

            <span>{t("nav.purchase.p_return")}</span>
          </ListboxButton>
        </Listbox>
      )}
    </div>
  );
}

export function AddressCell({ getValue, column, table }) {
  const globalQuery = ensureString(table.getState().globalFilter);
  const columnQuery = ensureString(column.getFilterValue());
  const val = getValue();

  return (
    <p className="text-xs-plus w-48 truncate xl:w-56 2xl:w-64">
      <Highlight query={[globalQuery, columnQuery]}>{val || ""}</Highlight>
    </p>
  );
}

OrderIdCell.propTypes = {
  getValue: PropTypes.func,
  row: PropTypes.object,
};

DateCell.propTypes = {
  getValue: PropTypes.func,
  row: PropTypes.object,
};

TotalCell.propTypes = {
  getValue: PropTypes.func,
  row: PropTypes.object,
};

ProfitCell.propTypes = {
  getValue: PropTypes.func,
  row: PropTypes.object,
};

OrderStatusCell.propTypes = {
  getValue: PropTypes.func,
  row: PropTypes.object,
  column: PropTypes.object,
  table: PropTypes.object,
};

AddressCell.propTypes = {
  getValue: PropTypes.func,
  column: PropTypes.object,
  table: PropTypes.object,
};

CustomerCell.propTypes = {
  row: PropTypes.object,
  column: PropTypes.object,
  table: PropTypes.object,
  getValue: PropTypes.func,
};
