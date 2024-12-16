import React, { Fragment, ReactNode } from "react";
import { IoClose } from "react-icons/io5";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import classNames from "classnames";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={"relative z-50"} onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={classNames(
              "fixed inset-0 bg-black bg-opacity-40 backdrop-blur-[16px]",
            )}
          />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full w-full items-center justify-center text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-50"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-50"
            >
              <DialogPanel
                onClick={(e) => e.stopPropagation()}
                className={classNames(
                  "mx-[15px] my-4 w-full transform overflow-hidden rounded-2xl px-6 transition-all",
                  "border-2 border-borderColor bg-cardBackground",
                  className,
                )}
              >
                {title ? (
                  <div
                    className={classNames(
                      "flex h-[60px] items-center justify-between border-b-2 border-borderColor md:h-[72px]",
                    )}
                  >
                    <div className="flex items-center gap-x-1">
                      <span
                        className={classNames(
                          "text-base font-semibold text-white md:text-2xl",
                        )}
                      >
                        {title}
                      </span>
                    </div>

                    <IoClose
                      className="h-6 w-6 cursor-pointer text-gray-100 md:h-7 md:w-7"
                      onClick={onClose}
                    />
                  </div>
                ) : (
                  <IoClose
                    className={classNames(
                      "absolute right-5 top-5 z-20 h-6 w-6 cursor-pointer text-gray-100",
                      "md:h-7 md:w-7",
                    )}
                    onClick={onClose}
                  />
                )}
                <div>{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
