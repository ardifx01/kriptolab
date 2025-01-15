import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import useModal from "@/hooks/useModal";
import { emailPattern } from "@/lib/helpers/validation-pattern";
import { supportService } from "@/lib/services";

import Button from "../Button/Button";
import CustomErrorMessage from "../Form/CustomErrorMessage";
import CustomInput from "../Form/CustomInput";
import CustomTextarea from "../Form/CustomTextarea";
import Modal from "../Modal/Modal";
import { showToast } from "../Toast/CustomToast";

export interface ISupport {
  email: string;
  message: string;
}

const SupportModal = () => {
  const { t } = useTranslation();
  const { supportModal, closeSupportModal } = useModal();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ISupport>({ criteriaMode: "all" });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<any>();

  const submitHandler = async (val: ISupport) => {
    try {
      setIsLoading(true);
      const response = await supportService(val);

      if (response) {
        setIsError(false);
        showToast.success(t("Support request sent successfully!"));
        closeSupportModal();
        reset();
      }
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(t(error.response.data.message));
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title={t("Support")}
      isOpen={supportModal}
      onClose={() => {
        closeSupportModal();
        reset();
      }}
      className="max-w-[600px]"
    >
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-3 pb-6 pt-4 text-start"
      >
        {isError && (
          <CustomErrorMessage
            onClose={() => setIsError(false)}
            message={errorMessage}
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

        <CustomTextarea
          label={t("Message")}
          name="message"
          placeholder={t("Enter your message")}
          errors={errors}
          register={register}
          validation={{
            required: t("Message is required!"),
          }}
          className="h-[120px] p-3"
        />

        <Button
          type="submit"
          disabled={isLoading}
          className="mt-3 h-12 w-full rounded-md disabled:cursor-not-allowed"
        >
          {isLoading ? t("Loading...") : t("Send Request")}
        </Button>
      </form>
    </Modal>
  );
};

export default SupportModal;
