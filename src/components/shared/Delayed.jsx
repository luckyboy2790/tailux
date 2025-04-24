// Import Dependencies
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// ----------------------------------------------------------------------

export function Delayed({ children, wait = 300 }) {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, wait);
    return () => clearTimeout(timer);
  }, [wait]);

  if (!children) throw new Error("No children provided");

  return isShown ? children : null;
}

Delayed.propTypes = {
  children: PropTypes.node,
  wait: PropTypes.number,
};
