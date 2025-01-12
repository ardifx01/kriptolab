import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Image from "next/image";

import Button from "@/components/Button/Button";
import CustomFileInput from "@/components/Form/CustomFileInput";
import Modal from "@/components/Modal/Modal";
import { showToast } from "@/components/Toast/CustomToast";
import useUser from "@/hooks/useUser";
import { editProfilePictureService } from "@/lib/services";
import { IUser } from "@/types";

import useUploadImage from "../../hooks/useUploadImage";

interface UploadAvatarProps {
  open: boolean;
  onClose: () => void;
  user: IUser;
}

const UploadAvatarModal = ({ onClose, open, user }: UploadAvatarProps) => {
  const {
    preview,
    handleFileChange,
    resetUpload,
    uploadError,
    uploadImage,
    selectedFile,
  } = useUploadImage();
  const { t } = useTranslation();
  const { updateUser } = useUser();

  const [loading, setLoading] = useState(false);

  const handleUploadImage = async () => {
    try {
      setLoading(true);
      const url = await uploadImage();

      if (url) {
        updateUser({ ...user, profile: { ...user.profile, image: url } });
        const response = await editProfilePictureService(url);

        if (response) {
          showToast.success(t("Upload image success!"));
          onClose();
        }
      }
    } catch (error) {
      console.error(error);
      showToast.error(t("Error uploading image"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={open}
      onClose={loading ? () => {} : onClose}
      title="Upload Avatar"
      className="md:max-w-[550px]"
    >
      <div className="flex flex-col items-center gap-4 p-5">
        <div className="bg-bg size-36 overflow-hidden rounded-full">
          <Image
            src={preview || user.profile.image}
            alt="profilepic"
            className="h-full w-full object-cover"
            width={144}
            height={144}
          />
        </div>
        <CustomFileInput
          onChange={handleFileChange}
          value={selectedFile}
          error={uploadError}
          accept="image/png,image/jpeg,image/gif"
          containerClassName="!w-fit"
          className="bg-transparent"
          handleRemove={resetUpload}
        />
        <Button
          disabled={selectedFile === null || loading}
          className="w-full"
          onClick={handleUploadImage}
        >
          {loading ? t("Uploading...") : t("Save")}
        </Button>
      </div>
    </Modal>
  );
};

export default UploadAvatarModal;
