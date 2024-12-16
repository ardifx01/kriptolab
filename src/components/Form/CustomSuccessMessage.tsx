import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

import classNames from "classnames";

interface Props {
  message: any;
  onClose: () => void;
}

const CustomSuccessMessage: React.FC<Props> = ({ message, onClose }) => {
  return (
    <div
      className={classNames(
        "flex w-full items-center justify-between gap-3 rounded-md",
        "border border-success bg-success/20 p-3 text-success",
      )}
    >
      <span className="w-full text-sm lg:text-base">{message}</span>
      <AiOutlineCloseCircle
        className="cursor-pointer text-xl lg:text-2xl"
        onClick={onClose}
      />
    </div>
  );
};

export default CustomSuccessMessage;
