import React from "react";

import Link from "next/link";

import classNames from "classnames";

import { DiscordIcon, GithubIcon, TwitterIcon } from "@/assets/icons";
import openPage from "@/lib/helpers/openPage";

import { footerLinks } from "./footerdata";

const Footer = () => {
  return (
    <footer className="px-5 lg:px-10">
      <section
        className={classNames(
          "flex flex-col gap-5 border-b-2 border-borderColor pb-6",
          "lg:flex-row lg:items-start lg:justify-between",
        )}
      >
        <div className="order-2 flex items-center gap-6 text-white lg:order-1">
          <GithubIcon
            className="h-8 w-8 cursor-pointer hover:text-success lg:h-9 lg:w-9"
            onClick={(e) => openPage(e, "https://github.com/yoghantara08")}
          />
          <TwitterIcon className="h-8 w-8 cursor-pointer hover:text-secondaryAccent lg:h-9 lg:w-9" />
          <DiscordIcon className="h-8 w-8 cursor-pointer hover:text-primaryAccent lg:h-9 lg:w-9" />
        </div>

        <div className="order-1 grid grid-cols-2 gap-4 lg:order-2 lg:flex lg:gap-16">
          {footerLinks.map((footer) => (
            <div key={footer.title}>
              <h3 className="font-sora font-semibold text-white lg:text-lg">
                {footer.title}
              </h3>
              <ul className="mt-2 flex flex-col gap-y-1 text-sm lg:text-base">
                {footer.links.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className="text-textSecondary hover:text-white"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col justify-between gap-1 pb-7 pt-4 sm:flex-row sm:items-center">
        <div className="text-sm">© 2024 - KriptoLab</div>
        <Link
          href={"#"}
          className="cursor-pointer text-sm text-textSecondary hover:text-white"
        >
          Privacy Policy
        </Link>
      </section>
    </footer>
  );
};

export default Footer;
