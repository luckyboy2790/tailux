// Import Dependencies
import PropTypes from "prop-types";
import { forwardRef } from "react";
import clsx from 'clsx'

// Local Imports
import { Box } from "components/ui";
import { useThemeContext } from "app/contexts/theme/context";

// -------------------------------------------------------------

const Card = forwardRef((props, ref) => {
  const { cardSkin } = useThemeContext();

  const { skin = cardSkin, children, className, ...rest } = props;

  return (
    <Box
      ref={ref}
      className={clsx(
        "card rounded-lg",
        skin &&
          skin !== "none" && [
            skin === "bordered" &&
              "border border-gray-200 dark:border-dark-600 print:border-0",
            skin === "shadow-sm" &&
              "bg-white shadow-soft dark:bg-dark-700 dark:shadow-none print:shadow-none",
          ],
        className,
      )}
      {...rest}
    >
      {children}
    </Box>
  );
});

Card.displayName = "Card";

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  skin: PropTypes.oneOf(["none", "bordered", "shadow-sm"]),
};

export { Card };
