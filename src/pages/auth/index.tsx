import { useEffect } from "react";

import { useRouter } from "next/router";

const AuthPageRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/auth/login");
  }, [router]);

  return <></>;
};

export default AuthPageRedirect;
