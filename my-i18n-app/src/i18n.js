import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// inline resources (simplest, no extra plugins)
import en from "./locales/en/common.json";
import es from "./locales/es/common.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      es: { common: es }
    },
    lng: "en",
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    react: { useSuspense: false }
  });

export default i18n;
