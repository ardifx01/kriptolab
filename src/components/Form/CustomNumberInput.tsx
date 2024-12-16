import React from "react";

import classNames from "classnames";

interface CustomNumberInputProps {
  label?: string;
  value: string;
  className?: string;
  placeholder?: string;
  error?: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  onBlur?: () => void;
  suffix?: string;
}

const CustomNumberInput: React.FC<CustomNumberInputProps> = ({
  label,
  value,
  className,
  placeholder,
  error,
  onChange,
  onBlur,
  suffix,
}) => {
  return (
    <div className="flex flex-col">
      {label && <label className="mb-2 block text-start">{label}</label>}
      <div className="relative w-full text-sm text-textSecondary lg:text-base">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          type="text"
          placeholder={placeholder}
          className={classNames(
            "w-full rounded leading-none placeholder-gray-500",
            "border-2 border-borderColor bg-borderColor/20",
            "hover:border-primaryAccent focus:border-primaryAccent focus:outline-none",
            suffix ? "pr-12" : "pr-3",
            className,
          )}
        />
        {suffix && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 transform">
            {suffix}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CustomNumberInput;
