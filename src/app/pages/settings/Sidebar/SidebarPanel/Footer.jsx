// Import Dependencies
import { Radio, RadioGroup } from "@headlessui/react";
import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

// Local Imports
import { Button } from "components/ui";
import { useThemeContext } from "app/contexts/theme/context";

// ----------------------------------------------------------------------

export function Footer() {
  const { themeMode, setThemeMode } = useThemeContext();

  return (
    <div className="flex px-4 py-3">
      <RadioGroup
        value={themeMode}
        onChange={setThemeMode}
        className="flex w-max min-w-full rounded-lg bg-gray-200 px-1.5 py-1 text-gray-600 dark:bg-dark-700 dark:text-dark-200"
      >
        <Radio
          value="system"
          className={({ checked }) =>
            clsx(
              "flex-1 shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 font-medium",
              checked
                ? "bg-white shadow-sm dark:bg-dark-500 dark:text-dark-100"
                : "hover:text-gray-800 focus:text-gray-800 dark:hover:text-dark-100 dark:focus:text-dark-100",
            )
          }
          as={Button}
          unstyled
        >
          <ComputerDesktopIcon className="size-5" />
        </Radio>
        <Radio
          value="light"
          className={({ checked }) =>
            clsx(
              "flex-1 shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 font-medium",
              checked
                ? "bg-white shadow-sm dark:bg-dark-500 dark:text-dark-100"
                : "hover:text-gray-800 focus:text-gray-800 dark:hover:text-dark-100 dark:focus:text-dark-100",
            )
          }
          as={Button}
          unstyled
        >
          <SunIcon className="size-5" />
        </Radio>
        <Radio
          value="dark"
          className={({ checked }) =>
            clsx(
              "flex-1 shrink-0 whitespace-nowrap rounded-lg px-3 py-1.5 font-medium",
              checked
                ? "bg-white shadow-sm dark:bg-dark-500 dark:text-dark-100"
                : "hover:text-gray-800 focus:text-gray-800 dark:hover:text-dark-100 dark:focus:text-dark-100",
            )
          }
          as={Button}
          unstyled
        >
          <MoonIcon className="size-5" />
        </Radio>
      </RadioGroup>
    </div>
  );
}
