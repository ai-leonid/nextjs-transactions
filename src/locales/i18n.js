import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./en.json";
import ruTranslation from "./ru.json";
import kkTranslation from "./kz.json";

const resources = {
  en: {
    translation: enTranslation.translation,
  },
  ru: {
    translation: ruTranslation.translation,
  },
  kk: {
    translation: kkTranslation.translation,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "ru",
    fallbackLng: "ru",
    interpolation: {
      escapeValue: false,
    },
  })
  .then(() => {
    console.log("i18n initialized successfully");
  })
  .catch((error) => {
    console.error("Error initializing i18n:", error);
  });

export default i18n;
