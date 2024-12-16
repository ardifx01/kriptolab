import React from "react";

import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import Layout from "@/components/Layout/Layout";
import PortfolioAssets from "@/features/dashboard/components/PortfolioAssets/PortfolioAssets";
import PortfolioBalanceIDR from "@/features/dashboard/components/PortfolioBalanceIDR/PortfolioBalanceIDR";
import PortfolioChart from "@/features/dashboard/components/PortfolioChart/PortfolioChart";

const PortfolioPage = () => {
  return (
    <ProtectedRoute>
      <Layout title="Portfolio">
        <h2 className="mb-3 ml-0.5 w-full text-2xl font-medium sm:text-3xl md:mb-6">
          My Portfolio
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
