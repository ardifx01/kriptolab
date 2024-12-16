import React from "react";

import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import Layout from "@/components/Layout/Layout";
import EditProfile from "@/features/dashboard/components/EditProfile/EditProfile";

const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <Layout title="Profile">
        <div className="space-y-5">
          <EditProfile />
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default ProfilePage;
