import React from "react";
import { useTranslation } from "react-i18next";

import Image from "next/image";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import classNames from "classnames";

const ChangeLanguage = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    window.localStorage.setItem("i18nextLng", language);
    i18n?.changeLanguage(language);
  };

  const localizations: {
    [key: string]: { title: string; alias: string; image: string };
  } = {
    en: {
      title: "English",
      alias: "en",
      image: "/images/localization/en.png",
    },
    id: {
      title: "Indonesia",
      alias: "id",
      image: "/images/localization/id.png",
    },
  };

  const currentLang: keyof typeof localizations =
    (i18n?.language as keyof typeof localizations) || "en";

  return (
    <Menu>
      <MenuButton>
        <div className="flex items-center gap-2">
          <Image
            src={localizations[currentLang].image}
            alt={localizations[currentLang].title}
            className="h-5 w-5 cursor-pointer lg:h-6 lg:w-6"
            width={32}
            height={32}
            priority={true}
            title={localizations[currentLang].alias}
          />
          <span className="hidden font-sora md:block">
            {localizations[currentLang].alias.toUpperCase()}
          </span>
        </div>
      </MenuButton>
      <MenuItems
        anchor="bottom"
        transition
        className={classNames(
          "z-30 mt-4 flex min-w-[150px] flex-col gap-3 rounded-lg p-4",
          "border border-borderColor bg-cardBackground",
          "origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0",
        )}
      >
        {Object.values(localizations).map((lang) => (
          <MenuItem
            key={lang.alias}
            as={"div"}
            className="flex cursor-pointer items-center gap-2"
            onClick={() => changeLanguage(lang.alias)}
          >
            <Image
              src={lang.image}
              alt={lang.alias}
              className="h-5 w-5 cursor-pointer"
              width={32}
              height={32}
              priority={true}
              title={lang.alias}
            />
            <span className="font-sora text-base hover:text-primaryAccent">
              {lang.title}
            </span>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};

export default ChangeLanguage;
