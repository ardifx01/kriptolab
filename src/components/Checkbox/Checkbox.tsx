import React from "react";

import { Checkbox, Field, Label } from "@headlessui/react";
import classNames from "classnames";

interface CheckboxProps {
  checked: boolean;
  // eslint-disable-next-line no-unused-vars
  onCheck: (check: boolean) => void;
  className?: string;
  label?: string;
}

const CheckboxCustom = ({
  checked,
  onCheck,
  className,
  label,
}: CheckboxProps) => {
  return (
    <Field className="flex items-start gap-2">
      <Checkbox
        checked={checked}
        onChange={onCheck}
        className={classNames(
          "group block size-[18px] cursor-pointer rounded border",
          "border-primaryAccent/20 bg-borderColor data-[checked]:bg-primaryAccent",
          className,
        )}
      >
        <svg
          className="stroke-white opacity-0 group-data-[checked]:opacity-100"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M3 8L6 11L11 3.5"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Checkbox>
      {label && (
        <Label className={"cursor-pointer text-sm text-textSecondary"}>
          {label}
        </Label>
      )}
    </Field>
  );
};

export default CheckboxCustom;
