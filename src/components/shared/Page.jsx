// Import Dependencies
import PropTypes from "prop-types";
import { Fragment } from "react";

// Local Imports
import { APP_NAME } from "constants/app.constant";
import { useDocumentTitle } from "hooks";

// ----------------------------------------------------------------------

const Page = ({ title = "", component = Fragment, children }) => {
  const Component = component;
  useDocumentTitle(title + " - " + APP_NAME);
  return <Component>{children}</Component>;
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  component: PropTypes.elementType,
};

export { Page };
