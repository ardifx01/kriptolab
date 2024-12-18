import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Link from "next/link";

import classNames from "classnames";

import Button from "@/components/Button/Button";
import CheckboxCustom from "@/components/Checkbox/Checkbox";
import CustomErrorMessage from "@/components/Form/CustomErrorMessage";
import CustomInput from "@/components/Form/CustomInput";
import CustomSuccessMessage from "@/components/Form/CustomSuccessMessage";
import { emailPattern } from "@/lib/helpers/validation-pattern";
import { registerService } from "@/lib/services";
import { IAccount } from "@/types";

import GoogleLogin from "../Login/GoogleLogin";

const RegisterForm = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"Success" | "Error" | "">();
  const [errorMessage, setErrorMessage] = useState<any>();
  const [successMessage, setSuccessMessage] = useState<any>();

  const [enabled, setEnabled] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IAccount>({ criteriaMode: "all" });

  const submitHandler = async (data: IAccount) => {
    setIsLoading(true);
    try {
      const response = await registerService(data);

      if (response) {
        setSuccessMessage(t("User successfully registered!"));
        setStatus("Success");
        reset();
      }
    } catch (error: any) {
      setStatus("Error");
      setErrorMessage(error.response.data.errors[0].msg);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className={classNames(
          "flex w-full max-w-lg flex-col gap-5 rounded-xl border-2 p-6 shadow sm:p-8",
          "border-borderColor bg-cardBackground",
        )}
      >
        <h2 className="text-2xl font-bold sm:text-3xl">
          {t("Create an account")}
        </h2>
        {status === "Error" && (
          <CustomErrorMessage
            message={errorMessage}
            onClose={() => setStatus("")}
          />
        )}
        {status === "Success" && (
          <CustomSuccessMessage
            message={successMessage}
            onClose={() => setStatus("")}
          />
        )}

        <CustomInput
          label={t("Name")}
          name="firstName"
          type="text"
          placeholder={t("Your name")}
          errors={errors}
          register={register}
          validation={{
            required: t("Firstname is required!"),
            minLength: { value: 3, message: t("Minimum 3 characters long!") },
          }}
          className="p-3"
        />

        <CustomInput
          label="Email"
          name="email"
          type="email"
          placeholder="example@gmail.com"
          errors={errors}
          register={register}
          validation={{
            required: t("Email is required!"),
            pattern: emailPattern,
          }}
          className="p-3"
        />
        <div>
          <CustomInput
            label="Password"
            name="password"
            type={enabled ? "text" : "password"}
            placeholder={t("Enter your password")}
            errors={errors}
            register={register}
            validation={{
              required: "Password is required!",
              minLength: {
                value: 8,
                message: t("Password must be at least 8 characters long"),
              },
            }}
            className="p-3"
          />
          <div className="mt-3">
            <CheckboxCustom
              checked={enabled}
              onCheck={setEnabled}
              className="mt-0.5"
              label={t("Show password")}
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="mt-3 h-12 w-full rounded-md disabled:cursor-not-allowed"
        >
          {isLoading ? t("Submitting...") : t("Create account")}
        </Button>

        <GoogleLogin disabled={isLoading} />

        <div className="text-center">
          <span className="text-textSecondary/70">
            {t("Already have an account?")}{" "}
          </span>
          <Link
            href="/auth/login"
            className="text-secondaryAccent hover:brightness-125"
          >
            {t("Login")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
