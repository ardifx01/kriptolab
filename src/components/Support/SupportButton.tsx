import React from "react";

import classNames from "classnames";
import { HelpCircleIcon } from "lucide-react";

import useModal from "@/hooks/useModal";

const SupportButton = () => {
  const { openSupportModal } = useModal();

  return (
    <button
      onClick={openSupportModal}
      className={classNames(
        "fixed bottom-3 right-3 flex items-center gap-[6px] rounded-lg border px-3 py-2 text-sm",
        "border-borderColor bg-cardBackground/80 transition-all duration-75 hover:bg-primaryAccent/80",
        "md:bottom-5 md:right-5 md:px-4 md:text-base",
      )}
    >
      <span>Support</span>
      <HelpCircleIcon className="mt-[1px] size-[14px] md:size-4" />
    </button>
  );
};

export default SupportButton;
