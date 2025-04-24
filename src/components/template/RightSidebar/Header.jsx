// Import Dependencies
import PropTypes from "prop-types";
import dayjs from "dayjs";                  
import { CalendarIcon, XMarkIcon } from "@heroicons/react/24/outline";

// Local Imports
import { Button } from "components/ui";
import { useLocaleContext } from "app/contexts/locale/context";

// ----------------------------------------------------------------------

export function Header({ close }) {
  const { locale } = useLocaleContext();
  const now = dayjs().locale(locale).format("DD MMMM, YYYY");

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex shrink-0 items-center gap-1.5">
        <CalendarIcon className="size-4" />
        <span>{now}</span>
      </div>
      <Button
        onClick={close}
        variant="flat"
        isIcon
        className="size-6 rounded-full ltr:-mr-1 rtl:-ml-1"
      >
        <XMarkIcon className="size-4" />
      </Button>
    </div>
  );
}

Header.propTypes = {
  close: PropTypes.func,
};
