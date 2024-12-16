import React from "react";
import { Slide, toast, ToastContainer } from "react-toastify";

import classNames from "classnames";
import { CheckIcon, CircleAlertIcon, XIcon } from "lucide-react";

import "react-toastify/dist/ReactToastify.css";

// Custom toast component
interface CustomToastProps {
  message: string;
  type: "success" | "error";
  isLoading?: boolean;
}

const CustomToast: React.FC<CustomToastProps> = ({
  message,
  type,
  isLoading,
}) => {
  return (
    <div
      className={classNames("relative flex items-center p-5 text-textPrimary", {
        "bg-success": type === "success",
        "bg-error": type === "error",
      })}
    >
      <div className="mr-3">
        {type === "success" ? (
          <CheckIcon className="size-7" />
        ) : (
          <CircleAlertIcon className="size-7" />
        )}
      </div>
      <div className="pr-7 font-inter font-medium">{message}</div>
      {!isLoading && (
        <XIcon
          className="absolute right-5 size-5 cursor-pointer"
          onClick={() => toast.dismiss()}
        />
      )}
    </div>
  );
};

// Custom toast container component
const CustomToastContainer = () => {
  return (
    <ToastContainer
      transition={Slide}
      position="top-center"
      pauseOnFocusLoss={false}
      autoClose={5000}
      hideProgressBar={true}
      closeOnClick={false}
      pauseOnHover={true}
      draggable={true}
      newestOnTop={true}
      closeButton={false}
      icon={false}
      toastClassName="!p-0 !bg-transparent"
      bodyClassName="!p-0"
    />
  );
};

// Utility function to show toasts
export const showToast = {
  success: (message: string, isLoading?: boolean) =>
    toast(
      <CustomToast message={message} type="success" isLoading={isLoading} />,
    ),
  error: (message: string, isLoading?: boolean) =>
    toast(<CustomToast message={message} type="error" isLoading={isLoading} />),
};

export default CustomToastContainer;
