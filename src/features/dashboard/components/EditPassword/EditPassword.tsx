import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import classNames from "classnames";

import Button from "@/components/Button/Button";
import CheckboxCustom from "@/components/Checkbox/Checkbox";
import CustomErrorMessage from "@/components/Form/CustomErrorMessage";
import CustomInput from "@/components/Form/CustomInput";
import CustomSuccessMessage from "@/components/Form/CustomSuccessMessage";
import { editPasswordService } from "@/lib/services";
import { IEditPassword } from "@/types";

const EditPassword = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const [successMessage, setSuccessMessage] = useState("");
  const [show, setShow] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm<IEditPassword>({ criteriaMode: "all" });

  const submitHandler = async (formData: IEditPassword) => {
    setIsLoading(true);

    try {
      const response = await editPasswordService(formData);

      if (response) {
        console.log(response);

        setSuccessMessage("Edit password successful!");
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
    <section className="flex w-full justify-center">
      <div className="w-full max-w-xl">
        <h2 className="mb-4 w-full text-2xl font-medium sm:text-3xl md:mb-6">
          {t("Account Settings")}
        </h2>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className={classNames(
            "flex w-full flex-col gap-5 rounded-xl border-2 p-6 shadow sm:p-8",
            "border-borderColor bg-cardBackground",
          )}
        >
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
            label="Current Password"
            name="currentPassword"
            type={show ? "text" : "password"}
            placeholder="Your current password"
            errors={errors}
            register={register}
            validation={{
              required: "Current Password is required!",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            }}
            className="p-3"
          />
          <CustomInput
            label="New Password"
            name="newPassword"
            type={show ? "text" : "password"}
            placeholder="New Password"
            errors={errors}
            register={register}
            validation={{
              required: "New Password is required!",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            }}
            className="p-3"
          />
          <div>
            <CustomInput
              label="Confirm New Password"
              name="confirmNewPassword"
              type={show ? "text" : "password"}
              placeholder="Confirm New Password"
              errors={errors}
              register={register}
              validation={{
                required: "Confirm New Password is required!",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                validate: (value) =>
                  value === getValues("newPassword") ||
                  "Passwords do not match!",
              }}
              className="p-3"
            />
            <div className="mt-3">
              <CheckboxCustom
                checked={show}
                onCheck={setShow}
                className="mt-0.5"
                label="Show password"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="mt-3 h-12 w-full rounded-md disabled:cursor-not-allowed"
          >
            {isLoading ? "Loading..." : "Edit Password"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default EditPassword;
