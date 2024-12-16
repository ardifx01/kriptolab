import React from "react";

import AuthPage from "@/components/HOC/AuthPage";
import Layout from "@/components/Layout/Layout";
import RegisterForm from "@/features/auth/components/Register/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthPage>
      <Layout title="Register">
        <RegisterForm />
      </Layout>
    </AuthPage>
  );
};

export default RegisterPage;
