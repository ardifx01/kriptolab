import React, { useRef } from "react";

import classNames from "classnames";
import { Upload, X } from "lucide-react";

interface CustomFileInputProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value?: File | null;
  accept?: string;
  disabled?: boolean;
  multiple?: boolean;
  className?: string;
  error?: string;
  maxSize?: number;
  handleRemove?: () => void;
  containerClassName?: string;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  onChange,
  placeholder = "Select a file",
  value,
  accept = "image/*",
  disabled = false,
  multiple = false,
  containerClassName,
  className,
  error,
  handleRemove,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={classNames("w-full", containerClassName)}>
      <div
        className={classNames(
          "relative flex items-center rounded-lg border border-borderColor bg-cardBackground",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          error && "border-red-500",
          className,
        )}
        onClick={!disabled ? handleButtonClick : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={onChange}
          disabled={disabled}
          className="hidden"
        />
        <div className="flex flex-grow items-center p-2 px-3 pl-4">
          {value ? (
            <div className="flex items-center gap-2 truncate">
              <span className="max-w-[200px] truncate">{value.name}</span>
              {!disabled && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (handleRemove) handleRemove();
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} className="mt-0.5" />
                </button>
              )}
            </div>
          ) : (
            <span className="text-subtext">{error ? error : placeholder}</span>
          )}
        </div>
        <div
          className={classNames(
            "border-l border-borderColor p-3",
            disabled ? "text-gray-400" : "text-subtext",
          )}
        >
          <Upload size={20} />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default CustomFileInput;
