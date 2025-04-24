// Import Dependencies
import PropTypes from "prop-types";

// Local Imports
import { useId, useUncontrolled } from "hooks";
import { AccordionContextProvider } from "./Accordion.context";

// ----------------------------------------------------------------------

const AccordionProvider = (props) => {
  const {
    children,
    multiple,
    value,
    defaultValue,
    onChange,
    id,
    transitionDuration,
    loop,
  } = props;

  const uid = useId(id, "accordion");

  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: multiple ? [] : null,
    onChange,
  });

  const isItemActive = (itemValue) =>
    Array.isArray(_value) ? _value.includes(itemValue) : itemValue === _value;

  const handleItemChange = (itemValue) => {
    const nextValue = Array.isArray(_value)
      ? _value.includes(itemValue)
        ? _value.filter((selectedValue) => selectedValue !== itemValue)
        : [..._value, itemValue]
      : itemValue === _value
        ? null
        : itemValue;

    handleChange(nextValue);
  };

  return (
    <AccordionContextProvider
      value={{
        isItemActive,
        onChange: handleItemChange,
        buttonId: `${uid}-control`,
        panelId: `${uid}-panel`,
        transitionDuration,
        loop,
      }}
    >
      {children}
    </AccordionContextProvider>
  );
};

AccordionProvider.propTypes = {
  children: PropTypes.node,
  multiple: PropTypes.bool,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  id: PropTypes.string,
  transitionDuration: PropTypes.number,
  loop: PropTypes.bool,
};

export { AccordionProvider };
