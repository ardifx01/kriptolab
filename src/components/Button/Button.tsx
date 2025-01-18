/* eslint-disable no-unused-vars */
import React from "react";

import classNames from "classnames";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (() => void) | ((e: any) => void);
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  id?: string;
}

const Button = ({
  children,
  className,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
  id,
}: ButtonProps) => {
  return (
    <button
      id={id}
      type={type}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={classNames(
        "flex h-10 items-center justify-center rounded-lg border px-4 text-sm font-medium lg:h-12 lg:px-5 lg:text-base",
        {
          // Primary variant styles
          "border-transparent bg-primaryAccent text-white hover:brightness-125":
            variant === "primary" && !disabled,
          "cursor-not-allowed border-transparent bg-primaryAccent/40 text-gray-300":
            variant === "primary" && disabled,

          // Secondary variant styles
          "border-primaryAccent bg-primaryAccent/20 text-gray-50 hover:bg-primaryAccent/30":
            variant === "secondary" && !disabled,
          "cursor-not-allowed border-primaryAccent/70 bg-primaryAccent/10 text-gray-400":
            variant === "secondary" && disabled,
        },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
