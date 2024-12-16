import React from "react";

import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import Layout from "@/components/Layout/Layout";
import EditPassword from "@/features/dashboard/components/EditPassword/EditPassword";

const AccountPage = () => {
  return (
    <ProtectedRoute>
      <Layout title="Account Settings">
        <EditPassword />
      </Layout>
    </ProtectedRoute>
  );
};

export default AccountPage;
