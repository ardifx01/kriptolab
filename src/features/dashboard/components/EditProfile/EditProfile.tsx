import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Image from "next/image";

import classNames from "classnames";

import Button from "@/components/Button/Button";
import CustomErrorMessage from "@/components/Form/CustomErrorMessage";
import CustomInput from "@/components/Form/CustomInput";
import { showToast } from "@/components/Toast/CustomToast";
import useUser from "@/hooks/useUser";
import { numberPattern } from "@/lib/helpers/validation-pattern";
import { editProfileService } from "@/lib/services";
import { IProfileUpdate } from "@/types";

import UploadAvatarModal from "./UploadAvatarModal";

const EditProfile = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<any>();

  const [uploadAvatar, setUploadAvatar] = useState(false);

  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<IProfileUpdate>({
    criteriaMode: "all",
    values: {
      firstName: user.profile.firstName,
      lastName: user.profile.lastName,
      address: user.profile.address,
      phoneNumber: user.profile.phoneNumber,
    },
  });

  const submitHandler = async (val: IProfileUpdate) => {
    try {
      setIsLoading(true);
      const values = getValues();

      if (
        values.firstName === user.profile.firstName &&
        values.lastName === user.profile.lastName &&
        values.address === user.profile.address &&
        values.phoneNumber === user.profile.phoneNumber
      ) {
        showToast.error(t("No changes detected!"));
        return;
      }

      const response = await editProfileService(val);

      if (response) {
        showToast.success(t("Edit profile success!"));
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
      <div className="w-full max-w-[900px]">
        <h2 className="mb-4 w-full text-2xl font-medium sm:text-3xl md:mb-6">
          {t("My Profile")}
        </h2>
        <div className="w-full space-y-5 rounded-xl border-2 border-borderColor bg-cardBackground p-4 md:px-6 md:py-5">
          <div className="space-y-3">
            <h3 className="md:text-lg">{t("Profile Picture")}</h3>
            <Image
              width={128}
              height={128}
              src={user.profile.image}
              alt="profilepicture"
              className="size-16 rounded-full md:size-32"
            />
            <Button onClick={() => setUploadAvatar(true)}>
              {t("Upload Avatar")}
            </Button>
          </div>

          <form onSubmit={handleSubmit(submitHandler)} className="space-y-3">
            {isError && (
              <CustomErrorMessage
                onClose={() => setIsError(false)}
                message={errorMessage}
              />
            )}

            <div className="space-y-2">
              <h3 className="md:text-lg">Email</h3>
              <div
                className={classNames(
                  "w-full rounded border-2 p-3 text-sm lg:text-base",
                  "border-borderColor bg-borderColor/20 text-textSecondary/80",
                )}
              >
                {user.email}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-5">
              <CustomInput
                label={t("First Name")}
                name="firstName"
                type="text"
                placeholder={t("Your name")}
                errors={errors}
                register={register}
                validation={{
                  required: t("First name is required!"),
                }}
                className="max-w-[600px] p-3"
              />
              <CustomInput
                label={t("Last Name")}
                name="lastName"
                type="text"
                placeholder={t("Your last name")}
                errors={errors}
                register={register}
                className="max-w-[600px] p-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-5">
              <CustomInput
                label={t("Phone Number")}
                name="phoneNumber"
                type="text"
                placeholder={t("Your phone number")}
                errors={errors}
                register={register}
                validation={{
                  pattern: numberPattern,
                }}
                className="max-w-[600px] p-3"
              />
              <CustomInput
                label={t("Address")}
                name="address"
                type="text"
                placeholder={t("Your address")}
                errors={errors}
                register={register}
                className="max-w-[600px] p-3"
              />
            </div>

            <div className="flex justify-end pt-1">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full md:w-[250px]"
              >
                {t("Save Changes")}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <UploadAvatarModal
        open={uploadAvatar}
        onClose={() => setUploadAvatar(false)}
        user={user}
      />
    </section>
  );
};

export default EditProfile;
