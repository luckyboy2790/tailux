// Import Dependencies
import {
  PopoverButton,
  Dialog,
  DialogPanel,
  Popover,
  PopoverPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import clsx from "clsx";
import PropTypes from "prop-types";

// Local Imports
import { Button } from "components/ui";
import { useDisclosure } from "hooks";

// ----------------------------------------------------------------------

export function ResponsiveFilter({
  children,
  buttonContent,
  anchor,
  classNames,
}) {
  const { smAndDown } = useBreakpointsContext();

  const View = smAndDown ? MobileView : DesktopView;

  return (
    <View
      {...{
        buttonContent,
        anchor,
        classNames,
      }}
    >
      {children}
    </View>
  );
}

function MobileView({ children, buttonContent, classNames }) {
  const [isOpen, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button
        variant="outlined"
        className={clsx(
          "h-8 gap-2 whitespace-nowrap px-2.5 text-xs",
          isOpen
            ? "border-primary-600 ring-3 ring-primary-500/50 dark:border-primary-500"
            : "border-dashed",
          classNames?.button,
        )}
        onClick={open}
      >
        {buttonContent}
      </Button>
      <Transition
        appear
        show={isOpen}
        as={Dialog}
        className="relative z-100"
        onClose={close}
      >
        <TransitionChild
          as="div"
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity dark:bg-black/40"
        />
        <TransitionChild
          as={DialogPanel}
          enter="ease-out transform-gpu transition-transform duration-200"
          enterFrom="translate-y-full"
          enterTo="translate-y-0"
          leave="ease-in transform-gpu transition-transform duration-200"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-full"
          className="fixed bottom-0 left-0 flex w-full transform-gpu flex-col rounded-t-2xl bg-white transition-transform duration-200 dark:bg-dark-700"
        >
          {children}
        </TransitionChild>
      </Transition>
    </>
  );
}

function DesktopView({
  children,
  buttonContent,
  anchor = { to: "bottom start", gap: 12 },
  classNames,
}) {
  return (
    <Popover>
      {({ open }) => (
        <>
          <PopoverButton
            as={Button}
            variant="outlined"
            className={clsx(
              "h-8 gap-2 whitespace-nowrap px-2.5 text-xs",
              open
                ? "border-primary-600 ring-3 ring-primary-500/50 dark:border-primary-500"
                : "border-dashed",
              classNames?.button,
            )}
          >
            {buttonContent}
          </PopoverButton>
          <Transition
            as={PopoverPanel}
            enter="transition ease-out"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
            anchor={anchor}
            className="z-100 flex w-fit flex-col rounded-md border border-gray-300 bg-white shadow-lg shadow-gray-200/50 outline-hidden ring-primary-500/50 focus-visible:outline-hidden focus-visible:ring-3 dark:border-dark-500 dark:bg-dark-750 dark:shadow-none"
          >
            <div className="flex flex-col overflow-hidden">{children}</div>
          </Transition>
        </>
      )}
    </Popover>
  );
}

MobileView.propTypes = {
  children: PropTypes.node,
  buttonContent: PropTypes.node,
  classNames: PropTypes.object,
};

DesktopView.propTypes = {
  children: PropTypes.node,
  buttonContent: PropTypes.node,
  anchor: PropTypes.object,
  classNames: PropTypes.object,
};

ResponsiveFilter.propTypes = {
  children: PropTypes.node,
  buttonContent: PropTypes.node,
  anchor: PropTypes.object,
  classNames: PropTypes.object,
};
