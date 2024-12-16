import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";

import useAuth from "@/features/auth/hooks/useAuth";

import Layout from "../Layout/Layout";
import LoadingSpinner from "../Loader/LoadingSpinner";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(false);
    } else {
      router.push("/auth/login");
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

export default ProtectedRoute;
