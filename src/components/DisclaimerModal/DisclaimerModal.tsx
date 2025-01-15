import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

import classNames from "classnames";

import useModal from "@/hooks/useModal";

import Button from "../Button/Button";
import CheckboxCustom from "../Checkbox/Checkbox";
import Modal from "../Modal/Modal";

const DisclaimerModal = () => {
  const { t } = useTranslation();
  const { firstLoad, closeFirstLoadModal } = useModal();

  const [checked, setChecked] = useState(false);

  return (
    <Modal
      title={t("Disclaimer Notice")}
      isOpen={firstLoad && firstLoad}
      onClose={checked ? closeFirstLoadModal : () => {}}
      className="max-w-[600px]"
      titleClassName="!justify-center"
      xButton={false}
    >
      <div className="flex flex-col gap-y-2 py-5 text-sm text-textSecondary md:gap-y-4 md:text-base">
        <div className="rounded-lg border border-borderColor/60 bg-background/30 p-4 text-start">
          <Trans
            ns="general"
            i18nKey="Disclaimer Notice Desc"
            components={{
              span: <span className="text-primaryAccent" />,
              a: (
                <a
                  href="https://indodax.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondaryAccent"
                />
              ),
            }}
          />
        </div>
        <div
          onClick={(e) => {
            e.preventDefault();
            setChecked((prev) => !prev);
          }}
          className={classNames(
            "flex cursor-pointer items-center gap-2 rounded-lg border p-4 text-start",
            "border-borderColor/60 bg-background/30 hover:text-secondaryAccent",
          )}
        >
          <CheckboxCustom onCheck={(c) => setChecked(!c)} checked={checked} />
          {t("I understand and agree to the disclaimer above.")}
        </div>
        <Button
          disabled={!checked}
          onClick={closeFirstLoadModal}
          className="mt-2 w-full"
        >
          {t("Proceed")}
        </Button>
      </div>
    </Modal>
  );
};

export default DisclaimerModal;
