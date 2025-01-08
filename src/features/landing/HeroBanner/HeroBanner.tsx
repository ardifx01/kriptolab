import React from "react";
import { useTranslation } from "react-i18next";

import Link from "next/link";

import classNames from "classnames";

import Button from "@/components/Button/Button";

const HeroBanner = () => {
  const { t } = useTranslation("landingpage");

  return (
    <section className="space-y-6 md:mt-10 md:flex md:justify-between md:gap-8 md:space-y-0">
      <div className="md:mt-14">
        <div className="w-full space-y-1 md:space-y-3">
          <h1 className="max-w-[600px] font-sora text-3xl font-semibold md:text-5xl">
            {t("heroBanner.title")}
          </h1>
          <p className="max-w-[550px] text-sm text-textSecondary md:text-base">
            {t("heroBanner.description")}
          </p>
        </div>
        <Link href="/auth/register" className="block w-fit">
          <Button className="mt-4 md:mt-5">{t("heroBanner.button")}</Button>
        </Link>
      </div>
      <div className="h-[400px] w-full rounded-lg border-2 border-borderColor bg-cardBackground p-5 md:max-w-[650px]">
        <div className="flex gap-3">
          {["bg-error", "bg-warning", "bg-success"].map((v) => (
            <div key={v} className={classNames("size-4 rounded-full", v)} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
