import { Fragment, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import Image from "next/image";
import Link from "next/link";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import classNames from "classnames";
import {
  ArrowLeftRightIcon,
  ChevronDownIcon,
  CircleUserRoundIcon,
  LogOutIcon,
  SettingsIcon,
  WalletIcon,
} from "lucide-react";

import useAuth from "@/features/auth/hooks/useAuth";
import useUser from "@/hooks/useUser";

interface MenuItemType {
  label: string;
  to?: string;
  icon: ReactNode;
  onClick?: () => void;
}

const UserDropdown = () => {
  const { user } = useUser();
  const { logout } = useAuth();
  const { t } = useTranslation();

  const menuSections: Array<{
    items: MenuItemType[];
    activeClassName: string;
  }> = [
    {
      items: [
        {
          label: t("Profile"),
          to: "/profile",
          icon: <CircleUserRoundIcon className="size-5" />,
        },
        {
          label: t("Portfolio"),
          to: "/portfolio",
          icon: <WalletIcon className="size-5" />,
        },
        {
          label: t("Transactions"),
          to: "/transactions",
          icon: <ArrowLeftRightIcon className="size-5" />,
        },
        {
          label: t("Account Settings"),
          to: "/account-settings",
          icon: <SettingsIcon className="size-5" />,
        },
      ],
      activeClassName: "hover:bg-primaryAccent",
    },

    {
      items: [
        {
          label: "Logout",
          icon: <LogOutIcon className="size-5" />,
          onClick: logout,
        },
      ],
      activeClassName: "hover:bg-secondaryAccent",
    },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* Dropdown Button */}
      <MenuButton className={"flex items-center gap-2"}>
        <div
          className={classNames(
            "text-subtext flex size-7 items-center justify-center overflow-hidden rounded-full md:size-9",
          )}
        >
          <Image
            src={user?.profile?.image || "/images/user-default.png"}
            alt="profilepic"
            width={48}
            height={48}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <ChevronDownIcon className="size-5 md:size-6" />
      </MenuButton>
      {/* Dropdown Items */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          className={classNames(
            "absolute right-0 z-50 mt-3 w-52 origin-top-right divide-y rounded-lg shadow-lg ring-1",
            "divide-borderColor border-borderColor bg-cardBackground ring-borderColor",
          )}
        >
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="py-1">
              {section.items.map((item, itemIndex) => (
                <MenuItem key={itemIndex} as={"div"} className={"py-0.5"}>
                  {item.to ? (
                    <Link
                      href={item.to}
                      className={classNames(
                        "text-subtext flex items-center gap-2 px-4 py-2.5 text-sm hover:text-white md:text-base",
                        section.activeClassName,
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ) : (
                    <div
                      onClick={() => {
                        item.onClick?.();
                      }}
                      className={classNames(
                        "text-subtext flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm hover:text-white md:text-base",
                        section.activeClassName,
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </div>
                  )}
                </MenuItem>
              ))}
            </div>
          ))}
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;
