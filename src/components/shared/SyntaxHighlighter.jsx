// Import Dependencies
import PropTypes from "prop-types";
import { PrismLight } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";

PrismLight.registerLanguage("jsx", jsx);

// ----------------------------------------------------------------------

function SyntaxHighlighter({ children, ...rest }) {
  return (
    <PrismLight style={atomDark} {...rest}>
      {children}
    </PrismLight>
  );
}

SyntaxHighlighter.propTypes = {
  children: PropTypes.node,
};

export { SyntaxHighlighter };
