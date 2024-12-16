import React from "react";
import { useTranslation } from "react-i18next";

import Image from "next/image";
import { useRouter } from "next/router";

import classNames from "classnames";

import Button from "@/components/Button/Button";
import { API_GOOGLE_LOGIN } from "@/constants";

interface Props {
  disabled?: boolean;
  className?: string;
}

const GoogleLogin: React.FC<Props> = ({ disabled, className }) => {
  const router = useRouter();
  const { t } = useTranslation();

  const clickHandler = (e: any) => {
    if (disabled) {
      e.preventDefault();
    }
    router.push(API_GOOGLE_LOGIN);
  };

  return (
    <Button
      className={classNames("h-12 w-full space-x-2 rounded-md", className)}
      variant="secondary"
      disabled={disabled}
      onClick={(e: any) => clickHandler(e)}
    >
      <Image src="/images/google.png" alt="google" width={24} height={24} />
      <span>{t("Continue with Google")}</span>
    </Button>
  );
};

export default GoogleLogin;
