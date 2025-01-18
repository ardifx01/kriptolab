import React from "react";
import { useTranslation } from "react-i18next";
import { CallBackProps, Step } from "react-joyride";

import GuideTour from "@/components/GuideTour/GuideTour";
import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import Layout from "@/components/Layout/Layout";
import PortfolioAssets from "@/features/dashboard/components/PortfolioAssets/PortfolioAssets";
import PortfolioBalanceIDR from "@/features/dashboard/components/PortfolioBalanceIDR/PortfolioBalanceIDR";
import PortfolioChart from "@/features/dashboard/components/PortfolioChart/PortfolioChart";
import useInteractiveGuide from "@/hooks/useInteractiveGuide";
import { scrollToTop } from "@/lib/helpers/scrollTop";

const PortfolioPage = () => {
  const { t } = useTranslation();
  const { t: tour } = useTranslation("interactiveguide");
  const { firstLoad, completeGuide, portfolioGuide } = useInteractiveGuide();

  const portfolioSteps: Step[] = [
    {
      target: "body",
      content: tour("portfolioGuide.welcome"),
      disableBeacon: true,
      placement: "center",
    },
    {
      target: "#idr-balance",
      content: tour("portfolioGuide.idrBalance"),
      placement: "auto",
      disableScrolling: true,
    },
    {
      target: "#deposit-button",
      content: tour("portfolioGuide.depositButton"),
      placement: "auto",
      disableScrolling: true,
    },
    {
      target: "#withdraw-button",
      content: tour("portfolioGuide.withdrawButton"),
      placement: "auto",
      disableScrolling: true,
    },
    {
      target: "#asset-balance",
      content: tour("portfolioGuide.assetBalance"),
      placement: "auto",
      disableScrolling: true,
    },
    {
      target: "#porto-range-filter",
      content: tour("portfolioGuide.portoRangeFilter"),
      placement: "auto",
    },
    {
      target: "#portfolio-chart",
      content: tour("portfolioGuide.portfolioChart"),
      placement: "auto",
    },
    {
      target: "#asset-table",
      content: tour("portfolioGuide.assetTable"),
      placement: "auto",
    },
    {
      target: "#portfolio-search",
      content: tour("portfolioGuide.portfolioSearch"),
      placement: "auto",
      disableScrolling: true,
    },
    {
      target: "body",
      content: tour("portfolioGuide.allSet"),
      placement: "center",
    },
  ];
  const joyrideCallback = (data: CallBackProps) => {
    const { status } = data;

    if (status === "finished" || status === "skipped") {
      completeGuide("portfolioGuide", "desktop");
      completeGuide("portfolioGuide", "mobile");
      scrollToTop(0);
    }
  };

  return (
    <ProtectedRoute>
      <GuideTour
        run={
          (!firstLoad && portfolioGuide.desktop) ||
          (!firstLoad && portfolioGuide.mobile)
        }
        steps={portfolioSteps}
        callback={joyrideCallback}
      />

      <Layout title="Portfolio">
        <h2 className="mb-3 ml-0.5 w-full text-2xl font-medium sm:text-3xl md:mb-6">
          {t("My Portfolio")}
        </h2>
        <section className="space-y-3 md:space-y-4">
          <PortfolioBalanceIDR />
          <PortfolioChart />
          <PortfolioAssets />
        </section>
      </Layout>
    </ProtectedRoute>
  );
};

export default PortfolioPage;
