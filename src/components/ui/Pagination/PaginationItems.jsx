// Local Imports
import { usePaginationContext } from "./Pagination.context";
import { PaginationControl } from "./PaginationControl";
import { PaginationDots } from "./PaginationDots";

// ----------------------------------------------------------------------

function PaginationItems() {
  const ctx = usePaginationContext();

  const items = ctx.range.map((page, index) => {
    if (page === "dots") {
      return <PaginationDots key={index} />;
    }

    return (
      <PaginationControl
        key={index}
        active={page === ctx.active}
        aria-current={page === ctx.active ? "page" : undefined}
        onClick={() => ctx.onChange(page)}
        disabled={ctx.disabled}
        {...ctx.getItemProps?.(page)}
      >
        {page}
      </PaginationControl>
    );
  });

  return <>{items}</>;
}

PaginationItems.displayName = "PaginationItems";

export { PaginationItems };
