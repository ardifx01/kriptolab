import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import type { AppProps } from "next/app";
import Head from "next/head";

import { Analytics } from "@vercel/analytics/react";
import { appWithI18Next, useSyncLanguage } from "ni18n";
import { PersistGate } from "redux-persist/integration/react";

import Font from "@/assets/font/Font";
import ModalProvider from "@/components/Modal/ModalProvider";
import CustomToastContainer from "@/components/Toast/CustomToast";
import useAuth from "@/features/auth/hooks/useAuth";
import { persistor, storeWrapper } from "@/redux/store";

import { ni18nConfig } from "../../ni18.config";

import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.scss";

function App({ Component, pageProps }: AppProps) {
  const { checkIfJWTTokenExpired } = useAuth();
  const { ready } = useTranslation();

  // Sync language with local storage
  const locale =
    (typeof window !== "undefined" &&
      window.localStorage.getItem("i18nextLng")) ||
    undefined;
  useSyncLanguage(locale);

  // Check if JWT token is expired
  useEffect(() => {
    checkIfJWTTokenExpired();
  }, [checkIfJWTTokenExpired]);

  if (!ready) return null;

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>
        <title>KriptoLab</title>
        <link rel="icon" href={"/favicon.ico"} />
      </Head>
      <Font />
      <CustomToastContainer />
      <Component {...pageProps} />
      <ModalProvider />
      <Analytics />
    </PersistGate>
  );
}

export default storeWrapper.withRedux(appWithI18Next(App, ni18nConfig));
