export const statusFilter = (row, columnId, filterValues) => {
  const { total, paid } = row.original;

  let status = "paid";
  if (paid === 0) status = "pending";
  else if (paid < total) status = "partial";

  return filterValues.includes(status);
};
