// Import Dependencies
import PropTypes from "prop-types";

// Local Import
import { useClipboard } from "hooks";

// ----------------------------------------------------------------------

const CopyButton = ({ timeout, value, children, ...rest }) => {
  const clipboard = useClipboard({ timeout });
  const copy = () => clipboard.copy(value);
  return <>{children({ copy, copied: clipboard.copied, ...rest })}</>;
};

CopyButton.propTypes = {
  children: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  timeout: PropTypes.number,
};

CopyButton.displayName = "CopyButton";

export { CopyButton };
