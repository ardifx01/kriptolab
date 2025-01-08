import React from "react";
import { useTranslation } from "react-i18next";

import Feature, { FeatureProps } from "./Feature";

const FeatureSection = () => {
  const { t } = useTranslation("landingpage");

  const features: FeatureProps[] = [
    {
      title: t("feature.1.title"),
      description: t("feature.1.description"),
      image: "/images/features/feature_market.png",
      link: "/market",
      linkText: t("feature.1.linkText"),
      side: "left",
    },
    {
      title: t("feature.2.title"),
      description: t("feature.2.description"),
      image: "/images/features/feature_trading.png",
      link: "/auth/register",
      linkText: t("feature.2.linkText"),
      side: "right",
    },
    {
      title: t("feature.3.title"),
      description: t("feature.3.description"),
      image: "/images/features/feature_transactions.png",
      link: "/transactions",
      linkText: t("feature.3.linkText"),
      side: "left",
    },
    {
      title: t("feature.4.title"),
      description: t("feature.4.description"),
      image: "/images/features/feature_portfolio.png",
      link: "/portfolio",
      linkText: t("feature.4.linkText"),
      side: "right",
    },
  ];

  return (
    <section className="mt-12 grid w-full justify-center space-y-12 md:mt-20 md:space-y-20">
      {features.map((feature) => (
        <Feature key={feature.title} {...feature} />
      ))}
    </section>
  );
};

export default FeatureSection;
