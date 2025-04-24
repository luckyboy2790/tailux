// Import Dependencies
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import clsx from "clsx";
import { useState } from "react";

// Local Imports
import { Button, Spinner } from "components/ui";
import { useLocaleContext } from "app/contexts/locale/context";
import { locales } from "i18n/langs";

// ----------------------------------------------------------------------

const langs = Object.keys(locales).map((key) => ({
  value: key,
  label: locales[key].label,
  flag: locales[key].flag,
}));

const LanguageSelector = () => {
  const [loading, setLoading] = useState();
  const { locale, updateLocale } = useLocaleContext();

  const onLanguageSelect = async (lang) => {
    setLoading(true);
    try {
      await updateLocale(lang);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Listbox as="div" value={locale} onChange={onLanguageSelect}>
      <div className="relative">
        <ListboxButton
          as={Button}
          variant="flat"
          isIcon
          className="size-9 rounded-full"
        >
          {loading ? (
            <Spinner color="primary" className="size-5" />
          ) : (
            <img
              className="size-6"
              src={`/images/flags/svg/rounded/${locales[locale].flag}.svg`}
              alt={locale}
            />
          )}
        </ListboxButton>
        <Transition
          enter="transition ease-out"
          enterFrom="opacity-0 translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-2"
        >
          <ListboxOptions
            anchor={{ to: "bottom end", gap: 8 }}
            className="z-101 w-min min-w-[10rem] overflow-y-auto rounded-lg border border-gray-300 bg-white py-1 font-medium shadow-lg shadow-gray-200/50 outline-hidden focus-visible:outline-hidden dark:border-dark-500 dark:bg-dark-700 dark:shadow-none ltr:right-0 rtl:left-0"
          >
            {langs.map((lang) => (
              <ListboxOption
                key={lang.value}
                className={({ selected, active }) =>
                  clsx(
                    "relative flex cursor-pointer select-none px-4 py-2 transition-colors",
                    active && !selected && "bg-gray-100 dark:bg-dark-600",
                    selected
                      ? "bg-primary-600 text-white dark:bg-primary-500"
                      : "text-gray-800 dark:text-dark-100",
                  )
                }
                value={lang.value}
              >
                <div className="flex space-x-3 ">
                  <img
                    className="size-5"
                    src={`/images/flags/svg/rounded/${lang.flag}.svg`}
                    alt={lang.value}
                  />
                  <span className="block truncate">{lang.label}</span>
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
};

export { LanguageSelector };
