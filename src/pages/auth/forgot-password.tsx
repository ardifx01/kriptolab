import React from "react";

import AuthPage from "@/components/HOC/AuthPage";
import Layout from "@/components/Layout/Layout";
import ForgotPasswordForm from "@/features/auth/components/ForgotPassword/ForgotPasswordForm";

const ForgotPassword = () => {
  return (
    <AuthPage>
      <Layout title="Forgot Password">
        <ForgotPasswordForm />
      </Layout>
    </AuthPage>
  );
};

export default ForgotPassword;
