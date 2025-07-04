// Import Dependencies
import dayjs from "dayjs";
import PropTypes from "prop-types";

// Local Imports
import { Highlight } from "components/shared/Highlight";
import { Badge } from "components/ui";
import { useLocaleContext } from "app/contexts/locale/context";
import { ensureString } from "utils/ensureString";

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

  const createdAt = row.original?.created_at;

  const date = dayjs(timestapms).locale(locale).format("DD MMM YYYY");
  const time = dayjs(createdAt).locale(locale).format("hh:mm A");
  return (
    <>
      <p className="font-medium">{date}</p>
      <p className="dark:text-dark-300 mt-0.5 text-xs text-gray-400">{time}</p>
    </>
  );
}

export function CustomerCell({ getValue, column, table }) {
  const globalQuery = ensureString(table.getState().globalFilter);
  const columnQuery = ensureString(column.getFilterValue());

  const name = getValue();

  return (
    <div className="flex items-center space-x-4">
      <span className="dark:text-dark-100 font-medium text-gray-800">
        <Highlight query={[globalQuery, columnQuery]}>{name || ""}</Highlight>
      </span>
    </div>
  );
}

export function UserCell({ row, column, table }) {
  const globalQuery = ensureString(table.getState().globalFilter);
  const columnQuery = ensureString(column.getFilterValue());

  const name = `${row.original.user_first_name} ${row.original.user_last_name}`;

  return (
    <div className="flex items-center space-x-4">
      <span className="dark:text-dark-100 font-medium text-gray-800">
        <Highlight query={[globalQuery, columnQuery]}>{name || ""}</Highlight>
      </span>
    </div>
  );
}

export function TypeCell({ row, column, table }) {
  const globalQuery = ensureString(table.getState().globalFilter);
  const columnQuery = ensureString(column.getFilterValue());

  const type =
    row.original.paymentable_type === "App\\Models\\Purchase"
      ? "Purchase"
      : "Sale";

  const type_data = `${type} (${row.original.paymentable.reference_no})`;

  return (
    <div className="flex items-center space-x-4">
      <span className="dark:text-dark-100 font-medium text-gray-800">
        <Highlight query={[globalQuery, columnQuery]}>
          {type_data || ""}
        </Highlight>
      </span>
    </div>
  );
}

export function TotalCell({ getValue }) {
  const value = Number(getValue());

  return (
    <p className="text-sm-plus dark:text-dark-100 font-medium text-gray-800">
      ${!isNaN(value) ? Number(value).toLocaleString() : "0"}
    </p>
  );
}

export function ProfitCell({ getValue, row }) {
  const value = Number(getValue());

  return (
    <div className="flex items-center space-x-2">
      <p className="dark:text-dark-100 text-gray-800">
        ${!isNaN(value) ? Number(value).toLocaleString() : "0"}
      </p>
      <Badge className="rounded-full" color="success" variant="soft">
        {(Number(row.original?.paid_amount) /
          Number(row.original?.grand_total)) *
          100}
        %
      </Badge>
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

UserCell.propTypes = {
  row: PropTypes.object,
  column: PropTypes.object,
  table: PropTypes.object,
};

TypeCell.propTypes = {
  row: PropTypes.object,
  column: PropTypes.object,
  table: PropTypes.object,
};
