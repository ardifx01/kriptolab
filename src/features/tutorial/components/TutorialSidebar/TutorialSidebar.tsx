import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck } from "react-icons/fa6";
import { IoChevronDown } from "react-icons/io5";

import Link from "next/link";
import { useRouter } from "next/router";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import classNames from "classnames";

import useWindowSize from "@/hooks/useWindowSize";

import { TUTORIAL_MENU } from "../../constant";

const TutorialSidebar = () => {
  const { pathname } = useRouter();
  const { t } = useTranslation();
  const { isMobile } = useWindowSize();

  const [selectedMenu, setSelectedMenu] = useState(TUTORIAL_MENU[0].title);

  useEffect(() => {
    TUTORIAL_MENU.forEach((menu) => {
      if (pathname.includes(menu.link)) {
        setSelectedMenu(menu.title);
      }
    });
  }, [pathname]);

  return (
    <div className="relative">
      {!isMobile && (
        <aside className="sticky top-[120px] min-w-[300px] space-y-3">
          {TUTORIAL_MENU.map((menu) => (
            <Link
              href={menu.link}
              key={menu.title}
              className={classNames(
                "flex items-center rounded-lg px-4 py-3 font-medium",
                pathname === menu.link
                  ? "bg-cardBackground text-textPrimary"
                  : "text-textSecondary",
              )}
            >
              {t(menu.title)}
            </Link>
          ))}
        </aside>
      )}
      {isMobile && (
        <Menu>
          <MenuButton
            className={classNames(
              "mb-3 flex h-10 items-center gap-1.5 rounded-md border",
              "border-borderColor bg-cardBackground px-4 lg:border-2 lg:px-5",
            )}
          >
            {t(selectedMenu)}
            <IoChevronDown />
          </MenuButton>
          <MenuItems
            anchor="bottom start"
            transition
            className={classNames(
              "mt-2 flex min-w-[150px] flex-col gap-4 rounded-lg p-4",
              "border border-borderColor bg-cardBackground",
              "origin-top transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0",
            )}
          >
            {TUTORIAL_MENU.map((menu) => (
              <MenuItem key={menu.title}>
                <Link
                  href={menu.link}
                  className={classNames(
                    "flex items-center justify-between gap-1",
                    pathname === menu.link && "text-primaryAccent",
                  )}
                >
                  {t(menu.title)}
                  {pathname === menu.link && <FaCheck />}
                </Link>
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      )}
    </div>
  );
};

export default TutorialSidebar;
