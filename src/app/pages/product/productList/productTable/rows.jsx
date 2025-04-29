// Import Dependencies
import dayjs from "dayjs";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

// Local Imports
import { Highlight } from "components/shared/Highlight";
import { Avatar, Badge, Tag } from "components/ui";
import { useLocaleContext } from "app/contexts/locale/context";
import { ensureString } from "utils/ensureString";
import { orderStatusOptions } from "./data";

// ----------------------------------------------------------------------

export function OrderIdCell({ getValue }) {
  return (
    <span className="font-medium text-primary-600 dark:text-primary-400">
      {getValue()}
    </span>
  );
}

export function DateCell({ getValue }) {
  const { locale } = useLocaleContext();
  const timestapms = getValue();
  const date = dayjs(timestapms).locale(locale).format("DD MMM YYYY");
  const time = dayjs(timestapms).locale(locale).format("hh:mm A");
  return (
    <>
      <p className="font-medium">{date}</p>
      <p className="mt-0.5 text-xs text-gray-400 dark:text-dark-300">{time}</p>
    </>
  );
}

export function CustomerCell({ row, getValue, column, table }) {
  const globalQuery = ensureString(table.getState().globalFilter);
  const columnQuery = ensureString(column.getFilterValue());

  const name = getValue();

  return (
    <div className="flex items-center space-x-4 ">
      <Avatar
        size={9}
        name={name}
        src={row.original.customer.avatar_img}
        classNames={{
          display: "mask is-squircle rounded-none text-sm",
        }}
      />
      <span className="font-medium text-gray-800 dark:text-dark-100">
        <Highlight query={[globalQuery, columnQuery]}>{name}</Highlight>
      </span>
    </div>
  );
}

export function TotalCell({ getValue }) {
  return (
    <p className="text-sm-plus font-medium text-gray-800 dark:text-dark-100">
      ${getValue().toFixed(1)}
    </p>
  );
}

export function ProfitCell({ getValue, row }) {
  return (
    <div className="flex items-center space-x-2 ">
      <p className="text-gray-800 dark:text-dark-100">
        ${getValue().toFixed(1)}
      </p>
      <Badge className="rounded-full" color="success" variant="soft">
        {((row.original.profit / row.original.total) * 100).toFixed(0)}%
      </Badge>
    </div>
  );
}

export function OrderStatusCell({ getValue, row, column, table }) {
  const val = getValue();
  const option = orderStatusOptions.find((item) => item.value === val);

  const handleChangeStatus = (status) => {
    table.options.meta?.updateData(row.index, column.id, status);
    toast.success(`Order status updated to ${option.label}`);
  };

  return (
    <Listbox onChange={handleChangeStatus} value={val}>
      <ListboxButton
        as={Tag}
        component="button"
        color={option.color}
        className="gap-1.5 cursor-pointer"
      >
        {option.icon && <option.icon className="h-4 w-4" />}

        <span>{option.label}</span>
      </ListboxButton>
      <Transition
        as={ListboxOptions}
        enter="transition ease-out"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
        anchor={{ to: "bottom start", gap: "8px" }}
        className="max-h-60 z-100 w-40 overflow-auto rounded-lg border border-gray-300 bg-white py-1 text-xs-plus capitalize shadow-soft outline-hidden focus-visible:outline-hidden dark:border-dark-500 dark:bg-dark-750 dark:shadow-none"
      >
        {orderStatusOptions.map((item) => (
          <ListboxOption
            key={item.value}
            value={item.value}
            className={({ focus }) =>
              clsx(
                "relative flex cursor-pointer select-none items-center justify-between space-x-2 px-3 py-2 text-gray-800 outline-hidden transition-colors dark:text-dark-100 ",
                focus && "bg-gray-100 dark:bg-dark-600",
              )
            }
          >
            {({ selected }) => (
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="size-4.5 stroke-1" />}
                  <span className="block truncate">{item.label}</span>
                </div>
                {selected && <CheckIcon className="-mr-1 size-4.5 stroke-1" />}
              </div>
            )}
          </ListboxOption>
        ))}
      </Transition>
    </Listbox>
  );
}

export function AddressCell({ getValue, column, table }) {
  const globalQuery = ensureString(table.getState().globalFilter);
  const columnQuery = ensureString(column.getFilterValue());
  const val = getValue();

  return (
    <p className="w-48 truncate text-xs-plus xl:w-56 2xl:w-64">
      <Highlight query={[globalQuery, columnQuery]}>{val}</Highlight>
    </p>
  );
}

OrderIdCell.propTypes = {
  getValue: PropTypes.func,
};

DateCell.propTypes = {
  getValue: PropTypes.func,
};

TotalCell.propTypes = {
  getValue: PropTypes.func,
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
