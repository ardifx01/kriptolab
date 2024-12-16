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
}

const Button = ({
  children,
  className,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={classNames(
        "flex h-10 items-center justify-center rounded-lg border px-5 text-sm font-medium md:h-12 md:text-base",
        {
          // Primary variant styles
          "border-transparent bg-primaryAccent/90 text-white hover:brightness-125":
            variant === "primary" && !disabled,
          "cursor-not-allowed border-transparent bg-primaryAccent/40 text-gray-300":
            variant === "primary" && disabled,

          // Secondary variant styles
          "border-primaryAccent bg-primaryAccent/20 text-primaryAccent hover:bg-primaryAccent/30":
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
