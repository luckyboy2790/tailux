// Import Dependencies
import PropTypes from "prop-types";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

// Local Imports
import { Button } from "components/ui";
import { useBreakpointsContext } from "app/contexts/breakpoint/context";
import { useDisclosure, useDidUpdate } from "hooks";

// ----------------------------------------------------------------------

export function ContextualHelp(props) {
  const {
    Icon = QuestionMarkCircleIcon,
    title,
    content,
    anchor = { to: "bottom start", gap: 8 },
  } = props;

  const { smAndDown, name } = useBreakpointsContext();
  const [isOpen, { open: openModal, close: closeModal }] = useDisclosure(false);

  useDidUpdate(() => closeModal(), [name]);

  const body = (
    <div className="contextual-body pointer-events-auto mt-2 text-sm text-gray-500 dark:text-dark-200">
      {content}
    </div>
  );

  return smAndDown ? (
    <>
      <Button
        onClick={openModal}
        variant="flat"
        isIcon
        className="contextual-trigger pointer-events-auto size-6 rounded-full"
      >
        <Icon className="contextual-trigger-icon size-4.5" />
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-100 flex flex-col items-center justify-center overflow-hidden px-4 py-6 sm:px-5"
          onClose={closeModal}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute inset-0 bg-gray-900/50 transition-opacity dark:bg-black/40" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPanel className="scrollbar-sm relative flex max-w-xs flex-col overflow-y-auto rounded-lg bg-white p-4 transition-opacity duration-300 dark:bg-dark-700">
              <div className="flex items-center justify-between border-b pb-2 dark:border-dark-600">
                <DialogTitle
                  as="h3"
                  className="contextual-title text-base text-gray-800 dark:text-dark-100 ltr:mr-2 rtl:ml-2"
                >
                  {title}
                </DialogTitle>
                <Button
                  onClick={closeModal}
                  variant="flat"
                  isIcon
                  className="size-6 rounded-full ltr:-mr-1.5 rtl:-ml-1.5"
                >
                  <XMarkIcon className="size-4.5" />
                </Button>
              </div>
              {body}
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  ) : (
    <Popover className="relative">
      <PopoverButton
        as={Button}
        variant="flat"
        isIcon
        className="contextual-trigger pointer-events-auto size-6 rounded-full"
      >
        <Icon className="contextual-trigger-icon size-4.5" />
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <PopoverPanel
          anchor={anchor}
          className="pointer-events-auto z-100 w-80 rounded-md border border-gray-300 bg-white p-4 shadow-lg shadow-gray-200/50 outline-hidden ring-primary-500/50 focus-visible:outline-hidden focus-visible:ring-3 dark:border-dark-500 dark:bg-dark-750 dark:shadow-none"
        >
          <h3 className="contextual-title text-base text-gray-800 dark:text-dark-100">
            {title}
          </h3>
          {body}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
}

ContextualHelp.propTypes = {
  Icon: PropTypes.elementType,
  title: PropTypes.string,
  content: PropTypes.node,
  anchor: PropTypes.object,
};
