import React from "react";

import Image from "next/image";
import Link from "next/link";

import classNames from "classnames";

import Button from "@/components/Button/Button";
import useAuth from "@/features/auth/hooks/useAuth";

import TokenSearchBar from "./TokenSearchBar/TokenSearchBar";
import ChangeLanguage from "./ChangeLanguage";
import UserBalance from "./UserBalance";
import UserDropdown from "./UserDropdown";

export interface NavbarProps {
  yoffset: number;
}

const Navbar = ({}: NavbarProps) => {
  const { isLoggedIn } = useAuth();

  return (
    <nav
      className={classNames(
        "sticky top-0 flex h-[80px] w-full items-center justify-between gap-4 px-5 py-2",
        "z-20 border-b border-b-borderColor bg-background",
      )}
    >
      <div className="flex gap-6">
        <Link href={"/market"} className="h-14 w-36">
          <Image
            alt="KriptoLab"
            src={"/images/logo/kriptolab-full.svg"}
            width={200}
            height={200}
            className="h-full w-full"
            priority
          />
        </Link>

        <div className="flex items-center gap-5 font-semibold text-textSecondary">
          <Link href={"/market"} className="hover:text-white">
            Market
          </Link>

          <Link href={"/tutorial"} className="hover:text-white">
            Tutorial
          </Link>
        </div>
      </div>

      <TokenSearchBar />

      <div className="flex items-center gap-4">
        <ChangeLanguage />

        {!isLoggedIn ? (
          <>
            <Link href={"/auth/login"}>
              <Button variant="secondary" className="min-w-[110px]">
                Login
              </Button>
            </Link>
            <Link href={"/auth/register"} className="hidden xl:block">
              <Button variant="primary" className="min-w-[110px]">
                Register
              </Button>
            </Link>
          </>
        ) : (
          <>
            <UserBalance />
            <UserDropdown />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
