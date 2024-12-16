import React from "react";
import { RegisterOptions } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";

interface Props {
  name: string;
  label?: string;
  type?: "text" | "email" | "password" | "number" | "file";
  className?: string;
  placeholder?: string;
  errors: any;
  register: any;
  validation?: RegisterOptions;
}

const CustomInput: React.FC<Props> = ({
  label,
  name,
  className,
  placeholder,
  errors,
  register,
  validation,
  type = "text",
}) => {
  return (
    <div>
      {label && <label className="mb-1 block">{label}</label>}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        {...register(name, { ...validation })}
        className={classNames(
          "w-full rounded leading-none placeholder-gray-500 transition-colors ease-in-out",
          "border-2 border-borderColor bg-borderColor/20 text-textSecondary",
          "text-sm hover:border-primaryAccent focus:border-primaryAccent focus:outline-none lg:text-base",
          className,
          errors[name] &&
            "border-error transition-colors hover:border-error focus:border-error",
        )}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages }) => {
          return messages
            ? Object.entries(messages).map(([type, message]) => (
                <p className="text-sm text-error" key={type}>
                  {message}
                </p>
              ))
            : null;
        }}
      />
    </div>
  );
};
export default CustomInput;
