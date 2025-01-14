import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import useAuth from "@/features/auth/hooks/useAuth";

import Layout from "../Layout/Layout";
import LoadingSpinner from "../Loader/LoadingSpinner";

interface Props {
  children: React.ReactNode;
}

const AuthPage: React.FC<Props> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      if (
        router.pathname === "/auth/login" ||
        router.pathname === "/auth/register"
      ) {
        router.push("/portfolio");
      } else {
        router.push("/");
      }
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, router]);

  if (isLoading) {
    return (
      <Layout>
        <LoadingSpinner />
      </Layout>
    );
  }

  return <>{children}</>;
};

export default AuthPage;
