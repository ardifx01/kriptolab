import React from "react";

import AuthPage from "@/components/HOC/AuthPage";
import Layout from "@/components/Layout/Layout";
import LoginForm from "@/features/auth/components/Login/LoginForm";

const LoginPage = () => {
  return (
    <AuthPage>
      <Layout title="Login">
        <LoginForm />
      </Layout>
    </AuthPage>
  );
};

export default LoginPage;
