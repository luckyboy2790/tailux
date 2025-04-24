/* eslint-disable no-unused-vars */
// Import Dependencies
import { CalendarIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import flatpickrCSS from "flatpickr/dist/themes/light.css?inline";

// Local Imports
import { Input } from "components/ui";
import { useLocaleContext } from "app/contexts/locale/context";
import { useMergedRef } from "hooks";
import { locales } from "i18n/langs";
import { Flatpickr } from "./Flatpickr";
import {
  injectStyles,
  insertStylesToHead,
  makeStyleTag,
} from "utils/dom/injectStylesToHead";

// ----------------------------------------------------------------------

const styles = `@layer vendor {
  ${flatpickrCSS}
}`;

const sheet = makeStyleTag();

injectStyles(sheet, styles);
insertStylesToHead(sheet);

const DatePicker = forwardRef(
  (
    {
      options: userOptions,
      className,
      isCalendar = false,
      hasCalenderIcon = true,
      ...props
    },
    ref,
  ) => {
    const fp = useRef(null);
    const { locale } = useLocaleContext();
    const [localeData, setLocaleData] = useState(null);

    useEffect(() => {
      const loadLocale = async () => {
        const load = locales[locale].flatpickr;
        if (load) {
          const loadedLocale = await load();
          setLocaleData(loadedLocale);
        } else {
          setLocaleData(null); // Fallback if no locale is found
        }
      };

      loadLocale();
    }, [locale]);

    const options = {
      inline: isCalendar,
      locale: localeData,
      ...userOptions,
    };

    useEffect(() => {
      const calendarContainer = fp.current?.flatpickr?.calendarContainer;

      if (calendarContainer) {
        calendarContainer.classList.toggle("is-calendar", isCalendar);
      }
    }, [isCalendar]);

    useImperativeHandle(ref, () => {
      return {
        focus() {
          fp.current.flatpickr.input.focus();
        },
        blur() {
          fp.current.flatpickr.input.blur();
        },
      };
    }, []);

    const mergedRef = useMergedRef(fp, ref);

    return (
      <Flatpickr
        className={clsx("cursor-pointer", isCalendar && "hidden", className)}
        options={options}
        ref={mergedRef}
        {...props}
        render={({ ...props }, ref) => {
          return isCalendar ? (
            <input ref={ref} readOnly {...props} />
          ) : (
            <Input
              ref={ref}
              prefix={
                !userOptions?.inline &&
                hasCalenderIcon && <CalendarIcon className="size-5" />
              }
              readOnly
              {...props}
            />
          );
        }}
      />
    );
  },
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
