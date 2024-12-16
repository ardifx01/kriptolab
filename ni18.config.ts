import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { Ni18nOptions } from "ni18n";

const supportedLngs = ["en", "id"];
const namespaces = ["general"];

export const ni18nConfig: Ni18nOptions = {
  use: [I18nextBrowserLanguageDetector],
  fallbackLng: supportedLngs,
  supportedLngs,
  ns: namespaces,
  nsSeparator: "false",
  detection: {
    order: [
      "querystring",
      "cookie",
      "localStorage",
      "navigator",
      "htmlTag",
      "path",
      "subdomain",
    ],
    caches: ["localStorage"],
  },
  react: {
    useSuspense: false,
  },
};
