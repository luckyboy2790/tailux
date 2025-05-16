// Import Dependencies
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Label,
  Transition,
} from "@headlessui/react";
import PropTypes from "prop-types";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { forwardRef, Fragment, useState } from "react";

// Local Imports
import { Input, InputErrorMsg, Tag } from "components/ui";
import { randomId } from "utils/randomId";

// ----------------------------------------------------------------------

const Tags = forwardRef(
  ({ onChange, value, error, label, placeholder, ...rest }, ref) => {
    const [query, setQuery] = useState("");

    const onChangeList = (list) => {
      if (list[list.length - 1].value !== "") {
        onChange(list);
        setQuery("");
      }
    };

    return (
      <Combobox
        onChange={onChangeList}
        value={value}
        multiple
        as="div"
        className="flex flex-col"
        ref={ref}
        {...rest}
      >
        {({ open, value: selectedValue }) => (
          <>
            {label && <Label>{label}</Label>}

            <div className="relative mt-1">
              <div>
                <ComboboxButton
                  as="div"
                  className={clsx(
                    "relative w-full cursor-default overflow-hidden rounded-lg border px-3 py-2 text-start outline-hidden transition-colors focus:outline-hidden ltr:pr-9 rtl:pl-9",
                    error
                      ? "border-error dark:border-error-lighter"
                      : "border-gray-300 focus-within:border-primary-600! hover:border-gray-400 dark:border-dark-450 dark:focus-within:border-primary-500! dark:hover:border-dark-400",
                  )}
                >
                  <ul className="flex flex-wrap gap-1.5">
                    {selectedValue.length > 0 &&
                      selectedValue.map((val) => (
                        <li key={val.id}>
                          <Tag component="button" type="button">
                            {val.value}
                          </Tag>
                        </li>
                      ))}

                    {placeholder && value.length === 0 && query === "" && (
                      <span className="pointer-events-none absolute top-1/2 -translate-y-1/2 px-3 py-2 ltr:left-0 rtl:right-0">
                        {placeholder}
                      </span>
                    )}

                    <ComboboxInput
                      as={Input}
                      unstyled
                      classNames={{
                        root: "flex-1",
                      }}
                      displayValue={(item) => item.value}
                      autoComplete="off"
                      onKeyDown={(event) => {
                        value.length > 0 &&
                          event.keyCode === 8 &&
                          event.target.value === "" &&
                          onChange(value.slice(0, -1));
                      }}
                      onChange={(event) => {
                        setQuery(event.target.value.trim());
                      }}
                      value={query}
                    />
                  </ul>
                  <div className="absolute inset-y-0 flex cursor-pointer items-center ltr:right-0 ltr:pr-2 rtl:left-0 rtl:pl-2">
                    <ChevronDownIcon
                      className={clsx(
                        "size-5 text-gray-400 transition-transform dark:text-dark-300",
                        open && "rotate-180",
                      )}
                      aria-hidden="true"
                    />
                  </div>
                </ComboboxButton>
                <InputErrorMsg when={error && typeof error !== "boolean"}>
                  {error}
                </InputErrorMsg>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out"
                enterFrom="opacity-0 translate-y-2"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-2"
              >
                <ComboboxOptions className="absolute z-10 max-h-60 w-full overflow-y-auto overflow-x-hidden rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 outline-hidden focus-visible:outline-hidden dark:border-dark-500 dark:bg-dark-700 dark:shadow-none">
                  <ComboboxOption
                    className={({ selected, focus }) =>
                      clsx(
                        "relative cursor-pointer select-none px-4 py-2 outline-hidden transition-colors",
                        focus && !selected && "bg-gray-100 dark:bg-dark-600",
                        selected
                          ? "bg-primary-600 text-white dark:bg-primary-500"
                          : "text-gray-800 dark:text-dark-100",
                      )
                    }
                    value={{ id: randomId(), value: query }}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          Value: {query}
                        </span>
                      </>
                    )}
                  </ComboboxOption>
                </ComboboxOptions>
              </Transition>
            </div>
          </>
        )}
      </Combobox>
    );
  },
);

Tags.displayName = "Tags";

Tags.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.array,
  label: PropTypes.node,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.node]),
  placeholder: PropTypes.string,
};

export { Tags };
