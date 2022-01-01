import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XIcon } from "@heroicons/react/outline";
import { OutlinedButton } from "./Button";

const Section = ({ children, ...props }) => {
  return (
    <div>
      <div className="my-6 border border-gray-200" />
      {children}
    </div>
  );
};

export const Modal = ({
  isOpen = false,
  setIsOpen,
  title,
  children,
  onConfirm,
  button,
  disabled,
  onClose = () => {},
  ...props
}) => {
  function closeModal() {
    setIsOpen(false);
    onClose();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={disabled ? () => {} : closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            // enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="bg-black opacity-75 fixed inset-0 " />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-bold leading-6 text-gray-900 flex justify-between"
              >
                <span>{title}</span>
                <XIcon
                  className="h-6 w-6 cursor-pointer"
                  onClick={(event) => {
                    if (disabled) return;
                    event.stopPropagation();
                    closeModal();
                  }}
                />
              </Dialog.Title>
              <div className="mt-2">{children}</div>

              {button && (
                <div className="mt-4">
                  <div className="w-full flex justify-end">
                    <OutlinedButton
                      onClick={() => {
                        if (onConfirm) onConfirm();
                        else closeModal();
                      }}
                      title={button}
                    />
                  </div>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
Modal.Section = Section;
