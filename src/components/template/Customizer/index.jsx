// Import Dependencies
import PropTypes from "prop-types";
import {
  Dialog,
  DialogPanel,
  Label,
  Radio,
  RadioGroup,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

// Local Imports
import { useDisclosure } from "hooks";
import SettingIcon from "assets/dualicons/setting.svg?react";
import { useThemeContext } from "app/contexts/theme/context";
import { colors } from "constants/colors.constant";
import { range } from "utils/range";
import { Button, ScrollShadow } from "components/ui";
import { Listbox } from "components/shared/form/Listbox";

// ----------------------------------------------------------------------

const lightColors = ["slate", "gray", "neutral"];
const darkColors = ["mint", "navy", "mirage", "cinder", "black"];
const primaryColors = ["indigo", "blue", "green", "amber", "purple", "rose"];

const cardSkins = [
  {
    value: "shadow-sm",
    label: "Shadow",
  },
  {
    value: "bordered",
    label: "Bordered",
  },
];

export default function Customizer() {
  const [isOpen, { open, close }] = useDisclosure();

  return (
    <>
      <Button
        onClick={open}
        color="primary"
        isIcon
        className="fixed top-1/2 z-50 size-9 rounded-full ltr:right-0 ltr:rounded-r-none rtl:left-0 rtl:rounded-l-none"
      >
        <SettingIcon
          className="size-6 animate-spin"
          style={{ animationDuration: "2s" }}
        />
      </Button>

      <Transition show={isOpen}>
        <Dialog open={true} onClose={close} static autoFocus>
          <TransitionChild
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="fixed inset-0 z-60 bg-gray-900/50 transition-opacity dark:bg-black/40"
          />

          <TransitionChild
            as={DialogPanel}
            enter="ease-out transform-gpu transition-transform duration-200"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="ease-in transform-gpu transition-transform duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
            className="fixed inset-y-0 right-0 z-61 flex w-screen transform-gpu flex-col bg-white transition-transform duration-200 dark:bg-dark-750/80 backdrop-blur-sm sm:inset-y-2 sm:mx-2 sm:w-80 sm:rounded-xl"
          >
            <CustomizerContent close={close} />
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}

function CustomizerContent({ close }) {
  const theme = useThemeContext();

  return (
    <>
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex shrink-0 items-center gap-1.5">
          <SettingIcon className="size-5" />
          <span>Theme Customizer</span>
        </div>
        <Button
          onClick={close}
          variant="flat"
          isIcon
          className="size-6 rounded-full ltr:-mr-1 rtl:-ml-1"
        >
          <XMarkIcon className="size-4" />
        </Button>
      </div>
      <ScrollShadow
        size={4}
        className="custom-scrollbar h-auto overflow-y-auto overscroll-contain px-3 pb-5"
      >
        <RadioGroup
          value={theme.themeMode}
          onChange={theme.setThemeMode}
          className="mt-1"
        >
          <Label className="font-medium text-gray-800 dark:text-dark-100">
            Theme Mode
          </Label>
          <div className="mt-2.5 grid grid-cols-3 gap-2.5">
            <Radio value="system" className="cursor-pointer outline-hidden">
              {({ checked }) => (
                <>
                  <div
                    className={clsx(
                      "relative overflow-hidden rounded-lg border-2 bg-dark-900 dark:border-transparent",
                      checked &&
                        "ring-2 ring-primary-600 ring-offset-2 ring-offset-white transition-all dark:ring-primary-500 dark:ring-offset-dark-700",
                    )}
                  >
                    <div
                      style={{
                        clipPath: "polygon(50% 50%, 100% 0, 0 0, 0% 100%)",
                        backgroundColor: theme.lightColorScheme[200],
                      }}
                      className="w-full space-y-2 p-1 "
                    >
                      <div
                        className="w-full space-y-2 rounded-sm p-1 shadow-xs"
                        style={{
                          backgroundColor: "#fff",
                        }}
                      >
                        <div
                          className="h-1 w-9/12 rounded-lg"
                          style={{
                            backgroundColor: theme.lightColorScheme[400],
                          }}
                        ></div>
                        <div
                          className="h-1 w-11/12 rounded-lg"
                          style={{
                            backgroundColor: theme.lightColorScheme[400],
                          }}
                        ></div>
                      </div>
                      <div
                        className="flex items-center space-x-1.5 rounded-sm p-1 shadow-xs "
                        style={{
                          backgroundColor: "#fff",
                        }}
                      >
                        <div
                          className="size-3 shrink-0 rounded-full"
                          style={{
                            backgroundColor: theme.lightColorScheme[400],
                          }}
                        ></div>
                        <div
                          className="h-1 w-full rounded-lg"
                          style={{
                            backgroundColor: theme.lightColorScheme[400],
                          }}
                        ></div>
                      </div>
                    </div>

                    <div
                      style={{
                        clipPath:
                          "polygon(50% 50%, 100% 0, 100% 100%, 0% 100%)",
                        backgroundColor: theme.darkColorScheme[900],
                      }}
                      className="absolute inset-0 w-full space-y-2 p-1 "
                    >
                      <div
                        className="w-full space-y-2 rounded-sm p-1 shadow-xs"
                        style={{
                          backgroundColor: theme.darkColorScheme[700],
                        }}
                      >
                        <div
                          className="h-1 w-9/12 rounded-lg"
                          style={{
                            backgroundColor: theme.darkColorScheme[400],
                          }}
                        ></div>
                        <div
                          className="h-1 w-11/12 rounded-lg"
                          style={{
                            backgroundColor: theme.darkColorScheme[400],
                          }}
                        ></div>
                      </div>
                      <div
                        className="flex items-center space-x-1.5 rounded-sm p-1 shadow-xs "
                        style={{
                          backgroundColor: theme.darkColorScheme[700],
                        }}
                      >
                        <div
                          className="size-3 shrink-0 rounded-full"
                          style={{
                            backgroundColor: theme.darkColorScheme[400],
                          }}
                        ></div>
                        <div
                          className="h-1 w-full rounded-lg"
                          style={{
                            backgroundColor: theme.darkColorScheme[400],
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <p className="mt-1.5 text-center text-xs-plus">System</p>
                </>
              )}
            </Radio>
            <Radio value="light" className="cursor-pointer outline-hidden">
              {({ checked }) => (
                <>
                  <Placeholder
                    checked={checked}
                    bg={theme.lightColorScheme[200]}
                    card="#fff"
                    content={theme.lightColorScheme[400]}
                  />
                  <p className="mt-1.5 text-center">Light</p>
                </>
              )}
            </Radio>
            <Radio value="dark" className="cursor-pointer outline-hidden">
              {({ checked }) => (
                <>
                  <Placeholder
                    checked={checked}
                    bg={theme.darkColorScheme[900]}
                    card={theme.darkColorScheme[700]}
                    content={theme.darkColorScheme[400]}
                  />
                  <p className="mt-1.5 text-center text-xs-plus">Dark</p>
                </>
              )}
            </Radio>
          </div>
        </RadioGroup>

        <RadioGroup
          value={theme.themeLayout}
          onChange={theme.setThemeLayout}
          className="mt-5"
        >
          <Label className="font-medium text-gray-800 dark:text-dark-100">
            Theme Layout
          </Label>

          <div className="mt-2.5 grid grid-cols-2 gap-3">
            <Radio value="main-layout" className="cursor-pointer outline-hidden">
              {({ checked }) => (
                <>
                  <div
                    className={clsx(
                      "flex overflow-hidden rounded-sm bg-gray-100 dark:bg-dark-900",
                      checked &&
                        "ring-2 ring-primary-600 ring-offset-2 ring-offset-white transition-all dark:ring-primary-500 dark:ring-offset-dark-700",
                    )}
                  >
                    <div className="flex h-24 w-1/12 flex-col items-center justify-between border-r border-gray-300 bg-gray-200 py-1.5 dark:border-dark-600 dark:bg-dark-700">
                      <div className="flex flex-col space-y-1.5">
                        {range(1, 4).map((i) => (
                          <div
                            key={i}
                            className="size-1.5 rounded-full bg-gray-400 dark:bg-dark-400"
                          />
                        ))}
                      </div>
                      <div className="size-1.5 rounded-full bg-gray-400 dark:bg-dark-400" />
                    </div>
                    <div className="flex h-24 w-3/12 flex-col justify-between bg-gray-200 px-1 py-1.5 dark:bg-dark-700">
                      <div className="space-y-1">
                        {range(1, 5).map((i) => (
                          <div
                            key={i}
                            className="h-0.5 rounded-full bg-gray-400 dark:bg-dark-400"
                          />
                        ))}
                      </div>
                      <div className="h-1 rounded-full bg-gray-400 dark:bg-dark-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex h-3 w-full items-center justify-end gap-1 border-l border-gray-300 bg-gray-200 px-1.5 dark:border-dark-600 dark:bg-dark-700">
                        <div className="size-1.5 rounded-full bg-gray-400 dark:bg-dark-400" />
                        <div className="size-1.5 rounded-full bg-gray-400 dark:bg-dark-400" />
                      </div>
                    </div>
                  </div>

                  <p className="mt-1.5 text-center text-xs-plus">Main Layout</p>
                </>
              )}
            </Radio>

            <Radio value="sideblock" className="cursor-pointer outline-hidden">
              {({ checked }) => (
                <>
                  <div
                    className={clsx(
                      "flex overflow-hidden rounded-sm bg-gray-100 dark:bg-dark-900",
                      checked &&
                        "ring-2 ring-primary-600 ring-offset-2 ring-offset-white transition-all dark:ring-primary-500 dark:ring-offset-dark-700",
                    )}
                  >
                    <div className="flex bg-gray-200 h-24 w-[30%] flex-col justify-between px-1 py-1.5 dark:bg-dark-700">
                      <div className="space-y-2">
                        <div className="h-1 rounded-full bg-gray-400 dark:bg-dark-400" />
                        <div className="space-y-1">
                          {range(1, 5).map((i) => (
                            <div
                              key={i}
                              className="h-0.5 rounded-full bg-gray-400 dark:bg-dark-400"
                            />
                          ))}
                        </div>
                      </div>
                      <div className="h-1 rounded-full bg-gray-400 dark:bg-dark-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex bg-gray-200 h-3 w-full border-gray-300 items-center justify-end gap-1 border-l px-1.5 dark:border-dark-600 dark:bg-dark-700">
                        <div className="size-1.5 rounded-full bg-gray-400 dark:bg-dark-400" />
                        <div className="size-1.5 rounded-full bg-gray-400 dark:bg-dark-400" />
                        <div className="size-1.5 rounded-full bg-gray-400 dark:bg-dark-400" />
                      </div>
                    </div>
                  </div>

                  <p className="mt-1.5 text-center text-xs-plus">Sideblock</p>
                </>
              )}
            </Radio>
          </div>
        </RadioGroup>

        <RadioGroup
          value={theme.primaryColorScheme.name}
          onChange={theme.setPrimaryColorScheme}
          className="mt-5"
        >
          <Label className="font-medium text-gray-800 dark:text-dark-100">
            Primary Colors
          </Label>
          <div className="mt-2 flex w-fit flex-wrap gap-3">
            {primaryColors.map((color) => (
              <Radio
                key={color}
                value={color}
                className={({ checked }) =>
                  clsx(
                    "flex h-14 w-16 cursor-pointer items-center justify-center rounded-lg border outline-hidden",
                    checked
                      ? "border-primary-500"
                      : "border-gray-200 dark:border-dark-500",
                  )
                }
              >
                {({ checked }) => (
                  <div
                    className={clsx(
                      "mask is-diamond size-6 transition-all",
                      checked && "rotate-45 scale-110",
                    )}
                    style={{
                      backgroundColor: colors[color][500],
                    }}
                  ></div>
                )}
              </Radio>
            ))}
          </div>
        </RadioGroup>

        <Listbox
          label="Card Skin:"
          classNames={{
            root: "mt-5",
          }}
          data={cardSkins}
          value={cardSkins.find((skin) => skin.value === theme.cardSkin)}
          onChange={({ value }) => theme.setCardSkin(value)}
        />

        <RadioGroup
          value={theme.lightColorScheme.name}
          onChange={theme.setLightColorScheme}
          className="mt-5"
        >
          <Label className="font-medium text-gray-800 dark:text-dark-100">
            Light Colors
          </Label>
          <div className="mt-2.5 grid grid-cols-3 gap-2.5">
            {lightColors.map((color) => (
              <Radio
                key={color}
                value={color}
                className="cursor-pointer outline-hidden"
              >
                {({ checked }) => (
                  <>
                    <Placeholder
                      checked={checked}
                      bg={colors[color][200]}
                      card="#fff"
                      content={colors[color][400]}
                    />
                    <p className="mt-1.5 text-center text-xs-plus capitalize">
                      {color}
                    </p>
                  </>
                )}
              </Radio>
            ))}
          </div>
        </RadioGroup>
        
        <RadioGroup
          value={theme.darkColorScheme.name}
          onChange={theme.setDarkColorScheme}
          className="mt-5"
        >
          <Label className="font-medium text-gray-800 dark:text-dark-100">
            Dark Colors
          </Label>
          <div className="mt-2.5 grid grid-cols-3 gap-2.5">
            {darkColors.map((color) => (
              <Radio
                key={color}
                value={color}
                className="cursor-pointer outline-hidden"
              >
                {({ checked }) => (
                  <>
                    <Placeholder
                      bg={colors[color][900]}
                      card={colors[color][700]}
                      content={colors[color][400]}
                      checked={checked}
                    />
                    <p className="mt-1.5 text-center text-xs-plus capitalize">
                      {color}
                    </p>
                  </>
                )}
              </Radio>
            ))}
          </div>
        </RadioGroup>
      </ScrollShadow>
    </>
  );
}

function Placeholder({ bg, card, content, checked }) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-lg border-2 dark:border-transparent",
        checked &&
          "ring-2 ring-primary-600 ring-offset-2 ring-offset-white transition-all dark:ring-primary-500 dark:ring-offset-dark-700",
      )}
    >
      <div
        className="w-full space-y-2 p-1 "
        style={{ backgroundColor: bg }}
      >
        <div
          className="w-full space-y-2 rounded-sm p-1 shadow-xs"
          style={{
            backgroundColor: card,
          }}
        >
          <div
            className="h-1 w-9/12 rounded-lg"
            style={{
              backgroundColor: content,
            }}
          ></div>
          <div
            className="h-1 w-11/12 rounded-lg"
            style={{
              backgroundColor: content,
            }}
          ></div>
        </div>
        <div
          className="flex items-center space-x-1.5 rounded-sm p-1 shadow-xs "
          style={{
            backgroundColor: card,
          }}
        >
          <div
            className="size-3 shrink-0 rounded-full"
            style={{
              backgroundColor: content,
            }}
          ></div>
          <div
            className="h-1 w-full rounded-lg"
            style={{
              backgroundColor: content,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

CustomizerContent.propTypes = {
  close: PropTypes.func,
};

Placeholder.propTypes = {
  bg: PropTypes.string,
  card: PropTypes.string,
  content: PropTypes.string,
  checked: PropTypes.bool,
};
