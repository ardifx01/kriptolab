import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import AuthPage from "@/components/HOC/AuthPage";
import Layout from "@/components/Layout/Layout";
import ResetPasswordForm from "@/features/auth/components/ForgotPassword/ResetPasswordForm";

const ResetPasswordPage = () => {
  const { query } = useRouter();

  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (query.token) {
      setToken(query.token as string);
      setLoading(false);
    }
  }, [query.token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthPage>
      <Layout title="Reset Password">
        <ResetPasswordForm token={token} />
      </Layout>
    </AuthPage>
  );
};

export default ResetPasswordPage;
