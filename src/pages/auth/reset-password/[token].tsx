import React, { useEffect } from "react";

import { useRouter } from "next/router";

import AuthPage from "@/components/HOC/AuthPage";
import Layout from "@/components/Layout/Layout";
import LoadingSpinner from "@/components/Loader/LoadingSpinner";
import ResetPasswordForm from "@/features/auth/components/ForgotPassword/ResetPasswordForm";
import { useValidateJWT } from "@/hooks/useValidateJWT";

const ResetPasswordPage = () => {
  const router = useRouter();
  const { query, push } = router;
  const { isValid, error, loading } = useValidateJWT(
    router.isReady ? (query.token as string) : undefined,
  );

  useEffect(() => {
    if (router.isReady && !loading && (!isValid || error)) {
      push(`/auth/forgot-password?error=true`);
    }
  }, [error, isValid, loading, push, router.isReady]);

  if (!router.isReady || loading) {
    return (
      <AuthPage>
        <Layout title="Reset Password">
          <LoadingSpinner />
        </Layout>
      </AuthPage>
    );
  }

  return (
    <AuthPage>
      <Layout title="Reset Password">
        <ResetPasswordForm token={query.token as string} />
      </Layout>
    </AuthPage>
  );
};

export default ResetPasswordPage;
