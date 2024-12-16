import React, { useEffect } from "react";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import AuthPage from "@/components/HOC/AuthPage";
import Layout from "@/components/Layout/Layout";
import LoadingSpinner from "@/components/Loader/LoadingSpinner";
import useAuth from "@/features/auth/hooks/useAuth";

const GoogleLoginCallback = () => {
  const search = useSearchParams();
  const { push } = useRouter();

  const { updateJwttoken } = useAuth();

  const token = search.get("token");
  const error = search.get("error");

  useEffect(() => {
    if (token) {
      updateJwttoken(token);
    }

    if (error) {
      push(`/auth/login?error=${error}`);
    }
  }, [error, push, token, updateJwttoken]);

  return (
    <AuthPage>
      <Layout>
        <LoadingSpinner />
      </Layout>
    </AuthPage>
  );
};

export default GoogleLoginCallback;
