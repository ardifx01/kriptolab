import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { IoChevronBack } from "react-icons/io5";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import classNames from "classnames";

import Button from "@/components/Button/Button";
import CustomErrorMessage from "@/components/Form/CustomErrorMessage";
import CustomInput from "@/components/Form/CustomInput";
import CustomSuccessMessage from "@/components/Form/CustomSuccessMessage";
import { emailPattern } from "@/lib/helpers/validation-pattern";
import { forgotPasswordService } from "@/lib/services";
import { IForgotPassword } from "@/types";

const ForgotPasswordForm = () => {
  const { t } = useTranslation();
  const search = useSearchParams();

  const tokenError = search.get("error");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IForgotPassword>({ criteriaMode: "all" });

  const submitHandler = async (val: IForgotPassword) => {
    setIsLoading(true);

    try {
      await forgotPasswordService(val.email);

      setSuccessMessage(t("Password reset link has been sent to your email!"));
      setIsError(false);
      reset();
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(t(error.response.data.message));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (tokenError) {
      setIsError(true);
      setErrorMessage(t("Invalid reset password link"));
    }
  }, [t, tokenError]);

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={classNames(
          "flex w-full max-w-lg flex-col gap-5 rounded-xl border-2 p-6 shadow sm:p-8",
          "border-borderColor bg-cardBackground",
        )}
      >
        <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
          {t("Forgot Password")}
        </h2>
        {isError && (
          <CustomErrorMessage
            onClose={() => setIsError(false)}
            message={errorMessage}
          />
        )}

        {successMessage && (
          <CustomSuccessMessage
            message={successMessage}
            onClose={() => setSuccessMessage("")}
          />
        )}

        <CustomInput
          label="Email"
          name="email"
          type="email"
          placeholder="email@gmail.com"
          errors={errors}
          register={register}
          validation={{
            required: t("Email is required!"),
            pattern: emailPattern,
          }}
          className="p-3"
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="mt-3 h-12 w-full rounded-md disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : t("Send Reset Link")}
        </Button>

        <Link
          href="/auth/login"
          className="flex items-center gap-1.5 text-sm text-textSecondary hover:brightness-125"
        >
          <IoChevronBack />
          <div className="mb-0.5">{t("Back to login")}</div>
        </Link>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
