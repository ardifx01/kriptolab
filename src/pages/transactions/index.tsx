import React from "react";

import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import Layout from "@/components/Layout/Layout";
import TransactionHistory from "@/features/dashboard/components/TransactionHistory/TransactionHistory";

const TransactionsPage = () => {
  return (
    <ProtectedRoute>
      <Layout title="Transactions">
        <TransactionHistory />
      </Layout>
    </ProtectedRoute>
  );
};

export default TransactionsPage;
