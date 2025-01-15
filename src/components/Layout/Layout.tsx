import React from "react";

import Head from "next/head";

import classNames from "classnames";

import useHandleScroll from "@/hooks/useHandleScroll";
import useWindowSize from "@/hooks/useWindowSize";

import SupportButton from "../Support/SupportButton";

import Footer from "./Footer/Footer";
import MobileNavbar from "./Navbar/MobileNavbar";
import Navbar from "./Navbar/Navbar";
import { LayoutProps } from "./types";

const Layout = ({
  children,
  className,
  title,
  fullWidth,
  simple,
}: LayoutProps) => {
  const { yOffset } = useHandleScroll();
  const { isMobile } = useWindowSize();

  let pageTitle: string = "KriptoLab";
  if (title) {
    pageTitle = title + " - KriptoLab";
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="h-full w-full">
        <div
          className={classNames(
            "relative mx-auto grid min-h-screen w-full",
            // "auto" is for the main tag
            // add "max-content" to the "grid-rows" class below for each div if want to add more "static" elements
            "grid-rows-[max-content_auto_max-content]",
          )}
        >
          {isMobile ? (
            <MobileNavbar yoffset={yOffset} />
          ) : (
            <Navbar yoffset={yOffset} />
          )}
          <div className="mb-10 mt-6 flex w-full justify-center lg:mb-28 lg:mt-10">
            <main
              className={classNames(
                "mx-4 w-full",
                !fullWidth && "max-w-[1280px]",
                className,
              )}
            >
              {children}
            </main>
          </div>
          <SupportButton />
          {!simple ? <Footer /> : <></>}
        </div>
      </div>
    </>
  );
};

export default Layout;
