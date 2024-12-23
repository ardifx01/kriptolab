import React from "react";

import Layout from "@/components/Layout/Layout";

const NotFoundPage = () => {
  return (
    <Layout className="flex min-h-80 flex-col items-center justify-center space-y-2">
      <h1 className="text-5xl font-bold text-primaryAccent md:text-8xl">404</h1>
      <h2 className="text-xl font-semibold text-textSecondary md:text-3xl">
        Page Not Found
      </h2>
    </Layout>
  );
};

export default NotFoundPage;
