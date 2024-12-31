import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import classNames from "classnames";

import Button from "@/components/Button/Button";
import CheckboxCustom from "@/components/Checkbox/Checkbox";
import CustomErrorMessage from "@/components/Form/CustomErrorMessage";
import CustomInput from "@/components/Form/CustomInput";
import { emailPattern } from "@/lib/helpers/validation-pattern";
import { loginService } from "@/lib/services";
import { IAccount } from "@/types";

import useAuth from "../../hooks/useAuth";

import GoogleLogin from "./GoogleLogin";

const LoginForm = () => {
  const { t } = useTranslation();
  const search = useSearchParams();

  const { updateJwttoken } = useAuth();

  const googleError = search.get("error");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [googleErrorMsg, setGoogleErrorMsg] = useState(googleError);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (googleError) {
      setGoogleErrorMsg(googleError);
    }
  }, [googleError]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IAccount>({ criteriaMode: "all" });

  const submitHandler = async (val: IAccount) => {
    try {
      setIsLoading(true);
      const response = await loginService(val);
      const { token } = response.data;

      if (token) {
        updateJwttoken(token);
        setIsError(false);
        reset();
      }
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
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
          {t("Login to your account")}
        </h2>
        {isError && (
          <CustomErrorMessage
            onClose={() => setIsError(false)}
            message={errorMessage}
          />
        )}
        {googleErrorMsg && (
          <CustomErrorMessage
            onClose={() => setGoogleErrorMsg("")}
            message={googleErrorMsg}
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

        <div>
          <CustomInput
            label="Password"
            name="password"
            type={enabled ? "text" : "password"}
            placeholder={t("Enter your password")}
            errors={errors}
            register={register}
            validation={{
              required: t("Password is required!"),
            }}
            className="p-3"
          />
          <div className="mt-3 flex justify-between text-sm text-textSecondary">
            <CheckboxCustom
              checked={enabled}
              onCheck={setEnabled}
              className="mt-0.5"
              label={t("Show password")}
            />

            <Link href={"/auth/forgot-password"} className="hover:text-white">
              {t("Forgot password?")}
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="mt-3 h-12 w-full rounded-md disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : t("Login")}
        </Button>

        <GoogleLogin disabled={isLoading} />

        <div className="text-center">
          <span className="text-textSecondary/70">
            {t("Don't have an account?")}{" "}
          </span>
          <Link
            href="/auth/register"
            className="text-secondaryAccent hover:brightness-125"
          >
            {t("Register")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
